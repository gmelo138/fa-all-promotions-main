import styled from 'styled-components';
import { INVENTORY_TYPE_FILTER_LIST, REGION_FILTER_LIST } from '../../../../constants/FilterList';
import { device } from '../../../../styles/devices';
import { COLORS, SIZING } from '../../../../styles/variables';

export const CarPromotionWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: ${SIZING.unit(12.5)};
  @media ${device.laptop} {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

export const OffersMobile = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media ${device.tablet} {
    width: 687px;
  }
`;

export const OffersDesktopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  @media ${device.laptop} {
    min-width: 460px;
    width: 560px;
  }
  @media ${device.laptopL} {
    width: 611px;
  }
`;

export const HeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  @media ${device.laptop} {
    max-width: 560px;
  }
  @media ${device.laptopL} {
    width: 630px;
  }
`;

export const ModelYear = styled.div<{ dag?: string; type?: string }>`
  padding-bottom: ${({ dag, type }) =>
    dag === REGION_FILTER_LIST.Montreal || type === INVENTORY_TYPE_FILTER_LIST.Cpo
      ? '0px'
      : SIZING.unit(8.125)};
  h2 {
    font-size: 21px;
  }
  @media ${device.tablet} {
    h2 {
      font-size: 32px;
    }
  }
  @media ${device.laptop} {
    padding-bottom: 0;
  }
  @media screen and (min-width: 1160px) {
    padding-bottom: ${({ dag, type }) =>
      dag === REGION_FILTER_LIST.Montreal || type === INVENTORY_TYPE_FILTER_LIST.Cpo
        ? '0px'
        : SIZING.unit(8.125)};
  }
`;

export const PriceAndTile = styled.div`
  p,
  h3 {
    font-size: 16px;
    margin-top: ${SIZING.unit(1.5)};
  }
  @media ${device.tablet} {
    p {
      font-size: 18px;
    }
    h3 {
      font-size: 24px;
    }
  }
`;

export const CarTitle = styled.div`
  margin: 0 auto;
`;

export const CarPrice = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CertificatedPlus = styled.div`
  font-family: 'Audi Type Extended';
  font-size: 18px;
  line-height: 156%;
  text-align: center;
  letter-spacing: -0.015em;
  padding: ${SIZING.unit(2)} 0 ${SIZING.unit(3)} 0;
  h4 {
    font-size: 18px;
  }
  @media ${device.tablet} {
    padding: ${SIZING.unit(3)} 0;
  }
`;

export const CarTile = styled.div``;

export const VehicleImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 238px;
  max-height: 238px;
`;

export const BackgroundImage = styled.div<{ modelImage: string; isCpoVehicle: boolean }>`
  width: 100%;
  background-image: ${({ modelImage }) => `url(${modelImage})`};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  height: ${({ isCpoVehicle }) => (isCpoVehicle ? '220px' : '168px')};
  transform: ${({ isCpoVehicle }) => (isCpoVehicle ? 'scale(1.05)' : 'scale(0.95)')};
  position: absolute;
  bottom: 16px;
  @media ${device.tablet} {
    transform: ${({ isCpoVehicle }) => (isCpoVehicle ? 'scale(1.0)' : 'scale(1.1)')};
    height: 238px;
  }
`;

export const ImageDisclaimer = styled.div`
  text-align: center;
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  @media ${device.tablet} {
  }
  @media ${device.laptop} {
    width: 400px;
  }
  p {
    font-size: 12px;
    line-height: 20px;
    letter-spacing: 0.002px;
  }
`;

export const ButtonsContainer = styled.div``;
export const PromotionInfoContainer = styled.div``;

export const OfferHeader = styled.div`
  margin: ${SIZING.unit(4.5)} auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  @media ${device.tablet} {
    align-items: flex-end;
    margin: 0;
  }
`;

export const OfferText = styled.p`
  font-family: 'Audi Type Extended';
  font-size: 16px;
  line-height: 16px;
  position: relative;
  ::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -12px;
    width: 100%;
    height: 1px;
    background-color: 'black';
  }
`;

export const LegalWrapper = styled.div`
  margin-top: ${SIZING.unit(1.5)};
  margin-bottom: ${SIZING.unit(3)};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  @media ${device.tablet} {
    margin-top: ${SIZING.unit(1)};
  }
  @media ${device.laptop} {
    margin-top: ${SIZING.unit(1.5)};
    margin-bottom: 0;
  }
`;

export const LegalContainer = styled.button`
  width: auto;
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 64px;
  cursor: pointer;
  margin-right: ${SIZING.unit(1.25)};
  :focus {
    outline: 1px solid ${COLORS.black};
    outline-offset: 1px;
  }
  :focus:not(:focus-visible) {
    outline: none;
    outline-offset: 0;
  }
  p {
    font-size: 12px;
    font-family:
      Audi Type,
      sans-serif;
  }
  @media ${device.tablet} {
    margin: 0;
    width: auto;
    padding-left: ${SIZING.unit(0.625)};
  }
`;

export const LegalIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-left: ${SIZING.unit(0.5)};
`;
