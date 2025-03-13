import styled from 'styled-components';
import { Tabs as RTabs, TabList as RTabList, Tab as RTab } from 'react-tabs';
import { device } from '../../../../styles/devices';
import { COLORS, SIZING } from '../../../../styles/variables';

export const OfferComponents = styled.div`
  min-height: 300px;
  width: 100%;
  @media ${device.tablet} {
    width: 100%;
    margin-top: ${SIZING.unit(6.5)};
  }
  @media ${device.laptop} {
    margin-bottom: 0;
  }
`;

export const Tab = styled(RTab)`
  display: flex;
  flex-grow: 1;
  height: 58px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-family: 'Audi Type';
  font-size: 14px;
  line-height: 24px;
  cursor: arrow;
  color: ${COLORS.grey60};
  transition: 0.1s ease-out;
  @media ${device.tablet} {
    flex-grow: 0;
    width: 121px;
  }
  &.is-selected {
    color: ${COLORS.black};
    background: ${COLORS.grey5};
  }
  &:hover {
    cursor: pointer;
  }
  :focus {
    outline: 1px solid ${COLORS.black};
    outline-offset: 1px;
  }
  :focus:not(:focus-visible) {
    outline: none;
    outline-offset: 0;
    border: none;
  }
`;

export const TabsContainer = styled(RTabs)`
  width: 100%;
`;

export const TabList = styled(RTabList)`
  list-style-type: none;
  display: flex;
  margin: 0;
`;
