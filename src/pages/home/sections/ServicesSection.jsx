import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, Video, MessageSquare } from 'lucide-react';

const SERVICES = [
  {
    icon: Phone,
    titleKey: 'home.services.telephone.title',
    descriptionKey: 'home.services.telephone.description',
  },
  {
    icon: Video,
    titleKey: 'home.services.video.title',
    descriptionKey: 'home.services.video.description',
  },
  {
    icon: MessageSquare,
    titleKey: 'home.services.chat.title',
    descriptionKey: 'home.services.chat.description',
  },
];

const ServicesSection = memo(() => {
  const { t, i18n } = useTranslation();
  const isDutch = i18n.resolvedLanguage === 'nl' || i18n.language === 'nl';

  return (
    <section className='w-full py-14 md:py-20   bg-[#F1EBF7]'>
      <div className='container mx-auto px-4 lg:px-6'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
          {SERVICES.map((service, index) => (
            <div key={index} className='flex flex-col items-start group'>
              {/* Icon - Small and Rounded as per image */}
              <div className='flex items-center justify-center w-8 h-8 bg-[#8F65D5] rounded-md mb-6'>
                <service.icon size={16} className='text-white' />
              </div>

              {/* Title - Serif style font */}
              <h3 className='text-2xl font-crimson font-bold text-gray-900 mb-3 '>
                {t(service.titleKey)}
              </h3>

              {/* Description */}
              <p
                className={`text-base font-poppins text-gray-600 leading-relaxed mb-6 max-w-75 ${
                  isDutch ? 'md:h-18' : ''
                }`}
              >
                {t(service.descriptionKey)}
              </p>

              {/* Bottom Divider Line - Visible as per image */}
              <div className='w-full h-px bg-gray-300 transition-colors group-hover:bg-purple-400'></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

ServicesSection.displayName = 'ServicesSection';

export default ServicesSection;