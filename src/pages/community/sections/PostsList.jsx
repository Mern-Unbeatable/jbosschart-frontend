import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, MessageSquare, Send, ThumbsUp } from 'lucide-react';

const PostsList = memo(({ posts }) => {
  const { t } = useTranslation();
  const [openReplyIndex, setOpenReplyIndex] = useState(null);

  const sampleReplies = [
    t('community.posts.sampleReplies.0'),
    t('community.posts.sampleReplies.1'),
    t('community.posts.sampleReplies.2'),
    t('community.posts.sampleReplies.3'),
  ];

  const toggleReplies = (index) => {
    setOpenReplyIndex((currentIndex) => (currentIndex === index ? null : index));
  };

  return (
    <div className="space-y-4">
      {posts.map((post, idx) => (
        <div
          key={idx}
          className="border bg-white border-gray-100 rounded-lg p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow"
        >
          <span className="text-base text-gray-400 font-medium tracking-tight">
            {post.author}
          </span>
          <h3 className="text-2xl  text-[#1B1B1B] mt-2 mb-3">
            {post.title}
          </h3>
          <p className="text-gray-500 text-base leading-relaxed mb-6 border-b border-gray-100 pb-6">
            {post.desc}
          </p>
          <div className="flex items-center gap-4 text-gray-400">
            <div className="flex items-center gap-1.5 cursor-pointer hover:text-gray-600">
              <ThumbsUp size={18} />
              <span className="text-base font-medium">{post.likes}</span>
            </div>
            <div className="w-px  h-3 bg-gray-200"></div>
            <button
              type="button"
              onClick={() => toggleReplies(idx)}
              className="flex items-center gap-1.5 cursor-pointer hover:text-gray-600 transition-colors"
            >
              <MessageSquare size={18} />
              <span className="text-base font-medium">{t('community.posts.replyCount', { count: post.replies })}</span>
            </button>
          </div>

          {openReplyIndex === idx && (
            <div className="mt-6 rounded-lg border border-gray-100 bg-[#FAFAFA] p-4 sm:p-5">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="text-lg sm:text-xl font-semibold text-[#1B1B1B]">{t('community.posts.replyPanelTitle')}</h4>
                <button
                  type="button"
                  onClick={() => toggleReplies(idx)}
                  className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
                >
                  {t('community.posts.close')}
                  <ChevronDown size={16} className="rotate-180" />
                </button>
              </div>

              <div className="space-y-3">
                {sampleReplies.map((reply, replyIndex) => (
                  <div key={replyIndex} className="rounded-md bg-white px-4 py-3 border border-gray-100">
                    <span className="block text-xs font-medium text-gray-500 mb-2">Saranshati Pal</span>
                    <p className="text-sm sm:text-[15px] leading-relaxed text-gray-700">{reply}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-3 rounded-lg bg-white border border-gray-100 p-3">
                <input
                  type="text"
                  placeholder={t('community.posts.writeReplyPlaceholder')}
                  className="w-full bg-transparent text-sm sm:text-base text-gray-700 placeholder:text-gray-400 outline-none"
                />
                <button
                  type="button"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#E2AB0B] text-white transition-colors hover:bg-[#D4960A]"
                  aria-label={t('community.posts.sendReplyAria')}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
});

PostsList.displayName = 'PostsList';

export default PostsList;
