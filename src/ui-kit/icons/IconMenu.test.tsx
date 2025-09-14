import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { IconMenu } from './IconMenu';

describe('IconMenu Component', () => {
  it('renders with default props', () => {
    const { getByTestId } = render(<IconMenu data-testid="menu-icon" />);
    const icon = getByTestId('menu-icon');

    // Check SVG attributes
    expect(icon).toHaveAttribute('width', '24');
    expect(icon).toHaveAttribute('height', '24');
    expect(icon).toHaveAttribute('viewBox', '0 0 24 24');

    // Check fill color is currentColor by default
    const paths = icon.querySelectorAll('path');
    paths.forEach(path => {
      expect(path).toHaveAttribute('fill', 'currentColor');
    });
  });

  it('renders with custom size and color', () => {
    const { getByTestId } = render(<IconMenu data-testid="menu-icon" size={32} color="#FF0000" />);
    const icon = getByTestId('menu-icon');

    // Check custom size
    expect(icon).toHaveAttribute('width', '32');
    expect(icon).toHaveAttribute('height', '32');

    // Check custom color
    const paths = icon.querySelectorAll('path');
    paths.forEach(path => {
      expect(path).toHaveAttribute('fill', '#FF0000');
    });
  });

  it('passes through additional SVG props', () => {
    const { getByTestId } = render(
      <IconMenu data-testid="menu-icon" className="custom-class" aria-label="Menu Icon" />
    );
    const icon = getByTestId('menu-icon');

    expect(icon).toHaveClass('custom-class');
    expect(icon).toHaveAttribute('aria-label', 'Menu Icon');
  });

  it('has correct number of paths', () => {
    const { getByTestId } = render(<IconMenu data-testid="menu-icon" />);
    const icon = getByTestId('menu-icon');
    const paths = icon.querySelectorAll('path');

    expect(paths.length).toBe(3);
  });

  it('has correct path fill attributes', () => {
    const { getByTestId } = render(<IconMenu data-testid="menu-icon" />);
    const icon = getByTestId('menu-icon');
    const paths = icon.querySelectorAll('path');

    paths.forEach(path => {
      expect(path).toHaveAttribute('fill');
    });
  });
});
