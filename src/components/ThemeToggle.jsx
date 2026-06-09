import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme, selectThemeMode } from '../store/slices/themeSlice';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectThemeMode);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <button
      onClick={handleToggle}
      className='p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors'
      aria-label='Toggle theme'
    >
      {theme === 'light' ? (
        <Moon className='w-5 h-5 text-gray-800' />
      ) : (
        <Sun className='w-5 h-5 text-yellow-400' />
      )}
    </button>
  );
};

export default ThemeToggle;
