import { useCallback, useEffect, useRef } from 'react';
import { useGameContext } from '../context/GameContext';
import { useSettings } from '../context/SettingsContext';
import { useTimer } from './useTimer';
import { useSound } from './useSound';
import { useTypeRacerShortcuts } from './useKeyboardShortcuts';
import { isCharCorrect } from '../utils/calculations';

/**
 * useTypeRacer - Composed hook that orchestrates all game functionality
 * 
 * This hook follows the "facade pattern" - it provides a simplified interface
 * to complex subsystems (game state, timer, sound, settings, shortcuts).
 * 
 * Benefits:
 * - Single import for all game functionality
 * - Encapsulates cross-cutting concerns (sound on input, timer sync)
 * - Easier to test individual hooks in isolation
 * - Clear separation of concerns
 * 
 * @returns {Object} Complete game API
 */
export function useTypeRacer() {
  const inputRef = useRef(null);
  
  // Get contexts
  const game = useGameContext();
  const settings = useSettings();
  
  // Sound effects
  const sound = useSound(settings.soundEnabled);
  
  // Timer management
  const { timeLeft, startTimer, resetTimer } = useTimer({
    allowedTime: game.difficultyConfig.time,
    onFinish: game.finishGame,
  });

  // Sync timer with game state
  useEffect(() => {
    if (game.isPlaying) {
      startTimer();
    }
  }, [game.isPlaying, startTimer]);

  // Handle completion
  const { isComplete, wpm } = game.stats;
  const { isPlaying, difficulty, finishGame: gameFinish } = game;

  useEffect(() => {
    if (isComplete && isPlaying) {
      gameFinish();
      sound.playComplete();
      settings.updateHighScore(difficulty, wpm);
    }
  }, [isComplete, wpm, isPlaying, difficulty, gameFinish, sound, settings]);

  // Enhanced input handler with sound effects
  const handleInput = useCallback((value) => {
    if (game.isInitial && value.length > 0) {
      game.startGame();
    }
    
    // Play sound for last character typed
    if (value.length > game.userInput.length) {
      const lastIndex = value.length - 1;
      const correct = isCharCorrect(value, game.targetText, lastIndex);
      if (correct) {
        sound.playCorrect();
      } else {
        sound.playIncorrect();
      }
    }
    
    game.updateInput(value);
  }, [game, sound]);

  // Restart handler
  const handleRestart = useCallback(() => {
    game.resetGame();
    resetTimer();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [game, resetTimer]);

  // Change difficulty
  const handleDifficultyChange = useCallback((difficulty) => {
    game.setDifficulty(difficulty);
    resetTimer();
  }, [game, resetTimer]);

  // Keyboard shortcuts
  useTypeRacerShortcuts({
    onRestart: handleRestart,
    onToggleDarkMode: settings.toggleDarkMode,
    onToggleSound: settings.toggleSound,
  }, !game.isFinished);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return {
    // Game state
    gameStatus: game.gameStatus,
    difficulty: game.difficulty,
    targetText: game.targetText,
    userInput: game.userInput,
    stats: game.stats,
    streak: game.streak,
    maxStreak: game.maxStreak,
    timeLeft,
    difficultyConfig: game.difficultyConfig,
    
    // Status flags
    isPlaying: game.isPlaying,
    isFinished: game.isFinished,
    isInitial: game.isInitial,
    
    // Settings
    darkMode: settings.darkMode,
    soundEnabled: settings.soundEnabled,
    highScores: settings.highScores,
    
    // Refs
    inputRef,
    
    // Actions
    handleInput,
    handleRestart,
    handleDifficultyChange,
    toggleDarkMode: settings.toggleDarkMode,
    toggleSound: settings.toggleSound,
  };
}

export default useTypeRacer;

