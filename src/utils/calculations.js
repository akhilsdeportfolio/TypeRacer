/**
 * Utility functions for game calculations
 */

/**
 * Calculate Words Per Minute (WPM)
 * @param {number} correctChars - Number of correctly typed characters
 * @param {number} timeElapsedMs - Time elapsed in milliseconds
 * @returns {number} WPM rounded to nearest integer
 */
export const calculateWPM = (correctChars, timeElapsedMs) => {
  const timeInMinutes = timeElapsedMs / 1000 / 60;
  if (timeInMinutes <= 0) return 0;
  
  const wordsTyped = correctChars / 5; // Standard: 5 characters = 1 word
  return Math.round(wordsTyped / timeInMinutes);
};

/**
 * Calculate typing accuracy percentage
 * @param {number} correctChars - Number of correctly typed characters
 * @param {number} totalChars - Total number of typed characters
 * @returns {number} Accuracy percentage rounded to nearest integer
 */
export const calculateAccuracy = (correctChars, totalChars) => {
  if (totalChars <= 0) return 0;
  return Math.round((correctChars / totalChars) * 100);
};

/**
 * Calculate progress percentage
 * @param {number} currentLength - Current input length
 * @param {number} targetLength - Target paragraph length
 * @returns {number} Progress percentage rounded to nearest integer
 */
export const calculateProgress = (currentLength, targetLength) => {
  if (targetLength <= 0) return 0;
  return Math.round((currentLength / targetLength) * 100);
};

/**
 * Count correct characters in user input
 * @param {string} userInput - User's typed input
 * @param {string} targetText - Target text to compare against
 * @returns {number} Number of correct characters
 */
export const countCorrectChars = (userInput, targetText) => {
  return userInput.split("").filter((char, i) => char === targetText[i]).length;
};

/**
 * Check if character at position is correct
 * @param {string} userInput - User's typed input
 * @param {string} targetText - Target text to compare against
 * @param {number} index - Character index to check
 * @returns {boolean} True if character is correct
 */
export const isCharCorrect = (userInput, targetText, index) => {
  return userInput[index] === targetText[index];
};

/**
 * Get character status for styling
 * @param {string} userInput - User's typed input
 * @param {string} targetText - Target text to compare against
 * @param {number} index - Character index
 * @returns {'correct'|'incorrect'|'pending'} Character status
 */
export const getCharStatus = (userInput, targetText, index) => {
  if (index >= userInput.length) return 'pending';
  return userInput[index] === targetText[index] ? 'correct' : 'incorrect';
};

// test
