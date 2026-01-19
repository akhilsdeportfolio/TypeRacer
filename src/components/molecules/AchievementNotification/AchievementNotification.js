import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './AchievementNotification.css';

/**
 * AchievementNotification - Displays achievement unlock notifications
 */
const AchievementNotification = ({ achievement, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (achievement) {
      // Trigger animation
      setTimeout(() => setIsVisible(true), 100);
      
      // Auto-close after 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [achievement, onClose]);

  if (!achievement) return null;

  return (
    <div className={`achievement-notification ${isVisible ? 'achievement-notification--visible' : ''}`}>
      <div className="achievement-notification__content">
        <div className="achievement-notification__header">
          <span className="achievement-notification__badge">🎉 Achievement Unlocked!</span>
        </div>
        <div className="achievement-notification__body">
          <div className="achievement-notification__icon">{achievement.icon}</div>
          <div className="achievement-notification__text">
            <h3 className="achievement-notification__name">{achievement.name}</h3>
            <p className="achievement-notification__description">{achievement.description}</p>
          </div>
        </div>
      </div>
      <button 
        className="achievement-notification__close"
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
};

AchievementNotification.propTypes = {
  achievement: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }),
  onClose: PropTypes.func.isRequired
};

export default AchievementNotification;

