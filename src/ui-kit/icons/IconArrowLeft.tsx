import React from 'react';
import { IconProps } from './types';
import { cn } from '../utils/cn';

export const IconArrowLeft: React.FC<IconProps> = ({
  size = 16,
  color = 'currentColor',
  className,
  ...nativeProps
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn('stroke-current', className)}
    {...nativeProps}
  >
    <path
      d="M14.6667 6H1.33337M1.33337 6L6.33337 11M1.33337 6L6.33337 1"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
