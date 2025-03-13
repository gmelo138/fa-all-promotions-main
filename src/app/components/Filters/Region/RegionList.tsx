import React from 'react';
import { useTranslation } from 'react-i18next';
import Region from './Region';
import {
  RegionFilterSection,
  RegionFilterWrapper,
  Title,
  RegionDisclaimer,
} from './style/RegionList.style';
import { regionCheckBoxes } from '../../../constants/RegionList';

const RegionList: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <RegionFilterWrapper>
        <Title aria-label={t('promotions.filter.components.listOfFilterTitles.region')}>
          {t('promotions.filter.components.listOfFilterTitles.region')}
        </Title>
        <RegionDisclaimer>{t(`promotions.regionDisclaimer`)}</RegionDisclaimer>
        <RegionFilterSection>
          {regionCheckBoxes.map((region) => (
            <Region data-testid={region} key={region} region={region} />
          ))}
        </RegionFilterSection>
      </RegionFilterWrapper>
    </>
  );
};

export default RegionList;
