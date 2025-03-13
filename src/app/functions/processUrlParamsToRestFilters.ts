import {
  MODEL_FAMILY_FILTER_LIST,
  BODY_TYPE_FILTER_LIST,
  INVENTORY_TYPE_FILTER_LIST,
  REGION_FILTER_LIST,
  CARLINE_FILTER_LIST,
} from '../constants/FilterList';
import { region, inventoryType, bodyType, modelFamily, carline } from './queryParamFilters';
import { carlineGroupQuery } from '../constants/ModelFamilyList';

export const transformedRegion = (): string[] => {
  return (
    region
      ?.map((value) => REGION_FILTER_LIST[value as keyof typeof REGION_FILTER_LIST])
      .filter((value) => !!value) ?? [REGION_FILTER_LIST.National]
  );
};

export const transformedInventoryType = (): string[] => {
  return (
    inventoryType
      ?.map((value) => INVENTORY_TYPE_FILTER_LIST[value as keyof typeof INVENTORY_TYPE_FILTER_LIST])
      .filter((value) => !!value) ?? [INVENTORY_TYPE_FILTER_LIST.New]
  );
};

export const transformedModelFamily = (): string[] => {
  const carlineList =
    carline
      ?.map((value) => CARLINE_FILTER_LIST[value as keyof typeof CARLINE_FILTER_LIST])
      .filter((value) => !!value) ?? [];
  const modelFamilyList =
    modelFamily
      ?.map((value) => MODEL_FAMILY_FILTER_LIST[value as keyof typeof MODEL_FAMILY_FILTER_LIST])
      .filter((value) => !!value) ?? [];
  const mappedModelFamilyList = modelFamilyList
    ?.map((el) => carlineGroupQuery[el].carlines)
    .reduce((result, currentArray) => {
      return result.concat(currentArray);
    }, []);
  const uniquemMappedModelFamilyList = [...new Set(mappedModelFamilyList)];
  return [...carlineList, ...uniquemMappedModelFamilyList];
};

export const transformedBodyType = (): string[] => {
  return (
    bodyType
      ?.map((value) => BODY_TYPE_FILTER_LIST[value as keyof typeof BODY_TYPE_FILTER_LIST])
      .filter((value) => !!value) ?? []
  );
};
