import React, { memo, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import Character from '../../atoms/Character';
import { getCharStatus } from '../../../utils/calculations';
import './GameArea.css';

/**
 * GameArea component - Atomic design organism
 * Displays the typing area with characters
 * Memoized with optimized character rendering
 */
const GameArea = memo(({
  targetText,
  userInput,
  onInputChange,
  inputRef,
  disabled = false,
  className = '',
  ...props
}) => {
  // Memoize the change handler
  const handleChange = useCallback((e) => {
    onInputChange(e.target.value);
  }, [onInputChange]);

  // Memoize character data to prevent recalculation
  const characters = useMemo(() => {
    return targetText.split('').map((char, index) => ({
      char,
      status: getCharStatus(userInput, targetText, index),
      isCursor: index === userInput.length,
    }));
  }, [targetText, userInput]);

  return (
    <div className={`game-area ${className}`.trim()} {...props}>
      <div className="game-area__content">
        {characters.map((charData, index) => (
          <Character
            key={index}
            char={charData.char}
            status={charData.status}
            isCursor={charData.isCursor}
          />
        ))}
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
});

GameArea.displayName = 'GameArea';

GameArea.propTypes = {
  targetText: PropTypes.string.isRequired,
  userInput: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  inputRef: PropTypes.object,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default GameArea;

