/**
 * MemoryTypingPage - See a word, type it from memory
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useSettings } from '../context/SettingsContext';
import { useSound } from '../hooks/useSound';
import './GamePage.css';

const WORDS = {
  easy: ['apple', 'house', 'water', 'music', 'happy', 'green', 'light', 'dream'],
  medium: ['computer', 'elephant', 'sunshine', 'beautiful', 'adventure', 'wonderful'],
  hard: ['extraordinary', 'sophisticated', 'unbelievable', 'championship', 'Mediterranean'],
};

const SHOW_TIMES = { easy: 3000, medium: 2000, hard: 1500 };

const MemoryTypingPage = () => {
  const { soundEnabled, darkMode } = useSettings();
  const sound = useSound(soundEnabled);
  const inputRef = useRef(null);
  
  const [difficulty, setDifficulty] = useState('easy');
  const [currentWord, setCurrentWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [phase, setPhase] = useState('setup'); // setup, showing, typing, result
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [lives, setLives] = useState(3);
  const [message, setMessage] = useState('');

  // Get new word
  const getNewWord = useCallback(() => {
    const wordList = WORDS[difficulty];
    return wordList[Math.floor(Math.random() * wordList.length)];
  }, [difficulty]);

  // Start game
  const startGame = useCallback(() => {
    setScore(0);
    setRound(0);
    setLives(3);
    setPhase('showing');
    const word = getNewWord();
    setCurrentWord(word);
    setUserInput('');
    
    // Hide word after timeout
    setTimeout(() => {
      setPhase('typing');
      inputRef.current?.focus();
    }, SHOW_TIMES[difficulty]);
  }, [difficulty, getNewWord]);

  // Next round
  const nextRound = useCallback(() => {
    setPhase('showing');
    const word = getNewWord();
    setCurrentWord(word);
    setUserInput('');
    setRound(r => r + 1);
    
    setTimeout(() => {
      setPhase('typing');
      inputRef.current?.focus();
    }, SHOW_TIMES[difficulty]);
  }, [difficulty, getNewWord]);

  // Check answer
  const checkAnswer = useCallback(() => {
    if (userInput.toLowerCase() === currentWord.toLowerCase()) {
      sound.playCorrect();
      const points = currentWord.length * 10;
      setScore(s => s + points);
      setMessage('✅ Correct!');
      setPhase('result');
      
      setTimeout(() => {
        setMessage('');
        nextRound();
      }, 1000);
    } else {
      sound.playIncorrect();
      setLives(l => l - 1);
      setMessage(`❌ Wrong! It was "${currentWord}"`);
      setPhase('result');
      
      if (lives <= 1) {
        setTimeout(() => {
          setPhase('gameover');
        }, 1500);
      } else {
        setTimeout(() => {
          setMessage('');
          nextRound();
        }, 1500);
      }
    }
  }, [userInput, currentWord, lives, sound, nextRound]);

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (phase === 'typing' && userInput.trim()) {
      checkAnswer();
    }
  };

  return (
    <div className={`game-page ${darkMode ? 'dark' : ''}`}>
      <div className="game-page__header">
        <h1>🧠 Memory Typing</h1>
        <p>See the word, remember it, type it!</p>
      </div>

      {phase === 'setup' && (
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
          <p style={{ opacity: 0.7, marginBottom: '1.5rem' }}>
            Word display time: {SHOW_TIMES[difficulty] / 1000}s
          </p>
          <button className="game-page__start-btn" onClick={startGame}>
            Start Game 🚀
          </button>
        </div>
      )}

      {phase === 'showing' && (
        <div className="game-page__playing">
          <div className="game-page__stats-bar">
            <div className="game-page__stat">❤️ {lives}</div>
            <div className="game-page__stat">🎯 {score}</div>
            <div className="game-page__stat">📝 Round {round + 1}</div>
          </div>
          <div className="game-page__memory-word">{currentWord}</div>
          <p style={{ textAlign: 'center', opacity: 0.7 }}>Memorize this word...</p>
        </div>
      )}

      {phase === 'typing' && (
        <div className="game-page__playing">
          <div className="game-page__stats-bar">
            <div className="game-page__stat">❤️ {lives}</div>
            <div className="game-page__stat">🎯 {score}</div>
            <div className="game-page__stat">📝 Round {round + 1}</div>
          </div>
          <div className="game-page__memory-hidden">Type the word you saw!</div>
          <form onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="game-page__input"
              placeholder="Type the word..."
              autoFocus
            />
            <button type="submit" className="game-page__start-btn" style={{ width: '100%' }}>
              Submit ✓
            </button>
          </form>
        </div>
      )}

      {phase === 'result' && (
        <div className="game-page__playing">
          <div className="game-page__memory-word">{message}</div>
        </div>
      )}

      {phase === 'gameover' && (
        <div className="game-page__results">
          <h2>🎮 Game Over!</h2>
          <div className="game-page__final-stats">
            <div className="game-page__final-stat">
              <span className="game-page__final-value">{score}</span>
              <span className="game-page__final-label">Points</span>
            </div>
            <div className="game-page__final-stat">
              <span className="game-page__final-value">{round}</span>
              <span className="game-page__final-label">Rounds</span>
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

export default MemoryTypingPage;

