// import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
// import { useSelector } from 'react-redux';
// import {
//     Send, Paperclip, ArrowLeft, File, Download,
//     Check, CheckCheck, Search, Phone, Video, PhoneOff,
//     Euro, Clock, AlertCircle, MessageSquare, X,
// } from 'lucide-react';
// import { socketService } from '../../services/socketService';
// import {
//     useGetConversationsQuery,
//     useSendMessageMutation,
//     useMarkAsReadMutation,
//     useGetOrCreateConversationMutation,
//     useStartSessionMutation,
//     useEndSessionMutation,
// } from '../../features/api/chatApi';
// import toast from 'react-hot-toast';
// import axios from 'axios';

// const LISTENER_KEY = 'rtchat';
// const PRICE_PER_MINUTE = 2.50;

// // ─── BillingBanner ────────────────────────────────────────────────────────────
// const BillingBanner = memo(({ sessionType, startedAt, totalCost, walletBalance, onEnd }) => {
//     const [elapsed, setElapsed] = useState(0);
//     const [displayCost, setDisplayCost] = useState(parseFloat(totalCost || 0));

//     useEffect(() => {
//         if (!startedAt) return;
//         const updateElapsed = () => {
//             const diffSeconds = Math.floor((new Date() - new Date(startedAt)) / 1000);
//             setElapsed(diffSeconds);
//         };
//         updateElapsed();
//         const interval = setInterval(updateElapsed, 1000);
//         return () => clearInterval(interval);
//     }, [startedAt]);

//     useEffect(() => {
//         setDisplayCost(parseFloat(totalCost || 0));
//     }, [totalCost]);

//     const mins = Math.floor(elapsed / 60);
//     const secs = elapsed % 60;

//     const icon = sessionType === 'VIDEO'
//         ? <Video size={14} />
//         : sessionType === 'AUDIO'
//             ? <Phone size={14} />
//             : <MessageSquare size={14} />;

//     return (
//         <div className='flex items-center justify-between px-4 py-2 bg-[#6E35AE]/10 border-b border-[#6E35AE]/20 text-sm shrink-0'>
//             <div className='flex items-center gap-3 flex-wrap'>
//                 <span className='flex items-center gap-1.5 text-[#6E35AE] font-semibold'>
//                     <span className='w-2 h-2 rounded-full bg-red-500 animate-pulse' />
//                     {icon} {sessionType} session
//                 </span>
//                 <span className='flex items-center gap-1 text-gray-600'>
//                     <Clock size={13} />
//                     {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
//                 </span>
//                 <span className='flex items-center gap-1 text-gray-600'>
//                     <Euro size={13} />
//                     €{displayCost.toFixed(2)} billed
//                 </span>
//                 <span className='text-xs text-gray-500'>
//                     Balance: <strong className='text-gray-800'>€{parseFloat(walletBalance || 0).toFixed(2)}</strong>
//                 </span>
//             </div>
//             <button
//                 onClick={onEnd}
//                 className='flex items-center gap-1 px-3 py-1 rounded-full bg-red-500 hover:bg-red-600 text-white text-xs font-semibold transition-colors shrink-0'
//             >
//                 <PhoneOff size={12} /> End Session
//             </button>
//         </div>
//     );
// });
// BillingBanner.displayName = 'BillingBanner';

// // ─── EndSessionConfirmModal ───────────────────────────────────────────────────
// const EndSessionConfirmModal = memo(({ onConfirm, onCancel, isEnding }) => (
//     <div className='fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-4'>
//         <div className='bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl'>
//             <div className='flex items-center justify-center w-14 h-14 rounded-full bg-red-100 mx-auto mb-4'>
//                 <PhoneOff size={24} className='text-red-500' />
//             </div>
//             <h3 className='text-lg font-bold text-gray-900 text-center mb-2'>End Session?</h3>
//             <p className='text-sm text-gray-500 text-center mb-6'>
//                 This will end the current billing session. A transcript will be sent to your email.
//             </p>
//             <div className='flex gap-3'>
//                 <button
//                     onClick={onCancel}
//                     className='flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors'
//                 >
//                     Cancel
//                 </button>
//                 <button
//                     onClick={onConfirm}
//                     disabled={isEnding}
//                     className='flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-semibold text-sm transition-colors'
//                 >
//                     {isEnding ? 'Ending...' : 'End Session'}
//                 </button>
//             </div>
//         </div>
//     </div>
// ));
// EndSessionConfirmModal.displayName = 'EndSessionConfirmModal';

// // ─── SessionSummaryModal ──────────────────────────────────────────────────────
// const SessionSummaryModal = memo(({ summary, onClose }) => {
//     if (!summary) return null;
//     return (
//         <div className='fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-4'>
//             <div className='bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl'>
//                 <div className='flex items-center justify-center w-14 h-14 rounded-full bg-green-100 mx-auto mb-4'>
//                     <Check size={24} className='text-green-500' />
//                 </div>
//                 <h3 className='text-xl font-bold text-gray-900 text-center mb-6'>Session Ended</h3>
//                 <div className='space-y-3 mb-6'>
//                     <div className='flex justify-between text-sm'>
//                         <span className='text-gray-500'>Session Type</span>
//                         <span className='font-semibold text-gray-800'>{summary.sessionType}</span>
//                     </div>
//                     <div className='flex justify-between text-sm'>
//                         <span className='text-gray-500'>Duration</span>
//                         <span className='font-semibold text-gray-800'>{summary.totalMinutes || 0} min</span>
//                     </div>
//                     <div className='flex justify-between text-sm'>
//                         <span className='text-gray-500'>Rate</span>
//                         <span className='font-semibold text-gray-800'>€{PRICE_PER_MINUTE}/min</span>
//                     </div>
//                     <div className='border-t pt-3 flex justify-between'>
//                         <span className='font-bold text-gray-800'>Total Charged</span>
//                         <span className='font-bold text-[#6E35AE] text-lg'>€{parseFloat(summary.totalCost || 0).toFixed(2)}</span>
//                     </div>
//                 </div>
//                 <p className='text-xs text-gray-400 text-center mb-4'>
//                     A transcript has been sent to your email.
//                 </p>
//                 <button
//                     onClick={onClose}
//                     className='w-full bg-[#6E35AE] hover:bg-[#5A2A8A] text-white py-3 rounded-xl font-semibold transition-colors'
//                 >
//                     Close
//                 </button>
//             </div>
//         </div>
//     );
// });
// SessionSummaryModal.displayName = 'SessionSummaryModal';

