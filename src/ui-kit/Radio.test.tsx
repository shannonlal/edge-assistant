import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Radio } from './Radio';
import React from 'react';
import gsap from 'gsap';

vi.mock('gsap');

describe('Radio Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<Radio isChecked={false} handleClick={() => {}} id="test-radio" />);
    expect(screen.getByTestId('radio-input')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Radio isChecked={false} handleClick={handleClick} id="test-radio" />);
    fireEvent.click(screen.getByTestId('radio-input'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('reflects checked state', () => {
    render(<Radio isChecked={true} handleClick={() => {}} id="test-radio" />);
    expect(screen.getByTestId('radio-input')).toBeChecked();
    const label = screen.getByLabelText('');
    expect(label.parentElement?.querySelector('label')).toHaveClass('border-blue-600');
  });

  it('can be disabled', () => {
    render(<Radio isChecked={false} handleClick={() => {}} disabled id="test-radio" />);
    const input = screen.getByTestId('radio-input');
    expect(input).toBeDisabled();
    const label = screen.getByLabelText('');
    expect(label.parentElement?.querySelector('label')).toHaveClass('pointer-events-none');
  });

  it('applies custom className', () => {
    render(
      <Radio isChecked={false} handleClick={() => {}} className="custom-class" id="test-radio" />
    );
    const container = screen.getByTestId('radio-input').parentElement;
    expect(container).toHaveClass('custom-class');
  });

  it('applies correct border color when unchecked', () => {
    render(<Radio isChecked={false} handleClick={() => {}} id="test-radio" />);
    const label = screen.getByLabelText('');
    expect(label.parentElement?.querySelector('label')).toHaveClass('border-gray-200');
  });

  it('triggers animation when checked state changes', async () => {
    const { rerender } = render(<Radio isChecked={false} handleClick={() => {}} id="test-radio" />);
    // Clear initial animation call
    vi.clearAllMocks();

    // Change to checked state
    rerender(<Radio isChecked={true} handleClick={() => {}} id="test-radio" />);
    expect(gsap.to).toHaveBeenCalledWith(expect.any(HTMLDivElement), {
      scale: 1,
      ease: 'elastic.out(1.2,1)',
    });

    // Change back to unchecked state
    rerender(<Radio isChecked={false} handleClick={() => {}} id="test-radio" />);
    expect(gsap.to).toHaveBeenCalledWith(expect.any(HTMLDivElement), {
      scale: 0,
      ease: 'power2.inOut',
    });
  });
});
