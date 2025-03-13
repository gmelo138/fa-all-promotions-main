import styled from 'styled-components';
import { device } from '../../../../styles/devices';
import { P } from '../../../../styles/Global.style';
import { COLORS, SIZING } from '../../../../styles/variables';

export const FilterBarWrapper = styled.section`
  /* background-color: ${COLORS.black}; */
  display: flex;
  flex-direction: column;
  /* margin-top: ${SIZING.unit(3)};
  margin-bottom: ${SIZING.unit(5)}; */
  @media ${device.laptop} {
    flex-direction: row;
  }
`;

export const ClearFiltersText = styled(P)`
  cursor: pointer;
`;

export const Filters = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  @media ${device.laptop} {
    flex-direction: row;
    align-items: flex-start;
  }
`;

export const ListOfFilters = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 8px;
  @media ${device.laptop} {
    width: auto;
  }
`;

export const ClearFilters = styled.div`
  margin-left: ${SIZING.unit(1)};
  height: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  p {
    border-bottom: 1px ${COLORS.black} solid;
    padding: 0;
    line-height: 16px;
  }
`;

export const ClearFiltersButton = styled.div<{ language: string }>`
  outline-offset: 2px;
  &:focus {
    outline: 2px solid black;
  }
`;

export const FilterBox = styled.div<{ isLastDagInList?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ isLastDagInList }) => (isLastDagInList ? 'center' : 'flex-start')};
  padding: ${SIZING.unit(0.5)} ${SIZING.unit(1.5)};
  height: 32px;
  // We are using this RGBA instead of vars, because we have to select opacity inside background color
  // If we will use separate opacity value it will effect on child and that is making child component much more
  // confusing and complex
  background-color: rgba(0, 0, 0, 0.05);
  p {
    color: ${COLORS.mineShaft};
  }
  @media ${device.laptop} {
  }
`;

export const Plus = styled.span`
  font-style: italic;
`;

export const CloseBtn = styled.div`
  margin-left: ${SIZING.unit(2)};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline-offset: 2px;
  &:focus {
    outline: 2px solid ${COLORS.black};
  }
`;
