/**
 * ChatPanel — pure chat UI shell (sidebar + chat window).
 * Reusable in public chat pages and user dashboard sections.
 */
import React, { memo, useState, useCallback, useEffect, useRef } from 'react';
import { Send, ArrowLeft } from 'lucide-react';

const ASSETS = {
  howard0:
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
  howard1:
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80',
  howard2:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
  howard3:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
  howard4:
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80',
  howard5:
    'https://images.unsplash.com/photo-1528892952291-009c663ce843?auto=format&fit=crop&w=100&q=80',
  howard6:
    'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=100&q=80',
  howard7:
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=100&q=80',
  ope: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
};

const STATUS_DOT = {
  online: 'bg-green-500',
  away: 'bg-orange-400',
  offline: 'bg-gray-400',
};

const CONVERSATIONS = [
  {
    id: 1,
    name: 'TechPrint Hub',
    time: '4:27pm',
    preview:
      "Gee, its been good news all day. i met someone special today. she's really pretty.",
    avatar: ASSETS.howard0,
    status: 'online',
    contactName: 'Ope',
    contactAvatar: ASSETS.ope,
    contactStatus: 'Active',
    contactOnline: true,
  },
  {
    id: 2,
    name: '3D Maker Store',
    time: '4:12pm',
    preview: 'Are you coming to class tomorrow? we have test.',
    avatar: ASSETS.howard1,
    status: 'offline',
    contactName: '3D Maker Store',
    contactAvatar: ASSETS.howard1,
    contactStatus: 'Offline',
    contactOnline: false,
  },
  {
    id: 3,
    name: 'Printify Zone',
    time: '3:27pm',
    preview: 'I miss you dear, when are you coming to see me.',
    avatar: ASSETS.howard2,
    status: 'away',
    contactName: 'Printify Zone',
    contactAvatar: ASSETS.howard2,
    contactStatus: 'Away',
    contactOnline: false,
  },
  {
    id: 4,
    name: 'GadgetForge',
    time: '4:00pm',
    preview: 'Baba what sup na, you still de Lagos?',
    avatar: ASSETS.howard3,
    status: 'online',
    contactName: 'GadgetForge',
    contactAvatar: ASSETS.howard3,
    contactStatus: 'Active',
    contactOnline: true,
  },
  {
    id: 5,
    name: 'MegaTech Mart',
    time: '3:00pm',
    preview: 'Have you called them?',
    avatar: ASSETS.howard4,
    status: 'offline',
    contactName: 'MegaTech Mart',
    contactAvatar: ASSETS.howard4,
    contactStatus: 'Offline',
    contactOnline: false,
  },
  {
    id: 6,
    name: 'PrintLab Pro',
    time: '1:02pm',
    preview: 'By brother is the best, na my helper be that oh.',
    avatar: ASSETS.howard5,
    status: 'offline',
    contactName: 'PrintLab Pro',
    contactAvatar: ASSETS.howard5,
    contactStatus: 'Offline',
    contactOnline: false,
  },
  {
    id: 7,
    name: "Maker's Market",
    time: '11:22am',
    preview:
      'Landlady called a meeting by 3pm today, she wants to talk about the light issues. Be there!',
    avatar: ASSETS.howard6,
    status: 'offline',
    contactName: "Maker's Market",
    contactAvatar: ASSETS.howard6,
    contactStatus: 'Offline',
    contactOnline: false,
  },
  {
    id: 8,
    name: '3D Print World',
    time: '11:22am',
    preview:
      'Lorem ipsum dolor sit amet consectetur. Eleifend condimentum mauris consequat tellus turpis vitae.',
    avatar: ASSETS.howard7,
    status: 'offline',
    contactName: '3D Print World',
    contactAvatar: ASSETS.howard7,
    contactStatus: 'Offline',
    contactOnline: false,
  },
];

const SEED_MESSAGES = {
  1: [
    { id: 'm1', type: 'received', text: 'Yo mandem' },
    { id: 'm2', type: 'received', text: 'Cho dey house?' },
    { id: 'm3', type: 'sent', text: 'Kwasia' },
    { id: 'm4', type: 'sent', text: 'You dey hung dier you kai say house dey' },
  ],
};

