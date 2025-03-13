import * as React from 'react';
import { Color, COLORS } from '../../styles/variables';

interface CloseXSmallIconProps {
  color?: Color;
}

const CloseXSmallIcon: React.FC<CloseXSmallIconProps> = ({ color = COLORS.black }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.9,17.1 L17.1,5.9 M5.9,5.9 L17.1,17.1"
        stroke={color}
        strokeWidth="1"
        fill="white"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default CloseXSmallIcon;
