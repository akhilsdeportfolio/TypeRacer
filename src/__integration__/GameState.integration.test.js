/**
 * Game State Integration Tests
 * Tests the useGameState hook with various game scenarios
 */
import { renderHook, act } from '@testing-library/react-hooks';
import { useGameState } from '../hooks/useGameState';

describe('GameState Integration', () => {
  const targetText = 'Hello World';

  describe('Game lifecycle', () => {
    it('should start in initial state', () => {
      const { result } = renderHook(() => useGameState(targetText));

      expect(result.current.isInitial).toBe(true);
      expect(result.current.isPlaying).toBe(false);
      expect(result.current.isFinished).toBe(false);
      expect(result.current.userInput).toBe('');
    });

    it('should transition to playing state when game starts', () => {
      const { result } = renderHook(() => useGameState(targetText));

      act(() => {
        result.current.startGame();
      });

      expect(result.current.isInitial).toBe(false);
      expect(result.current.isPlaying).toBe(true);
      expect(result.current.isFinished).toBe(false);
    });

    it('should transition to finished state when game finishes', () => {
      const { result } = renderHook(() => useGameState(targetText));

      act(() => {
        result.current.startGame();
      });

      act(() => {
        result.current.finishGame();
      });

      expect(result.current.isInitial).toBe(false);
      expect(result.current.isPlaying).toBe(false);
      expect(result.current.isFinished).toBe(true);
    });

    it('should reset to initial state on reset', () => {
      const { result } = renderHook(() => useGameState(targetText));

      act(() => {
        result.current.startGame();
      });

      act(() => {
        result.current.handleInputChange('Hello');
      });

      act(() => {
        result.current.resetGame();
      });

      expect(result.current.isInitial).toBe(true);
      expect(result.current.userInput).toBe('');
      expect(result.current.streak).toBe(0);
    });
  });

  describe('Input handling', () => {
    it('should not accept input before game starts', () => {
      const { result } = renderHook(() => useGameState(targetText));

      act(() => {
        result.current.handleInputChange('Hello');
      });

      expect(result.current.userInput).toBe('');
    });

    it('should accept input when game is playing', () => {
      const { result } = renderHook(() => useGameState(targetText));

      act(() => {
        result.current.startGame();
      });

      act(() => {
        result.current.handleInputChange('Hello');
      });

      expect(result.current.userInput).toBe('Hello');
    });

    it('should not accept input longer than target text', () => {
      const { result } = renderHook(() => useGameState(targetText));

      act(() => {
        result.current.startGame();
      });

      act(() => {
        result.current.handleInputChange('Hello World extra text');
      });

      expect(result.current.userInput).toBe('');
    });
  });

  describe('Statistics calculation', () => {
    it('should calculate correct accuracy', () => {
      const { result } = renderHook(() => useGameState(targetText));

      act(() => {
        result.current.startGame();
      });

      act(() => {
        result.current.handleInputChange('Hello');
      });

      expect(result.current.stats.accuracy).toBe(100);
    });

    it('should calculate progress correctly', () => {
      const { result } = renderHook(() => useGameState(targetText));

      act(() => {
        result.current.startGame();
      });

      act(() => {
        result.current.handleInputChange('Hello');
      });

      // 5 chars out of 11 = ~45%
      expect(result.current.stats.progress).toBeCloseTo(45, 0);
    });

    it('should detect completion', () => {
      const { result } = renderHook(() => useGameState(targetText));

      act(() => {
        result.current.startGame();
      });

      act(() => {
        result.current.handleInputChange(targetText);
      });

      expect(result.current.stats.isComplete).toBe(true);
      expect(result.current.stats.progress).toBe(100);
    });
  });

  describe('Streak tracking', () => {
    it('should increment streak for correct characters', () => {
      const { result } = renderHook(() => useGameState(targetText));

      act(() => {
        result.current.startGame();
      });

      act(() => result.current.handleInputChange('H'));
      expect(result.current.streak).toBe(1);

      act(() => result.current.handleInputChange('He'));
      expect(result.current.streak).toBe(2);

      act(() => result.current.handleInputChange('Hel'));
      expect(result.current.streak).toBe(3);
    });

    it('should reset streak on incorrect character', () => {
      const { result } = renderHook(() => useGameState(targetText));

      act(() => {
        result.current.startGame();
      });

      act(() => result.current.handleInputChange('H'));
      act(() => result.current.handleInputChange('He'));
      act(() => result.current.handleInputChange('Hex')); // incorrect

      expect(result.current.streak).toBe(0);
      expect(result.current.maxStreak).toBe(2);
    });

    it('should track maximum streak', () => {
      const { result } = renderHook(() => useGameState(targetText));

      act(() => {
        result.current.startGame();
      });

      // Type 3 correct, then wrong, then 2 correct
      act(() => result.current.handleInputChange('H'));
      act(() => result.current.handleInputChange('He'));
      act(() => result.current.handleInputChange('Hel'));
      act(() => result.current.handleInputChange('Helx')); // wrong
      act(() => result.current.handleInputChange('Helxo'));
      act(() => result.current.handleInputChange('Helxo '));

      expect(result.current.maxStreak).toBe(3);
    });
  });
});

