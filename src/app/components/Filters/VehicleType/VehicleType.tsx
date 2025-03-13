import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setVehicleType } from '../../../redux/actions';
import { getTemporaryFilters } from '../../../redux/reducers';
import {
  Plus,
  VehicleTypeWrapper,
  CertifiedDisclaimer,
  CPOError,
} from './style/VehicleTypeList.style';
import { CheckboxButton, Checkbox } from '../Region/style/RegionList.style';
import { INVENTORY_TYPE_FILTER_LIST, REGION_FILTER_LIST } from '../../../constants/FilterList';
import CheckMarkIcon from '../../../assets/icons/CheckMarkIcon';
import { Grey10Text } from '../../../styles/Global.style';
import CautionIcon from '../../../assets/icons/CautionIcon';
import { COLORS } from '../../../styles/variables';

interface VehicleTypeCheckboxTypes {
  vehicleType: string;
}
const VehicleType: React.FC<VehicleTypeCheckboxTypes> = ({ vehicleType }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { vehicleTypeFilter, regionFilter } = useSelector(getTemporaryFilters);

  const isRegionEmptyOrOnlyNational =
    regionFilter.includes(REGION_FILTER_LIST.National) || regionFilter.length === 0;

  const isCheckboxChecked = vehicleTypeFilter.includes(vehicleType);
  const isTypeCpo = vehicleType === INVENTORY_TYPE_FILTER_LIST.Cpo;
  const showCPOError = !isRegionEmptyOrOnlyNational && isTypeCpo && isCheckboxChecked;

  const handleChange = useCallback(() => {
    dispatch(setVehicleType({ filter: vehicleType }));
  }, [dispatch, vehicleType]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== ' ') return;
      e.preventDefault();
      handleChange();
    },
    [handleChange],
  );

  return (
    <>
      <VehicleTypeWrapper>
        <CheckboxButton
          aria-checked={isCheckboxChecked}
          role="checkbox"
          onClick={handleChange}
          onKeyDown={handleKeyPress}
          data-testid={vehicleType}
          showCPOError={showCPOError}
        >
          <Checkbox showCPOError={showCPOError} checked={isCheckboxChecked}>
            {isCheckboxChecked && (
              <CheckMarkIcon color={!showCPOError ? COLORS.grey10 : COLORS.red} />
            )}
          </Checkbox>
          <Grey10Text>
            {t(`promotions.filter.components.listOfAllFilters.${vehicleType}`)}
            {isTypeCpo && (
              <>
                <Plus>{t(`promotions.plus`)}</Plus>
                {t(` (Pre-owned)`)}
              </>
            )}
          </Grey10Text>
        </CheckboxButton>
      </VehicleTypeWrapper>
      {showCPOError && (
        <CPOError>
          <CautionIcon />
          <CertifiedDisclaimer>
            {/* TODO: Add Translations */}
            No promotions are available within this region for Certified :plus
          </CertifiedDisclaimer>
        </CPOError>
      )}
      {isTypeCpo && (
        <>
          <CertifiedDisclaimer>{t(`promotions.certifiedDisclaimer`)}</CertifiedDisclaimer>
        </>
      )}
    </>
  );
};

export default VehicleType;
