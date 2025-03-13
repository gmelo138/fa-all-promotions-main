/* eslint-disable import/prefer-default-export */
export const checkIsThisChinesePage = (): boolean => {
  return window.location.pathname.includes('promotions-cn');
};
