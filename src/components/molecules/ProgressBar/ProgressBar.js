import React from 'react';
import PropTypes from 'prop-types';
import './ProgressBar.css';

/**
 * ProgressBar component - Atomic design molecule
 * Displays progress with percentage
 */
const ProgressBar = ({ 
  progress = 0, 
  showLabel = true,
  variant = 'default',
  className = '',
  ...props 
}) => {
  const barClass = `progress-bar progress-bar--${variant} ${className}`.trim();
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={barClass} {...props}>
      {showLabel && (
        <div className="progress-bar__label">
          Progress: {clampedProgress}%
        </div>
      )}
      <div className="progress-bar__track">
        <div 
          className="progress-bar__fill" 
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number,
  showLabel: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'success', 'warning']),
  className: PropTypes.string,
};

export default ProgressBar;

