import React, { memo } from 'react';
import CommonAdsSection from '../../../components/CommonAdsSection';

const WebshopAds = memo(() => {
  return (
    <CommonAdsSection
      containerClassName='container mx-auto px-4'
      boxClassName='w-full h-44 md:h-56 lg:h-72 bg-[#F1F5F9] rounded-xl border border-dashed border-gray-300 flex items-center justify-center group'
      title='Advertisement Area'
      titleClassName='text-black font-bold text-2xl tracking-widest uppercase'
    />
  );
});

WebshopAds.displayName = 'WebshopAds';

export default WebshopAds;
