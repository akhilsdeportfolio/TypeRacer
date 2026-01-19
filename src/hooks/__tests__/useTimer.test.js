import { renderHook, act } from '@testing-library/react-hooks';
import { useTimer } from '../useTimer';

describe('useTimer hook', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should initialize with the allowed time', () => {
    const { result } = renderHook(() =>
      useTimer({ allowedTime: 60, onFinish: jest.fn() })
    );

    expect(result.current.timeLeft).toBe(60);
  });

  it('should start counting down when startTimer is called', () => {
    const { result } = renderHook(() =>
      useTimer({ allowedTime: 60, onFinish: jest.fn() })
    );

    act(() => {
      result.current.startTimer();
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.timeLeft).toBe(59);
  });

  it('should call onFinish when time reaches 0', () => {
    const onFinish = jest.fn();
    const { result } = renderHook(() =>
      useTimer({ allowedTime: 3, onFinish })
    );

    act(() => {
      result.current.startTimer();
    });

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(result.current.timeLeft).toBe(0);
    expect(onFinish).toHaveBeenCalledTimes(1);
  });

  it('should reset timer to initial value', () => {
    const { result } = renderHook(() =>
      useTimer({ allowedTime: 60, onFinish: jest.fn() })
    );

    act(() => {
      result.current.startTimer();
    });

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(result.current.timeLeft).toBe(50);

    act(() => {
      result.current.resetTimer();
    });

    expect(result.current.timeLeft).toBe(60);
  });

  it('should not start multiple timers', () => {
    const { result } = renderHook(() =>
      useTimer({ allowedTime: 60, onFinish: jest.fn() })
    );

    act(() => {
      result.current.startTimer();
      result.current.startTimer(); // Try to start again
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Should only decrement by 1, not 2
    expect(result.current.timeLeft).toBe(59);
  });

  it('should update time when allowedTime prop changes', () => {
    const { result, rerender } = renderHook(
      ({ allowedTime }) => useTimer({ allowedTime, onFinish: jest.fn() }),
      { initialProps: { allowedTime: 60 } }
    );

    expect(result.current.timeLeft).toBe(60);

    rerender({ allowedTime: 90 });

    expect(result.current.timeLeft).toBe(90);
  });
});

