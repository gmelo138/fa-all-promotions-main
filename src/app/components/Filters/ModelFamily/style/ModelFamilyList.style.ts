import styled from 'styled-components';
import { Tabs as RTabs, TabList as RTabList, Tab as RTab } from 'react-tabs';
import { P } from '../../../../styles/Global.style';
import { device } from '../../../../styles/devices';
import { COLORS, SIZING } from '../../../../styles/variables';

export const FilterSection = styled.div`
  display: flex;
  font-family: Audi Type;
  flex-direction: column;
  padding-bottom: ${SIZING.unit(7.5)};
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ModelFamilyCount = styled(P)`
  font-size: 12px;
  color: ${COLORS.grey30};
`;

export const Button = styled.button<{ isActive: boolean; isAvailable: boolean }>`
  min-width: 75px;
  height: 60px;
  background-color: transparent;
  border: none;
  color: ${({ isAvailable }) => (isAvailable ? COLORS.grey15 : COLORS.grey60)};
  cursor: pointer;
  font-family: 'Audi Type';
  font-size: 16px;
  font-weight: ${({ isActive }) => (isActive ? '700' : '400')};
  letter-spacing: 0.01rem;
  line-height: 100%;
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

export const Label = styled.span<{ isActive: boolean; isAvailable: boolean }>`
  border-bottom: ${({ isActive }) => (isActive ? `2px solid ${COLORS.white}` : 'none')};
  color: ${({ isActive }) => isActive && COLORS.white};
  transition: all 0.3s ease-in;
  :hover {
    font-weight: ${({ isAvailable }) => isAvailable && 700};
  }
`;

export const ModelList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const Models = styled.section`
  padding-top: ${SIZING.unit(0.25)};
  display: flex;
  overflow: auto;
  flex-wrap: wrap;
  overflow: hidden;
  width: 95%;
  justify-content: center;
  scrollbar-width: none;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Tab = styled(RTab)`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  font-family: 'Audi Type';
  font-size: 16px;
  line-height: 24px;
  padding: ${SIZING.unit(1)} 0;
  border-bottom: 2px solid ${COLORS.grey50};
  user-select: none;
  cursor: arrow;
  background: transparent;
  color: ${COLORS.grey50};
  &.is-selected {
    color: ${COLORS.white};
    border-bottom: 2px solid ${COLORS.white};
  }
  &:hover {
    cursor: pointer;
  }
`;

export const TabsContainer = styled(RTabs)`
  width: 100%;
  margin: 0 0 ${SIZING.unit(1)} 0;
  @media ${device.tablet} {
    margin: 0 0 ${SIZING.unit(2)} 0;
  }
`;

export const TabList = styled(RTabList)`
  list-style-type: none;
  display: flex;
  margin: 0;
`;
