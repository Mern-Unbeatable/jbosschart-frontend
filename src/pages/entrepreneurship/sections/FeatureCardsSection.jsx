import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

// Reusable SVG Icons based on the design
const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const WebsiteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="3" y1="9" x2="21" y2="9"></line>
  </svg>
);

const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

const ChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

const cards = [
  {
    id: 'positioning',
    icon: <GlobeIcon />,
    titleKey: 'entrepreneurshipPage.features.positioning.title',
    defaultTitle: 'Positioning & Branding',
    descKey: 'entrepreneurshipPage.features.positioning.desc',
    defaultDesc: 'An authentic brand that truly resonates and sticks.',
  },
  {
    id: 'website',
    icon: <WebsiteIcon />,
    titleKey: 'entrepreneurshipPage.features.website.title',
    defaultTitle: 'Website & Conversion',
    descKey: 'entrepreneurshipPage.features.website.desc',
    defaultDesc: 'Technically strong sites that convert visitors into customers.',
  },
  {
    id: 'visibility',
    icon: <ChartIcon />,
    titleKey: 'entrepreneurshipPage.features.visibility.title',
    defaultTitle: 'Visibility (SEO)',
    descKey: 'entrepreneurshipPage.features.visibility.desc',
    defaultDesc: 'Be found by the right people at the right time.',
  },
  {
    id: 'communication',
    icon: <ChatIcon />,
    titleKey: 'entrepreneurshipPage.features.communication.title',
    defaultTitle: 'Communication',
    descKey: 'entrepreneurshipPage.features.communication.desc',
    defaultDesc: 'Clear messages that directly appeal to your target audience.',
  },
];

const FeatureCardsSection = memo(() => {
  const { t } = useTranslation();

  return (
    <section className="container  mx-auto px-4 lg:px-6 pb-14 lg:pb-20 ">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <h2 className="mb-4  text-2xl font-medium text-gray-900 md:text-4xl">
          {t('entrepreneurshipPage.features.mainTitle', 'Harness your full potential')}
        </h2>
        <p className="mx-auto max-w-2xl  text-gray-500 text-base">
          {t(
            'entrepreneurshipPage.features.mainSubtitle',
            'Most entrepreneurs only utilize a small part of their possibilities. We help you find the balance.'
          )}
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <article
            key={card.id}
            className="flex flex-col rounded-xl border border-gray-100 bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-md"
          >
            {/* Orange Icon Container */}
            <div className="mb-5 flex h-8 w-8 items-center justify-center rounded bg-[#F59E0B] text-white">
              {card.icon}
            </div>
            
            {/* Title */}
            <h3 className="mb-2  text-lg font-semibold text-gray-900">
              {/* Fallback to defaultTitle if translation is missing */}
              {t(card.titleKey, card.defaultTitle)}
            </h3>
            
            {/* Description */}
            <p className="text-base leading-relaxed text-gray-500">
              {t(card.descKey, card.defaultDesc)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
});

FeatureCardsSection.displayName = 'FeatureCardsSection';

export default FeatureCardsSection;