/* eslint-disable max-len */
import styled from 'styled-components';
import { device } from '../../styles/devices';
import { COLORS, SIZING } from '../../styles/variables';

export const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${SIZING.unit(3)} ${SIZING.unit(3.5)};
  width: 100%;
  @media ${device.tablet} {
    padding: ${SIZING.unit(6)} ${SIZING.unit(3)};
  }
  @media ${device.laptop} {
    padding: ${SIZING.unit(7.5)} ${SIZING.unit(3)};
  }
  @media ${device.laptopL} {
    padding: ${SIZING.unit(8)} ${SIZING.unit(4)};
  }
`;

export const FiltersHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
  margin-bottom: ${SIZING.unit(2)};

  @media ${device.tablet} {
    margin-bottom: ${SIZING.unit(3)};
  }

  @media ${device.laptop} {
    margin-bottom: ${SIZING.unit(3.5)};
  }

  @media ${device.laptopL} {
    margin-bottom: ${SIZING.unit(4)};
    h4 {
      font-size: 24px;
      line-height: 36px;
      letter-spacing: -0.36px;
    }
  }
`;

export const CloseIcon = styled.button`
  background: inherit;
  height: 24px;
  width: 24px;
  border: none;
  padding: 0;
  position: absolute;
  right: 0;
  top: -8px;
  cursor: pointer;
  @media ${device.tablet} {
    top: -24px;
  }
  @media ${device.laptop} {
    height: 48px;
    width: 48px;
    top: -34px;
  }
`;

export const ButtonWrapper = styled.div<{ isFilterSelected?: boolean }>`
  width: 100%;
  height: 78px;
  position: sticky;
  bottom: 0;
  border: 0.25px solid ${COLORS.grey5};
  background-color: ${COLORS.grey90};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  z-index: 30;
`;
