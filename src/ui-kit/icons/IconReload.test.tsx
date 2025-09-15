import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IconReload } from './IconReload';

describe('IconReload Component', () => {
  it('renders with default props', () => {
    render(<IconReload data-testid="reload-icon" />);
    const svg = screen.getByTestId('reload-icon');

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
    expect(svg).toHaveAttribute('viewBox', '0 0 16 16');
  });

  it('renders with custom size', () => {
    render(<IconReload size={32} data-testid="reload-icon" />);
    const svg = screen.getByTestId('reload-icon');

    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
  });

  it('renders with custom color', () => {
    render(<IconReload color="red" data-testid="reload-icon" />);
    const paths = screen.getByTestId('reload-icon').querySelectorAll('path');

    paths.forEach(path => {
      const fillOrStroke = path.hasAttribute('stroke') ? 'stroke' : 'fill';
      expect(path).toHaveAttribute(fillOrStroke, 'red');
    });
  });

  it('passes through additional native props', () => {
    render(<IconReload data-testid="reload-icon" className="custom-class" aria-label="Reload" />);
    const svg = screen.getByTestId('reload-icon');

    expect(svg).toHaveClass('custom-class');
    expect(svg).toHaveAttribute('aria-label', 'Reload');
  });
});
