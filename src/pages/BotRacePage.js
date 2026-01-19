/**
 * BotRacePage - Race against AI opponents
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useSettings } from '../context/SettingsContext';
import { useSound } from '../hooks/useSound';
import { PARAGRAPHS } from '../constants';
import './GamePage.css';

const BOTS = [
  { name: '🤖 EasyBot', wpm: 25, color: 'bot1' },
  { name: '🦾 MediumBot', wpm: 45, color: 'bot2' },
  { name: '🧠 HardBot', wpm: 70, color: 'bot3' },
];

const BotRacePage = () => {
  const { soundEnabled, darkMode } = useSettings();
  const sound = useSound(soundEnabled);
  const inputRef = useRef(null);
  
  const [selectedBots, setSelectedBots] = useState([0, 1]); // indices
  const [targetText, setTargetText] = useState(PARAGRAPHS.EASY);
  const [userInput, setUserInput] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [playerProgress, setPlayerProgress] = useState(0);
  const [botProgress, setBotProgress] = useState([0, 0, 0]);
  const [winner, setWinner] = useState(null);
  const [playerWPM, setPlayerWPM] = useState(0);

  const startGame = useCallback(() => {
    setUserInput('');
    setPlayerProgress(0);
    setBotProgress([0, 0, 0]);
    setWinner(null);
    setPlayerWPM(0);
    setIsPlaying(true);
    setGameOver(false);
    setStartTime(Date.now());
    inputRef.current?.focus();
  }, []);

  // Bot simulation
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setBotProgress(prev => {
        const newProgress = [...prev];
        selectedBots.forEach(botIdx => {
          const bot = BOTS[botIdx];
          // Characters per second = WPM * 5 / 60
          const cps = (bot.wpm * 5) / 60;
          const increment = (cps / 10) / targetText.length * 100; // per 100ms
          newProgress[botIdx] = Math.min(100, prev[botIdx] + increment + (Math.random() * 0.5 - 0.25));
          
          if (newProgress[botIdx] >= 100 && !winner) {
            setWinner(bot.name);
            setIsPlaying(false);
            setGameOver(true);
          }
        });
        return newProgress;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, [isPlaying, selectedBots, targetText.length, winner]);

  // Calculate player WPM
  useEffect(() => {
    if (!startTime || !isPlaying) return;
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000 / 60; // minutes
      const words = userInput.length / 5;
      setPlayerWPM(Math.round(words / elapsed) || 0);
    }, 500);
    return () => clearInterval(interval);
  }, [startTime, userInput, isPlaying]);

  const handleInput = useCallback((e) => {
    const value = e.target.value;
    if (value.length > targetText.length) return;
    
    setUserInput(value);
    const progress = (value.length / targetText.length) * 100;
    setPlayerProgress(progress);
    
    // Check if last char is correct
    if (value.length > 0) {
      const lastIdx = value.length - 1;
      if (value[lastIdx] === targetText[lastIdx]) {
        sound.playCorrect();
      } else {
        sound.playIncorrect();
      }
    }
    
    // Check win
    if (value === targetText) {
      setWinner('🏆 You');
      setIsPlaying(false);
      setGameOver(true);
      sound.playComplete();
    }
  }, [targetText, sound]);

  const toggleBot = (idx) => {
    setSelectedBots(prev => 
      prev.includes(idx) 
        ? prev.filter(i => i !== idx)
        : [...prev, idx]
    );
  };

  return (
    <div className={`game-page ${darkMode ? 'dark' : ''}`}>
      <div className="game-page__header">
        <h1>🤖 Bot Race</h1>
        <p>Race against AI opponents!</p>
      </div>

      {!isPlaying && !gameOver && (
        <div className="game-page__setup">
          <h2>Select Opponents</h2>
          <div className="game-page__difficulty">
            {BOTS.map((bot, idx) => (
              <button key={idx}
                className={`game-page__diff-btn ${selectedBots.includes(idx) ? 'active' : ''}`}
                onClick={() => toggleBot(idx)}>
                {bot.name} ({bot.wpm} WPM)
              </button>
            ))}
          </div>
          <button className="game-page__start-btn" onClick={startGame}
            disabled={selectedBots.length === 0}>
            Start Race 🏁
          </button>
        </div>
      )}

      {(isPlaying || gameOver) && (
        <div className="game-page__playing">
          <div className="game-page__stats-bar">
            <div className="game-page__stat">⌨️ {playerWPM} WPM</div>
            <div className="game-page__stat">📝 {Math.round(playerProgress)}%</div>
          </div>

          <div className="game-page__race-track">
            <div className="game-page__racer">
              <span className="game-page__racer-name">🏃 You</span>
              <div className="game-page__racer-progress">
                <div className="game-page__racer-bar player" style={{ width: `${playerProgress}%` }} />
              </div>
            </div>
            {selectedBots.map(idx => (
              <div key={idx} className="game-page__racer">
                <span className="game-page__racer-name">{BOTS[idx].name}</span>
                <div className="game-page__racer-progress">
                  <div className={`game-page__racer-bar ${BOTS[idx].color}`} 
                    style={{ width: `${botProgress[idx]}%` }} />
                </div>
              </div>
            ))}
          </div>

          {!gameOver && (
            <>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '10px', marginBottom: '1rem', fontFamily: 'monospace', lineHeight: 1.8 }}>
                {targetText.split('').map((char, i) => (
                  <span key={i} style={{ 
                    color: i < userInput.length 
                      ? (userInput[i] === char ? '#10b981' : '#ef4444')
                      : 'rgba(255,255,255,0.5)'
                  }}>{char}</span>
                ))}
              </div>
              <input ref={inputRef} type="text" value={userInput} onChange={handleInput}
                className="game-page__input" autoFocus />
            </>
          )}

          {gameOver && (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{winner} Wins!</h2>
              <p>Your WPM: {playerWPM}</p>
              <button className="game-page__start-btn" onClick={startGame} style={{ marginTop: '1.5rem' }}>
                Race Again 🔄
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BotRacePage;

