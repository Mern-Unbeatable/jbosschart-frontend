# i18n Integration Guide

## Overview
This project uses **i18next** with **React** and **Redux** for internationalization. The setup provides seamless language switching with instant UI updates, localStorage persistence, and full synchronization between Redux state and i18next.

---

## 📁 File Structure

```
src/
├── i18n/
│   └── config.js              # i18next configuration
├── locales/
│   ├── en.json                # English translations
│   └── nl.json                # Dutch translations
├── store/
│   └── slices/
│       └── languageSlice.js   # Redux language state management
├── components/
│   └── LanguageSelector.jsx   # Language toggle component
```

---

## 🎯 How It Works

### 1. **Initialization Flow**

1. **App starts** → `index.jsx` imports `i18n/config.js`
2. **i18n initializes** with language from `localStorage` (default: 'en')
3. **Redux store** loads the same language from `localStorage`
4. Both systems are now **synchronized**

### 2. **Language Change Flow**

When user clicks language selector:

1. **LanguageSelector** dispatches `setLanguage(langCode)` to Redux
2. **Redux listener** (in `store.js`) calls `i18n.changeLanguage(langCode)`
3. **i18next** updates the language and saves to `localStorage`
4. **UI re-renders** instantly with new translations

### 3. **Persistence**

- Language preference is saved in `localStorage` with key `'language'`
- On app reload, both Redux and i18next load from `localStorage`
- No language mismatch possible

---

## 🔧 Configuration

### i18n Configuration (`src/i18n/config.js`)

```javascript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,               // Translation files
    lng: getInitialLanguage(), // From localStorage
    fallbackLng: 'en',      // Default language
    interpolation: {
      escapeValue: false,   // React already escapes
    },
  });
```

### Redux Integration (`src/store/store.js`)

```javascript
// Language sync with i18next
listener.startListening({
  actionCreator: setLanguage,
  effect: (action) => {
    i18n.changeLanguage(action.payload);
  },
});
```

---

## 📝 Usage in Components

### Basic Usage

```javascript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('common.welcome')}</h1>
      <p>{t('dashboard.user.subtitle')}</p>
    </div>
  );
}
```

### With Interpolation

```javascript
const { t } = useTranslation();
const user = { name: 'John' };

return <h1>{t('dashboard.user.welcome', { name: user.name })}</h1>;
// Output: "Welcome back, John!"
```

### Dynamic Lists

```javascript
const NAV_LINKS = [
  { to: '/home', labelKey: 'common.home' },
  { to: '/about', labelKey: 'common.about' },
];

return (
  <nav>
    {NAV_LINKS.map(({ to, labelKey }) => (
      <Link key={to} to={to}>{t(labelKey)}</Link>
    ))}
  </nav>
);
```

---

## 🌍 Adding a New Language

### Step 1: Create Translation File

Create `src/locales/de.json`:

```json
{
  "common": {
    "home": "Startseite",
    "welcome": "Willkommen"
  }
}
```

### Step 2: Update i18n Config

In `src/i18n/config.js`:

```javascript
import deTranslations from '../locales/de.json';

const resources = {
  en: { translation: enTranslations },
  nl: { translation: nlTranslations },
  de: { translation: deTranslations }, // Add this
};
```

### Step 3: Update Language Slice

In `src/store/slices/languageSlice.js`:

```javascript
const SUPPORTED_LANGUAGES = {
  en: { code: 'en', name: 'English', flag: '🇺🇸' },
  nl: { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  de: { code: 'de', name: 'Deutsch', flag: '🇩🇪' }, // Add this
};
```

---

## 🎨 Translation File Structure

### Naming Conventions

```json
{
  "common": {                    // Shared across app
    "home": "Home",
    "signIn": "Sign In"
  },
  "dashboard": {
    "user": {                    // User-specific
      "welcome": "Welcome, {{name}}!",
      "stats": {
        "totalOrders": "Total Orders"
      }
    }
  },
  "errors": {                    // Error messages
    "notFound": "Page not found"
  }
}
```

### Best Practices

1. **Nested structure** for organization
2. **Meaningful keys** (not just numbers)
3. **Interpolation** for dynamic content: `{{variable}}`
4. **Consistent naming** across all language files

---

## 🔍 Debugging

### Check Current Language

```javascript
import { useTranslation } from 'react-i18next';

const { i18n } = useTranslation();
console.log('Current language:', i18n.language);
```

### Check Redux State

```javascript
import { useSelector } from 'react-redux';
import { selectCurrentLanguage } from './store/slices/languageSlice';

const currentLang = useSelector(selectCurrentLanguage);
console.log('Redux language:', currentLang);
```

### Force Language Change

```javascript
const { i18n } = useTranslation();
i18n.changeLanguage('nl'); // Changes to Dutch
```

---

## ⚡ Features

### ✅ Implemented

- [x] Redux + i18next full synchronization
- [x] localStorage persistence
- [x] Instant UI updates (no page reload)
- [x] Language detection from localStorage
- [x] Fallback language (English)
- [x] Language selector component
- [x] 2 languages: EN, NL
- [x] Interpolation support
- [x] Nested translation keys

### 🚀 Future Enhancements

- [ ] RTL (Right-to-Left) support
- [ ] Pluralization
- [ ] Date/number formatting
- [ ] Lazy loading translations
- [ ] Translation missing detection

---

## 📦 Dependencies

```json
{
  "i18next": "^23.x.x",
  "react-i18next": "^14.x.x",
  "i18next-browser-languagedetector": "^7.x.x"
}
```

---

## 🐛 Troubleshooting

### Issue: Language doesn't change

**Solution:** Check if both Redux and i18next are updated

```javascript
// In LanguageSelector.jsx
const handleLanguageChange = async (langCode) => {
  dispatch(setLanguage(langCode));  // Update Redux
  await i18n.changeLanguage(langCode); // Update i18next
};
```

### Issue: Translations not found

**Solution:** Check the translation key path

```javascript
// ❌ Wrong
t('welcome')

// ✅ Correct
t('common.welcome')
```

### Issue: localStorage not saving

**Solution:** Check browser privacy settings or use fallback:

```javascript
try {
  localStorage.setItem('language', lang);
} catch (error) {
  console.error('localStorage not available');
}
```

---

## 📚 Resources

- [i18next Documentation](https://www.i18next.com/)
- [react-i18next Documentation](https://react.i18next.com/)
- [Redux Toolkit Listeners](https://redux-toolkit.js.org/api/createListenerMiddleware)

---

## 🎓 Examples

### Example 1: User Dashboard

```javascript
import { useTranslation } from 'react-i18next';

function UserDashboard() {
  const { t } = useTranslation();
  const user = useSelector(selectUser);
  
  return (
    <div>
      <h1>{t('dashboard.user.welcome', { name: user.name })}</h1>
      <p>{t('dashboard.user.subtitle')}</p>
    </div>
  );
}
```

### Example 2: Navigation

```javascript
const NAV_LINKS = [
  { to: '/', labelKey: 'common.home' },
  { to: '/blog', labelKey: 'common.blog' },
];

function Navbar() {
  const { t } = useTranslation();
  
  return (
    <nav>
      {NAV_LINKS.map(({ to, labelKey }) => (
        <NavLink key={to} to={to}>
          {t(labelKey)}
        </NavLink>
      ))}
    </nav>
  );
}
```

---

**Happy Translating! 🌍**
