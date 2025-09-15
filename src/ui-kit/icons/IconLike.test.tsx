import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { IconLike } from './IconLike';

describe('IconLike Component', () => {
  it('renders with default props', () => {
    const { getByTestId } = render(<IconLike data-testid="like-icon" />);
    const icon = getByTestId('like-icon');

    // Check SVG attributes
    expect(icon).toHaveAttribute('width', '24');
    expect(icon).toHaveAttribute('height', '24');
    expect(icon).toHaveAttribute('viewBox', '0 0 24 24');

    // Check stroke color is currentColor by default
    const paths = icon.querySelectorAll('path');
    paths.forEach(path => {
      expect(path).toHaveAttribute('stroke', 'currentColor');
    });
  });

  it('renders with custom size and color', () => {
    const { getByTestId } = render(<IconLike data-testid="like-icon" size={32} color="#FF0000" />);
    const icon = getByTestId('like-icon');

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
      <IconLike data-testid="like-icon" className="custom-class" aria-label="Like Icon" />
    );
    const icon = getByTestId('like-icon');

    expect(icon).toHaveClass('custom-class');
    expect(icon).toHaveAttribute('aria-label', 'Like Icon');
  });

  it('has correct number of paths', () => {
    const { getByTestId } = render(<IconLike data-testid="like-icon" />);
    const icon = getByTestId('like-icon');
    const paths = icon.querySelectorAll('path');

    expect(paths.length).toBe(2);
  });
});
