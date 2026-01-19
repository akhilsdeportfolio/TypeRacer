/**
 * Achievement Badge Component
 * 
 * Displays an achievement with icon, name, and unlock status
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './AchievementBadge.css';

const AchievementBadge = memo(({
  achievement,
  unlocked = false,
  showDetails = true,
  size = 'medium',
  onClick,
}) => {
  const { id, name, description, icon, points, category } = achievement;

  return (
    <div
      className={`achievement-badge achievement-badge--${size} ${unlocked ? 'achievement-badge--unlocked' : 'achievement-badge--locked'}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="achievement-badge__icon">
        {unlocked ? icon : '🔒'}
      </div>
      
      {showDetails && (
        <div className="achievement-badge__content">
          <h4 className="achievement-badge__name">{name}</h4>
          <p className="achievement-badge__description">{description}</p>
          <div className="achievement-badge__meta">
            <span className="achievement-badge__points">+{points} pts</span>
            <span className="achievement-badge__category">{category}</span>
          </div>
        </div>
      )}

      {unlocked && (
        <div className="achievement-badge__checkmark">✓</div>
      )}
    </div>
  );
});

AchievementBadge.displayName = 'AchievementBadge';

AchievementBadge.propTypes = {
  achievement: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
  unlocked: PropTypes.bool,
  showDetails: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onClick: PropTypes.func,
};

export default AchievementBadge;

