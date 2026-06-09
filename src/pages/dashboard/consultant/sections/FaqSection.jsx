import React, { useState } from 'react';
import { ArrowRight, ChevronDown, Ticket } from 'lucide-react';

const FAQ_ITEMS = [
  {
    id: 1,
    question: 'How do I start my first consultation?',
    answer:
      'Choose a consultant, pick an available time slot, and confirm the booking from your dashboard.',
  },
  {
    id: 2,
    question: 'How does the credit and billing system work?',
    answer:
      'Credits are deducted when a session is booked or completed. Billing history is available in your account.',
  },
  {
    id: 3,
    question: 'Can I request a refund for a missed session?',
    answer:
      'Yes. Submit a support request with the session details and our team will review the case.',
  },
  {
    id: 4,
    question: 'How are consultants vetted on this platform?',
    answer:
      'Every consultant goes through profile verification, experience review, and manual approval before activation.',
  },
];

const FaqSection = () => {
  const [openFaqId, setOpenFaqId] = useState(1);

  return (
    <section className='space-y-4 mb-4'>
      <div className='flex items-center gap-2 text-2xl font-semibold text-[#5c3d91] '>
        <Ticket size={18} aria-hidden='true' />
        Frequently Asked Questions
      </div>

      <div className='space-y-3'>
        {FAQ_ITEMS.map((item) => {
          const isOpen = openFaqId === item.id;

          return (
            <button
              key={item.id}
              type='button'
              onClick={() => setOpenFaqId(isOpen ? null : item.id)}
              className='w-full rounded-lg border border-gray-100 bg-white px-4 py-4 text-left shadow-[0_1px_8px_rgba(15,23,42,0.04)] transition-all hover:border-[#e3d7f7]'
            >
              <div className='flex items-center justify-between gap-4'>
                <span className='text-base font-semibold text-[#2f2f2f] sm:text-base'>
                  {item.question}
                </span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-[#b39ddb] transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden='true'
                />
              </div>
              {isOpen && (
                <p className='mt-3 max-w-3xl text-base leading-6 text-gray-500'>
                  {item.answer}
                </p>
              )}
            </button>
          );
        })}
      </div>
{/* 
      <button
        type='button'
        className='inline-flex items-center gap-1 text-base font-medium text-[#6e35ae] transition-colors hover:text-[#5c2c96]'
      >
        View all FAQ articles
        <ArrowRight size={16} aria-hidden='true' />
      </button> */}
    </section>
  );
};

export default FaqSection;