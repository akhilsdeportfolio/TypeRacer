import React from 'react';
import PropTypes from 'prop-types';
import Character from '../../atoms/Character';
import { getCharStatus } from '../../../utils/calculations';
import './GameArea.css';

/**
 * GameArea component - Atomic design organism
 * Displays the typing area with characters
 */
const GameArea = ({ 
  targetText,
  userInput,
  onInputChange,
  inputRef,
  disabled = false,
  className = '',
  ...props 
}) => {
  const handleChange = (e) => {
    onInputChange(e.target.value);
  };

  return (
    <div className={`game-area ${className}`.trim()} {...props}>
      <div className="game-area__content">
        {targetText.split('').map((char, index) => {
          const status = getCharStatus(userInput, targetText, index);
          const isCursor = index === userInput.length;
          
          return (
            <Character
              key={index}
              char={char}
              status={status}
              isCursor={isCursor}
            />
          );
        })}
      </div>
      
      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={handleChange}
        disabled={disabled}
        className="game-area__input"
        placeholder="Start typing to begin..."
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />
    </div>
  );
};

GameArea.propTypes = {
  targetText: PropTypes.string.isRequired,
  userInput: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  inputRef: PropTypes.object,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default GameArea;

