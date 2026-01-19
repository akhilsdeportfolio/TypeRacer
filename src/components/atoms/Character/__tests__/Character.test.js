import React from 'react';
import { render, screen } from '@testing-library/react';
import Character from '../Character';

describe('Character component', () => {
  it('should render the character', () => {
    render(<Character char="a" />);
    expect(screen.getByText('a')).toBeInTheDocument();
  });

  it('should render space character', () => {
    const { container } = render(<Character char=" " />);
    // Space character renders as empty text content but element exists
    expect(container.querySelector('.character')).toBeInTheDocument();
  });

  it('should apply pending status by default', () => {
    render(<Character char="a" />);
    expect(screen.getByText('a')).toHaveClass('character--pending');
  });

  it('should apply correct status class', () => {
    render(<Character char="a" status="correct" />);
    expect(screen.getByText('a')).toHaveClass('character--correct');
  });

  it('should apply incorrect status class', () => {
    render(<Character char="a" status="incorrect" />);
    expect(screen.getByText('a')).toHaveClass('character--incorrect');
  });

  it('should apply cursor class when isCursor is true', () => {
    render(<Character char="a" isCursor />);
    expect(screen.getByText('a')).toHaveClass('character--cursor');
  });

  it('should not apply cursor class when isCursor is false', () => {
    render(<Character char="a" isCursor={false} />);
    expect(screen.getByText('a')).not.toHaveClass('character--cursor');
  });

  it('should apply custom className', () => {
    render(<Character char="a" className="custom-class" />);
    expect(screen.getByText('a')).toHaveClass('custom-class');
  });

  it('should combine all classes correctly', () => {
    render(
      <Character
        char="a"
        status="correct"
        isCursor
        className="custom"
      />
    );
    const element = screen.getByText('a');
    expect(element).toHaveClass('character');
    expect(element).toHaveClass('character--correct');
    expect(element).toHaveClass('character--cursor');
    expect(element).toHaveClass('custom');
  });

  it('should render special characters', () => {
    render(<Character char="@" />);
    expect(screen.getByText('@')).toBeInTheDocument();
  });
});

