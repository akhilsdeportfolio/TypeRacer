/**
 * GameArea Integration Tests
 * Tests the GameArea component with real user interactions
 */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import GameArea from '../components/organisms/GameArea';

describe('GameArea Integration', () => {
  const targetText = 'Hello World';
  let onInputChange;

  beforeEach(() => {
    onInputChange = jest.fn();
  });

  describe('Character rendering and status', () => {
    it('should render all characters as pending initially', () => {
      render(
        <GameArea
          targetText={targetText}
          userInput=""
          onInputChange={onInputChange}
        />
      );

      const characters = document.querySelectorAll('.character');
      expect(characters.length).toBe(targetText.length);
      characters.forEach((char) => {
        expect(char.classList.contains('character--pending')).toBe(true);
      });
    });

    it('should mark correct characters with correct status', () => {
      render(
        <GameArea
          targetText={targetText}
          userInput="Hello"
          onInputChange={onInputChange}
        />
      );

      const characters = document.querySelectorAll('.character');
      // First 5 characters should be correct
      for (let i = 0; i < 5; i++) {
        expect(characters[i].classList.contains('character--correct')).toBe(true);
      }
      // 6th character (space) should be pending (cursor position)
      expect(characters[5].classList.contains('character--pending')).toBe(true);
    });

    it('should mark incorrect characters with incorrect status', () => {
      render(
        <GameArea
          targetText={targetText}
          userInput="Hxllo"
          onInputChange={onInputChange}
        />
      );

      const characters = document.querySelectorAll('.character');
      expect(characters[0].classList.contains('character--correct')).toBe(true);
      expect(characters[1].classList.contains('character--incorrect')).toBe(true);
      expect(characters[2].classList.contains('character--correct')).toBe(true);
    });

    it('should show cursor at current typing position', () => {
      render(
        <GameArea
          targetText={targetText}
          userInput="Hel"
          onInputChange={onInputChange}
        />
      );

      const characters = document.querySelectorAll('.character');
      // Cursor should be at index 3 (4th character)
      expect(characters[3].classList.contains('character--cursor')).toBe(true);
      // Other positions should not have cursor
      expect(characters[2].classList.contains('character--cursor')).toBe(false);
      expect(characters[4].classList.contains('character--cursor')).toBe(false);
    });
  });

  describe('Input handling', () => {
    it('should call onInputChange when user types', () => {
      render(
        <GameArea
          targetText={targetText}
          userInput=""
          onInputChange={onInputChange}
        />
      );

      const input = document.querySelector('.game-area__input');
      fireEvent.change(input, { target: { value: 'H' } });

      expect(onInputChange).toHaveBeenCalledWith('H');
    });

    it('should call onInputChange for each character typed', () => {
      const { rerender } = render(
        <GameArea
          targetText={targetText}
          userInput=""
          onInputChange={onInputChange}
        />
      );

      const input = document.querySelector('.game-area__input');
      
      fireEvent.change(input, { target: { value: 'H' } });
      expect(onInputChange).toHaveBeenCalledWith('H');

      rerender(
        <GameArea
          targetText={targetText}
          userInput="H"
          onInputChange={onInputChange}
        />
      );

      fireEvent.change(input, { target: { value: 'He' } });
      expect(onInputChange).toHaveBeenCalledWith('He');
    });

    it('should disable input when disabled prop is true', () => {
      render(
        <GameArea
          targetText={targetText}
          userInput=""
          onInputChange={onInputChange}
          disabled={true}
        />
      );

      const input = document.querySelector('.game-area__input');
      expect(input).toBeDisabled();
    });
  });

  describe('Completion flow', () => {
    it('should mark all characters as correct when text is complete', () => {
      render(
        <GameArea
          targetText={targetText}
          userInput={targetText}
          onInputChange={onInputChange}
        />
      );

      const characters = document.querySelectorAll('.character');
      characters.forEach((char) => {
        expect(char.classList.contains('character--correct')).toBe(true);
      });
    });
  });
});

