import { renderHook, act } from '@testing-library/react-hooks';
import { useLocalStorage, useLocalStorageBoolean } from '../useLocalStorage';

describe('useLocalStorage hook', () => {
  beforeEach(() => {
    window.localStorage.getItem.mockClear();
    window.localStorage.setItem.mockClear();
  });

  describe('useLocalStorage', () => {
    it('should return initial value when localStorage is empty', () => {
      window.localStorage.getItem.mockReturnValue(null);

      const { result } = renderHook(() =>
        useLocalStorage('testKey', 'defaultValue')
      );

      expect(result.current[0]).toBe('defaultValue');
    });

    it('should return value from localStorage if it exists', () => {
      window.localStorage.getItem.mockReturnValue(JSON.stringify('storedValue'));

      const { result } = renderHook(() =>
        useLocalStorage('testKey', 'defaultValue')
      );

      expect(result.current[0]).toBe('storedValue');
    });

    it('should update localStorage when setValue is called', () => {
      window.localStorage.getItem.mockReturnValue(null);

      const { result } = renderHook(() =>
        useLocalStorage('testKey', 'defaultValue')
      );

      act(() => {
        result.current[1]('newValue');
      });

      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        'testKey',
        JSON.stringify('newValue')
      );
      expect(result.current[0]).toBe('newValue');
    });

    it('should handle function updates like useState', () => {
      window.localStorage.getItem.mockReturnValue(JSON.stringify(5));

      const { result } = renderHook(() =>
        useLocalStorage('count', 0)
      );

      act(() => {
        result.current[1]((prev) => prev + 1);
      });

      expect(result.current[0]).toBe(6);
    });

    it('should handle objects and arrays', () => {
      window.localStorage.getItem.mockReturnValue(null);

      const { result } = renderHook(() =>
        useLocalStorage('user', { name: 'John' })
      );

      expect(result.current[0]).toEqual({ name: 'John' });

      act(() => {
        result.current[1]({ name: 'Jane', age: 25 });
      });

      expect(result.current[0]).toEqual({ name: 'Jane', age: 25 });
    });
  });

  describe('useLocalStorageBoolean', () => {
    it('should return initial value when localStorage is empty', () => {
      window.localStorage.getItem.mockReturnValue(null);

      const { result } = renderHook(() =>
        useLocalStorageBoolean('boolKey', false)
      );

      expect(result.current[0]).toBe(false);
    });

    it('should parse true from localStorage', () => {
      window.localStorage.getItem.mockReturnValue('true');

      const { result } = renderHook(() =>
        useLocalStorageBoolean('boolKey', false)
      );

      expect(result.current[0]).toBe(true);
    });

    it('should parse false from localStorage', () => {
      window.localStorage.getItem.mockReturnValue('false');

      const { result } = renderHook(() =>
        useLocalStorageBoolean('boolKey', true)
      );

      expect(result.current[0]).toBe(false);
    });

    it('should toggle boolean values', () => {
      window.localStorage.getItem.mockReturnValue('false');

      const { result } = renderHook(() =>
        useLocalStorageBoolean('boolKey', false)
      );

      act(() => {
        result.current[1](true);
      });

      expect(result.current[0]).toBe(true);
      expect(window.localStorage.setItem).toHaveBeenCalledWith('boolKey', 'true');
    });
  });
});

