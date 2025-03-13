import styled from 'styled-components';
import { device } from '../../styles/devices';
import { COLORS } from '../../styles/variables';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  padding: 0;
  z-index: 1000;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media ${device.tablet} {
  }
`;

export const Wrapper = styled.section`
  background: ${COLORS.black};
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  -ms-overflow-style: none;
  scrollbar-width: none;
  @media ${device.tablet} {
    width: 380px;
  }
  @media ${device.laptop} {
    width: 488px;
  }
  @media ${device.laptopL} {
    width: 570px;
  }
`;
export const CloseModalButton = styled.button`
  background: none;
  border: none;
  display: flex;
  &:focus {
    outline: 2px solid ${COLORS.black};
  }
`;
