import styled, { css } from 'styled-components';
import { device } from '../../../../styles/devices';
import { H2 } from '../../../../styles/Global.style';
import { COLORS, SIZING } from '../../../../styles/variables';

export const RegionFilterSection = styled.div`
  display: flex;
  font-family: Audi Type;
  max-width: 340px;
  flex-direction: column;
  justify-content: space-between;
  > div {
    margin-bottom: ${SIZING.unit(1.5)};
  }

  @media ${device.laptop} {
    max-width: 578px;
    > div:nth-child(2) {
      > div:nth-child(2) {
        > div {
          left: -90px;
        }
      }
    }
    > div:nth-child(4) {
      > div:nth-child(2) {
        > div {
          left: -50px !important;
        }
      }
    }
  }
`;

export const Title = styled(H2)`
  display: flex;
  color: ${COLORS.grey10};
  padding-bottom: ${SIZING.unit(0.5)};
  line-height: 24px;
  font-size: 16px;
  letter-spacing: -0.24px;
  @media ${device.tablet} {
    padding-bottom: ${SIZING.unit(1)};
  }
`;

export const RegionFilterWrapper = styled.div`
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

export const CheckboxWrapper = styled.div<{ isLabelBig: boolean }>`
  align-items: center;
  display: flex;
  justify-items: center;
`;

export const CheckboxButton = styled.div<{ showCPOError?: boolean }>`
  background: none;
  padding: 0;
  border: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  p {
    color: ${({ showCPOError }) => showCPOError && COLORS.red};
  }
`;

export const Checkbox = styled.button<{ showCPOError?: boolean; checked: boolean }>`
  background: inherit;
  width: 24px;
  height: 24px;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: ${SIZING.unit(1.5)};
  cursor: pointer;
  &:focus {
    outline: 2px solid ${COLORS.white};
    outline-offset: 2px;
  }
  :focus:not(:focus-visible) {
    outline: none;
    outline-offset: 0;
  }
  ${({ showCPOError, checked }) => {
    if (checked && showCPOError)
      return css`
        border: 1px solid ${COLORS.red};
      `;
    if (checked)
      return css`
        border: 1px solid ${COLORS.grey10};
      `;
    return css`
      border: 1px solid ${COLORS.grey30};
    `;
  }}
`;

export const RegionDisclaimer = styled.p`
  color: ${COLORS.grey30};
  font-family: 'Audi Type';
  font-size: 12px;
  padding-bottom: ${SIZING.unit(3)};
  line-height: 20px;
`;
