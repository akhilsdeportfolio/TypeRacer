/**
 * SpeedChallengePage - Progressively faster typing challenge
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useSettings } from '../context/SettingsContext';
import { useSound } from '../hooks/useSound';
import './GamePage.css';

const WORDS = ['the', 'quick', 'brown', 'fox', 'jumps', 'over', 'lazy', 'dog', 'pack', 'my', 
  'box', 'with', 'five', 'dozen', 'liquor', 'jugs', 'sphinx', 'black', 'quartz', 'judge'];

const SpeedChallengePage = () => {
  const { soundEnabled, darkMode } = useSettings();
  const sound = useSound(soundEnabled);
  const inputRef = useRef(null);
  
  const [currentWord, setCurrentWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [baseTime, setBaseTime] = useState(5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [wordsTyped, setWordsTyped] = useState(0);

  const getNewWord = useCallback(() => {
    // Words get longer as levels increase
    const availableWords = level < 5 
      ? WORDS.filter(w => w.length <= 4 + level)
      : WORDS;
    const word = availableWords[Math.floor(Math.random() * availableWords.length)];
    setCurrentWord(word);
    setUserInput('');
    // Time decreases as level increases (min 1.5s)
    const newTime = Math.max(1.5, 5 - (level * 0.3));
    setBaseTime(newTime);
    setTimeLeft(newTime);
  }, [level]);

  const startGame = useCallback(() => {
    setLevel(1);
    setScore(0);
    setWordsTyped(0);
    setIsPlaying(true);
    setGameOver(false);
    setBaseTime(5);
    setTimeLeft(5);
    const word = WORDS.filter(w => w.length <= 5)[Math.floor(Math.random() * 10)];
    setCurrentWord(word);
    setUserInput('');
    inputRef.current?.focus();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 0.1) {
          setIsPlaying(false);
          setGameOver(true);
          return 0;
        }
        return t - 0.1;
      });
    }, 100);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleInput = useCallback((e) => {
    const value = e.target.value.toLowerCase();
    setUserInput(value);
    
    if (value === currentWord) {
      sound.playCorrect();
      const newWordsTyped = wordsTyped + 1;
      setWordsTyped(newWordsTyped);
      
      // Level up every 5 words
      if (newWordsTyped % 5 === 0) {
        setLevel(l => l + 1);
      }
      
      // Score based on time left and level
      const points = Math.round((timeLeft / baseTime) * 100 * level);
      setScore(s => s + points);
      
      getNewWord();
    }
  }, [currentWord, wordsTyped, timeLeft, baseTime, level, getNewWord, sound]);

  const timePercent = (timeLeft / baseTime) * 100;
  const timeColor = timePercent > 50 ? '#10b981' : timePercent > 25 ? '#f59e0b' : '#ef4444';

  return (
    <div className={`game-page ${darkMode ? 'dark' : ''}`}>
      <div className="game-page__header">
        <h1>⚡ Speed Challenge</h1>
        <p>Type faster as time gets shorter!</p>
      </div>

      {!isPlaying && !gameOver && (
        <div className="game-page__setup">
          <h2>How It Works</h2>
          <p style={{ marginBottom: '1.5rem', opacity: 0.8 }}>
            Type each word before time runs out. <br/>
            Every 5 words, the timer gets faster!
          </p>
          <button className="game-page__start-btn" onClick={startGame}>Start Challenge ⚡</button>
        </div>
      )}

      {isPlaying && (
        <div className="game-page__playing">
          <div className="game-page__stats-bar">
            <div className="game-page__stat">⚡ Level {level}</div>
            <div className="game-page__stat">🎯 {score} pts</div>
            <div className="game-page__stat">✅ {wordsTyped}</div>
          </div>
          
          {/* Time bar */}
          <div style={{ 
            height: '10px', 
            background: 'rgba(255,255,255,0.2)', 
            borderRadius: '5px', 
            marginBottom: '2rem',
            overflow: 'hidden'
          }}>
            <div style={{ 
              width: `${timePercent}%`, 
              height: '100%', 
              background: timeColor,
              transition: 'width 0.1s linear'
            }} />
          </div>

          <div className="game-page__word-display">
            <div className="game-page__scrambled">{currentWord}</div>
          </div>
          
          <input ref={inputRef} type="text" value={userInput} onChange={handleInput}
            className="game-page__input" placeholder="Type fast!" autoFocus />
        </div>
      )}

      {gameOver && (
        <div className="game-page__results">
          <h2>⚡ Challenge Complete!</h2>
          <div className="game-page__final-stats">
            <div className="game-page__final-stat">
              <span className="game-page__final-value">{score}</span>
              <span className="game-page__final-label">Points</span>
            </div>
            <div className="game-page__final-stat">
              <span className="game-page__final-value">{level}</span>
              <span className="game-page__final-label">Level</span>
            </div>
            <div className="game-page__final-stat">
              <span className="game-page__final-value">{wordsTyped}</span>
              <span className="game-page__final-label">Words</span>
            </div>
          </div>
          <button className="game-page__start-btn" onClick={startGame}>Try Again 🔄</button>
        </div>
      )}
    </div>
  );
};

export default SpeedChallengePage;

