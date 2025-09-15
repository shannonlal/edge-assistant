import type { SVGProps } from 'react';

export type IconProps = SVGProps<SVGSVGElement> & {
  color?: string;
  size?: number | string;
};
