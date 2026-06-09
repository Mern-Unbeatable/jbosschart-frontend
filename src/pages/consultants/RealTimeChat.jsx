import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { useSelector } from 'react-redux';
import {
    Send, Paperclip, ArrowLeft, Search, Phone, Video,
    MessageSquare,
} from 'lucide-react';
import { socketService } from '../../services/socketService';
import {
    useGetConversationsQuery,
    useSendMessageMutation,
    useMarkAsReadMutation,
    useGetOrCreateConversationMutation,
    useStartSessionMutation,
    useEndSessionMutation,
} from '../../features/api/chatApi';
import toast from 'react-hot-toast';
import axios from 'axios';
import MessageBubble from '../../components/chat/MessageBubble';
import ConversationItem from '../../components/chat/ConversationItem';
import BillingBanner from '../../components/chat/BillingBanner';
import SessionSummaryModal from '../../components/chat/SessionSummaryModal';
import StartSessionModal from '../../components/chat/StartSessionModal';

const LISTENER_KEY = 'rtchat';
const PRICE_PER_MINUTE = 2.50;

const RealTimeChat = memo(({
    className = '',
    initialOtherUserId = null,
    showSidebar = true,
    onConversationChange = null,
}) => {
    const { user, token } = useSelector(state => state.auth);
    const walletBalance = useSelector(state => state.auth?.user?.wallet?.creditBalance || 0);

    const isConsultant = user?.role === 'CONSULTANT' || user?.role === 'ADMIN';

    const [activeConv, setActiveConv] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [showMobileSidebar, setShowMobileSidebar] = useState(true);
    const [typingUsers, setTypingUsers] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);

    // Session state
    const [sessionStatus, setSessionStatus] = useState(null);
    const [sessionType, setSessionType] = useState(null);
    const [sessionStartedAt, setSessionStartedAt] = useState(null);
    const [sessionTotalCost, setSessionTotalCost] = useState(0);
    const [currentBalance, setCurrentBalance] = useState(parseFloat(walletBalance));
    const [showStartModal, setShowStartModal] = useState(false);
    const [isEndingSession, setIsEndingSession] = useState(false);
    const [sessionSummary, setSessionSummary] = useState(null);
    const [isStartingSession, setIsStartingSession] = useState(false);

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const fileInputRef = useRef(null);
    const typingTimerRef = useRef(null);
    const activeConvRef = useRef(null);
    activeConvRef.current = activeConv;

    const sessionStatusRef = useRef(null);
    sessionStatusRef.current = sessionStatus;

    const sessionTypeRef = useRef(null);
    sessionTypeRef.current = sessionType;

    const { data: conversations = [], refetch: refetchConversations } = useGetConversationsQuery();
    const [sendMessage] = useSendMessageMutation();
    const [markAsRead] = useMarkAsReadMutation();
    const [getOrCreateConversation] = useGetOrCreateConversationMutation();
    const [startSessionMutation] = useStartSessionMutation();
    const [endSessionMutation] = useEndSessionMutation();


    const isSessionActive = sessionStatus === 'ACTIVE';
    const canSend = !!inputValue.trim() && !isUploading && !isStartingSession && !isEndingSession;

    // ── Socket connect + register ─────────────────────────────────
    useEffect(() => {
        if (!user?.id || !token) return;
        socketService.connect(user.id, token);

        const doRegister = () => socketService.emit('register', user.id);
        doRegister();

        const socket = socketService.socket || socketService._socket;
        if (socket) {
            socket.on('connect', doRegister);
            socket.on('reconnect', doRegister);
            return () => {
                socket.off('connect', doRegister);
                socket.off('reconnect', doRegister);
            };
        }
    }, [user?.id, token]);

    // ── Auto-open conversation from prop ──────────────────────────
    useEffect(() => {
        if (!initialOtherUserId || !user?.id) return;
        getOrCreateConversation(initialOtherUserId)
            .unwrap()
            .then(conv => {
                if (!conv?.id) return;
                setActiveConv(conv);
                setShowMobileSidebar(false);
                if (onConversationChange) onConversationChange(conv.id);
                refetchConversations();
            })
            .catch(() => toast.error('Could not open conversation.'));
    }, [initialOtherUserId, user?.id]);

    // ── Load messages when active conversation changes ────────────
    useEffect(() => {
        if (!activeConv?.id) return;
        setIsLoadingMessages(true);
        setMessages([]);

        const isActive = activeConv.sessionStatus === 'ACTIVE';
        setSessionStatus(isActive ? 'ACTIVE' : null);
        setSessionType(activeConv.sessionType || null);
        setSessionTotalCost(parseFloat(activeConv.totalCost || 0));
        setSessionStartedAt(activeConv.startedAt || null);

        fetch(
            `${process.env.REACT_APP_API_BASE_URL}/chat/conversations/${activeConv.id}/messages?limit=50`,
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then(r => r.json())
            .then(data => {
                setMessages(data?.data?.messages || []);
                setIsLoadingMessages(false);
            })
            .catch(() => setIsLoadingMessages(false));

        markAsRead(activeConv.id);
        socketService.emit('join_conversation', { conversationId: activeConv.id });
    }, [activeConv?.id, token, markAsRead]);

    // ── Sync wallet balance from Redux ────────────────────────────
    useEffect(() => {
        setCurrentBalance(parseFloat(walletBalance));
    }, [walletBalance]);

    // ── Socket event listeners ────────────────────────────────────
    useEffect(() => {
        if (!user?.id) return;

        socketService.on('new_message', LISTENER_KEY, (data) => {
            if (data.conversationId === activeConvRef.current?.id) {
                setMessages(prev => {
                    if (prev.some(m => m.id === data.message.id)) return prev;
                    if (
                        data.message.senderId === user.id &&
                        prev.some(m => m.id.startsWith('temp-') && m.senderId === user.id)
                    ) {
                        return prev.map(m =>
                            m.id.startsWith('temp-') && m.senderId === user.id ? data.message : m
                        );
                    }
                    return [...prev, data.message];
                });
                markAsRead(data.conversationId);
            }
            refetchConversations();
        });

        socketService.on('new_file', LISTENER_KEY, (data) => {
            if (data.conversationId === activeConvRef.current?.id) {
                setMessages(prev => {
                    if (prev.some(m => m.id === data.message.id)) return prev;
                    if (data.message.senderId === user.id) {
                        const tempIdx = prev.findIndex(
                            m => m.id.startsWith('temp-') && m.senderId === data.message.senderId && m.fileUrl === data.message.fileUrl
                        );
                        if (tempIdx !== -1) {
                            const next = [...prev];
                            next[tempIdx] = data.message;
                            return next;
                        }
                        return prev;
                    }
                    return [...prev, data.message];
                });
            }
            refetchConversations();
        });

        socketService.on('user_typing', LISTENER_KEY, (data) => {
            if (data.conversationId === activeConvRef.current?.id && data.userId !== user.id) {
                setTypingUsers(prev => ({ ...prev, [data.userId]: data.isTyping }));
            }
        });

        socketService.on('messages_read', LISTENER_KEY, (data) => {
            if (data.conversationId === activeConvRef.current?.id) {
                setMessages(prev => prev.map(m => m.senderId === user.id ? { ...m, isRead: true } : m));
            }
        });

        socketService.on('session_started', LISTENER_KEY, (data) => {
            if (data.conversationId === activeConvRef.current?.id) {
                // ✅ Don't override if we're in ENDING state
                if (sessionStatusRef.current === 'ENDING' || sessionStatusRef.current === 'ENDED') return;

                setSessionStatus('ACTIVE');
                setSessionType(data.sessionType);
                setSessionStartedAt(data.startedAt);
                setSessionTotalCost(0);
                setIsStartingSession(false);
                refetchConversations();
                toast.success(`${data.sessionType} session started · €${PRICE_PER_MINUTE}/min`, { duration: 3000 });
            }
        });

        socketService.on('billing_tick', LISTENER_KEY, (data) => {
            // ✅ Don't update cost if we're ending — prevents cost jumping after click
            if (sessionStatusRef.current === 'ENDING' || sessionStatusRef.current === 'ENDED') return;

            if (data.conversationId === activeConvRef.current?.id) {
                setSessionTotalCost(prev => data.amountCharged ? prev + data.amountCharged : prev + PRICE_PER_MINUTE);
                if (data.balanceAfter !== undefined) setCurrentBalance(data.balanceAfter);
            }
        });

        socketService.on('balance_warning', LISTENER_KEY, (data) => {
            if (data.conversationId === activeConvRef.current?.id) {
                if (data.type === 'critical') {
                    toast.error(`⚠️ Less than 1 minute remaining! (€${parseFloat(data.remainingBalance || 0).toFixed(2)})`, { duration: 8000 });
                } else {
                    toast(`⚠️ Only ${data.remainingMinutes} min remaining`, { icon: '', duration: 5000 });
                }
            }
        });

        // ✅ Socket session_ended is a safety net — REST API response is the primary handler
        socketService.on('session_ended', LISTENER_KEY, (data) => {
            if (data.conversationId === activeConvRef.current?.id) {
                // ✅ If we already handled it via REST API, just refetch
                if (sessionStatusRef.current === 'ENDED') {
                    refetchConversations();
                    return;
                }

                // Otherwise handle it here (e.g. other user ended the session)
                setSessionStatus('ENDED');
                setIsEndingSession(false);
                setIsStartingSession(false);

                const totalMin = Number(data.totalMinutes || 0).toFixed(2);
                const totalCost = Number(data.totalCost || 0).toFixed(2);

                if (data.reason === 'insufficient_balance') {
                    toast.error('⚠️ Session ended: Insufficient balance', { duration: 6000 });
                } else {
                    toast.success(`Session ended · ${totalMin} min · €${totalCost}`, { duration: 4000 });
                }

                if (!isConsultant) {
                    setSessionSummary({
                        sessionType: data.sessionType || sessionTypeRef.current,
                        totalMinutes: totalMin,
                        totalCost: totalCost,
                    });
                }
                refetchConversations();
            }
        });

        return () => {
            ['new_message', 'new_file', 'user_typing', 'messages_read', 'session_started', 'billing_tick', 'balance_warning', 'session_ended']
                .forEach(e => socketService.off(e, LISTENER_KEY));
        };
    }, [user?.id, isConsultant]);

    // ── Auto-scroll ───────────────────────────────────────────────
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, typingUsers]);

    // ── Handlers ──────────────────────────────────────────────────

    const handleSelectConversation = useCallback((conv) => {
        setActiveConv(conv);
        setShowMobileSidebar(false);
        setMessages([]);
        setTypingUsers({});
        setSessionStatus(null);
        setSessionSummary(null);
        setIsStartingSession(false);
        setIsEndingSession(false);
        if (onConversationChange && conv?.id) onConversationChange(conv.id);
    }, [onConversationChange]);

    const handleSend = useCallback(async () => {
        const text = inputValue.trim();
        if (!text || !activeConvRef.current?.id || isStartingSession || isEndingSession) return;

        // Consultants need active session
        if (isConsultant) {
            if (sessionStatusRef.current !== 'ACTIVE') {
                toast.error('No active session. Wait for the client to start one.');
                return;
            }
            setInputValue('');
            socketService.emit('typing_stop', { conversationId: activeConvRef.current.id });

            const tempId = `temp-${Date.now()}`;
            const optimistic = {
                id: tempId, conversationId: activeConvRef.current.id, senderId: user.id,
                message: text, isRead: false, createdAt: new Date().toISOString(),
                sender: { id: user.id, name: user.name, avatar: user.avatar, role: user.role },
            };
            setMessages(prev => [...prev, optimistic]);

            try {
                const result = await sendMessage({ conversationId: activeConvRef.current.id, message: text }).unwrap();
                if (result?.id) setMessages(prev => prev.map(m => m.id === tempId ? result : m));
                refetchConversations();
            } catch (err) {
                setMessages(prev => prev.filter(m => m.id !== tempId));
                toast.error(err?.data?.message || 'Failed to send message');
            }
            return;
        }

        // User: auto-start session if not active
        if (!isSessionActive) {
            if (currentBalance < PRICE_PER_MINUTE) {
                toast.error(`Insufficient balance. Minimum €${PRICE_PER_MINUTE} required.`);
                return;
            }

            setIsStartingSession(true);
            try {
                await startSessionMutation({
                    conversationId: activeConvRef.current.id,
                    sessionType: 'CHAT',
                }).unwrap();

                setSessionStatus('ACTIVE');
                setSessionType('CHAT');
                setSessionTotalCost(0);
                setSessionStartedAt(new Date().toISOString());
            } catch (err) {
                setIsStartingSession(false);
                toast.error(err?.data?.message || 'Failed to start session.');
                return;
            }
            setIsStartingSession(false);
        }

        // Send the message
        setInputValue('');
        socketService.emit('typing_stop', { conversationId: activeConvRef.current.id });

        const tempId = `temp-${Date.now()}`;
        const optimistic = {
            id: tempId, conversationId: activeConvRef.current.id, senderId: user.id,
            message: text, isRead: false, createdAt: new Date().toISOString(),
            sender: { id: user.id, name: user.name, avatar: user.avatar, role: user.role },
        };
        setMessages(prev => [...prev, optimistic]);

        try {
            const result = await sendMessage({ conversationId: activeConvRef.current.id, message: text }).unwrap();
            if (result?.id) setMessages(prev => prev.map(m => m.id === tempId ? result : m));
            refetchConversations();
        } catch (err) {
            setMessages(prev => prev.filter(m => m.id !== tempId));
            toast.error(err?.data?.message || 'Failed to send message');
        }
    }, [inputValue, user, sendMessage, refetchConversations, isSessionActive, isConsultant, startSessionMutation, currentBalance, isStartingSession, isEndingSession]);

    const handleFileUpload = useCallback(async (file) => {
        if (!file || !activeConvRef.current?.id) return;
        if (!isSessionActive) { toast.error('No active session.'); return; }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/chat/upload`,
                formData,
                { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
            );
            const { fileUrl, fileName, fileType, fileSize } = res.data.data;
            const tempId = `temp-${Date.now()}`;
            const optimistic = {
                id: tempId, conversationId: activeConvRef.current.id, senderId: user.id,
                fileUrl, fileName, fileType, fileSize, isRead: false, createdAt: new Date().toISOString(),
                sender: { id: user.id, name: user.name, avatar: user.avatar, role: user.role },
            };
            setMessages(prev => [...prev, optimistic]);
            socketService.emit('send_file', { conversationId: activeConvRef.current.id, fileUrl, fileName, fileType, fileSize }, (r) => {
                if (r?.success) setMessages(prev => prev.map(m => m.id === tempId ? r.message : m));
            });
            refetchConversations();
        } catch { toast.error('File upload failed'); }
        finally { setIsUploading(false); if (fileInputRef.current) fileInputRef.current.value = ''; }
    }, [token, user, refetchConversations, isSessionActive]);

    const handleStartSession = useCallback(async (type) => {
        if (!activeConvRef.current?.id) return;
        setShowStartModal(false);
        setIsStartingSession(true);
        try {
            await startSessionMutation({ conversationId: activeConvRef.current.id, sessionType: type }).unwrap();
            setSessionStatus('ACTIVE');
            setSessionType(type);
            setSessionTotalCost(0);
            setSessionStartedAt(new Date().toISOString());
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to start session');
            setIsStartingSession(false);
        }
    }, [startSessionMutation]);

    // ✅✅✅ KEY FIX: End session — IMMEDIATELY stops UI, then API call
    const handleEndSession = useCallback(async () => {
        if (!activeConvRef.current?.id || isEndingSession) return;

        // ✅ STEP 1: Immediately freeze the UI
        // Setting 'ENDING' makes isSessionActive = false → BillingBanner unmounts → timer STOPS
        setIsEndingSession(true);
        setSessionStatus('ENDING');

        // ✅ STEP 2: Show instant toast
        toast.loading('Ending session...', { id: 'end-session' });

        try {
            // ✅ STEP 3: Call REST API
            const result = await endSessionMutation(activeConvRef.current.id).unwrap();

            // ✅ STEP 4: Success — show final toast + summary
            toast.dismiss('end-session');

            const totalMin = Number(result?.totalMinutes || 0).toFixed(2);
            const totalCost = Number(result?.totalCost || 0).toFixed(2);

            toast.success(`Session ended · ${totalMin} min · €${totalCost}`, { duration: 4000 });

            // ✅ STEP 5: Set final state
            setSessionStatus('ENDED');
            setIsEndingSession(false);

            // ✅ STEP 6: Show summary modal for users
            if (!isConsultant) {
                setSessionSummary({
                    sessionType: result?.sessionType || sessionTypeRef.current || 'CHAT',
                    totalMinutes: totalMin,
                    totalCost: totalCost,
                });
            }

            refetchConversations();

        } catch (err) {
            // ✅ On error — revert to ACTIVE so user can try again
            toast.dismiss('end-session');
            setIsEndingSession(false);
            setSessionStatus('ACTIVE');
            toast.error(err?.data?.message || 'Failed to end session. Please try again.');
        }
    }, [endSessionMutation, isConsultant, isEndingSession]);

    const handleTyping = useCallback((e) => {
        setInputValue(e.target.value);
        if (!activeConvRef.current?.id) return;
        if (!isSessionActive && !isConsultant) return;
        socketService.emit('typing_start', { conversationId: activeConvRef.current.id });
        clearTimeout(typingTimerRef.current);
        typingTimerRef.current = setTimeout(() => {
            socketService.emit('typing_stop', { conversationId: activeConvRef.current.id });
        }, 1500);
    }, [isSessionActive, isConsultant]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
    }, [handleSend]);

    const isTyping = Object.values(typingUsers).some(Boolean);
    const filteredConversations = conversations.filter(c =>
        c.otherUser?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const inputPlaceholder = () => {
        if (isStartingSession) return 'Starting session…';
        if (isEndingSession) return 'Ending session…';
        if (isConsultant && !isSessionActive) return 'Waiting for client to start a session…';
        if (isSessionActive) return 'Type a message…';
        return 'Type a message and hit send to start a session…';
    };

    // ── Format elapsed time for the "Ending" banner ───────────────
    const formatElapsedTime = () => {
        if (!sessionStartedAt) return '';
        const seconds = Math.floor((Date.now() - new Date(sessionStartedAt).getTime()) / 1000);
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <>
            <div className={`flex h-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm ${className}`}>

                {/* Sidebar */}
                {showSidebar && (
                    <aside className={`${showMobileSidebar ? 'flex' : 'hidden'} lg:flex flex-col w-full lg:w-80 shrink-0 border-r border-gray-100`}>
                        <div className='px-4 py-4 border-b border-gray-100'>
                            <h2 className='text-lg font-bold text-gray-900 mb-3'>Messages</h2>
                            <div className='relative'>
                                <Search size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                                <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                                    placeholder='Search conversations...'
                                    className='w-full pl-9 pr-4 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6E35AE]/30' />
                            </div>
                        </div>
                        <div className='flex-1 overflow-y-auto'>
                            {filteredConversations.length === 0
                                ? <div className='flex items-center justify-center h-48 text-gray-400 text-sm'>No conversations yet</div>
                                : filteredConversations.map(conv => (
                                    <ConversationItem key={conv.id} conv={conv}
                                        isActive={activeConv?.id === conv.id} onClick={handleSelectConversation} />
                                ))
                            }
                        </div>
                    </aside>
                )}

                {/* Chat Window */}
                <section className={`${showSidebar ? (!showMobileSidebar ? 'flex' : 'hidden') : 'flex'} lg:flex flex-col flex-1 min-w-0`}>
                    {!activeConv ? (
                        <div className='flex-1 flex flex-col items-center justify-center text-gray-400 gap-3'>
                            <div className='w-16 h-16 rounded-full bg-[#F5F1FD] flex items-center justify-center'>
                                <MessageSquare size={24} className='text-[#6E35AE]' />
                            </div>
                            <p className='text-sm font-medium'>
                                {showSidebar ? 'Select a conversation to start' : 'Loading conversation...'}
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Header */}
                            <div className='flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-white shrink-0'>
                                {showSidebar && (
                                    <button onClick={() => setShowMobileSidebar(true)} className='lg:hidden text-gray-500'>
                                        <ArrowLeft size={20} />
                                    </button>
                                )}
                                <div className='w-10 h-10 rounded-full bg-[#D1C4E9] flex items-center justify-center text-[#6E35AE] font-bold overflow-hidden shrink-0'>
                                    {activeConv.otherUser?.avatar
                                        ? <img src={activeConv.otherUser.avatar} alt='' className='w-full h-full object-cover' />
                                        : activeConv.otherUser?.name?.charAt(0)?.toUpperCase() || '?'
                                    }
                                </div>
                                <div className='flex-1 min-w-0'>
                                    <p className='font-semibold text-gray-900 text-sm'>{activeConv.otherUser?.name}</p>
                                    <p className='text-xs text-gray-400 capitalize'>{activeConv.otherUser?.role?.toLowerCase()}</p>
                                </div>

                                {isSessionActive && sessionType && (
                                    <div className='flex items-center gap-1 text-xs text-[#6E35AE] bg-[#F5F1FD] px-2 py-1 rounded-full'>
                                        {sessionType === 'CHAT' && <MessageSquare size={12} />}
                                        {sessionType === 'AUDIO' && <Phone size={12} />}
                                        {sessionType === 'VIDEO' && <Video size={12} />}
                                        <span className='font-medium'>{sessionType}</span>
                                    </div>
                                )}
                            </div>

                            {/* Info banner — users before session starts */}
                            {!isSessionActive && !isConsultant && sessionStatus !== 'ENDING' && (
                                <div className='px-4 py-2 bg-amber-50 border-b border-amber-200 text-center'>
                                    <p className='text-xs text-amber-700'>
                                        Send a message to auto-start a <strong>CHAT</strong> session (€{PRICE_PER_MINUTE}/min)
                                    </p>
                                </div>
                            )}

                            {/* ✅ ENDING banner — shown instead of BillingBanner when ending */}
                            {sessionStatus === 'ENDING' && (
                                <div className='px-4 py-3 bg-orange-50 border-b border-orange-200 flex items-center justify-center gap-2'>
                                    <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500' />
                                    <span className='text-sm text-orange-700 font-medium'>
                                        Ending session... {formatElapsedTime()} · €{Number(sessionTotalCost || 0).toFixed(2)}
                                    </span>
                                </div>
                            )}

                            {/* Billing Banner — active session only (NOT when ENDING) */}
                            {isSessionActive && sessionStatus !== 'ENDING' && (
                                <BillingBanner
                                    sessionType={sessionType}
                                    startedAt={sessionStartedAt}
                                    totalCost={sessionTotalCost}
                                    walletBalance={currentBalance}
                                    onEnd={handleEndSession}
                                    isEnding={isEndingSession}
                                />
                            )}

                            {/* Messages */}
                            <div className='flex-1 overflow-y-auto px-4 py-4 bg-gray-50'>
                                {isLoadingMessages ? (
                                    <div className='flex justify-center py-8'>
                                        <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-[#6E35AE]' />
                                    </div>
                                ) : messages.length === 0 ? (
                                    <div className='flex flex-col items-center justify-center h-full text-gray-400 gap-3'>
                                        <MessageSquare size={32} className='text-gray-200' />
                                        <p className='text-sm'>No messages yet</p>
                                        {!isSessionActive && !isConsultant && sessionStatus !== 'ENDING' && (
                                            <p className='text-xs text-gray-300'>Type a message below to begin</p>
                                        )}
                                    </div>
                                ) : (
                                    <>
                                        {messages.map(msg => (
                                            <MessageBubble key={msg.id} msg={msg} isOwn={msg.senderId === user?.id} />
                                        ))}
                                        {isTyping && (
                                            <div className='flex items-center gap-2 mt-2'>
                                                <div className='bg-white rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-sm border border-gray-100'>
                                                    <div className='flex gap-1'>
                                                        {[0, 1, 2].map(i => (
                                                            <div key={i} className='w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce'
                                                                style={{ animationDelay: `${i * 0.15}s` }} />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Bar */}
                            <div className='px-4 py-3 border-t border-gray-100 bg-white shrink-0'>
                                {isUploading && (
                                    <div className='flex items-center gap-2 mb-2 text-xs text-[#6E35AE]'>
                                        <div className='animate-spin rounded-full h-3 w-3 border-b border-[#6E35AE]' />
                                        Uploading file...
                                    </div>
                                )}
                                {isStartingSession && (
                                    <div className='flex items-center gap-2 mb-2 text-xs text-amber-600'>
                                        <div className='animate-spin rounded-full h-3 w-3 border-b border-amber-600' />
                                        Starting session…
                                    </div>
                                )}
                                {sessionStatus === 'ENDING' && (
                                    <div className='flex items-center gap-2 mb-2 text-xs text-orange-600'>
                                        <div className='animate-spin rounded-full h-3 w-3 border-b border-orange-600' />
                                        Ending session…
                                    </div>
                                )}
                                <div className='flex items-end gap-2'>
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={!isSessionActive || isUploading}
                                        className={`shrink-0 w-9 h-9 flex items-center justify-center rounded-full transition-colors ${!isSessionActive ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100 text-gray-500'}`}
                                    >
                                        <Paperclip size={18} />
                                    </button>
                                    <input ref={fileInputRef} type='file' accept='image/*,video/*,.pdf,.doc,.docx,.txt,.zip' className='hidden'
                                        onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0])} />

                                    <textarea
                                        ref={inputRef}
                                        value={inputValue}
                                        onChange={handleTyping}
                                        onKeyDown={handleKeyDown}
                                        placeholder={inputPlaceholder()}
                                        disabled={isStartingSession || isEndingSession}
                                        rows={1}
                                        className={`flex-1 resize-none rounded-2xl px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6E35AE]/30 max-h-32 overflow-y-auto ${isStartingSession || isEndingSession ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-50 text-gray-800'}`}
                                        style={{ minHeight: '40px' }}
                                    />

                                    <button
                                        onClick={handleSend}
                                        disabled={!canSend}
                                        className={`shrink-0 w-9 h-9 flex items-center justify-center rounded-full transition-colors ${!canSend ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#6E35AE] hover:bg-[#5A2A8A] text-white'}`}
                                    >
                                        {isStartingSession || isEndingSession
                                            ? <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white' />
                                            : <Send size={16} />
                                        }
                                    </button>
                                </div>

                                <p className='text-xs text-center text-gray-400 mt-2'>
                                    {sessionStatus === 'ENDING'
                                        ? 'Ending session…'
                                        : isConsultant
                                            ? isSessionActive ? 'Session active · Respond to your client' : 'Waiting for client to start a session'
                                            : isSessionActive ? `Session active · €${PRICE_PER_MINUTE}/minute` : `First message starts a CHAT session · €${PRICE_PER_MINUTE}/min`
                                    }
                                </p>
                            </div>
                        </>
                    )}
                </section>
            </div>

            {/* Modals */}
            {showStartModal && (
                <StartSessionModal
                    walletBalance={currentBalance}
                    onStart={handleStartSession}
                    onClose={() => setShowStartModal(false)}
                />
            )}

            {sessionSummary && (
                <SessionSummaryModal
                    summary={sessionSummary}
                    onClose={() => setSessionSummary(null)}
                />
            )}
        </>
    );
});

RealTimeChat.displayName = 'RealTimeChat';
export default RealTimeChat;