// // ─── StartSessionModal ────────────────────────────────────────────────────────
// const StartSessionModal = memo(({ onStart, onClose, walletBalance }) => {
//     const canAfford = parseFloat(walletBalance || 0) >= PRICE_PER_MINUTE;
//     return (
//         <div className='fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-4'>
//             <div className='bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl'>
//                 <div className='flex justify-between items-start mb-6'>
//                     <h3 className='text-xl font-bold text-gray-900'>Start Paid Session</h3>
//                     <button onClick={onClose} className='text-gray-400 hover:text-gray-600'><X size={20} /></button>
//                 </div>
//                 {!canAfford && (
//                     <div className='flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg mb-4 text-sm text-red-700'>
//                         <AlertCircle size={16} />
//                         Insufficient balance. Minimum €{PRICE_PER_MINUTE} required.
//                     </div>
//                 )}
//                 <p className='text-sm text-gray-500 mb-6'>
//                     Billed at <strong className='text-gray-800'>€{PRICE_PER_MINUTE}/minute</strong>.
//                     Current balance: <strong className='text-gray-800'>€{parseFloat(walletBalance || 0).toFixed(2)}</strong>
//                 </p>
//                 <div className='grid grid-cols-3 gap-3'>
//                     {[
//                         { type: 'CHAT', label: 'Chat', Icon: MessageSquare, color: 'bg-[#333333]' },
//                         { type: 'AUDIO', label: 'Audio', Icon: Phone, color: 'bg-[#E2AB0B]' },
//                         { type: 'VIDEO', label: 'Video', Icon: Video, color: 'bg-[#6E35AE]' },
//                     ].map(({ type, label, Icon, color }) => (
//                         <button
//                             key={type}
//                             disabled={!canAfford}
//                             onClick={() => onStart(type)}
//                             className={`flex flex-col items-center gap-2 py-4 rounded-xl ${color} text-white font-semibold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90`}
//                         >
//                             <Icon size={20} /> {label}
//                         </button>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// });
// StartSessionModal.displayName = 'StartSessionModal';

// // ─── MessageBubble ────────────────────────────────────────────────────────────
// const MessageBubble = memo(({ msg, isOwn }) => {
//     const isImage = msg.fileType?.startsWith('image/');
//     const isVideo = msg.fileType?.startsWith('video/');
//     const isFile = msg.fileUrl && !isImage && !isVideo;
//     const isSystem = msg.isSystem;
//     const time = new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//     if (isSystem) {
//         return (
//             <div className='flex justify-center my-3'>
//                 <span className='text-xs text-gray-400 bg-gray-100 px-4 py-1.5 rounded-full text-center max-w-xs'>
//                     {msg.message}
//                 </span>
//             </div>
//         );
//     }

//     return (
//         <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-1`}>
//             <div className={`max-w-[70%] flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
//                 {isImage && (
//                     <div className={`rounded-2xl overflow-hidden ${isOwn ? 'rounded-br-sm' : 'rounded-bl-sm'}`}>
//                         <img
//                             src={msg.fileUrl} alt={msg.fileName || 'image'}
//                             className='max-w-xs max-h-64 object-cover cursor-pointer'
//                             onClick={() => window.open(msg.fileUrl, '_blank')}
//                         />
//                     </div>
//                 )}
//                 {isVideo && (
//                     <div className={`rounded-2xl overflow-hidden ${isOwn ? 'rounded-br-sm' : 'rounded-bl-sm'}`}>
//                         <video controls className='max-w-xs max-h-64 rounded-2xl'>
//                             <source src={msg.fileUrl} />
//                         </video>
//                     </div>
//                 )}
//                 {isFile && (
//                     <a href={msg.fileUrl} target='_blank' rel='noreferrer' download={msg.fileName}
//                         className={`flex items-center gap-3 px-4 py-3 rounded-2xl ${isOwn
//                             ? 'rounded-br-sm bg-[#6E35AE] text-white'
//                             : 'rounded-bl-sm bg-white text-gray-800 border border-gray-100'}`}>
//                         <File size={20} />
//                         <div>
//                             <p className='text-sm font-medium truncate max-w-[160px]'>{msg.fileName}</p>
//                             <p className='text-xs opacity-70'>{msg.fileSize ? `${(msg.fileSize / 1024).toFixed(1)} KB` : 'File'}</p>
//                         </div>
//                         <Download size={16} />
//                     </a>
//                 )}
//                 {msg.message && (
//                     <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${isOwn
//                         ? 'bg-[#6E35AE] text-white rounded-br-sm'
//                         : 'bg-white text-gray-800 rounded-bl-sm border border-gray-100 shadow-sm'
//                         } ${(isImage || isVideo || isFile) ? 'mt-1' : ''}`}>
//                         {msg.message}
//                     </div>
//                 )}
//                 <div className={`flex items-center gap-1 mt-0.5 px-1 ${isOwn ? 'flex-row-reverse' : ''}`}>
//                     <span className='text-[10px] text-gray-400'>{time}</span>
//                     {isOwn && (msg.isRead
//                         ? <CheckCheck size={12} className='text-[#6E35AE]' />
//                         : <Check size={12} className='text-gray-400' />
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// });
// MessageBubble.displayName = 'MessageBubble';

