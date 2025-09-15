import { cn } from './utils/cn';
import { InputHTMLAttributes, forwardRef } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ error, className, ...nativeProps }, ref) => {
    return (
      <input
        className={cn(
          'w-full px-6 py-4 text-base bg-white border border-gray-200',
          'rounded-2xl',
          'hover:border-gray-300',
          'focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300',
          'transition-all duration-200',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-100',
          className
        )}
        type="text"
        ref={ref}
        {...nativeProps}
      />
    );
  }
);

TextInput.displayName = 'TextInput';
