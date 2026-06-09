import React, { memo } from 'react';

const CommonAdsSection = memo(
  ({
    wrapperClassName = '',
    containerClassName = 'container mx-auto px-4 lg:px-6',
  }) => {
    return (
      <div className={wrapperClassName}>
        <div className={containerClassName}>
          <div className='w-full h-44 md:h-56 lg:h-72 bg-[#F1F5F9] rounded-xl border border-dashed border-gray-300 flex items-center justify-center group'>
            <span className='text-black font-bold text-xl md:text-2xl tracking-widest uppercase'>
              Advertisement Area
            </span>
          </div>
        </div>
      </div>
    );
  },
);

CommonAdsSection.displayName = 'CommonAdsSection';

export default CommonAdsSection;