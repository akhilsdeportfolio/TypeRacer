import React from 'react';
import { render, screen } from '@testing-library/react';
import StatCard from '../StatCard';

describe('StatCard component', () => {
  it('should render label and value', () => {
    render(<StatCard label="WPM" value={75} />);
    expect(screen.getByText('WPM')).toBeInTheDocument();
    expect(screen.getByText('75')).toBeInTheDocument();
  });

  it('should render string value', () => {
    render(<StatCard label="Status" value="Active" />);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('should render icon when provided', () => {
    render(<StatCard label="Speed" value={100} icon="🚀" />);
    expect(screen.getByText('🚀')).toBeInTheDocument();
  });

  it('should not render icon when not provided', () => {
    const { container } = render(<StatCard label="Speed" value={100} />);
    expect(container.querySelector('.stat-card__icon')).not.toBeInTheDocument();
  });

  it('should apply default variant class', () => {
    const { container } = render(<StatCard label="Test" value={0} />);
    expect(container.firstChild).toHaveClass('stat-card--default');
  });

  it('should apply highlight variant class', () => {
    const { container } = render(<StatCard label="Test" value={0} variant="highlight" />);
    expect(container.firstChild).toHaveClass('stat-card--highlight');
  });

  it('should apply success variant class', () => {
    const { container } = render(<StatCard label="Test" value={0} variant="success" />);
    expect(container.firstChild).toHaveClass('stat-card--success');
  });

  it('should apply warning variant class', () => {
    const { container } = render(<StatCard label="Test" value={0} variant="warning" />);
    expect(container.firstChild).toHaveClass('stat-card--warning');
  });

  it('should apply custom className', () => {
    const { container } = render(<StatCard label="Test" value={0} className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should render content structure correctly', () => {
    const { container } = render(<StatCard label="Test" value={0} />);
    expect(container.querySelector('.stat-card__content')).toBeInTheDocument();
    expect(container.querySelector('.stat-card__label')).toBeInTheDocument();
    expect(container.querySelector('.stat-card__value')).toBeInTheDocument();
  });

  it('should handle zero value', () => {
    render(<StatCard label="Errors" value={0} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should handle large numbers', () => {
    render(<StatCard label="Score" value={999999} />);
    expect(screen.getByText('999999')).toBeInTheDocument();
  });
});

