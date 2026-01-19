/**
 * TypeRacer Full Integration Tests
 * Tests the complete TypeRacer application flow
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TypeRacerRefactored from '../components/TypeRacerRefactored';
import { PARAGRAPHS } from '../constants';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('TypeRacer Integration', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe('Initial render', () => {
    it('should render the app header', () => {
      render(<TypeRacerRefactored />);
      expect(screen.getByText('TypeRacer Pro')).toBeInTheDocument();
    });

    it('should render difficulty buttons', () => {
      render(<TypeRacerRefactored />);
      expect(screen.getByText('Easy')).toBeInTheDocument();
      expect(screen.getByText('Medium')).toBeInTheDocument();
      expect(screen.getByText('Hard')).toBeInTheDocument();
      expect(screen.getByText('Expert')).toBeInTheDocument();
    });

    it('should render the game area with target text', () => {
      render(<TypeRacerRefactored />);
      // Should have characters from MEDIUM difficulty by default
      const characters = document.querySelectorAll('.character');
      expect(characters.length).toBe(PARAGRAPHS.MEDIUM.length);
    });

    it('should have dark mode toggle', () => {
      render(<TypeRacerRefactored />);
      expect(screen.getByTitle('Toggle Dark Mode (Ctrl+D)')).toBeInTheDocument();
    });

    it('should have sound toggle', () => {
      render(<TypeRacerRefactored />);
      expect(screen.getByTitle('Toggle Sound (Ctrl+M)')).toBeInTheDocument();
    });
  });

  describe('Difficulty selection', () => {
    it('should change target text when difficulty changes', () => {
      render(<TypeRacerRefactored />);

      // Click on Easy difficulty
      fireEvent.click(screen.getByText('Easy'));

      const characters = document.querySelectorAll('.character');
      expect(characters.length).toBe(PARAGRAPHS.EASY.length);
    });

    it('should highlight selected difficulty', () => {
      render(<TypeRacerRefactored />);

      fireEvent.click(screen.getByText('Hard'));

      const hardButton = screen.getByText('Hard').closest('button');
      expect(hardButton.classList.contains('active')).toBe(true);
    });
  });

  describe('Game flow', () => {
    it('should start game when user begins typing', () => {
      render(<TypeRacerRefactored />);

      const input = document.querySelector('.game-area__input');
      fireEvent.change(input, { target: { value: 'T' } });

      // Stats bar should appear when game starts
      expect(screen.getByText('Time Left')).toBeInTheDocument();
      expect(screen.getByText('WPM')).toBeInTheDocument();
      expect(screen.getByText('Accuracy')).toBeInTheDocument();
    });

    it('should update progress as user types', () => {
      render(<TypeRacerRefactored />);

      const input = document.querySelector('.game-area__input');
      fireEvent.change(input, { target: { value: 'The quick' } });

      // Progress bar should be visible and updated
      const progressBar = document.querySelector('.progress-bar');
      expect(progressBar).toBeInTheDocument();
    });

    it('should show restart button while playing', () => {
      render(<TypeRacerRefactored />);

      const input = document.querySelector('.game-area__input');
      fireEvent.change(input, { target: { value: 'T' } });

      expect(screen.getByText('Restart (Ctrl+R)')).toBeInTheDocument();
    });
  });

  describe('Settings', () => {
    it('should toggle dark mode', () => {
      render(<TypeRacerRefactored />);

      const darkModeBtn = screen.getByTitle('Toggle Dark Mode (Ctrl+D)');
      
      // Initially should show moon (light mode)
      expect(darkModeBtn.textContent).toBe('🌙');
      
      fireEvent.click(darkModeBtn);
      
      // Should now show sun (dark mode)
      expect(darkModeBtn.textContent).toBe('☀️');
    });

    it('should toggle sound', () => {
      render(<TypeRacerRefactored />);

      const soundBtn = screen.getByTitle('Toggle Sound (Ctrl+M)');
      
      // Initially should show speaker (sound on)
      expect(soundBtn.textContent).toBe('🔊');
      
      fireEvent.click(soundBtn);
      
      // Should now show muted (sound off)
      expect(soundBtn.textContent).toBe('🔇');
    });

    it('should persist dark mode preference', () => {
      render(<TypeRacerRefactored />);

      const darkModeBtn = screen.getByTitle('Toggle Dark Mode (Ctrl+D)');
      fireEvent.click(darkModeBtn);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'typeracer-darkmode',
        expect.any(String)
      );
    });
  });
});

