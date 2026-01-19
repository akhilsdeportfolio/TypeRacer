import { useCallback } from 'react';
import { playCorrectSound, playIncorrectSound, playCompleteSound } from '../utils/audio';

/**
 * Custom hook for managing sound effects
 * @param {boolean} enabled - Whether sound is enabled
 * @returns {Object} Sound control functions
 */
export const useSound = (enabled) => {
  const playCorrect = useCallback(() => {
    playCorrectSound(enabled);
  }, [enabled]);

  const playIncorrect = useCallback(() => {
    playIncorrectSound(enabled);
  }, [enabled]);

  const playComplete = useCallback(() => {
    playCompleteSound(enabled);
  }, [enabled]);

  return {
    playCorrect,
    playIncorrect,
    playComplete,
  };
};

