import { SEO_CONFIG } from '../config';

export const generateMetadata = ({
  title,
  description,
  keywords = [],
  url = '',
  image = '',
  type = 'website',
  locale = 'en',
}) => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const fullUrl =
    url || (typeof window !== 'undefined' ? window.location.href : baseUrl);
  const siteName = SEO_CONFIG.DEFAULT_TITLE;

  return {
    title: title ? `${title} | ${siteName}` : siteName,
    description,
    keywords: keywords.join(', '),
    canonical: fullUrl,
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName,
      images: image ? [{ url: image }] : [],
      locale,
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : [],
    },
  };
};

export const generateStructuredData = (type, data) => {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
  };

  return JSON.stringify({ ...baseData, ...data });
};

export const updateMetaTags = (metadata) => {
  if (typeof document === 'undefined') return;

  document.title = metadata.title;

  const metaTags = [
    { name: 'description', content: metadata.description },
    { name: 'keywords', content: metadata.keywords },
    { property: 'og:title', content: metadata.openGraph.title },
    { property: 'og:description', content: metadata.openGraph.description },
    { property: 'og:url', content: metadata.openGraph.url },
    { property: 'og:site_name', content: metadata.openGraph.siteName },
    { property: 'og:locale', content: metadata.openGraph.locale },
    { property: 'og:type', content: metadata.openGraph.type },
    { name: 'twitter:card', content: metadata.twitter.card },
    { name: 'twitter:title', content: metadata.twitter.title },
    { name: 'twitter:description', content: metadata.twitter.description },
  ];

  if (metadata.openGraph.images.length > 0) {
    metaTags.push({
      property: 'og:image',
      content: metadata.openGraph.images[0].url,
    });
  }

  if (metadata.twitter.images.length > 0) {
    metaTags.push({
      name: 'twitter:image',
      content: metadata.twitter.images[0],
    });
  }

  metaTags.forEach(({ name, property, content }) => {
    if (!content) return;

    const selector = name
      ? `meta[name="${name}"]`
      : `meta[property="${property}"]`;
    let element = document.querySelector(selector);

    if (!element) {
      element = document.createElement('meta');
      if (name) element.setAttribute('name', name);
      if (property) element.setAttribute('property', property);
      document.head.appendChild(element);
    }

    element.setAttribute('content', content);
  });

  const canonicalLink =
    document.querySelector('link[rel="canonical"]') ||
    document.createElement('link');
  canonicalLink.setAttribute('rel', 'canonical');
  canonicalLink.setAttribute('href', metadata.canonical);
  if (!document.querySelector('link[rel="canonical"]')) {
    document.head.appendChild(canonicalLink);
  }
};

export const createBreadcrumbStructuredData = (breadcrumbs) => {
  const itemListElement = breadcrumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: crumb.url,
  }));

  return generateStructuredData('BreadcrumbList', { itemListElement });
};
