import { OfferTypes } from '../types/promotionsTypes';

const filterOfferByType = (
  listOfOffers: Array<OfferTypes> | null | undefined,
  offerType: string,
): OfferTypes | undefined | null => {
  if (listOfOffers === null || !listOfOffers) {
    return null;
  }
  return listOfOffers.filter((offer: OfferTypes) => offer?.name.includes(offerType))[0];
};

export default filterOfferByType;
