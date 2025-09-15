import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { IconLogo } from './IconLogo';

describe('IconLogo Component', () => {
  it('renders with default props', () => {
    const { getByTestId } = render(<IconLogo data-testid="logo-icon" />);
    const icon = getByTestId('logo-icon');

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
    const { getByTestId } = render(<IconLogo data-testid="logo-icon" size={32} color="#FF0000" />);
    const icon = getByTestId('logo-icon');

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
      <IconLogo data-testid="logo-icon" className="custom-class" aria-label="Logo Icon" />
    );
    const icon = getByTestId('logo-icon');

    expect(icon).toHaveClass('custom-class');
    expect(icon).toHaveAttribute('aria-label', 'Logo Icon');
  });

  it('has correct number of paths', () => {
    const { getByTestId } = render(<IconLogo data-testid="logo-icon" />);
    const icon = getByTestId('logo-icon');
    const paths = icon.querySelectorAll('path');

    expect(paths.length).toBe(1);
  });

  it('has correct path attributes', () => {
    const { getByTestId } = render(<IconLogo data-testid="logo-icon" />);
    const icon = getByTestId('logo-icon');
    const path = icon.querySelector('path');

    // Check if the attributes are present in the path's attributes
    expect(path).toHaveAttribute('fill-rule', 'evenodd');
    expect(path).toHaveAttribute('clip-rule', 'evenodd');
  });
});
