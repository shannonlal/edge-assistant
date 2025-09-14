import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TextArea } from './TextArea';
import React from 'react';

describe('TextArea Component', () => {
  it('renders correctly', () => {
    render(<TextArea placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('applies error styles when error prop is true', () => {
    render(<TextArea error data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveClass('border-red-500');
  });

  it('applies custom className', () => {
    render(<TextArea className="custom-class" data-testid="textarea" />);
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<TextArea ref={ref} data-testid="textarea" />);
    expect(ref.current).toBe(screen.getByTestId('textarea'));
  });

  it('passes through native textarea props', () => {
    render(
      <TextArea
        data-testid="textarea"
        disabled
        maxLength={100}
        placeholder="Test"
        value="Hello"
        readOnly
        rows={4}
      />
    );
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveAttribute('maxLength', '100');
    expect(textarea).toHaveAttribute('placeholder', 'Test');
    expect(textarea).toHaveValue('Hello');
    expect(textarea).toHaveAttribute('readonly');
    expect(textarea).toHaveAttribute('rows', '4');
  });
});
