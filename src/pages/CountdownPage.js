/**
 * Countdown Page
 * 
 * Type as many words as possible before time runs out
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useSettings } from '../context/SettingsContext';
import { getRandomWords } from '../data/wordLists';
import TimerDisplay from '../components/TimerDisplay';
import GameResultModal from '../components/GameResultModal';
import './GamePage.css';

const TIME_OPTIONS = [15, 30, 60, 120];

const CountdownPage = () => {
  const { settings } = useSettings();
  const inputRef = useRef(null);
  
  const [timeLimit, setTimeLimit] = useState(60);
  const [timeLeft, setTimeLeft] = useState(60);
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [input, setInput] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [stats, setStats] = useState({ correct: 0, incorrect: 0, total: 0 });

  // Generate words
  useEffect(() => {
    setWords(getRandomWords(200));
  }, []);

  // Timer
  useEffect(() => {
    if (!isPlaying || timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          setIsPlaying(false);
          setIsComplete(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const handleStart = useCallback(() => {
    setWords(getRandomWords(200));
    setCurrentWordIndex(0);
    setInput('');
    setTimeLeft(timeLimit);
    setStats({ correct: 0, incorrect: 0, total: 0 });
    setIsPlaying(true);
    setIsComplete(false);
    inputRef.current?.focus();
  }, [timeLimit]);

  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    
    if (!isPlaying && value.length > 0) {
      handleStart();
    }
    
    if (value.endsWith(' ')) {
      const typedWord = value.trim();
      const currentWord = words[currentWordIndex];
      const isCorrect = typedWord === currentWord;
      
      setStats(prev => ({
        correct: prev.correct + (isCorrect ? 1 : 0),
        incorrect: prev.incorrect + (isCorrect ? 0 : 1),
        total: prev.total + 1,
      }));
      
      setCurrentWordIndex(prev => prev + 1);
      setInput('');
    } else {
      setInput(value);
    }
  }, [isPlaying, words, currentWordIndex, handleStart]);

  const handlePlayAgain = useCallback(() => {
    handleStart();
  }, [handleStart]);

  const calculateWPM = () => {
    const timeSpent = timeLimit - timeLeft;
    if (timeSpent === 0) return 0;
    return Math.round((stats.correct / timeSpent) * 60);
  };

  const calculateAccuracy = () => {
    if (stats.total === 0) return 100;
    return Math.round((stats.correct / stats.total) * 100);
  };

  return (
    <div className={`game-page ${settings.darkMode ? 'dark' : ''}`}>
      <div className="game-page__header">
        <h1>⏱️ Countdown Challenge</h1>
        <p>Type as many words as possible before time runs out!</p>
      </div>

      <div className="game-page__controls">
        {TIME_OPTIONS.map(time => (
          <button
            key={time}
            className={`game-btn ${timeLimit === time ? 'game-btn--active' : ''}`}
            onClick={() => { setTimeLimit(time); setTimeLeft(time); }}
            disabled={isPlaying}
          >
            {time}s
          </button>
        ))}
      </div>

      <div className="countdown-game">
        <div className="countdown-stats">
          <TimerDisplay 
            seconds={timeLeft} 
            mode="countdown" 
            size="large"
            label="Time Left"
          />
          <div className="stat-box">
            <span className="stat-value">{stats.correct}</span>
            <span className="stat-label">Words</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">{calculateWPM()}</span>
            <span className="stat-label">WPM</span>
          </div>
        </div>

        <div className="word-display">
          {words.slice(currentWordIndex, currentWordIndex + 10).map((word, i) => (
            <span 
              key={`${word}-${currentWordIndex + i}`}
              className={`word ${i === 0 ? 'word--current' : ''}`}
            >
              {word}
            </span>
          ))}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          className="game-input"
          placeholder={isPlaying ? 'Type the word...' : 'Start typing to begin!'}
          disabled={isComplete}
          autoFocus
        />

        {!isPlaying && !isComplete && (
          <button className="game-btn game-btn--primary" onClick={handleStart}>
            Start Game
          </button>
        )}
      </div>

      <GameResultModal
        isOpen={isComplete}
        onClose={() => setIsComplete(false)}
        onPlayAgain={handlePlayAgain}
        title="Time's Up!"
        stats={{
          wpm: calculateWPM(),
          accuracy: calculateAccuracy(),
          time: timeLimit,
          score: stats.correct * 10,
        }}
      />
    </div>
  );
};

export default CountdownPage;

