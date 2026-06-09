import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

const WebshopHero = memo(({ selectedCategory, onCategoryChange }) => {
  const { t } = useTranslation();
  const categories = [
    { value: 'all', label: t('webshopHero.categories.all') },
    { value: 'spiritual', label: t('webshopHero.categories.spiritual') },
    { value: 'healing', label: t('webshopHero.categories.healing') },
    { value: 'articles', label: t('webshopHero.categories.articles') },
    { value: 'digital', label: t('webshopHero.categories.digital') },
    { value: 'books', label: t('webshopHero.categories.books') },
  ];

  return (
    <div className='container mx-auto px-4 lg:px-6 '>
      {/* Header */}
      <div className='mb-6'>
        <h1 className='text-2xl md:text-4xl font-bold text-gray-900 mb-2 '>
          {t('webshopHero.title')}
        </h1>
        <p className='text-gray-600 text-base md:text-lg'>
          {t('webshopHero.description')}
        </p>
      </div>

      {/* Category Filters */}
      <div className='flex flex-wrap gap-3'>
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => onCategoryChange(category.value)}
            className={`px-4 py-2 rounded-full font-medium text-base transition-all ${
              selectedCategory === category.value
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
});

WebshopHero.displayName = 'WebshopHero';

export default WebshopHero;
