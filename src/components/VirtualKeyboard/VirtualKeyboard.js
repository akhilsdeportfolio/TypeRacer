/**
 * VirtualKeyboard - Visual keyboard with key highlighting
 */

import React, { useState, useEffect, useCallback, memo } from 'react';
import './VirtualKeyboard.css';

const KEYBOARD_ROWS = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
  ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
  ['Ctrl', 'Alt', 'Space', 'Alt', 'Ctrl'],
];

// Home row keys for highlighting
const HOME_ROW = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'];
const LEFT_HAND = ['q', 'w', 'e', 'r', 't', 'a', 's', 'd', 'f', 'g', 'z', 'x', 'c', 'v', 'b'];

const getKeyClass = (key, activeKey, nextKey, keyStats) => {
  const classes = ['vk-key'];
  
  // Size classes
  if (key === 'Backspace' || key === 'Tab') classes.push('vk-key--wide');
  if (key === 'Caps' || key === 'Enter') classes.push('vk-key--wide');
  if (key === 'Shift') classes.push('vk-key--extra-wide');
  if (key === 'Space') classes.push('vk-key--space');
  if (key === 'Ctrl' || key === 'Alt') classes.push('vk-key--medium');
  
  // State classes
  if (activeKey === key.toLowerCase() || (key === 'Space' && activeKey === ' ')) {
    classes.push('vk-key--active');
  }
  if (nextKey === key.toLowerCase() || (key === 'Space' && nextKey === ' ')) {
    classes.push('vk-key--next');
  }
  if (HOME_ROW.includes(key.toLowerCase())) {
    classes.push('vk-key--home');
  }
  
  // Heatmap based on error rate
  if (keyStats && keyStats[key.toLowerCase()]) {
    const errorRate = keyStats[key.toLowerCase()].errors / keyStats[key.toLowerCase()].total;
    if (errorRate > 0.2) classes.push('vk-key--error-high');
    else if (errorRate > 0.1) classes.push('vk-key--error-medium');
  }
  
  // Hand indicator
  if (LEFT_HAND.includes(key.toLowerCase())) {
    classes.push('vk-key--left');
  }
  
  return classes.join(' ');
};

const VirtualKeyboard = memo(({ activeKey = '', nextKey = '', showHeatmap = false, keyStats = {} }) => {
  const [pressedKeys, setPressedKeys] = useState(new Set());

  const handleKeyDown = useCallback((e) => {
    setPressedKeys(prev => new Set([...prev, e.key.toLowerCase()]));
  }, []);

  const handleKeyUp = useCallback((e) => {
    setPressedKeys(prev => {
      const next = new Set(prev);
      next.delete(e.key.toLowerCase());
      return next;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return (
    <div className="virtual-keyboard">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="vk-row">
          {row.map((key, keyIndex) => (
            <div
              key={`${rowIndex}-${keyIndex}`}
              className={getKeyClass(key, activeKey, nextKey, showHeatmap ? keyStats : null)}
              data-pressed={pressedKeys.has(key.toLowerCase()) || undefined}
            >
              {key === 'Space' ? '' : key}
            </div>
          ))}
        </div>
      ))}
      <div className="vk-legend">
        <span className="vk-legend-item"><span className="vk-dot vk-dot--home"></span> Home Row</span>
        <span className="vk-legend-item"><span className="vk-dot vk-dot--next"></span> Next Key</span>
        {showHeatmap && (
          <span className="vk-legend-item"><span className="vk-dot vk-dot--error"></span> Error Prone</span>
        )}
      </div>
    </div>
  );
});

VirtualKeyboard.displayName = 'VirtualKeyboard';

export default VirtualKeyboard;

