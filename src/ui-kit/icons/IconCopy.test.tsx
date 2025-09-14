import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { IconCopy } from './IconCopy';

describe('IconCopy Component', () => {
  it('renders with default props', () => {
    render(<IconCopy data-testid="icon-copy" />);
    const svg = screen.getByTestId('icon-copy');

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
    expect(svg).toHaveAttribute('viewBox', '0 0 20 21');
    expect(svg).toHaveAttribute('fill', 'none');
  });

  it('renders with custom size and color', () => {
    render(<IconCopy size={32} color="#FF0000" data-testid="icon-copy" />);
    const svg = screen.getByTestId('icon-copy');

    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');

    const strokes = svg.querySelectorAll('[stroke="#FF0000"]');
    expect(strokes.length).toBeGreaterThan(0);
  });

  it('passes additional SVG props', () => {
    render(<IconCopy data-testid="icon-copy" className="custom-icon" aria-label="Copy Icon" />);
    const svg = screen.getByTestId('icon-copy');

    expect(svg).toHaveAttribute('data-testid', 'icon-copy');
    expect(svg).toHaveClass('custom-icon');
    expect(svg).toHaveAttribute('aria-label', 'Copy Icon');
  });

  it('has correct SVG structure', () => {
    render(<IconCopy data-testid="icon-copy" />);
    const svg = screen.getByTestId('icon-copy');

    const paths = svg.querySelectorAll('path');
    expect(paths.length).toBe(1);

    const path = paths[0];
    expect(path.getAttribute('stroke')).toBe('currentColor');
    expect(path.getAttribute('stroke-width')).toBe('2');
    expect(path.getAttribute('stroke-linecap')).toBe('round');
    expect(path.getAttribute('stroke-linejoin')).toBe('round');
  });
});
