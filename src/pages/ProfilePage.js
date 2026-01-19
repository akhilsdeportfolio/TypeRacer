/**
 * ProfilePage - User profile with stats and history
 */

import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { GAMES } from '../router';
import './ProfilePage.css';

const ProfilePage = () => {
  const { darkMode, highScores } = useSettings();
  const [gameHistory] = useLocalStorage('typeracer-history', []);
  const [dailyStats] = useLocalStorage('typeracer-daily', {});
  const [achievements] = useLocalStorage('typeracer-achievements', []);

  const stats = useMemo(() => {
    const totalGames = gameHistory.length;
    const avgWPM = totalGames > 0 
      ? Math.round(gameHistory.reduce((a, g) => a + g.wpm, 0) / totalGames)
      : 0;
    const avgAccuracy = totalGames > 0
      ? Math.round(gameHistory.reduce((a, g) => a + g.accuracy, 0) / totalGames)
      : 0;
    const bestWPM = Math.max(...Object.values(highScores), 0);
    const dailyStreak = Object.keys(dailyStats).length;
    
    return { totalGames, avgWPM, avgAccuracy, bestWPM, dailyStreak };
  }, [gameHistory, highScores, dailyStats]);

  const recentGames = gameHistory.slice(-10).reverse();

  return (
    <div className={`profile-page ${darkMode ? 'dark' : ''}`}>
      <div className="profile-page__header">
        <div className="profile-page__avatar">👤</div>
        <h1>Your Profile</h1>
        <p>Track your typing journey</p>
      </div>

      {/* Stats Overview */}
      <section className="profile-page__section">
        <h2>📊 Statistics</h2>
        <div className="profile-page__stats-grid">
          <div className="profile-page__stat-card">
            <span className="profile-page__stat-value">{stats.totalGames}</span>
            <span className="profile-page__stat-label">Games Played</span>
          </div>
          <div className="profile-page__stat-card">
            <span className="profile-page__stat-value">{stats.bestWPM}</span>
            <span className="profile-page__stat-label">Best WPM</span>
          </div>
          <div className="profile-page__stat-card">
            <span className="profile-page__stat-value">{stats.avgWPM}</span>
            <span className="profile-page__stat-label">Avg WPM</span>
          </div>
          <div className="profile-page__stat-card">
            <span className="profile-page__stat-value">{stats.avgAccuracy}%</span>
            <span className="profile-page__stat-label">Avg Accuracy</span>
          </div>
          <div className="profile-page__stat-card">
            <span className="profile-page__stat-value">{stats.dailyStreak}</span>
            <span className="profile-page__stat-label">Daily Streak</span>
          </div>
          <div className="profile-page__stat-card">
            <span className="profile-page__stat-value">{achievements.length}</span>
            <span className="profile-page__stat-label">Achievements</span>
          </div>
        </div>
      </section>

      {/* Game High Scores */}
      <section className="profile-page__section">
        <h2>🏆 High Scores by Game</h2>
        <div className="profile-page__games-list">
          {GAMES.map(game => (
            <Link key={game.id} to={game.path} className="profile-page__game-item">
              <span className="profile-page__game-icon">{game.icon}</span>
              <span className="profile-page__game-name">{game.name}</span>
              <span className="profile-page__game-score">
                {highScores[game.id] || '—'} {game.id === 'typeracer' ? 'WPM' : 'pts'}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Games */}
      <section className="profile-page__section">
        <h2>📝 Recent Games</h2>
        {recentGames.length > 0 ? (
          <div className="profile-page__history">
            {recentGames.map((game, i) => (
              <div key={i} className="profile-page__history-item">
                <span className="profile-page__history-date">
                  {new Date(game.date).toLocaleDateString()}
                </span>
                <span className="profile-page__history-game">{game.type || 'TypeRacer'}</span>
                <span className="profile-page__history-wpm">{game.wpm} WPM</span>
                <span className="profile-page__history-accuracy">{game.accuracy}%</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="profile-page__empty">No games played yet. Start playing!</p>
        )}
      </section>

      {/* Achievements */}
      <section className="profile-page__section">
        <h2>🎖️ Achievements</h2>
        <div className="profile-page__achievements">
          <div className={`profile-page__achievement ${stats.totalGames >= 1 ? 'unlocked' : ''}`}>
            🎮 First Game
          </div>
          <div className={`profile-page__achievement ${stats.bestWPM >= 30 ? 'unlocked' : ''}`}>
            ⌨️ 30 WPM Club
          </div>
          <div className={`profile-page__achievement ${stats.bestWPM >= 50 ? 'unlocked' : ''}`}>
            🚀 Speed Demon (50+ WPM)
          </div>
          <div className={`profile-page__achievement ${stats.bestWPM >= 80 ? 'unlocked' : ''}`}>
            ⚡ Lightning Fingers (80+ WPM)
          </div>
          <div className={`profile-page__achievement ${stats.totalGames >= 10 ? 'unlocked' : ''}`}>
            🎯 10 Games Played
          </div>
          <div className={`profile-page__achievement ${stats.dailyStreak >= 7 ? 'unlocked' : ''}`}>
            🔥 7-Day Streak
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;

