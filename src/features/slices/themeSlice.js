import { createSlice } from '@reduxjs/toolkit';

const getSavedTheme = () => {
  try {
    return localStorage.getItem('theme') || 'light';
  } catch {
    return 'light';
  }
};

const initialState = {
  mode: getSavedTheme(),
  primaryColor: '#3B82F6',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },

    setTheme: (state, action) => {
      state.mode = action.payload;
    },

    setPrimaryColor: (state, action) => {
      state.primaryColor = action.payload;
    },
  },
});

export const { toggleTheme, setTheme, setPrimaryColor } = themeSlice.actions;
export default themeSlice.reducer;

export const selectThemeMode = (state) => state.theme.mode;
export const selectPrimaryColor = (state) => state.theme.primaryColor;
