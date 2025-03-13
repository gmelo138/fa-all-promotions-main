import { PromotionVehicleType } from '../types/promotionsTypes';
import { INVENTORY_TYPE_FILTER_LIST, REGION_FILTER_LIST } from '../constants/FilterList';

const sortPromotions = (
  filteredPromotions: PromotionVehicleType[],
  selectedRegions: string[],
): PromotionVehicleType[] => {
  const promotionSorterFn = (a: PromotionVehicleType, b: PromotionVehicleType) => {
    // Most inportant sorting criteria is the featuredOffer
    // For New Vehicles
    if (a.featuredOffer && !b.featuredOffer && a.dag === b.dag) return -1;
    if (!a.featuredOffer && b.featuredOffer && a.dag === b.dag) return 1;

    // CPO Vehicles
    if (
      a.cpoOffers?.featuredOffer &&
      !b.cpoOffers?.featuredOffer &&
      a.type === INVENTORY_TYPE_FILTER_LIST.Cpo &&
      b.type === INVENTORY_TYPE_FILTER_LIST.Cpo
    )
      return -1;
    if (
      !a.cpoOffers?.featuredOffer &&
      b.cpoOffers?.featuredOffer &&
      a.type === INVENTORY_TYPE_FILTER_LIST.Cpo &&
      b.type === INVENTORY_TYPE_FILTER_LIST.Cpo
    )
      return 1;

    // Sorting by values in featuredHierarchy inside New Vehicles featured offers.
    const hierarchyA = a.featuredHierarchy || Infinity;
    const hierarchyB = b.featuredHierarchy || Infinity;
    if (a.featuredOffer && b.featuredOffer && a.dag === b.dag && hierarchyA < hierarchyB) return -1;
    if (a.featuredOffer && b.featuredOffer && a.dag === b.dag && hierarchyA > hierarchyB) return 1;

    // Sorting by values in featuredHierarchy inside CPO Vehicles featured offers.
    const hierarchyCpoA = a.cpoOffers?.featuredHierarchy || Infinity;
    const hierarchyCpoB = b.cpoOffers?.featuredHierarchy || Infinity;
    if (a.cpoOffers?.featuredOffer && b.cpoOffers?.featuredOffer && hierarchyCpoA < hierarchyCpoB)
      return -1;
    if (a.cpoOffers?.featuredOffer && b.cpoOffers?.featuredOffer && hierarchyCpoA > hierarchyCpoB)
      return 1;

    // Second criteria is if the vehicle is new or used
    if (a.type === INVENTORY_TYPE_FILTER_LIST.New && b.type !== INVENTORY_TYPE_FILTER_LIST.New)
      return -1;
    if (a.type !== INVENTORY_TYPE_FILTER_LIST.New && b.type === INVENTORY_TYPE_FILTER_LIST.New)
      return 1;

    // The third criteria is it being not "national"
    if (a.dag !== REGION_FILTER_LIST.National && b.dag === REGION_FILTER_LIST.National) return -1;
    if (a.dag === REGION_FILTER_LIST.National && b.dag !== REGION_FILTER_LIST.National) return 1;

    // The fourth criteria is the order of the selection the user made
    const selectionOrderDifference =
      selectedRegions.indexOf(a.dag) - selectedRegions.indexOf(b.dag);
    if (selectionOrderDifference !== 0) return selectionOrderDifference;

    return 1;
  };

  return filteredPromotions.sort(promotionSorterFn);
};

export default sortPromotions;
