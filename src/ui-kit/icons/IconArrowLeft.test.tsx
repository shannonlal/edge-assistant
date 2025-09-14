import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IconArrowLeft } from './IconArrowLeft';

describe('IconArrowLeft Component', () => {
  it('renders with default props', () => {
    render(<IconArrowLeft data-testid="icon" />);
    const icon = screen.getByTestId('icon');
    expect(icon).toBeInTheDocument();
    expect(icon.tagName.toLowerCase()).toBe('svg');
    expect(icon).toHaveAttribute('width', '16');
    expect(icon).toHaveAttribute('height', '16');
    expect(icon).toHaveAttribute('viewBox', '0 0 16 12');
    expect(icon).toHaveClass('stroke-current');
    const path = icon.querySelector('path');
    expect(path).toHaveAttribute('stroke', 'currentColor');
    expect(path).toHaveAttribute('stroke-width', '2');
    expect(path).toHaveAttribute('stroke-linecap', 'round');
    expect(path).toHaveAttribute('stroke-linejoin', 'round');
  });

  it('renders with custom size', () => {
    const customSize = 32;
    render(<IconArrowLeft data-testid="icon" size={customSize} />);
    const icon = screen.getByTestId('icon');
    expect(icon).toHaveAttribute('width', customSize.toString());
    expect(icon).toHaveAttribute('height', customSize.toString());
  });

  it('renders with custom color', () => {
    const customColor = '#FF0000';
    render(<IconArrowLeft data-testid="icon" color={customColor} />);
    const icon = screen.getByTestId('icon');
    expect(icon.querySelector('path')).toHaveAttribute('stroke', customColor);
  });

  it('merges className with default class', () => {
    render(<IconArrowLeft data-testid="icon" className="custom-class" />);
    const icon = screen.getByTestId('icon');
    expect(icon).toHaveClass('stroke-current', 'custom-class');
  });

  it('spreads additional SVG props', () => {
    render(<IconArrowLeft data-testid="icon" aria-label="Left arrow" />);
    const icon = screen.getByTestId('icon');
    expect(icon).toHaveAttribute('aria-label', 'Left arrow');
  });
});
