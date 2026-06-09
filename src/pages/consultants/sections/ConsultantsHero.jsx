import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, ChevronDown } from 'lucide-react';

const ConsultantsHero = memo(({ searchTerm, setSearchTerm, expertise, setExpertise, topic, setTopic, expertiseOptions, topicsOptions }) => {
  const { t } = useTranslation();

  return (
    <div
      className='relative w-full h-150 bg-cover bg-center flex items-center'
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=900&fit=crop")',
      }}
    >
      {/* Dark Overlay to make text readable */}
      <div className='absolute inset-0 bg-black/50' />

      {/* Content Area */}
      <div className='relative z-10 w-full container mx-auto px-4 md:px-6'>
        <div className='max-w-6xl'>
          <h1 className='text-3xl sm:text-4xl lg:text-6xl  text-white mb-4 leading-tight'>
            {t('consultantsHero.title')}
          </h1>
          <p className='text-white text-base sm:text-xl mb-6 sm:mb-8'>
            {t('consultantsHero.description')}
          </p>

          {/* Search Bar with Filters */}
          <div className='flex flex-col md:flex-row gap-4 items-stretch'>
            {/* Expertise Dropdown */}
            <div className='relative w-full md:w-64'>
              <select
                value={expertise}
                onChange={(e) => setExpertise(e.target.value)}
                className='w-full appearance-none px-5 py-4 rounded-xl bg-[#FCF7E7] text-gray-700 font-medium border border-white/20 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#EAB308]/50'
              >
                {expertiseOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none' size={20} />
            </div>

            {/* Search Input */}
            <div className='relative w-full md:flex-1'>
              <Search className='absolute left-5 top-1/2 -translate-y-1/2 text-gray-500' size={20} />
              <input
                type='text'
                placeholder={t('consultantsHero.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-14 pr-5 py-4 rounded-xl bg-[#FCF7E7] text-gray-700 placeholder-gray-500 border border-white/20 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#EAB308]/50'
              />
            </div>

            {/* Topics Dropdown */}
            <div className='relative w-full md:w-64'>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className='w-full appearance-none px-5 py-4 rounded-xl bg-[#FCF7E7] text-gray-700 font-medium border border-white/20 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#EAB308]/50'
              >
                {topicsOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none' size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ConsultantsHero.displayName = 'ConsultantsHero';

export default ConsultantsHero;