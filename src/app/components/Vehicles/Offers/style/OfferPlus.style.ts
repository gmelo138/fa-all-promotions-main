import styled from 'styled-components';
import { device } from '../../../../styles/devices';
import { COLORS, SIZING } from '../../../../styles/variables';

export const OfferPlusWrapper = styled.section`
  background-color: ${COLORS.grey5};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: ${SIZING.unit(6.25)};
  padding-top: ${SIZING.unit(6.5)};
  @media ${device.mobileL} {
    padding-right: ${SIZING.unit(3.75)};
    padding-left: ${SIZING.unit(3.75)};
  }
  @media ${device.tablet} {
    margin-top: ${SIZING.unit(0.75)};
    padding: ${SIZING.unit(3)} ${SIZING.unit(4)} ${SIZING.unit(6)} ${SIZING.unit(4)};
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
  }
`;

export const OfferPlusContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-bottom: ${SIZING.unit(2)};
  h3 {
    font-size: 24px;
    margin-left: ${SIZING.unit(1)};
  }
  @media ${device.tablet} {
    justify-content: space-between;
    padding-right: ${SIZING.unit(3)};
    padding-bottom: 0;
    padding-right: ${SIZING.unit(1.5)};
    h3 {
      font-size: 18px;
      margin-left: ${SIZING.unit(2)};
    }
  }
`;

export const OfferPlusText = styled.div<{ isOfferSingle: boolean }>`
  padding: 0 ${SIZING.unit(2)};
  text-align: center;
  padding: 0 ${SIZING.unit(2.5)};
  text-align: ${({ isOfferSingle }) => (isOfferSingle ? 'center' : 'left')};
  width: 100%;
  ul {
    padding: 0 ${SIZING.unit(2.5)};
    li {
      font-size: 12px;
      margin: ${SIZING.unit(1.5)} 0;
    }
  }
  @media ${device.tablet} {
    padding: 0;
    flex: 1;
  }
`;

export const PromoText = styled.h3`
  margin-left: ${SIZING.unit(0.5)};
  font-family: 'Audi Type extended';
  font-size: 24px;
  line-height: 150%;
  text-align: center;
  letter-spacing: -0.015em;
  @media ${device.tablet} {
    font-size: 18px;
    line-height: 156%;
  }
`;

export const CrossContainer = styled.div`
  width: 20px;
  height: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Cross = styled.div<{ isRotated?: boolean }>`
  height: 16px;
  width: 4px;
  position: absolute;
  background-color: ${COLORS.mineShaft};
  transform: ${({ isRotated }) => (isRotated ? 'rotate(90deg)' : '')};
  left: 8px;
`;
