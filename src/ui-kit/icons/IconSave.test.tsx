import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IconSave } from './IconSave';

describe('IconSave Component', () => {
  it('renders with default props', () => {
    render(<IconSave data-testid="save-icon" />);
    const svg = screen.getByTestId('save-icon');

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
  });

  it('renders with custom size', () => {
    render(<IconSave size={32} data-testid="save-icon" />);
    const svg = screen.getByTestId('save-icon');

    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
  });

  it('renders with custom color', () => {
    render(<IconSave color="red" data-testid="save-icon" />);
    const path = screen.getByTestId('save-icon').querySelector('path');

    expect(path).toHaveAttribute('stroke', 'red');
  });

  it('passes through additional native props', () => {
    render(<IconSave data-testid="save-icon" className="custom-class" aria-label="Save" />);
    const svg = screen.getByTestId('save-icon');

    expect(svg).toHaveClass('custom-class');
    expect(svg).toHaveAttribute('aria-label', 'Save');
  });
});
