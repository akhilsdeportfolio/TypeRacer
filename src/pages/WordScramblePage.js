/**
 * WordScramblePage - Unscramble words typing game
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useSettings } from '../context/SettingsContext';
import { useSound } from '../hooks/useSound';
import './GamePage.css';

// Word lists by difficulty
const WORDS = {
  easy: ['cat', 'dog', 'sun', 'moon', 'tree', 'book', 'fish', 'bird', 'door', 'hand'],
  medium: ['happy', 'ocean', 'music', 'plant', 'world', 'dance', 'smile', 'beach', 'cloud', 'dream'],
  hard: ['keyboard', 'computer', 'elephant', 'butterfly', 'adventure', 'beautiful', 'fantastic', 'wonderful', 'excellent', 'champion'],
};

// Scramble a word
const scrambleWord = (word) => {
  const arr = word.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  // Make sure it's actually scrambled
  return arr.join('') === word ? scrambleWord(word) : arr.join('');
};

const WordScramblePage = () => {
  const { soundEnabled, darkMode } = useSettings();
  const sound = useSound(soundEnabled);
  const inputRef = useRef(null);
  
  const [difficulty, setDifficulty] = useState('easy');
  const [currentWord, setCurrentWord] = useState('');
  const [scrambledWord, setScrambledWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [wordsCompleted, setWordsCompleted] = useState(0);

  // Get new word
  const getNewWord = useCallback(() => {
    const wordList = WORDS[difficulty];
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    setCurrentWord(word);
    setScrambledWord(scrambleWord(word));
    setUserInput('');
  }, [difficulty]);

  // Start game
  const startGame = useCallback(() => {
    setScore(0);
    setStreak(0);
    setTimeLeft(60);
    setIsPlaying(true);
    setGameOver(false);
    setWordsCompleted(0);
    getNewWord();
    inputRef.current?.focus();
  }, [getNewWord]);

  // Timer
  useEffect(() => {
    if (!isPlaying || timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          setIsPlaying(false);
          setGameOver(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Handle input
  const handleInput = useCallback((e) => {
    const value = e.target.value.toLowerCase();
    setUserInput(value);
    
    if (value === currentWord) {
      sound.playCorrect();
      const points = currentWord.length * (streak + 1) * (difficulty === 'hard' ? 3 : difficulty === 'medium' ? 2 : 1);
      setScore(s => s + points);
      setStreak(s => s + 1);
      setWordsCompleted(w => w + 1);
      getNewWord();
    }
  }, [currentWord, streak, difficulty, getNewWord, sound]);

  // Skip word
  const skipWord = useCallback(() => {
    setStreak(0);
    getNewWord();
  }, [getNewWord]);

  return (
    <div className={`game-page ${darkMode ? 'dark' : ''}`}>
      <div className="game-page__header">
        <h1>🔀 Word Scramble</h1>
        <p>Unscramble the word and type it correctly!</p>
      </div>

      {!isPlaying && !gameOver && (
        <div className="game-page__setup">
          <h2>Select Difficulty</h2>
          <div className="game-page__difficulty">
            {['easy', 'medium', 'hard'].map(d => (
              <button
                key={d}
                className={`game-page__diff-btn ${difficulty === d ? 'active' : ''}`}
                onClick={() => setDifficulty(d)}
              >
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            ))}
          </div>
          <button className="game-page__start-btn" onClick={startGame}>
            Start Game 🚀
          </button>
        </div>
      )}

      {isPlaying && (
        <div className="game-page__playing">
          <div className="game-page__stats-bar">
            <div className="game-page__stat">⏱️ {timeLeft}s</div>
            <div className="game-page__stat">🎯 {score} pts</div>
            <div className="game-page__stat">🔥 {streak}x</div>
            <div className="game-page__stat">✅ {wordsCompleted}</div>
          </div>

          <div className="game-page__word-display">
            <div className="game-page__scrambled">{scrambledWord}</div>
            <div className="game-page__hint">({currentWord.length} letters)</div>
          </div>

          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInput}
            className="game-page__input"
            placeholder="Type the unscrambled word..."
            autoFocus
          />

          <button className="game-page__skip-btn" onClick={skipWord}>
            Skip (loses streak) ⏭️
          </button>
        </div>
      )}

      {gameOver && (
        <div className="game-page__results">
          <h2>🎉 Game Over!</h2>
          <div className="game-page__final-stats">
            <div className="game-page__final-stat">
              <span className="game-page__final-value">{score}</span>
              <span className="game-page__final-label">Points</span>
            </div>
            <div className="game-page__final-stat">
              <span className="game-page__final-value">{wordsCompleted}</span>
              <span className="game-page__final-label">Words</span>
            </div>
          </div>
          <button className="game-page__start-btn" onClick={startGame}>
            Play Again 🔄
          </button>
        </div>
      )}
    </div>
  );
};

export default WordScramblePage;

