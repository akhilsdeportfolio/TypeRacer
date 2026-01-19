/**
 * DailyChallengePage - New challenge every day
 */

import React, { useState, useCallback, useMemo } from 'react';
import { useSettings } from '../context/SettingsContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useSound } from '../hooks/useSound';
import { useGameState } from '../hooks/useGameState';
import { useTimer } from '../hooks/useTimer';
import './GamePage.css';

// Generate daily challenge based on date
const getDailyChallenge = () => {
  const today = new Date().toISOString().split('T')[0];
  const challenges = [
    { text: "Practice makes perfect. Every keystroke brings you closer to mastery.", time: 30, goal: 40 },
    { text: "The quick brown fox jumps over the lazy dog near the riverbank.", time: 25, goal: 45 },
    { text: "Success is not final, failure is not fatal: courage continues.", time: 30, goal: 50 },
    { text: "Type fast, think faster. Your fingers are extensions of your mind.", time: 20, goal: 55 },
    { text: "Every expert was once a beginner. Keep practicing your typing skills.", time: 25, goal: 42 },
    { text: "Accuracy beats speed. Master precision before pushing your limits.", time: 30, goal: 38 },
    { text: "Challenge yourself daily. Small improvements lead to big results.", time: 25, goal: 48 },
  ];
  // Use date to pick challenge
  const dayIndex = today.split('-').reduce((a, b) => parseInt(a) + parseInt(b), 0) % challenges.length;
  return { ...challenges[dayIndex], date: today };
};

const DailyChallengePage = () => {
  const { soundEnabled, darkMode } = useSettings();
  const sound = useSound(soundEnabled);
  const [dailyStats, setDailyStats] = useLocalStorage('typeracer-daily', {});
  
  const challenge = useMemo(() => getDailyChallenge(), []);
  const todayCompleted = dailyStats[challenge.date]?.completed;
  const todayBest = dailyStats[challenge.date]?.bestWPM || 0;
  
  const [streak] = useLocalStorage('typeracer-daily-streak', 0);
  
  const { 
    gameStatus, userInput, stats, 
    startGame, handleInputChange, finishGame, resetGame, isPlaying, isFinished 
  } = useGameState(challenge.text);
  
  const { timeLeft, startTimer, resetTimer } = useTimer({
    allowedTime: challenge.time,
    onFinish: finishGame,
  });

  const handleStart = useCallback(() => {
    startGame();
    startTimer();
  }, [startGame, startTimer]);

  const handleRestart = useCallback(() => {
    resetGame();
    resetTimer();
  }, [resetGame, resetTimer]);

  const handleInput = useCallback((e) => {
    const value = e.target.value;
    
    if (!isPlaying && value.length === 1) {
      handleStart();
    }
    
    handleInputChange(value);
    
    // Check completion
    if (value === challenge.text) {
      finishGame();
      sound.playComplete();
      
      // Save daily stats
      setDailyStats(prev => ({
        ...prev,
        [challenge.date]: {
          completed: true,
          bestWPM: Math.max(prev[challenge.date]?.bestWPM || 0, stats.wpm),
          attempts: (prev[challenge.date]?.attempts || 0) + 1,
        }
      }));
    }
  }, [isPlaying, handleStart, handleInputChange, challenge, finishGame, sound, setDailyStats, stats.wpm]);

  const goalMet = stats.wpm >= challenge.goal;

  return (
    <div className={`game-page ${darkMode ? 'dark' : ''}`}>
      <div className="game-page__header">
        <h1>📅 Daily Challenge</h1>
        <p>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
      </div>

      <div className="game-page__setup" style={{ marginBottom: '1.5rem' }}>
        <div className="game-page__stats-bar">
          <div className="game-page__stat">🔥 {streak} Day Streak</div>
          <div className="game-page__stat">🎯 Goal: {challenge.goal} WPM</div>
          <div className="game-page__stat">⏱️ {challenge.time}s</div>
          {todayBest > 0 && <div className="game-page__stat">🏆 Best: {todayBest} WPM</div>}
        </div>
      </div>

      {!isPlaying && !isFinished && (
        <div className="game-page__setup">
          {todayCompleted ? (
            <>
              <h2>✅ Challenge Completed!</h2>
              <p style={{ opacity: 0.8, marginBottom: '1.5rem' }}>
                You've completed today's challenge. Best WPM: {todayBest}
              </p>
              <button className="game-page__start-btn" onClick={handleStart}>
                Practice Again 🔄
              </button>
            </>
          ) : (
            <>
              <h2>Today's Challenge</h2>
              <p style={{ opacity: 0.8, marginBottom: '1.5rem' }}>
                Type the text below with at least {challenge.goal} WPM
              </p>
              <button className="game-page__start-btn" onClick={handleStart}>
                Start Challenge 🚀
              </button>
            </>
          )}
        </div>
      )}

      {(isPlaying || isFinished) && (
        <div className="game-page__playing">
          <div className="game-page__stats-bar">
            <div className="game-page__stat">⏱️ {timeLeft}s</div>
            <div className="game-page__stat">⌨️ {stats.wpm} WPM</div>
            <div className="game-page__stat">🎯 {stats.accuracy}%</div>
            <div className="game-page__stat">📝 {stats.progress}%</div>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '15px', marginBottom: '1.5rem', fontFamily: 'monospace', fontSize: '1.2rem', lineHeight: 2 }}>
            {challenge.text.split('').map((char, i) => (
              <span key={i} style={{ 
                color: i < userInput.length 
                  ? (userInput[i] === char ? '#10b981' : '#ef4444')
                  : i === userInput.length ? 'white' : 'rgba(255,255,255,0.4)',
                backgroundColor: i === userInput.length ? 'rgba(255,255,255,0.3)' : 'transparent',
                textDecoration: i < userInput.length && userInput[i] !== char ? 'underline' : 'none'
              }}>{char}</span>
            ))}
          </div>

          {!isFinished && (
            <input type="text" value={userInput} onChange={handleInput}
              className="game-page__input" placeholder="Start typing..." autoFocus />
          )}

          {isFinished && (
            <div className="game-page__results">
              <h2>{goalMet ? '🎉 Goal Met!' : '💪 Keep Practicing!'}</h2>
              <div className="game-page__final-stats">
                <div className="game-page__final-stat">
                  <span className="game-page__final-value">{stats.wpm}</span>
                  <span className="game-page__final-label">WPM</span>
                </div>
                <div className="game-page__final-stat">
                  <span className="game-page__final-value">{stats.accuracy}%</span>
                  <span className="game-page__final-label">Accuracy</span>
                </div>
              </div>
              <button className="game-page__start-btn" onClick={handleRestart}>
                Try Again 🔄
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DailyChallengePage;

