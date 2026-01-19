/**
 * LocalStorage utility functions with error handling
 */

const STORAGE_KEYS = {
  DARK_MODE: 'typeracer-darkmode',
  SOUND_ENABLED: 'typeracer-sound',
  HIGH_SCORES: 'typeracer-highscores',
};

/**
 * Safely get item from localStorage
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {*} Stored value or default
 */
export const getStorageItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item !== null ? item : defaultValue;
  } catch (error) {
    console.warn(`Error reading from localStorage: ${error.message}`);
    return defaultValue;
  }
};

/**
 * Safely set item in localStorage
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 * @returns {boolean} Success status
 */
export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.warn(`Error writing to localStorage: ${error.message}`);
    return false;
  }
};

/**
 * Safely get JSON from localStorage
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if key doesn't exist or parsing fails
 * @returns {*} Parsed JSON or default
 */
export const getStorageJSON = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item !== null ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error parsing JSON from localStorage: ${error.message}`);
    return defaultValue;
  }
};

/**
 * Safely set JSON in localStorage
 * @param {string} key - Storage key
 * @param {*} value - Value to stringify and store
 * @returns {boolean} Success status
 */
export const setStorageJSON = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`Error stringifying JSON to localStorage: ${error.message}`);
    return false;
  }
};

/**
 * Get dark mode preference
 * @returns {boolean} Dark mode enabled
 */
export const getDarkMode = () => {
  return getStorageItem(STORAGE_KEYS.DARK_MODE) === 'true';
};

/**
 * Set dark mode preference
 * @param {boolean} enabled - Dark mode enabled
 */
export const setDarkMode = (enabled) => {
  setStorageItem(STORAGE_KEYS.DARK_MODE, String(enabled));
};

/**
 * Get sound enabled preference
 * @returns {boolean} Sound enabled
 */
export const getSoundEnabled = () => {
  const value = getStorageItem(STORAGE_KEYS.SOUND_ENABLED);
  return value !== 'false'; // Default to true
};

/**
 * Set sound enabled preference
 * @param {boolean} enabled - Sound enabled
 */
export const setSoundEnabled = (enabled) => {
  setStorageItem(STORAGE_KEYS.SOUND_ENABLED, String(enabled));
};

/**
 * Get high scores
 * @returns {Object} High scores by difficulty
 */
export const getHighScores = () => {
  return getStorageJSON(STORAGE_KEYS.HIGH_SCORES, {
    EASY: 0,
    MEDIUM: 0,
    HARD: 0,
    EXPERT: 0,
  });
};

/**
 * Set high scores
 * @param {Object} scores - High scores object
 */
export const setHighScores = (scores) => {
  setStorageJSON(STORAGE_KEYS.HIGH_SCORES, scores);
};

/**
 * Update high score for specific difficulty
 * @param {string} difficulty - Difficulty level
 * @param {number} score - New score
 * @returns {boolean} True if new high score
 */
export const updateHighScore = (difficulty, score) => {
  const scores = getHighScores();
  const isNewRecord = score > scores[difficulty];
  
  if (isNewRecord) {
    scores[difficulty] = score;
    setHighScores(scores);
  }
  
  return isNewRecord;
};

export { STORAGE_KEYS };

