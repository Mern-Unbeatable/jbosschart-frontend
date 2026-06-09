import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Phone, PhoneOff, User, Volume2, VolumeX } from 'lucide-react';
import { socketService } from '../services/socketService';
import { useAcceptCallMutation, useRejectCallMutation } from '../features/api/callApi';
import toast from 'react-hot-toast';

const LISTENER_KEY = 'incoming-call-notification';

export const IncomingCallNotification = () => {
    const [incomingCall, setIncomingCall] = useState(null);
    const [isMuted, setIsMuted] = useState(false);
    const [socketStatus, setSocketStatus] = useState('disconnected');
    const [registered, setRegistered] = useState(false);
    const audioRef = useRef(null);
    const reconnectTimerRef = useRef(null);
    const { user, token, isAuthenticated } = useSelector(state => state.auth);
    const [acceptCall, { isLoading: isAccepting }] = useAcceptCallMutation();
    const [rejectCall, { isLoading: isRejecting }] = useRejectCallMutation();

    useEffect(() => {
        audioRef.current = new Audio('/ringtone.mp3');
        audioRef.current.loop = true;
        return () => {
            audioRef.current?.pause();
        };
    }, []);

    useEffect(() => {
        if (!isAuthenticated || !user?.id || !token) {
            setSocketStatus('disconnected');
            setRegistered(false);
            return;
        }

        const setupSocket = () => {
            socketService.connect(user.id, token);

            socketService.on('registered', LISTENER_KEY, (data) => {
                setRegistered(true);
                setSocketStatus('connected');
                if (reconnectTimerRef.current) {
                    clearTimeout(reconnectTimerRef.current);
                    reconnectTimerRef.current = null;
                }
            });

            socketService.on('incoming_call', LISTENER_KEY, (callData) => {
                setIncomingCall(callData);
                audioRef.current?.play().catch(() => { });

                if (Notification.permission === 'granted') {
                    new Notification('📞 Incoming Call', {
                        body: `${callData.callerName} is calling (${callData.callType})`,
                        icon: '/logo.webp',
                        requireInteraction: true,
                    });
                }
            });

            socketService.on('call_ended', LISTENER_KEY, () => {
                setIncomingCall(null);
                if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                }
            });

            socketService.on('call_rejected', LISTENER_KEY, () => {
                setIncomingCall(null);
                if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                }
            });
        };

        setupSocket();

        // Poll connection status and auto-reconnect if disconnected
        const interval = setInterval(() => {
            const connected = socketService.isConnected();
            const reg = socketService.isRegistered();
            setSocketStatus(connected ? 'connected' : 'disconnected');
            setRegistered(reg);

            // Auto-reconnect if disconnected
            if (!connected && !reconnectTimerRef.current) {
                reconnectTimerRef.current = setTimeout(() => {
                    reconnectTimerRef.current = null;
                    if (isAuthenticated && user?.id && token) {
                        socketService.connect(user.id, token);
                    }
                }, 2000);
            }
        }, 3000);

        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }

        return () => {
            clearInterval(interval);
            if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
            socketService.off('registered', LISTENER_KEY);
            socketService.off('incoming_call', LISTENER_KEY);
            socketService.off('call_ended', LISTENER_KEY);
            socketService.off('call_rejected', LISTENER_KEY);
        };
    }, [isAuthenticated, user?.id, token]);

    const stopRingtone = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }, []);

    const handleAccept = async () => {
        if (!incomingCall) return;
        stopRingtone();
        try {
            await acceptCall(incomingCall.callId).unwrap();
            window.dispatchEvent(new CustomEvent('open-call-window', {
                detail: {
                    callId: incomingCall.callId,
                    roomName: incomingCall.roomName,
                    token: incomingCall.token,
                    callType: incomingCall.callType,
                    callerName: incomingCall.callerName,
                }
            }));
            setIncomingCall(null);
            toast.success('Call connected!');
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to accept call');
        }
    };

    const handleReject = async () => {
        if (!incomingCall) return;
        stopRingtone();
        try {
            await rejectCall(incomingCall.callId).unwrap();
            toast('Call rejected');
        } catch (err) {
            console.error('Reject error:', err);
        } finally {
            setIncomingCall(null);
        }
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 1 : 0;
            setIsMuted(!isMuted);
        }
    };

    return (
        <>


            {incomingCall && (
                <div className="fixed top-4 right-4 z-[9999]">
                    <div className="bg-white rounded-2xl shadow-2xl w-96 overflow-hidden border-l-4 border-green-500">
                        <div className="bg-gradient-to-r from-green-50 to-white p-4">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-bold text-lg text-gray-800">📞 Incoming Call</h3>
                                <div className="flex gap-1">
                                    {[0, 150, 300].map(d => (
                                        <div key={d} className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
                                            style={{ animationDelay: `${d}ms` }} />
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                                    {incomingCall.callerName?.charAt(0)?.toUpperCase() || <User size={32} />}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 text-lg">{incomingCall.callerName}</p>
                                    <p className="text-sm text-gray-500">{incomingCall.callerEmail}</p>
                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full mt-1 inline-block">
                                        {incomingCall.callType} Call
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={handleAccept} disabled={isAccepting}
                                    className="flex-1 bg-green-500 hover:bg-green-600 disabled:opacity-60 text-white py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all">
                                    <Phone size={18} />
                                    {isAccepting ? 'Connecting...' : 'Accept'}
                                </button>
                                <button onClick={handleReject} disabled={isRejecting}
                                    className="flex-1 bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all">
                                    <PhoneOff size={18} />
                                    Reject
                                </button>
                                <button onClick={toggleMute}
                                    className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-all">
                                    {isMuted ? <VolumeX size={18} className="text-gray-600" /> : <Volume2 size={18} className="text-gray-600" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};