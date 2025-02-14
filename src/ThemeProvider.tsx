import { ReactNode, useState } from 'react';
import { ThemeContext, ThemeUpdateContext } from './themeContext';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [darkTheme, setDarkTheme] = useState<boolean>(
    JSON.parse(localStorage.getItem('darkTheme') || 'false')
  );

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
