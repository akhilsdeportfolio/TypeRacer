/**
 * Feature Flags System
 * 
 * Control feature rollouts and A/B testing
 */

import { storage, STORAGE_KEYS } from '../services/storage';

// Default feature flags configuration
const DEFAULT_FLAGS = {
  // New games (gradual rollout)
  ENABLE_WORD_SCRAMBLE: true,
  ENABLE_MEMORY_TYPING: true,
  ENABLE_SPEED_CHALLENGE: true,
  ENABLE_BOT_RACE: true,
  ENABLE_DAILY_CHALLENGE: true,
  
  // Features in development
  ENABLE_MULTIPLAYER: false,
  ENABLE_LEADERBOARDS: false,
  ENABLE_SOCIAL_SHARING: false,
  ENABLE_CUSTOM_THEMES: true,
  
  // Experiments
  SHOW_KEYBOARD_HEATMAP: false,
  SHOW_WPM_PREDICTION: false,
  ENHANCED_STATS: true,
  NEW_HOMEPAGE_DESIGN: true,
  
  // Performance
  ENABLE_ANALYTICS: true,
  ENABLE_ERROR_REPORTING: true,
  ENABLE_PERFORMANCE_LOGGING: false,
};

// User-based feature assignment (simple hash-based)
const getUserBucket = (userId) => {
  if (!userId) return 0;
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = ((hash << 5) - hash) + userId.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash % 100);
};

class FeatureFlags {
  constructor() {
    this.flags = { ...DEFAULT_FLAGS };
    this.overrides = storage.get('feature-flags-overrides', {});
    this.userId = storage.get('user-id') || this._generateUserId();
    this.userBucket = getUserBucket(this.userId);
    
    // Apply overrides
    Object.assign(this.flags, this.overrides);
  }

  /**
   * Check if a feature is enabled
   */
  isEnabled(flagName) {
    // Check for override first
    if (flagName in this.overrides) {
      return this.overrides[flagName];
    }
    return this.flags[flagName] ?? false;
  }

  /**
   * Get all flags
   */
  getAll() {
    return { ...this.flags };
  }

  /**
   * Set an override for testing/debugging
   */
  setOverride(flagName, value) {
    this.overrides[flagName] = value;
    this.flags[flagName] = value;
    storage.set('feature-flags-overrides', this.overrides);
  }

  /**
   * Clear all overrides
   */
  clearOverrides() {
    this.overrides = {};
    this.flags = { ...DEFAULT_FLAGS };
    storage.remove('feature-flags-overrides');
  }

  /**
   * Check if user is in a rollout percentage
   */
  isInRollout(percentage) {
    return this.userBucket < percentage;
  }

  /**
   * Get A/B test variant
   */
  getVariant(experimentName, variants = ['control', 'treatment']) {
    const variantIndex = this.userBucket % variants.length;
    return variants[variantIndex];
  }

  _generateUserId() {
    const id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    storage.set('user-id', id);
    return id;
  }
}

// Singleton instance
export const featureFlags = new FeatureFlags();

// React hook for feature flags
export const useFeatureFlag = (flagName) => {
  return featureFlags.isEnabled(flagName);
};

// HOC for feature gating
export const withFeatureFlag = (flagName, FallbackComponent = null) => (Component) => {
  return function FeatureGatedComponent(props) {
    const isEnabled = featureFlags.isEnabled(flagName);
    
    if (!isEnabled) {
      return FallbackComponent ? <FallbackComponent {...props} /> : null;
    }
    
    return <Component {...props} />;
  };
};

export default featureFlags;

