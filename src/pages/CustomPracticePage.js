/**
 * Custom Practice Page
 * 
 * Create custom typing exercises with your own text
 */

import React, { useState, useCallback, useRef } from 'react';
import { useSettings } from '../context/SettingsContext';
import './GamePage.css';

const PRESETS = [
  { id: 'pangram', name: 'Pangrams', text: 'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.' },
  { id: 'numbers', name: 'Numbers', text: '1234567890 0987654321 1357924680 2468013579 1122334455 6677889900' },
  { id: 'symbols', name: 'Symbols', text: '!@#$%^&*() {}[]|\\:";\'<>,.?/ ~`-_=+ !@#$%^&*()' },
  { id: 'homerow', name: 'Home Row', text: 'asdf jkl; asdf jkl; asdfjkl; fjdk slaf jdks lafa dksl fjak' },
];

const CustomPracticePage = () => {
  const { settings } = useSettings();
  const [customText, setCustomText] = useState('');
  const [practiceText, setPracticeText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [completed, setCompleted] = useState(false);
  const inputRef = useRef(null);

  const startPractice = useCallback((text) => {
    if (!text.trim()) return;
    setPracticeText(text.trim());
    setUserInput('');
    setIsPlaying(false);
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setCompleted(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    
    if (!isPlaying && value.length > 0) {
      setIsPlaying(true);
      setStartTime(Date.now());
    }

    setUserInput(value);

    // Calculate accuracy
    let errors = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== practiceText[i]) errors++;
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
    if (value === practiceText) {
      setCompleted(true);
      setIsPlaying(false);
    }
  }, [practiceText, isPlaying, startTime]);

  const renderText = () => {
    return practiceText.split('').map((char, index) => {
      let className = 'practice-char';
      if (index < userInput.length) {
        className += userInput[index] === char ? ' practice-char--correct' : ' practice-char--incorrect';
      } else if (index === userInput.length) {
        className += ' practice-char--current';
      }
      return <span key={index} className={className}>{char}</span>;
    });
  };

  return (
    <div className={`game-page ${settings.darkMode ? 'dark' : ''}`}>
      <div className="game-page__header">
        <h1>✏️ Custom Practice</h1>
        <p>Practice with your own text or use presets</p>
      </div>

      {!practiceText ? (
        <div className="custom-setup">
          <div className="preset-section">
            <h3>Quick Presets</h3>
            <div className="preset-buttons">
              {PRESETS.map(preset => (
                <button
                  key={preset.id}
                  className="game-btn"
                  onClick={() => startPractice(preset.text)}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          <div className="custom-section">
            <h3>Or Enter Your Own Text</h3>
            <textarea
              className="custom-textarea"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Paste or type any text you want to practice..."
              rows={6}
            />
            <button
              className="game-btn game-btn--primary"
              onClick={() => startPractice(customText)}
              disabled={!customText.trim()}
            >
              Start Practice
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="game-page__stats">
            <div className="stat-box"><span className="stat-label">WPM</span><span className="stat-value">{wpm}</span></div>
            <div className="stat-box"><span className="stat-label">Accuracy</span><span className="stat-value">{accuracy}%</span></div>
            <div className="stat-box"><span className="stat-label">Progress</span><span className="stat-value">{Math.round((userInput.length / practiceText.length) * 100)}%</span></div>
          </div>

          <div className="game-page__content">
            <div className="practice-display">{renderText()}</div>
            <input
              ref={inputRef}
              type="text"
              className="practice-input"
              value={userInput}
              onChange={handleInputChange}
              placeholder="Start typing..."
              disabled={completed}
              autoFocus
            />
          </div>

          {completed && (
            <div className="game-page__result">
              <h2>🎉 Complete!</h2>
              <p>WPM: {wpm} | Accuracy: {accuracy}%</p>
            </div>
          )}

          <div className="game-page__actions">
            <button className="game-btn" onClick={() => startPractice(practiceText)}>🔄 Restart</button>
            <button className="game-btn" onClick={() => setPracticeText('')}>📝 New Text</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomPracticePage;

