import styled from 'styled-components';
import { device } from '../../../../styles/devices';
import { P, H2 } from '../../../../styles/Global.style';
import { SIZING, COLORS } from '../../../../styles/variables';

export const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: ${SIZING.unit(4.5)};
  @media ${device.tablet} {
    padding-bottom: ${SIZING.unit(5.5)};
  }
  @media ${device.laptop} {
    padding-bottom: ${SIZING.unit(6.5)};
  }
`;

export const BodyTypeWrapper = styled.button<{ isAvailable: boolean }>`
  align-items: center;
  border: none;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  flex: 0 0 50%;
  flex-wrap: wrap;
  padding-top: ${SIZING.unit(1.5)};
  margin-bottom: ${SIZING.unit(1)};
  opacity: ${({ isAvailable }) => (isAvailable ? '1' : '0.4')};
  cursor: pointer;
  @media ${device.mobileL} {
    flex: 0 0 33%;
  }
  @media ${device.tablet} {
    flex: 0 0 50%;
  }
  @media ${device.laptop} {
    flex: 0 0 33%;
  }
  :focus {
    outline: 2px solid ${COLORS.white};
    outline-offset: 1px;
  }
  :focus:not(:focus-visible) {
    outline: none;
    outline-offset: 0;
    border: none;
  }
`;

export const BodyTypeName = styled(P)<{ isActive: boolean }>`
  cursor: pointer;
  display: flex;
  font-weight: ${({ isActive }) => isActive && 'bold'};
  justify-content: center;
  color: ${COLORS.grey30};
  font-size: 12px;
  line-height: 20px;
  margin-top: ${SIZING.unit(0.5)};
  :focus {
    outline: none;
  }
`;

export const Models = styled.section`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  width: 100%;
  justify-content: center;
`;

export const Title = styled(H2)`
  display: flex;
  color: ${COLORS.grey10};
  padding-bottom: ${SIZING.unit(2.5)};
  line-height: 24px;
  font-size: 16px;
  letter-spacing: -0.24px;
`;