// // ─── ConversationItem ─────────────────────────────────────────────────────────
// const ConversationItem = memo(({ conv, isActive, onClick }) => {
//     const lastMsg = conv.lastMessage;
//     const time = lastMsg
//         ? new Date(lastMsg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//         : '';
//     const isActiveSession = conv.sessionStatus === 'ACTIVE';
//     const hasUnread = conv.unreadCount > 0;

//     return (
//         <button onClick={() => onClick(conv)}
//             className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors ${isActive ? 'bg-[#F5F1FD]' : 'hover:bg-gray-50'}`}>
//             <div className='relative shrink-0'>
//                 <div className='w-12 h-12 rounded-full bg-[#D1C4E9] flex items-center justify-center text-[#6E35AE] font-bold text-lg overflow-hidden'>
//                     {conv.otherUser?.avatar
//                         ? <img src={conv.otherUser.avatar} alt='' className='w-full h-full object-cover'
//                             onError={e => (e.target.style.display = 'none')} />
//                         : conv.otherUser?.name?.charAt(0)?.toUpperCase() || '?'
//                     }
//                 </div>
//                 {isActiveSession && (
//                     <span className='absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white animate-pulse' />
//                 )}
//             </div>
//             <div className='flex-1 min-w-0'>
//                 <div className='flex justify-between items-center mb-0.5'>
//                     <p className={`text-sm truncate ${hasUnread ? 'font-bold text-gray-900' : 'font-semibold text-gray-900'}`}>
//                         {conv.otherUser?.name || 'Unknown'}
//                     </p>
//                     <span className='text-[10px] text-gray-400 shrink-0 ml-1'>{time}</span>
//                 </div>
//                 <div className='flex justify-between items-center'>
//                     <p className={`text-xs truncate ${hasUnread ? 'font-medium text-gray-700' : 'text-gray-500'}`}>
//                         {isActiveSession
//                             ? <span className='text-red-500 font-medium'>● Live session</span>
//                             : lastMsg?.message || (lastMsg?.fileUrl ? '📎 File' : 'No messages yet')
//                         }
//                     </p>
//                     {hasUnread && (
//                         <span className='ml-1 bg-[#6E35AE] text-white text-[10px] rounded-full min-w-[18px] h-[18px] flex items-center justify-center shrink-0 px-1'>
//                             {conv.unreadCount > 99 ? '99+' : conv.unreadCount > 9 ? '9+' : conv.unreadCount}
//                         </span>
//                     )}
//                 </div>
//             </div>
//         </button>
//     );
// });
// ConversationItem.displayName = 'ConversationItem';

// // ─── RealTimeChat ─────────────────────────────────────────────────────────────
// const RealTimeChat = memo(({
//     className = '',
//     initialOtherUserId = null,
//     showSidebar = true,
//     onConversationChange = null,
// }) => {
//     const { user, token } = useSelector(state => state.auth);
//     const walletBalance = useSelector(state => state.auth?.user?.wallet?.creditBalance || 0);

//     // FIX: Consultants and admins can always type — they never pay
//     const isConsultant = user?.role === 'CONSULTANT' || user?.role === 'ADMIN';

//     const [activeConv, setActiveConv] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [inputValue, setInputValue] = useState('');
//     const [isUploading, setIsUploading] = useState(false);
//     const [showMobileSidebar, setShowMobileSidebar] = useState(true);
//     const [typingUsers, setTypingUsers] = useState({});
//     const [searchQuery, setSearchQuery] = useState('');
//     const [isLoadingMessages, setIsLoadingMessages] = useState(false);

//     // Session state
//     const [sessionStatus, setSessionStatus] = useState(null);
//     const [sessionType, setSessionType] = useState(null);
//     const [sessionStartedAt, setSessionStartedAt] = useState(null);
//     const [sessionTotalCost, setSessionTotalCost] = useState(0);
//     const [currentBalance, setCurrentBalance] = useState(parseFloat(walletBalance));
//     const [showStartModal, setShowStartModal] = useState(false);
//     const [showEndConfirm, setShowEndConfirm] = useState(false);
//     const [isEndingSession, setIsEndingSession] = useState(false);
//     const [sessionSummary, setSessionSummary] = useState(null);

//     // FIX: Track if a session auto-start is in progress to prevent double-clicks
//     const [isStartingSession, setIsStartingSession] = useState(false);

//     const messagesEndRef = useRef(null);
//     const inputRef = useRef(null);
//     const fileInputRef = useRef(null);
//     const typingTimerRef = useRef(null);
//     const activeConvRef = useRef(null);
//     activeConvRef.current = activeConv;

//     const sessionStatusRef = useRef(null);
//     sessionStatusRef.current = sessionStatus;

//     const sessionTypeRef = useRef(null);
//     sessionTypeRef.current = sessionType;

//     const { data: conversations = [], refetch: refetchConversations } = useGetConversationsQuery();
//     const [sendMessage] = useSendMessageMutation();
//     const [markAsRead] = useMarkAsReadMutation();
//     const [getOrCreateConversation] = useGetOrCreateConversationMutation();
//     const [startSessionMutation] = useStartSessionMutation();
//     const [endSessionMutation] = useEndSessionMutation();

