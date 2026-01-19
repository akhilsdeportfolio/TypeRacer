/**
 * Utility Functions - Barrel Export
 * 
 * Centralized export for all utility functions
 */

// Calculation utilities
export {
  calculateWPM,
  calculateAccuracy,
  calculateProgress,
  countCorrectChars,
  isCharCorrect,
  getCharStatus,
} from './calculations';

// Storage utilities
export {
  getStorageItem,
  setStorageItem,
  getStorageJSON,
  setStorageJSON,
  getDarkMode,
  setDarkMode,
  getSoundEnabled,
  setSoundEnabled,
  getHighScores,
  setHighScores,
  updateHighScore,
} from './storage';

// Audio utilities
export {
  playSound,
  playCorrectSound,
  playIncorrectSound,
  playCompleteSound,
} from './audio';

