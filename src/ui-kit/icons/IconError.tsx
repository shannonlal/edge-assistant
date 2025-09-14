import React from 'react';
import { IconProps } from './types';

export const IconError: React.FC<IconProps> = ({ size = 80, ...nativeProps }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...nativeProps}
    >
      <rect width="80" height="80" rx="40" fill="#FFF2E8" />
      <rect x="14" y="14" width="52" height="52" rx="26" fill="#FF4A32" />
      <path
        d="M47 33L33 47M33 33L47 47"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
