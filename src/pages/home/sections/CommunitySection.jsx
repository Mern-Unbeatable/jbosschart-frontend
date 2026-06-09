import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

const CommunitySection = memo(() => {
  const { t } = useTranslation();

  const stats = [
    { id: 1, number: '5k+', labelKey: 'home.communitySection.stats.activeMembers' },
    { id: 2, number: '12k+', labelKey: 'home.communitySection.stats.discussions' },
    { id: 3, number: '24/7', labelKey: 'home.communitySection.stats.support' },
  ];

  const communityMembers = [
    { id: 1, image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&h=200&fit=crop', rounded: 'rounded-xl' },
    { id: 2, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop', rounded: 'rounded-full' },
    { id: 3, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&fit=crop', rounded: 'rounded-xl' },
    { id: 4, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&h=200&fit=crop', rounded: 'rounded-full' },
    { id: 5, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&fit=crop', rounded: 'rounded-xl' },
    { id: 6, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&h=200&fit=crop', rounded: 'rounded-full' },
  ];

  return (
    <section className='py-14 md:py-20 bg-[#FCF7E7]'>
      <div className='container mx-auto px-4 lg:px-6 '>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center'>
          
          {/* Left Content */}
          <div className='flex flex-col items-start'>
            <div className='mb-2 mb:mb-8'>
              <h2 className='text-2xl md:text-4xl font-bold mb-2  text-gray-900 leading-tight'>
                {t('home.communitySection.title')}
              </h2>
              {/* Underline matching the image */}
              <div className='w-12 h-0.5 bg-gray-500 mb-3 md:mb-6'></div>
              
              <p className='text-base text-gray-600 mb-4 md:mb-8 leading-relaxed max-w-lg'>
                {t('home.communitySection.description')}
              </p>

              <button className='bg-green-500/60 text-white px-6 py-2.5 rounded-md text-sm font-semibold transition-all  active:scale-95'>
                {t('home.communitySection.button')}
              </button>
            </div>

            {/* Stats - Positioned at the bottom left like the image */}
            <div className='grid grid-cols-3 gap-4 sm:gap-8 lg:gap-10 mt-6 lg:mt-8 pt-2 lg:pt-8'>
              {stats.map((stat) => (
                <div key={stat.id} className='flex flex-col items-start'>
                  <p className='text-2xl font-bold text-gray-900'>{stat.number}</p>
                  <p className='text-sm sm:text-base text-gray-500 font-medium sm:uppercase sm:tracking-wider'>
                    {t(stat.labelKey)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Mixed Shapes Image Grid */}
          <div className='flex justify-center lg:justify-end lg:px-4 pr-0 mt-2 lg:mt-0'>
            <div className='grid grid-cols-3 gap-3 sm:gap-6 lg:gap-14 w-full max-w-88 sm:max-w-md'>
              {communityMembers.map((member) => (
                <div 
                  key={member.id} 
                  className={`aspect-square w-full overflow-hidden shadow-sm ${member.rounded}`}
                >
                  <img 
                    src={member.image}
                    alt='Member'
                    className='w-full h-full object-cover transition-transform duration-500 hover:scale-110'
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
});

CommunitySection.displayName = 'CommunitySection';

export default CommunitySection;