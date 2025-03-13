import { orderModelFilterList } from '../constants/ModelFamilyList';
import { PromotionVehicleType } from '../types/promotionsTypes';

const sortVehiclesByModelName = (vehiclesList: PromotionVehicleType[]): PromotionVehicleType[] => {
  if (navigator.userAgent.includes('Firefox')) {
    return vehiclesList.sort((a, b) => {
      return orderModelFilterList.indexOf(b.modelName) - orderModelFilterList.indexOf(a.modelName);
    });
  }
  return vehiclesList.sort((a, b) => {
    return orderModelFilterList.indexOf(a.modelName) - orderModelFilterList.indexOf(b.modelName);
  });
};

export default sortVehiclesByModelName;
