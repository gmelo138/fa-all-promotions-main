import React from 'react';
import { useTranslation } from 'react-i18next';
import { Title, VehicleTypesWrapper, VehicleTypesSection } from './style/VehicleTypeList.style';
import VehicleType from './VehicleType';
import { listOfVehicleTypes } from '../../../constants/InventoryTypeList';

const VehicleTypeList: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <VehicleTypesWrapper>
        <Title>{t(`promotions.filter.components.listOfFilterTitles.inventoryType`)}</Title>
        <VehicleTypesSection>
          {listOfVehicleTypes.map((vehicleType) => {
            return <VehicleType vehicleType={vehicleType} key={vehicleType} />;
          })}
        </VehicleTypesSection>
      </VehicleTypesWrapper>
    </>
  );
};

export default VehicleTypeList;
