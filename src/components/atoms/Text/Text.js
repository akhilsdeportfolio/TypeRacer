import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './Text.css';

/**
 * Text component - Atomic design atom
 * Reusable text with different variants
 * Memoized to prevent unnecessary re-renders
 */
const Text = memo(({
  children,
  variant = 'body',
  className = '',
  as: Component = 'span',
  ...props
}) => {
  const textClass = `text text--${variant} ${className}`.trim();

  return (
    <Component className={textClass} {...props}>
      {children}
    </Component>
  );
});

Text.displayName = 'Text';

Text.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'body', 'small', 'label']),
  className: PropTypes.string,
  as: PropTypes.string,
};

export default Text;

