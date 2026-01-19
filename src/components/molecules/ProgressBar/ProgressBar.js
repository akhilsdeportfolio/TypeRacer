import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import './ProgressBar.css';

/**
 * ProgressBar component - Atomic design molecule
 * Displays progress with percentage
 * Memoized to prevent unnecessary re-renders
 */
const ProgressBar = memo(({
  progress = 0,
  showLabel = true,
  variant = 'default',
  className = '',
  ...props
}) => {
  const barClass = `progress-bar progress-bar--${variant} ${className}`.trim();

  // Memoize progress calculation to avoid recalculation on every render
  const clampedProgress = useMemo(() =>
    Math.min(100, Math.max(0, Math.round(progress))),
    [progress]
  );

  // Memoize style object to prevent unnecessary re-renders
  const fillStyle = useMemo(() =>
    ({ width: `${clampedProgress}%` }),
    [clampedProgress]
  );

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
          style={fillStyle}
        />
      </div>
    </div>
  );
});

ProgressBar.displayName = 'ProgressBar';

ProgressBar.propTypes = {
  progress: PropTypes.number,
  showLabel: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'success', 'warning']),
  className: PropTypes.string,
};

export default ProgressBar;