//     const isSessionActive = sessionStatus === 'ACTIVE';

//     // FIX: Input is enabled for consultants always, for users always (session
//     // auto-starts when they send their first message)
//     const canType = isConsultant || true; // users can always type; session starts on send
//     const canSend = !!inputValue.trim() && !isUploading && !isStartingSession;

//     // ── Socket connect + register ─────────────────────────────────
//     useEffect(() => {
//         if (!user?.id || !token) return;
//         socketService.connect(user.id, token);

//         const doRegister = () => socketService.emit('register', user.id);
//         doRegister();

//         const socket = socketService.socket || socketService._socket;
//         if (socket) {
//             socket.on('connect', doRegister);
//             socket.on('reconnect', doRegister);
//             return () => {
//                 socket.off('connect', doRegister);
//                 socket.off('reconnect', doRegister);
//             };
//         }
//     }, [user?.id, token]);

//     // ── Auto-open conversation from prop ──────────────────────────
//     useEffect(() => {
//         if (!initialOtherUserId || !user?.id) return;
//         getOrCreateConversation(initialOtherUserId)
//             .unwrap()
//             .then(conv => {
//                 if (!conv?.id) return;
//                 setActiveConv(conv);
//                 setShowMobileSidebar(false);
//                 if (onConversationChange) onConversationChange(conv.id);
//                 refetchConversations();
//             })
//             .catch(() => toast.error('Could not open conversation.'));
//     }, [initialOtherUserId, user?.id]);

//     // ── Load messages when active conversation changes ────────────
//     useEffect(() => {
//         if (!activeConv?.id) return;
//         setIsLoadingMessages(true);
//         setMessages([]);

//         // Restore session state from conversation data
//         const isActive = activeConv.sessionStatus === 'ACTIVE';
//         setSessionStatus(isActive ? 'ACTIVE' : null);
//         setSessionType(activeConv.sessionType || null);
//         setSessionTotalCost(parseFloat(activeConv.totalCost || 0));
//         setSessionStartedAt(activeConv.startedAt || null);

//         fetch(
//             `${process.env.REACT_APP_API_BASE_URL}/chat/conversations/${activeConv.id}/messages?limit=50`,
//             { headers: { Authorization: `Bearer ${token}` } }
//         )
//             .then(r => r.json())
//             .then(data => {
//                 setMessages(data?.data?.messages || []);
//                 setIsLoadingMessages(false);
//             })
//             .catch(() => setIsLoadingMessages(false));

//         markAsRead(activeConv.id);
//         socketService.emit('join_conversation', { conversationId: activeConv.id });
//     }, [activeConv?.id, token, markAsRead]);

//     // ── Sync wallet balance from Redux ────────────────────────────
//     useEffect(() => {
//         setCurrentBalance(parseFloat(walletBalance));
//     }, [walletBalance]);

//     // ── Socket event listeners ────────────────────────────────────
//     useEffect(() => {
//         if (!user?.id) return;

//         socketService.on('new_message', LISTENER_KEY, (data) => {
//             if (data.conversationId === activeConvRef.current?.id) {
//                 setMessages(prev => {
//                     // Already in list — skip
//                     if (prev.some(m => m.id === data.message.id)) return prev;

//                     // Replace matching temp message from same sender
//                     if (
//                         data.message.senderId === user.id &&
//                         prev.some(m => m.id.startsWith('temp-') && m.senderId === user.id)
//                     ) {
//                         return prev.map(m =>
//                             m.id.startsWith('temp-') && m.senderId === user.id
//                                 ? data.message
//                                 : m
//                         );
//                     }
//                     return [...prev, data.message];
//                 });
//                 markAsRead(data.conversationId);
//             }
//             refetchConversations();
//         });

//         socketService.on('new_file', LISTENER_KEY, (data) => {
//             if (data.conversationId === activeConvRef.current?.id) {
//                 setMessages(prev => {
//                     if (prev.some(m => m.id === data.message.id)) return prev;
//                     if (data.message.senderId === user.id) {
//                         const tempIdx = prev.findIndex(
//                             m => m.id.startsWith('temp-') &&
//                                 m.senderId === data.message.senderId &&
//                                 m.fileUrl === data.message.fileUrl
//                         );
//                         if (tempIdx !== -1) {
//                             const next = [...prev];
//                             next[tempIdx] = data.message;
//                             return next;
//                         }
//                         return prev;
//                     }
//                     return [...prev, data.message];
//                 });
//             }
//             refetchConversations();
//         });

//         socketService.on('user_typing', LISTENER_KEY, (data) => {
//             if (data.conversationId === activeConvRef.current?.id && data.userId !== user.id) {
//                 setTypingUsers(prev => ({ ...prev, [data.userId]: data.isTyping }));
//             }
//         });

//         socketService.on('messages_read', LISTENER_KEY, (data) => {
//             if (data.conversationId === activeConvRef.current?.id) {
//                 setMessages(prev => prev.map(m =>
//                     m.senderId === user.id ? { ...m, isRead: true } : m
//                 ));
//             }
//         });

//         socketService.on('session_started', LISTENER_KEY, (data) => {
//             if (data.conversationId === activeConvRef.current?.id) {
//                 setSessionStatus('ACTIVE');
//                 setSessionType(data.sessionType);
//                 setSessionStartedAt(data.startedAt);
//                 setSessionTotalCost(0);
//                 setIsStartingSession(false);
//                 refetchConversations();
//                 toast.success(`${data.sessionType} session started · €${PRICE_PER_MINUTE}/min`);
//             }
//         });

