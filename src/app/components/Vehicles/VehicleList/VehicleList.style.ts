import styled from 'styled-components';
import { device } from '../../../styles/devices';
import { SIZING } from '../../../styles/variables';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  padding-top: ${SIZING.unit(7.5)};
  @media ${device.tablet} {
    padding-top: ${SIZING.unit(7)};
  }
  @media ${device.laptop} {
    max-width: 1248px;
    margin: 0 auto;
  }
  @media ${device.desktop} {
    max-width: 1440px;
  }
`;
