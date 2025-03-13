import React from 'react';
import { COLORS } from '../../styles/variables';

interface CautionIconProps {
  color?: string;
  width?: string;
  height?: string;
}

const CautionIcon: React.FC<CautionIconProps> = ({
  color = COLORS.red,
  width = '20',
  height = '18',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      color={color}
    >
      <path
        d="M21.5,20.5 L1.5,20.5 L11.5,2.5 L21.5,20.5 Z M11.5,16 L11.5,18 M11.5,8 L11.5,14"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default CautionIcon;
