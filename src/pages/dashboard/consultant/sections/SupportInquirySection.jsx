import React from 'react';

const SupportInquirySection = () => {
  return (
    <section className='mt-4 rounded-lg bg-[#8f6bc8] p-4 text-white shadow-[0_20px_40px_rgba(109,78,166,0.2)] sm:p-6 lg:p-7'>
      <div className='max-w-2xl'>
        <h2 className='text-xl font-semibold sm:text-2xl'>Can't find your answer?</h2>
        <p className='mt-2 text-base leading-6 text-white/80 sm:text-base'>
          Our support team usually responds within 2 business hours. Send us your inquiry directly.
        </p>
      </div>

      <div className='mt-5 rounded-lg bg-white/10 p-4 backdrop-blur-[1px] sm:p-5'>
        <div className='grid gap-4'>
          <label className='space-y-2'>
            <span className='block text-base  uppercase tracking-wider text-white'>
              Subject
            </span>
            <input
              type='text'
              placeholder='e.g. Billing discrepancy'
              className='h-12 w-full rounded-md border-0 bg-white/25 px-4 text-sm text-white placeholder:text-white/55 outline-none ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-white/40'
            />
          </label>

          <label className='space-y-2'>
            <span className='block text-base uppercase tracking-wider text-white'>
              Message
            </span>
            <textarea
              rows='4'
              placeholder='Describe your issue in detail.'
              className='w-full rounded-md border-0 bg-white/25 px-4 py-3 text-sm text-white placeholder:text-white/55 outline-none ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-white/40'
            />
          </label>

          <button
            type='button'
            className='h-12 rounded-md bg-[#E2AB0B] text-sm  text-white transition-all '
          >
            Submit Support Ticket
          </button>
        </div>
      </div>
    </section>
  );
};

export default SupportInquirySection;