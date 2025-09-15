import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { IconButton } from './IconButton';

describe('IconButton Component', () => {
  it('renders with default props', () => {
    render(<IconButton data-testid="icon-button" />);
    const svg = screen.getByTestId('icon-button');

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    expect(svg).toHaveAttribute('fill', 'none');
  });

  it('renders with custom size and color', () => {
    render(<IconButton size={32} color="#FF0000" data-testid="icon-button" />);
    const svg = screen.getByTestId('icon-button');

    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');

    const strokes = svg.querySelectorAll('[stroke="#FF0000"]');
    const fills = svg.querySelectorAll('[fill="#FF0000"]');
    expect(strokes.length).toBeGreaterThan(0);
    expect(fills.length).toBeGreaterThan(0);
  });

  it('passes additional SVG props', () => {
    render(
      <IconButton data-testid="icon-button" className="custom-icon" aria-label="Button Icon" />
    );
    const svg = screen.getByTestId('icon-button');

    expect(svg).toHaveAttribute('data-testid', 'icon-button');
    expect(svg).toHaveClass('custom-icon');
    expect(svg).toHaveAttribute('aria-label', 'Button Icon');
  });

  it('has correct SVG structure', () => {
    render(<IconButton data-testid="icon-button" />);
    const svg = screen.getByTestId('icon-button');

    const rects = svg.querySelectorAll('rect');
    expect(rects.length).toBe(3);

    // Check the main background rect
    const backgroundRect = rects[0];
    expect(backgroundRect).toHaveAttribute('x', '2');
    expect(backgroundRect).toHaveAttribute('y', '8');
    expect(backgroundRect).toHaveAttribute('width', '20');
    expect(backgroundRect).toHaveAttribute('height', '8');
    expect(backgroundRect).toHaveAttribute('rx', '4');
  });
});
