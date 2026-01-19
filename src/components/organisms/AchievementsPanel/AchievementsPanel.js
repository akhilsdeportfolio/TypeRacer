import React from 'react';
import PropTypes from 'prop-types';
import { ACHIEVEMENTS } from '../../../constants';
import './AchievementsPanel.css';

/**
 * AchievementsPanel - Displays unlocked and locked achievements
 */
const AchievementsPanel = ({ unlockedAchievements, onClose }) => {
  const isUnlocked = (achievementId) => unlockedAchievements.includes(achievementId);

  return (
    <div className="achievements-panel">
      <div className="achievements-panel__overlay" onClick={onClose} />
      <div className="achievements-panel__content">
        <div className="achievements-panel__header">
          <h2 className="achievements-panel__title">🏆 Achievements</h2>
          <button 
            className="achievements-panel__close" 
            onClick={onClose}
            aria-label="Close achievements"
          >
            ✕
          </button>
        </div>

        <div className="achievements-panel__stats">
          <div className="achievements-panel__stat">
            <span className="achievements-panel__stat-value">
              {unlockedAchievements.length}
            </span>
            <span className="achievements-panel__stat-label">Unlocked</span>
          </div>
          <div className="achievements-panel__stat">
            <span className="achievements-panel__stat-value">
              {ACHIEVEMENTS.length}
            </span>
            <span className="achievements-panel__stat-label">Total</span>
          </div>
          <div className="achievements-panel__stat">
            <span className="achievements-panel__stat-value">
              {Math.round((unlockedAchievements.length / ACHIEVEMENTS.length) * 100)}%
            </span>
            <span className="achievements-panel__stat-label">Complete</span>
          </div>
        </div>

        <div className="achievements-panel__grid">
          {ACHIEVEMENTS.map((achievement) => {
            const unlocked = isUnlocked(achievement.id);
            return (
              <div
                key={achievement.id}
                className={`achievement-card ${unlocked ? 'achievement-card--unlocked' : 'achievement-card--locked'}`}
              >
                <div className="achievement-card__icon">
                  {unlocked ? achievement.icon : '🔒'}
                </div>
                <div className="achievement-card__content">
                  <h3 className="achievement-card__name">
                    {unlocked ? achievement.name : '???'}
                  </h3>
                  <p className="achievement-card__description">
                    {unlocked ? achievement.description : 'Complete challenges to unlock'}
                  </p>
                  {unlocked && (
                    <div className="achievement-card__badge">
                      <span className="achievement-card__badge-text">Unlocked!</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

AchievementsPanel.propTypes = {
  unlockedAchievements: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClose: PropTypes.func.isRequired
};

export default AchievementsPanel;

