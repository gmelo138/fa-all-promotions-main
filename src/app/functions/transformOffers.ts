/* eslint-disable no-param-reassign */
import { ListOfOfferTypes } from '../types/promotionsTypes';

interface GroupedItem {
  start: number;
  end: number;
  value: number;
}

type AccType = GroupedItem[];

export const transformCpoOffers = (cpoOffers: Record<string, number>): Record<string, number> => {
  const grouped: { start: number; end: number; value: number }[] = Object.entries(
    cpoOffers,
  ).reduce<AccType>((acc, [key, value]) => {
    const rangeMatch = key.match(/apr(\d+)_(\d+)/);
    if (rangeMatch) {
      const start = parseInt(rangeMatch[1], 10);
      const end = parseInt(rangeMatch[2], 10);
      const existing = acc.find(
        (item: { value: number; end: number }) => item.value === value && item.end + 1 === start,
      ) as GroupedItem | undefined;

      if (existing) {
        existing.end = end;
      } else {
        acc.push({ start, end, value });
      }
    }
    return acc;
  }, []);

  const result: Record<string, number> = grouped.reduce((acc, { start, end, value }) => {
    const combinedKey = `apr${start}_${end}`;
    (acc as Record<string, number>)[combinedKey] = value;
    return acc;
  }, {});

  return result;
};

export const transformNewOffers = (offers: ListOfOfferTypes[]) => {
  const result = offers?.reduce(
    (acc, item) => {
      const { title } = item;
      const offerTypes = item.offertypes;

      const offerTypeObject = offerTypes.reduce(
        (offerAcc, offer) => {
          if (!offer) return offerAcc;
          // Extract the name and remove "Lease" or "Finance" from the beginning
          const newName = offer.name.replace(/(Lease|Finance|Cash)/, '');

          // Check for child properties like "leaseDownPayment" and "financeDownPayment"
          const modifiedOffer = Object.entries(offer).reduce(
            (modifiedAcc, [key, value]) => {
              if (!value && value !== 0) return modifiedAcc;
              const newKey = key.replace(/(lease|finance)/, '');
              modifiedAcc[newKey] = value;
              return modifiedAcc;
            },
            {} as Record<string, any>,
          ); // Specify the type for modifiedAcc

          // Add the modified name property to the offer object
          modifiedOffer.newName = newName;

          // Add the modified offer object to the accumulator
          offerAcc[newName] = modifiedOffer;

          return offerAcc;
        },
        {} as Record<string, any>,
      );

      acc[title] = offerTypeObject;
      return acc;
    },
    {} as Record<string, Record<string, any>>,
  );
  return result;
};

export const rangeConverter = (rangeKey: string) => {
  const rangeMatch = rangeKey.match(/apr(\d+)_(\d+)/);
  if (!rangeMatch) return rangeKey;
  const start = parseInt(rangeMatch[1], 10);
  const end = parseInt(rangeMatch[2], 10);
  return `${start} - ${end}`;
};

export const transformLegals = (legal: string | null) => {
  if (!legal) return null;
  // Initialize an empty object to store the results
  const resultObject: { [key: string]: string | null } = {};
  // Process each line to create the object
  legal?.split('<br>').forEach((line) => {
    // Use regular expressions to extract the key and value
    const match = line.match(/^(.*?):\s*(.*)/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim() || null; // Use null if there's no value
      resultObject[key] = value;
    }
  });
  return resultObject;
};
