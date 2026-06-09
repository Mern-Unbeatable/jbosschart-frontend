import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, Shield, Users } from 'lucide-react';

const CreditBenefits = memo(() => {
  const { t } = useTranslation();

  const benefits = [
    {
      id: 1,
      icon: Clock,
      titleKey: 'creditBenefits.instantUsage.title',
      descriptionKey: 'creditBenefits.instantUsage.description',
    },
    {
      id: 2,
      icon: Shield,
      titleKey: 'creditBenefits.noHiddenFees.title',
      descriptionKey: 'creditBenefits.noHiddenFees.description',
    },
    {
      id: 3,
      icon: Users,
      titleKey: 'creditBenefits.universalValidity.title',
      descriptionKey: 'creditBenefits.universalValidity.description',
    },
  ];

  return (
    <div className='container mx-auto px-4 lg:px-6 mb-12 md:mb-16 '>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 bg-white border border-[#00000033] p-8 rounded-lg'>
        {benefits.map((benefit) => {
          const IconComponent = benefit.icon;
          return (
            <div key={benefit.id} className='text-center'>
              <div className='flex justify-center mb-4'>
                <div className='w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center'>
                  <IconComponent size={32} className='text-[#6E35AE]' />
                </div>
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-3 '>
                {t(benefit.titleKey)}
              </h3>
              <p className='text-gray-600'>{t(benefit.descriptionKey)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
});

CreditBenefits.displayName = 'CreditBenefits';

export default CreditBenefits;
