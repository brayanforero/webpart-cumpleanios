import * as React from 'react';
interface Prop {
  size?: number;
  color?: string;
  onHide: CallableFunction;
}

const Icon = ({ onHide, size = 24, color = 'rgba(0, 0, 0, 1)' }: Prop) => (
  <svg
    onClick={() => onHide()}
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    style={{ fill: color }}
  >
    <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
  </svg>
);

export default Icon;
