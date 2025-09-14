import { cn } from './utils/cn';
import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ error, className, ...nativeProps }, ref) => {
    return (
      <textarea
        className={cn(
          'w-full h-full px-6 py-4 text-base bg-white border border-gray-200',
          'rounded-2xl',
          'hover:border-gray-300',
          'focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300',
          'transition-all duration-200',
          'resize-none overflow-y-auto',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-100',
          className
        )}
        ref={ref}
        {...nativeProps}
      />
    );
  }
);

TextArea.displayName = 'TextArea';