function computePositions(messages) {
  return messages.map((msg, i) => {
    const prev = messages[i - 1];
    const next = messages[i + 1];
    const samePrev = prev && prev.type === msg.type;
    const sameNext = next && next.type === msg.type;
    let position;

    if (!samePrev && !sameNext) position = 'single';
    else if (!samePrev && sameNext) position = 'first';
    else if (samePrev && sameNext) position = 'middle';
    else position = 'last';

    return { ...msg, position };
  });
}

function getBubbleCorners(type, position) {
  if (type === 'received') {
    if (position === 'single') return 'rounded-[32px]';
    if (position === 'first') {
      return 'rounded-tl-[32px] rounded-tr-[32px] rounded-br-[32px] rounded-bl-[4px]';
    }
    if (position === 'middle') {
      return 'rounded-tl-[4px] rounded-tr-[32px] rounded-br-[32px] rounded-bl-[4px]';
    }
    return 'rounded-tl-[4px] rounded-tr-[32px] rounded-br-[32px] rounded-bl-[32px]';
  }

  if (position === 'single') return 'rounded-[32px]';
  if (position === 'first') {
    return 'rounded-tl-[32px] rounded-tr-[32px] rounded-br-[4px] rounded-bl-[32px]';
  }
  if (position === 'middle') {
    return 'rounded-tl-[32px] rounded-tr-[4px] rounded-br-[4px] rounded-bl-[32px]';
  }
  return 'rounded-tl-[32px] rounded-tr-[4px] rounded-br-[32px] rounded-bl-[32px]';
}

const ConversationItem = memo(({ conversation, isActive, onClick }) => {
  const handleClick = useCallback(
    () => onClick(conversation.id),
    [conversation.id, onClick],
  );

  return (
    <button
      type='button'
      onClick={handleClick}
      className={`w-full flex gap-3 items-start px-4 py-5 text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-500 ${isActive ? 'bg-white' : 'bg-gray-200 hover:bg-gray-300'
        }`}
      aria-pressed={isActive}
    >
      <div className='relative shrink-0'>
        <img
          src={conversation.avatar}
          alt={conversation.name}
          className='h-12 w-12 rounded-2xl object-cover'
          loading='lazy'
        />
        <span
          aria-hidden='true'
          className={`absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white ${STATUS_DOT[conversation.status] || 'bg-gray-400'
            }`}
        />
      </div>
      <div className='flex-1 min-w-0 flex flex-col gap-1.5'>
        <div className='flex items-center gap-2.5'>
          <span className='font-semibold text-sm text-gray-900 tracking-[0.286px] truncate leading-normal'>
            {conversation.name}
          </span>
          <span className='text-sm font-light text-gray-900 shrink-0 tracking-[0.176px] leading-normal'>
            {conversation.time}
          </span>
        </div>
        <p className='text-sm text-gray-900 leading-5 line-clamp-2'>
          {conversation.preview}
        </p>
      </div>
    </button>
  );
});
ConversationItem.displayName = 'ConversationItem';

const DateSeparator = memo(({ label, time }) => (
  <div
    className='flex items-center justify-center gap-3 py-2'
    aria-label={`${label} ${time}`}
  >
    <span className='text-gray-400 text-sm sm:text-base leading-7 tracking-[0.5px] font-medium font-["Poppins",sans-serif]'>
      {label}
    </span>
    <span
      aria-hidden='true'
      className='h-1.5 w-1.5 rounded-full bg-gray-400 shrink-0'
    />
    <span className='text-gray-400 text-sm sm:text-base leading-7 tracking-[0.5px] font-medium font-["Poppins",sans-serif]'>
      {time}
    </span>
  </div>
));
DateSeparator.displayName = 'DateSeparator';

