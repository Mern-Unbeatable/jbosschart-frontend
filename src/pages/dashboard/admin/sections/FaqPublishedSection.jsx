import React from 'react';
import { PenLine, Trash2 } from 'lucide-react';

const FAQ_TABS = [
  {
    id: 'published',
    label: 'Published FAQs',
  },
];

const FaqPublishedSection = ({ activeTab, onTabChange, faqs, onEdit, onDelete }) => {
  return (
    <div className='rounded-xl border border-[#ece8f6] bg-white shadow-[0_10px_30px_rgba(17,12,46,0.06)]'>
      <div className='border-b border-[#ede7f6] px-2 pt-2'>
        <div className='flex items-center gap-2'>
          {FAQ_TABS.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type='button'
                onClick={() => onTabChange(tab.id)}
                className={`rounded-t-lg border px-4 py-3 text-base transition-colors ${
                  isActive
                    ? 'border-[#d9c8ef] border-b-white bg-white text-[#7b5cb1] shadow-[0_2px_0_0_#7b5cb1]'
                    : 'border-transparent text-gray-500 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className='overflow-hidden rounded-b-xl'>
        <div className='grid grid-cols-1 sm:grid-cols-[1fr_auto] border-b border-[#f1eef7] bg-[#f7f5fb] px-6 py-4 text-base font-bold uppercase tracking-wide text-[#4b4b59] sm:px-8'>
          <div>Questions</div>
          <div className='hidden sm:block'>Actions</div>
        </div>

        <div className='divide-y divide-[#f4f1f8] bg-white'>
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className='grid grid-cols-1 sm:grid-cols-[1fr_auto] items-center gap-4 sm:gap-0 px-6 py-7 transition-colors hover:bg-[#fcfbff] sm:px-8'
            >
                <div className='min-w-0 pr-6'>
                <p className='text-base font-semibold text-[#242424]'>
                  {faq.question}
                </p>
              </div>

                <div className='flex items-center justify-start sm:justify-end gap-3 text-[#78748a]'>
                <button
                  type='button'
                  onClick={() => onEdit(faq)}
                  className='rounded-md p-1.5 transition-colors hover:bg-[#f3eefc] hover:text-[#7b5cb1]'
                  aria-label={`Edit FAQ ${faq.id}`}
                >
                  <PenLine size={16} aria-hidden='true' />
                </button>
                <button
                  type='button'
                  onClick={() => onDelete(faq.id)}
                  className='rounded-md p-1.5 transition-colors hover:bg-red-50 hover:text-red-600'
                  aria-label={`Delete FAQ ${faq.id}`}
                >
                  <Trash2 size={16} aria-hidden='true' />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqPublishedSection;
