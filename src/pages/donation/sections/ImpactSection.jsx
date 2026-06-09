import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Utensils, GraduationCap, Activity } from 'lucide-react';

const ImpactSection = memo(() => {
  const { t } = useTranslation();

  const impactCards = [
    {
      icon: Utensils,
      titleKey: 'donation.impact.cards.feedFamily.title',
      descriptionKey: 'donation.impact.cards.feedFamily.description',
      color: 'bg-orange-50',
    },
    {
      icon: GraduationCap,
      titleKey: 'donation.impact.cards.supportEducation.title',
      descriptionKey: 'donation.impact.cards.supportEducation.description',
      color: 'bg-amber-50',
    },
    {
      icon: Activity,
      titleKey: 'donation.impact.cards.medicalSupport.title',
      descriptionKey: 'donation.impact.cards.medicalSupport.description',
      color: 'bg-yellow-50',
    },
  ];

  return (
    <div className='py-14 md:py-20 bg-[#F1F5F9] text-center'>
    <div className='container mx-auto px-4 lg:px-6'>
        <h2 className='text-2xl md:text-3xl font-bold text-gray-800 mb-8'>
        {t('donation.impact.title')}
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {impactCards.map((card, idx) => (
          <div key={idx} className='bg-white border border-gray-100 rounded-xl p-8 text-left shadow-sm'>
            <div className={`w-10 h-10 ${card.color} rounded-lg flex items-center justify-center mb-5`}>
              <card.icon size={20} className='text-[#EAB308]' />
            </div>
            <h3 className='text-xl font-bold text-gray-800 mb-2'>{t(card.titleKey)}</h3>
            <p className='text-gray-500 text-base'>{t(card.descriptionKey)}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
});

ImpactSection.displayName = 'ImpactSection';

export default ImpactSection;
