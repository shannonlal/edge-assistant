import React from 'react';
import { IconProps } from './types';
import { cn } from '../utils/cn';

export const IconRedo: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  className,
  ...nativeProps
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('stroke-current', className)}
      {...nativeProps}
    >
      <path
        d="M14.6667 4.83333H6.33337C3.57195 4.83333 1.33337 7.07191 1.33337 9.83333C1.33337 12.5948 3.57195 14.8333 6.33337 14.8333H14.6667M14.6667 4.83333L11.3334 1.5M14.6667 4.83333L11.3334 8.16667"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
