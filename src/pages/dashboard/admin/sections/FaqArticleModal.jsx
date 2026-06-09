import React from 'react';
import { Bold, Italic, Link2, List, X } from 'lucide-react';

const FaqArticleModal = ({
  isOpen,
  mode,
  question,
  answer,
  onQuestionChange,
  onAnswerChange,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/45 px-4 py-4 sm:py-6 backdrop-blur-[1px]'>
      <div className='w-full max-w-full sm:max-w-2xl overflow-hidden rounded-t-lg sm:rounded-[14px] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.25)]'>
        <div className='sticky top-0 z-20 flex items-center justify-between border-b border-[#e9e6ef] bg-[#E2AB0B] px-4 py-3 sm:px-6 sm:py-4 text-white'>
          <h3 className='text-[13px] font-medium uppercase tracking-[0.22em]'>
            {mode === 'edit' ? 'Edit FAQ Article' : 'Add FAQ Article'}
          </h3>

          <button
            type='button'
            onClick={onClose}
            className='rounded-md p-1 transition-colors hover:bg-white/10'
            aria-label='Close FAQ editor'
          >
            <X size={22} aria-hidden='true' />
          </button>
        </div>

        <div className='overflow-auto max-h-[calc(100vh-160px)] sm:max-h-none px-4 py-5 sm:px-6 sm:py-7'>
          <div className='space-y-2'>
            <label className='text-base font-medium uppercase tracking-wide text-[#6b6577]'>
              Question Title
            </label>
            <input
              value={question}
              onChange={(e) => onQuestionChange(e.target.value)}
              type='text'
              className='w-full rounded-lg border border-[#eceaf2] bg-[#f7f7fb] px-3 py-3 text-[16px] font-normal text-[#2a2433] outline-none transition-colors placeholder:text-[#a19bb0] focus:border-[#d3c9e7]'
              placeholder='Enter FAQ question'
            />
          </div>

          <div className='mt-6 space-y-2'>
            <label className='text-base font-medium uppercase tracking-wide text-[#6b6577]'>
              Answer Content
            </label>

            <div className='overflow-hidden rounded-xl border border-[#e5e2eb] bg-white'>
              <div className='flex items-center gap-1 border-b border-[#e5e2eb] bg-[#efeff4] px-3 py-2 text-[#4f4a5f]'>
                <button type='button' className='rounded p-1 hover:bg-white' aria-label='Bold'>
                  <Bold size={17} aria-hidden='true' />
                </button>
                <button type='button' className='rounded p-1 hover:bg-white' aria-label='Italic'>
                  <Italic size={17} aria-hidden='true' />
                </button>
                <button type='button' className='rounded p-1 hover:bg-white' aria-label='Link'>
                  <Link2 size={17} aria-hidden='true' />
                </button>
                <button type='button' className='rounded p-1 hover:bg-white' aria-label='List'>
                  <List size={17} aria-hidden='true' />
                </button>
              </div>

              <textarea
                value={answer}
                onChange={(e) => onAnswerChange(e.target.value)}
                rows={8}
                className='min-h-40 sm:min-h-52 w-full resize-none border-0 px-3 py-3 text-base leading-6 sm:leading-7 text-[#2a2433] outline-none placeholder:text-[#a19bb0]'
                placeholder='Enter answer content'
              />
            </div>
          </div>
        </div>

        <div className='sticky bottom-0 z-20 bg-white border-t border-[#d6cfe0] px-4 py-3 sm:px-6 sm:py-4'>
          <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
            <div />
            <div className='flex w-full sm:w-auto gap-3'>
              <button
                type='button'
                onClick={onSave}
                className='w-full sm:w-auto rounded-lg bg-[#E2AB0B] px-4 py-3 text-sm font-medium text-white shadow-sm transition-all hover:brightness-95'
              >
                Save Changes
              </button>
              <button
                type='button'
                onClick={onClose}
                className='w-full sm:w-auto rounded-lg border border-[#d6cfe0] bg-white px-4 py-3 text-sm font-medium text-[#595367] transition-colors hover:bg-[#faf9fc]'
              >
                Discard Draft
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqArticleModal;
