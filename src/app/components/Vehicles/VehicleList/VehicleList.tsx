import * as React from 'react';
import { Wrapper } from './VehicleList.style';
import { PromotionVehicleType } from '../../../types/promotionsTypes';
import { INVENTORY_TYPE_FILTER_LIST } from '../../../constants/FilterList';
import VehicleCardNew from '../VehicleCard/VehicleCardNew';

interface VehicleListProps {
  promotions: PromotionVehicleType[];
}

const VehicleList: React.FC<VehicleListProps> = ({ promotions }) => {
  return (
    <Wrapper>
      {promotions.map((singlePromotion, id) => {
        const uniqueKeyForNewVehicle = `${singlePromotion.trimName} + ${singlePromotion.dag} + ${singlePromotion.year} + ${singlePromotion.modelSalesCode}`;
        const uniqueKeyForCPOVehicle = `${singlePromotion.modelSalesCode} + ${singlePromotion.modelName} + ${singlePromotion.type} + ${id}`;
        return (
          <VehicleCardNew
            key={
              singlePromotion.type === INVENTORY_TYPE_FILTER_LIST.New
                ? uniqueKeyForNewVehicle
                : uniqueKeyForCPOVehicle
            }
            singlePromotion={singlePromotion}
            idForQA={`${singlePromotion.trimName} + ${id}`}
          />
        );
      })}
    </Wrapper>
  );
};

export default VehicleList;
