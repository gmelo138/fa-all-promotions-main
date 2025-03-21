import * as React from 'react';
import { COLORS, Color } from '../../styles/variables';

interface CloseXIconProps {
  color?: Color;
}

const CloseXIcon: React.FC<CloseXIconProps> = ({ color = COLORS.black }) => (
  <svg
    width="44"
    height="44"
    viewBox="0 0 48 48"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    color={color}
  >
    <path
      d="M28.7,18.2 L18.2,28.7 M28.8,28.8 L18.3,18.2 M23.5,45.5 C35.6502645,45.5 45.5,35.6502645 45.5,23.5 C45.5,11.3497355 35.6502645,1.5 23.5,1.5 C11.3497355,1.5 1.5,11.3497355 1.5,23.5 C1.5,35.6502645 11.3497355,45.5 23.5,45.5 Z"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
    />
  </svg>
);

CloseXIcon.defaultProps = {
  color: undefined,
};

export default CloseXIcon;
