import React, { Suspense, lazy } from 'react';

/**
 * Lazy-loaded components for code splitting
 * 
 * Benefits:
 * - Reduces initial bundle size
 * - Faster initial page load
 * - Game modes are loaded only when needed
 * 
 * Usage:
 * import { LazyGameArea, ComponentLoader } from './LazyComponents';
 * 
 * <Suspense fallback={<ComponentLoader name="Game" />}>
 *   <LazyGameArea {...props} />
 * </Suspense>
 */

// Loading fallback component
export const ComponentLoader = ({ name = 'Component', size = 'medium' }) => {
  const sizes = {
    small: { height: '50px', fontSize: '14px' },
    medium: { height: '100px', fontSize: '16px' },
    large: { height: '200px', fontSize: '18px' },
  };
  
  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: sizes[size].height,
    fontSize: sizes[size].fontSize,
    color: '#666',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: '8px',
    animation: 'pulse 1.5s ease-in-out infinite',
  };
  
  return (
    <div style={style} role="status" aria-label={`Loading ${name}`}>
      <span>Loading {name}...</span>
    </div>
  );
};

// Skeleton loader for stats
export const StatsSkeleton = () => (
  <div className="stats-skeleton">
    {[1, 2, 3, 4].map(i => (
      <div key={i} className="stats-skeleton__item" />
    ))}
  </div>
);

// Skeleton loader for game area
export const GameAreaSkeleton = () => (
  <div className="game-area-skeleton">
    <div className="game-area-skeleton__text" />
    <div className="game-area-skeleton__input" />
  </div>
);

/**
 * Lazy load wrapper with error handling
 * 
 * @param {Function} importFn - Dynamic import function
 * @param {string} name - Component name for loading state
 * @returns {React.LazyExoticComponent}
 */
export function lazyWithRetry(importFn, name = 'Component') {
  return lazy(() =>
    importFn().catch(error => {
      console.error(`Failed to load ${name}:`, error);
      // Return a fallback component
      return {
        default: () => (
          <div className="lazy-error">
            <p>Failed to load {name}</p>
            <button onClick={() => window.location.reload()}>
              Reload Page
            </button>
          </div>
        ),
      };
    })
  );
}

// Lazy loaded components
// Note: These would be actual lazy imports in a larger codebase
// For now, they're placeholders showing the pattern

// Example usage for game modes:
// export const LazyZenMode = lazyWithRetry(
//   () => import('./gamemodes/ZenMode'),
//   'Zen Mode'
// );

// export const LazyMarathonMode = lazyWithRetry(
//   () => import('./gamemodes/MarathonMode'),
//   'Marathon Mode'
// );

// export const LazyCodeMode = lazyWithRetry(
//   () => import('./gamemodes/CodeMode'),
//   'Code Mode'
// );

/**
 * Preload a lazy component
 * Call this on hover/focus to start loading before user clicks
 * 
 * @param {React.LazyExoticComponent} LazyComponent - Component to preload
 */
export function preloadComponent(LazyComponent) {
  // Trigger the lazy component's import
  if (LazyComponent._payload && LazyComponent._init) {
    LazyComponent._init(LazyComponent._payload);
  }
}

/**
 * Higher-order component for suspense wrapping
 * 
 * @param {React.ComponentType} Component - Component to wrap
 * @param {React.ReactNode} fallback - Fallback while loading
 * @returns {React.ComponentType}
 */
export function withSuspense(Component, fallback = <ComponentLoader />) {
  return function SuspenseWrapper(props) {
    return (
      <Suspense fallback={fallback}>
        <Component {...props} />
      </Suspense>
    );
  };
}

