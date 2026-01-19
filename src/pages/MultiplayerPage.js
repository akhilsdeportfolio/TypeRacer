/**
 * Multiplayer Page
 * 
 * Mock multiplayer lobby (placeholder for future WebSocket integration)
 */

import React, { useState, useCallback, useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';
import './GamePage.css';

// Mock players for demo
const MOCK_PLAYERS = [
  { id: 1, name: 'SpeedTyper', avatar: '🚀', wpm: 85, status: 'ready' },
  { id: 2, name: 'KeyMaster', avatar: '⌨️', wpm: 72, status: 'ready' },
  { id: 3, name: 'WordNinja', avatar: '🥷', wpm: 68, status: 'waiting' },
];

const MOCK_ROOMS = [
  { id: 'room1', name: 'Beginner Friendly', players: 3, maxPlayers: 5, difficulty: 'easy' },
  { id: 'room2', name: 'Speed Demons', players: 4, maxPlayers: 4, difficulty: 'hard' },
  { id: 'room3', name: 'Casual Practice', players: 2, maxPlayers: 6, difficulty: 'medium' },
];

const MultiplayerPage = () => {
  const { settings } = useSettings();
  const [view, setView] = useState('lobby'); // lobby, room, game
  const [currentRoom, setCurrentRoom] = useState(null);
  const [players, setPlayers] = useState([]);
  const [countdown, setCountdown] = useState(null);
  const [username, setUsername] = useState('Player' + Math.floor(Math.random() * 1000));

  const joinRoom = useCallback((room) => {
    setCurrentRoom(room);
    setPlayers([
      { id: 0, name: username, avatar: '👤', wpm: 0, status: 'ready', isYou: true },
      ...MOCK_PLAYERS.slice(0, room.players - 1),
    ]);
    setView('room');
  }, [username]);

  const leaveRoom = useCallback(() => {
    setCurrentRoom(null);
    setPlayers([]);
    setView('lobby');
    setCountdown(null);
  }, []);

  const startGame = useCallback(() => {
    setCountdown(5);
  }, []);

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      setView('game');
      return;
    }
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const renderLobby = () => (
    <div className="multiplayer-lobby">
      <div className="lobby-header">
        <h2>🌐 Available Rooms</h2>
        <div className="username-input">
          <label>Your Name:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            maxLength={15}
          />
        </div>
      </div>

      <div className="room-list">
        {MOCK_ROOMS.map(room => (
          <div key={room.id} className="room-card">
            <div className="room-info">
              <h3>{room.name}</h3>
              <span className={`difficulty difficulty--${room.difficulty}`}>{room.difficulty}</span>
            </div>
            <div className="room-players">
              <span>👥 {room.players}/{room.maxPlayers}</span>
            </div>
            <button
              className="game-btn game-btn--primary"
              onClick={() => joinRoom(room)}
              disabled={room.players >= room.maxPlayers}
            >
              {room.players >= room.maxPlayers ? 'Full' : 'Join'}
            </button>
          </div>
        ))}
      </div>

      <button className="game-btn game-btn--secondary">➕ Create Room</button>
    </div>
  );

  const renderRoom = () => (
    <div className="multiplayer-room">
      <div className="room-header">
        <button className="game-btn" onClick={leaveRoom}>← Leave</button>
        <h2>{currentRoom?.name}</h2>
        <span className={`difficulty difficulty--${currentRoom?.difficulty}`}>{currentRoom?.difficulty}</span>
      </div>

      <div className="players-list">
        {players.map(player => (
          <div key={player.id} className={`player-card ${player.isYou ? 'player-card--you' : ''}`}>
            <span className="player-avatar">{player.avatar}</span>
            <span className="player-name">{player.name} {player.isYou && '(You)'}</span>
            <span className={`player-status player-status--${player.status}`}>{player.status}</span>
          </div>
        ))}
      </div>

      {countdown !== null ? (
        <div className="countdown">
          <h2>Starting in {countdown}...</h2>
        </div>
      ) : (
        <button className="game-btn game-btn--primary game-btn--large" onClick={startGame}>
          🏁 Start Race
        </button>
      )}
    </div>
  );

  const renderGame = () => (
    <div className="multiplayer-game">
      <h2>🏎️ Race in Progress!</h2>
      <p>Multiplayer game would be here...</p>
      <p className="coming-soon">🚧 Full multiplayer coming soon with WebSocket support!</p>
      <button className="game-btn" onClick={leaveRoom}>Back to Lobby</button>
    </div>
  );

  return (
    <div className={`game-page ${settings.darkMode ? 'dark' : ''}`}>
      <div className="game-page__header">
        <h1>🎮 Multiplayer</h1>
        <p>Race against other typists in real-time</p>
      </div>

      <div className="game-page__content">
        {view === 'lobby' && renderLobby()}
        {view === 'room' && renderRoom()}
        {view === 'game' && renderGame()}
      </div>
    </div>
  );
};

export default MultiplayerPage;

