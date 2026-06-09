import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import BlogHeader from './sections/BlogHeader';
import BlogCategories from './sections/BlogCategories';
import BlogGrid from './sections/BlogGrid';
import AdsSection from './sections/AdsSection';
import CommonAdsSection from '../../components/CommonAdsSection';

const BlogContent = memo(() => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { value: 'all', label: t('blog.page.categories.all') },
    { value: 'spiritual-guidance', label: t('blog.page.categories.spiritualGuidance') },
    { value: 'consultancy-tips', label: t('blog.page.categories.consultancyTips') },
    { value: 'platform-updates', label: t('blog.page.categories.platformUpdates') },
    { value: 'articles', label: t('blog.page.categories.articles') },
  ];

  const blogs = [
    {
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format&fit=crop",
      date: t('blog.page.posts.commonDate'),
      author: "Sarah Jenkins",
      title: t('blog.page.posts.innerPeace.title'),
      desc: t('blog.page.posts.innerPeace.description')
    },
    {
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop",
      date: t('blog.page.posts.commonDate'),
      author: "Sarah Jenkins",
      title: t('blog.page.posts.consultancyTips.title'),
      desc: t('blog.page.posts.consultancyTips.description')
    },
    {
      image: "https://images.unsplash.com/photo-1580894732230-2838963bc3c3?w=800&auto=format&fit=crop",
      date: t('blog.page.posts.commonDate'),
      author: "Sarah Jenkins",
      title: t('blog.page.posts.platformUpdate.title'),
      desc: t('blog.page.posts.platformUpdate.description')
    },
    {
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop",
      date: t('blog.page.posts.commonDate'),
      author: "Sarah Jenkins",
      title: t('blog.page.posts.innerPeace.title'),
      desc: t('blog.page.posts.innerPeace.description')
    }
  ];

  return (
    <div className='bg-[#FBFDFF] py-14 md:py-20   '>
      <div className='container mx-auto px-4 md:px-6'>
        {/* Header Section */}
        <BlogHeader />

        {/* Category Tabs */}
        <BlogCategories 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Blog Grid */}
        <BlogGrid blogs={blogs} />

        {/* Ads Section */}
        <CommonAdsSection 
          wrapperClassName='mt-16'
      containerClassName='container mx-auto'
      boxClassName='w-full h-44 bg-[#F1F5F9] rounded-xl border border-dashed border-gray-300 flex items-center justify-center group hover:bg-gray-50 transition-colors'
      title={t('blog.page.adsTitle')}
      titleClassName='text-xl font-semibold text-gray-600'
        />
      </div>
    </div>
  );
});

BlogContent.displayName = 'BlogContent';

export default BlogContent;