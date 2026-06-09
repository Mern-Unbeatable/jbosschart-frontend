import { useEffect } from 'react';
import { generateMetadata, updateMetaTags } from '../utils/seo';

export const useSEO = ({
  title,
  description,
  keywords = [],
  image = '',
  type = 'website',
  locale = 'en',
}) => {
  // Create a stable string representation of keywords for the dependency array
  const keywordsKey = keywords.join(',');

  useEffect(() => {
    const metadata = generateMetadata({
      title,
      description,
      keywords,
      image,
      type,
      locale,
    });

    updateMetaTags(metadata);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, keywordsKey, image, type, locale]);
};
