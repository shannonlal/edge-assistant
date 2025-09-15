import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IconArrowDownUp } from './IconArrowDownUp';

describe('IconArrowDownUp Component', () => {
  it('renders with default props', () => {
    render(<IconArrowDownUp data-testid="icon" />);
    const icon = screen.getByTestId('icon');
    expect(icon).toBeInTheDocument();
    expect(icon.tagName.toLowerCase()).toBe('svg');
    expect(icon).toHaveAttribute('width', '16');
    expect(icon).toHaveAttribute('height', '16');
    expect(icon).toHaveAttribute('viewBox', '0 0 16 16');
    const path = icon.querySelector('path');
    expect(path).toHaveAttribute('stroke', 'currentColor');
    expect(path).toHaveAttribute('stroke-width', '1.5');
    expect(path).toHaveAttribute('stroke-linecap', 'round');
    expect(path).toHaveAttribute('stroke-linejoin', 'round');
  });

  it('renders with custom size', () => {
    const customSize = 32;
    render(<IconArrowDownUp data-testid="icon" size={customSize} />);
    const icon = screen.getByTestId('icon');
    expect(icon).toHaveAttribute('width', customSize.toString());
    expect(icon).toHaveAttribute('height', customSize.toString());
  });

  it('renders with custom color', () => {
    const customColor = '#FF0000';
    render(<IconArrowDownUp data-testid="icon" color={customColor} />);
    const icon = screen.getByTestId('icon');
    expect(icon.querySelector('path')).toHaveAttribute('stroke', customColor);
  });

  it('spreads additional SVG props', () => {
    render(
      <IconArrowDownUp data-testid="icon" className="custom-class" aria-label="Arrow up and down" />
    );
    const icon = screen.getByTestId('icon');
    expect(icon).toHaveClass('custom-class');
    expect(icon).toHaveAttribute('aria-label', 'Arrow up and down');
  });
});
