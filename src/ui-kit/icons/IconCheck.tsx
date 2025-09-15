import React from 'react';
import { IconProps } from './types';

export const IconCheck: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  className = '',
  ...nativeProps
}) => {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...nativeProps}
    >
      <path
        d="M16.6666 5L7.49992 14.1667L3.33325 10"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
