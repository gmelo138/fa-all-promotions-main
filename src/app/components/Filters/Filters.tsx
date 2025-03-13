import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { isEqual } from 'lodash';
import { setConfirmedFilters, setTemporaryFilters } from '../../redux/actions';
import { getConfirmedFilters, getPromotions, getTemporaryFilters } from '../../redux/reducers';
import BodyTypes from './BodyType/BodyTypes';
import ModelFamilyList from './ModelFamily/ModelFamilyList';
import RegionFilter from './Region/RegionList';
import { regionCheckBoxes } from '../../constants/RegionList';
import filterOngoinPromotions from '../../functions/filterOngoingPromotions';
import { filtersSave, filtersCancel, filtersChange } from '../../utils/analyticsEventListeners';
import { ButtonWrapper, FiltersHeader, CloseIcon, FiltersWrapper } from './Filters.style';
import { CTA_LIST } from '../../constants/CtaList';
import Button from '../CtaButtons/Button';
import YearSelector from './YearSelector/YearSelector';
import VehicleType from './VehicleType/VehicleTypeList';
import { listOfVehicleTypes } from '../../constants/InventoryTypeList';
import CloseXIconSmall from '../../assets/icons/CloseXSmallIcon';
import { H4Extended } from '../../styles/Global.style';
import { COLORS } from '../../styles/variables';
import { IS_CN_PAGE } from '../../constants/environment';

interface FiltersProps {
  onDrawerClose: () => void;
  isFiltersOpened: boolean;
}

type TemporaryFiltersRefType =
  | {
      regionFilter: string[];
      vehicleTypeFilter: string[];
      bodyTypeFilter: string[];
      modelFamilyFilter: string[];
      modelYearRange: number[];
    }
  | boolean;

const Filters: React.FC<FiltersProps> = ({ onDrawerClose, isFiltersOpened }) => {
  const dispatch = useDispatch();
  const promotions = useSelector(getPromotions);

  const temporaryFilters = useSelector(getTemporaryFilters);
  const { vehicleTypeFilter, regionFilter } = useSelector(getTemporaryFilters);
  const confirmedFilters = useSelector(getConfirmedFilters);

  const temporaryFiltersRef = useRef<TemporaryFiltersRefType>(temporaryFilters);

  useEffect(() => {
    if (
      isFiltersOpened &&
      temporaryFiltersRef.current &&
      !isEqual(temporaryFiltersRef.current, temporaryFilters)
    ) {
      if (
        // when we open drawer If the model year changes from [](null) to a non empty array but
        // the vehicle type has not been changed we shouldn't fire filter panel change event.
        // TODO Model year slector Logic should be updated
        typeof temporaryFiltersRef.current !== 'boolean' &&
        !temporaryFiltersRef.current.modelYearRange.length &&
        temporaryFilters.modelYearRange
      ) {
        temporaryFiltersRef.current = temporaryFilters;
        return;
      }
      if (typeof temporaryFiltersRef.current !== 'boolean')
        filtersChange(temporaryFiltersRef.current, temporaryFilters);
      temporaryFiltersRef.current = temporaryFilters;
    }
  }, [temporaryFilters, isFiltersOpened]);

  const { t } = useTranslation();
  const filteredOngoingPromotions = filterOngoinPromotions(promotions ?? [], temporaryFilters);
  const zeroResults = filteredOngoingPromotions.length === 0;

  const hasAnyDagSelected = regionFilter.some((singleFilter) =>
    regionCheckBoxes.includes(singleFilter),
  );
  const hasAnyVehicleTypeSelected = vehicleTypeFilter.some((singleFilter) =>
    listOfVehicleTypes.includes(singleFilter),
  );

  const isButtonDisabled = !hasAnyDagSelected || !hasAnyVehicleTypeSelected || zeroResults;

  const numberOfOngoingResults =
    filteredOngoingPromotions.length > 1 || filteredOngoingPromotions.length === 0
      ? t('promotions.cta.results', { number: filteredOngoingPromotions.length })
      : t('promotions.cta.result', { number: filteredOngoingPromotions.length });

  const applySelectedFilters = () => {
    onDrawerClose();
    dispatch(setConfirmedFilters({ filters: temporaryFilters }));
    filtersSave(temporaryFilters, { totalCount: filteredOngoingPromotions.length.toString() });
  };

  const declineSelectedFilters = () => {
    onDrawerClose();
    filtersCancel(temporaryFilters);
    temporaryFiltersRef.current = false;
    dispatch(setTemporaryFilters({ filters: confirmedFilters }));
  };

  return (
    <>
      <FiltersWrapper>
        <FiltersHeader>
          <H4Extended>{t('promotions.filter.components.listOfFilterTitles.filters')}</H4Extended>
          <CloseIcon onClick={declineSelectedFilters}>
            <CloseXIconSmall color={COLORS.white} />
          </CloseIcon>
        </FiltersHeader>
        <RegionFilter />
        {!IS_CN_PAGE && <VehicleType />}
        <YearSelector dots />
        <BodyTypes isTypeSelected={hasAnyVehicleTypeSelected} />
        <ModelFamilyList isTypeSelected={hasAnyVehicleTypeSelected} />
      </FiltersWrapper>
      <ButtonWrapper isFilterSelected={!zeroResults}>
        <Button buttonName={CTA_LIST.CANCEL_FILTERS} />
        <Button
          handleClick={applySelectedFilters}
          buttonName={CTA_LIST.APPLY_FILTERS}
          isButtonDisabled={isButtonDisabled}
          numberOfOngoingResults={numberOfOngoingResults}
        />
      </ButtonWrapper>
    </>
  );
};

export default Filters;
