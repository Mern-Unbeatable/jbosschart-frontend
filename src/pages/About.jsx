import React, { memo } from 'react';
import { useSEO } from '../hooks/useSEO';
import AboutContent from '../components/about/AboutContent';

const About = memo(() => {
  useSEO({
    title: 'About Us',
    description: 'Learn more about our mission and values',
    keywords: ['about', 'mission', 'values'],
  });

  return <AboutContent />;
});

About.displayName = 'About';

export default About;
