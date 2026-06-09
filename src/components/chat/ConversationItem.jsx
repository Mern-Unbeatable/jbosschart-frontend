import React, { memo } from 'react';

const ConversationItem = memo(({ conv, isActive, onClick }) => {
    const lastMsg = conv.lastMessage;
    const time = lastMsg
        ? new Date(lastMsg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : '';
    const isActiveSession = conv.sessionStatus === 'ACTIVE';
    const hasUnread = conv.unreadCount > 0;

    return (
        <button onClick={() => onClick(conv)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors ${isActive ? 'bg-[#F5F1FD]' : 'hover:bg-gray-50'}`}>
            <div className='relative shrink-0'>
                <div className='w-12 h-12 rounded-full bg-[#D1C4E9] flex items-center justify-center text-[#6E35AE] font-bold text-lg overflow-hidden'>
                    {conv.otherUser?.avatar
                        ? <img src={conv.otherUser.avatar} alt='' className='w-full h-full object-cover'
                            onError={e => (e.target.style.display = 'none')} />
                        : conv.otherUser?.name?.charAt(0)?.toUpperCase() || '?'
                    }
                </div>
                {isActiveSession && (
                    <span className='absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white animate-pulse' />
                )}
            </div>
            <div className='flex-1 min-w-0'>
                <div className='flex justify-between items-center mb-0.5'>
                    <p className={`text-sm truncate ${hasUnread ? 'font-bold text-gray-900' : 'font-semibold text-gray-900'}`}>
                        {conv.otherUser?.name || 'Unknown'}
                    </p>
                    <span className='text-[10px] text-gray-400 shrink-0 ml-1'>{time}</span>
                </div>
                <div className='flex justify-between items-center'>
                    <p className={`text-xs truncate ${hasUnread ? 'font-medium text-gray-700' : 'text-gray-500'}`}>
                        {isActiveSession
                            ? <span className='text-red-500 font-medium'>● Live session</span>
                            : lastMsg?.message || (lastMsg?.fileUrl ? '📎 File' : 'No messages yet')
                        }
                    </p>
                    {hasUnread && (
                        <span className='ml-1 bg-[#6E35AE] text-white text-[10px] rounded-full min-w-[18px] h-[18px] flex items-center justify-center shrink-0 px-1'>
                            {conv.unreadCount > 99 ? '99+' : conv.unreadCount > 9 ? '9+' : conv.unreadCount}
                        </span>
                    )}
                </div>
            </div>
        </button>
    );
});

ConversationItem.displayName = 'ConversationItem';
export default ConversationItem;