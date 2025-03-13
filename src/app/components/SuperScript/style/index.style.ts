import styled from 'styled-components';
import { COLORS } from '../../../styles/variables';

export const SuperScriptWrapper = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-family: 'Audi Type';
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.02%;
`;
export const SuperScriptButton = styled.button`
  width: 100%;
  height: 100%;
  padding: 0;
  border: none;
  background: inherit;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
export const ScriptNumber = styled.div`
  border-bottom: 1px solid ${COLORS.black};
  padding-bottom: 4px;
  width: 8px;
  text-align: center;
`;
