import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getConfirmedFilters } from '../../../redux/reducers';
import { FilterBox, CloseBtn } from './style/FilterBar.style';
import CloseXIconSmall from '../../../assets/icons/CloseXSmallIcon';
import { deleteBodyType } from '../../../redux/actions';
import { P } from '../../../styles/Global.style';
import { filterClear, filtersState } from '../../../utils/analyticsEventListeners';

const BodyTypeFilterTag: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const confirmedFilters = useSelector(getConfirmedFilters);
  const { bodyTypeFilter } = useSelector(getConfirmedFilters);

  if (!bodyTypeFilter.length) return null;

  const FireDeleteBodyTypeEvent = (bodyType: string): void => {
    const tempConfirmedFilters = {
      ...confirmedFilters,
      bodyTypeFilter: confirmedFilters.bodyTypeFilter.filter((value) => value !== bodyType),
    };
    filterClear(confirmedFilters, `bodyType.${bodyType}`);
    filtersState(tempConfirmedFilters);
  };

  const handleKeyDown = (event: React.KeyboardEvent, bodyType: string): void => {
    if (event.key === 'Enter') {
      FireDeleteBodyTypeEvent(bodyType);
      dispatch(deleteBodyType({ bodyType }));
    }
  };

  return (
    <>
      {bodyTypeFilter.map((bodyType) => {
        return (
          <FilterBox key={bodyType} data-cy={bodyType} data-testid={bodyType}>
            <P>{t(`promotions.filter.components.listOfAllFilters.${bodyType}`)}</P>
            <CloseBtn
              onKeyDown={(event) => handleKeyDown(event, bodyType)}
              onClick={() => {
                FireDeleteBodyTypeEvent(bodyType);
                dispatch(deleteBodyType({ bodyType }));
              }}
              aria-label={`clear-${t(`promotions.filter.components.listOfAllFilters.${bodyType}`)}`}
              tabIndex={0}
              data-testid={`${bodyType}+tag`}
            >
              <CloseXIconSmall />
            </CloseBtn>
          </FilterBox>
        );
      })}
    </>
  );
};

export default BodyTypeFilterTag;
