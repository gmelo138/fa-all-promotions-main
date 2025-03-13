import styled from 'styled-components';
import { device } from '../../../../styles/devices';
import { COLORS, SIZING } from '../../../../styles/variables';
import { OfferPlusType } from '../../../../types/promotionsTypes';

interface LeaseStyleProps {
  lang?: string;
}

export const PromoInfoContainer = styled.div<LeaseStyleProps>`
  border-bottom: 1px solid ${COLORS.grey30};
  width: 88%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${SIZING.unit(6.5)} 0;
  min-height: 170px;
  p {
    font-size: 12px;
    line-height: 12px;
  }
  h3 {
    font-size: 24px;
    font-family:
      Audi Type Extended,
      sans-serif;
    padding: ${SIZING.unit(2)} 0;
  }
  .audi-credit {
    display: ${({ lang }) => (lang === 'fr' ? 'none' : 'inline')};
  }
  @media ${device.tablet} {
    border-bottom: none;
    padding: 0;
    flex-basis: 155px;
    min-height: 0;
    display: inline;
    margin: 0;
    p {
      font-size: 16px;
      line-height: 24px;
    }
    h3 {
      font-size: 18px;
      padding: ${SIZING.unit(0.25)} 0;
    }
  }
`;

export const MainOfferContainer = styled.div<{ offerPlus?: OfferPlusType }>`
  background-color: ${COLORS.grey5};
  > div:last-child {
    border-bottom: ${({ offerPlus }) => (offerPlus ? `1px solid ${COLORS.grey30}` : 'none')};
  }
  @media ${device.tablet} {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    padding: ${SIZING.unit(6.5)} 0;
    height: 252px;
    > div:last-child {
      border-bottom: none;
    }
  }
`;

export const PromoFlex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-evenly;
  width: 100%;
  padding: 0 ${SIZING.unit(1.25)};
  @media ${device.tablet} {
    flex-direction: column;
    align-items: center;
    padding: 0;
    justify-content: center;
    height: 160px;
  }
`;

export const LeasePercentage = styled.div``;

export const AprRate = styled.div<LeaseStyleProps>`
  @media ${device.tablet} {
    display: flex;
    flex-direction: ${({ lang }) => (lang === 'fr' ? 'column-reverse' : 'column')};
    align-items: center;
    justify-content: center;
    p {
      font-size: 12px;
    }
    padding-top: ${SIZING.unit(1.75)};
  }
`;

export const DownpaymentRate = styled.div<LeaseStyleProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-direction: ${({ lang }) => (lang === 'fr' ? 'row-reverse' : 'row')};
  p {
    padding: 0 ${SIZING.unit(0.25)};
  }
  @media ${device.tablet} {
    p {
      font-size: 12px;
    }
  }
`;
