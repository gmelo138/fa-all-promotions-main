import styled from 'styled-components';
import { SIZING } from '../../styles/variables';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: ${SIZING.unit(5)};
`;
