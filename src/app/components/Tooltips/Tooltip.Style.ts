import styled from 'styled-components';
import { device } from '../../styles/devices';
import { COLORS, SIZING } from '../../styles/variables';
import CloseIcon from '../../assets/icons/CloseXSmallIcon';

export const Wrapper = styled.div`
  display: flex;
  position: relative;
`;

export const TooltipWrapper = styled.div`
  display: flex;
  position: relative;
  padding-left: ${SIZING.unit(1.125)};
`;

export const TooltipIcon = styled.button<{ isVisible: boolean }>`
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:focus {
    outline: 2px solid ${COLORS.white};
    outline-offset: 2px;
    border-radius: 50%;
  }
  &::after {
    margin-top: ${SIZING.unit(1)};
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid ${COLORS.mineShaft};
    content: '';
    position: absolute;
    top: 21px;
    transform: rotate(180deg);
    display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
    z-index: 1000;
  }
`;

export const IconWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const TooltipCont = styled.section`
  div {
    div {
      background-color: ${COLORS.mineShaft};
    }
    svg {
      color: ${COLORS.mineShaft};
    }
  }
`;

export const TooltipModal = styled.div<{ isOffScreen?: boolean }>`
  width: 310px;
  z-index: 100;
  position: absolute;
  display: flex;
  flex-direction: column;
  left: -100px;
  top: 38px;
  @media ${device.tablet} {
    left: ${({ isOffScreen }) => (isOffScreen ? '-228px' : '-100px')};
  }
`;

export const TooltipTrap = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  &:focus {
    outline: 2px solid ${COLORS.blue};
  }
`;

export const DescriptionWrapper = styled.div`
  background-color: ${COLORS.mineShaft};
  padding: ${SIZING.unit(2)};
  #dealers-list {
    padding-left: ${SIZING.unit(3.875)};
    li {
      color: ${COLORS.white};
      margin: 5px 0;
      font-size: 12px;
      ::before {
        color: ${COLORS.white};
      }
    }
  }
`;

export const CloseButton = styled(CloseIcon)``;

export const Close = styled.button`
  background: transparent;
  cursor: pointer;
  padding: 0;
  border: none;
  right: 16px;
  position: absolute;
  top: 16px;
  width: 20px;
  height: 20px;
  &:focus {
    outline: 2px solid ${COLORS.white};
  }
  svg {
    color: ${COLORS.white};
    height: 20px;
    width: 20px;
  }
`;

export const Description = styled.p`
  color: ${COLORS.white};
  font-family: 'Audi Type';
  font-size: 12px;
  line-height: 20px;
  text-align: left;
`;

export const DescriptionText = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const DealersList = styled.ul`
  color: ${COLORS.white};
  list-style: disc;
  padding-left: ${SIZING.unit(2.5)};
`;

export const DealerName = styled.li`
  font-family: 'Audi Type';
  font-size: 16px;
  line-height: 15px;
  text-align: left;
  @media ${device.tablet} {
    line-height: 18px;
  }
`;
