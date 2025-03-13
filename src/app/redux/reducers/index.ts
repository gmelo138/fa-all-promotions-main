import { combineReducers } from 'redux';
import confirmedFiltersReducer from './confirmedFiltersReducer';
import temporaryFiltersReducer from './temporaryFiltersReducer';
import queriesReducer from './queriesReducer';

export * from './confirmedFiltersReducer';
export * from './temporaryFiltersReducer';
export * from './queriesReducer';
export * from './compositeSelectors';

export default combineReducers({
  temporaryFilters: temporaryFiltersReducer,
  confirmedFilters: confirmedFiltersReducer,
  queries: queriesReducer,
});
