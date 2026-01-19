/**
 * Streak Counter Component
 * 
 * Displays current streak with fire animation
 */

import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import './StreakCounter.css';

const StreakCounter = memo(({
  streak = 0,
  maxStreak = 0,
  label = 'Streak',
  showMax = true,
  animated = true,
}) => {
  const fireLevel = useMemo(() => {
    if (streak >= 50) return 'legendary';
    if (streak >= 25) return 'epic';
    if (streak >= 10) return 'hot';
    if (streak >= 5) return 'warm';
    return 'cold';
  }, [streak]);

  const fireEmoji = useMemo(() => {
    if (streak >= 50) return '🔥💎';
    if (streak >= 25) return '🔥🔥';
    if (streak >= 10) return '🔥';
    if (streak >= 5) return '✨';
    return '❄️';
  }, [streak]);

  return (
    <div className={`streak-counter streak-counter--${fireLevel} ${animated ? 'streak-counter--animated' : ''}`}>
      <div className="streak-counter__fire">
        {fireEmoji}
      </div>
      
      <div className="streak-counter__content">
        <span className="streak-counter__label">{label}</span>
        <span className="streak-counter__value">{streak}</span>
      </div>

      {showMax && maxStreak > 0 && (
        <div className="streak-counter__max">
          Best: {maxStreak}
        </div>
      )}

      {streak >= 5 && (
        <div className="streak-counter__message">
          {streak >= 50 && 'LEGENDARY!'}
          {streak >= 25 && streak < 50 && 'ON FIRE!'}
          {streak >= 10 && streak < 25 && 'Hot streak!'}
          {streak >= 5 && streak < 10 && 'Keep going!'}
        </div>
      )}
    </div>
  );
});

StreakCounter.displayName = 'StreakCounter';

StreakCounter.propTypes = {
  streak: PropTypes.number,
  maxStreak: PropTypes.number,
  label: PropTypes.string,
  showMax: PropTypes.bool,
  animated: PropTypes.bool,
};

export default StreakCounter;

