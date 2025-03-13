import styled from 'styled-components';
import { COLORS, SIZING } from '../../../../styles/variables';
import { device } from '../../../../styles/devices';
import { P } from '../../../../styles/Global.style';

export const Card = styled.div`
  background-color: ${COLORS.white};
  width: 339px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 12px 12px 32px 12px;
  @media ${device.tablet} {
    gap: 12px;
    width: 594px;
    padding: 12px 12px 28px 12px;
  }
  @media ${device.laptopL} {
    flex-direction: row;
    align-items: center;
    width: 1248px;
    min-height: 540px;
    padding: 24px 24px 32px 24px;
    gap: 12px;
  }
`;

export const DagAndFeature = styled.div`
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  gap: 16px;
  height: 32px;
  @media ${device.laptopL} {
    height: 40px;
    right: 24px;
    top: 24px;
    gap: 24px;
  }
`;
export const Dag = styled.div`
  font-family: 'Audi Type';
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.02%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: ${COLORS.grey60};

  @media ${device.laptopL} {
    font-size: 16px;
    line-height: 24px;
  }
`;
export const FeaturedOffer = styled.div`
  background-color: ${COLORS.mineShaft};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-family: 'Audi Type';
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.02%;
  gap: 8px;
  padding: 4px 12px;

  p {
    margin: 9;
    border: 0;
    color: ${COLORS.alabaster};
    opacity: 82%;
  }

  @media ${device.laptopL} {
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    padding: 8px 24px;
  }
`;
export const VehicleInfo = styled.div`
  margin-top: 44px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media ${device.tablet} {
    margin-top: 56px;
    width: auto;
  }
  @media ${device.laptopL} {
    margin: 0;
    width: auto;
  }
`;
export const VehicleInfoHeader = styled.div`
  padding-top: 16px;
  @media ${device.tablet} {
    height: 108px;
  }
  @media ${device.laptopL} {
    padding-top: 24px;
  }
`;
export const Title = styled.h2`
  width: 100%;
  font-family: Audi Type Extended;
  font-size: 20px;
  color: ${COLORS.mineShaft};
  line-height: 32px;
  font-weight: 700;
  letter-spacing: 0.01%;
  text-align: center;
  @media ${device.tablet} {
    font-size: 24px;
    line-height: 36px;
  }
`;

export const TrilLine = styled.p`
  font-family: Audi Type;
  font-size: 16px;
  color: ${COLORS.grey60};
  line-height: 24px;
  text-align: center;
  padding-top: 8px;
`;

export const Cpo = styled.div`
  height: 28px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-family: 'Audi Type Extended';
  font-size: 18px;
  line-height: 28px;
  letter-spacing: -0.015em;
  margin-top: 12px;
`;
export const Image = styled.div`
  width: 316px;
  margin: 4px 0;
  @media ${device.tablet} {
    width: 482px;
    height: 238px;
  }
`;

export const PriceAndContact = styled.div`
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${device.laptopL} {
  }
`;

export const Price = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin: 4px 0 4px 0;
  @media ${device.tablet} {
    flex-direction: row;
    align-items: flex-end;
    gap: 8px;
  }
  @media ${device.laptopL} {
    margin: 4px 0 12px 0;
  }
`;

export const MSRP = styled.div`
  font-family: 'Audi Type';
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.02%;
  color: ${COLORS.mineShaft};
  @media ${device.tablet} {
    padding-bottom: 4px;
  }
`;

export const MSRPNumber = styled.span`
  font-family: 'Audi Type Extended';
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  letter-spacing: 0.01%;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* gap: 8px; */
  @media ${device.tablet} {
    font-size: 24px;
    line-height: 36px;
  }
  @media ${device.laptopL} {
    font-size: 32px;
    line-height: 48px;
  }
`;

export const CpoPricing = styled.p<{ lang?: string }>`
  font-family: 'Audi Type';
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.02%;
  text-align: center;
  width: ${({ lang }) => (lang === 'fr' ? '80%' : 'auto')};
  color: ${COLORS.mineShaft};
  @media ${device.tablet} {
    width: auto;
  }
`;

export const ContactDealerCTA = styled.div`
  height: 26px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  font-family: 'Audi Type';
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.02%;
  padding-bottom: 4px;
  @media ${device.laptopL} {
    padding-bottom: 0;
  }
`;
export const OffersInfo = styled.div`
  width: 291px;
  border-top: 1px solid ${COLORS.grey15};
  margin: 12px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  @media ${device.tablet} {
    margin: 0 12px;
    width: auto;
  }
  @media ${device.laptopL} {
    width: 686px;
    margin: 40px 0 0 0;
    border: none;
  }
`;

export const Offer = styled.div`
  padding: 16px 0;
  min-width: 291px;
  @media ${device.tablet} {
    min-width: 550px;
  }
  @media ${device.laptopL} {
    padding: 24px;
    min-width: 677px;
    min-height: 379px;
  }
