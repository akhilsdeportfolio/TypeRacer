/**
 * MainLayout - Primary application layout with navigation
 */

import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { NAV_ITEMS, GAMES } from '../router';
import { useSettings } from '../context/SettingsContext';
import './MainLayout.css';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useSettings();
  const location = useLocation();

  const isGamePage = GAMES.some(game => location.pathname === game.path);

  return (
    <div className={`layout ${darkMode ? 'dark' : ''}`}>
      {/* Top Navigation Bar */}
      <header className="layout__header">
        <button 
          className="layout__menu-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        
        <NavLink to="/" className="layout__logo">
          <span className="layout__logo-icon">⌨️</span>
          <span className="layout__logo-text">TypingHub</span>
        </NavLink>

        <nav className="layout__nav">
          {NAV_ITEMS.slice(0, 4).map(item => (
            <NavLink 
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `layout__nav-item ${isActive ? 'active' : ''}`
              }
            >
              <span className="layout__nav-icon">{item.icon}</span>
              <span className="layout__nav-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="layout__actions">
          <button 
            className="layout__action-btn"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* Sidebar for mobile */}
      <aside className={`layout__sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="layout__sidebar-header">
          <h2>Games</h2>
          <button onClick={() => setSidebarOpen(false)}>✕</button>
        </div>
        
        <nav className="layout__sidebar-nav">
          {GAMES.map(game => (
            <NavLink
              key={game.id}
              to={game.path}
              className={({ isActive }) => 
                `layout__sidebar-item ${isActive ? 'active' : ''}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <span className="layout__sidebar-icon">{game.icon}</span>
              <div className="layout__sidebar-info">
                <span className="layout__sidebar-name">{game.name}</span>
                <span className="layout__sidebar-desc">{game.description}</span>
              </div>
            </NavLink>
          ))}
        </nav>

        <div className="layout__sidebar-footer">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className="layout__sidebar-link"
              onClick={() => setSidebarOpen(false)}
            >
              {item.icon} {item.label}
            </NavLink>
          ))}
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="layout__overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className={`layout__main ${isGamePage ? 'game-page' : ''}`}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="layout__footer">
        <p>© 2026 TypingHub - Master your typing skills</p>
        <div className="layout__footer-links">
          <a href="#about">About</a>
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;

