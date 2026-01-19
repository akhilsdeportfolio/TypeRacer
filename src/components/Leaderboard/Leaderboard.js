/**
 * Leaderboard Component
 * 
 * Displays top scores (mock data for now, can be connected to a backend)
 */

import React, { memo, useMemo } from 'react';
import './Leaderboard.css';

// Mock leaderboard data (in a real app, this would come from an API)
const MOCK_LEADERBOARD = [
  { rank: 1, name: 'TypeMaster99', wpm: 145, accuracy: 99, avatar: '👑' },
  { rank: 2, name: 'SpeedDemon', wpm: 138, accuracy: 98, avatar: '🚀' },
  { rank: 3, name: 'KeyboardNinja', wpm: 132, accuracy: 97, avatar: '🥷' },
  { rank: 4, name: 'SwiftFingers', wpm: 128, accuracy: 96, avatar: '⚡' },
  { rank: 5, name: 'TypingPro', wpm: 125, accuracy: 98, avatar: '🎯' },
  { rank: 6, name: 'WordWarrior', wpm: 122, accuracy: 95, avatar: '⚔️' },
  { rank: 7, name: 'FlashTyper', wpm: 118, accuracy: 94, avatar: '💫' },
  { rank: 8, name: 'KeyStroke', wpm: 115, accuracy: 97, avatar: '🎹' },
  { rank: 9, name: 'RapidRacer', wpm: 112, accuracy: 93, avatar: '🏎️' },
  { rank: 10, name: 'TypeRookie', wpm: 108, accuracy: 92, avatar: '🌟' },
];

const getRankIcon = (rank) => {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return `#${rank}`;
};

const Leaderboard = memo(({ 
  title = 'Leaderboard',
  data = MOCK_LEADERBOARD,
  currentUserWPM = null,
  limit = 10,
  showAccuracy = true,
  gameType = 'TypeRacer',
}) => {
  const displayData = useMemo(() => {
    return data.slice(0, limit);
  }, [data, limit]);

  // Calculate where current user would rank
  const userRank = useMemo(() => {
    if (!currentUserWPM) return null;
    const position = data.findIndex(entry => currentUserWPM >= entry.wpm);
    return position === -1 ? data.length + 1 : position + 1;
  }, [currentUserWPM, data]);

  return (
    <div className="leaderboard">
      <div className="leaderboard__header">
        <h3 className="leaderboard__title">{title}</h3>
        <span className="leaderboard__game">{gameType}</span>
      </div>

      <div className="leaderboard__list">
        {displayData.map((entry, index) => (
          <div 
            key={entry.rank}
            className={`leaderboard__entry ${index < 3 ? 'leaderboard__entry--top' : ''}`}
          >
            <span className="leaderboard__rank">{getRankIcon(entry.rank)}</span>
            <span className="leaderboard__avatar">{entry.avatar}</span>
            <span className="leaderboard__name">{entry.name}</span>
            <span className="leaderboard__wpm">{entry.wpm} WPM</span>
            {showAccuracy && (
              <span className="leaderboard__accuracy">{entry.accuracy}%</span>
            )}
          </div>
        ))}
      </div>

      {currentUserWPM && (
        <div className="leaderboard__user-rank">
          <span>Your best: <strong>{currentUserWPM} WPM</strong></span>
          {userRank && <span>You would rank #{userRank}</span>}
        </div>
      )}

      <div className="leaderboard__footer">
        <p>🏆 Beat these scores to climb the leaderboard!</p>
      </div>
    </div>
  );
});

Leaderboard.displayName = 'Leaderboard';

export default Leaderboard;

