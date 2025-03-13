import { ActionMeta } from 'redux-actions';
import ActionTypes from '../actions/ActionTypes';

import {
  regionTempFilterReducer,
  inventoryTempTypeFilterReducer,
  bodyTypeTempFilterReducer,
  modelFamilyTempFilterReducer,
  modelYearRangeTempReducer,
} from './temporaryFiltersReducer';

describe('test functionality of temporary DELETE filters actions', () => {
  test('REGION_FILTER_DELETE action', () => {
    const initialState = ['NAT', 'MTL'];
    const action = {
      type: ActionTypes.REGION_FILTER_DELETE,
      payload: { region: 'NAT' },
    } as ActionMeta<
      {
        region: string;
      },
      unknown
    >;
    const expected = ['MTL'];

    const finalState = regionTempFilterReducer(initialState, action);
    expect(finalState).toStrictEqual(expected);
  });
  test('VEHICLE_TYPE_FILTER_DELETE action', () => {
    const initialState = ['USED-CAR', 'NEW-CAR'];
    const action = {
      type: ActionTypes.VEHICLE_TYPE_FILTER_DELETE,
      payload: { vehicleType: 'NEW-CAR' },
    } as ActionMeta<
      {
        vehicleType: string;
      },
      unknown
    >;
    const expected = ['USED-CAR'];

    const finalState = inventoryTempTypeFilterReducer(initialState, action);
    expect(finalState).toStrictEqual(expected);
  });
  test('BODY_TYPE_DELETE action', () => {
    const initialState = ['Sedan', 'SUV'];
    const action = {
      type: ActionTypes.BODY_TYPE_DELETE,
      payload: { bodyType: 'Sedan' },
    } as ActionMeta<
      {
        bodyType: string;
      },
      unknown
    >;
    const expected = ['SUV'];

    const finalState = bodyTypeTempFilterReducer(initialState, action);
    expect(finalState).toStrictEqual(expected);
  });
  test('MODEL_FAMILY_DELETE action', () => {
    const initialState = ['A3', 'A4', 'A5'];
    const action = {
      type: ActionTypes.MODEL_FAMILY_DELETE,
      payload: { modelFamily: 'A4' },
    } as ActionMeta<
      {
        modelFamily: string;
      },
      unknown
    >;
    const expected = ['A3', 'A5'];

    const finalState = modelFamilyTempFilterReducer(initialState, action);
    expect(finalState).toStrictEqual(expected);
  });
  test('MODEL_YEAR_RANGE_DELETE action', () => {
    const initialState = [2018, 2021] as number[];
    const action = {
      type: ActionTypes.MODEL_YEAR_RANGE_DELETE,
    } as ActionMeta<unknown, unknown>;
    const expected = [] as number[];

    const finalState = modelYearRangeTempReducer(initialState, action);
    expect(finalState).toStrictEqual(expected);
  });
});

describe('test functionality handle toggle filter', () => {
  test('Adding region filter in the list', () => {
    const initialState = ['NAT'] as string[];
    const action = {
      type: ActionTypes.REGION_FILTER_SET,
      payload: { filter: 'GTA' },
    } as ActionMeta<
      {
        filter: string;
      },
      unknown
    >;
    const expected = ['NAT', 'GTA'];
    const finalState = regionTempFilterReducer(initialState, action);
    expect(finalState).toStrictEqual(expected);
  });
  test('Delete region filter in the list', () => {
    const initialState = ['NAT', 'GTA'] as string[];
    const action = {
      type: ActionTypes.REGION_FILTER_SET,
      payload: { filter: 'GTA' },
    } as ActionMeta<
      {
        filter: string;
      },
      unknown
    >;
    const expected = ['NAT'];
    const finalState = regionTempFilterReducer(initialState, action);
    expect(finalState).toStrictEqual(expected);
  });
  test('Adding region range filter in the list', () => {
    const initialState = [] as number[];
    const action = {
      type: ActionTypes.MODEL_YEAR_RANGE_SET,
      payload: { filter: [2018, 2021] },
    } as ActionMeta<
      {
        filter: number[];
      },
      unknown
    >;
    const expected = [2018, 2021];
    const finalState = modelYearRangeTempReducer(initialState, action);
    expect(finalState).toStrictEqual(expected);
  });
});

describe('test TEMPORARY_FILTERS_SET functions', () => {
  test('region TEMPORARY_FILTERS_SET', () => {
    const initialState = [] as string[];
    const action = {
      type: ActionTypes.TEMPORARY_FILTERS_SET,
      payload: { filters: { regionFilter: ['NAT', 'VAN'] } },
    } as ActionMeta<
      {
        filters: { regionFilter: string[] };
      },
      unknown
    >;
    const expected = ['NAT', 'VAN'] as string[];

    const finalState = regionTempFilterReducer(initialState, action);
    expect(finalState).toStrictEqual(expected);
  });
  test('region TEMPORARY_FILTERS_SET', () => {
    const initialState = [] as string[];
    const action = {
      type: ActionTypes.TEMPORARY_FILTERS_SET,
      payload: { filters: { vehicleTypeFilter: ['NEW-CAR'] } },
    } as ActionMeta<
      {
        filters: { vehicleTypeFilter: string[] };
      },
      unknown
    >;
    const expected = ['NEW-CAR'] as string[];

    const finalState = inventoryTempTypeFilterReducer(initialState, action);
    expect(finalState).toStrictEqual(expected);
  });
  test('body type TEMPORARY_FILTERS_SET', () => {
    const initialState = [] as string[];
    const action = {
      type: ActionTypes.TEMPORARY_FILTERS_SET,
      payload: { filters: { bodyTypeFilter: ['Sedan', 'SUV'] } },
    } as ActionMeta<
      {
        filters: { bodyTypeFilter: string[] };
      },
      unknown
    >;
    const expected = ['Sedan', 'SUV'] as string[];

    const finalState = bodyTypeTempFilterReducer(initialState, action);
    expect(finalState).toStrictEqual(expected);
  });
  test('model family TEMPORARY_FILTERS_SET', () => {
    const initialState = [] as string[];
    const action = {
      type: ActionTypes.TEMPORARY_FILTERS_SET,
      payload: { filters: { modelFamilyFilter: ['A3', 'A8', 'R8'] } },
    } as ActionMeta<
      {
        filters: { modelFamilyFilter: string[] };
      },
      unknown
    >;
    const expected = ['A3', 'A8', 'R8'] as string[];

    const finalState = modelFamilyTempFilterReducer(initialState, action);
    expect(finalState).toStrictEqual(expected);
  });
  test('year range TEMPORARY_FILTERS_SET', () => {
    const initialState = [] as number[];
    const action = {
      type: ActionTypes.TEMPORARY_FILTERS_SET,
      payload: { filters: { modelYearRange: [2018, 2021] } },
    } as ActionMeta<
      {
        filters: { modelYearRange: number[] };
      },
      unknown
    >;
    const expected = [2018, 2021] as number[];

    const finalState = modelYearRangeTempReducer(initialState, action);
    expect(finalState).toStrictEqual(expected);
  });
});
