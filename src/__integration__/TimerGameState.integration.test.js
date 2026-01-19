/**
 * Timer + Game State Integration Tests
 * Tests the interaction between timer and game state
 */
import { renderHook, act } from '@testing-library/react-hooks';
import { useTimer } from '../hooks/useTimer';
import { useGameState } from '../hooks/useGameState';

describe('Timer and GameState Integration', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should finish game when timer expires', () => {
    const targetText = 'Hello World';

    // Render game state hook
    const gameHook = renderHook(() => useGameState(targetText));
    const gameResult = gameHook.result;

    // Create finish callback that uses game state
    const onFinish = () => {
      act(() => {
        gameResult.current.finishGame();
      });
    };

    // Render timer hook with game's finish callback
    const timerHook = renderHook(() =>
      useTimer({ allowedTime: 5, onFinish })
    );
    const timerResult = timerHook.result;

    // Start game and timer
    act(() => {
      gameResult.current.startGame();
      timerResult.current.startTimer();
    });

    expect(gameResult.current.isPlaying).toBe(true);
    expect(timerResult.current.timeLeft).toBe(5);

    // Advance timer to completion
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(timerResult.current.timeLeft).toBe(0);
    expect(gameResult.current.isFinished).toBe(true);
  });

  it('should preserve stats when game finishes via timer', () => {
    const targetText = 'Hello World';

    const gameHook = renderHook(() => useGameState(targetText));
    const gameResult = gameHook.result;

    const onFinish = () => {
      act(() => {
        gameResult.current.finishGame();
      });
    };

    const timerHook = renderHook(() =>
      useTimer({ allowedTime: 10, onFinish })
    );
    const timerResult = timerHook.result;

    // Start game and timer
    act(() => {
      gameResult.current.startGame();
      timerResult.current.startTimer();
    });

    // Type some text
    act(() => {
      gameResult.current.handleInputChange('Hello');
    });

    // Let timer expire
    act(() => {
      jest.advanceTimersByTime(10000);
    });

    // Stats should be preserved after game ends
    expect(gameResult.current.userInput).toBe('Hello');
    expect(gameResult.current.stats.progress).toBeCloseTo(45, 0);
    expect(gameResult.current.isFinished).toBe(true);
  });

  it('should reset both timer and game state on restart', () => {
    const targetText = 'Hello World';
    
    const gameHook = renderHook(() => useGameState(targetText));
    const gameResult = gameHook.result;

    const timerHook = renderHook(() => 
      useTimer({ allowedTime: 60, onFinish: jest.fn() })
    );
    const timerResult = timerHook.result;

    // Start and play for a bit
    act(() => {
      gameResult.current.startGame();
      timerResult.current.startTimer();
    });

    act(() => {
      gameResult.current.handleInputChange('Hello');
    });

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(timerResult.current.timeLeft).toBe(55);
    expect(gameResult.current.userInput).toBe('Hello');

    // Reset both
    act(() => {
      gameResult.current.resetGame();
      timerResult.current.resetTimer();
    });

    expect(timerResult.current.timeLeft).toBe(60);
    expect(gameResult.current.userInput).toBe('');
    expect(gameResult.current.isInitial).toBe(true);
  });

  it('should count down in sync with game progress', () => {
    const targetText = 'Hello';
    
    const gameHook = renderHook(() => useGameState(targetText));
    const gameResult = gameHook.result;

    const timerHook = renderHook(() => 
      useTimer({ allowedTime: 10, onFinish: jest.fn() })
    );
    const timerResult = timerHook.result;

    act(() => {
      gameResult.current.startGame();
      timerResult.current.startTimer();
    });

    // Type one character per second
    for (let i = 0; i < 5; i++) {
      act(() => {
        jest.advanceTimersByTime(1000);
        gameResult.current.handleInputChange(targetText.slice(0, i + 1));
      });

      expect(timerResult.current.timeLeft).toBe(10 - (i + 1));
      expect(gameResult.current.stats.progress).toBe(((i + 1) / 5) * 100);
    }
  });
});