const ReceivedGroup = memo(({ messages }) => (
  <div className='flex flex-col gap-1 items-start'>
    {messages.map((msg) => (
      <div
        key={msg.id}
        className={`bg-[#f0f2f5] px-4 sm:px-5 py-3 sm:py-4 ${getBubbleCorners('received', msg.position)} max-w-[75vw] sm:max-w-[70%] lg:max-w-[65%]`}
      >
        <p className='text-slate-800 text-sm sm:text-[18px] leading-6 sm:leading-7 tracking-[0.5px] font-["Poppins",sans-serif] wrap-break-word'>
          {msg.text}
        </p>
      </div>
    ))}
  </div>
));
ReceivedGroup.displayName = 'ReceivedGroup';

const SentGroup = memo(({ messages }) => (
  <div className='flex flex-col gap-1 items-end'>
    {messages.map((msg) => (
      <div
        key={msg.id}
        className={`bg-[#e4e7ec] px-4 sm:px-5 py-3 sm:py-4 ${getBubbleCorners('sent', msg.position)} max-w-[75vw] sm:max-w-[70%] lg:max-w-[65%]`}
      >
        <p className='text-slate-800 text-sm sm:text-[18px] leading-6 sm:leading-7 tracking-[0.5px] font-["Poppins",sans-serif] wrap-break-word'>
          {msg.text}
        </p>
      </div>
    ))}
  </div>
));
SentGroup.displayName = 'SentGroup';

