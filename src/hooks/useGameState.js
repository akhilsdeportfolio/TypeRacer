import { useState, useMemo, useCallback, useRef } from 'react';
import { GAME_STATUS } from '../constants';
import { 
  calculateWPM, 
  calculateAccuracy, 
  calculateProgress, 
  countCorrectChars 
} from '../utils/calculations';

/**
 * Custom hook for managing game state and statistics
 * @param {string} targetText - The text to type
 * @returns {Object} Game state and control functions
 */
export const useGameState = (targetText) => {
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.INITIAL);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  
  const inputRef = useRef();

  // Calculate statistics
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

  // Start the game
  const startGame = useCallback(() => {
    setGameStatus(GAME_STATUS.PLAYING);
    setStartTime(Date.now());
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Handle input change
  const handleInputChange = useCallback((value) => {
    if (gameStatus !== GAME_STATUS.PLAYING) return;
    
    // Don't allow input longer than target text
    if (value.length > targetText.length) return;
    
    setUserInput(value);
    
    // Update streak
    if (value.length > 0) {
      const lastCharIndex = value.length - 1;
      const isCorrect = value[lastCharIndex] === targetText[lastCharIndex];
      
      if (isCorrect) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        setMaxStreak(Math.max(maxStreak, newStreak));
      } else {
        setStreak(0);
      }
    }
  }, [gameStatus, targetText, streak, maxStreak]);

  // Finish the game
  const finishGame = useCallback(() => {
    setGameStatus(GAME_STATUS.FINISHED);
  }, []);

  // Reset the game
  const resetGame = useCallback(() => {
    setGameStatus(GAME_STATUS.INITIAL);
    setUserInput('');
    setStartTime(null);
    setStreak(0);
    setMaxStreak(0);
  }, []);

  // Restart the game (reset and start)
  const restartGame = useCallback(() => {
    resetGame();
    // Small delay to ensure state is reset before starting
    setTimeout(() => {
      startGame();
    }, 0);
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

