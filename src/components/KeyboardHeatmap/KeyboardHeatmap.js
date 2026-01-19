/**
 * Keyboard Heatmap Component
 * 
 * Visualizes typing accuracy/speed per key
 */

import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import './KeyboardHeatmap.css';

const KEYBOARD_LAYOUT = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
  ['space'],
];

const KeyboardHeatmap = memo(({
  keyStats = {},
  mode = 'accuracy', // 'accuracy' or 'speed'
  showLabels = true,
}) => {
  const getKeyColor = useMemo(() => {
    return (key) => {
      const stats = keyStats[key.toLowerCase()];
      if (!stats) return 'rgba(255, 255, 255, 0.1)';
      
      let value;
      if (mode === 'accuracy') {
        value = stats.accuracy || 0;
        // Green for high accuracy, red for low
        if (value >= 95) return 'rgba(16, 185, 129, 0.6)';
        if (value >= 85) return 'rgba(52, 211, 153, 0.5)';
        if (value >= 75) return 'rgba(251, 191, 36, 0.5)';
        if (value >= 60) return 'rgba(249, 115, 22, 0.5)';
        return 'rgba(239, 68, 68, 0.5)';
      } else {
        // Speed mode - based on average time per key
        value = stats.avgTime || 0;
        if (value <= 100) return 'rgba(16, 185, 129, 0.6)';
        if (value <= 150) return 'rgba(52, 211, 153, 0.5)';
        if (value <= 200) return 'rgba(251, 191, 36, 0.5)';
        if (value <= 300) return 'rgba(249, 115, 22, 0.5)';
        return 'rgba(239, 68, 68, 0.5)';
      }
    };
  }, [keyStats, mode]);

  const getKeyLabel = (key) => {
    const stats = keyStats[key.toLowerCase()];
    if (!stats || !showLabels) return null;
    
    if (mode === 'accuracy') {
      return `${stats.accuracy}%`;
    }
    return `${stats.avgTime}ms`;
  };

  return (
    <div className="keyboard-heatmap">
      <div className="keyboard-heatmap__legend">
        <span className="legend-label">
          {mode === 'accuracy' ? 'Accuracy' : 'Speed'}
        </span>
        <div className="legend-scale">
          <span className="legend-low">
            {mode === 'accuracy' ? 'Low' : 'Slow'}
          </span>
          <div className="legend-gradient" />
          <span className="legend-high">
            {mode === 'accuracy' ? 'High' : 'Fast'}
          </span>
        </div>
      </div>

      <div className="keyboard-heatmap__keyboard">
        {KEYBOARD_LAYOUT.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.map((key) => (
              <div
                key={key}
                className={`keyboard-key ${key === 'space' ? 'keyboard-key--space' : ''}`}
                style={{ backgroundColor: getKeyColor(key) }}
                title={`${key.toUpperCase()}: ${getKeyLabel(key) || 'No data'}`}
              >
                <span className="key-char">
                  {key === 'space' ? 'Space' : key.toUpperCase()}
                </span>
                {showLabels && keyStats[key.toLowerCase()] && (
                  <span className="key-stat">{getKeyLabel(key)}</span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});

KeyboardHeatmap.displayName = 'KeyboardHeatmap';

KeyboardHeatmap.propTypes = {
  keyStats: PropTypes.objectOf(PropTypes.shape({
    accuracy: PropTypes.number,
    avgTime: PropTypes.number,
    totalPresses: PropTypes.number,
  })),
  mode: PropTypes.oneOf(['accuracy', 'speed']),
  showLabels: PropTypes.bool,
};

export default KeyboardHeatmap;

