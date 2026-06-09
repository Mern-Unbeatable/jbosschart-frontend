
import { configureStore } from '@reduxjs/toolkit';
import authReducer, { setCredentials } from './slices/authSlice';
import languageReducer from './slices/languageSlice';
import themeReducer from './slices/themeSlice';
import { baseApi } from './baseApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    language: languageReducer,
    theme: themeReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

const initializeAuth = () => {
  const storedAuth = localStorage.getItem('auth');
  if (storedAuth) {
    try {
      const { user, token } = JSON.parse(storedAuth);
      if (user && token) {
        store.dispatch(setCredentials({ user, token }));
      }
    } catch (error) {
      console.error('Failed to restore auth state:', error);
      localStorage.removeItem('auth');
    }
  }
};

initializeAuth();

export default store;