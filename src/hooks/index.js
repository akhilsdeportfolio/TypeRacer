/**
 * Custom Hooks - Barrel Export
 *
 * Centralized export for all custom React hooks
 *
 * Architecture:
 * - Core hooks: useGameState, useTimer, useSound
 * - Utility hooks: useLocalStorage, useKeyboardShortcuts
 * - Composed hooks: useTypeRacer (facade pattern)
 * - Performance hooks: useRenderCount, useWhyDidYouUpdate
 */

// Timer hook
export { useTimer } from './useTimer';

// Game state hook (with reducer pattern)
export { useGameState, GAME_ACTIONS, gameReducer } from './useGameState';

// Sound hook
export { useSound } from './useSound';

// LocalStorage hooks
export { useLocalStorage, useLocalStorageBoolean } from './useLocalStorage';

// Keyboard shortcuts hooks
export { useKeyboardShortcuts, useTypeRacerShortcuts } from './useKeyboardShortcuts';

// Composed hook (facade pattern)
export { useTypeRacer } from './useTypeRacer';

// Performance debugging hooks
export {
  useRenderCount,
  useWhyDidYouUpdate,
  usePrevious,
  useDebounce,
  useThrottle,
  performanceUtils
} from './usePerformance';

// Achievements hook
export { useAchievements } from './useAchievements';

// WPM tracking hook
export { useWPMTracking } from './useWPMTracking';

