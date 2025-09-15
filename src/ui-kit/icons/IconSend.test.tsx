import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IconSend } from './IconSend';

describe('IconSend Component', () => {
  it('renders with default props', () => {
    render(<IconSend data-testid="send-icon" />);
    const svg = screen.getByTestId('send-icon');

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
  });

  it('renders with custom size', () => {
    render(<IconSend size={32} data-testid="send-icon" />);
    const svg = screen.getByTestId('send-icon');

    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
  });

  it('renders with custom color', () => {
    render(<IconSend color="red" data-testid="send-icon" />);
    const path = screen.getByTestId('send-icon').querySelector('path');

    expect(path).toHaveAttribute('stroke', 'red');
  });

  it('passes through additional native props', () => {
    render(<IconSend data-testid="send-icon" className="custom-class" aria-label="Send" />);
    const svg = screen.getByTestId('send-icon');

    expect(svg).toHaveClass('custom-class');
    expect(svg).toHaveAttribute('aria-label', 'Send');
  });
});
