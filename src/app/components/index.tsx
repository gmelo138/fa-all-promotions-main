import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getFilteredPromotions, getPromotionsQuery, getConfirmedFilters } from '../redux/reducers';
import FilterIcon from '../assets/icons/FilterIcon';
import FilterBar from './Filters/FilterBar/FilterBar';
import { PromotionVehicleType } from '../types/promotionsTypes';
import VehicleList from './Vehicles/VehicleList/VehicleList';
import LoadMore from './LoadMore/LoadMore';
import NoResults from './NoResults';
import FiltersDrawer from './Filters/FiltersDrawer';
import Filters from './Filters/Filters';
import SkeletonVehicles from './Skeleton/Skeleton';
import {
  PageWrapper,
  FilterIconContainer,
  ResultsCounter,
  PageHeader,
  FilterTagsAndCount,
  Disclaimer,
  FilterPanel,
} from './Promotions.style';
import usePromotionsFetcher from '../hooks/usePromotionsFetcher';
import { filterInitialState } from '../utils/analyticsEventListeners';
import { P } from '../styles/Global.style';
import filterCounter from '../functions/filterCounter';

const Promotions: React.FC = () => {
  usePromotionsFetcher();
  const initialStateSentRef = useRef<boolean>(false);
  const filteredPromotions = useSelector(getFilteredPromotions);
  const promotionsQuery = useSelector(getPromotionsQuery);
  const confirmedFilters = useSelector(getConfirmedFilters);
  const { t } = useTranslation();
  const Skip = 10;

  const [isFiltersOpened, setIsFiltersOpened] = useState<boolean>(false);
  const [count, setPagination] = useState<number>(Skip);
  const [paginatedPromos, setPaginatedPromos] = useState<PromotionVehicleType[]>([]);

  const numberOfResults =
    filteredPromotions.length > 1 || filteredPromotions.length === 0
      ? t('promotions.cta.ongoingResults')
      : t('promotions.cta.ongoingResult');

  // TODO: fix!
  const filterCount = [
    // @ts-ignore
    ...new Set(Object.values(confirmedFilters).reduce((acc, childArr) => acc.concat(childArr), [])),
  ].length;

  // const filterCount = filterCounter(confirmedFilters);

  useEffect(() => {
    setPagination(Skip);
  }, [filteredPromotions]);

  // Fire Filter Inital State Event
  useEffect(() => {
    if (initialStateSentRef.current) return;
    initialStateSentRef.current = true;
    filterInitialState(confirmedFilters);
  }, [confirmedFilters]);

  useEffect(() => {
    setPaginatedPromos(filteredPromotions?.filter((...[, index]) => index < count) || []);
  }, [filteredPromotions, count]);

  const handleClick = useCallback(() => {
    setPagination(count + Skip);
  }, [count]);

  const onDrawerOpen = useCallback(() => {
    setIsFiltersOpened(true);
  }, []);

  const onDrawerClose = useCallback(() => {
    setIsFiltersOpened(false);
  }, []);

  const renderListOnPage = useMemo(() => {
    if (promotionsQuery.isLoading) return <SkeletonVehicles />;
    if (promotionsQuery.error || filteredPromotions.length === 0) return <NoResults />;
    return (
      <>
        <VehicleList promotions={paginatedPromos} />
        {paginatedPromos?.length !== filteredPromotions?.length && (
          <LoadMore onClick={handleClick} />
        )}
      </>
    );
  }, [promotionsQuery, filteredPromotions, paginatedPromos, handleClick]);

  return (
    <PageWrapper>
      <PageHeader>
        <FilterPanel>
          <div>
            <FilterIconContainer
              onClick={onDrawerOpen}
              aria-label="filters"
              data-component="results-toolbar-filter-toggle"
            >
              <FilterIcon />
              <p>
                {t('promotions.filter.allFilters')}
                <span> ({filterCount})</span>
              </p>
            </FilterIconContainer>
          </div>
        </FilterPanel>
        <FilterTagsAndCount>
          <FilterBar />
          <Disclaimer>{t('promotions.description')}</Disclaimer>
          <ResultsCounter>
            <P id="count-number">{filteredPromotions.length}</P>
            <P id="count-text">{numberOfResults}</P>
          </ResultsCounter>
        </FilterTagsAndCount>
      </PageHeader>
      <FiltersDrawer onClose={onDrawerClose} isFiltersOpened={isFiltersOpened}>
        <Filters onDrawerClose={onDrawerClose} isFiltersOpened={isFiltersOpened} />
      </FiltersDrawer>

      {renderListOnPage}
    </PageWrapper>
  );
};

export default Promotions;
