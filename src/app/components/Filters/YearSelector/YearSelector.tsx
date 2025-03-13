import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Slider from 'rc-slider';
import { setModelYearRange } from '../../../redux/actions';
import { filterByRegion, filterByInventoryType } from '../../../functions/filterOngoingPromotions';
import {
  getPromotions,
  getModelYearRangeConfirmedFilter,
  getTemporaryFilters,
} from '../../../redux/reducers';
import {
  Title,
  TitleWrap,
  SliderSection,
  SliderContainer,
  LabelRow,
  Label,
  SelectedYearsRange,
  SelectedYear,
  To,
} from './style/YearSelector.style';

interface YearSelectorProps {
  dots: boolean;
}

const YearSelector: React.FC<YearSelectorProps> = ({ dots }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { modelYearRange, regionFilter, vehicleTypeFilter } = useSelector(getTemporaryFilters);
  const [minValue, maxValue] = modelYearRange;
  const confirmedYearfilters = useSelector(getModelYearRangeConfirmedFilter);
  const promotions = useSelector(getPromotions);

  const [onlySingleYearAvailable, setOnlySingleYearAvailable] = useState(false);

  const handleChange = useCallback(
    (newValue: number | number[]) => {
      dispatch(setModelYearRange({ filter: newValue }));
    },
    [dispatch],
  );

  const availableYears = useMemo(() => {
    if (!promotions) return [2015, 2022];

    let filteredPromotions = promotions;
    filteredPromotions = filterByRegion(filteredPromotions, regionFilter);
    filteredPromotions = filterByInventoryType(filteredPromotions, vehicleTypeFilter);
    const sortedYearsRange = [
      ...new Set(filteredPromotions.map((offer) => offer.year).sort((a, b) => a - b)),
    ];
    if (sortedYearsRange.length === 0) {
      setOnlySingleYearAvailable(false);
      return [2015, 2022];
    }
    if (sortedYearsRange.length === 1) {
      const minYear = sortedYearsRange[0] - 1;
      const maxYear = sortedYearsRange[0] + 1;
      setOnlySingleYearAvailable(true);
      return [minYear, maxYear];
    }
    const minYear = sortedYearsRange[0];
    const maxYear = sortedYearsRange[sortedYearsRange.length - 1];
    setOnlySingleYearAvailable(false);

    return [minYear, maxYear];
  }, [promotions, vehicleTypeFilter, regionFilter]);

  const yearSliderMinRangeValue = availableYears[0];
  const yearSliderMaxRangeValue = availableYears[1];

  useEffect(() => {
    if (onlySingleYearAvailable) {
      const singleYear = availableYears[0] + 1;
      handleChange([singleYear, singleYear]);
      return;
    }
    handleChange(availableYears);
  }, [availableYears, handleChange, onlySingleYearAvailable]);

  // Effect if confirmed year filters were already selected and changed
  useEffect(() => {
    // Ignore if no years were selected and accepted previously
    if (confirmedYearfilters.length < 1) return;
    // Set selector as was previously seleted
    handleChange(confirmedYearfilters);
  }, [confirmedYearfilters, handleChange]);

  return (
    <SliderSection data-testid="year-selector">
      <TitleWrap>
        <Title>{t(`promotions.filter.components.listOfFilterTitles.modelYear`)}</Title>
      </TitleWrap>
      <SelectedYearsRange>
        <SelectedYear>{minValue}</SelectedYear>
        {!onlySingleYearAvailable && (
          <>
            <To>{t(`promotions.filter.components.listOfAllFilters.modelYearPreposition`)}</To>
            <SelectedYear>{maxValue}</SelectedYear>
          </>
        )}
      </SelectedYearsRange>
      <SliderContainer>
        <Slider
          range
          disabled={
            onlySingleYearAvailable ||
            !regionFilter.length ||
            !vehicleTypeFilter.length ||
            !promotions
          }
          min={yearSliderMinRangeValue}
          max={yearSliderMaxRangeValue}
          value={[minValue, maxValue]}
          step={1}
          allowCross={false}
          // @ts-ignore
          ariaLabelGroupForHandles={[
            `Minimum value of ${minValue}`,
            `Maximum value of ${maxValue}`,
          ]}
          onChange={handleChange}
          dots={dots}
        />
        {!onlySingleYearAvailable && (
          <LabelRow>
            <Label data-testid="year-selector-minLabel">{yearSliderMinRangeValue}</Label>
            <Label data-testid="year-selector-maxLabel">{yearSliderMaxRangeValue}</Label>
          </LabelRow>
        )}
      </SliderContainer>
    </SliderSection>
  );
};

export default YearSelector;
