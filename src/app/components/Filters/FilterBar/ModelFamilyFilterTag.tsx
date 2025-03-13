import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getConfirmedFilters } from '../../../redux/reducers';
import { FilterBox, CloseBtn } from './style/FilterBar.style';
import CloseXIconSmall from '../../../assets/icons/CloseXSmallIcon';
import { deleteModelFamily } from '../../../redux/actions';
import { P } from '../../../styles/Global.style';
import { filterClear, filtersState } from '../../../utils/analyticsEventListeners';

const ModelFamilyFilterTag: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const confirmedFilters = useSelector(getConfirmedFilters);
  const { modelFamilyFilter } = useSelector(getConfirmedFilters);

  if (!modelFamilyFilter.length) return null;

  const FireDeleteModelFamilyEvent = (modelFamily: string): void => {
    const tempConfirmedFilters = {
      ...confirmedFilters,
      modelFamilyFilter: confirmedFilters.modelFamilyFilter.filter(
        (value) => value !== modelFamily,
      ),
    };
    filterClear(confirmedFilters, `modelFamily.${modelFamily}`);
    filtersState(tempConfirmedFilters);
  };

  const handleKeyDown = (event: React.KeyboardEvent, modelFamily: string): void => {
    if (event.key === 'Enter') {
      FireDeleteModelFamilyEvent(modelFamily);
      dispatch(deleteModelFamily({ modelFamily }));
    }
  };

  return (
    <>
      {modelFamilyFilter.map((modelFamily) => {
        return (
          <FilterBox key={modelFamily} data-cy={modelFamily} data-testid={modelFamily}>
            <P>{t(`promotions.filter.components.listOfAllFilters.${modelFamily}`)}</P>
            <CloseBtn
              onKeyDown={(event) => handleKeyDown(event, modelFamily)}
              onClick={() => {
                FireDeleteModelFamilyEvent(modelFamily);
                dispatch(deleteModelFamily({ modelFamily }));
              }}
              aria-label={`clear-${t(
                `promotions.filter.components.listOfAllFilters.${modelFamily}`,
              )}`}
              tabIndex={0}
              data-testid={`${modelFamily}+tag`}
            >
              <CloseXIconSmall />
            </CloseBtn>
          </FilterBox>
        );
      })}
    </>
  );
};

export default ModelFamilyFilterTag;
