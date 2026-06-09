import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const ClosingCtaSection = memo(() => {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6  lg:py-20">
      {/* Card: Updated background to a very soft light cream and increased padding */}
      <div className="rounded-3xl bg-[#FEF5E7] px-6 py-12 text-center sm:px-12 sm:py-16">
        
        {/* Title */}
        <h2 className=" text-3xl font-medium text-gray-900 sm:text-4xl lg:text-[40px]">
          {t('entrepreneurshipPage.sections.closing.title', 'Ready to seriously grow?')}
        </h2>
        
        {/* Description */}
        <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-gray-500 sm:text-base">
          {t(
            'entrepreneurshipPage.sections.closing.description',
            'Success begins with taking action. By partnering with the right knowledge, you make a real impact.'
          )}
        </p>
        
        {/* Button Wrapper */}
        <div className="mt-6 flex justify-center">
          <Link
           
            
            className="rounded bg-[#E2AB0B] px-6 py-2.5 text-xs font-medium text-white transition-transform hover:-translate-y-0.5"
          >
            {t('entrepreneurshipPage.sections.closing.button', 'Take the step today')}
          </Link>
        </div>

      </div>
    </section>
  );
});

ClosingCtaSection.displayName = 'ClosingCtaSection';

export default ClosingCtaSection;