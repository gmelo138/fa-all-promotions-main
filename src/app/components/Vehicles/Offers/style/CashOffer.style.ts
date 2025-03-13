import styled from 'styled-components';
import { device } from '../../../../styles/devices';
import { COLORS, SIZING } from '../../../../styles/variables';
import { OfferPlusType } from '../../../../types/promotionsTypes';

export const PromoInfoContainer = styled.div`
  margin: 0 auto;
  width: 88%;
  min-height: 170px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${COLORS.grey30};
  padding: ${SIZING.unit(10.25)} ${SIZING.unit(5)};
  p {
    font-size: 12px;
  }
  h3 {
    font-size: 24px;
    font-family:
      Audi Type Extended,
      sans-serif;
    padding: ${SIZING.unit(2)} 0;
  }
  @media ${device.tablet} {
    border-bottom: none;
    padding: ${SIZING.unit(10.25)} 0;
    width: 205px;
    p {
      font-size: 16px;
    }
    h3 {
      font-size: 18px;
      padding: ${SIZING.unit(0.25)} 0;
    }
  }
`;

export const MainOfferContainer = styled.div<{ offerPlus?: OfferPlusType }>`
  background-color: ${COLORS.grey5};
  display: flex;
  flex-direction: column;
  > div:last-child {
    border-bottom: ${({ offerPlus }) => (offerPlus ? `1px solid ${COLORS.grey30}` : 'none')};
  }
  @media ${device.tablet} {
    flex-direction: row;
    height: 252px;
    > div:last-child {
      border-bottom: none;
    }
  }
`;
