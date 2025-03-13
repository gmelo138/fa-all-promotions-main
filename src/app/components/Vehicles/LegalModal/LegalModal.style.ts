import styled from 'styled-components';
import { SIZING } from '../../../styles/variables';

export const BlackBackgroundLayer = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  z-index: 1000;
`;

export const Legal = styled.div`
  background-color: white;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 85%;
  max-width: 900px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  padding: ${SIZING.unit(3.75)};
  z-index: 1200;
`;

export const CloseBtn = styled.button`
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:focus {
    outline: 2px solid black;
  }
  svg {
    width: 30px;
    height: 30px;
  }
`;

export const LegalText = styled.div`
  width: 100%;
  height: 100%;
  color: black;
  font-family: 'Audi Type';
  font-size: 14px;
  font-weight: 400;
  padding: ${SIZING.unit(0.625)};
  white-space: pre-wrap;
  height: 100%;
  line-height: 20px;
  overflow: auto;
  text-align: left;
  &:focus {
    outline: 2px solid black;
  }
`;
