import React, { memo } from 'react';
import { File, Download, Check, CheckCheck } from 'lucide-react';

const MessageBubble = memo(({ msg, isOwn }) => {
    const isImage = msg.fileType?.startsWith('image/');
    const isVideo = msg.fileType?.startsWith('video/');
    const isFile = msg.fileUrl && !isImage && !isVideo;
    const isSystem = msg.isSystem;
    const time = new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (isSystem) {
        return (
            <div className='flex justify-center my-3'>
                <span className='text-xs text-gray-400 bg-gray-100 px-4 py-1.5 rounded-full text-center max-w-xs'>
                    {msg.message}
                </span>
            </div>
        );
    }

    return (
        <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-1`}>
            <div className={`max-w-[70%] flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
                {isImage && (
                    <div className={`rounded-2xl overflow-hidden ${isOwn ? 'rounded-br-sm' : 'rounded-bl-sm'}`}>
                        <img
                            src={msg.fileUrl} alt={msg.fileName || 'image'}
                            className='max-w-xs max-h-64 object-cover cursor-pointer'
                            onClick={() => window.open(msg.fileUrl, '_blank')}
                        />
                    </div>
                )}
                {isVideo && (
                    <div className={`rounded-2xl overflow-hidden ${isOwn ? 'rounded-br-sm' : 'rounded-bl-sm'}`}>
                        <video controls className='max-w-xs max-h-64 rounded-2xl'>
                            <source src={msg.fileUrl} />
                        </video>
                    </div>
                )}
                {isFile && (
                    <a href={msg.fileUrl} target='_blank' rel='noreferrer' download={msg.fileName}
                        className={`flex items-center gap-3 px-4 py-3 rounded-2xl ${isOwn
                            ? 'rounded-br-sm bg-[#6E35AE] text-white'
                            : 'rounded-bl-sm bg-white text-gray-800 border border-gray-100'}`}>
                        <File size={20} />
                        <div>
                            <p className='text-sm font-medium truncate max-w-[160px]'>{msg.fileName}</p>
                            <p className='text-xs opacity-70'>{msg.fileSize ? `${(msg.fileSize / 1024).toFixed(1)} KB` : 'File'}</p>
                        </div>
                        <Download size={16} />
                    </a>
                )}
                {msg.message && (
                    <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${isOwn
                        ? 'bg-[#6E35AE] text-white rounded-br-sm'
                        : 'bg-white text-gray-800 rounded-bl-sm border border-gray-100 shadow-sm'
                        } ${(isImage || isVideo || isFile) ? 'mt-1' : ''}`}>
                        {msg.message}
                    </div>
                )}
                <div className={`flex items-center gap-1 mt-0.5 px-1 ${isOwn ? 'flex-row-reverse' : ''}`}>
                    <span className='text-[10px] text-gray-400'>{time}</span>
                    {isOwn && (msg.isRead
                        ? <CheckCheck size={12} className='text-[#6E35AE]' />
                        : <Check size={12} className='text-gray-400' />
                    )}
                </div>
            </div>
        </div>
    );
});

MessageBubble.displayName = 'MessageBubble';
export default MessageBubble;