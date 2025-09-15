import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { IconRedo } from './IconRedo';

describe('IconRedo Component', () => {
  it('renders with default props', () => {
    const { getByTestId } = render(<IconRedo data-testid="redo-icon" />);
    const icon = getByTestId('redo-icon');

    // Check SVG attributes
    expect(icon).toHaveAttribute('width', '24');
    expect(icon).toHaveAttribute('height', '24');
    expect(icon).toHaveAttribute('viewBox', '0 0 16 16');

    // Check default class
    expect(icon).toHaveClass('stroke-current');

    // Check stroke color is currentColor by default
    const paths = icon.querySelectorAll('path');
    paths.forEach(path => {
      expect(path).toHaveAttribute('stroke', 'currentColor');
    });
  });

  it('renders with custom size and color', () => {
    const { getByTestId } = render(<IconRedo data-testid="redo-icon" size={32} color="#FF0000" />);
    const icon = getByTestId('redo-icon');

    // Check custom size
    expect(icon).toHaveAttribute('width', '32');
    expect(icon).toHaveAttribute('height', '32');

    // Check custom color
    const paths = icon.querySelectorAll('path');
    paths.forEach(path => {
      expect(path).toHaveAttribute('stroke', '#FF0000');
    });
  });

  it('passes through additional SVG props', () => {
    const { getByTestId } = render(
      <IconRedo data-testid="redo-icon" className="custom-class" aria-label="Redo Icon" />
    );
    const icon = getByTestId('redo-icon');

    expect(icon).toHaveClass('custom-class');
    expect(icon).toHaveClass('stroke-current');
    expect(icon).toHaveAttribute('aria-label', 'Redo Icon');
  });

  it('has correct number of paths', () => {
    const { getByTestId } = render(<IconRedo data-testid="redo-icon" />);
    const icon = getByTestId('redo-icon');
    const paths = icon.querySelectorAll('path');

    expect(paths.length).toBe(1);
  });

  it('has correct path attributes', () => {
    const { getByTestId } = render(<IconRedo data-testid="redo-icon" />);
    const icon = getByTestId('redo-icon');
    const path = icon.querySelector('path');

    expect(path).toHaveAttribute('stroke-width', '2');
    expect(path).toHaveAttribute('stroke-linecap', 'round');
    expect(path).toHaveAttribute('stroke-linejoin', 'round');
  });

  it('combines className with default stroke class', () => {
    const { getByTestId } = render(<IconRedo data-testid="redo-icon" className="test-class" />);
    const icon = getByTestId('redo-icon');

    expect(icon).toHaveClass('stroke-current');
    expect(icon).toHaveClass('test-class');
  });
});
