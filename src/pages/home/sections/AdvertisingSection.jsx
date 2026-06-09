import React, { memo } from 'react';

const AdvertisingSection = memo(() => {
  return (
    <section className='py-14 md:py-20  px-4 bg-gray-100'>
      <div className='container mx-auto px-4 lg:px-6'>
        {/* Background Image with Overlay */}
        <div className='relative rounded-lg overflow-hidden shadow-lg' style={{ border: '2px dotted #333' }}>
          {/* Background Image */}
          <img
            src='/jbossAdvertising.webp'
            alt='E-commerce storefront'
            className='w-full h-64 sm:h-80 lg:h-96 object-cover'
          />

          {/* Dark Overlay */}
          <div className='absolute inset-0 bg-black/50'></div>

          {/* Content Overlay */}
          <div className='absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-12 text-center'>
            <p className='text-white text-sm sm:text-base lg:text-lg mb-8 max-w-3xl leading-relaxed'>
              Turn your website traffic into revenue by enabling targeted advertising. Our platform allows businesses to showcase their products and services directly to your audience through strategically placed ads.
            </p>

            <a 
              href='https://www.e-commerce.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-yellow-500 hover:text-yellow-400 text-base sm:text-lg font-semibold transition-colors duration-300'
            >
              www.e-commerce.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});

AdvertisingSection.displayName = 'AdvertisingSection';

export default AdvertisingSection;
