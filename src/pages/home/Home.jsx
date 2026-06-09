import React, { memo } from 'react';
import { useSEO } from '../../hooks/useSEO';
import HomeContent from './sections/HomeContent';

const Home = memo(() => {
  useSEO({
    title: '',
    description: 'Welcome to our React application',
    keywords: ['react', 'webpack', 'tailwind', 'router'],
  });

  return <HomeContent />;
});

Home.displayName = 'Home';

export default Home;
