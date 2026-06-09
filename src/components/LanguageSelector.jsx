import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import {
  setLanguage,
  selectCurrentLanguage,
  selectSupportedLanguages,
} from '../store/slices/languageSlice';

const LanguageSelector = () => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const currentLang = useSelector(selectCurrentLanguage);
  const supportedLangs = useSelector(selectSupportedLanguages);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Sync Redux state with i18next on mount
  useEffect(() => {
    if (i18n.language !== currentLang) {

      i18n.changeLanguage(currentLang).then(() => {
      }).catch(err => console.error('[LanguageSelector] i18n.changeLanguage error:', err));
    }
  }, [currentLang, i18n]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleLanguageChange = async (langCode) => {
    try {
      // 1. Update Redux state
      dispatch(setLanguage(langCode));

      // 2. Update i18next language (this also updates localStorage)
      await i18n.changeLanguage(langCode);

      setIsOpen(false);
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  const currentLanguage = supportedLangs[currentLang];

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        aria-label='Select language'
        aria-expanded={isOpen}
        className='flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-purple-600 hover:bg-gray-50 rounded-md transition-all'
      >
        <Globe size={18} aria-hidden='true' />
        <span className='hidden sm:inline'>{currentLanguage?.flag}</span>
        <span className='hidden md:inline'>{currentLanguage?.code.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className='absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200'>
          {Object.values(supportedLangs).map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 transition-colors ${currentLang === lang.code
                ? 'bg-purple-50 text-purple-700 font-semibold'
                : 'text-gray-700 hover:bg-gray-50'
                }`}
            >
              <span className='text-lg'>{lang.flag}</span>
              <span>{lang.name}</span>
              {currentLang === lang.code && (
                <span className='ml-auto text-purple-600'>✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
