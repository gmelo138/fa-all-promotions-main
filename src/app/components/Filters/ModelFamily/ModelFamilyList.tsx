import React, { useMemo, useState } from 'react';
import { TabPanel } from 'react-tabs';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Title } from '../Region/style/RegionList.style';
import {
  FilterSection,
  Header,
  ModelList,
  ModelFamilyCount,
  TabsContainer,
  TabList,
  Tab,
} from './style/ModelFamilyList.style';
import modelFilterList from '../../../constants/ModelFamilyList';
import ModelFamily from './ModelFamily';
import { getTemporaryFilters, getPromotions } from '../../../redux/reducers';
import {
  filterByRegion,
  filterByInventoryType,
  filterByBodyType,
  filterByModelYear,
} from '../../../functions/filterOngoingPromotions';

type ModelFamilyType = {
  isTypeSelected: boolean;
};

const ModelFamilyList: React.FC<ModelFamilyType> = ({ isTypeSelected }) => {
  const { t } = useTranslation();

  const { regionFilter, vehicleTypeFilter, bodyTypeFilter, modelFamilyFilter, modelYearRange } =
    useSelector(getTemporaryFilters);
  const promotions = useSelector(getPromotions);

  const [tabIndex, setTabIndex] = useState(0);

  const modelListCategories = Object.keys(modelFilterList);
  const selectedModelCategory = modelListCategories[tabIndex];

  const availableModelFamilies = useMemo(() => {
    if (!promotions) return [];
    if (!regionFilter.length) return [];

    let filteredPromotions = promotions;
    filteredPromotions = filterByRegion(filteredPromotions, regionFilter);
    filteredPromotions = filterByInventoryType(filteredPromotions, vehicleTypeFilter);
    filteredPromotions = filterByModelYear(filteredPromotions, modelYearRange);
    filteredPromotions = filterByBodyType(filteredPromotions, bodyTypeFilter);

    return [...new Set(filteredPromotions.map((offer) => offer.modelId))];
  }, [bodyTypeFilter, promotions, regionFilter, vehicleTypeFilter, modelYearRange]);

  const onSelect = (i: number) => {
    setTabIndex(i);
  };

  return (
    <FilterSection>
      <Header>
        <Title aria-label={t('promotions.filter.components.listOfFilterTitles.modelFamily')}>
          {t('promotions.filter.components.listOfFilterTitles.modelFamily')}
        </Title>
        <ModelFamilyCount>
          {modelFamilyFilter.length} {t('promotions.filter.components.selected')}
        </ModelFamilyCount>
      </Header>
      <TabsContainer
        selectedTabClassName="is-selected"
        onSelect={onSelect}
        selectedIndex={tabIndex}
        data-testid="test"
      >
        <TabList>
          {modelListCategories.map((category) => (
            <Tab tabIndex="0" key={category}>
              {category}
            </Tab>
          ))}
        </TabList>
        {modelListCategories.map((category) => (
          <TabPanel key={category} />
        ))}
      </TabsContainer>
      <ModelList>
        {modelFilterList[selectedModelCategory].map((model) => (
          <ModelFamily
            model={model}
            key={model}
            isAvailable={availableModelFamilies.includes(model) && isTypeSelected}
          />
        ))}
      </ModelList>
    </FilterSection>
  );
};

export default ModelFamilyList;
