import React from 'react';
import FaqSection from './sections/FaqSection';
import SupportInquirySection from './sections/SupportInquirySection';
import RecentTicketsSection from './sections/RecentTicketsSection';

const SupportTickets = () => {
  return (
    <section className='space-y-4'>
      <div>
        <h1 className='text-2xl font-semibold text-[#2f2f2f] sm:text-3xl'>
          Support Tickets
        </h1>
        <p className='mt-1 text-sm text-gray-500 sm:text-base'>
          Feel free to solve your doubts anytime
        </p>
      </div>

      <FaqSection />
      <SupportInquirySection />
      <RecentTicketsSection />
    </section>
  );
};

export default SupportTickets;