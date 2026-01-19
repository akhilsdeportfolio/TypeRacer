import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button component', () => {
  it('should render with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    expect(screen.getByText('Disabled Button')).toBeDisabled();
  });

  it('should not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        Disabled Button
      </Button>
    );

    fireEvent.click(screen.getByText('Disabled Button'));

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should apply primary variant class by default', () => {
    render(<Button>Primary Button</Button>);
    expect(screen.getByText('Primary Button')).toHaveClass('btn--primary');
  });

  it('should apply secondary variant class', () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    expect(screen.getByText('Secondary Button')).toHaveClass('btn--secondary');
  });

  it('should apply icon variant class', () => {
    render(<Button variant="icon">🔊</Button>);
    expect(screen.getByText('🔊')).toHaveClass('btn--icon');
  });

  it('should apply size classes', () => {
    const { rerender } = render(<Button size="small">Small</Button>);
    expect(screen.getByText('Small')).toHaveClass('btn--small');

    rerender(<Button size="large">Large</Button>);
    expect(screen.getByText('Large')).toHaveClass('btn--large');
  });

  it('should apply custom className', () => {
    render(<Button className="custom-class">Custom</Button>);
    expect(screen.getByText('Custom')).toHaveClass('custom-class');
  });

  it('should render with title attribute', () => {
    render(<Button title="Button title">Titled</Button>);
    expect(screen.getByTitle('Button title')).toBeInTheDocument();
  });

  it('should have correct button type', () => {
    const { rerender } = render(<Button type="submit">Submit</Button>);
    expect(screen.getByText('Submit')).toHaveAttribute('type', 'submit');

    rerender(<Button type="reset">Reset</Button>);
    expect(screen.getByText('Reset')).toHaveAttribute('type', 'reset');
  });

  it('should default to type button', () => {
    render(<Button>Default</Button>);
    expect(screen.getByText('Default')).toHaveAttribute('type', 'button');
  });
});