//         socketService.on('billing_tick', LISTENER_KEY, (data) => {
//             if (data.conversationId === activeConvRef.current?.id) {
//                 setSessionTotalCost(prev =>
//                     data.amountCharged ? prev + data.amountCharged : prev + PRICE_PER_MINUTE
//                 );
//                 if (data.balanceAfter !== undefined) {
//                     setCurrentBalance(data.balanceAfter);
//                 }
//             }
//         });

//         socketService.on('balance_warning', LISTENER_KEY, (data) => {
//             if (data.conversationId === activeConvRef.current?.id) {
//                 if (data.type === 'critical') {
//                     toast.error(`⚠️ Less than 1 minute remaining! (€${parseFloat(data.remainingBalance || 0).toFixed(2)})`, { duration: 8000 });
//                 } else {
//                     toast(`⚠️ Only ${data.remainingMinutes} min remaining (€${parseFloat(data.remainingBalance || 0).toFixed(2)})`, {
//                         icon: '', duration: 5000,
//                     });
//                 }
//             }
//         });

//         socketService.on('session_ended', LISTENER_KEY, (data) => {
//             if (data.conversationId === activeConvRef.current?.id) {
//                 setSessionStatus('ENDED');
//                 setIsEndingSession(false);
//                 setIsStartingSession(false);
//                 setShowEndConfirm(false);

//                 if (data.reason === 'insufficient_balance') {
//                     toast.error('⚠️ Session ended: Insufficient balance', { duration: 6000 });
//                 }

//                 if (!isConsultant) {
//                     setSessionSummary({
//                         sessionType: data.sessionType || sessionTypeRef.current,
//                         totalMinutes: data.totalMinutes || 0,
//                         totalCost: data.totalCost || 0,
//                     });
//                 } else {
//                     toast.success('Session ended successfully');
//                 }
//                 refetchConversations();
//             }
//         });

//         return () => {
//             [
//                 'new_message', 'new_file', 'user_typing', 'messages_read',
//                 'session_started', 'billing_tick', 'balance_warning', 'session_ended',
//             ].forEach(e => socketService.off(e, LISTENER_KEY));
//         };
//     }, [user?.id, isConsultant]);

//     // ── Auto-scroll ───────────────────────────────────────────────
//     useEffect(() => {
//         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, [messages, typingUsers]);

//     // ── Handlers ──────────────────────────────────────────────────

//     const handleSelectConversation = useCallback((conv) => {
//         setActiveConv(conv);
//         setShowMobileSidebar(false);
//         setMessages([]);
//         setTypingUsers({});
//         setSessionStatus(null);
//         setSessionSummary(null);
//         setShowEndConfirm(false);
//         setIsStartingSession(false);
//         if (onConversationChange && conv?.id) onConversationChange(conv.id);
//     }, [onConversationChange]);

//     /**
//      * FIX — Core send logic:
//      * 1. Consultants: send directly, no session needed.
//      * 2. Users with active session: send directly.
//      * 3. Users WITHOUT active session: auto-start CHAT session first, then send.
//      *    The input is NEVER disabled for the user — they can always type and hit send.
//      *    Billing starts the moment they send their first message.
//      */
//     const handleSend = useCallback(async () => {
//         const text = inputValue.trim();
//         if (!text || !activeConvRef.current?.id || isStartingSession) return;

//         // ── Consultants bypass session check entirely ──────────────
//         if (isConsultant) {
//             setInputValue('');
//             socketService.emit('typing_stop', { conversationId: activeConvRef.current.id });

//             const tempId = `temp-${Date.now()}`;
//             const optimistic = {
//                 id: tempId,
//                 conversationId: activeConvRef.current.id,
//                 senderId: user.id,
//                 message: text,
//                 isRead: false,
//                 createdAt: new Date().toISOString(),
//                 sender: { id: user.id, name: user.name, avatar: user.avatar, role: user.role },
//             };
//             setMessages(prev => [...prev, optimistic]);

//             try {
//                 const result = await sendMessage({
//                     conversationId: activeConvRef.current.id,
//                     message: text,
//                 }).unwrap();
//                 if (result?.id) {
//                     setMessages(prev => prev.map(m => m.id === tempId ? result : m));
//                 }
//                 refetchConversations();
//             } catch (err) {
//                 setMessages(prev => prev.filter(m => m.id !== tempId));
//                 toast.error(err?.data?.message || 'Failed to send message');
//             }
//             return;
//         }

//         // ── User: auto-start session if not active ─────────────────
//         if (!isSessionActive) {
//             // Check balance first
//             if (currentBalance < PRICE_PER_MINUTE) {
//                 toast.error(`Insufficient balance. Minimum €${PRICE_PER_MINUTE} required to start a session.`);
//                 return;
//             }

//             setIsStartingSession(true);
//             try {
//                 const session = await startSessionMutation({
//                     conversationId: activeConvRef.current.id,
//                     sessionType: 'CHAT',
//                 }).unwrap();

//                 // Update state immediately so billing banner shows
//                 const startedAt = session?.startedAt || new Date().toISOString();
//                 setSessionStatus('ACTIVE');
//                 setSessionType('CHAT');
//                 setSessionStartedAt(startedAt);
//                 setSessionTotalCost(0);

//                 // Also notify via socket so the consultant sees the session start
//                 socketService.emit('start_session', {
//                     conversationId: activeConvRef.current.id,
//                     sessionType: 'CHAT',
//                 }, () => { });

