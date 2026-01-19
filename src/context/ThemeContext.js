import React, { createContext, useContext, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { THEMES } from '../constants';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Context
const ThemeContext = createContext(null);

// Apply theme CSS variables to document
function applyTheme(theme, darkMode) {
  const root = document.documentElement;
  
  root.style.setProperty('--theme-primary', theme.primary);
  root.style.setProperty('--theme-secondary', theme.secondary);
  root.style.setProperty('--theme-success', theme.success);
  root.style.setProperty('--theme-error', theme.error);
  root.style.setProperty('--theme-warning', theme.warning);
  
  if (darkMode) {
    root.classList.add('dark-mode');
  } else {
    root.classList.remove('dark-mode');
  }
}

// Provider component
export function ThemeProvider({ children, darkMode = false }) {
  const [themeId, setThemeId] = useLocalStorage('typeracer-theme', 'DEFAULT');
  
  const theme = useMemo(() => THEMES[themeId] || THEMES.DEFAULT, [themeId]);

  // Apply theme on mount and changes
  useEffect(() => {
    applyTheme(theme, darkMode);
  }, [theme, darkMode]);

  const value = useMemo(() => ({
    theme,
    themeId,
    themes: THEMES,
    setTheme: setThemeId,
  }), [theme, themeId, setThemeId]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  darkMode: PropTypes.bool,
};

// Hook to consume context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

