import { useState, useEffect, useCallback } from 'react';

/**
 * useWPMTracking - Hook for tracking WPM over time
 */
export const useWPMTracking = (gameStatus, userInput, startTime) => {
  const [wpmHistory, setWpmHistory] = useState([]);
  const [currentWPM, setCurrentWPM] = useState(0);

  const calculateWPM = useCallback(() => {
    if (!startTime || userInput.length === 0) return 0;

    const now = Date.now();
    const timeElapsed = (now - startTime) / 1000 / 60; // in minutes
    
    if (timeElapsed === 0) return 0;

    const wordsTyped = userInput.length / 5; // Standard: 5 characters = 1 word
    const wpm = Math.round(wordsTyped / timeElapsed);

    return Math.max(0, wpm);
  }, [userInput, startTime]);

  useEffect(() => {
    if (gameStatus !== 'RUNNING' && gameStatus !== 'PLAYING') {
      setWpmHistory([]);
      setCurrentWPM(0);
      return;
    }

    const interval = setInterval(() => {
      const wpm = calculateWPM();
      setCurrentWPM(wpm);
      setWpmHistory(prev => {
        const newHistory = [...prev, wpm];
        // Keep last 60 data points (1 minute of data at 1 second intervals)
        return newHistory.slice(-60);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStatus, calculateWPM]);

  return {
    wpmHistory,
    currentWPM
  };
};

