/**
 * Timer Display Component
 * 
 * Displays time in various formats with optional countdown warning
 */

import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import './TimerDisplay.css';

const TimerDisplay = memo(({
  seconds,
  mode = 'countdown', // countdown or stopwatch
  warningThreshold = 10,
  dangerThreshold = 5,
  showMilliseconds = false,
  size = 'medium',
  label,
}) => {
  const formattedTime = useMemo(() => {
    const mins = Math.floor(Math.abs(seconds) / 60);
    const secs = Math.abs(seconds) % 60;
    
    if (showMilliseconds) {
      const ms = Math.floor((Math.abs(seconds) % 1) * 100);
      return `${mins}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
    }
    
    return `${mins}:${Math.floor(secs).toString().padStart(2, '0')}`;
  }, [seconds, showMilliseconds]);

  const status = useMemo(() => {
    if (mode !== 'countdown') return 'normal';
    if (seconds <= dangerThreshold) return 'danger';
    if (seconds <= warningThreshold) return 'warning';
    return 'normal';
  }, [seconds, mode, warningThreshold, dangerThreshold]);

  return (
    <div className={`timer-display timer-display--${size} timer-display--${status}`}>
      {label && <span className="timer-display__label">{label}</span>}
      <span className="timer-display__time">{formattedTime}</span>
      {mode === 'countdown' && status === 'danger' && (
        <span className="timer-display__warning">⚠️</span>
      )}
    </div>
  );
});

TimerDisplay.displayName = 'TimerDisplay';

TimerDisplay.propTypes = {
  seconds: PropTypes.number.isRequired,
  mode: PropTypes.oneOf(['countdown', 'stopwatch']),
  warningThreshold: PropTypes.number,
  dangerThreshold: PropTypes.number,
  showMilliseconds: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  label: PropTypes.string,
};

export default TimerDisplay;

