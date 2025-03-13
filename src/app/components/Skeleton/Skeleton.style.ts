/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { device } from '../../styles/devices';
import { SIZING } from '../../styles/variables';

export const Wrapper = styled.div`
  padding: 80px 16px 0 16px;
  @media ${device.mobileS} {
    padding: 60px 28px 0 28px;
  }
  @media ${device.tablet} {
    padding: 80px 40px 0 40px;
  }
  @media ${device.laptop} {
    padding: 80px 60px 0 60px;
  }
  @media ${device.laptopL} {
    padding: 80px 96px 0 96px;
  }
  @media ${device.desktop} {
    width: 1380px;
    margin: 0 auto;
    padding: 80px 0 0 0;
  }
`;

export const SkeletonWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: ${SIZING.unit(2.5)};
  padding-bottom: ${SIZING.unit(12.5)};
  @media ${device.laptop} {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 28px;
  }
  .skeletonCard {
    width: 339px;
    height: 976px;
    @media ${device.tablet} {
      width: 594px;
      height: 976px;
    }
    @media ${device.laptopL} {
      width: 1248px;
      height: 540px;
    }
  }
`;
