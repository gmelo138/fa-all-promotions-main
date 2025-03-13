import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { isEqual } from 'lodash';
import { FILTER_INITIAL_STATES } from '../../../constants/InitialStates';
import { getConfirmedFilters } from '../../../redux/reducers';
import ModelYearRangeFilterTag from './ModelYearRangeFilterTag';
import {
  FilterBarWrapper,
  ListOfFilters,
  ClearFilters,
  Filters,
  ClearFiltersButton,
  ClearFiltersText,
} from './style/FilterBar.style';
import RegionFilterTag from './RegionFilterTag';
import VehicleTypeFilterTag from './VehicleTypeFilterTag';
import BodyTypeFilterTag from './BodyTypeFilterTag';
import ModelFamilyFilterTag from './ModelFamilyFilterTag';
import { deleteAllFilters } from '../../../redux/actions';
import { filtersClear, filtersState } from '../../../utils/analyticsEventListeners';

const FilterBar: React.FC = () => {
  const dispatch = useDispatch();
  const confirmedFilters = useSelector(getConfirmedFilters);
  const { t, i18n } = useTranslation();

  const handleKeyDownClearAllFilters = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') {
      filtersClear(confirmedFilters);
      filtersState(FILTER_INITIAL_STATES);
      dispatch(deleteAllFilters());
    }
  };

  const isFiltersDefault = isEqual(FILTER_INITIAL_STATES, confirmedFilters);

  return (
    <FilterBarWrapper data-testid="filter-bar">
      <Filters>
        <ListOfFilters>
          <RegionFilterTag />
          <VehicleTypeFilterTag />
          <BodyTypeFilterTag />
          <ModelFamilyFilterTag />
          <ModelYearRangeFilterTag />
          {!isFiltersDefault && (
            <ClearFilters>
              <ClearFiltersButton
                onKeyDown={handleKeyDownClearAllFilters}
                onClick={() => {
                  filtersClear(confirmedFilters);
                  filtersState(FILTER_INITIAL_STATES);
                  dispatch(deleteAllFilters());
                }}
                tabIndex={0}
                language={i18n.language}
                data-cy="clear-filters-btn"
                data-testid="clear-filters-btn"
              >
                <ClearFiltersText>{t(`promotions.clearFilters`)}</ClearFiltersText>
              </ClearFiltersButton>
            </ClearFilters>
          )}
        </ListOfFilters>
      </Filters>
    </FilterBarWrapper>
  );
};

export default FilterBar;
