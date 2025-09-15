import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IconSettings } from './IconSettings';

describe('IconSettings Component', () => {
  it('renders with default props', () => {
    render(<IconSettings data-testid="settings-icon" />);
    const svg = screen.getByTestId('settings-icon');

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
  });

  it('renders with custom size', () => {
    render(<IconSettings size={32} data-testid="settings-icon" />);
    const svg = screen.getByTestId('settings-icon');

    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
  });

  it('renders with custom color for both fill and stroke paths', () => {
    render(<IconSettings color="red" data-testid="settings-icon" />);
    const paths = screen.getByTestId('settings-icon').querySelectorAll('path');
    // First path uses fill
    expect(paths[0]).toHaveAttribute('fill', 'red');
    // Second path uses stroke
    expect(paths[1]).toHaveAttribute('stroke', 'red');
  });

  it('passes through additional native props', () => {
    render(
      <IconSettings data-testid="settings-icon" className="custom-class" aria-label="Settings" />
    );
    const svg = screen.getByTestId('settings-icon');

    expect(svg).toHaveClass('custom-class');
    expect(svg).toHaveAttribute('aria-label', 'Settings');
  });
});
