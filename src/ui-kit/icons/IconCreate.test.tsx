import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { IconCreate } from './IconCreate';

describe('IconCreate Component', () => {
  it('renders with default props', () => {
    render(<IconCreate data-testid="icon-create" />);
    const svg = screen.getByTestId('icon-create');

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    expect(svg).toHaveAttribute('fill', 'none');
  });

  it('renders with custom size and color', () => {
    render(<IconCreate size={32} color="#FF0000" data-testid="icon-create" />);
    const svg = screen.getByTestId('icon-create');

    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');

    const strokes = svg.querySelectorAll('[stroke="#FF0000"]');
    expect(strokes.length).toBeGreaterThan(0);
  });

  it('passes additional SVG props', () => {
    render(
      <IconCreate data-testid="icon-create" className="custom-icon" aria-label="Create Icon" />
    );
    const svg = screen.getByTestId('icon-create');

    expect(svg).toHaveAttribute('data-testid', 'icon-create');
    expect(svg).toHaveClass('custom-icon');
    expect(svg).toHaveAttribute('aria-label', 'Create Icon');
  });

  it('has correct SVG structure', () => {
    render(<IconCreate data-testid="icon-create" />);
    const svg = screen.getByTestId('icon-create');

    const paths = svg.querySelectorAll('path');
    expect(paths.length).toBe(1);

    const path = paths[0];
    expect(path.getAttribute('stroke')).toBe('currentColor');
    expect(path.getAttribute('stroke-width')).toBe('2');
    expect(path.getAttribute('stroke-linecap')).toBe('round');
    expect(path.getAttribute('stroke-linejoin')).toBe('round');
  });
});
