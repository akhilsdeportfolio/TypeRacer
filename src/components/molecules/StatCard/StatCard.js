import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Text from '../../atoms/Text';
import './StatCard.css';

/**
 * StatCard component - Atomic design molecule
 * Displays a statistic with label and value
 * Memoized to prevent unnecessary re-renders when stats haven't changed
 */
const StatCard = memo(({
  label,
  value,
  icon,
  variant = 'default',
  className = '',
  ...props
}) => {
  const cardClass = `stat-card stat-card--${variant} ${className}`.trim();

  return (
    <div className={cardClass} {...props}>
      {icon && <span className="stat-card__icon">{icon}</span>}
      <div className="stat-card__content">
        <Text variant="label" className="stat-card__label">
          {label}
        </Text>
        <Text variant="h2" className="stat-card__value">
          {value}
        </Text>
      </div>
    </div>
  );
});

StatCard.displayName = 'StatCard';

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'highlight', 'success', 'warning']),
  className: PropTypes.string,
};

export default StatCard;

