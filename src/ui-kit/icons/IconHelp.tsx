import React from 'react';
import { IconProps } from './types';

export const IconHelp: React.FC<IconProps> = ({
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
      <path
        stroke={color}
        strokeWidth="2"
        d="m6.346 20.234-.022-.01-.022-.008c-1.167-.464-1.952-1.209-2.477-2.443-.55-1.293-.825-3.15-.825-5.83 0-3.98.711-6.089 1.985-7.265C6.278 3.483 8.41 3 11.955 3c3.592 0 5.747.484 7.052 1.68C20.289 5.856 21 7.963 21 11.944c0 3.82-.706 5.977-2.009 7.225C17.678 20.426 15.513 21 11.955 21c-2.553 0-4.384-.21-5.61-.766Z"
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
        d="M8.66 10.155c-.336-2.916 2.917-3.702 5.273-2.804 1.57.673 1.907 3.029.56 4.038-.672.561-1.794.561-1.906 1.57v1.347"
      />
      <path
        fill={color}
        d="M11.919 17.853c-.308-.293-.308-1.366 0-1.56.308-.294 1.23-.294 1.538 0 .308.292.308 1.267 0 1.56-.205.293-1.23.293-1.538 0Z"
      />
    </svg>
  );
};
