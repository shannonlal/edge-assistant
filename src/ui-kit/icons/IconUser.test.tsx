import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IconUser } from './IconUser';

describe('IconUser Component', () => {
  it('renders with default props', () => {
    render(<IconUser data-testid="user-icon" />);
    const svg = screen.getByTestId('user-icon');

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
    expect(svg).toHaveAttribute('viewBox', '0 0 20 20');
  });

  it('renders with custom size', () => {
    render(<IconUser size={32} data-testid="user-icon" />);
    const svg = screen.getByTestId('user-icon');

    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
  });

  it('renders with custom color and correct stroke attributes', () => {
    render(<IconUser color="red" data-testid="user-icon" />);
    const path = screen.getByTestId('user-icon').querySelector('path');

    expect(path).toHaveAttribute('stroke', 'red');
    expect(path).toHaveAttribute('stroke-width', '1.66667');
    expect(path).toHaveAttribute('stroke-linecap', 'round');
    expect(path).toHaveAttribute('stroke-linejoin', 'round');
  });

  it('passes through additional native props', () => {
    render(<IconUser data-testid="user-icon" className="custom-class" aria-label="User" />);
    const svg = screen.getByTestId('user-icon');

    expect(svg).toHaveClass('custom-class');
    expect(svg).toHaveAttribute('aria-label', 'User');
  });
});
