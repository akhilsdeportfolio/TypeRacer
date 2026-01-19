import React, { createContext, useContext, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useLocalStorageBoolean, useLocalStorage } from '../hooks/useLocalStorage';

// Context
const SettingsContext = createContext(null);

// Provider component
export function SettingsProvider({ children }) {
  // Persisted settings
  const [darkMode, setDarkMode] = useLocalStorageBoolean('typeracer-darkmode', false);
  const [soundEnabled, setSoundEnabled] = useLocalStorageBoolean('typeracer-sound', true);
  const [highScores, setHighScores] = useLocalStorage('typeracer-highscores', {
    EASY: 0,
    MEDIUM: 0,
    HARD: 0,
    EXPERT: 0,
  });

  // Actions
  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev);
  }, [setDarkMode]);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev);
  }, [setSoundEnabled]);

  const updateHighScore = useCallback((difficulty, score) => {
    setHighScores(prev => {
      if (score > (prev[difficulty] || 0)) {
        return { ...prev, [difficulty]: score };
      }
      return prev;
    });
  }, [setHighScores]);

  const value = useMemo(() => ({
    // State
    darkMode,
    soundEnabled,
    highScores,
    // Actions
    setDarkMode,
    setSoundEnabled,
    toggleDarkMode,
    toggleSound,
    updateHighScore,
  }), [darkMode, soundEnabled, highScores, setDarkMode, setSoundEnabled, toggleDarkMode, toggleSound, updateHighScore]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook to consume context
export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}

