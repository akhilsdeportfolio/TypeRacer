/**
 * Context providers for global state management
 * 
 * Architecture:
 * - GameContext: Game state, input, stats, timer
 * - SettingsContext: User preferences (dark mode, sound, high scores)
 * - ThemeContext: Visual theme customization
 */

export { GameProvider, useGameContext, ACTIONS } from './GameContext';
export { SettingsProvider, useSettings } from './SettingsContext';
export { ThemeProvider, useTheme } from './ThemeContext';

