import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { IconDelete } from './IconDelete';

describe('IconDelete Component', () => {
  it('renders with default props', () => {
    const { getByTestId } = render(<IconDelete data-testid="delete-icon" />);
    const svg = getByTestId('delete-icon');

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
  });

  it('renders with custom size', () => {
    const { getByTestId } = render(<IconDelete size={32} data-testid="delete-icon" />);
    const svg = getByTestId('delete-icon');

    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
  });

  it('renders with custom color', () => {
    const { container } = render(<IconDelete color="red" data-testid="delete-icon" />);
    const path = container.querySelector('path');

    expect(path).toHaveAttribute('stroke', 'red');
  });

  it('passes through additional native props', () => {
    const { getByTestId } = render(
      <IconDelete data-testid="delete-icon" className="custom-class" aria-label="Delete" />
    );
    const svg = getByTestId('delete-icon');

    expect(svg).toHaveClass('custom-class');
    expect(svg).toHaveAttribute('aria-label', 'Delete');
  });
});
