import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dropdown } from './Dropdown';
import React from 'react';

describe('Dropdown Component', () => {
  const mockItems = [
    { code: '1', label: 'Option 1', onClick: vi.fn() },
    { code: '2', label: 'Option 2', onClick: vi.fn() },
  ];

  it('renders with default state', () => {
    render(<Dropdown items={mockItems} />);
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('opens dropdown when clicked', () => {
    render(<Dropdown items={mockItems} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    // After clicking, dropdown items should be visible
    const dropdownItems = screen.getAllByText(/Option [12]/);
    expect(dropdownItems).toHaveLength(2);
  });

  it('selects an item when clicked', () => {
    render(<Dropdown items={mockItems} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    // Click the first option
    const options = screen.getAllByText(/Option \d/);
    fireEvent.click(options[0]);
    // Check if callback was called
    expect(mockItems[0].onClick).toHaveBeenCalledTimes(1);
    // Check if selected item is displayed in button
    const buttonText = screen.getByRole('button').textContent;
    expect(buttonText).toContain('Option 1');
    expect(buttonText).toContain('(1)');
  });

  it('closes when clicking outside', () => {
    render(
      <div>
        <div data-testid="outside">Outside</div>
        <Dropdown items={mockItems} />
      </div>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByText('(1)')).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByTestId('outside'));
    expect(screen.queryByText('(1)')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Dropdown items={mockItems} className="custom-class" />);
    const container = screen.getByRole('button').parentElement;
    expect(container).toHaveClass('custom-class');
  });

  // it('shows check icon for selected item', async () => {
  //   render(<Dropdown items={mockItems} />);
  //   // Open dropdown and select first item
  //   const button = screen.getByRole('button');
  //   fireEvent.click(button);
  //   const options = screen.getAllByText(/Option \d/);
  //   fireEvent.click(options[0]);
  //   // Open dropdown again to see check icon
  //   fireEvent.click(button);
  //   // The check icon should be next to the selected item
  //   const selectedItem = screen.getByText('Option 1').closest('.flex.items-center.justify-between');
  //   const checkIcon = selectedItem?.querySelector('[data-testid="check-icon"]');
  //   expect(checkIcon).toBeInTheDocument();
  // });
});
