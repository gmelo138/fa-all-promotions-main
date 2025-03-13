import * as React from 'react';
import { COLORS } from '../../styles/variables';

interface CheckMarkIconProps {
  color?: string;
}

const CheckMarkIcon: React.FC<CheckMarkIconProps> = ({ color = COLORS.grey10 }) => {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon
        fill={color}
        points="4.945 12 0 7.699 0.667 6.92 4.708 10.435 11.132 0 12 0.543 4.945 12"
      />
    </svg>
  );
};

export default CheckMarkIcon;
