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

// Filter Toggle Functions

const handleFilterToggle: ActionHandler<string[], { filter: string }> = (state, { payload }) => {
  const { filter } = payload;
  if (state.includes(filter)) {
    return state.filter((toCheck) => filter !== toCheck);
  }

  return [...state, filter];
};

const handleModelYearRangeSet: ActionHandler<number[], { filter: number[] }> = (_, { payload }) => {
  const { filter } = payload;
  return filter;
};

// Filter Set Functions

const handleTemporaryRegionFilterSet: ActionHandler<
  string[],
  { filters: { regionFilter: string[] } }
> = (_, { payload }) => {
  const { regionFilter } = payload.filters;
  return regionFilter;
};
const handleTemporaryInventoryTypeFilterSet: ActionHandler<
  string[],
  { filters: { vehicleTypeFilter: string[] } }
> = (_, { payload }) => {
  const { vehicleTypeFilter } = payload.filters;
  return vehicleTypeFilter;
};
const handleTemporaryBodyTypeFilterSet: ActionHandler<
  string[],
  { filters: { bodyTypeFilter: string[] } }
> = (_, { payload }) => {
  const { bodyTypeFilter } = payload.filters;
  return bodyTypeFilter;
};
const handleTemporaryModelFamilyFilterSet: ActionHandler<
  string[],
  { filters: { modelFamilyFilter: string[] } }
> = (_, { payload }) => {
  const { modelFamilyFilter } = payload.filters;
  return modelFamilyFilter;
};

const handleTemporaryModelYearRangeFilterSet: ActionHandler<
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

export const regionTempFilterReducer = handleActions<string[], any, any>(
  {
    [ActionTypes.REGION_FILTER_SET]: handleFilterToggle,
    [ActionTypes.TEMPORARY_FILTERS_SET]: handleTemporaryRegionFilterSet,
    [ActionTypes.REGION_FILTER_DELETE]: handleRegionFilterDelete,
    [ActionTypes.ALL_FILTERS_CLEAR]: handleRegionFiltersClear,
  },
  transformedRegion(),
);

export const inventoryTempTypeFilterReducer = handleActions<string[], any, any>(
  {
    [ActionTypes.VEHICLE_TYPE_FILTER_SET]: handleFilterToggle,
    [ActionTypes.TEMPORARY_FILTERS_SET]: handleTemporaryInventoryTypeFilterSet,
    [ActionTypes.VEHICLE_TYPE_FILTER_DELETE]: handleInventoryTypeFilterDelete,
    [ActionTypes.ALL_FILTERS_CLEAR]: handleInventoryTypeFiltersClear,
  },
  transformedInventoryType(),
);

export const bodyTypeTempFilterReducer = handleActions<string[], any, any>(
  {
    [ActionTypes.BODY_TYPE_SET]: handleFilterToggle,
    [ActionTypes.TEMPORARY_FILTERS_SET]: handleTemporaryBodyTypeFilterSet,
    [ActionTypes.BODY_TYPE_DELETE]: handleBodyTypeFilterDelete,
    [ActionTypes.ALL_FILTERS_CLEAR]: handleBodyAndModelFiltersClear,
  },
  transformedBodyType(),
);

export const modelFamilyTempFilterReducer = handleActions<string[], any, any>(
  {
    [ActionTypes.MODEL_FAMILY_SET]: handleFilterToggle,
    [ActionTypes.TEMPORARY_FILTERS_SET]: handleTemporaryModelFamilyFilterSet,
    [ActionTypes.MODEL_FAMILY_DELETE]: handleModelFamilyFilterDelete,
    [ActionTypes.ALL_FILTERS_CLEAR]: handleBodyAndModelFiltersClear,
  },
  transformedModelFamily(),
);

export const modelYearRangeTempReducer = handleActions<number[], any, any>(
  {
    [ActionTypes.MODEL_YEAR_RANGE_SET]: handleModelYearRangeSet,
    [ActionTypes.TEMPORARY_FILTERS_SET]: handleTemporaryModelYearRangeFilterSet,
    [ActionTypes.MODEL_YEAR_RANGE_DELETE]: handleModelYearRangeFilterDelete,
    [ActionTypes.ALL_FILTERS_CLEAR]: handleModelYearRangeFilterDelete,
  },
  modelYear ?? [],
);

export default combineReducers({
  regionFilter: regionTempFilterReducer,
  vehicleTypeFilter: inventoryTempTypeFilterReducer,
  bodyTypeFilter: bodyTypeTempFilterReducer,
  modelFamilyFilter: modelFamilyTempFilterReducer,
  modelYearRange: modelYearRangeTempReducer,
});

/**
 * Selectors
 */

export const getTemporaryFilters = (state: {
  temporaryFilters: {
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
} => state.temporaryFilters;
