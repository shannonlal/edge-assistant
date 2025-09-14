import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IconAdd } from './IconAdd';

describe('IconAdd Component', () => {
  it('renders with default props', () => {
    render(<IconAdd data-testid="icon" />);
    const icon = screen.getByTestId('icon');
    expect(icon).toBeInTheDocument();
    expect(icon.tagName.toLowerCase()).toBe('svg');
    expect(icon).toHaveAttribute('width', '24');
    expect(icon).toHaveAttribute('height', '24');
    expect(icon.querySelector('path')).toHaveAttribute('fill', 'currentColor');
  });

  it('renders with custom size', () => {
    const customSize = 32;
    render(<IconAdd data-testid="icon" size={customSize} />);
    const icon = screen.getByTestId('icon');
    expect(icon).toHaveAttribute('width', customSize.toString());
    expect(icon).toHaveAttribute('height', customSize.toString());
  });

  it('renders with custom color', () => {
    const customColor = '#FF0000';
    render(<IconAdd data-testid="icon" color={customColor} />);
    const icon = screen.getByTestId('icon');
    expect(icon.querySelector('path')).toHaveAttribute('fill', customColor);
  });

  it('spreads additional SVG props', () => {
    render(<IconAdd data-testid="icon" className="custom-class" aria-label="Add icon" />);
    const icon = screen.getByTestId('icon');
    expect(icon).toHaveAttribute('class', 'custom-class');
    expect(icon).toHaveAttribute('aria-label', 'Add icon');
  });
});
