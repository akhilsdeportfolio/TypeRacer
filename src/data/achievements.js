/**
 * Achievements System
 * 
 * All available achievements and their unlock conditions
 */

export const ACHIEVEMENTS = [
  // Getting Started
  {
    id: 'first-game',
    name: 'First Steps',
    description: 'Complete your first typing game',
    icon: '🎮',
    category: 'basics',
    condition: (stats) => stats.gamesPlayed >= 1,
    points: 10,
  },
  {
    id: 'ten-games',
    name: 'Getting Warmed Up',
    description: 'Complete 10 typing games',
    icon: '🔥',
    category: 'basics',
    condition: (stats) => stats.gamesPlayed >= 10,
    points: 25,
  },
  {
    id: 'hundred-games',
    name: 'Dedicated Typist',
    description: 'Complete 100 typing games',
    icon: '💯',
    category: 'basics',
    condition: (stats) => stats.gamesPlayed >= 100,
    points: 100,
  },

  // Speed Achievements
  {
    id: 'wpm-30',
    name: 'Keyboard Beginner',
    description: 'Reach 30 WPM',
    icon: '⌨️',
    category: 'speed',
    condition: (stats) => stats.bestWPM >= 30,
    points: 15,
  },
  {
    id: 'wpm-50',
    name: 'Swift Fingers',
    description: 'Reach 50 WPM',
    icon: '🏃',
    category: 'speed',
    condition: (stats) => stats.bestWPM >= 50,
    points: 30,
  },
  {
    id: 'wpm-80',
    name: 'Speed Demon',
    description: 'Reach 80 WPM',
    icon: '🚀',
    category: 'speed',
    condition: (stats) => stats.bestWPM >= 80,
    points: 50,
  },
  {
    id: 'wpm-100',
    name: 'Lightning Fast',
    description: 'Reach 100 WPM',
    icon: '⚡',
    category: 'speed',
    condition: (stats) => stats.bestWPM >= 100,
    points: 100,
  },
  {
    id: 'wpm-120',
    name: 'Typing Master',
    description: 'Reach 120 WPM',
    icon: '👑',
    category: 'speed',
    condition: (stats) => stats.bestWPM >= 120,
    points: 200,
  },

  // Accuracy Achievements
  {
    id: 'accuracy-90',
    name: 'Accurate Typist',
    description: 'Achieve 90% accuracy in a game',
    icon: '🎯',
    category: 'accuracy',
    condition: (stats) => stats.bestAccuracy >= 90,
    points: 20,
  },
  {
    id: 'accuracy-95',
    name: 'Precision Master',
    description: 'Achieve 95% accuracy in a game',
    icon: '🏹',
    category: 'accuracy',
    condition: (stats) => stats.bestAccuracy >= 95,
    points: 40,
  },
  {
    id: 'accuracy-100',
    name: 'Perfect Score',
    description: 'Achieve 100% accuracy in a game',
    icon: '💎',
    category: 'accuracy',
    condition: (stats) => stats.bestAccuracy >= 100,
    points: 75,
  },

  // Streak Achievements
  {
    id: 'daily-3',
    name: '3-Day Streak',
    description: 'Play for 3 consecutive days',
    icon: '📅',
    category: 'streak',
    condition: (stats) => stats.dailyStreak >= 3,
    points: 20,
  },
  {
    id: 'daily-7',
    name: 'Week Warrior',
    description: 'Play for 7 consecutive days',
    icon: '🗓️',
    category: 'streak',
    condition: (stats) => stats.dailyStreak >= 7,
    points: 50,
  },
  {
    id: 'daily-30',
    name: 'Monthly Champion',
    description: 'Play for 30 consecutive days',
    icon: '🏆',
    category: 'streak',
    condition: (stats) => stats.dailyStreak >= 30,
    points: 150,
  },

  // Game Mode Achievements
  {
    id: 'all-games',
    name: 'Game Explorer',
    description: 'Play all available games',
    icon: '🎲',
    category: 'exploration',
    condition: (stats) => stats.gamesExplored >= 6,
    points: 30,
  },
  {
    id: 'all-lessons',
    name: 'Star Student',
    description: 'Complete all typing lessons',
    icon: '📚',
    category: 'exploration',
    condition: (stats) => stats.lessonsCompleted >= 6,
    points: 60,
  },
];

export const ACHIEVEMENT_CATEGORIES = {
  basics: { name: 'Getting Started', icon: '🌟' },
  speed: { name: 'Speed', icon: '⚡' },
  accuracy: { name: 'Accuracy', icon: '🎯' },
  streak: { name: 'Streaks', icon: '🔥' },
  exploration: { name: 'Exploration', icon: '🗺️' },
};

/**
 * Check which achievements are unlocked
 */
export const checkAchievements = (stats, unlockedIds = []) => {
  const newlyUnlocked = [];
  
  ACHIEVEMENTS.forEach(achievement => {
    if (!unlockedIds.includes(achievement.id) && achievement.condition(stats)) {
      newlyUnlocked.push(achievement);
    }
  });
  
  return newlyUnlocked;
};

/**
 * Get achievement by ID
 */
export const getAchievementById = (id) => {
  return ACHIEVEMENTS.find(a => a.id === id);
};

/**
 * Calculate total points from unlocked achievements
 */
export const calculateTotalPoints = (unlockedIds) => {
  return ACHIEVEMENTS
    .filter(a => unlockedIds.includes(a.id))
    .reduce((total, a) => total + a.points, 0);
};

export default ACHIEVEMENTS;

