import React from 'react';
import { IconProps } from './types';

export const IconArrowDownUp: React.FC<IconProps> = ({
  size = 16,
  color = 'currentColor',
  ...nativeProps
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...nativeProps}
  >
    <path
      d="M8.0003 6.78065L8.0003 0.847656M8.0003 0.847656L5.17188 3.67608M8.0003 0.847656L10.8287 3.67608M8.0003 9.21855L8.0003 15.1516M8.0003 15.1516L10.8287 12.3231M8.0003 15.1516L5.17188 12.3231"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
