import React from 'react';
import { IconProps } from './types';

export const IconButton: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...nativeProps
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...nativeProps}
    >
      <rect x="2" y="8" width="20" height="8" rx="4" stroke={color} strokeWidth="2" />
      <rect x="10" y="11" width="9" height="2" rx="1" fill={color} />
      <rect x="5" y="11" width="3" height="2" rx="1" fill={color} />
    </svg>
  );
};
