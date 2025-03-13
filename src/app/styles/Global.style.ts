import styled from 'styled-components';
import { COLORS } from './variables';

export const H2 = styled.h2`
  font-family: Audi Type;
  font-size: 16px;
  color: ${COLORS.mineShaft};
  line-height: 24px;
  font-weight: 700;
  letter-spacing: -0.3px;
`;

export const H3 = styled.h3`
  font-family: Audi Type;
  font-size: 18px;
  color: ${COLORS.mineShaft};
  line-height: 24px;
  font-weight: 700;
  letter-spacing: -0.27px;
`;

export const H4Extended = styled.h4`
  font-family: Audi Type Extended;
  font-size: 16px;
  color: ${COLORS.grey10};
  line-height: 24px;
  font-weight: 700;
  letter-spacing: -0.24px;
`;

export const H2Extended = styled.h2`
  font-family: Audi Type Extended;
  font-size: 32px;
  color: ${COLORS.mineShaft};
  line-height: 44px;
  font-weight: 700;
  letter-spacing: -0.48px;
`;

export const P = styled.p`
  font-size: 16px;
  font-family: Audi Type;
  color: ${COLORS.mineShaft};
  font-weight: 400;
  line-height: 24px;
`;

export const Grey10Text = styled(P)`
  color: ${COLORS.grey10};
`;

export const PExtended = styled.p`
  font-family: Audi Type Extended;
`;
