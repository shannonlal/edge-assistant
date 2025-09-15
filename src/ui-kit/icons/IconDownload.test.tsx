import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IconDownload } from './IconDownload';

describe('IconDownload Component', () => {
  it('renders with default props', () => {
    render(<IconDownload data-testid="download-icon" />);
    const svg = screen.getByTestId('download-icon');

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
  });

  it('renders with custom size', () => {
    render(<IconDownload size={32} data-testid="download-icon" />);
    const svg = screen.getByTestId('download-icon');

    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
  });

  it('renders with custom color', () => {
    render(<IconDownload color="red" data-testid="download-icon" />);
    const path = screen.getByTestId('download-icon').querySelector('path');

    expect(path).toHaveAttribute('stroke', 'red');
  });

  it('passes through additional native props', () => {
    render(
      <IconDownload data-testid="download-icon" className="custom-class" aria-label="Download" />
    );
    const svg = screen.getByTestId('download-icon');

    expect(svg).toHaveClass('custom-class');
    expect(svg).toHaveAttribute('aria-label', 'Download');
  });
});
