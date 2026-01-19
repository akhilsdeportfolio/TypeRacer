/**
 * HomePage - Main landing page with game selection
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { GAMES } from '../router';
import { useSettings } from '../context/SettingsContext';
import './HomePage.css';

const HomePage = () => {
  const { highScores } = useSettings();

  // Calculate total stats
  const totalWPM = Object.values(highScores).reduce((a, b) => a + b, 0);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="home__hero">
        <h1 className="home__title">
          <span className="home__title-icon">⌨️</span>
          TypingHub
        </h1>
        <p className="home__subtitle">
          Master your typing skills with fun games and challenges
        </p>
        
        <div className="home__stats">
          <div className="home__stat">
            <span className="home__stat-value">{GAMES.length}</span>
            <span className="home__stat-label">Games</span>
          </div>
          <div className="home__stat">
            <span className="home__stat-value">{totalWPM || '—'}</span>
            <span className="home__stat-label">Best WPM</span>
          </div>
          <div className="home__stat">
            <span className="home__stat-value">∞</span>
            <span className="home__stat-label">Fun</span>
          </div>
        </div>

        <Link to="/typeracer" className="home__cta">
          Start Playing 🚀
        </Link>
      </section>

      {/* Games Grid */}
      <section className="home__games">
        <h2 className="home__section-title">Choose Your Game</h2>
        
        <div className="home__games-grid">
          {GAMES.map(game => (
            <Link 
              key={game.id}
              to={game.path}
              className="home__game-card"
              style={{ '--game-color': game.color }}
            >
              <div className="home__game-icon">{game.icon}</div>
              <h3 className="home__game-name">{game.name}</h3>
              <p className="home__game-desc">{game.description}</p>
              <span className="home__game-difficulty">{game.difficulty}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="home__features">
        <h2 className="home__section-title">Why TypingHub?</h2>
        
        <div className="home__features-grid">
          <div className="home__feature">
            <span className="home__feature-icon">📈</span>
            <h3>Track Progress</h3>
            <p>Detailed statistics and WPM tracking over time</p>
          </div>
          <div className="home__feature">
            <span className="home__feature-icon">🏆</span>
            <h3>Achievements</h3>
            <p>Unlock badges and achievements as you improve</p>
          </div>
          <div className="home__feature">
            <span className="home__feature-icon">📅</span>
            <h3>Daily Challenges</h3>
            <p>New challenges every day to keep you motivated</p>
          </div>
          <div className="home__feature">
            <span className="home__feature-icon">🎮</span>
            <h3>Multiple Games</h3>
            <p>Various game modes to keep practice fun</p>
          </div>
          <div className="home__feature">
            <span className="home__feature-icon">📚</span>
            <h3>Lessons</h3>
            <p>Structured lessons for beginners to experts</p>
          </div>
          <div className="home__feature">
            <span className="home__feature-icon">🌙</span>
            <h3>Dark Mode</h3>
            <p>Easy on your eyes with dark theme support</p>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="home__quickstart">
        <h2>Ready to improve?</h2>
        <p>Start with Type Racer to test your current speed</p>
        <div className="home__quickstart-buttons">
          <Link to="/typeracer" className="home__btn home__btn--primary">
            🏎️ Type Racer
          </Link>
          <Link to="/lessons" className="home__btn home__btn--secondary">
            📚 Start Lessons
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

