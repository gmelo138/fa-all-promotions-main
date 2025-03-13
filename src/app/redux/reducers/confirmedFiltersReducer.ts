import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import ActionTypes from '../actions/ActionTypes';
import { ActionHandler } from '../../types';
import {
  transformedRegion,
  transformedInventoryType,
  transformedModelFamily,
  transformedBodyType,
} from '../../functions/processUrlParamsToRestFilters';
import { modelYear } from '../../functions/queryParamFilters';
import { FILTER_INITIAL_STATES } from '../../constants/InitialStates';

/**
 * Action handler functions
 */

// Filter Set Functions

const handleRegionConfirmedFiltersSet: ActionHandler<
  string[],
  { filters: { regionFilter: string[] } }
> = (_, { payload }) => {
  const { regionFilter } = payload.filters;
  return regionFilter;
};
const handleInventoryTypeConfirmedFiltersSet: ActionHandler<
  string[],
  { filters: { vehicleTypeFilter: string[] } }
> = (_, { payload }) => {
  const { vehicleTypeFilter } = payload.filters;
  return vehicleTypeFilter;
};
const handleBodyTypeConfirmedFiltersSet: ActionHandler<
  string[],
  { filters: { bodyTypeFilter: string[] } }
> = (_, { payload }) => {
  const { bodyTypeFilter } = payload.filters;
  return bodyTypeFilter;
};
const handleModelFamilyConfirmedFiltersSet: ActionHandler<
  string[],
  { filters: { modelFamilyFilter: string[] } }
> = (_, { payload }) => {
  const { modelFamilyFilter } = payload.filters;
  return modelFamilyFilter;
};

const handleModelYearConfirmedFiltersSet: ActionHandler<
  number[],
  { filters: { modelYearRange: number[] } }
> = (_, { payload }) => {
  const { modelYearRange } = payload.filters;

  return modelYearRange;
};

// Filter Handle Delete Functions

const handleRegionFilterDelete: ActionHandler<string[], { region: string }> = (
  state,
  { payload },
) => {
  const { region } = payload;

  return state.filter((toCheck) => toCheck !== region);
};

const handleInventoryTypeFilterDelete: ActionHandler<string[], { vehicleType: string }> = (
  state,
  { payload },
) => {
  const { vehicleType } = payload;

  return state.filter((toCheck) => toCheck !== vehicleType);
};

const handleBodyTypeFilterDelete: ActionHandler<string[], { bodyType: string }> = (
  state,
  { payload },
) => {
  const { bodyType } = payload;

  return state.filter((toCheck) => toCheck !== bodyType);
};

const handleModelFamilyFilterDelete: ActionHandler<string[], { modelFamily: string }> = (
  state,
  { payload },
) => {
  const { modelFamily } = payload;

  return state.filter((toCheck) => toCheck !== modelFamily);
};

const handleModelYearRangeFilterDelete: ActionHandler<number[], { filter: number[] }> = () => {
  return [];
};

// Handle Clear All Filters (restore to default) in Filter Bar

const handleRegionFiltersClear: ActionHandler<string[]> = () => [
  ...FILTER_INITIAL_STATES.regionFilter,
];

const handleInventoryTypeFiltersClear: ActionHandler<string[]> = () => [
  ...FILTER_INITIAL_STATES.vehicleTypeFilter,
];

const handleBodyAndModelFiltersClear: ActionHandler<string[]> = () => [];

/**
 * Reducer, responsible only for this part of the redux tree
 */

export const regionFilterReducer = handleActions<string[], any, any>(
  {
    [ActionTypes.CONFIRMED_FILTERS_SET]: handleRegionConfirmedFiltersSet,
    [ActionTypes.REGION_FILTER_DELETE]: handleRegionFilterDelete,
    [ActionTypes.ALL_FILTERS_CLEAR]: handleRegionFiltersClear,
  },
  transformedRegion(),
);

export const inventoryTypeFilterReducer = handleActions<string[], any, any>(
  {
    [ActionTypes.CONFIRMED_FILTERS_SET]: handleInventoryTypeConfirmedFiltersSet,
    [ActionTypes.VEHICLE_TYPE_FILTER_DELETE]: handleInventoryTypeFilterDelete,
    [ActionTypes.ALL_FILTERS_CLEAR]: handleInventoryTypeFiltersClear,
  },
  transformedInventoryType(),
);

export const bodyTypeFilterReducer = handleActions<string[], any, any>(
  {
    [ActionTypes.CONFIRMED_FILTERS_SET]: handleBodyTypeConfirmedFiltersSet,
    [ActionTypes.BODY_TYPE_DELETE]: handleBodyTypeFilterDelete,
    [ActionTypes.ALL_FILTERS_CLEAR]: handleBodyAndModelFiltersClear,
  },
  transformedBodyType(),
);

export const modelFamilyFilterReducer = handleActions<string[], any, any>(
  {
    [ActionTypes.CONFIRMED_FILTERS_SET]: handleModelFamilyConfirmedFiltersSet,
    [ActionTypes.MODEL_FAMILY_DELETE]: handleModelFamilyFilterDelete,
    [ActionTypes.ALL_FILTERS_CLEAR]: handleBodyAndModelFiltersClear,
  },
  transformedModelFamily(),
);

export const modelYearRangeReducer = handleActions<number[], any, any>(
  {
    [ActionTypes.CONFIRMED_FILTERS_SET]: handleModelYearConfirmedFiltersSet,
    [ActionTypes.MODEL_YEAR_RANGE_DELETE]: handleModelYearRangeFilterDelete,
    [ActionTypes.ALL_FILTERS_CLEAR]: handleModelYearRangeFilterDelete,
  },
  modelYear ?? [],
);

export default combineReducers({
  regionFilter: regionFilterReducer,
  vehicleTypeFilter: inventoryTypeFilterReducer,
  bodyTypeFilter: bodyTypeFilterReducer,
  modelFamilyFilter: modelFamilyFilterReducer,
  modelYearRange: modelYearRangeReducer,
});

/**
 * Selectors
 */
export const getConfirmedFilters = (state: {
  confirmedFilters: {
    regionFilter: string[];
    vehicleTypeFilter: string[];
    bodyTypeFilter: string[];
    modelFamilyFilter: string[];
    modelYearRange: number[];
  };
}): {
  regionFilter: string[];
  vehicleTypeFilter: string[];
  bodyTypeFilter: string[];
  modelFamilyFilter: string[];
  modelYearRange: number[];
} => state.confirmedFilters;

export const getModelYearRangeConfirmedFilter = (state: {
  confirmedFilters: { modelYearRange: number[] };
}): number[] => state.confirmedFilters.modelYearRange;
