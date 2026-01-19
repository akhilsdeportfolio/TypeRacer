/**
 * @fileoverview Type definitions using JSDoc for TypeScript compatibility
 * 
 * These types provide:
 * 1. Better IDE intellisense
 * 2. Documentation
 * 3. Easy migration path to TypeScript
 * 
 * To enable TypeScript checking in VS Code without converting to .ts:
 * Add // @ts-check at the top of any .js file
 */

/**
 * @typedef {'EASY' | 'MEDIUM' | 'HARD' | 'EXPERT'} Difficulty
 */

/**
 * @typedef {'INITIAL' | 'PLAYING' | 'FINISHED'} GameStatus
 */

/**
 * @typedef {'CLASSIC' | 'ZEN' | 'RUSH' | 'MARATHON' | 'QUOTE' | 'CODE' | 'CUSTOM'} GameModeId
 */

/**
 * @typedef {Object} DifficultyConfig
 * @property {string} name - Display name
 * @property {number} time - Allowed time in seconds
 * @property {string} color - Theme color
 * @property {string} description - Description text
 */

/**
 * @typedef {Object} GameStats
 * @property {number} totalChars - Total characters typed
 * @property {number} correctChars - Correctly typed characters
 * @property {number} accuracy - Accuracy percentage (0-100)
 * @property {number} wpm - Words per minute
 * @property {boolean} isComplete - Whether the text is fully typed
 * @property {number} progress - Progress percentage (0-100)
 * @property {number} timeElapsed - Time elapsed in milliseconds
 */

/**
 * @typedef {Object} GameState
 * @property {GameStatus} gameStatus - Current game status
 * @property {Difficulty} difficulty - Current difficulty level
 * @property {string} targetText - Text to be typed
 * @property {string} userInput - User's current input
 * @property {number|null} startTime - Game start timestamp
 * @property {number} timeLeft - Remaining time in seconds
 * @property {number} streak - Current correct character streak
 * @property {number} maxStreak - Maximum streak achieved
 */

/**
 * @typedef {Object} HighScores
 * @property {number} EASY - High score for easy mode
 * @property {number} MEDIUM - High score for medium mode
 * @property {number} HARD - High score for hard mode
 * @property {number} EXPERT - High score for expert mode
 */

/**
 * @typedef {Object} Settings
 * @property {boolean} darkMode - Dark mode enabled
 * @property {boolean} soundEnabled - Sound effects enabled
 * @property {HighScores} highScores - High scores by difficulty
 */

/**
 * @typedef {Object} Theme
 * @property {string} id - Theme identifier
 * @property {string} name - Display name
 * @property {string} primary - Primary color
 * @property {string} secondary - Secondary color
 * @property {string} success - Success color
 * @property {string} error - Error color
 * @property {string} warning - Warning color
 */

/**
 * @typedef {Object} GameMode
 * @property {GameModeId} id - Mode identifier
 * @property {string} name - Display name
 * @property {string} description - Mode description
 * @property {string} icon - Emoji icon
 * @property {boolean} hasTimer - Whether mode has timer
 * @property {boolean} hasDifficulty - Whether mode has difficulty levels
 * @property {number} [fixedTime] - Fixed time for modes without difficulty
 */

/**
 * @typedef {Object} Achievement
 * @property {string} id - Achievement identifier
 * @property {string} name - Display name
 * @property {string} description - Achievement description
 * @property {string} icon - Emoji icon
 * @property {Object} requirement - Requirement to unlock
 * @property {string} requirement.type - Type of requirement
 * @property {number|string} requirement.value - Value to achieve
 */

/**
 * @typedef {'correct' | 'incorrect' | 'pending'} CharacterStatus
 */

/**
 * @typedef {Object} CharacterData
 * @property {string} char - The character
 * @property {CharacterStatus} status - Character status
 * @property {boolean} isCursor - Whether this is the cursor position
 */

// Export empty object to make this a module
export {};

