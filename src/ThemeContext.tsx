import React, { createContext, useState, useMemo } from 'react';
import { ThemeProvider } from '@emotion/react';
import { darkTheme, lightTheme } from './config/styles/themes/Theme';

interface IThemeContext {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const ThemeContext = createContext<IThemeContext>({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function AppThemeProvider({ children }: ThemeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = useMemo(() => (isDarkMode ? darkTheme : lightTheme), [isDarkMode]);

  const contextValue = useMemo(() => ({ isDarkMode, toggleDarkMode }), [isDarkMode, toggleDarkMode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}
