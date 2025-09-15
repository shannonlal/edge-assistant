import React from 'react';
import { IconProps } from './types';

export const IconLogo: React.FC<IconProps> = ({
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.7757 1.99902H10.2314V7.7235L6.18208 3.67414L3.67588 6.18034L7.72246 10.2269H2V13.7712H7.7253L3.67915 17.8174L6.18535 20.3236L10.2314 16.2775V21.999H13.7757V16.2802L17.818 20.3225L20.3242 17.8163L16.2792 13.7712H22V10.2269H16.282L20.3275 6.18143L17.8213 3.67523L13.7757 7.72077V1.99902Z"
        fill={color}
      />
    </svg>
  );
};
