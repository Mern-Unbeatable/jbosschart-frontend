import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

const SupportNetworkSection = memo(() => {
  const { t } = useTranslation();
  return (
    <div className=' container mx-auto px-4 lg:px-6 '>
      <h3 className='text-xl font-bold text-gray-800 mb-1'>{t('donation.supportNetwork.title')}</h3>
      <p className='text-gray-500 text-base mb-6'>{t('donation.supportNetwork.subtitle')}</p>
      <div className='bg-white rounded-xl p-8 border border-gray-100'>
        <p className='text-gray-700 font-bold text-lg mb-1 italic '>
          {t('donation.supportNetwork.quote')}
        </p>
        <p className='text-gray-400 text-xs italic'>{t('donation.supportNetwork.attribution')}</p>
      </div>
    </div>
  );
});

SupportNetworkSection.displayName = 'SupportNetworkSection';

export default SupportNetworkSection;