const ChatPanel = memo(
  ({
    className = '',
    style,
    showConversations = true,
    showMarkAsComplete = false,
    onMarkAsComplete,
    activeConversationId = 1,
    onConversationChange,
  }) => {
    const [activeId, setActiveId] = useState(activeConversationId);
    const [messagesByConv, setMessagesByConv] = useState(SEED_MESSAGES);
    const [inputValue, setInputValue] = useState('');
    const [showSidebar, setShowSidebar] = useState(showConversations);

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const activeConv = CONVERSATIONS.find((c) => c.id === activeId);
    const rawMessages = messagesByConv[activeId] || [];
    const messages = computePositions(rawMessages);

    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages.length, activeId]);

    useEffect(() => {
      setShowSidebar(showConversations);
    }, [showConversations]);

    useEffect(() => {
      setActiveId(activeConversationId);
    }, [activeConversationId]);

    const messageGroups = [];
    let currentGroup = null;

    for (const msg of messages) {
      if (!currentGroup || currentGroup.type !== msg.type) {
        currentGroup = { type: msg.type, messages: [msg] };
        messageGroups.push(currentGroup);
      } else {
        currentGroup.messages.push(msg);
      }
    }

    const handleSelectConv = useCallback(
      (id) => {
        setActiveId(id);
        setShowSidebar(false);
        setInputValue('');
        if (onConversationChange) onConversationChange(id);
      },
      [onConversationChange],
    );

    const handleInputChange = useCallback(
      (e) => setInputValue(e.target.value),
      [],
    );

    const handleSend = useCallback(() => {
      const text = inputValue.trim();
      if (!text) return;

      const newMsg = { id: `msg-${Date.now()}`, type: 'sent', text };
      setMessagesByConv((prev) => ({
        ...prev,
        [activeId]: [...(prev[activeId] || []), newMsg],
      }));

      setInputValue('');
      inputRef.current?.focus();
    }, [inputValue, activeId]);

    const handleKeyDown = useCallback(
      (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSend();
        }
      },
      [handleSend],
    );

    const handleBackToSidebar = useCallback(() => setShowSidebar(true), []);

    const handleMarkAsComplete = useCallback(() => {
      if (onMarkAsComplete) onMarkAsComplete(activeId);
    }, [onMarkAsComplete, activeId]);

    return (
      <div
        className={`flex h-full min-h-0 overflow-hidden rounded-xl shadow-sm border border-gray-100 bg-gray-50 ${className}`}
        style={style}
      >
        <aside
          className={`${showConversations && showSidebar ? 'flex' : 'hidden'} ${showConversations ? 'lg:flex' : ''} flex-col w-full lg:w-80 shrink-0 border-r border-gray-100`}
          aria-label='Recent messages'
        >
          <div className='flex items-center justify-between px-4 h-20 bg-gray-200 shrink-0'>
            <span className='font-medium text-base text-gray-900 tracking-[0.352px] leading-normal'>
              Recent Messages
            </span>
          </div>

          <div
            className='flex-1 overflow-y-auto scrollbar-light'
            role='list'
            aria-label='Conversations'
          >
            {CONVERSATIONS.map((conv) => (
              <div key={conv.id} role='listitem'>
                <ConversationItem
                  conversation={conv}
                  isActive={conv.id === activeId}
                  onClick={handleSelectConv}
                />
              </div>
            ))}
          </div>
        </aside>


        <section
          className={`${showConversations ? (!showSidebar ? 'flex' : 'hidden') : 'flex'} ${showConversations ? 'lg:flex' : ''} flex-col flex-1 min-w-0`}
          aria-label={`Conversation with ${activeConv?.contactName || ''}`}
        >
          <div className='flex items-center gap-3 px-4 h-20 bg-gray-200 shrink-0 border-b border-gray-100'>
            <button
              type='button'
              onClick={handleBackToSidebar}
              className={`${showConversations ? 'lg:hidden' : 'hidden'} text-gray-900 hover:text-orange-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded`}
              aria-label='Back to conversations'
            >
              <ArrowLeft size={22} />
            </button>

            <div className='relative shrink-0'>
              <img
                src={activeConv?.contactAvatar || ''}
                alt={activeConv?.contactName || 'Contact'}
                className='h-10 w-10 rounded-full object-cover'
                loading='eager'
              />
              <span
                aria-hidden='true'
                className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#eeeeee] ${activeConv?.contactOnline ? 'bg-green-500' : 'bg-gray-400'
                  }`}
              />
            </div>

            <div className='flex flex-col gap-0.5'>
              <span className='font-medium text-lg sm:text-xl text-gray-900 tracking-[0.44px] leading-normal'>
                {activeConv?.contactName}
              </span>
              <span className='text-sm text-gray-500 tracking-[0.264px] leading-normal'>
                {activeConv?.contactStatus}
              </span>
            </div>
          </div>

          <div
            className='flex-1 overflow-y-auto scrollbar-light px-4 sm:px-6 py-4 flex flex-col gap-3'
            aria-live='polite'
            aria-label='Messages'
          >
            <DateSeparator label='Thursday, Jan 4' time='6:21 PM' />

            {messageGroups.map((group, index) =>
              group.type === 'received' ? (
                <ReceivedGroup
                  key={`received-${index}`}
                  messages={group.messages}
                />
              ) : (
                <SentGroup key={`sent-${index}`} messages={group.messages} />
              ),
            )}

            <div ref={messagesEndRef} aria-hidden='true' />
          </div>

          <div className='shrink-0 px-4 sm:px-6 py-4 sm:py-5 bg-gray-50'>
            <div className='flex gap-3 items-center'>
              {showMarkAsComplete ? (
                <button
                  type='button'
                  onClick={handleMarkAsComplete}
                  className='shrink-0 h-10 px-4 rounded-full bg-[#E2AB0B] text-white text-sm font-medium transition-colors duration-150 hover:bg-[#CE9C0A]'
                >
                  Mark As Complete
                </button>
              ) : null}
              <input
                ref={inputRef}
                type='text'
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder='Text message from MTN'
                aria-label='Type a message'
                className='flex-1 h-12 bg-white rounded-full px-5 text-sm text-slate-800 placeholder-gray-400 tracking-[0.5px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.14)] focus:outline-none focus:ring-2 focus:ring-orange-400 transition-shadow'
              />
              <button
                type='button'
                onClick={handleSend}
                disabled={!inputValue.trim()}
                aria-label='Send message'
                className='shrink-0 flex flex-col items-center justify-center h-12 w-12 bg-white rounded-full shadow-[0px_2px_8px_0px_rgba(0,0,0,0.14)] text-gray-400 hover:text-orange-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500'
              >
                <Send size={16} aria-hidden='true' />
                <span className='text-sm font-semibold tracking-[0.5px] leading-none mt-0.5 select-none'>
                  SMS
                </span>
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  },
);
ChatPanel.displayName = 'ChatPanel';

export default ChatPanel;
