import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getConfirmedFilters } from '../../../redux/reducers';
import { FilterBox, CloseBtn, Plus } from './style/FilterBar.style';
import CloseXIconSmall from '../../../assets/icons/CloseXSmallIcon';
import { deleteVehicleType } from '../../../redux/actions';
import { INVENTORY_TYPE_FILTER_LIST } from '../../../constants/FilterList';
import { P } from '../../../styles/Global.style';
import { filterClear, filtersState } from '../../../utils/analyticsEventListeners';

const VehicleTypeFilterTag: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { vehicleTypeFilter } = useSelector(getConfirmedFilters);
  const confirmedFilters = useSelector(getConfirmedFilters);

  if (!vehicleTypeFilter.length) return null;

  const isLastTypeInList = vehicleTypeFilter.length === 1;

  const FireDeleteVehicleTypeEvent = (vehicleType: string): void => {
    const tempConfirmedFilters = {
      ...confirmedFilters,
      vehicleTypeFilter: confirmedFilters.vehicleTypeFilter.filter(
        (value) => value !== vehicleType,
      ),
    };
    filterClear(confirmedFilters, `vehicleType.${vehicleType}`);
    filtersState(tempConfirmedFilters);
  };

  const handleKeyDown = (event: React.KeyboardEvent, vehicleType: string): void => {
    if (event.key === 'Enter') {
      FireDeleteVehicleTypeEvent(vehicleType);
      dispatch(deleteVehicleType({ vehicleType }));
    }
  };

  return (
    <>
      {vehicleTypeFilter.map((vehicleType) => {
        return (
          <FilterBox key={vehicleType} data-cy={vehicleType} data-testid={vehicleType}>
            <P>
              {t(`promotions.filter.components.listOfAllFilters.${vehicleType}`)}{' '}
              <Plus>{vehicleType === INVENTORY_TYPE_FILTER_LIST.Cpo && t(`plus`)}</Plus>
            </P>

            {!isLastTypeInList && (
              <CloseBtn
                onKeyDown={(event) => handleKeyDown(event, vehicleType)}
                onClick={() => {
                  FireDeleteVehicleTypeEvent(vehicleType);
                  dispatch(deleteVehicleType({ vehicleType }));
                }}
                aria-label={`clear-${t(
                  `promotions.filter.components.listOfAllFilters.${vehicleType}`,
                )}`}
                tabIndex={0}
                data-testid={`${vehicleType}+tag`}
              >
                <CloseXIconSmall />
              </CloseBtn>
            )}
          </FilterBox>
        );
      })}
    </>
  );
};

export default VehicleTypeFilterTag;
