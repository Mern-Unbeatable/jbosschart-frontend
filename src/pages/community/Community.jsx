import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Pagination from '../../components/Pagination';
import CommonAdsSection from '../../components/CommonAdsSection';
import CategoriesSidebar from './sections/CategoriesSidebar';
import TabFilter from './sections/TabFilter';
import PostsList from './sections/PostsList';
import ShareExperienceModal from './sections/ShareExperienceModal';

const CommunityContent = memo(() => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('meditation');
  const [activeCategory, setActiveCategory] = useState('spiritual-development');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const postsPerPage = 4;

  const tabs = [
    { value: 'meditation', label: t('community.tabs.meditation') },
    { value: 'mindfulness', label: t('community.tabs.mindfulness') },
    { value: 'awakening', label: t('community.tabs.awakening') },
  ];

  const categories = [
    { value: 'spiritual-development', label: t('community.categories.spiritualDevelopment'), isOpen: true },
    { value: 'meditation', label: t('community.categories.meditation'), isOpen: false },
    { value: 'love-life', label: t('community.categories.loveLife'), isOpen: false },
    { value: 'energy-healing', label: t('community.categories.energyHealing'), isOpen: false },
  ];

  const allPosts = [
    {
      author: 'Ralph Edwards',
      title: t('community.posts.items.innerPeaceMindfulness.title'),
      desc: t('community.posts.items.innerPeaceMindfulness.description'),
      likes: 4,
      replies: 4
    },
    {
      author: 'Ralph Edwards',
      title: t('community.posts.items.energyHealingAlignment.title'),
      desc: t('community.posts.items.energyHealingAlignment.description'),
      likes: 4,
      replies: 4
    },
    {
      author: 'Ralph Edwards',
      title: t('community.posts.items.selfDiscoveryAwareness.title'),
      desc: t('community.posts.items.selfDiscoveryAwareness.description'),
      likes: 4,
      replies: 4
    },
    {
      author: 'Ralph Edwards',
      title: t('community.posts.items.intuitionSpiritualGrowth.title'),
      desc: t('community.posts.items.intuitionSpiritualGrowth.description'),
      likes: 4,
      replies: 4
    },
    {
      author: 'Sarah Johnson',
      title: t('community.posts.items.chakraBalancing.title'),
      desc: t('community.posts.items.chakraBalancing.description'),
      likes: 8,
      replies: 6
    },
    {
      author: 'Michael Chen',
      title: t('community.posts.items.spiritualAwakeningJourney.title'),
      desc: t('community.posts.items.spiritualAwakeningJourney.description'),
      likes: 12,
      replies: 9
    },
    {
      author: 'Emma Williams',
      title: t('community.posts.items.dailyMeditationPractices.title'),
      desc: t('community.posts.items.dailyMeditationPractices.description'),
      likes: 6,
      replies: 5
    },
    {
      author: 'David Kumar',
      title: t('community.posts.items.energyWorkAndHealing.title'),
      desc: t('community.posts.items.energyWorkAndHealing.description'),
      likes: 10,
      replies: 7
    },
    {
      author: 'Lisa Anderson',
      title: t('community.posts.items.mindfulLivingGuide.title'),
      desc: t('community.posts.items.mindfulLivingGuide.description'),
      likes: 7,
      replies: 4
    },
    {
      author: 'James Wilson',
      title: t('community.posts.items.spiritualPracticesBeginners.title'),
      desc: t('community.posts.items.spiritualPracticesBeginners.description'),
      likes: 11,
      replies: 8
    },
    {
      author: 'Maria Garcia',
      title: t('community.posts.items.connectingInnerWisdom.title'),
      desc: t('community.posts.items.connectingInnerWisdom.description'),
      likes: 5,
      replies: 3
    },
    {
      author: 'Robert Taylor',
      title: t('community.posts.items.advancedMeditationTechniques.title'),
      desc: t('community.posts.items.advancedMeditationTechniques.description'),
      likes: 9,
      replies: 6
    }
  ];

  // Calculate pagination
  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedPosts = allPosts.slice(startIndex, endIndex);

  return (
    <div className="bg-[#FBFDFF] min-h-screen  ">
      {/* Top Header Section */}
      <div className="container mx-auto px-4 lg:px-6 pt-8 md:pt-12 pb-14 mb:pb-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start border-b border-gray-200 pb-8">
          <div >
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">{t('community.page.title')}</h1>
            <p className="text-gray-600 text-base md:text-lg">{t('community.page.description')}</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="self-start bg-[#E2AB0B] text-white px-5 py-2 rounded-lg text-base transition-all hover:bg-[#D4960A]"
          >
            {t('community.page.shareExperience')}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 mt-10">
          {/* Left Sidebar - Categories */}
          <CategoriesSidebar
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Right Content - Posts List */}
          <div className="w-full lg:w-3/4">
            {/* Top Tabs */}
            <TabFilter
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            {/* Post Cards */}
            <PostsList posts={paginatedPosts} />

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        {/* Ads Section */}
        <CommonAdsSection
          wrapperClassName='mt-16'
          containerClassName='px-0'
          boxClassName='w-full h-44 bg-[#F1F5F9] rounded-xl border border-dashed border-gray-300 flex items-center justify-center group hover:bg-gray-50 transition-colors'
          title={t('community.page.adsTitle')}
          titleClassName='text-xl font-semibold text-gray-600'
        />
      </div>

      {/* Share Experience Modal */}
      <ShareExperienceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
});

CommunityContent.displayName = 'CommunityContent';

export default CommunityContent;