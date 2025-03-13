import { useEffect } from 'react';
import { uniqWith, isEqual } from 'lodash';
import { useDispatch } from 'react-redux';
import usePromotionsList from './usePromotionsList';
import sortVehiclesByModelName from '../functions/sortVehiclesByModelName';
import { setPromotions, setPromotionsError } from '../redux/actions';
import sortVehiclesByModelYear from '../functions/sortVehiclesByModelYear';

const usePromotionsFetcher = () => {
  const dispatch = useDispatch();

  const { promotions, error } = usePromotionsList();

  useEffect(() => {
    if (!promotions) return;
    // Get current atlantic time in yyy-mm-dd format
    const [currentDateAtlanticDate] = new Date()
      .toLocaleString('sv', { timeZone: 'America/Halifax', timeZoneName: 'short' })
      .split(' ');
    const vehiclesWithoutExpired = promotions.filter(
      (vehicle) => vehicle.expiryDate.replace(/\s/g, '') >= currentDateAtlanticDate,
    );

    // Backup solution to remove duplicates
    // const vehiclesWithoutDuplicates = uniqWith(vehiclesWithoutExpired, isEqual);

    const sortedVehiclesByModelName = sortVehiclesByModelName(vehiclesWithoutExpired);
    const sortedVehiclesByYear = sortVehiclesByModelYear(sortedVehiclesByModelName);

    dispatch(setPromotions({ result: sortedVehiclesByYear }));
  }, [promotions, dispatch]);

  useEffect(() => {
    if (!error) return;
    dispatch(setPromotionsError({ error }));
  }, [error, dispatch]);

  return undefined;
};

export default usePromotionsFetcher;
