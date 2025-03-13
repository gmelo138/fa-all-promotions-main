import * as React from 'react';
import { COLORS, Color } from '../../styles/variables';

interface InfoSmallProps {
  color?: Color;
}

const InfoSmallIcon: React.FC<InfoSmallProps> = ({ color = COLORS.black }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.5,17 L11.5,10 M11.5,8 L11.5,6 M11.5,22.5 C17.5751322,22.5 22.5,17.5751322 22.5,11.5 C22.5,5.42486775 17.5751322,0.5 11.5,0.5 C5.42486775,0.5 0.5,5.42486775 0.5,11.5 C0.5,17.5751322 5.42486775,22.5 11.5,22.5 Z"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
      color={color}
    />
  </svg>
);
InfoSmallIcon.defaultProps = {
  color: undefined,
};

export default InfoSmallIcon;
