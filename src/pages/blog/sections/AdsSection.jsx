import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import CommonAdsSection from '../../../components/CommonAdsSection';

const AdsSection = memo(() => {
  const { t } = useTranslation();

  return (
    <CommonAdsSection
      wrapperClassName='mt-16'
      containerClassName='container mx-auto px-4 md:px-6'
      boxClassName='w-full h-44 bg-[#F1F5F9] rounded-xl border border-dashed border-gray-300 flex items-center justify-center group hover:bg-gray-50 transition-colors'
      title={t('blog.page.adsTitle')}
      titleClassName='text-xl font-semibold text-gray-600'
    />
  );
});

AdsSection.displayName = 'AdsSection';

export default AdsSection;
