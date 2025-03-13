import { ActionMeta } from 'redux-actions';

export type ActionHandler<S, P = undefined, M = undefined> = (
  state: S,
  action: ActionMeta<P, M>,
) => S;

export type Filters = {
  regionFilter: string[];
  vehicleTypeFilter: string[];
  bodyTypeFilter: string[];
  modelFamilyFilter: string[];
  modelYearRange: number[];
};
