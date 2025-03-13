/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';
import { PromotionVehicleType } from '../../types/promotionsTypes';
import filterOngoingPromotions from '../../functions/filterOngoingPromotions';
import sortPromotions from '../../functions/sortPromotions';
import { regionCheckBoxes } from '../../constants/RegionList';

import { getConfirmedFilters } from './confirmedFiltersReducer';
import { getPromotions } from './queriesReducer';

export const getFilteredPromotions = createSelector(
  getPromotions,
  getConfirmedFilters,
  (promotions, confirmedFilters) => {
    if (!promotions) return [];
    const { regionFilter, vehicleTypeFilter, bodyTypeFilter, modelFamilyFilter, modelYearRange } =
      confirmedFilters;
    const selectedRegions = regionFilter.filter((toCheck) => regionCheckBoxes.includes(toCheck));
    const filteredPromotions = sortPromotions(
      filterOngoingPromotions(promotions, {
        regionFilter,
        vehicleTypeFilter,
        bodyTypeFilter,
        modelFamilyFilter,
        modelYearRange,
      }),
      selectedRegions,
    );

    return filteredPromotions;
  },
) as (state: any) => PromotionVehicleType[];
