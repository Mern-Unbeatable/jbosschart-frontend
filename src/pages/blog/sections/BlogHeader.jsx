import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

const BlogHeader = memo(() => {
  const { t } = useTranslation();

  return (
    <div className='text-center mb-12'>
      <span className='inline-block px-4 py-1 rounded-full border border-gray-200 text-base text-gray-500 font-medium mb-4'>
        {t('blog.header.badge')}
      </span>
      <h1 className='text-3xl md:text-5xl  text-gray-800 mb-6'>{t('blog.header.title')}</h1>
      <p className='text-gray-500 max-w-2xl mx-auto text-base lg:text-lg leading-relaxed'>
        {t('blog.header.description')}
      </p>
    </div>
  );
});

BlogHeader.displayName = 'BlogHeader';

export default BlogHeader;
