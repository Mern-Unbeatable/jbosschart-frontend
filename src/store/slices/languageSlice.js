import { createSlice } from '@reduxjs/toolkit';

const SUPPORTED_LANGUAGES = {
  en: { code: 'en', name: 'English',  },
  nl: { code: 'nl', name: 'Nederlands',  },
};

const loadLanguageState = () => {
  try {
    const savedLang = localStorage.getItem('language');
    return savedLang && SUPPORTED_LANGUAGES[savedLang]
      ? savedLang
      : 'en';
  } catch {
    return 'en';
  }
};

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    current: loadLanguageState(),
    supported: SUPPORTED_LANGUAGES,
  },
  reducers: {
    setLanguage: (state, action) => {
      const lang = action.payload;
      if (SUPPORTED_LANGUAGES[lang]) {
        state.current = lang;
        // Note: localStorage sync is handled by i18n config
        // i18next.changeLanguage should be called in the component
      }
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;

export const selectCurrentLanguage = (state) => state.language.current;
export const selectSupportedLanguages = (state) => state.language.supported;
export const selectCurrentLanguageData = (state) =>
  state.language.supported[state.language.current];
