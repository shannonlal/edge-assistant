import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IconEdit } from './IconEdit';

describe('IconEdit Component', () => {
  it('renders with default props', () => {
    render(<IconEdit data-testid="edit-icon" />);
    const svg = screen.getByTestId('edit-icon');

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
    expect(svg).toHaveAttribute('viewBox', '0 0 20 20');
  });

  it('renders with custom size', () => {
    render(<IconEdit size={32} data-testid="edit-icon" />);
    const svg = screen.getByTestId('edit-icon');

    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
  });

  it('renders with custom color', () => {
    render(<IconEdit color="red" data-testid="edit-icon" />);
    const path = screen.getByTestId('edit-icon').querySelector('path');

    expect(path).toHaveAttribute('stroke', 'red');
  });

  it('passes through additional native props', () => {
    render(<IconEdit data-testid="edit-icon" className="custom-class" aria-label="Edit" />);
    const svg = screen.getByTestId('edit-icon');

    expect(svg).toHaveClass('custom-class');
    expect(svg).toHaveAttribute('aria-label', 'Edit');
  });
});
