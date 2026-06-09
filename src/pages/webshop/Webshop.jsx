import React, { memo, useState } from 'react';
import { useSEO } from '../../hooks/useSEO';
import WebshopHero from './sections/WebshopHero';
import WebshopGrid from './sections/WebshopGrid';
import WebshopAds from './sections/WebshopAds';

const Webshop = memo(() => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  useSEO({
    title: 'Webshop',
    description: 'Spiritual products recommended by our expert consultants',
    keywords: ['webshop', 'shop', 'spiritual', 'products'],
  });

  const products = [
    {
      id: 1,
      name: 'Healing Crystal Set',
      description: 'A spiritually chosen set designed to attract positive energy, reduce stress, and balance emotions.',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
      category: 'Spiritual items',
    },
    {
      id: 2,
      name: 'Sacred Incense Pack',
      description: 'Natural incense sticks that help improve meditation, relaxation, and cleanse the air around you.',
      price: 32.50,
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=500&fit=crop',
      category: 'Healing tools',
    },
    {
      id: 3,
      name: 'Tarot Guidance Deck',
      description: 'A complete tarot card deck for self-discovery, spiritual routing, and intuitive guidance.',
      price: 24.00,
      image: 'https://images.unsplash.com/photo-1516534775068-bb57314c3b59?w=500&h=500&fit=crop',
      category: 'Spiritual items',
    },
    {
      id: 4,
      name: 'Wooden Massage Roller',
      description: 'A natural wooden tool designed to relieve body pain and relax tight muscles effectively.',
      price: 18.00,
      image: 'https://images.unsplash.com/photo-1599639957043-966b6b4fdd36?w=500&h=500&fit=crop',
      category: 'Healing tools',
    },
    {
      id: 5,
      name: 'Tibetan Singing Bowl',
      description: 'A traditional sound healing bowl used for deeper meditation practice and wellness.',
      price: 15.00,
      image: 'https://images.unsplash.com/photo-1599927921358-c4b6b1c31a59?w=500&h=500&fit=crop',
      category: 'Healing tools',
    },
    {
      id: 6,
      name: 'Natural Healing Oil',
      description: 'Herbal essential oil formulated to improve meditation, relaxation, and natural body healing.',
      price: 15.99,
      image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&h=500&fit=crop',
      category: 'Healing tools',
    },
    {
      id: 7,
      name: 'The Power of Mind',
      description: 'A spiritual guidebook focused on manifesting inner peace, achieving inner peace, and horoscopes.',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=500&h=500&fit=crop',
      category: 'Books',
    },
    {
      id: 8,
      name: 'Astrology Basics Guide',
      description: 'A beginner-friendly guide to understanding zodiac signs, astrology, and horoscopes.',
      price: 14.50,
      image: 'https://images.unsplash.com/photo-1518611505868-d2b91c38f3a8?w=500&h=500&fit=crop',
      category: 'Articles',
    },
  ];

  return (
    <div className='min-h-screen bg-[#FBFDFF]  pt-8 md:pt-12 pb-14 mb:pb-20'>
      <WebshopHero selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
      <WebshopGrid products={products} selectedCategory={selectedCategory} />
      <WebshopAds />
    </div>
  );
});

Webshop.displayName = 'Webshop';

export default Webshop;