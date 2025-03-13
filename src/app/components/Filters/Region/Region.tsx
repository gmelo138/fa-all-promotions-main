import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setRegionFilter } from '../../../redux/actions';
import Tooltip from '../../Tooltips/Tooltip';
import { getTemporaryFilters } from '../../../redux/reducers';
import { CheckboxWrapper, CheckboxButton, Checkbox } from './style/RegionList.style';
import { Grey10Text } from '../../../styles/Global.style';
import { REGION_FILTER_LIST } from '../../../constants/FilterList';
import CheckMarkIcon from '../../../assets/icons/CheckMarkIcon';
import { IS_CN_PAGE } from '../../../constants/environment';

interface RegionCheckboxProps {
  region: string;
}
const Region: React.FC<RegionCheckboxProps> = ({ region }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { regionFilter } = useSelector(getTemporaryFilters);
  const isCheckboxChecked = regionFilter.includes(region);

  const handleChange = useCallback(() => {
    dispatch(setRegionFilter({ filter: region }));
  }, [dispatch, region]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== ' ') return;
      e.preventDefault();
      handleChange();
    },
    [handleChange],
  );

  const regionsTooltipHidden = [REGION_FILTER_LIST.National];

  return (
    <>
      {region === REGION_FILTER_LIST.Montreal && IS_CN_PAGE ? null : (
        <CheckboxWrapper isLabelBig={false}>
          <CheckboxButton
            aria-checked={isCheckboxChecked}
            role="checkbox"
            onClick={handleChange}
            onKeyDown={handleKeyPress}
            data-testid={region}
            tabIndex={-1}
          >
            <Checkbox checked={isCheckboxChecked}>
              {isCheckboxChecked && <CheckMarkIcon />}
            </Checkbox>
            <Grey10Text>{t(`promotions.filter.components.listOfAllFilters.${region}`)}</Grey10Text>
          </CheckboxButton>

          {!regionsTooltipHidden.includes(region) && (
            <Tooltip checkbox={region} tooltipType="dag" isOffScreen={false} />
          )}
        </CheckboxWrapper>
      )}
    </>
  );
};

export default Region;
