import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CloseXIconSmall from '../../../assets/icons/CloseXSmallIcon';
import { deleteModelYearRange } from '../../../redux/actions';
import { getConfirmedFilters } from '../../../redux/reducers';
import { FilterBox, CloseBtn } from './style/FilterBar.style';
import { P } from '../../../styles/Global.style';
import { filterClear, filtersState } from '../../../utils/analyticsEventListeners';

const ModelYearRangeFilterTag: React.FC = () => {
  const dispatch = useDispatch();
  const { modelYearRange } = useSelector(getConfirmedFilters);
  const confirmedFilters = useSelector(getConfirmedFilters);
  const { t } = useTranslation();

  if (!modelYearRange.length) return null;

  const isSingleYearSelected = [...new Set(modelYearRange)].length === 1;

  const FireDeleteModelYearEvent = (modelYearRangeFilter: number[]): void => {
    const tempConfirmedFilters = { ...confirmedFilters, modelYearRange: [] };
    filterClear(
      confirmedFilters,
      `modelYear.{min:${modelYearRangeFilter[0]},max:${modelYearRange[1]}}`,
    );
    filtersState(tempConfirmedFilters);
  };

  const handleKeyDown = (event: React.KeyboardEvent, filter: number[]): void => {
    if (event.key === 'Enter') {
      FireDeleteModelYearEvent(modelYearRange);
      dispatch(deleteModelYearRange({ filter }));
    }
  };

  return (
    <FilterBox data-cy={modelYearRange} data-testid={modelYearRange}>
      <P>
        {isSingleYearSelected
          ? t(`promotions.filter.components.listOfAllFilters.singleModelYear`, {
              year: modelYearRange[0],
            })
          : t(`promotions.filter.components.listOfAllFilters.modelYearRange`, {
              min: modelYearRange[0],
              max: modelYearRange[1],
            })}
      </P>
      <CloseBtn
        onKeyDown={(event) => handleKeyDown(event, modelYearRange)}
        onClick={() => {
          FireDeleteModelYearEvent(modelYearRange);
          dispatch(deleteModelYearRange({ filter: modelYearRange }));
        }}
        aria-label={`clear-${t(`promotions.filter.components.listOfAllFilters.modelYearRange`, {
          min: modelYearRange[0],
          max: modelYearRange[1],
        })}`}
        tabIndex={0}
        data-testid={modelYearRange[0]}
      >
        <CloseXIconSmall />
      </CloseBtn>
    </FilterBox>
  );
};

export default ModelYearRangeFilterTag;
