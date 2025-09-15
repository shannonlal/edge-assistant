import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IconCheck } from './IconCheck';

describe('IconCheck Component', () => {
  it('renders with default props', () => {
    render(<IconCheck data-testid="check-icon" />);
    const svg = screen.getByTestId('check-icon');
    const path = svg.querySelector('path');

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
    expect(svg).toHaveAttribute('viewBox', '0 0 20 20');
    expect(path).toHaveAttribute('stroke', 'currentColor');
  });

  it('renders with custom size', () => {
    render(<IconCheck size={32} data-testid="check-icon" />);
    const svg = screen.getByTestId('check-icon');

    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
  });

  it('renders with custom color', () => {
    render(<IconCheck color="red" data-testid="check-icon" />);
    const path = screen.getByTestId('check-icon').querySelector('path');

    expect(path).toHaveAttribute('stroke', 'red');
  });

  it('applies custom className', () => {
    render(<IconCheck data-testid="check-icon" className="custom-class" />);
    const svg = screen.getByTestId('check-icon');

    expect(svg).toHaveClass('custom-class');
  });

  it('passes through additional native props', () => {
    render(<IconCheck data-testid="check-icon" className="custom-class" aria-label="Check" />);
    const svg = screen.getByTestId('check-icon');

    expect(svg).toHaveClass('custom-class');
    expect(svg).toHaveAttribute('aria-label', 'Check');
  });
});
