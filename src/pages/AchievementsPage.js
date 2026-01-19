/**
 * Achievements Page
 * 
 * Display all achievements and user progress
 */

import React, { useState, useMemo } from 'react';
import { useSettings } from '../context/SettingsContext';
import { ACHIEVEMENTS, calculateTotalPoints } from '../data/achievements';
import AchievementBadge from '../components/AchievementBadge';
import './GamePage.css';

const CATEGORIES = [
  { id: 'all', name: 'All', icon: '🏆' },
  { id: 'basics', name: 'Basics', icon: '📝' },
  { id: 'speed', name: 'Speed', icon: '⚡' },
  { id: 'accuracy', name: 'Accuracy', icon: '🎯' },
  { id: 'streak', name: 'Streak', icon: '🔥' },
  { id: 'exploration', name: 'Exploration', icon: '🗺️' },
];

const AchievementsPage = () => {
  const { settings } = useSettings();
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Mock unlocked achievements (in real app, this would come from storage/context)
  const [unlockedIds] = useState(['first_game', 'speed_demon', 'perfect_10']);

  const filteredAchievements = useMemo(() => {
    if (selectedCategory === 'all') return ACHIEVEMENTS;
    return ACHIEVEMENTS.filter(a => a.category === selectedCategory);
  }, [selectedCategory]);

  const stats = useMemo(() => {
    const unlocked = ACHIEVEMENTS.filter(a => unlockedIds.includes(a.id));
    const totalPoints = calculateTotalPoints(ACHIEVEMENTS);
    const earnedPoints = calculateTotalPoints(unlocked);
    
    return {
      total: ACHIEVEMENTS.length,
      unlocked: unlocked.length,
      totalPoints,
      earnedPoints,
      percentage: Math.round((unlocked.length / ACHIEVEMENTS.length) * 100),
    };
  }, [unlockedIds]);

  return (
    <div className={`game-page ${settings.darkMode ? 'dark' : ''}`}>
      <div className="game-page__header">
        <h1>🏆 Achievements</h1>
        <p>Track your progress and unlock rewards</p>
      </div>

      <div className="achievements-stats">
        <div className="achievement-stat-card">
          <span className="stat-value">{stats.unlocked}/{stats.total}</span>
          <span className="stat-label">Unlocked</span>
        </div>
        <div className="achievement-stat-card">
          <span className="stat-value">{stats.earnedPoints}</span>
          <span className="stat-label">Points Earned</span>
        </div>
        <div className="achievement-stat-card">
          <span className="stat-value">{stats.percentage}%</span>
          <span className="stat-label">Complete</span>
        </div>
      </div>

      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${stats.percentage}%` }}
        />
      </div>

      <div className="game-page__controls">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`game-btn ${selectedCategory === cat.id ? 'game-btn--active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      <div className="achievements-grid">
        {filteredAchievements.map(achievement => (
          <AchievementBadge
            key={achievement.id}
            achievement={achievement}
            unlocked={unlockedIds.includes(achievement.id)}
          />
        ))}
      </div>

      {filteredAchievements.length === 0 && (
        <div className="empty-state">
          <p>No achievements in this category yet.</p>
        </div>
      )}
    </div>
  );
};

export default AchievementsPage;

