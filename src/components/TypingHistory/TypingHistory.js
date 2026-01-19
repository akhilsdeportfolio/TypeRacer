/**
 * Typing History Component
 * 
 * Displays a list of past typing sessions with stats
 */

import React, { memo, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import './TypingHistory.css';

const TypingHistory = memo(({
  history = [],
  maxItems = 10,
  showFilters = true,
}) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const filteredHistory = useMemo(() => {
    let filtered = [...history];
    
    // Apply filter
    if (filter !== 'all') {
      filtered = filtered.filter(item => item.gameType === filter);
    }
    
    // Apply sort
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'date':
          comparison = new Date(b.date) - new Date(a.date);
          break;
        case 'wpm':
          comparison = b.wpm - a.wpm;
          break;
        case 'accuracy':
          comparison = b.accuracy - a.accuracy;
          break;
        default:
          comparison = 0;
      }
      return sortOrder === 'desc' ? comparison : -comparison;
    });
    
    return filtered.slice(0, maxItems);
  }, [history, filter, sortBy, sortOrder, maxItems]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getGameIcon = (gameType) => {
    const icons = {
      typeracer: '🏎️',
      wordscramble: '🔀',
      memory: '🧠',
      speed: '⚡',
      code: '💻',
      zen: '🧘',
      quote: '💬',
    };
    return icons[gameType] || '🎮';
  };

  return (
    <div className="typing-history">
      {showFilters && (
        <div className="typing-history__filters">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="history-select"
          >
            <option value="all">All Games</option>
            <option value="typeracer">Type Racer</option>
            <option value="wordscramble">Word Scramble</option>
            <option value="code">Code Typing</option>
            <option value="zen">Zen Mode</option>
          </select>
          
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="history-select"
          >
            <option value="date">Sort by Date</option>
            <option value="wpm">Sort by WPM</option>
            <option value="accuracy">Sort by Accuracy</option>
          </select>
          
          <button 
            className="sort-toggle"
            onClick={() => setSortOrder(o => o === 'desc' ? 'asc' : 'desc')}
          >
            {sortOrder === 'desc' ? '↓' : '↑'}
          </button>
        </div>
      )}

      <div className="typing-history__list">
        {filteredHistory.length === 0 ? (
          <div className="typing-history__empty">
            <p>No typing history yet. Start playing to track your progress!</p>
          </div>
        ) : (
          filteredHistory.map((item, index) => (
            <div key={item.id || index} className="history-item">
              <div className="history-item__icon">
                {getGameIcon(item.gameType)}
              </div>
              <div className="history-item__info">
                <span className="history-item__game">{item.gameName || item.gameType}</span>
                <span className="history-item__date">{formatDate(item.date)}</span>
              </div>
              <div className="history-item__stats">
                <span className="history-stat">
                  <strong>{item.wpm}</strong> WPM
                </span>
                <span className="history-stat">
                  <strong>{item.accuracy}%</strong> Acc
                </span>
                <span className="history-stat">
                  <strong>{item.time}s</strong>
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
});

TypingHistory.displayName = 'TypingHistory';

TypingHistory.propTypes = {
  history: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    gameType: PropTypes.string,
    gameName: PropTypes.string,
    date: PropTypes.string,
    wpm: PropTypes.number,
    accuracy: PropTypes.number,
    time: PropTypes.number,
  })),
  maxItems: PropTypes.number,
  showFilters: PropTypes.bool,
};

export default TypingHistory;

