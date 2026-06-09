import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../../../config';

const ShowcaseSection = memo(() => {
  const { t } = useTranslation();
  
  // Custom points array if localized fallbacks are needed to match the image precisely
  const coachingPoints = [
    t('coaching.points.analyze', 'We analyze your business model'),
    t('coaching.points.map', 'We map out blockages and opportunities'),
    t('coaching.points.advice', 'Strategic and directly applicable advice'),
    t('coaching.points.tailored', 'Tailored to your business and energy')
  ];

  return (
    <section className="mx-auto container px-4 pt-14 lg:pt-20 lg:px-6 ">
      {/* Outer Gray Card Container */}
      <div className="rounded-lg bg-[#EEEEEE] px-6 py-12 sm:px-12 sm:py-16">
        
        {/* Centered Top Heading Section */}
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl font-medium text-gray-900 sm:text-4xl">
            {t('coaching.mainTitle', 'Coaching & Sparring session')}
          </h2>
          <p className="mt-3 text-base text-gray-500 ">
            {t('coaching.mainSubtitle', 'Online entrepreneurship with direction')}
          </p>
        </div>

        {/* Inner Content Layout Split */}
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 md:grid-cols-2 lg:gap-8 lg:items-stretch">
            
            {/* Left Column: Soft Cream Price Card */}
            <div className="flex flex-col items-center justify-center rounded-lg bg-[#FEF5E7] p-6 text-center ">
              <p className="text-base text-slate-500 line-through ">
                {t('coaching.regularPrice', 'Regular: €229,–')}
              </p>
              <p className="mt-4 text-2xl  md:text-4xl font-semibold text-slate-900 ">
                €149,–
              </p>
              <p className="mx-auto mt-4 max-w-45 text-base leading-relaxed text-slate-600 ">
                {t('coaching.intensiveSession', 'Intensive 60-minute session')}
              </p>
            </div>

            {/* Right Column: Clean White Features Card */}
            <div className="flex flex-col justify-between rounded-lg bg-white p-8 sm:p-12">
              <div>
                <h3 className="font-serif text-2xl font-medium text-gray-900 sm:text-4xl">
                  {t('coaching.inThisSession', 'In this session:')}
                </h3>
                
                {/* Custom list layout matching small dot style from image */}
                <ul className="mt-6 space-y-4">
                  {coachingPoints.map((point, index) => (
                    <li key={index} className="flex items-center gap-3 text-base font-medium text-gray-600 ">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-gray-600" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="mt-8">
                <Link
                  to={ROUTES.CONSULTANTS}
                  className="inline-block rounded bg-[#E2AB0B] px-5 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
                >
                  {t('coaching.btn', 'Book now')}
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
});

ShowcaseSection.displayName = 'ShowcaseSection';

export default ShowcaseSection;