//             } catch (err) {
//                 setIsStartingSession(false);
//                 toast.error(err?.data?.message || 'Failed to start session. Please try again.');
//                 return;
//             }
//             setIsStartingSession(false);
//         }

//         // ── Send the message ───────────────────────────────────────
//         setInputValue('');
//         socketService.emit('typing_stop', { conversationId: activeConvRef.current.id });

//         const tempId = `temp-${Date.now()}`;
//         const optimistic = {
//             id: tempId,
//             conversationId: activeConvRef.current.id,
//             senderId: user.id,
//             message: text,
//             isRead: false,
//             createdAt: new Date().toISOString(),
//             sender: { id: user.id, name: user.name, avatar: user.avatar, role: user.role },
//         };
//         setMessages(prev => [...prev, optimistic]);

//         try {
//             const result = await sendMessage({
//                 conversationId: activeConvRef.current.id,
//                 message: text,
//             }).unwrap();
//             if (result?.id) {
//                 setMessages(prev => prev.map(m => m.id === tempId ? result : m));
//             }
//             refetchConversations();
//         } catch (err) {
//             setMessages(prev => prev.filter(m => m.id !== tempId));
//             toast.error(err?.data?.message || 'Failed to send message');
//         }
//     }, [inputValue, user, sendMessage, refetchConversations, isSessionActive, isConsultant,
//         startSessionMutation, currentBalance, isStartingSession]);

//     const handleFileUpload = useCallback(async (file) => {
//         if (!file || !activeConvRef.current?.id) return;

//         if (!isSessionActive) {
//             toast.error('No active session. Please start a paid session first.');
//             return;
//         }

//         setIsUploading(true);
//         const formData = new FormData();
//         formData.append('file', file);
//         try {
//             const res = await axios.post(
//                 `${process.env.REACT_APP_API_BASE_URL}/chat/upload`,
//                 formData,
//                 { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
//             );
//             const { fileUrl, fileName, fileType, fileSize } = res.data.data;

//             const tempId = `temp-${Date.now()}`;
//             const optimistic = {
//                 id: tempId,
//                 conversationId: activeConvRef.current.id,
//                 senderId: user.id,
//                 fileUrl, fileName, fileType, fileSize,
//                 isRead: false,
//                 createdAt: new Date().toISOString(),
//                 sender: { id: user.id, name: user.name, avatar: user.avatar, role: user.role },
//             };
//             setMessages(prev => [...prev, optimistic]);

//             socketService.emit(
//                 'send_file',
//                 { conversationId: activeConvRef.current.id, fileUrl, fileName, fileType, fileSize },
//                 (r) => {
//                     if (r?.success) {
//                         setMessages(prev => prev.map(m => m.id === tempId ? r.message : m));
//                     }
//                 }
//             );
//             refetchConversations();
//         } catch {
//             toast.error('File upload failed');
//         } finally {
//             setIsUploading(false);
//             if (fileInputRef.current) fileInputRef.current.value = '';
//         }
//     }, [token, user, refetchConversations, isSessionActive]);

//     // Explicit session start from the modal (for AUDIO / VIDEO)
//     const handleStartSession = useCallback(async (type) => {
//         if (!activeConvRef.current?.id) return;
//         setShowStartModal(false);
//         setIsStartingSession(true);
//         try {
//             await startSessionMutation({
//                 conversationId: activeConvRef.current.id,
//                 sessionType: type,
//             }).unwrap();

//             socketService.emit('start_session', {
//                 conversationId: activeConvRef.current.id,
//                 sessionType: type,
//             }, (res) => {
//                 if (!res?.success) toast.error(res?.error || 'Failed to start session');
//             });
//         } catch (err) {
//             toast.error(err?.data?.message || 'Failed to start session');
//         } finally {
//             setIsStartingSession(false);
//         }
//     }, [startSessionMutation]);

//     const handleEndSessionClick = useCallback(() => {
//         setShowEndConfirm(true);
//     }, []);

//     const handleEndSessionConfirm = useCallback(async () => {
//         if (!activeConvRef.current?.id) return;
//         setIsEndingSession(true);
//         try {
//             socketService.emit('end_session', { conversationId: activeConvRef.current.id }, () => { });
//             await endSessionMutation(activeConvRef.current.id).unwrap();
//         } catch {
//             setIsEndingSession(false);
//             setShowEndConfirm(false);
//             toast.error('Failed to end session. Please try again.');
//         }
//     }, [endSessionMutation]);

//     const handleTyping = useCallback((e) => {
//         setInputValue(e.target.value);
//         // Only emit typing events during active sessions to avoid noise
//         if (!activeConvRef.current?.id || (!isSessionActive && !isConsultant)) return;
//         socketService.emit('typing_start', { conversationId: activeConvRef.current.id });
//         clearTimeout(typingTimerRef.current);
//         typingTimerRef.current = setTimeout(() => {
//             socketService.emit('typing_stop', { conversationId: activeConvRef.current.id });
//         }, 1500);
//     }, [isSessionActive, isConsultant]);

//     const handleKeyDown = useCallback((e) => {
//         if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
//     }, [handleSend]);

//     const isTyping = Object.values(typingUsers).some(Boolean);

//     const filteredConversations = conversations.filter(c =>
//         c.otherUser?.name?.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     // ── Session header buttons ────────────────────────────────────
//     const renderSessionButtons = () => {
//         if (isSessionActive) {
//             return (
//                 <div className='flex items-center gap-2 shrink-0'>
//                     <button
//                         onClick={handleEndSessionClick}
//                         className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-semibold transition-colors'
//                     >
//                         <PhoneOff size={13} /> End Session
//                     </button>
//                     <span className='flex items-center gap-1 text-xs text-red-500 font-semibold'>
//                         <span className='w-2 h-2 rounded-full bg-red-500 animate-pulse' />
//                         Live
//                     </span>
//                 </div>
//             );
//         }

