import { difference } from 'lodash';
import {
  AnalyticsFilters,
  PromotionsDataLayerEvent,
  Event,
  InitialStateEventBody,
  FilterResultsBody,
  FiltersClearEventBody,
  FilterClearEventBody,
  FilterPanelCancelEventBody,
  FiltersSaveEventBody,
  FilterPanelChangeEventBody,
  RangeFilterState,
  RangeSliderChangeEventComponent,
  MultipleSelectChangeEventComponent,
  FilterPanelChangeEventComponent,
  CurrentStateEventBody,
} from '../types/analytics';
import { Filters } from '../types/index';

type FiltersChangeSender = (prevState: Filters, nextState: Filters) => void;
type FiltersSnapshotSender = (filters: Filters, filterResults?: FilterResultsBody) => void;
type FilterClearSender = (prevState: Filters, removedFilter: string) => void;

const convertFilterKey = (key: keyof Filters): keyof AnalyticsFilters => {
  const conversionMap: Record<keyof Filters, keyof AnalyticsFilters> = {
    regionFilter: 'region',
    vehicleTypeFilter: 'vehicleType',
    modelFamilyFilter: 'modelFamily',
    bodyTypeFilter: 'bodyType',
    modelYearRange: 'modelYear',
  };

  return conversionMap[key];
};

// extend window interface so we can add a global
declare global {
  interface Window {
    ixisDataLayer: PromotionsDataLayerEvent[];
  }
}
window.ixisDataLayer = window.ixisDataLayer || [];

const clone = (obj: any): any => JSON.parse(JSON.stringify(obj));

const convertToRangeFilterState = ([min, max]: unknown[]): RangeFilterState =>
  typeof min === 'number' && typeof max === 'number' ? { min, max } : null;

const convertToAnalyticsTypes = (filters: Filters) => {
  const converted = {
    region: filters.regionFilter,
    vehicleType: filters.vehicleTypeFilter,
    modelFamily: filters.modelFamilyFilter,
    bodyType: filters.bodyTypeFilter,
    modelYear: filters.modelYearRange.length
      ? { min: filters.modelYearRange[0], max: filters.modelYearRange[1] }
      : null,
  };
  return converted;
};

export const filterInitialState: FiltersSnapshotSender = (filters) => {
  const event: Event<InitialStateEventBody> = {
    promo: {
      type: 'filter_initial_state',
      payload: convertToAnalyticsTypes(filters),
    },
  };

  window.ixisDataLayer.push(clone(event));
};

export const filtersSave: FiltersSnapshotSender = (filters, filterResults) => {
  const event: Event<FiltersSaveEventBody> = {
    promo: {
      type: 'filter_panel_save',
      payload: convertToAnalyticsTypes(filters),
      filterResults,
    },
  };

  window.ixisDataLayer.push(clone(event));
};

export const filtersClear: FiltersSnapshotSender = (prevState) => {
  const event: Event<FiltersClearEventBody> = {
    promo: {
      type: 'filter_clear_all',
      payload: convertToAnalyticsTypes(prevState),
    },
  };

  window.ixisDataLayer.push(clone(event));
};

export const filterClear: FilterClearSender = (prevState, removedFilter) => {
  const event: Event<FilterClearEventBody> = {
    promo: {
      type: 'filter_clear_individual',
      payload: convertToAnalyticsTypes(prevState),
      removedFilter,
    },
  };
  window.ixisDataLayer.push(clone(event));
};

export const filtersState: FiltersSnapshotSender = (filters) => {
  const event: Event<CurrentStateEventBody> = {
    promo: {
      type: 'filter_state',
      payload: convertToAnalyticsTypes(filters),
    },
  };

  window.ixisDataLayer.push(clone(event));
};

export const filtersCancel: FiltersSnapshotSender = (filters) => {
  const event: Event<FilterPanelCancelEventBody> = {
    promo: {
      type: 'filter_panel_cancel',
      payload: convertToAnalyticsTypes(filters),
    },
  };

  window.ixisDataLayer.push(clone(event));
};

export const filtersChange: FiltersChangeSender = (prevState, nextState) => {
  const changedKeys: Array<keyof Filters> = (Object.keys(prevState) as Array<keyof Filters>).filter(
    // Since we are never mutating arrays and objects,
    // a shallow compare will show if the filter has changed
    (key) => prevState[key] !== nextState[key],
  );

  const events: FilterPanelChangeEventComponent[] = [];
  changedKeys.forEach((key) => {
    // When user select a filter
    const added = difference<string | number>(
      nextState[key] as string[] | number[],
      prevState[key] as string[] | number[],
    );
    // When user deselect a filter
    const removed = difference<string | number>(
      prevState[key] as string[] | number[],
      nextState[key] as string[] | number[],
    );

    // when we open drawer If the model year changes from [](null) to a non empty array but
    // the vehicle type has not been changed we shouldn't fire filter panel change event.
    // TODO Model year slector Logic should be updated
    if (
      key === 'modelYearRange' &&
      !prevState.modelYearRange.length &&
      nextState.modelYearRange.length
    ) {
      return;
    }

    type NumericKey = Extract<Filters, number[]>;
    const isNumeric = (filterKey: keyof Filters): filterKey is NumericKey =>
      typeof [...added, ...removed][0] === 'number';

    if (isNumeric(key)) {
      // change of range slider(like Model Year Range)

      const prevValue = convertToRangeFilterState(prevState[key]);

      const nextValue = convertToRangeFilterState(nextState[key]);

      const eventComponent: RangeSliderChangeEventComponent = {
        action: 'change',
        filterName: key,
        prevValue,
        value: nextValue,
      };

      events.push(eventComponent);
      return;
    }

    // change of a multiple-select filter
    added.forEach((element) => {
      if (typeof element === 'string') {
        const eventComponent: MultipleSelectChangeEventComponent = {
          action: 'select',
          filterName: convertFilterKey(key),
          value: element,
        };

        events.push(eventComponent);
      }
    });

    removed.forEach((element) => {
      if (typeof element === 'string') {
        const eventComponent: MultipleSelectChangeEventComponent = {
          action: 'deselect',
          filterName: convertFilterKey(key),
          value: element,
        };
        events.push(eventComponent);
      }
    });
  });

  const event: Event<FilterPanelChangeEventBody> = {
    promo: {
      type: 'filter_panel_change',
      payload: events,
    },
  };

  window.ixisDataLayer.push(clone(event));
};
