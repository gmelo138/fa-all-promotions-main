import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getConfirmedFilters } from '../../../redux/reducers';
import { FilterBox, CloseBtn } from './style/FilterBar.style';
import CloseXIconSmall from '../../../assets/icons/CloseXSmallIcon';
import { deleteRegionFilter } from '../../../redux/actions';
import { P } from '../../../styles/Global.style';
import { filterClear, filtersState } from '../../../utils/analyticsEventListeners';

const RegionFilterTag: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const confirmedFilters = useSelector(getConfirmedFilters);
  const { regionFilter } = useSelector(getConfirmedFilters);

  if (!regionFilter.length) return null;

  const isLastDagInList = regionFilter.length === 1;

  const FireDeleteRegionEvent = (region: string): void => {
    const tempConfirmedFilters = {
      ...confirmedFilters,
      regionFilter: confirmedFilters.regionFilter.filter((value) => value !== region),
    };
    filterClear(confirmedFilters, `region.${region}`);
    filtersState(tempConfirmedFilters);
  };

  const handleKeyDown = (event: React.KeyboardEvent, region: string): void => {
    if (event.key === 'Enter') {
      FireDeleteRegionEvent(region);
      dispatch(deleteRegionFilter({ region }));
    }
  };

  return (
    <>
      {regionFilter.map((region) => {
        return (
          <FilterBox key={region} data-cy={region} data-testid={region}>
            <P>{t(`promotions.filter.components.listOfAllFilters.${region}`)}</P>
            {!isLastDagInList && (
              <CloseBtn
                onKeyDown={(event) => handleKeyDown(event, region)}
                onClick={() => {
                  FireDeleteRegionEvent(region);
                  dispatch(deleteRegionFilter({ region }));
                }}
                aria-label={`clear-${t(`promotions.filter.components.listOfAllFilters.${region}`)}`}
                tabIndex={0}
                data-testid={`${region}+tag`}
              >
                <CloseXIconSmall />
              </CloseBtn>
            )}
          </FilterBox>
        );
      })}
    </>
  );
};

export default RegionFilterTag;
