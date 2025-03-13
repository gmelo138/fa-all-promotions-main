import * as React from 'react';
import { COLORS, Color } from '../../styles/variables';

interface InfoSmallProps {
  color?: Color;
}

const QuestionIcon: React.FC<InfoSmallProps> = ({ color = COLORS.white }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.5 15V16M9.9 7.49997C9.9 7.49997 14 5.89997 14.5 8.49997C14.9 10.4 11.5 12.7 11.5 12.7V14M11.5 22.5C17.5751 22.5 22.5 17.5751 22.5 11.5C22.5 5.42484 17.5751 0.499969 11.5 0.499969C5.42487 0.499969 0.5 5.42484 0.5 11.5C0.5 17.5751 5.42487 22.5 11.5 22.5Z"
      stroke="white"
    />
  </svg>
);
QuestionIcon.defaultProps = {
  color: undefined,
};

export default QuestionIcon;
