const offerPlusConverter = (offer: string | null): string[] | null => {
  if (!offer) return null;
  const listOfOffers = offer.split(';');
  return listOfOffers
    .filter((toCheck) => toCheck !== ' ')
    .filter((toCheck) => toCheck !== '')
    .filter((toCheck) => (listOfOffers.length === 1 ? toCheck.length < 300 : toCheck.length < 120))
    .slice(0, 5);
};

export default offerPlusConverter;
