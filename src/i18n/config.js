import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslations from '../locales/en.json';
import nlTranslations from '../locales/nl.json';

// Get initial language from localStorage or default to 'en'
const getInitialLanguage = () => {
  try {
    return localStorage.getItem('language') || 'en';
  } catch {
    return 'en';
  }
};

const resources = {
  en: {
    translation: enTranslations,
  },
  nl: {
    translation: nlTranslations,
  },
};

i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    resources,
    lng: getInitialLanguage(), // Set initial language from localStorage
    fallbackLng: 'en', // Fallback language if translation is missing
    
    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    detection: {
      // Order of language detection methods
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'language',
    },

    react: {
      useSuspense: false, // Disable suspense for now to avoid loading issues
    },
  });

// Sync i18n language changes to localStorage
i18n.on('languageChanged', (lng) => {
  try {
    localStorage.setItem('language', lng);
  } catch (error) {
    console.error('Failed to save language to localStorage:', error);
  }
});

export default i18n;
