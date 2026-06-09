import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const DummyPage = memo(({ title, subtitle, points = [] }) => {
  return (
    <section className='mx-auto flex min-h-[70vh] max-w-5xl flex-col justify-center px-4 py-16'>
      <div className='rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:p-12'>
        <p className='mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-purple-600'>
          Demo page
        </p>
        <h1 className='text-4xl font-bold tracking-tight text-gray-900 md:text-5xl'>
          {title}
        </h1>
        <p className='mt-4 max-w-2xl text-base leading-7 text-gray-600 md:text-lg'>
          {subtitle}
        </p>

        <div className='mt-8 grid gap-4 md:grid-cols-3'>
          {points.map((point) => (
            <div key={point} className='rounded-2xl bg-gray-50 p-5 text-sm text-gray-700'>
              {point}
            </div>
          ))}
        </div>

        <div className='mt-10 flex flex-wrap gap-3'>
          <Link
            to='/'
            className='rounded-md bg-[#6366F1] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-purple-700'
          >
            Back to Home
          </Link>
          <Link
            to='/services'
            className='rounded-md border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition-all hover:border-purple-200 hover:text-purple-700'
          >
            View Services
          </Link>
        </div>
      </div>
    </section>
  );
});

DummyPage.displayName = 'DummyPage';

export default DummyPage;