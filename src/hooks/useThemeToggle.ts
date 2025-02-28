import { useEffect } from 'react';
import { useTheme } from '../ThemeContext';

export const useThemeToggle = () => {
  const darkTheme = useTheme();

  useEffect(() => {
    document.body.classList.toggle('dark', darkTheme);
    document.body.classList.toggle('light', !darkTheme);
  }, [darkTheme]);
};
