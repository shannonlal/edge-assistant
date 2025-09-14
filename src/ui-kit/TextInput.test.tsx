import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TextInput } from './TextInput';
import React from 'react';

describe('TextInput Component', () => {
  it('renders correctly', () => {
    render(<TextInput placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('applies error styles when error prop is true', () => {
    render(<TextInput error data-testid="input" />);
    const input = screen.getByTestId('input');
    expect(input).toHaveClass('border-red-500');
  });

  it('applies custom className', () => {
    render(<TextInput className="custom-class" data-testid="input" />);
    const input = screen.getByTestId('input');
    expect(input).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<TextInput ref={ref} data-testid="input" />);
    expect(ref.current).toBe(screen.getByTestId('input'));
  });

  it('passes through native input props', () => {
    render(
      <TextInput
        data-testid="input"
        disabled
        maxLength={10}
        placeholder="Test"
        value="Hello"
        readOnly
      />
    );
    const input = screen.getByTestId('input');
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('maxLength', '10');
    expect(input).toHaveAttribute('placeholder', 'Test');
    expect(input).toHaveValue('Hello');
    expect(input).toHaveAttribute('readonly');
  });
});
