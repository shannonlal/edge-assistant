import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IconSearch } from './IconSearch';

describe('IconSearch Component', () => {
  it('renders with default props', () => {
    render(<IconSearch data-testid="search-icon" />);
    const svg = screen.getByTestId('search-icon');

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
    expect(svg).toHaveAttribute('viewBox', '0 0 20 18');
  });

  it('renders with custom size', () => {
    render(<IconSearch size={32} data-testid="search-icon" />);
    const svg = screen.getByTestId('search-icon');

    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
  });

  it('renders with custom color', () => {
    render(<IconSearch color="red" data-testid="search-icon" />);
    const path = screen.getByTestId('search-icon').querySelector('path');

    expect(path).toHaveAttribute('fill', 'red');
  });

  it('passes through additional native props', () => {
    render(<IconSearch data-testid="search-icon" className="custom-class" aria-label="Search" />);
    const svg = screen.getByTestId('search-icon');

    expect(svg).toHaveClass('custom-class');
    expect(svg).toHaveAttribute('aria-label', 'Search');
  });
});
