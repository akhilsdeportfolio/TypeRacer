/**
 * Audio utility functions using Web Audio API
 */

const SOUND_TYPES = {
  CORRECT: 'correct',
  INCORRECT: 'incorrect',
  COMPLETE: 'complete',
};

const SOUND_CONFIG = {
  [SOUND_TYPES.CORRECT]: {
    frequency: 800,
    gain: 0.1,
    duration: 0.05,
  },
  [SOUND_TYPES.INCORRECT]: {
    frequency: 200,
    gain: 0.15,
    duration: 0.05,
  },
  [SOUND_TYPES.COMPLETE]: {
    frequency: 1200,
    gain: 0.2,
    duration: 0.05,
  },
};

/**
 * Play a sound effect
 * @param {string} type - Sound type (correct, incorrect, complete)
 * @param {boolean} enabled - Whether sound is enabled
 */
export const playSound = (type, enabled = true) => {
  if (!enabled || !SOUND_CONFIG[type]) return;

  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    const config = SOUND_CONFIG[type];
    oscillator.frequency.value = config.frequency;
    gainNode.gain.value = config.gain;

    oscillator.start();
    oscillator.stop(audioContext.currentTime + config.duration);
  } catch (error) {
    console.warn(`Error playing sound: ${error.message}`);
  }
};

/**
 * Play correct character sound
 * @param {boolean} enabled - Whether sound is enabled
 */
export const playCorrectSound = (enabled) => {
  playSound(SOUND_TYPES.CORRECT, enabled);
};

/**
 * Play incorrect character sound
 * @param {boolean} enabled - Whether sound is enabled
 */
export const playIncorrectSound = (enabled) => {
  playSound(SOUND_TYPES.INCORRECT, enabled);
};

/**
 * Play completion sound
 * @param {boolean} enabled - Whether sound is enabled
 */
export const playCompleteSound = (enabled) => {
  playSound(SOUND_TYPES.COMPLETE, enabled);
};

export { SOUND_TYPES };

