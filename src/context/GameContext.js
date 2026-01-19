import React, { createContext, useContext, useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';
import { GAME_STATUS, PARAGRAPHS, DIFFICULTY_LEVELS } from '../constants';
import { calculateWPM, calculateAccuracy, calculateProgress, countCorrectChars } from '../utils/calculations';

// Action types
const ACTIONS = {
  START_GAME: 'START_GAME',
  UPDATE_INPUT: 'UPDATE_INPUT',
  FINISH_GAME: 'FINISH_GAME',
  RESET_GAME: 'RESET_GAME',
  SET_DIFFICULTY: 'SET_DIFFICULTY',
  TICK: 'TICK',
};

// Initial state
const createInitialState = (difficulty = 'MEDIUM') => ({
  gameStatus: GAME_STATUS.INITIAL,
  difficulty,
  targetText: PARAGRAPHS[difficulty],
  userInput: '',
  startTime: null,
  timeLeft: DIFFICULTY_LEVELS[difficulty].time,
  streak: 0,
  maxStreak: 0,
});

// Reducer for predictable state transitions
function gameReducer(state, action) {
  switch (action.type) {
    case ACTIONS.START_GAME:
      return {
        ...state,
        gameStatus: GAME_STATUS.PLAYING,
        startTime: Date.now(),
      };

    case ACTIONS.UPDATE_INPUT: {
      const { value } = action.payload;
      if (value.length > state.targetText.length) return state;
      
      const lastCharIndex = value.length - 1;
      const isCorrect = lastCharIndex >= 0 && value[lastCharIndex] === state.targetText[lastCharIndex];
      const newStreak = isCorrect ? state.streak + 1 : 0;
      
      return {
        ...state,
        userInput: value,
        streak: newStreak,
        maxStreak: Math.max(state.maxStreak, newStreak),
      };
    }

    case ACTIONS.FINISH_GAME:
      return {
        ...state,
        gameStatus: GAME_STATUS.FINISHED,
      };

    case ACTIONS.RESET_GAME:
      return createInitialState(state.difficulty);

    case ACTIONS.SET_DIFFICULTY:
      return createInitialState(action.payload.difficulty);

    case ACTIONS.TICK:
      return {
        ...state,
        timeLeft: Math.max(0, state.timeLeft - 1),
      };

    default:
      return state;
  }
}

// Derived state selectors (computed from state)
function selectStats(state) {
  const { userInput, targetText, startTime } = state;
  const totalChars = userInput.length;
  const correctChars = countCorrectChars(userInput, targetText);
  const timeElapsed = startTime ? Date.now() - startTime : 0;
  
  return {
    totalChars,
    correctChars,
    accuracy: calculateAccuracy(correctChars, totalChars),
    wpm: calculateWPM(correctChars, timeElapsed),
    isComplete: userInput === targetText,
    progress: calculateProgress(totalChars, targetText.length),
    timeElapsed,
  };
}

// Context
const GameContext = createContext(null);

// Provider component
export function GameProvider({ children, initialDifficulty = 'MEDIUM' }) {
  const [state, dispatch] = useReducer(gameReducer, initialDifficulty, createInitialState);

  // Actions
  const actions = useMemo(() => ({
    startGame: () => dispatch({ type: ACTIONS.START_GAME }),
    updateInput: (value) => dispatch({ type: ACTIONS.UPDATE_INPUT, payload: { value } }),
    finishGame: () => dispatch({ type: ACTIONS.FINISH_GAME }),
    resetGame: () => dispatch({ type: ACTIONS.RESET_GAME }),
    setDifficulty: (difficulty) => dispatch({ type: ACTIONS.SET_DIFFICULTY, payload: { difficulty } }),
    tick: () => dispatch({ type: ACTIONS.TICK }),
  }), []);

  // Derived state
  const stats = useMemo(() => selectStats(state), [state]);
  const difficultyConfig = useMemo(() => DIFFICULTY_LEVELS[state.difficulty], [state.difficulty]);

  // Status helpers
  const isPlaying = state.gameStatus === GAME_STATUS.PLAYING;
  const isFinished = state.gameStatus === GAME_STATUS.FINISHED;
  const isInitial = state.gameStatus === GAME_STATUS.INITIAL;

  const value = useMemo(() => ({
    // State
    ...state,
    stats,
    difficultyConfig,
    // Status flags
    isPlaying,
    isFinished,
    isInitial,
    // Actions
    ...actions,
  }), [state, stats, difficultyConfig, isPlaying, isFinished, isInitial, actions]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

GameProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initialDifficulty: PropTypes.oneOf(['EASY', 'MEDIUM', 'HARD', 'EXPERT']),
};

// Hook to consume context
export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
}

export { ACTIONS };

