export interface Event<TBody> {
  promo: TBody;
}

export type RangeFilterState = {
  // Filter is set
  min: number;
  max: number;
} | null;

export interface FilterResultsBody {
  totalCount: string | undefined;
}

export interface AnalyticsFilters {
  region: string[];
  vehicleType: string[];
  modelFamily: string[];
  bodyType: string[];
  modelYear: RangeFilterState;
}

type FilterName = keyof AnalyticsFilters;

export interface RangeSliderChangeEventComponent {
  action: 'change';
  filterName: FilterName;
  prevValue: RangeFilterState;
  value: RangeFilterState;
}

// Radio filter
export interface RadioChangeEventComponent {
  action: 'change';
  filterName: FilterName;
  prevValue: string | number | null;
  value: string | number | null;
}

// Multiple select filter
export interface MultipleSelectChangeEventComponent {
  action: 'select' | 'deselect';
  filterName: FilterName;
  value: string;
}

export interface InitialStateEventBody {
  type: 'filter_initial_state';
  payload: AnalyticsFilters;
}

export interface FiltersSaveEventBody {
  type: 'filter_panel_save';
  payload: AnalyticsFilters;
  filterResults: FilterResultsBody | undefined;
}

export interface FiltersClearEventBody {
  type: 'filter_clear_all';
  payload: AnalyticsFilters;
}

export interface FilterClearEventBody {
  type: 'filter_clear_individual';
  payload: AnalyticsFilters;
  removedFilter: string;
}

export interface CurrentStateEventBody {
  type: 'filter_state';
  payload: AnalyticsFilters;
}

export interface FilterPanelChangeEventBody {
  type: 'filter_panel_change';
  payload: FilterPanelChangeEventComponent[];
}

export interface FilterPanelCancelEventBody {
  type: 'filter_panel_cancel';
  payload: AnalyticsFilters;
}

export type FilterPanelChangeEventComponent =
  | RangeSliderChangeEventComponent
  | RadioChangeEventComponent
  | MultipleSelectChangeEventComponent;

export type PromotionsDataLayerEvent =
  | Event<InitialStateEventBody>
  | Event<FiltersSaveEventBody>
  | Event<FilterPanelChangeEventBody>
  | Event<RangeSliderChangeEventComponent>
  | Event<RadioChangeEventComponent>
  | Event<MultipleSelectChangeEventComponent>
  | Event<FiltersClearEventBody>
  | Event<FilterClearEventBody>
  | Event<FilterPanelCancelEventBody>
  | Event<CurrentStateEventBody>;
