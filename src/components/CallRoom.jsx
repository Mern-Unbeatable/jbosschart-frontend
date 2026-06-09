import React, { useEffect, useRef, useState } from 'react';
import { PhoneOff, Mic, MicOff, Video, VideoOff, Volume2 } from 'lucide-react';
import { twilioVideoService } from '../services/twilioVideoService';
import { useJoinCallMutation, useEndCallMutation, useGetCallByIdQuery } from '../features/api/callApi';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import socketService from '../services/socketService';

const CallRoom = ({ callData, onClose }) => {
    const [seconds, setSeconds] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [callStatus, setCallStatus] = useState('connecting');
    const [actualStartTime, setActualStartTime] = useState(null);
    const [callId, setCallId] = useState(null);
    const [connectionError, setConnectionError] = useState(false);
    const [currentBilling, setCurrentBilling] = useState(0);

    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const timerRef = useRef(null);
    const isConnectingRef = useRef(false);
    const { user, token } = useSelector(state => state.auth);

    const [joinCall] = useJoinCallMutation();
    const [endCall] = useEndCallMutation();

    const formatTime = (totalSeconds) => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    // Socket listener for call_ended
    useEffect(() => {
        if (!user?.id || !token || !callId) return;

        socketService.connect(user.id, token);

        const handleCallEnded = (data) => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
            twilioVideoService.disconnect();
            toast.success('Call ended');
            setTimeout(() => onClose(), 500);
        };

        socketService.on('call_ended', `call-room-${callId}`, handleCallEnded);

        return () => {
            socketService.off('call_ended', `call-room-${callId}`);
        };
    }, [user?.id, token, callId, onClose]);

    // Connect to Twilio room
    useEffect(() => {
        if (!callData?.callId || !callData?.token || isConnectingRef.current) return;

        const connectToCall = async () => {
            if (isConnectingRef.current) return;
            isConnectingRef.current = true;

            try {
                setCallId(callData.callId);
                setCallStatus('connecting');
                setConnectionError(false);

                // Get fresh token via joinCall API
                let tokenToUse = callData.token;
                let roomName = callData.roomName;
                let startTime = null;

                try {
                    const result = await joinCall(callData.callId).unwrap();
                    tokenToUse = result?.token || result?.data?.token || callData.token;
                    roomName = result?.call?.roomName || result?.data?.call?.roomName || callData.roomName;
                    startTime = result?.call?.startTime || result?.data?.call?.startTime;
                } catch (joinErr) {
                    console.warn('joinCall failed, using original token:', joinErr);
                }

                if (startTime) {
                    const start = new Date(startTime).getTime();
                    setActualStartTime(start);
                } else {
                    setActualStartTime(Date.now());
                }

                setCallStatus('active');

                const isVideoCall = callData.callType === 'VIDEO';

                if (isVideoCall) {
                    try {
                        await twilioVideoService.connectVideo(
                            tokenToUse,
                            roomName,
                            localVideoRef.current,
                            remoteVideoRef.current
                        );
                        toast.success('Video call connected');
                    } catch (videoError) {
                        console.warn('Video failed, falling back to audio:', videoError);
                        setConnectionError(true);
                        toast.error('Camera not available. Audio only mode.');
                        // Fallback to audio
                        try {
                            await twilioVideoService.connectAudio(tokenToUse, roomName);
                        } catch (audioErr) {
                            console.error('Audio fallback also failed:', audioErr);
                            setConnectionError(true);
                        }
                    }
                } else {
                    try {
                        await twilioVideoService.connectAudio(tokenToUse, roomName);
                        toast.success('Audio call connected');
                    } catch (audioError) {
                        console.error('Audio connection failed:', audioError);
                        setConnectionError(true);
                        toast.error('Microphone not found');
                    }
                }

            } catch (error) {
                console.error('Failed to connect to call:', error);
                toast.error('Failed to connect to call');
                setTimeout(() => onClose(), 2000);
            }
        };

        connectToCall();

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [callData]);

    // Timer
    useEffect(() => {
        if (callStatus === 'active' && actualStartTime) {
            if (timerRef.current) clearInterval(timerRef.current);

            timerRef.current = setInterval(() => {
                const now = Date.now();
                const diffSeconds = Math.floor((now - actualStartTime) / 1000);
                setSeconds(diffSeconds);

                // Calculate billing
                const pricePerSecond = 2.5 / 60;
                setCurrentBilling(Number((diffSeconds * pricePerSecond).toFixed(2)));
            }, 1000);
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [callStatus, actualStartTime]);

    useEffect(() => {
        if (isMuted) twilioVideoService.mute();
        else twilioVideoService.unmute();
    }, [isMuted]);

    useEffect(() => {
        if (isVideoOff) twilioVideoService.disableVideo();
        else twilioVideoService.enableVideo();
    }, [isVideoOff]);

    const handleEndCall = async () => {
        try {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
            twilioVideoService.disconnect();
            if (callData?.callId) {
                await endCall(callData.callId).unwrap();
            }
            toast.success('Call ended');
            onClose();
        } catch (error) {
            console.error('Failed to end call:', error);
            onClose();
        }
    };

    const isVideoCall = callData?.callType === 'VIDEO';

    if (isVideoCall) {
        return (
            <div className="fixed inset-0 bg-black z-[10000]">
                <div className="relative h-full">
                    <div ref={remoteVideoRef} className="w-full h-full bg-gray-900 flex items-center justify-center">
                        {callStatus === 'connecting' && (
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-400 mx-auto mb-4" />
                                <p className="text-white text-lg">Connecting...</p>
                            </div>
                        )}
                        {connectionError && callStatus === 'active' && (
                            <div className="text-center">
                                <VideoOff size={48} className="text-white/50 mx-auto mb-4" />
                                <p className="text-white">Camera/Microphone not available</p>
                                <p className="text-white/60 text-sm">Continuing with audio only</p>
                            </div>
                        )}
                    </div>

                    <div className="absolute bottom-4 right-4 w-48 h-36 rounded-lg overflow-hidden shadow-lg border-2 border-white bg-gray-800">
                        <div ref={localVideoRef} className="w-full h-full" />
                        {isVideoOff && (
                            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                                <VideoOff size={24} className="text-white/60" />
                            </div>
                        )}
                    </div>

                    <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg">
                        <p className="text-white font-semibold">{callData?.callerName || 'Unknown'}</p>
                        <p className="text-white/70 text-sm">{formatTime(seconds)} · €{currentBilling.toFixed(2)}</p>
                    </div>

                    <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4">
                        <button
                            onClick={() => setIsMuted(!isMuted)}
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isMuted ? 'bg-red-500' : 'bg-gray-700 hover:bg-gray-600'} text-white`}
                        >
                            {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
                        </button>
                        <button
                            onClick={() => setIsVideoOff(!isVideoOff)}
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isVideoOff ? 'bg-red-500' : 'bg-gray-700 hover:bg-gray-600'} text-white`}
                        >
                            {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
                        </button>
                        <button
                            onClick={handleEndCall}
                            className="w-14 h-14 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-lg"
                        >
                            <PhoneOff size={24} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ── Audio Call UI ──
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[10000]">
            <div className="bg-[#2D2D2D] w-full max-w-md rounded-2xl p-8 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-4xl font-bold mb-4">
                    {callData?.callerName?.charAt(0) || 'C'}
                </div>

                <h2 className="text-white font-bold text-2xl mb-1">{callData?.callerName || 'Unknown'}</h2>
                <p className="text-green-400 text-sm mb-6">
                    {callStatus === 'active' ? '● Audio call in progress' : 'Connecting...'}
                </p>

                <div className="text-5xl font-bold text-white mb-4 font-mono">
                    {formatTime(seconds)}
                </div>

                <div className="bg-white/10 px-6 py-3 rounded-xl mb-8 text-center">
                    <p className="text-xs text-gray-400 mb-1 uppercase">Current Billing</p>
                    <p className="text-white font-bold text-xl">€{currentBilling.toFixed(2)}</p>
                </div>

                <div className="flex items-center gap-6">
                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isMuted ? 'bg-red-500' : 'bg-gray-700 hover:bg-gray-600'} text-white`}
                    >
                        {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
                    </button>
                    <button
                        onClick={handleEndCall}
                        className="w-16 h-16 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-lg"
                    >
                        <PhoneOff size={28} />
                    </button>
                    <button className="w-14 h-14 rounded-full bg-gray-700 text-gray-300 flex items-center justify-center">
                        <Volume2 size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CallRoom;