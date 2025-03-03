'use client';

import { createContext, useContext } from 'react';

export const ThemeContext = createContext<boolean>(false);
export const ThemeUpdateContext = createContext<() => void>(() => {});

export function useTheme() {
  return useContext(ThemeContext);
}

export function useThemeUpdate() {
  return useContext(ThemeUpdateContext);
}
