import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { PARAGRAPHS, DIFFICULTY_LEVELS, GAME_STATUS } from '../constants';
import { useTimer } from '../hooks/useTimer';
import { useGameState } from '../hooks/useGameState';
import { useSound } from '../hooks/useSound';
import { useLocalStorage, useLocalStorageBoolean } from '../hooks/useLocalStorage';
import { useTypeRacerShortcuts } from '../hooks/useKeyboardShortcuts';
import { updateHighScore } from '../utils/storage';
import { isCharCorrect } from '../utils/calculations';

// Atomic Components
import Button from './atoms/Button';
import Text from './atoms/Text';

// Molecules
import StatCard from './molecules/StatCard';
import ProgressBar from './molecules/ProgressBar';

// Organisms
import GameArea from './organisms/GameArea';

import './TypeRacerRefactored.css';

/**
 * TypeRacer - Production-ready typing speed test application
 * Following atomic design principles and best practices
 */
const TypeRacerRefactored = () => {
  // Difficulty and settings state
  const [difficulty, setDifficulty] = useState('MEDIUM');
  const [darkMode, setDarkMode] = useLocalStorageBoolean('typeracer-darkmode', false);
  const [soundEnabled, setSoundEnabled] = useLocalStorageBoolean('typeracer-sound', true);
  const [highScores, setHighScores] = useLocalStorage('typeracer-highscores', {
    EASY: 0,
    MEDIUM: 0,
    HARD: 0,
    EXPERT: 0,
  });
  const [showConfetti, setShowConfetti] = useState(false);

  // Get current paragraph and difficulty config
  const currentParagraph = useMemo(() => PARAGRAPHS[difficulty], [difficulty]);
  const currentDifficulty = useMemo(() => DIFFICULTY_LEVELS[difficulty], [difficulty]);

  // Game state management
  const {
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
    isPlaying,
    isFinished,
    isInitial,
  } = useGameState(currentParagraph);

  // Timer management
  const { timeLeft, startTimer, resetTimer } = useTimer({
    allowedTime: currentDifficulty.time,
    onFinish: finishGame,
  });

  // Sound effects
  const sound = useSound(soundEnabled);

  // Dark mode effect
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  // Auto-start timer when game starts
  useEffect(() => {
    if (isPlaying && timeLeft === currentDifficulty.time) {
      startTimer();
    }
  }, [isPlaying, timeLeft, currentDifficulty.time, startTimer]);

  // Handle completion
  useEffect(() => {
    if (stats.isComplete && isPlaying) {
      finishGame();
      sound.playComplete();
      setShowConfetti(true);
      
      // Update high score
      const isNewRecord = updateHighScore(difficulty, stats.wpm);
      if (isNewRecord) {
        setHighScores(prev => ({
          ...prev,
          [difficulty]: stats.wpm,
        }));
      }
      
      // Clear confetti after 5 seconds
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [stats.isComplete, stats.wpm, isPlaying, difficulty, finishGame, sound, setHighScores]);

  // Handle input with sound effects
  const handleInput = useCallback((value) => {
    if (isInitial && value.length > 0) {
      startGame();
    }
    
    // Play sound for last character
    if (value.length > userInput.length) {
      const lastIndex = value.length - 1;
      const correct = isCharCorrect(value, currentParagraph, lastIndex);
      if (correct) {
        sound.playCorrect();
      } else {
        sound.playIncorrect();
      }
    }
    
    handleInputChange(value);
  }, [isInitial, userInput, currentParagraph, startGame, handleInputChange, sound]);

  // Handle difficulty change
  const handleDifficultyChange = useCallback((newDifficulty) => {
    setDifficulty(newDifficulty);
    resetGame();
    resetTimer();
  }, [resetGame, resetTimer]);

  // Handle restart
  const handleRestart = useCallback(() => {
    restartGame();
    resetTimer();
    setShowConfetti(false);
  }, [restartGame, resetTimer]);

  // Keyboard shortcuts
  useTypeRacerShortcuts({
    onRestart: handleRestart,
    onToggleDarkMode: () => setDarkMode(prev => !prev),
    onToggleSound: () => setSoundEnabled(prev => !prev),
  }, !isFinished);

  return (
    <div className="typeracer-app">
      {/* Confetti */}
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
              }}
            />
          ))}
        </div>
      )}

      {/* Settings Bar */}
      <div className="settings-bar">
        <Button
          variant="icon"
          onClick={() => setDarkMode(prev => !prev)}
          title="Toggle Dark Mode (Ctrl+D)"
        >
          {darkMode ? '☀️' : '🌙'}
        </Button>
        <Button
          variant="icon"
          onClick={() => setSoundEnabled(prev => !prev)}
          title="Toggle Sound (Ctrl+M)"
        >
          {soundEnabled ? '🔊' : '🔇'}
        </Button>
        <Text variant="small" className="keyboard-shortcuts">
          ⌨️ Ctrl+R: Restart | Ctrl+D: Dark Mode | Ctrl+M: Sound
        </Text>
      </div>

      {/* Header */}
      <header className="header">
        <Text variant="h1" as="h1">TypeRacer Pro</Text>
        <Text variant="body">Test your typing speed and accuracy!</Text>
      </header>

      {/* Difficulty Selector */}
      {isInitial && (
        <div className="difficulty-selector">
          <Text variant="h3" as="h3">Select Difficulty</Text>
          <div className="difficulty-grid">
            {Object.entries(DIFFICULTY_LEVELS).map(([key, level]) => (
              <Button
                key={key}
                variant="difficulty"
                className={difficulty === key ? 'active' : ''}
                onClick={() => handleDifficultyChange(key)}
              >
                <Text variant="h3" as="span">{level.name}</Text>
                <Text variant="small">{level.description}</Text>
                <Text variant="small">⏱️ {level.time}s</Text>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Game Stats */}
      {(isPlaying || isFinished) && (
        <>
          <div className="stats-bar">
            <StatCard label="Time Left" value={`${timeLeft}s`} icon="⏱️" />
            <StatCard label="WPM" value={stats.wpm} icon="⚡" variant="highlight" />
            <StatCard label="Accuracy" value={`${stats.accuracy}%`} icon="🎯" />
            <StatCard label="Streak" value={`${streak} 🔥`} icon="🔥" variant="success" />
          </div>

          <ProgressBar progress={stats.progress} />
        </>
      )}

      {/* Game Area */}
      {!isFinished && (
        <GameArea
          targetText={currentParagraph}
          userInput={userInput}
          onInputChange={handleInput}
          inputRef={inputRef}
          disabled={isFinished}
        />
      )}

      {/* Results */}
      {isFinished && (
        <div className="results">
          <Text variant="h2" as="h2">🎉 Results</Text>
          
          <div className="results-grid">
            <StatCard label="WPM" value={stats.wpm} icon="⚡" variant="highlight" />
            <StatCard label="Accuracy" value={`${stats.accuracy}%`} icon="🎯" />
            <StatCard label="Max Streak" value={maxStreak} icon="🔥" variant="success" />
            <StatCard label="High Score" value={highScores[difficulty]} icon="🏆" />
          </div>

          {stats.wpm > highScores[difficulty] && (
            <div className="new-record">
              <Text variant="h3">🎊 New High Score! 🎊</Text>
            </div>
          )}

          <div className="results-actions">
            <Button variant="primary" onClick={handleRestart}>
              Try Again
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => {
                const difficulties = Object.keys(DIFFICULTY_LEVELS);
                const currentIndex = difficulties.indexOf(difficulty);
                const nextDifficulty = difficulties[(currentIndex + 1) % difficulties.length];
                handleDifficultyChange(nextDifficulty);
              }}
            >
              Next Level
            </Button>
          </div>
        </div>
      )}

      {/* Restart Button */}
      {isPlaying && (
        <div className="game-actions">
          <Button variant="secondary" onClick={handleRestart}>
            Restart (Ctrl+R)
          </Button>
        </div>
      )}
    </div>
  );
};

export default TypeRacerRefactored;

