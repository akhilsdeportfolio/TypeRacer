import { useEffect, useCallback } from 'react';

/**
 * Custom hook for managing keyboard shortcuts
 * @param {Object} shortcuts - Map of key combinations to handlers
 * @param {boolean} enabled - Whether shortcuts are enabled
 */
export const useKeyboardShortcuts = (shortcuts, enabled = true) => {
  const handleKeyDown = useCallback((event) => {
    if (!enabled) return;

    const { key, ctrlKey, metaKey, shiftKey, altKey } = event;
    const modifierKey = ctrlKey || metaKey;

    // Find matching shortcut
    Object.entries(shortcuts).forEach(([shortcut, handler]) => {
      const parts = shortcut.toLowerCase().split('+');
      const requiresCtrl = parts.includes('ctrl') || parts.includes('cmd');
      const requiresShift = parts.includes('shift');
      const requiresAlt = parts.includes('alt');
      const targetKey = parts[parts.length - 1];

      const matches = 
        key.toLowerCase() === targetKey &&
        (requiresCtrl ? modifierKey : !modifierKey) &&
        (requiresShift ? shiftKey : !shiftKey) &&
        (requiresAlt ? altKey : !altKey);

      if (matches) {
        event.preventDefault();
        handler(event);
      }
    });
  }, [shortcuts, enabled]);

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, enabled]);
};

/**
 * Hook for common TypeRacer keyboard shortcuts
 * @param {Object} handlers - Handler functions
 * @param {boolean} enabled - Whether shortcuts are enabled
 */
export const useTypeRacerShortcuts = (handlers, enabled = true) => {
  const shortcuts = {
    'ctrl+r': handlers.onRestart,
    'ctrl+d': handlers.onToggleDarkMode,
    'ctrl+m': handlers.onToggleSound,
  };

  useKeyboardShortcuts(shortcuts, enabled);
};

