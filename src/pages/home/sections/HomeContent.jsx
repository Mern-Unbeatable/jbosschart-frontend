import React, { memo } from 'react';
import HeroSection from './HeroSection';
import ServicesSection from './ServicesSection';
import ConsultantsSection from './ConsultantsSection';
import PricingSection from './PricingSection';
import CommunitySection from './CommunitySection';
import AdvertisingSection from './AdvertisingSection';

const HomeContent = memo(() => {
  return (
    <main className=''>
      <HeroSection />
      <ServicesSection />
      <ConsultantsSection />
      <PricingSection />
      <CommunitySection />
      <AdvertisingSection />
    </main>
  );
});

HomeContent.displayName = 'HomeContent';

export default HomeContent;