//         // Consultant sees nothing — they don't start/pay for sessions
//         if (isConsultant) return null;

//         // User sees Audio and Video buttons (Chat auto-starts on first message)
//         return (
//             <div className='flex items-center gap-2 shrink-0'>
//                 <button
//                     onClick={() => setShowStartModal(true)}
//                     title='Start Audio session'
//                     className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E2AB0B] hover:bg-[#d99a00] text-white text-xs font-semibold transition-colors'
//                 >
//                     <Phone size={13} /> Call
//                 </button>
//                 <button
//                     onClick={() => setShowStartModal(true)}
//                     title='Start Video session'
//                     className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#6E35AE] hover:bg-[#5A2A8A] text-white text-xs font-semibold transition-colors'
//                 >
//                     <Video size={13} /> Video
//                 </button>
//             </div>
//         );
//     };

//     // ── Placeholder text for input ────────────────────────────────
//     const inputPlaceholder = () => {
//         if (isStartingSession) return 'Starting session…';
//         if (isConsultant) return 'Type a message…';
//         if (isSessionActive) return 'Type a message…';
//         return 'Type a message and hit send to start a session…';
//     };

//     // ── Render ────────────────────────────────────────────────────
//     return (
//         <>
//             <div className={`flex h-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm ${className}`}>

//                 {/* Sidebar */}
//                 {showSidebar && (
//                     <aside className={`${showMobileSidebar ? 'flex' : 'hidden'} lg:flex flex-col w-full lg:w-80 shrink-0 border-r border-gray-100`}>
//                         <div className='px-4 py-4 border-b border-gray-100'>
//                             <h2 className='text-lg font-bold text-gray-900 mb-3'>Messages</h2>
//                             <div className='relative'>
//                                 <Search size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
//                                 <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
//                                     placeholder='Search conversations...'
//                                     className='w-full pl-9 pr-4 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6E35AE]/30' />
//                             </div>
//                         </div>
//                         <div className='flex-1 overflow-y-auto'>
//                             {filteredConversations.length === 0
//                                 ? <div className='flex items-center justify-center h-48 text-gray-400 text-sm'>No conversations yet</div>
//                                 : filteredConversations.map(conv => (
//                                     <ConversationItem key={conv.id} conv={conv}
//                                         isActive={activeConv?.id === conv.id} onClick={handleSelectConversation} />
//                                 ))
//                             }
//                         </div>
//                     </aside>
//                 )}

//                 {/* Chat Window */}
//                 <section className={`${showSidebar ? (!showMobileSidebar ? 'flex' : 'hidden') : 'flex'} lg:flex flex-col flex-1 min-w-0`}>
//                     {!activeConv ? (
//                         <div className='flex-1 flex flex-col items-center justify-center text-gray-400 gap-3'>
//                             <div className='w-16 h-16 rounded-full bg-[#F5F1FD] flex items-center justify-center'>
//                                 <MessageSquare size={24} className='text-[#6E35AE]' />
//                             </div>
//                             <p className='text-sm font-medium'>
//                                 {showSidebar ? 'Select a conversation to start' : 'Loading conversation...'}
//                             </p>
//                         </div>
//                     ) : (
//                         <>
//                             {/* Header */}
//                             <div className='flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-white shrink-0'>
//                                 {showSidebar && (
//                                     <button onClick={() => setShowMobileSidebar(true)} className='lg:hidden text-gray-500'>
//                                         <ArrowLeft size={20} />
//                                     </button>
//                                 )}
//                                 <div className='w-10 h-10 rounded-full bg-[#D1C4E9] flex items-center justify-center text-[#6E35AE] font-bold overflow-hidden shrink-0'>
//                                     {activeConv.otherUser?.avatar
//                                         ? <img src={activeConv.otherUser.avatar} alt='' className='w-full h-full object-cover' />
//                                         : activeConv.otherUser?.name?.charAt(0)?.toUpperCase() || '?'
//                                     }
//                                 </div>
//                                 <div className='flex-1 min-w-0'>
//                                     <p className='font-semibold text-gray-900 text-sm'>{activeConv.otherUser?.name}</p>
//                                     <p className='text-xs text-gray-400 capitalize'>{activeConv.otherUser?.role?.toLowerCase()}</p>
//                                 </div>
//                                 {renderSessionButtons()}
//                             </div>

//                             {/* Info banner — only for users before session starts */}
//                             {!isSessionActive && !isConsultant && (
//                                 <div className='px-4 py-2 bg-amber-50 border-b border-amber-200 text-center'>
//                                     <p className='text-xs text-amber-700'>
//                                         Send a message to auto-start a <strong>CHAT</strong> session (€{PRICE_PER_MINUTE}/min),
//                                         or use <strong>Call</strong> / <strong>Video</strong> buttons above.
//                                     </p>
//                                 </div>
//                             )}

//                             {/* Billing Banner — active session only */}
//                             {isSessionActive && (
//                                 <BillingBanner
//                                     sessionType={sessionType}
//                                     startedAt={sessionStartedAt}
//                                     totalCost={sessionTotalCost}
//                                     walletBalance={currentBalance}
//                                     onEnd={handleEndSessionClick}
//                                 />
//                             )}

