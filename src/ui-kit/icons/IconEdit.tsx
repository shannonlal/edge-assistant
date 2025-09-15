import React from 'react';
import { IconProps } from './types';

export const IconEdit: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...nativeProps
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...nativeProps}
    >
      <g clipPath="url(#clip0_16548_40098)">
        <path
          d="M15.0003 1.66602L18.3337 4.99935M1.66699 18.3327L2.73066 14.4326C2.80005 14.1781 2.83475 14.0509 2.88802 13.9323C2.93531 13.8269 2.99343 13.7268 3.06142 13.6334C3.138 13.5283 3.23125 13.4351 3.41775 13.2486L12.0289 4.63742C12.1939 4.47241 12.2764 4.38991 12.3716 4.359C12.4553 4.33181 12.5454 4.33181 12.6291 4.359C12.7242 4.38991 12.8067 4.47241 12.9717 4.63742L15.3623 7.02794C15.5273 7.19295 15.6098 7.27545 15.6407 7.37059C15.6679 7.45428 15.6679 7.54442 15.6407 7.62811C15.6098 7.72324 15.5273 7.80575 15.3623 7.97075L6.75108 16.5819C6.56458 16.7684 6.47134 16.8617 6.36623 16.9382C6.2729 17.0062 6.17276 17.0644 6.06742 17.1117C5.94878 17.1649 5.82156 17.1996 5.56711 17.269L1.66699 18.3327Z"
          stroke={color}
          strokeWidth="1.67643"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_16548_40098">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
