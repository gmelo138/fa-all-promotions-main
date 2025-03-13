/* eslint-disable import/prefer-default-export */
export const formatOfferPercentage = (offerPercent: number | null): number | null => {
  if (offerPercent === null) {
    return null;
  }
  return Number((offerPercent * 100).toFixed(2));
};
