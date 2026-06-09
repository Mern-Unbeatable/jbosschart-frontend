import React, { memo } from 'react';
import { useSEO } from '../hooks/useSEO';
import ServicesContent from '../components/services/ServicesContent';

const Services = memo(() => {
  useSEO({
    title: 'Our Services',
    description: 'Explore our professional services',
    keywords: ['services', 'web development', 'mobile', 'design', 'consulting'],
  });

  return <ServicesContent />;
});

Services.displayName = 'Services';

export default Services;
