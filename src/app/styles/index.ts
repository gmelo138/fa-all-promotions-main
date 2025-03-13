import { createGlobalStyle } from 'styled-components';
import { device } from './devices';
import { GlobalReset } from './reset';
import { COLORS } from './variables';
import AudiFonts from './fonts';

const GlobalStyles = createGlobalStyle`
  ${GlobalReset}
  ${device}
  ${AudiFonts}
  ${COLORS}
`;

export default GlobalStyles;
