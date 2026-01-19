import React from 'react';
import PropTypes from 'prop-types';
import './Leaderboard.css';

/**
 * Leaderboard - Displays top scores and personal bests
 */
const Leaderboard = ({ scores, onClose }) => {
  const sortedScores = [...scores].sort((a, b) => b.wpm - a.wpm).slice(0, 10);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getMedalIcon = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };

  return (
    <div className="leaderboard">
      <div className="leaderboard__overlay" onClick={onClose} />
      <div className="leaderboard__content">
        <div className="leaderboard__header">
          <h2 className="leaderboard__title">🏆 Leaderboard</h2>
          <button 
            className="leaderboard__close" 
            onClick={onClose}
            aria-label="Close leaderboard"
          >
            ✕
          </button>
        </div>

        {sortedScores.length === 0 ? (
          <div className="leaderboard__empty">
            <div className="leaderboard__empty-icon">📊</div>
            <p className="leaderboard__empty-text">No scores yet. Complete a race to get started!</p>
          </div>
        ) : (
          <div className="leaderboard__list">
            {sortedScores.map((score, index) => (
              <div 
                key={score.id || index} 
                className={`leaderboard-item ${index < 3 ? 'leaderboard-item--podium' : ''}`}
              >
                <div className="leaderboard-item__rank">
                  {getMedalIcon(index)}
                </div>
                <div className="leaderboard-item__content">
                  <div className="leaderboard-item__main">
                    <div className="leaderboard-item__wpm">
                      <span className="leaderboard-item__wpm-value">{score.wpm}</span>
                      <span className="leaderboard-item__wpm-label">WPM</span>
                    </div>
                    <div className="leaderboard-item__details">
                      <div className="leaderboard-item__stat">
                        <span className="leaderboard-item__stat-label">Accuracy:</span>
                        <span className="leaderboard-item__stat-value">{score.accuracy}%</span>
                      </div>
                      <div className="leaderboard-item__stat">
                        <span className="leaderboard-item__stat-label">Mode:</span>
                        <span className="leaderboard-item__stat-value">{score.mode || 'Classic'}</span>
                      </div>
                      {score.difficulty && (
                        <div className="leaderboard-item__stat">
                          <span className="leaderboard-item__stat-label">Difficulty:</span>
                          <span className="leaderboard-item__stat-value">{score.difficulty}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="leaderboard-item__date">
                    {formatDate(score.timestamp)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="leaderboard__footer">
          <p className="leaderboard__footer-text">
            Keep practicing to improve your ranking! 🚀
          </p>
        </div>
      </div>
    </div>
  );
};

Leaderboard.propTypes = {
  scores: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    wpm: PropTypes.number.isRequired,
    accuracy: PropTypes.number.isRequired,
    mode: PropTypes.string,
    difficulty: PropTypes.string,
    timestamp: PropTypes.number.isRequired
  })).isRequired,
  onClose: PropTypes.func.isRequired
};

export default Leaderboard;