`;

export const Tabs = styled.div<{ lang?: string }>`
  height: 58px;
  ul {
    gap: ${({ lang }) => (lang === 'fr' ? '0' : '12px')};
  }
  li {
    background: white;
    a {
      padding: ${({ lang }) => (lang === 'fr' ? '0 6px' : '0 12px')};
    }
  }
  @media ${device.tablet} {
    ul {
      gap: 12px;
    }
    li {
      background: white;
      a {
        padding: 0 12px;
      }
    }
  }
  @media ${device.laptopL} {
    margin-top: 4px;
    margin-bottom: 12px;
    ul {
      gap: 24px;
    }
  }
`;

export const OfferRates = styled.div<{ cashOffer?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: ${({ cashOffer }) => (cashOffer ? 'center' : 'flex-start')};
  flex-wrap: wrap;
  gap: 28px;
  padding: 16px 12px 28px 12px;
  /* @media ${device.laptopL} {
    padding: 24px 0 28px 0;
  } */
  @media ${device.laptopL} {
    height: 172px;
    gap: 32px;
    padding: 24px 0;
  }
`;

export const APR = styled.div`
  max-width: 226px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  @media ${device.laptopL} {
    max-width: 215px;
  }
`;
export const RateReduction = styled.div`
  max-width: 226px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  @media ${device.laptopL} {
    max-width: 170px;
  }
`;
export const Payments = styled.div`
  max-width: 246px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  @media ${device.laptopL} {
    max-width: 180px;
  }
`;

export const CashPayments = styled.div`
  max-width: 226px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  @media ${device.laptopL} {
    max-width: 215px;
  }
`;

export const Frequency = styled(P)`
  font-weight: 700;
`;
export const OfferTitle = styled.div`
  font-family: 'Audi Type';
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.02%;
  color: ${COLORS.mineShaft};
`;
export const Percentage = styled.div<{ isBigSize?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: 'Audi Type Extended';
  font-weight: 700;
  font-size: ${({ isBigSize }) => (isBigSize ? '32px' : '24px')};
  /* line-height: ${({ isBigSize }) => (isBigSize ? '48px' : '36px')}; */
  line-height: 36px;
  letter-spacing: 0.002px;
  /* gap: 8px; */
`;
export const AdditionalText = styled.div`
  font-family: 'Audi Type';
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.02%;
  color: ${COLORS.mineShaft};
`;

export const BoldText = styled.span`
  font-family: 'Audi Type';
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.02%;
`;

export const OfferPlusWrapper = styled.div`
  padding: 28px 0 12px 0;
  margin: 0 24px;
  border-top: 1px solid ${COLORS.grey15};
  color: ${COLORS.mineShaft};
  @media ${device.tablet} {
    margin: 0;
  }
  @media ${device.laptopL} {
    margin-top: 4px;
    padding: 24px 0;
  }
`;

export const OfferPlusInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  @media ${device.tablet} {
    flex-direction: row;
    /* align-items: center; */
  }
  @media ${device.laptopL} {
    gap: 16px;
  }
`;
export const PlusTitle = styled.h3`
  font-family: 'Audi Type Extended';
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.01%;

  @media ${device.tablet} {
    width: 130px;
  }

  @media ${device.laptopL} {
    font-size: 18px;
    line-height: 28px;
  }
`;

export const PlusOffers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex-grow: 1;
  @media ${device.tablet} {
    align-items: center;
  }
`;

export const MultipleOffers = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  gap: 8px;
  padding-bottom: 8px;
`;

export const PlusText = styled.div<{ isMultipleOffers: boolean }>`
  border: 0;
  font-family: 'Audi Type';
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -1.5%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  /* justify-content: ${({ isMultipleOffers }) => (isMultipleOffers ? 'flex-start' : 'center')}; */
  align-items: flex-start;
  @media ${device.tablet} {
    width: 80%;
  }
  @media ${device.laptopL} {
    width: 78%;
  }
`;
export const CTA = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  gap: 8px;

  @media ${device.tablet} {
    flex-direction: row;
    margin-bottom: 12px;
    gap: 4px;
  }
  @media ${device.laptopL} {
    margin-top: 12px;
    margin-bottom: 0;
  }
`;

export const CashOffer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 195px;
  @media ${device.tablet} {
    width: 267px;
  }
  @media ${device.laptopL} {
    min-height: 104px;
    width: 295px;
  }
`;

export const CashText = styled(P)`
  @media ${device.laptopL} {
    width: 235px;
  }
`;

export const CashNumber = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: 'Audi Type Extended';
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  letter-spacing: 0.002px;

  @media ${device.laptopL} {
    font-size: 32px;
    line-height: 48px;
    letter-spacing: 0.003px;
  }
`;
