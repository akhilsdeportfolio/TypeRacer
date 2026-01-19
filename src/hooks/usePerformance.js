import { useRef, useEffect, useCallback, useState } from 'react';

/**
 * useRenderCount - Development utility to track component renders
 * 
 * Helps identify unnecessary re-renders during development.
 * Automatically disabled in production builds.
 * 
 * @param {string} componentName - Name of the component being tracked
 * @returns {number} Current render count
 */
export function useRenderCount(componentName) {
  const renderCount = useRef(0);
  
  renderCount.current += 1;
  
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(`[Render] ${componentName}: ${renderCount.current}`);
  }
  
  return renderCount.current;
}

/**
 * useWhyDidYouUpdate - Debug hook to log prop changes
 * 
 * Logs which props changed between renders to help identify
 * unnecessary re-renders caused by unstable references.
 * 
 * @param {string} componentName - Name of the component
 * @param {Object} props - Current props object
 */
export function useWhyDidYouUpdate(componentName, props) {
  const previousProps = useRef({});

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const allKeys = Object.keys({ ...previousProps.current, ...props });
    const changedProps = {};

    allKeys.forEach(key => {
      if (previousProps.current[key] !== props[key]) {
        changedProps[key] = {
          from: previousProps.current[key],
          to: props[key],
        };
      }
    });

    if (Object.keys(changedProps).length > 0) {
      // eslint-disable-next-line no-console
      console.log(`[WhyDidYouUpdate] ${componentName}:`, changedProps);
    }

    previousProps.current = props;
  });
}

/**
 * usePrevious - Track previous value of a variable
 * 
 * Useful for comparing current and previous values to determine
 * if a specific value change triggered a re-render.
 * 
 * @param {*} value - Current value to track
 * @returns {*} Previous value
 */
export function usePrevious(value) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  });
  
  return ref.current;
}

/**
 * useDebounce - Debounce a rapidly changing value
 * 
 * Useful for expensive operations that shouldn't run on every change
 * (e.g., API calls, complex calculations).
 * 
 * @param {*} value - Value to debounce
 * @param {number} delay - Debounce delay in ms
 * @returns {*} Debounced value
 */
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * useThrottle - Throttle a callback function
 * 
 * Ensures a function is called at most once per specified interval.
 * 
 * @param {Function} callback - Function to throttle
 * @param {number} delay - Minimum time between calls in ms
 * @returns {Function} Throttled callback
 */
export function useThrottle(callback, delay) {
  const lastCall = useRef(0);
  
  return useCallback((...args) => {
    const now = Date.now();
    if (now - lastCall.current >= delay) {
      lastCall.current = now;
      callback(...args);
    }
  }, [callback, delay]);
}

/**
 * Performance measurement utilities
 */
export const performanceUtils = {
  /**
   * Measure execution time of a function
   */
  measure: (name, fn) => {
    if (process.env.NODE_ENV !== 'development') return fn();
    
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    
    // eslint-disable-next-line no-console
    console.log(`[Perf] ${name}: ${(end - start).toFixed(2)}ms`);
    return result;
  },
  
  /**
   * Mark a performance entry
   */
  mark: (name) => {
    if (process.env.NODE_ENV === 'development') {
      performance.mark(name);
    }
  },
};

