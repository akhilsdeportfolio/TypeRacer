import React from 'react';
import PropTypes from 'prop-types';
import './Character.css';

/**
 * Character component - Atomic design atom
 * Displays a single character with status styling
 */
const Character = ({ 
  char, 
  status = 'pending',
  isCursor = false,
  className = '',
  ...props 
}) => {
  const charClass = `character character--${status} ${isCursor ? 'character--cursor' : ''} ${className}`.trim();

  return (
    <span className={charClass} {...props}>
      {char}
    </span>
  );
};

Character.propTypes = {
  char: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['correct', 'incorrect', 'pending']),
  isCursor: PropTypes.bool,
  className: PropTypes.string,
};

export default Character;

