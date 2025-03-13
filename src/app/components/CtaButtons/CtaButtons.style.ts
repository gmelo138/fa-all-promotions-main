import styled, { css } from 'styled-components';
import { device } from '../../styles/devices';
import { COLORS } from '../../styles/variables';

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 100%;
  flex-wrap: wrap;
`;

export const Button = styled.button<{ disabled?: boolean; isNarrow?: boolean }>`
  width: ${({ isNarrow }) => (isNarrow ? '275px' : '300px')};
  height: 54px;
  padding: 0;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  outline: inherit;
  font-family: 'Audi Type';
  font-size: 16px;
  line-height: normal;
  font-weight: 400;
  border: none;
  background: white;
  color: ${({ disabled }) => (disabled ? `${COLORS.grey30}` : `${COLORS.black}`)};
  border: ${({ disabled }) =>
    disabled ? `1px solid ${COLORS.grey30}` : `1px solid ${COLORS.black}`};
  transition: 0.3s;
  :hover {
    color: ${({ disabled }) => (disabled ? `${COLORS.grey30}` : `${COLORS.grey70}`)};
    border: ${({ disabled }) =>
      disabled ? `1px solid ${COLORS.grey30}` : `1px solid ${COLORS.grey70}`};
  }
  &:focus {
    outline: 2px solid ${COLORS.blue};
    border-radius: 2px;
  }

  @media screen and (min-width: 1160px) {
    width: ${({ isNarrow }) => !isNarrow && '270px'};
  }
`;

export const CardButton = styled(Button)`
  width: 273px;
  height: 56px;

  @media ${device.laptopL} {
    width: 184px;
  }
  /* @media screen and (min-width: 1160px) {
    
  } */
`;

export const PrimaryButton = styled(Button)`
  background-color: ${({ disabled }) => (disabled ? COLORS.grey30 : COLORS.black)};
  color: ${COLORS.white};
  transition: 0.3s;
  :hover {
    background-color: ${({ disabled }) => (disabled ? COLORS.grey30 : COLORS.grey70)};
    border: ${({ disabled }) => (disabled ? COLORS.grey30 : COLORS.grey70)};
    color: ${COLORS.white};
  }
`;

export const ContactDealerCTA = styled.button`
  padding: 0;
  border: none;
  background: inherit;
  height: 26px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  font-family: 'Audi Type';
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.02%;
  padding-bottom: 4px;
  @media ${device.laptopL} {
    padding-bottom: 0;
    font-size: 16px;
    line-height: 24px;
  }
`;

export const LoadMoreButton = styled.button`
  outline: inherit;
  font-family: 'Audi Type';
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  border: none;
  padding: 0;
  background: inherit;
  color: ${COLORS.grey60};
  border-bottom: 1px solid ${COLORS.grey60};
  padding-bottom: 4px;
  margin-top: 48px;
  cursor: pointer;
  @media ${device.laptop} {
    margin-top: 32px;
  }
  @media ${device.laptopL} {
    margin-top: 48px;
  }
`;

export const BasicFilterButton = styled.button`
  height: 46px;
  width: 162px;
  background-color: inherit;
  color: ${COLORS.white};
  border: 1px solid ${COLORS.white};
  cursor: pointer;

  @media ${device.laptop} {
    width: 216px;
  }
  @media ${device.laptopL} {
    width: 249px;
  }
`;

export const ShowResultsButton = styled(BasicFilterButton)<{ disabled?: boolean }>`
  ${({ disabled }) => {
    if (disabled)
      return css`
        background-color: ${COLORS.grey30};
        border: 1px solid ${COLORS.grey30};
        color: ${COLORS.grey70};
        cursor: not-allowed;
      `;
    return css`
      background-color: ${COLORS.white};
      border: 1px solid ${COLORS.white};
      color: ${COLORS.grey90};
      cursor: pointer;
    `;
  }}
`;

export const Cta = styled.section`
  width: 300px;
  @media ${device.tablet} {
    width: 610px;
  }
  @media ${device.laptop} {
    width: 300px;
  }
  @media screen and (min-width: 1160px) {
    width: 560px;
  }
`;

export const CtaHref = styled.a`
  text-decoration: none;
`;
