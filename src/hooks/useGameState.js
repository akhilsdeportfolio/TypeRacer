import { useReducer, useMemo, useCallback, useRef } from 'react';
import { GAME_STATUS } from '../constants';
import {
  calculateWPM,
  calculateAccuracy,
  calculateProgress,
  countCorrectChars
} from '../utils/calculations';

/**
 * Action types for game state reducer
 * Using constants prevents typos and enables better tooling
 */
const GAME_ACTIONS = {
  START: 'GAME/START',
  INPUT: 'GAME/INPUT',
  FINISH: 'GAME/FINISH',
  RESET: 'GAME/RESET',
};

/**
 * Initial state factory
 * @returns {Object} Initial game state
 */
const createInitialState = () => ({
  gameStatus: GAME_STATUS.INITIAL,
  userInput: '',
  startTime: null,
  streak: 0,
  maxStreak: 0,
});

/**
 * Game state reducer - Pure function for predictable state transitions
 *
 * Benefits of reducer pattern:
 * 1. All state transitions in one place
 * 2. Easy to test (pure function)
 * 3. Predictable state updates
 * 4. Better debugging (can log all actions)
 * 5. Enables time-travel debugging
 *
 * @param {Object} state - Current state
 * @param {Object} action - Action with type and payload
 * @returns {Object} New state
 */
function gameReducer(state, action) {
  switch (action.type) {
    case GAME_ACTIONS.START:
      return {
        ...state,
        gameStatus: GAME_STATUS.PLAYING,
        startTime: Date.now(),
      };

    case GAME_ACTIONS.INPUT: {
      const { value, targetText } = action.payload;

      // Guard: Don't allow input longer than target
      if (value.length > targetText.length) return state;

      // Calculate streak
      let newStreak = state.streak;
      if (value.length > state.userInput.length && value.length > 0) {
        const lastCharIndex = value.length - 1;
        const isCorrect = value[lastCharIndex] === targetText[lastCharIndex];
        newStreak = isCorrect ? state.streak + 1 : 0;
      }

      return {
        ...state,
        userInput: value,
        streak: newStreak,
        maxStreak: Math.max(state.maxStreak, newStreak),
      };
    }

    case GAME_ACTIONS.FINISH:
      return {
        ...state,
        gameStatus: GAME_STATUS.FINISHED,
      };

    case GAME_ACTIONS.RESET:
      return createInitialState();

    default:
      // In development, warn about unknown actions
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Unknown action type: ${action.type}`);
      }
      return state;
  }
}

/**
 * Custom hook for managing game state and statistics
 *
 * Uses useReducer for complex state logic with multiple sub-values
 * and when the next state depends on the previous one.
 *
 * @param {string} targetText - The text to type
 * @returns {Object} Game state and control functions
 */
export const useGameState = (targetText) => {
  const [state, dispatch] = useReducer(gameReducer, null, createInitialState);
  const inputRef = useRef();

  // Destructure for convenience
  const { gameStatus, userInput, startTime, streak, maxStreak } = state;

  // Calculate statistics (derived state)
  const stats = useMemo(() => {
    const totalChars = userInput.length;
    const correctChars = countCorrectChars(userInput, targetText);
    const accuracy = calculateAccuracy(correctChars, totalChars);

    const timeElapsed = startTime ? Date.now() - startTime : 0;
    const wpm = calculateWPM(correctChars, timeElapsed);

    const isComplete = userInput === targetText;
    const progress = calculateProgress(totalChars, targetText.length);

    return {
      totalChars,
      correctChars,
      accuracy,
      wpm,
      isComplete,
      progress,
      timeElapsed,
    };
  }, [userInput, targetText, startTime]);

  // Action creators - stable references via useCallback
  const startGame = useCallback(() => {
    dispatch({ type: GAME_ACTIONS.START });
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = useCallback((value) => {
    if (gameStatus !== GAME_STATUS.PLAYING) return;
    dispatch({ type: GAME_ACTIONS.INPUT, payload: { value, targetText } });
  }, [gameStatus, targetText]);

  const finishGame = useCallback(() => {
    dispatch({ type: GAME_ACTIONS.FINISH });
  }, []);

  const resetGame = useCallback(() => {
    dispatch({ type: GAME_ACTIONS.RESET });
  }, []);

  const restartGame = useCallback(() => {
    resetGame();
    setTimeout(() => startGame(), 0);
  }, [resetGame, startGame]);

  return {
    gameStatus,
    userInput,
    stats,
    streak,
    maxStreak,
    inputRef,
    startGame,
    handleInputChange,
    finishGame,
    resetGame,
    restartGame,
    isPlaying: gameStatus === GAME_STATUS.PLAYING,
    isFinished: gameStatus === GAME_STATUS.FINISHED,
    isInitial: gameStatus === GAME_STATUS.INITIAL,
  };
};

// Export action types for testing
export { GAME_ACTIONS, gameReducer };

