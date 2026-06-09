import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import i18n from '../i18n/config';
import authReducer, {
  loginSuccess,
  loginUser,
  logout,
  logoutUser,
  updateUser,
} from './slices/authSlice';
import themeReducer, {
  toggleTheme,
  setTheme,
  setPrimaryColor,
} from './slices/themeSlice';
import cartReducer from './slices/cartSlice';
import languageReducer, { setLanguage } from './slices/languageSlice';

const applyPrimaryColor = (color) => {
  document.documentElement.style.setProperty('--color-primary', color);
};

const listener = createListenerMiddleware();
const COOKIE_OPTIONS = {
  sameSite: 'Lax',
  secure: window.location.protocol === 'https:',
  expires: 7,
};

// Auth persistence
listener.startListening({
  actionCreator: loginSuccess,
  effect: (action, api) => {
    const { token, user, refreshToken } = api.getState().auth;
    if (token) {
      Cookies.set('token', token, COOKIE_OPTIONS);
    }
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    if (refreshToken) {
      Cookies.set('refreshToken', refreshToken, COOKIE_OPTIONS);
    }
  },
});

listener.startListening({
  actionCreator: loginUser.fulfilled,
  effect: (action, api) => {
    const { token, user, refreshToken } = api.getState().auth;
    if (token) {
      Cookies.set('token', token, COOKIE_OPTIONS);
    }
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    if (refreshToken) {
      Cookies.set('refreshToken', refreshToken, COOKIE_OPTIONS);
    }
  },
});

listener.startListening({
  actionCreator: logout,
  effect: () => {
    Cookies.remove('token');
    localStorage.removeItem('user');
    Cookies.remove('refreshToken');
  },
});

listener.startListening({
  actionCreator: logoutUser.fulfilled,
  effect: () => {
    Cookies.remove('token');
    localStorage.removeItem('user');
    Cookies.remove('refreshToken');
  },
});

listener.startListening({
  actionCreator: logoutUser.rejected,
  effect: () => {
    Cookies.remove('token');
    localStorage.removeItem('user');
    Cookies.remove('refreshToken');
  },
});

listener.startListening({
  actionCreator: updateUser,
  effect: (action, api) => {
    localStorage.setItem('user', JSON.stringify(api.getState().auth.user));
  },
});

// Theme persistence + DOM sync
listener.startListening({
  actionCreator: toggleTheme,
  effect: (action, api) => {
    const { mode } = api.getState().theme;
    localStorage.setItem('theme', mode);
    document.documentElement.classList.toggle('dark', mode === 'dark');
  },
});

listener.startListening({
  actionCreator: setTheme,
  effect: (action) => {
    const mode = action.payload;
    localStorage.setItem('theme', mode);
    document.documentElement.classList.toggle('dark', mode === 'dark');
  },
});

// Primary color CSS variable sync
listener.startListening({
  actionCreator: setPrimaryColor,
  effect: (action) => {
    applyPrimaryColor(action.payload);
  },
});

// Language sync with i18next
listener.startListening({
  actionCreator: setLanguage,
  effect: (action) => {
    const language = action.payload;
    // Sync with i18next (which handles localStorage)
    i18n.changeLanguage(language);
  },
});

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    cart: cartReducer,
    language: languageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listener.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// Apply initial primary color on store creation
applyPrimaryColor(store.getState().theme.primaryColor);

export default store;
