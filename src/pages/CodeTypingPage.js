/**
 * Code Typing Page
 * 
 * Practice typing code snippets in various programming languages
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useSettings } from '../context/SettingsContext';
import { CODE_SNIPPETS } from '../data/wordLists';
import './GamePage.css';

const LANGUAGES = [
  { id: 'javascript', name: 'JavaScript', icon: '🟨' },
  { id: 'python', name: 'Python', icon: '🐍' },
  { id: 'html', name: 'HTML', icon: '🌐' },
  { id: 'css', name: 'CSS', icon: '🎨' },
];

const CodeTypingPage = () => {
  const { settings } = useSettings();
  const [language, setLanguage] = useState('javascript');
  const [currentSnippet, setCurrentSnippet] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [completed, setCompleted] = useState(false);
  const [errors, setErrors] = useState(0);
  const inputRef = useRef(null);

  const getRandomSnippet = useCallback((lang) => {
    const snippets = CODE_SNIPPETS[lang] || CODE_SNIPPETS.javascript;
    return snippets[Math.floor(Math.random() * snippets.length)];
  }, []);

  const startGame = useCallback(() => {
    const snippet = getRandomSnippet(language);
    setCurrentSnippet(snippet);
    setUserInput('');
    setIsPlaying(true);
    setStartTime(Date.now());
    setWpm(0);
    setAccuracy(100);
    setCompleted(false);
    setErrors(0);
    inputRef.current?.focus();
  }, [language, getRandomSnippet]);

  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    setUserInput(value);

    // Calculate accuracy
    let errorCount = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== currentSnippet[i]) {
        errorCount++;
      }
    }
    setErrors(errorCount);
    const acc = value.length > 0 ? Math.round(((value.length - errorCount) / value.length) * 100) : 100;
    setAccuracy(acc);

    // Calculate WPM
    const elapsedMinutes = (Date.now() - startTime) / 60000;
    const words = value.length / 5;
    setWpm(Math.round(words / elapsedMinutes) || 0);

    // Check completion
    if (value === currentSnippet) {
      setCompleted(true);
      setIsPlaying(false);
    }
  }, [currentSnippet, startTime]);

  useEffect(() => {
    startGame();
  }, [language]);

  const renderCode = () => {
    return currentSnippet.split('').map((char, index) => {
      let className = 'code-char';
      if (index < userInput.length) {
        className += userInput[index] === char ? ' code-char--correct' : ' code-char--incorrect';
      } else if (index === userInput.length) {
        className += ' code-char--current';
      }
      return (
        <span key={index} className={className}>
          {char === ' ' ? '\u00A0' : char === '\n' ? '↵\n' : char}
        </span>
      );
    });
  };

  return (
    <div className={`game-page ${settings.darkMode ? 'dark' : ''}`}>
      <div className="game-page__header">
        <h1>💻 Code Typing</h1>
        <p>Practice typing real code snippets</p>
      </div>

      <div className="game-page__controls">
        {LANGUAGES.map(lang => (
          <button
            key={lang.id}
            className={`game-btn ${language === lang.id ? 'game-btn--active' : ''}`}
            onClick={() => setLanguage(lang.id)}
          >
            {lang.icon} {lang.name}
          </button>
        ))}
      </div>

      <div className="game-page__stats">
        <div className="stat-box"><span className="stat-label">WPM</span><span className="stat-value">{wpm}</span></div>
        <div className="stat-box"><span className="stat-label">Accuracy</span><span className="stat-value">{accuracy}%</span></div>
        <div className="stat-box"><span className="stat-label">Errors</span><span className="stat-value">{errors}</span></div>
      </div>

      <div className="game-page__content">
        <pre className="code-display">{renderCode()}</pre>
        <textarea
          ref={inputRef}
          className="code-input"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Start typing the code..."
          disabled={completed}
          spellCheck={false}
        />
      </div>

      {completed && (
        <div className="game-page__result">
          <h2>🎉 Completed!</h2>
          <p>WPM: {wpm} | Accuracy: {accuracy}%</p>
          <button className="game-btn game-btn--primary" onClick={startGame}>Try Another</button>
        </div>
      )}

      <button className="game-btn" onClick={startGame}>🔄 New Snippet</button>
    </div>
  );
};

export default CodeTypingPage;

