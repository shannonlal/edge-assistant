import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IconError } from './IconError';

describe('IconError Component', () => {
  it('renders with default props', () => {
    render(<IconError data-testid="error-icon" />);
    const svg = screen.getByTestId('error-icon');

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '80');
    expect(svg).toHaveAttribute('height', '80');
    expect(svg).toHaveAttribute('viewBox', '0 0 80 80');
  });

  it('renders with custom size', () => {
    render(<IconError size={100} data-testid="error-icon" />);
    const svg = screen.getByTestId('error-icon');

    expect(svg).toHaveAttribute('width', '100');
    expect(svg).toHaveAttribute('height', '100');
  });

  it('renders with correct colors and shapes', () => {
    render(<IconError data-testid="error-icon" />);
    const svg = screen.getByTestId('error-icon');
    const [outerRect, innerRect] = svg.querySelectorAll('rect');
    const path = svg.querySelector('path');

    expect(outerRect).toHaveAttribute('fill', '#FFF2E8');
    expect(innerRect).toHaveAttribute('fill', '#FF4A32');
    expect(path).toHaveAttribute('stroke', 'white');
  });

  it('passes through additional native props', () => {
    render(<IconError data-testid="error-icon" className="custom-class" aria-label="Error" />);
    const svg = screen.getByTestId('error-icon');

    expect(svg).toHaveClass('custom-class');
    expect(svg).toHaveAttribute('aria-label', 'Error');
  });
});
