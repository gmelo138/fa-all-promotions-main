type FilterCounterType = {
  modelYearRange: number[];
  regionFilter: string[];
  vehicleTypeFilter: string[];
  bodyTypeFilter: string[];
  modelFamilyFilter: string[];
};

const filterCounter = (confirmedFilters: FilterCounterType) => {
  const yearCount = confirmedFilters.modelYearRange ? 1 : 0;
  const listOfFilters = Object.keys(confirmedFilters).filter(
    (toCheck) => toCheck !== 'modelYearRange',
  );
  const restOfFiltersCount = (
    listOfFilters.reduce((acc, item) => {
      const filterArray = confirmedFilters[item as keyof FilterCounterType];
      return (acc as unknown[]).concat(filterArray);
    }, [] as unknown[]) as number[] | string[]
  ).length;

  return restOfFiltersCount + yearCount;
};

export default filterCounter;
