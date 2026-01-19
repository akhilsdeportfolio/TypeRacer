import {
  calculateWPM,
  calculateAccuracy,
  calculateProgress,
  countCorrectChars,
  isCharCorrect,
  getCharStatus,
} from '../calculations';

describe('calculations utility functions', () => {
  describe('calculateWPM', () => {
    it('should return 0 when time is 0 or negative', () => {
      expect(calculateWPM(50, 0)).toBe(0);
      expect(calculateWPM(50, -1000)).toBe(0);
    });

    it('should calculate WPM correctly', () => {
      // 50 correct chars in 60 seconds = 10 words per minute (50/5 = 10 words)
      expect(calculateWPM(50, 60000)).toBe(10);
    });

    it('should calculate WPM for 30 seconds', () => {
      // 50 correct chars in 30 seconds = 20 WPM
      expect(calculateWPM(50, 30000)).toBe(20);
    });

    it('should round WPM to nearest integer', () => {
      // 37 chars in 60 seconds = 7.4 WPM, should round to 7
      expect(calculateWPM(37, 60000)).toBe(7);
    });

    it('should handle large values', () => {
      // 500 chars in 60 seconds = 100 WPM
      expect(calculateWPM(500, 60000)).toBe(100);
    });
  });

  describe('calculateAccuracy', () => {
    it('should return 0 when total chars is 0 or negative', () => {
      expect(calculateAccuracy(50, 0)).toBe(0);
      expect(calculateAccuracy(50, -10)).toBe(0);
    });

    it('should calculate 100% accuracy when all chars are correct', () => {
      expect(calculateAccuracy(50, 50)).toBe(100);
    });

    it('should calculate partial accuracy correctly', () => {
      expect(calculateAccuracy(75, 100)).toBe(75);
      expect(calculateAccuracy(50, 100)).toBe(50);
    });

    it('should round to nearest integer', () => {
      // 33/100 = 33%
      expect(calculateAccuracy(33, 100)).toBe(33);
      // 1/3 = 33.33...% -> 33
      expect(calculateAccuracy(1, 3)).toBe(33);
    });
  });

  describe('calculateProgress', () => {
    it('should return 0 when target length is 0 or negative', () => {
      expect(calculateProgress(50, 0)).toBe(0);
      expect(calculateProgress(50, -10)).toBe(0);
    });

    it('should calculate progress correctly', () => {
      expect(calculateProgress(50, 100)).toBe(50);
      expect(calculateProgress(100, 100)).toBe(100);
      expect(calculateProgress(25, 100)).toBe(25);
    });

    it('should handle when current exceeds target', () => {
      expect(calculateProgress(150, 100)).toBe(150);
    });
  });

  describe('countCorrectChars', () => {
    it('should count all correct chars when input matches', () => {
      expect(countCorrectChars('hello', 'hello')).toBe(5);
    });

    it('should count partial correct chars', () => {
      expect(countCorrectChars('helxo', 'hello')).toBe(4);
    });

    it('should return 0 when no chars match', () => {
      expect(countCorrectChars('xxxxx', 'hello')).toBe(0);
    });

    it('should handle empty input', () => {
      expect(countCorrectChars('', 'hello')).toBe(0);
    });

    it('should handle shorter input than target', () => {
      expect(countCorrectChars('hel', 'hello')).toBe(3);
    });
  });

  describe('isCharCorrect', () => {
    it('should return true when char matches', () => {
      expect(isCharCorrect('hello', 'hello', 0)).toBe(true);
      expect(isCharCorrect('hello', 'hello', 4)).toBe(true);
    });

    it('should return false when char does not match', () => {
      expect(isCharCorrect('hxllo', 'hello', 1)).toBe(false);
    });

    it('should handle undefined for out of bounds', () => {
      // When both are undefined (out of bounds), they are equal
      expect(isCharCorrect('hi', 'hello', 5)).toBe(true);
    });
  });

  describe('getCharStatus', () => {
    it('should return pending when index is beyond user input', () => {
      expect(getCharStatus('hel', 'hello', 3)).toBe('pending');
      expect(getCharStatus('hel', 'hello', 4)).toBe('pending');
    });

    it('should return correct when char matches', () => {
      expect(getCharStatus('hello', 'hello', 0)).toBe('correct');
      expect(getCharStatus('hello', 'hello', 4)).toBe('correct');
    });

    it('should return incorrect when char does not match', () => {
      expect(getCharStatus('hxllo', 'hello', 1)).toBe('incorrect');
    });

    it('should handle empty input', () => {
      expect(getCharStatus('', 'hello', 0)).toBe('pending');
    });
  });
});

