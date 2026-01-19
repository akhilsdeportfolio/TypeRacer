/**
 * Storage Service - Centralized localStorage management
 */

const PREFIX = 'typinghub-';

export const storage = {
  /**
   * Get item from localStorage with optional default
   */
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(PREFIX + key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Error reading ${key} from storage:`, error);
      return defaultValue;
    }
  },

  /**
   * Set item in localStorage
   */
  set(key, value) {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn(`Error writing ${key} to storage:`, error);
      return false;
    }
  },

  /**
   * Remove item from localStorage
   */
  remove(key) {
    try {
      localStorage.removeItem(PREFIX + key);
      return true;
    } catch (error) {
      console.warn(`Error removing ${key} from storage:`, error);
      return false;
    }
  },

  /**
   * Clear all app data from localStorage
   */
  clear() {
    try {
      Object.keys(localStorage)
        .filter(key => key.startsWith(PREFIX))
        .forEach(key => localStorage.removeItem(key));
      return true;
    } catch (error) {
      console.warn('Error clearing storage:', error);
      return false;
    }
  },

  /**
   * Get storage usage info
   */
  getUsage() {
    let total = 0;
    Object.keys(localStorage)
      .filter(key => key.startsWith(PREFIX))
      .forEach(key => {
        total += localStorage.getItem(key).length;
      });
    return {
      bytes: total,
      kb: (total / 1024).toFixed(2),
      mb: (total / 1024 / 1024).toFixed(4),
    };
  },
};

// Storage keys
export const STORAGE_KEYS = {
  SETTINGS: 'settings',
  HIGH_SCORES: 'high-scores',
  GAME_HISTORY: 'game-history',
  ACHIEVEMENTS: 'achievements',
  DAILY_STATS: 'daily-stats',
  LESSONS_PROGRESS: 'lessons-progress',
  USER_PROFILE: 'user-profile',
  THEME: 'theme',
};

export default storage;

