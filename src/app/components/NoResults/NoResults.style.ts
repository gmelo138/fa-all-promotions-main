import styled from 'styled-components';
import { COLORS, SIZING } from '../../styles/variables';

export const Container = styled.div`
  position: relative;
  text-align: center;
  font-size: 16px;
  font-family: 'Audi Type';
  line-height: 150%;
  color: ${COLORS.black};
  padding-top: ${SIZING.unit(8.75)};
  height: 420px;
`;

export const Header = styled.div`
  position: relative;
`;

export const IconContainer = styled.div`
  position: relative;
  padding-top: ${SIZING.unit(1.25)};
`;

export const ContentInfo = styled.div`
  position: relative;
  padding-top: ${SIZING.unit(1.25)};
  width: 280px;
  margin: 0 auto;
  text-align: center;
`;

export const ButtonContainer = styled.div`
  width: 300px;
  margin: 0 auto;
  padding-top: ${SIZING.unit(2.5)};
`;