//                             {/* Messages */}
//                             <div className='flex-1 overflow-y-auto px-4 py-4 bg-gray-50'>
//                                 {isLoadingMessages ? (
//                                     <div className='flex justify-center py-8'>
//                                         <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-[#6E35AE]' />
//                                     </div>
//                                 ) : messages.length === 0 ? (
//                                     <div className='flex flex-col items-center justify-center h-full text-gray-400 gap-3'>
//                                         <MessageSquare size={32} className='text-gray-200' />
//                                         <p className='text-sm'>No messages yet</p>
//                                         {!isSessionActive && !isConsultant && (
//                                             <p className='text-xs text-gray-300'>Type a message below to begin</p>
//                                         )}
//                                         {(isSessionActive || isConsultant) && (
//                                             <p className='text-xs text-gray-300'>Send a message to start the conversation</p>
//                                         )}
//                                     </div>
//                                 ) : (
//                                     <>
//                                         {messages.map(msg => (
//                                             <MessageBubble key={msg.id} msg={msg} isOwn={msg.senderId === user?.id} />
//                                         ))}
//                                         {isTyping && (
//                                             <div className='flex items-center gap-2 mt-2'>
//                                                 <div className='bg-white rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-sm border border-gray-100'>
//                                                     <div className='flex gap-1'>
//                                                         {[0, 1, 2].map(i => (
//                                                             <div key={i} className='w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce'
//                                                                 style={{ animationDelay: `${i * 0.15}s` }} />
//                                                         ))}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         )}
//                                     </>
//                                 )}
//                                 <div ref={messagesEndRef} />
//                             </div>

//                             {/* Input Bar */}
//                             <div className='px-4 py-3 border-t border-gray-100 bg-white shrink-0'>
//                                 {isUploading && (
//                                     <div className='flex items-center gap-2 mb-2 text-xs text-[#6E35AE]'>
//                                         <div className='animate-spin rounded-full h-3 w-3 border-b border-[#6E35AE]' />
//                                         Uploading file...
//                                     </div>
//                                 )}
//                                 {isStartingSession && (
//                                     <div className='flex items-center gap-2 mb-2 text-xs text-amber-600'>
//                                         <div className='animate-spin rounded-full h-3 w-3 border-b border-amber-600' />
//                                         Starting session…
//                                     </div>
//                                 )}
//                                 <div className='flex items-end gap-2'>
//                                     {/* File attach — only when session is active */}
//                                     <button
//                                         onClick={() => fileInputRef.current?.click()}
//                                         disabled={!isSessionActive || isUploading}
//                                         className={`shrink-0 w-9 h-9 flex items-center justify-center rounded-full transition-colors ${!isSessionActive
//                                             ? 'text-gray-300 cursor-not-allowed'
//                                             : 'hover:bg-gray-100 text-gray-500'
//                                             }`}
//                                     >
//                                         <Paperclip size={18} />
//                                     </button>
//                                     <input
//                                         ref={fileInputRef}
//                                         type='file'
//                                         accept='image/*,video/*,.pdf,.doc,.docx,.txt,.zip'
//                                         className='hidden'
//                                         onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
//                                     />

//                                     {/* FIX: textarea is NEVER disabled — users can always type */}
//                                     <textarea
//                                         ref={inputRef}
//                                         value={inputValue}
//                                         onChange={handleTyping}
//                                         onKeyDown={handleKeyDown}
//                                         placeholder={inputPlaceholder()}
//                                         disabled={isStartingSession}
//                                         rows={1}
//                                         className={`flex-1 resize-none rounded-2xl px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6E35AE]/30 max-h-32 overflow-y-auto ${isStartingSession
//                                             ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                                             : 'bg-gray-50 text-gray-800'
//                                             }`}
//                                         style={{ minHeight: '40px' }}
//                                     />

//                                     {/* FIX: Send button — disabled only while starting session or empty input */}
//                                     <button
//                                         onClick={handleSend}
//                                         disabled={!canSend}
//                                         className={`shrink-0 w-9 h-9 flex items-center justify-center rounded-full transition-colors ${!canSend
//                                             ? 'bg-gray-300 cursor-not-allowed'
//                                             : 'bg-[#6E35AE] hover:bg-[#5A2A8A] text-white'
//                                             }`}
//                                     >
//                                         {isStartingSession
//                                             ? <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white' />
//                                             : <Send size={16} />
//                                         }
//                                     </button>
//                                 </div>

//                                 {/* Footer hint */}
//                                 <p className='text-xs text-center text-gray-400 mt-2'>
//                                     {isConsultant
//                                         ? 'Respond to your client'
//                                         : isSessionActive
//                                             ? `Session active · €${PRICE_PER_MINUTE}/minute`
//                                             : `Sending your first message starts a CHAT session · €${PRICE_PER_MINUTE}/min`
//                                     }
//                                 </p>
//                             </div>
//                         </>
//                     )}
//                 </section>
//             </div>

//             {/* Modals */}
//             {showStartModal && (
//                 <StartSessionModal
//                     walletBalance={currentBalance}
//                     onStart={handleStartSession}
//                     onClose={() => setShowStartModal(false)}
//                 />
//             )}

//             {showEndConfirm && (
//                 <EndSessionConfirmModal
//                     onConfirm={handleEndSessionConfirm}
//                     onCancel={() => setShowEndConfirm(false)}
//                     isEnding={isEndingSession}
//                 />
//             )}

//             {sessionSummary && (
//                 <SessionSummaryModal
//                     summary={sessionSummary}
//                     onClose={() => setSessionSummary(null)}
//                 />
//             )}
//         </>
//     );
// });

// RealTimeChat.displayName = 'RealTimeChat';
// export default RealTimeChat;