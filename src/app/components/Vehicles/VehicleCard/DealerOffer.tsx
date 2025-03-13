import React from 'react';
import { useTranslation } from 'react-i18next';
import { OfferHeader, OfferText } from './style/index.style';

interface DealerOfferProps {
  dag: string;
  isCarUsed: boolean;
}

const DealerOffer: React.FC<DealerOfferProps> = ({ dag, isCarUsed }) => {
  const { t } = useTranslation();

  return (
    <OfferHeader>
      {dag !== 'NAT' && !isCarUsed && (
        <OfferText data-testid="dealer-offer">{t(`promotions.dag.${dag}`)}</OfferText>
      )}
    </OfferHeader>
  );
};

export default DealerOffer;
