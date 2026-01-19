/**
 * Zen Mode Page
 * 
 * Relaxed typing practice with no timer or pressure
 * Continuous flow of words for meditation-like typing
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';
import { getRandomWords } from '../data/wordLists';
import './GamePage.css';

const ZenModePage = () => {
  const { settings } = useSettings();
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [wordsTyped, setWordsTyped] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  // Generate initial words
  useEffect(() => {
    setWords(getRandomWords(50, 'medium'));
  }, []);

  // Session timer
  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive]);

  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    
    if (!isActive && value.length > 0) {
      setIsActive(true);
    }

    // Check for space (word completion)
    if (value.endsWith(' ')) {
      const typedWord = value.trim();
      const currentWord = words[currentWordIndex];
      
      // Count characters
      setTotalChars(prev => prev + typedWord.length);
      let correct = 0;
      for (let i = 0; i < Math.min(typedWord.length, currentWord.length); i++) {
        if (typedWord[i] === currentWord[i]) correct++;
      }
      setCorrectChars(prev => prev + correct);
      
      setWordsTyped(prev => prev + 1);
      setCurrentWordIndex(prev => prev + 1);
      setUserInput('');

      // Add more words if running low
      if (currentWordIndex >= words.length - 10) {
        setWords(prev => [...prev, ...getRandomWords(20, 'medium')]);
      }
    } else {
      setUserInput(value);
    }
  }, [words, currentWordIndex, isActive]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;
  const wpm = sessionTime > 0 ? Math.round((wordsTyped / sessionTime) * 60) : 0;

  const resetSession = useCallback(() => {
    setWords(getRandomWords(50, 'medium'));
    setCurrentWordIndex(0);
    setUserInput('');
    setWordsTyped(0);
    setTotalChars(0);
    setCorrectChars(0);
    setSessionTime(0);
    setIsActive(false);
    clearInterval(timerRef.current);
    inputRef.current?.focus();
  }, []);

  const renderWords = () => {
    const visibleStart = Math.max(0, currentWordIndex - 5);
    const visibleEnd = currentWordIndex + 20;
    
    return words.slice(visibleStart, visibleEnd).map((word, idx) => {
      const actualIndex = visibleStart + idx;
      let className = 'zen-word';
      
      if (actualIndex < currentWordIndex) {
        className += ' zen-word--completed';
      } else if (actualIndex === currentWordIndex) {
        className += ' zen-word--current';
      }
      
      return (
        <span key={actualIndex} className={className}>
          {word}{' '}
        </span>
      );
    });
  };

  return (
    <div className={`game-page game-page--zen ${settings.darkMode ? 'dark' : ''}`}>
      <div className="game-page__header">
        <h1>🧘 Zen Mode</h1>
        <p>Relax and type at your own pace. No pressure, just flow.</p>
      </div>

      <div className="game-page__stats">
        <div className="stat-box"><span className="stat-label">Time</span><span className="stat-value">{formatTime(sessionTime)}</span></div>
        <div className="stat-box"><span className="stat-label">Words</span><span className="stat-value">{wordsTyped}</span></div>
        <div className="stat-box"><span className="stat-label">WPM</span><span className="stat-value">{wpm}</span></div>
        <div className="stat-box"><span className="stat-label">Accuracy</span><span className="stat-value">{accuracy}%</span></div>
      </div>

      <div className="game-page__content zen-content">
        <div className="zen-words">{renderWords()}</div>
        <input
          ref={inputRef}
          type="text"
          className="zen-input"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Start typing to begin..."
          autoFocus
        />
      </div>

      <div className="game-page__actions">
        <button className="game-btn" onClick={resetSession}>🔄 Reset Session</button>
      </div>

      <div className="zen-tips">
        <p>💡 Tip: Focus on rhythm and flow. Accuracy comes naturally with practice.</p>
      </div>
    </div>
  );
};

export default ZenModePage;

