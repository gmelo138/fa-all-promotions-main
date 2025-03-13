import styled from 'styled-components';
import { device } from '../styles/devices';
import { COLORS, SIZING } from '../styles/variables';
import { P } from '../styles/Global.style';

export const PageWrapper = styled.section`
  background: ${COLORS.grey5};
  padding-top: ${SIZING.unit(0.5)};
  padding-bottom: 120px;
  @media ${device.laptop} {
    max-width: 1440px;
    margin: 0 auto;
  }
  @media ${device.laptopL} {
    max-width: 1920px;
  }
`;

export const PageHeader = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 0 auto;
`;

export const FilterPanel = styled.div`
  background: ${COLORS.black};
  color: ${COLORS.white};
  width: 100%;
  height: 58px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  div {
    width: 100%;
    padding-left: 18px;
    @media ${device.tablet} {
      width: 688px;
      padding-left: 0;
    }
    @media ${device.laptop} {
      width: 750px;
    }
    @media ${device.laptopL} {
      width: 1248px;
    }
  }
`;

export const FilterTagsAndCount = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 40px;
  margin: 0 auto;
  margin-top: 32px;
  width: 100%;
  padding: 0 18px;
  @media ${device.tablet} {
    width: 688px;
    padding-left: 0;
  }
  @media ${device.laptop} {
    width: 750px;
  }
  @media ${device.laptopL} {
    width: 1248px;
  }
`;

export const Disclaimer = styled(P)`
  @media ${device.tablet} {
    width: 688px;
  }
  @media ${device.laptop} {
    width: 750px;
  }
  @media ${device.laptopL} {
    width: 824px;
  }
`;

export const FilterIconContainer = styled.button`
  background: inherit;
  color: ${COLORS.white};
  height: 58px;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  font-family: 'Audi Type';
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.02%;
  &:focus {
    outline: 2px solid ${COLORS.white};
  }
  :focus:not(:focus-visible) {
    outline: none;
    outline-offset: 0;
  }
  p {
    span {
      font-weight: 700;
    }
  }
`;

export const ResultsCounter = styled.div`
  display: flex;
  align-items: center;
  #count-number {
    font-weight: bold;
    margin-right: ${SIZING.unit(1.25)};
  }
`;
