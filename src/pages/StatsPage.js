/**
 * StatsPage - Statistics dashboard with charts
 */

import React, { useMemo } from 'react';
import { useSettings } from '../context/SettingsContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import './StatsPage.css';

const StatsPage = () => {
  const { darkMode, highScores } = useSettings();
  const [gameHistory] = useLocalStorage('typeracer-history', []);
  const [dailyStats] = useLocalStorage('typeracer-daily', {});

  const stats = useMemo(() => {
    if (gameHistory.length === 0) return null;
    
    const wpms = gameHistory.map(g => g.wpm);
    const accuracies = gameHistory.map(g => g.accuracy);
    
    return {
      totalGames: gameHistory.length,
      bestWPM: Math.max(...wpms),
      avgWPM: Math.round(wpms.reduce((a, b) => a + b, 0) / wpms.length),
      worstWPM: Math.min(...wpms),
      bestAccuracy: Math.max(...accuracies),
      avgAccuracy: Math.round(accuracies.reduce((a, b) => a + b, 0) / accuracies.length),
      totalChars: gameHistory.reduce((a, g) => a + (g.chars || 0), 0),
      totalTime: gameHistory.reduce((a, g) => a + (g.time || 0), 0),
    };
  }, [gameHistory]);

  // Get last 7 days data for chart
  const weeklyData = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayGames = gameHistory.filter(g => g.date?.startsWith(dateStr));
      const avgWPM = dayGames.length > 0 
        ? Math.round(dayGames.reduce((a, g) => a + g.wpm, 0) / dayGames.length)
        : 0;
      days.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        avgWPM,
        games: dayGames.length,
      });
    }
    return days;
  }, [gameHistory]);

  const maxWPM = Math.max(...weeklyData.map(d => d.avgWPM), 1);

  return (
    <div className={`stats-page ${darkMode ? 'dark' : ''}`}>
      <div className="stats-page__header">
        <h1>📊 Statistics</h1>
        <p>Track your typing improvement</p>
      </div>

      {!stats ? (
        <div className="stats-page__empty">
          <p>No games played yet!</p>
          <p>Start playing to see your statistics here.</p>
        </div>
      ) : (
        <>
          {/* Overview Cards */}
          <section className="stats-page__section">
            <h2>Overview</h2>
            <div className="stats-page__cards">
              <div className="stats-page__card">
                <span className="stats-page__card-icon">🎮</span>
                <span className="stats-page__card-value">{stats.totalGames}</span>
                <span className="stats-page__card-label">Games Played</span>
              </div>
              <div className="stats-page__card best">
                <span className="stats-page__card-icon">🏆</span>
                <span className="stats-page__card-value">{stats.bestWPM}</span>
                <span className="stats-page__card-label">Best WPM</span>
              </div>
              <div className="stats-page__card">
                <span className="stats-page__card-icon">📊</span>
                <span className="stats-page__card-value">{stats.avgWPM}</span>
                <span className="stats-page__card-label">Average WPM</span>
              </div>
              <div className="stats-page__card">
                <span className="stats-page__card-icon">🎯</span>
                <span className="stats-page__card-value">{stats.avgAccuracy}%</span>
                <span className="stats-page__card-label">Avg Accuracy</span>
              </div>
            </div>
          </section>

          {/* Weekly Chart */}
          <section className="stats-page__section">
            <h2>Last 7 Days</h2>
            <div className="stats-page__chart">
              {weeklyData.map((day, i) => (
                <div key={i} className="stats-page__chart-bar">
                  <div className="stats-page__chart-value">{day.avgWPM || '—'}</div>
                  <div 
                    className="stats-page__chart-fill" 
                    style={{ height: `${(day.avgWPM / maxWPM) * 100}%` }}
                  />
                  <div className="stats-page__chart-label">{day.day}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Detailed Stats */}
          <section className="stats-page__section">
            <h2>Detailed Statistics</h2>
            <div className="stats-page__details">
              <div className="stats-page__detail">
                <span>Best WPM</span>
                <span>{stats.bestWPM}</span>
              </div>
              <div className="stats-page__detail">
                <span>Worst WPM</span>
                <span>{stats.worstWPM}</span>
              </div>
              <div className="stats-page__detail">
                <span>Best Accuracy</span>
                <span>{stats.bestAccuracy}%</span>
              </div>
              <div className="stats-page__detail">
                <span>Total Characters</span>
                <span>{stats.totalChars.toLocaleString()}</span>
              </div>
              <div className="stats-page__detail">
                <span>Total Time</span>
                <span>{Math.round(stats.totalTime / 60)} min</span>
              </div>
              <div className="stats-page__detail">
                <span>Daily Challenges</span>
                <span>{Object.keys(dailyStats).length}</span>
              </div>
            </div>
          </section>

          {/* Tips */}
          <section className="stats-page__section">
            <h2>💡 Tips to Improve</h2>
            <ul className="stats-page__tips">
              {stats.avgAccuracy < 95 && (
                <li>Focus on accuracy first. Slow down to reduce errors.</li>
              )}
              {stats.avgWPM < 40 && (
                <li>Practice home row position daily to build muscle memory.</li>
              )}
              {stats.totalGames < 10 && (
                <li>Keep practicing! Consistency is key to improvement.</li>
              )}
              <li>Try the Daily Challenge to stay motivated.</li>
              <li>Use typing lessons to target specific weak keys.</li>
            </ul>
          </section>
        </>
      )}
    </div>
  );
};

export default StatsPage;

