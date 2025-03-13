import { PromotionVehicleType } from '../types/promotionsTypes';

const sortVehiclesByModelYear = (vehiclesList: PromotionVehicleType[]): PromotionVehicleType[] => {
  if (navigator.userAgent.includes('Firefox')) {
    return vehiclesList.sort((a, b) => (a.modelName === b.modelName ? a.year - b.year : 0));
  }
  return vehiclesList.sort((a, b) => (a.modelName === b.modelName ? b.year - a.year : 0));
};

export default sortVehiclesByModelYear;
