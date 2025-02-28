'use client';

import { ReactNode, useEffect, useState } from 'react';
import { ThemeContext, ThemeUpdateContext } from './ThemeContext';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [darkTheme, setDarkTheme] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('darkTheme');
      if (storedTheme) {
        setDarkTheme(JSON.parse(storedTheme));
      }
    }
  }, []);

  const toggleTheme = () => {
    setDarkTheme(prev => {
      const newTheme = !prev;
      localStorage.setItem('darkTheme', JSON.stringify(newTheme));
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={darkTheme}>
      <ThemeUpdateContext.Provider value={toggleTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
}
