import styled from 'styled-components';
import { device } from '../../../../styles/devices';
import { H2 } from '../../../../styles/Global.style';
import { COLORS, SIZING } from '../../../../styles/variables';

export const VehicleTypesSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: column;
  > div {
    margin-bottom: ${SIZING.unit(1.5)};
  }
  > div:first-child {
    > div:nth-child(2) {
      > div {
        left: -8px;
        transform: translateX(-50%);
      }
    }
  }
  > div:nth-child(2) {
    > div:nth-child(2) {
      > div {
        left: -244px;
      }
    }
  }
  @media ${device.tablet} {
    > div:first-child {
      > div:nth-child(2) {
        > div {
          left: 32px;
        }
      }
    }
    > div:nth-child(2) {
      margin-bottom: ${SIZING.unit(1.5)};
      > div:nth-child(2) {
        > div {
          left: ${SIZING.unit(-30)};
        }
      }
    }
  }
  @media ${device.laptop} {
    > div:nth-child(2) {
      > div:nth-child(2) {
        > div {
          left: ${SIZING.unit(-13.75)};
        }
      }
    }
  }
`;

export const Title = styled(H2)`
  display: flex;
  color: ${COLORS.grey10};
  padding-bottom: ${SIZING.unit(2.5)};
  line-height: 24px;
  font-size: 16px;
  letter-spacing: -0.24px;
`;

export const Plus = styled.span`
  font-style: italic;
`;

export const VehicleTypesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: ${SIZING.unit(5.5)};
  @media ${device.tablet} {
    padding-bottom: ${SIZING.unit(6.5)};
  }
  @media ${device.laptop} {
    padding-bottom: ${SIZING.unit(7.5)};
  }
`;

export const VehicleTypeWrapper = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  font-family: Audi Type;
`;

export const CertifiedDisclaimer = styled.p`
  color: ${COLORS.grey30};
  font-family: 'Audi Type';
  font-size: 12px;
  line-height: 20px;
`;

export const CPOError = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;
  p {
    color: ${COLORS.red};
  }
`;
