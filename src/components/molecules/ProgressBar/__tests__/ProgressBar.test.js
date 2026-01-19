import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgressBar from '../ProgressBar';

describe('ProgressBar component', () => {
  it('should render with default progress of 0', () => {
    render(<ProgressBar />);
    expect(screen.getByText('Progress: 0%')).toBeInTheDocument();
  });

  it('should display the correct progress percentage', () => {
    render(<ProgressBar progress={50} />);
    expect(screen.getByText('Progress: 50%')).toBeInTheDocument();
  });

  it('should clamp progress to 100 when exceeding', () => {
    render(<ProgressBar progress={150} />);
    expect(screen.getByText('Progress: 100%')).toBeInTheDocument();
  });

  it('should clamp progress to 0 when negative', () => {
    render(<ProgressBar progress={-10} />);
    expect(screen.getByText('Progress: 0%')).toBeInTheDocument();
  });

  it('should hide label when showLabel is false', () => {
    render(<ProgressBar progress={50} showLabel={false} />);
    expect(screen.queryByText(/Progress:/)).not.toBeInTheDocument();
  });

  it('should apply default variant class', () => {
    const { container } = render(<ProgressBar />);
    expect(container.firstChild).toHaveClass('progress-bar--default');
  });

  it('should apply success variant class', () => {
    const { container } = render(<ProgressBar variant="success" />);
    expect(container.firstChild).toHaveClass('progress-bar--success');
  });

  it('should apply warning variant class', () => {
    const { container } = render(<ProgressBar variant="warning" />);
    expect(container.firstChild).toHaveClass('progress-bar--warning');
  });

  it('should apply custom className', () => {
    const { container } = render(<ProgressBar className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should set fill width based on progress', () => {
    const { container } = render(<ProgressBar progress={75} />);
    const fill = container.querySelector('.progress-bar__fill');
    expect(fill).toHaveStyle({ width: '75%' });
  });

  it('should render track element', () => {
    const { container } = render(<ProgressBar />);
    expect(container.querySelector('.progress-bar__track')).toBeInTheDocument();
  });
});

