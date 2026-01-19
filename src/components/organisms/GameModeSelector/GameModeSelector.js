import React from 'react';
import PropTypes from 'prop-types';
import { GAME_MODES } from '../../../constants';
import './GameModeSelector.css';

/**
 * GameModeSelector - Allows users to select different game modes
 */
const GameModeSelector = ({ currentMode, onModeChange }) => {
  return (
    <div className="game-mode-selector">
      <h3 className="game-mode-selector__title">Select Game Mode</h3>
      <div className="game-mode-selector__grid">
        {Object.values(GAME_MODES).map((mode) => (
          <button
            key={mode.id}
            className={`game-mode-card ${currentMode === mode.id ? 'game-mode-card--active' : ''}`}
            onClick={() => onModeChange(mode.id)}
          >
            <div className="game-mode-card__icon">{mode.icon}</div>
            <div className="game-mode-card__content">
              <h4 className="game-mode-card__name">{mode.name}</h4>
              <p className="game-mode-card__description">{mode.description}</p>
            </div>
            {currentMode === mode.id && (
              <div className="game-mode-card__badge">Active</div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

GameModeSelector.propTypes = {
  currentMode: PropTypes.string.isRequired,
  onModeChange: PropTypes.func.isRequired
};

export default GameModeSelector;

