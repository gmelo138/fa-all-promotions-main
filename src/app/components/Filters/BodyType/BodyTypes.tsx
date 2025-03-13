import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  filterByRegion,
  filterByInventoryType,
  filterByModelYear,
} from '../../../functions/filterOngoingPromotions';
import { getTemporaryFilters, getPromotions } from '../../../redux/reducers';
import { FilterSection, Models, Title } from './style/BodyTypes.style';
import { bodyTypes, bodyTypeDataById } from '../../../constants/BodyTypeList';
import Body from './Body';

interface BodyTypeInterface {
  isTypeSelected: boolean;
}

const BodyTypes: React.FC<BodyTypeInterface> = ({ isTypeSelected }) => {
  const { t } = useTranslation();
  const promotions = useSelector(getPromotions);

  const { regionFilter, vehicleTypeFilter, modelYearRange } = useSelector(getTemporaryFilters);

  const availableBodyTypes = useMemo(() => {
    if (!promotions) return [];
    if (!regionFilter.length) return [];

    let filteredPromotions = promotions;
    filteredPromotions = filterByRegion(filteredPromotions, regionFilter);
    filteredPromotions = filterByInventoryType(filteredPromotions, vehicleTypeFilter);
    filteredPromotions = filterByModelYear(filteredPromotions, modelYearRange);

    return [...new Set(filteredPromotions.map((offer) => offer.bodyStyleEn))];
  }, [vehicleTypeFilter, regionFilter, promotions, modelYearRange]);

  return (
    <FilterSection>
      <Title aria-label={t('promotions.filter.components.listOfFilterTitles.bodyType')}>
        {t('promotions.filter.components.listOfFilterTitles.bodyType')}
      </Title>
      <Models data-cy="filter-bodyType">
        {bodyTypes.map((body) => (
          <Body
            body={body}
            key={body}
            data-testid={body}
            isAvailable={availableBodyTypes.includes(body) && isTypeSelected}
            defaultImage={bodyTypeDataById[body].url.static}
            selectedImage={bodyTypeDataById[body].url.selected}
          />
        ))}
      </Models>
    </FilterSection>
  );
};

export default BodyTypes;
