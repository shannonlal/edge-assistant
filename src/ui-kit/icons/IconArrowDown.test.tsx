import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IconArrowDown } from './IconArrowDown';

describe('IconArrowDown Component', () => {
  it('renders with default props', () => {
    render(<IconArrowDown data-testid="icon" />);
    const icon = screen.getByTestId('icon');
    expect(icon).toBeInTheDocument();
    expect(icon.tagName.toLowerCase()).toBe('svg');
    expect(icon).toHaveAttribute('width', '16');
    expect(icon).toHaveAttribute('height', '16');
    expect(icon).toHaveClass('rotate-180');
    expect(icon.querySelector('path')).toHaveAttribute('fill', 'currentColor');
  });

  it('renders with custom size', () => {
    const customSize = 32;
    render(<IconArrowDown data-testid="icon" size={customSize} />);
    const icon = screen.getByTestId('icon');
    expect(icon).toHaveAttribute('width', customSize.toString());
    expect(icon).toHaveAttribute('height', customSize.toString());
  });

  it('renders with custom color', () => {
    const customColor = '#FF0000';
    render(<IconArrowDown data-testid="icon" color={customColor} />);
    const icon = screen.getByTestId('icon');
    expect(icon.querySelector('path')).toHaveAttribute('fill', customColor);
  });

  it('spreads additional SVG props while maintaining default class', () => {
    render(
      <IconArrowDown data-testid="icon" className="custom-class" aria-label="Arrow down icon" />
    );
    const icon = screen.getByTestId('icon');
    expect(icon).toHaveClass('rotate-180', 'custom-class');
    expect(icon).toHaveAttribute('aria-label', 'Arrow down icon');
  });
});
