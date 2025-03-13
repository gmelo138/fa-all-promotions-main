/* eslint-disable camelcase */
import _ from 'lodash';
import intersection from 'lodash/intersection';
import { PromotionVehicleType } from '../types/promotionsTypes';
import {
  CARLINE_FILTER_LIST,
  BODY_TYPE_FILTER_LIST,
  REGION_FILTER_LIST,
} from '../constants/FilterList';

type RestFilterFunctionType = (
  promotions: Array<PromotionVehicleType>,
  filterList: string[],
) => Array<PromotionVehicleType>;

type ModelYearFilterFunctionType = (
  promotions: Array<PromotionVehicleType>,
  filterList: number[],
) => Array<PromotionVehicleType>;

type CombinedRestFilterFunctionType = (
  promotions: Array<PromotionVehicleType>,
  filterList: {
    modelYearRange: number[];
    regionFilter: string[];
    vehicleTypeFilter: string[];
    bodyTypeFilter: string[];
    modelFamilyFilter: string[];
  },
) => Array<PromotionVehicleType>;

type RemoveDuplicatedCarsFunctionType = (
  promotions: Array<PromotionVehicleType>,
) => Array<PromotionVehicleType>;

export const filterByInventoryType: RestFilterFunctionType = (promotions, filterList) => {
  return promotions.filter((promotion: PromotionVehicleType) =>
    filterList.includes(promotion.type),
  );
};

export const filterByRegion: RestFilterFunctionType = (promotions, filterList) => {
  const { Alberta, National } = REGION_FILTER_LIST;
  // Check if we have selected Alberta, if we have we add National to filter by it
  const currentFilterList = filterList.includes(Alberta) ? [...filterList, National] : filterList;
  return promotions.filter((promotion: PromotionVehicleType) =>
    currentFilterList.includes(promotion.dag),
  );
};

export const filterByBodyType: RestFilterFunctionType = (promotions, filterList) => {
  // Check if we have at least 1 relevant filter selected. If not we do not filter by it
  if (!intersection(Object.values(BODY_TYPE_FILTER_LIST), filterList).length) return promotions;
  return promotions.filter((promotion: PromotionVehicleType) =>
    filterList.includes(promotion.bodyStyleEn),
  );
};

export const filterByModelFamily: RestFilterFunctionType = (promotions, filterList) => {
  // Check if we have at least 1 relevant filter selected. If not we do not filter by it.
  if (!intersection(Object.values(CARLINE_FILTER_LIST), filterList).length) return promotions;

  return promotions.filter(
    (promotion: PromotionVehicleType) =>
      promotion.modelId !== null && filterList.includes(promotion.modelId),
  );
};

export const filterByModelYear: ModelYearFilterFunctionType = (promotions, [min, max]) => {
  if (!min || !max) return promotions;

  return promotions.filter(({ year }) => year >= min && year <= max);
};

const removeDuplicatedCars: RemoveDuplicatedCarsFunctionType = (promotions) => {
  const groupedByModelName = _.groupBy(promotions, 'modelName');

  const groupedByYear = _.mapValues(groupedByModelName, (group) => {
    return _.groupBy(group, 'year');
  });

  const filteredCars = _.mapValues(groupedByYear, (group) => {
    const promotionsNotDuplicated = _.mapValues(group, (promotion) => {
      // flag to control if there is any dag offers equals to NAT offers
      let hasDuplicatedNatPromotion = false;
      const NAT = REGION_FILTER_LIST.National;
      const natPromotion = promotion.find((promo) => promo.dag === NAT);

      if (!natPromotion) return promotion;

      // returns offers title: ['Lease', 'Finance']
      const natPromotionOffers = natPromotion.offers?.map((offer) => offer.title);

      // loop to validate if there is duplicated offers
      promotion.forEach((promo) => {
        if (promo.dag !== NAT) {
          // returns offers title: ['Lease', 'Finance'] and then we compare it
          const currentOffers = promo.offers.map((offer) => offer.title);
          hasDuplicatedNatPromotion = _.isEqual(natPromotionOffers, currentOffers);
        }
      });

      // if there is duplicated Nat Promotion, we remove it
      return hasDuplicatedNatPromotion ? promotion.filter((promo) => promo.dag !== NAT) : promotion;
    });

    return _.values(promotionsNotDuplicated);
  });
  return _.flatMapDeep(filteredCars);
};

const filterOngoinPromotions: CombinedRestFilterFunctionType = (
  allPromotions,
  { regionFilter, vehicleTypeFilter, bodyTypeFilter, modelFamilyFilter, modelYearRange },
) => {
  const NAT = REGION_FILTER_LIST.National;
  let filteredCars = allPromotions;

  // check if NAT is selected, if it's not, we remove used-cars inventory type filter.
  const currentVehicleTypeFilter = regionFilter.includes(NAT)
    ? vehicleTypeFilter
    : vehicleTypeFilter.filter((filter) => filter !== 'USED-CAR');

  filteredCars = filterByInventoryType(filteredCars, currentVehicleTypeFilter);
  filteredCars = filterByRegion(filteredCars, regionFilter);
  filteredCars = filterByBodyType(filteredCars, bodyTypeFilter);
  filteredCars = filterByModelFamily(filteredCars, modelFamilyFilter);
  filteredCars = filterByModelYear(filteredCars, modelYearRange);
  filteredCars = removeDuplicatedCars(filteredCars);

  return filteredCars;
};

export default filterOngoinPromotions;
