import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IconHelp } from './IconHelp';

describe('IconHelp Component', () => {
  it('renders with default props', () => {
    render(<IconHelp data-testid="help-icon" />);
    const svg = screen.getByTestId('help-icon');

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
  });

  it('renders with custom size', () => {
    render(<IconHelp size={32} data-testid="help-icon" />);
    const svg = screen.getByTestId('help-icon');

    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
  });

  it('renders with custom color', () => {
    render(<IconHelp color="red" data-testid="help-icon" />);
    const paths = screen.getByTestId('help-icon').querySelectorAll('path');
    paths.forEach(path => {
      const hasStroke = path.hasAttribute('stroke');
      const hasFill = path.hasAttribute('fill');
      if (hasStroke) expect(path).toHaveAttribute('stroke', 'red');
      if (hasFill) expect(path).toHaveAttribute('fill', 'red');
    });
  });

  it('passes through additional native props', () => {
    render(<IconHelp data-testid="help-icon" className="custom-class" aria-label="Help" />);
    const svg = screen.getByTestId('help-icon');

    expect(svg).toHaveClass('custom-class');
    expect(svg).toHaveAttribute('aria-label', 'Help');
  });
});
