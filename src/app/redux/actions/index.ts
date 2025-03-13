import { createAction } from 'redux-actions';
import ActionTypes from './ActionTypes';

// Async fetch states
export const setPromotions = createAction(ActionTypes.PROMOTIONS_FETCH_SUCCESS);
export const setPromotionsError = createAction(ActionTypes.PROMOTIONS_FETCH_ERROR);

export const setRegionFilter = createAction(ActionTypes.REGION_FILTER_SET);
export const deleteRegionFilter = createAction(ActionTypes.REGION_FILTER_DELETE);

export const setVehicleType = createAction(ActionTypes.VEHICLE_TYPE_FILTER_SET);
export const deleteVehicleType = createAction(ActionTypes.VEHICLE_TYPE_FILTER_DELETE);

export const setBodyType = createAction(ActionTypes.BODY_TYPE_SET);
export const deleteBodyType = createAction(ActionTypes.BODY_TYPE_DELETE);

export const setModelFamily = createAction(ActionTypes.MODEL_FAMILY_SET);
export const deleteModelFamily = createAction(ActionTypes.MODEL_FAMILY_DELETE);

export const setModelYearRange = createAction(ActionTypes.MODEL_YEAR_RANGE_SET);
export const deleteModelYearRange = createAction(ActionTypes.MODEL_YEAR_RANGE_DELETE);

export const setConfirmedFilters = createAction(ActionTypes.CONFIRMED_FILTERS_SET);
export const setTemporaryFilters = createAction(ActionTypes.TEMPORARY_FILTERS_SET);
export const deleteAllFilters = createAction(ActionTypes.ALL_FILTERS_CLEAR);
