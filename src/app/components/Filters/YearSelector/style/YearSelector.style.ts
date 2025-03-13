import styled from 'styled-components';
import { device } from '../../../../styles/devices';
import { H2, P } from '../../../../styles/Global.style';
import { COLORS, SIZING } from '../../../../styles/variables';

export const Label = styled(P)`
  white-space: nowrap;
  font-size: 12px;
  color: ${COLORS.grey30};
`;

export const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  height: 30px;
  margin-top: ${SIZING.unit(2)};
`;

export const TitleWrap = styled.div`
  width: 100%;
`;

export const Title = styled(H2)`
  display: flex;
  color: ${COLORS.grey10};
  padding-bottom: ${SIZING.unit(5)};
  line-height: 24px;
  font-size: 16px;
  letter-spacing: -0.24px;
`;

export const SelectedYearsRange = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-bottom: ${SIZING.unit(1)};
`;

export const SelectedYear = styled(P)`
  font-weight: 700;
  color: ${COLORS.grey10};
`;

export const To = styled(P)`
  color: ${COLORS.grey10};
`;

export const SliderContainer = styled.div`
  width: 100%;
  align-self: center;
  padding-bottom: ${SIZING.unit(2.5)};
  height: 50px;
`;

export const SliderSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: ${SIZING.unit(7)};
  @media ${device.laptop} {
    margin-bottom: ${SIZING.unit(7.5)};
  }
  // Imported Styles from module
  .rc-slider {
    position: relative;
    height: 14px;
    padding: ${SIZING.unit(0.5)} 0;
    width: 100%;
    margin-left: 0;
    border-radius: 6px;
    touch-action: none;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }
  .rc-slider * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }
  .rc-slider-rail {
    position: absolute;
    width: 100%;
    background-color: ${COLORS.grey70};
    height: 2px;
    top: 12px;
  }
  .rc-slider-track {
    position: absolute;
    left: 0;
    height: 2px;
    background-color: ${COLORS.white};
    top: 12px;
    z-index: 10;
  }
  .rc-slider-handle {
    position: absolute;
    width: 26px;
    height: 26px;
    cursor: pointer;
    cursor: -webkit-grab;
    margin-top: -${SIZING.unit(0.5)};
    cursor: grab;
    border-radius: 50%;
    border: solid 1px ${COLORS.grey30};
    background-color: ${COLORS.grey90};
    touch-action: pan-x;
    outline-offset: 2px;
    z-index: 20;
    &:focus {
      outline: 2px solid ${COLORS.white};
    }
  }
  .rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging {
    outline: 2px solid ${COLORS.white};
    outline-offset: 2px;
  }
  .rc-slider-handle-click-focused:focus {
    box-shadow: unset;
  }
  .rc-slider-handle:hover {
    border-color: ${COLORS.black};
  }
  .rc-slider-handle:active {
    border-color: ${COLORS.white};
    cursor: -webkit-grabbing;
    cursor: grabbing;
  }
  .rc-slider-mark {
    position: absolute;
    top: 18px;
    left: 0;
    width: 100%;
    font-size: 12px;
  }
  .rc-slider-mark-text {
    position: absolute;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    cursor: pointer;
    color: ${COLORS.grey40};
  }
  .rc-slider-mark-text-active {
    color: ${COLORS.grey60};
  }
  .rc-slider-step {
    position: absolute;
    width: 100%;
    height: 4px;
    background: transparent;
  }
  .rc-slider-dot {
    position: absolute;
    bottom: -14px;
    width: 1px;
    height: 18px;
    background-color: ${COLORS.grey70};
    cursor: pointer;
    vertical-align: middle;
    :first-child {
      display: none;
    }
    :last-child {
      display: none;
    }
  }
  .rc-slider-dot-active {
    background-color: ${COLORS.grey70};
  }
  .rc-slider-disabled .rc-slider-handle,
  .rc-slider-disabled .rc-slider-dot {
    box-shadow: none;
    cursor: not-allowed;
  }
  .rc-slider-disabled .rc-slider-mark-text,
  .rc-slider-disabled .rc-slider-dot {
    cursor: not-allowed !important;
  }
`;
