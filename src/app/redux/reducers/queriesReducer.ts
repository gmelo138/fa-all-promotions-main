import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import ActionTypes from '../actions/ActionTypes';
import { ActionHandler } from '../../types';
import { PromotionVehicleType } from '../../types/promotionsTypes';

type QueryState<ResultType, ErrorType = string> = {
  isLoading: boolean;
  result: null | ResultType;
  error: null | ErrorType;
};

/**
 * queries.promotions
 */

// action handler functions
const handlePromotionsFetchSuccess: ActionHandler<
  QueryState<PromotionVehicleType[]>,
  { result: PromotionVehicleType[] }
> = (_, { payload }) => {
  const { result } = payload;

  return { isLoading: false, error: null, result };
};

const handlePromotionsFetchError: ActionHandler<
  QueryState<PromotionVehicleType[]>,
  { error: string }
> = (_, { payload }) => {
  const { error } = payload;

  return { isLoading: false, error, result: null };
};

// action handler map

export const PROMOTIONS_HANDLER_MAP = {
  [ActionTypes.PROMOTIONS_FETCH_SUCCESS]: handlePromotionsFetchSuccess,
  [ActionTypes.PROMOTIONS_FETCH_ERROR]: handlePromotionsFetchError,
};

// reducer

const promotions = handleActions<QueryState<PromotionVehicleType[]>, any, any>(
  PROMOTIONS_HANDLER_MAP,
  {
    isLoading: true,
    error: null,
    result: null,
  },
);

/**
 * Combined query reducers
 */

export default combineReducers({ promotions });

/**
 * Selectors
 */

export const getPromotionsQuery = (state: {
  queries: {
    promotions: QueryState<PromotionVehicleType[]>;
  };
}): QueryState<PromotionVehicleType[]> => state.queries.promotions;

export const getPromotions = (state: {
  queries: {
    promotions: QueryState<PromotionVehicleType[]>;
  };
}): PromotionVehicleType[] | null => state.queries.promotions.result;
