import React from 'react';
import { HelpCircle, List, Link2, MessageSquareText, Bold, Italic, X, PenLine } from 'lucide-react';

const FaqAnswerModal = ({
  isOpen,
  pendingQuestion,
  title,
  answer,
  onTitleChange,
  onAnswerChange,
  onClose,
  onPublish,
}) => {
  if (!isOpen || !pendingQuestion) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/45 px-4 py-4 sm:py-6 backdrop-blur-[1px]'>
      <div className='w-full max-w-full sm:max-w-4xl overflow-hidden rounded-t-lg sm:rounded-[14px] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.25)]'>

        {/* sticky header */}
        <div className='sticky top-0 z-20 flex items-center justify-between border-b border-[#e9e6ef] bg-[#f6f2fb] px-4 py-3 sm:px-6 sm:py-4 text-[#6f5a92]'>
          <h3 className='text-lg font-semibold tracking-tight'>
            Answer & Publish Question
          </h3>

          <button
            type='button'
            onClick={onClose}
            className='rounded-md p-1 transition-colors hover:bg-black/5'
            aria-label='Close answer modal'
          >
            <X size={18} aria-hidden='true' />
          </button>
        </div>

        {/* scrollable body */}
        <div className='overflow-auto max-h-[calc(100vh-160px)] sm:max-h-none px-4 py-4 sm:px-8 sm:py-5'>
          <div className='space-y-2'>
            <div className='flex items-center gap-2 text-base font-medium text-[#6c5a91]'>
              <HelpCircle size={14} aria-hidden='true' />
              Original Consultant Question
            </div>

            <div className='rounded-lg border-l-4 border-[#7a5ab6] bg-[#f4f1f8] px-3 py-3 text-base leading-6 sm:leading-7 text-[#54505f]'>
              {pendingQuestion.quote}
            </div>
          </div>

          <div className='mt-6 space-y-2'>
            <label className='text-base font-medium uppercase tracking-wide text-[#655c72]'>
              FAQ Article Title
            </label>
            <input
              value={title}
              onChange={(event) => onTitleChange(event.target.value)}
              type='text'
              className='w-full rounded-lg border border-[#eceaf2] bg-[#efe9ff] px-3 py-3 text-[14px] sm:text-[15px] text-[#2c2436] outline-none transition-colors placeholder:text-[#9188a2] focus:border-[#d3c9e7]'
            />
          </div>

          <div className='mt-6 space-y-2'>
            <label className='text-base font-medium uppercase tracking-wide text-[#655c72]'>
              Answer Content
            </label>

            <div className='overflow-hidden rounded-xl border border-[#d9d6e0] bg-white'>
              <div className='flex items-center gap-1 border-b border-[#d9d6e0] bg-[#f3f2f6] px-3 py-2 text-[#514a60]'>
                <button type='button' className='rounded p-1 hover:bg-white' aria-label='Bold'>
                  <Bold size={16} aria-hidden='true' />
                </button>
                <button type='button' className='rounded p-1 hover:bg-white' aria-label='Italic'>
                  <Italic size={16} aria-hidden='true' />
                </button>
                <button type='button' className='rounded p-1 hover:bg-white' aria-label='List'>
                  <List size={16} aria-hidden='true' />
                </button>
                <button type='button' className='rounded p-1 hover:bg-white' aria-label='Link'>
                  <Link2 size={16} aria-hidden='true' />
                </button>
                <button type='button' className='rounded p-1 hover:bg-white' aria-label='Image'>
                  <PenLine size={16} aria-hidden='true' />
                </button>
              </div>

              <textarea
                value={answer}
                onChange={(event) => onAnswerChange(event.target.value)}
                rows={8}
                className='min-h-40 sm:min-h-56 w-full resize-none border-0 px-3 py-3 text-[14px] sm:text-[15px] leading-6 sm:leading-7 text-[#2a2433] outline-none placeholder:text-[#a19bb0]'
                placeholder='Provide a detailed answer for the knowledge base...'
              />
            </div>
          </div>
        </div>

        {/* sticky footer on mobile */}
        <div className='sticky bottom-0 z-20 bg-white border-t border-[#ede9f2] px-4 py-3 sm:px-8 sm:py-4'>
          <div className='flex justify-end'>
            <button
              type='button'
              onClick={onPublish}
              className='inline-flex items-center gap-2 rounded-lg bg-[#E2AB0B] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:brightness-95'
            >
              <MessageSquareText size={16} aria-hidden='true' />
              Publish & Notify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqAnswerModal;
