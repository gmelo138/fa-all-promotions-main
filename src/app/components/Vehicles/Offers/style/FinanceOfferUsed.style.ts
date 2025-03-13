import styled from 'styled-components';
import { device } from '../../../../styles/devices';
import { COLORS, SIZING } from '../../../../styles/variables';
import { OfferPlusType } from '../../../../types/promotionsTypes';

interface PromoInfoContainerCPOProps {
  plusEn: string | null;
}

export const PromoInfoContainerCPO = styled.div<PromoInfoContainerCPOProps>`
  width: 88%;
  margin: 0 auto;
  > div:last-child {
    padding-bottom: ${({ plusEn }) => (plusEn ? SIZING.unit(2.5) : SIZING.unit(5.5))};
    border-bottom: ${({ plusEn }) => (plusEn ? `1px solid ${COLORS.grey30}` : 'none')};
    @media ${device.tablet} {
      border-bottom: none;
    }
  }
  > div:first-child {
    padding-top: ${SIZING.unit(7.5)};
  }
`;

export const TextContainer = styled.div`
  display: flex;
`;

export const MainOfferContainerCPO = styled.div<{ offerPlus?: OfferPlusType | null }>`
  background-color: ${COLORS.grey5};
`;

export const PromoFlexCPO = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0 ${SIZING.unit(1.25)};
  div:nth-of-type(1) {
    width: 30%;
    margin-right: ${SIZING.unit(0.625)};
    border-top: 2px solid ${COLORS.grey60};
    p {
      font-weight: bold;
      margin: ${SIZING.unit(2)} 0;
    }
  }
  div:nth-of-type(2) {
    width: 60%;
    border-top: 1px solid ${COLORS.grey30};
    p {
      margin: ${SIZING.unit(2)} 0;
    }
  }
  @media ${device.tablet} {
    padding: 0;
  }
`;
