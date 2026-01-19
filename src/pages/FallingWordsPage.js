/**
 * Falling Words Page
 * 
 * Type words before they fall off the screen
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useSettings } from '../context/SettingsContext';
import { getRandomWords } from '../data/wordLists';
import GameResultModal from '../components/GameResultModal';
import './GamePage.css';
import './FallingWordsPage.css';

const DIFFICULTIES = {
  easy: { speed: 30, spawnRate: 3000, lives: 5 },
  medium: { speed: 50, spawnRate: 2000, lives: 3 },
  hard: { speed: 70, spawnRate: 1500, lives: 2 },
};

const FallingWordsPage = () => {
  const { settings } = useSettings();
  const inputRef = useRef(null);
  const gameRef = useRef(null);
  
  const [difficulty, setDifficulty] = useState('medium');
  const [fallingWords, setFallingWords] = useState([]);
  const [input, setInput] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [wordsTyped, setWordsTyped] = useState(0);
  const [wordPool, setWordPool] = useState([]);
  const [wordIndex, setWordIndex] = useState(0);

  // Initialize word pool
  useEffect(() => {
    setWordPool(getRandomWords(500));
  }, []);

  // Spawn new words
  useEffect(() => {
    if (!isPlaying) return;
    
    const config = DIFFICULTIES[difficulty];
    const spawnWord = () => {
      if (wordIndex >= wordPool.length) return;
      
      const word = wordPool[wordIndex];
      const newWord = {
        id: Date.now(),
        text: word,
        x: Math.random() * 70 + 10, // 10-80% from left
        y: 0,
      };
      
      setFallingWords(prev => [...prev, newWord]);
      setWordIndex(prev => prev + 1);
    };
    
    spawnWord();
    const interval = setInterval(spawnWord, config.spawnRate);
    return () => clearInterval(interval);
  }, [isPlaying, difficulty, wordPool, wordIndex]);

  // Move words down
  useEffect(() => {
    if (!isPlaying) return;
    
    const config = DIFFICULTIES[difficulty];
    const moveWords = () => {
      setFallingWords(prev => {
        const updated = prev.map(word => ({
          ...word,
          y: word.y + (config.speed / 60),
        }));
        
        // Check for words that fell off
        const fallen = updated.filter(w => w.y >= 100);
        if (fallen.length > 0) {
          setLives(l => {
            const newLives = l - fallen.length;
            if (newLives <= 0) {
              setIsPlaying(false);
              setIsComplete(true);
            }
            return Math.max(0, newLives);
          });
        }
        
        return updated.filter(w => w.y < 100);
      });
    };
    
    const interval = setInterval(moveWords, 1000 / 60);
    return () => clearInterval(interval);
  }, [isPlaying, difficulty]);

  const handleStart = useCallback(() => {
    const config = DIFFICULTIES[difficulty];
    setWordPool(getRandomWords(500));
    setWordIndex(0);
    setFallingWords([]);
    setInput('');
    setScore(0);
    setLives(config.lives);
    setWordsTyped(0);
    setIsPlaying(true);
    setIsComplete(false);
    inputRef.current?.focus();
  }, [difficulty]);

  const handleInputChange = useCallback((e) => {
    const value = e.target.value.toLowerCase();
    setInput(value);
    
    // Check if typed word matches any falling word
    const matchIndex = fallingWords.findIndex(w => w.text === value);
    if (matchIndex !== -1) {
      const matchedWord = fallingWords[matchIndex];
      const bonus = Math.max(0, Math.floor((100 - matchedWord.y) / 10));
      
      setFallingWords(prev => prev.filter((_, i) => i !== matchIndex));
      setScore(prev => prev + 10 + bonus);
      setWordsTyped(prev => prev + 1);
      setInput('');
    }
  }, [fallingWords]);

  return (
    <div className={`game-page ${settings.darkMode ? 'dark' : ''}`}>
      <div className="game-page__header">
        <h1>🌧️ Falling Words</h1>
        <p>Type words before they hit the ground!</p>
      </div>

      <div className="game-page__controls">
        {Object.keys(DIFFICULTIES).map(diff => (
          <button
            key={diff}
            className={`game-btn ${difficulty === diff ? 'game-btn--active' : ''}`}
            onClick={() => setDifficulty(diff)}
            disabled={isPlaying}
          >
            {diff.charAt(0).toUpperCase() + diff.slice(1)}
          </button>
        ))}
      </div>

      <div className="falling-game" ref={gameRef}>
        <div className="falling-stats">
          <div className="stat-box">
            <span className="stat-value">{'❤️'.repeat(lives)}</span>
            <span className="stat-label">Lives</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">{score}</span>
            <span className="stat-label">Score</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">{wordsTyped}</span>
            <span className="stat-label">Words</span>
          </div>
        </div>

        <div className="falling-area">
          {fallingWords.map(word => (
            <div
              key={word.id}
              className="falling-word"
              style={{
                left: `${word.x}%`,
                top: `${word.y}%`,
              }}
            >
              {word.text}
            </div>
          ))}
          <div className="ground-line" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          className="game-input"
          placeholder={isPlaying ? 'Type the falling words...' : 'Press Start to begin!'}
          disabled={!isPlaying}
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
        onPlayAgain={handleStart}
        title="Game Over!"
        stats={{
          wpm: 0,
          accuracy: 100,
          time: 0,
          score,
        }}
        message={`You typed ${wordsTyped} words!`}
      />
    </div>
  );
};

export default FallingWordsPage;

