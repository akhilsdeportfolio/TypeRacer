/**
 * Game Result Modal Component
 * 
 * Displays game results with stats and actions
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import './GameResultModal.css';

const GameResultModal = memo(({
  isOpen,
  onClose,
  onPlayAgain,
  onShare,
  stats = {},
  title = 'Game Complete!',
  message,
}) => {
  const { wpm = 0, accuracy = 0, time = 0, score = 0, isNewRecord = false } = stats;

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getPerformanceEmoji = () => {
    if (wpm >= 100) return '🏆';
    if (wpm >= 80) return '🥇';
    if (wpm >= 60) return '🥈';
    if (wpm >= 40) return '🥉';
    return '👍';
  };

  const getPerformanceMessage = () => {
    if (wpm >= 100) return 'Incredible speed!';
    if (wpm >= 80) return 'Excellent typing!';
    if (wpm >= 60) return 'Great job!';
    if (wpm >= 40) return 'Good effort!';
    return 'Keep practicing!';
  };

  return (
    <div className="game-result-overlay" onClick={onClose}>
      <div className="game-result-modal" onClick={(e) => e.stopPropagation()}>
        {isNewRecord && (
          <div className="game-result-modal__record">
            🎉 NEW RECORD! 🎉
          </div>
        )}

        <div className="game-result-modal__header">
          <span className="game-result-modal__emoji">{getPerformanceEmoji()}</span>
          <h2 className="game-result-modal__title">{title}</h2>
          <p className="game-result-modal__message">{message || getPerformanceMessage()}</p>
        </div>

        <div className="game-result-modal__stats">
          <div className="result-stat">
            <span className="result-stat__value">{wpm}</span>
            <span className="result-stat__label">WPM</span>
          </div>
          <div className="result-stat">
            <span className="result-stat__value">{accuracy}%</span>
            <span className="result-stat__label">Accuracy</span>
          </div>
          <div className="result-stat">
            <span className="result-stat__value">{time}s</span>
            <span className="result-stat__label">Time</span>
          </div>
          {score > 0 && (
            <div className="result-stat result-stat--score">
              <span className="result-stat__value">{score}</span>
              <span className="result-stat__label">Score</span>
            </div>
          )}
        </div>

        <div className="game-result-modal__actions">
          <button className="result-btn result-btn--primary" onClick={onPlayAgain}>
            🔄 Play Again
          </button>
          {onShare && (
            <button className="result-btn result-btn--secondary" onClick={onShare}>
              📤 Share
            </button>
          )}
          <button className="result-btn" onClick={onClose}>
            ✕ Close
          </button>
        </div>
      </div>
    </div>
  );
});

GameResultModal.displayName = 'GameResultModal';

GameResultModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  onPlayAgain: PropTypes.func,
  onShare: PropTypes.func,
  stats: PropTypes.shape({
    wpm: PropTypes.number,
    accuracy: PropTypes.number,
    time: PropTypes.number,
    score: PropTypes.number,
    isNewRecord: PropTypes.bool,
  }),
  title: PropTypes.string,
  message: PropTypes.string,
};

export default GameResultModal;

