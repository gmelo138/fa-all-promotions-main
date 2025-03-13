import { ApolloError, useQuery } from '@apollo/client';
import { GET_SEARCH_RESULTS } from '../schemas/GetSearchResults';
import { PromotionVehicleType } from '../types/promotionsTypes';

interface QueryResults {
  getPromotionOfferByMultiParams: PromotionVehicleType[];
  loading: boolean;
  error: ApolloError | undefined;
}

type UsePromotionsProps = {
  promotions: PromotionVehicleType[] | undefined;
  loading: boolean;
  error: ApolloError | undefined;
};

const usePromotionsList = (): UsePromotionsProps => {
  const { data, loading, error } = useQuery<QueryResults>(GET_SEARCH_RESULTS, {
    errorPolicy: 'all',
    variables: {
      year: '',
      type: '',
    },
  });
  const promotions = data?.getPromotionOfferByMultiParams;
  return { promotions, loading, error };
};

export default usePromotionsList;
