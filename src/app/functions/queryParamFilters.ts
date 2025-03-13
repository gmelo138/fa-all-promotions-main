import {
  MODEL_YEAR_RANGE_SLIDER_MAX_VALUE,
  MODEL_YEAR_RANGE_SLIDER_MIN_VALUE,
} from '../constants/InitialStates';

const urlParams = new URLSearchParams(window.location.search);

const urlParamGetter = (type: string) =>
  urlParams
    .get(type)
    ?.split(',')
    .map((word) => word.charAt(0).toUpperCase() + word.toLowerCase().slice(1));

export const region = urlParamGetter('region');
export const inventoryType = urlParamGetter('type');
export const modelFamily = urlParamGetter('carline-group');
export const carline = urlParamGetter('carline');
export const bodyType = urlParamGetter('body-style');
export const modelYear = (() => {
  const [min, max] =
    urlParams
      .get('year')
      ?.split(':')
      .map((value) => parseInt(value, 10)) ?? [];

  if (!min || min < MODEL_YEAR_RANGE_SLIDER_MIN_VALUE || min > MODEL_YEAR_RANGE_SLIDER_MAX_VALUE)
    return undefined;
  if (!max || max < MODEL_YEAR_RANGE_SLIDER_MIN_VALUE || max > MODEL_YEAR_RANGE_SLIDER_MAX_VALUE)
    return undefined;
  if (min > max) return undefined;

  return [min, max];
})();
