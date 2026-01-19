/**
 * Quote Typing Page
 * 
 * Type famous quotes from various categories
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';
import { QUOTES, getRandomQuote } from '../data/wordLists';
import './GamePage.css';

const CATEGORIES = [
  { id: 'all', name: 'All', icon: '🌟' },
  { id: 'motivation', name: 'Motivation', icon: '💪' },
  { id: 'wisdom', name: 'Wisdom', icon: '🦉' },
  { id: 'humor', name: 'Humor', icon: '😄' },
  { id: 'technology', name: 'Technology', icon: '💻' },
];

const QuoteTypingPage = () => {
  const { settings } = useSettings();
  const [category, setCategory] = useState('all');
  const [quote, setQuote] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [completed, setCompleted] = useState(false);
  const [quotesCompleted, setQuotesCompleted] = useState(0);
  const inputRef = useRef(null);

  const loadNewQuote = useCallback(() => {
    const newQuote = getRandomQuote(category === 'all' ? null : category);
    setQuote(newQuote);
    setUserInput('');
    setIsPlaying(false);
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setCompleted(false);
  }, [category]);

  useEffect(() => {
    loadNewQuote();
  }, [category]);

  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    
    if (!isPlaying && value.length > 0) {
      setIsPlaying(true);
      setStartTime(Date.now());
    }

    setUserInput(value);

    if (!quote) return;

    // Calculate accuracy
    let errors = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== quote.text[i]) errors++;
    }
    const acc = value.length > 0 ? Math.round(((value.length - errors) / value.length) * 100) : 100;
    setAccuracy(acc);

    // Calculate WPM
    if (startTime) {
      const elapsedMinutes = (Date.now() - startTime) / 60000;
      const words = value.length / 5;
      setWpm(Math.round(words / elapsedMinutes) || 0);
    }

    // Check completion
    if (value === quote.text) {
      setCompleted(true);
      setIsPlaying(false);
      setQuotesCompleted(prev => prev + 1);
    }
  }, [quote, isPlaying, startTime]);

  const renderQuote = () => {
    if (!quote) return null;
    
    return quote.text.split('').map((char, index) => {
      let className = 'quote-char';
      if (index < userInput.length) {
        className += userInput[index] === char ? ' quote-char--correct' : ' quote-char--incorrect';
      } else if (index === userInput.length) {
        className += ' quote-char--current';
      }
      return <span key={index} className={className}>{char}</span>;
    });
  };

  return (
    <div className={`game-page ${settings.darkMode ? 'dark' : ''}`}>
      <div className="game-page__header">
        <h1>📜 Quote Typing</h1>
        <p>Type famous quotes and get inspired</p>
      </div>

      <div className="game-page__controls">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`game-btn ${category === cat.id ? 'game-btn--active' : ''}`}
            onClick={() => setCategory(cat.id)}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      <div className="game-page__stats">
        <div className="stat-box"><span className="stat-label">WPM</span><span className="stat-value">{wpm}</span></div>
        <div className="stat-box"><span className="stat-label">Accuracy</span><span className="stat-value">{accuracy}%</span></div>
        <div className="stat-box"><span className="stat-label">Completed</span><span className="stat-value">{quotesCompleted}</span></div>
      </div>

      <div className="game-page__content">
        <div className="quote-display">
          <p className="quote-text">{renderQuote()}</p>
          {quote && <p className="quote-author">— {quote.author}</p>}
        </div>
        <input
          ref={inputRef}
          type="text"
          className="quote-input"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Start typing the quote..."
          disabled={completed}
          autoFocus
        />
      </div>

      {completed && (
        <div className="game-page__result">
          <h2>✨ Beautiful!</h2>
          <p>WPM: {wpm} | Accuracy: {accuracy}%</p>
          <button className="game-btn game-btn--primary" onClick={loadNewQuote}>Next Quote</button>
        </div>
      )}

      <button className="game-btn" onClick={loadNewQuote}>🔄 Skip Quote</button>
    </div>
  );
};

export default QuoteTypingPage;

