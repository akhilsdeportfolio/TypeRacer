/**
 * Analytics Service - Track user events and game metrics
 * 
 * This is a mock analytics service that logs events.
 * In production, you would connect this to a real analytics provider.
 */

const isDev = process.env.NODE_ENV === 'development';

const log = (type, data) => {
  if (isDev) {
    console.log(`[Analytics] ${type}:`, data);
  }
};

export const analytics = {
  /**
   * Track page view
   */
  pageView(pageName, properties = {}) {
    log('Page View', { page: pageName, ...properties, timestamp: Date.now() });
  },

  /**
   * Track game started
   */
  gameStart(gameType, difficulty) {
    log('Game Start', { gameType, difficulty, timestamp: Date.now() });
  },

  /**
   * Track game completed
   */
  gameComplete(gameType, stats) {
    log('Game Complete', {
      gameType,
      wpm: stats.wpm,
      accuracy: stats.accuracy,
      duration: stats.duration,
      timestamp: Date.now(),
    });
  },

  /**
   * Track achievement unlocked
   */
  achievementUnlocked(achievementId, achievementName) {
    log('Achievement', { id: achievementId, name: achievementName, timestamp: Date.now() });
  },

  /**
   * Track lesson completed
   */
  lessonComplete(lessonId, score) {
    log('Lesson Complete', { lessonId, score, timestamp: Date.now() });
  },

  /**
   * Track setting changed
   */
  settingChanged(setting, value) {
    log('Setting Changed', { setting, value, timestamp: Date.now() });
  },

  /**
   * Track error
   */
  error(errorMessage, context = {}) {
    log('Error', { message: errorMessage, ...context, timestamp: Date.now() });
  },

  /**
   * Track custom event
   */
  event(eventName, properties = {}) {
    log('Event', { event: eventName, ...properties, timestamp: Date.now() });
  },

  /**
   * Set user properties
   */
  setUser(userId, properties = {}) {
    log('Set User', { userId, ...properties });
  },

  /**
   * Get session data
   */
  getSessionData() {
    return {
      sessionId: sessionStorage.getItem('session-id') || this._generateSessionId(),
      startTime: sessionStorage.getItem('session-start'),
      pageViews: parseInt(sessionStorage.getItem('page-views') || '0', 10),
    };
  },

  _generateSessionId() {
    const id = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('session-id', id);
    sessionStorage.setItem('session-start', Date.now().toString());
    return id;
  },
};

export default analytics;

