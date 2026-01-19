/**
 * SettingsPage - User settings and preferences
 */

import React, { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { useTheme } from '../context/ThemeContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import './SettingsPage.css';

const THEMES = [
  { id: 'purple', name: 'Purple Galaxy', colors: { primary: '#667eea', secondary: '#764ba2' } },
  { id: 'ocean', name: 'Ocean Blue', colors: { primary: '#0ea5e9', secondary: '#0369a1' } },
  { id: 'forest', name: 'Forest Green', colors: { primary: '#10b981', secondary: '#059669' } },
  { id: 'sunset', name: 'Sunset Orange', colors: { primary: '#f59e0b', secondary: '#ea580c' } },
  { id: 'midnight', name: 'Midnight Dark', colors: { primary: '#6366f1', secondary: '#1e1b4b' } },
];

const SettingsPage = () => {
  const { darkMode, toggleDarkMode, soundEnabled, toggleSound } = useSettings();
  const { theme, setTheme } = useTheme();
  const [, setGameHistory] = useLocalStorage('typeracer-history', []);
  const [, setDailyStats] = useLocalStorage('typeracer-daily', {});
  const [showConfirm, setShowConfirm] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleClearData = () => {
    setGameHistory([]);
    setDailyStats({});
    localStorage.removeItem('typeracer-achievements');
    localStorage.removeItem('typeracer-lessons');
    setShowConfirm(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleThemeChange = (themeId) => {
    const selectedTheme = THEMES.find(t => t.id === themeId);
    if (selectedTheme) {
      setTheme(selectedTheme.colors);
    }
  };

  return (
    <div className={`settings-page ${darkMode ? 'dark' : ''}`}>
      <div className="settings-page__header">
        <h1>⚙️ Settings</h1>
        <p>Customize your experience</p>
      </div>

      {saved && (
        <div className="settings-page__toast">✅ Changes saved!</div>
      )}

      {/* Appearance */}
      <section className="settings-page__section">
        <h2>🎨 Appearance</h2>
        
        <div className="settings-page__option">
          <div className="settings-page__option-info">
            <span className="settings-page__option-title">Dark Mode</span>
            <span className="settings-page__option-desc">Use dark theme</span>
          </div>
          <button 
            className={`settings-page__toggle ${darkMode ? 'active' : ''}`}
            onClick={toggleDarkMode}
          >
            <span className="settings-page__toggle-slider" />
          </button>
        </div>

        <div className="settings-page__option">
          <div className="settings-page__option-info">
            <span className="settings-page__option-title">Theme Color</span>
            <span className="settings-page__option-desc">Choose your accent color</span>
          </div>
        </div>
        
        <div className="settings-page__themes">
          {THEMES.map(t => (
            <button
              key={t.id}
              className={`settings-page__theme-btn ${theme.primary === t.colors.primary ? 'active' : ''}`}
              style={{ background: `linear-gradient(135deg, ${t.colors.primary}, ${t.colors.secondary})` }}
              onClick={() => handleThemeChange(t.id)}
              title={t.name}
            />
          ))}
        </div>
      </section>

      {/* Audio */}
      <section className="settings-page__section">
        <h2>🔊 Audio</h2>
        
        <div className="settings-page__option">
          <div className="settings-page__option-info">
            <span className="settings-page__option-title">Sound Effects</span>
            <span className="settings-page__option-desc">Play sounds for typing feedback</span>
          </div>
          <button 
            className={`settings-page__toggle ${soundEnabled ? 'active' : ''}`}
            onClick={toggleSound}
          >
            <span className="settings-page__toggle-slider" />
          </button>
        </div>
      </section>

      {/* Data */}
      <section className="settings-page__section">
        <h2>💾 Data</h2>
        
        <div className="settings-page__option">
          <div className="settings-page__option-info">
            <span className="settings-page__option-title">Clear All Data</span>
            <span className="settings-page__option-desc">Reset all game history, achievements, and progress</span>
          </div>
          <button 
            className="settings-page__danger-btn"
            onClick={() => setShowConfirm(true)}
          >
            Clear
          </button>
        </div>
      </section>

      {/* About */}
      <section className="settings-page__section">
        <h2>ℹ️ About</h2>
        <div className="settings-page__about">
          <p><strong>TypingHub</strong> - Master your typing skills</p>
          <p>Version 1.0.0</p>
          <p style={{ opacity: 0.7, marginTop: '1rem' }}>
            Built with React ⚛️
          </p>
        </div>
      </section>

      {/* Confirm Modal */}
      {showConfirm && (
        <div className="settings-page__modal-overlay">
          <div className="settings-page__modal">
            <h3>⚠️ Clear All Data?</h3>
            <p>This will permanently delete all your game history, achievements, and progress. This action cannot be undone.</p>
            <div className="settings-page__modal-buttons">
              <button onClick={() => setShowConfirm(false)}>Cancel</button>
              <button className="danger" onClick={handleClearData}>Clear Data</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;

