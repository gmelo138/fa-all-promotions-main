import React from 'react';
import { useTranslation } from 'react-i18next';
import { CashNumber, CashOffer, CashText, OfferRates } from '../VehicleCard/style/indexNew.style';
import SuperScript from '../../SuperScript';
import { UpdatedOffers } from '../../../types/promotionsTypes';
import numberFormatter from '../../../functions/numberFormatter';
import { LEGAL_LIST } from '../../../constants/CtaList';
import { IS_CN_PAGE } from '../../../constants/environment';

interface CashTypes {
  legals: {
    en: string | null;
    fr: string | null;
    cn: string | null;
  };
  offers: UpdatedOffers;
  idForQA: string;
}

const Cash: React.FC<CashTypes> = ({ legals, offers, idForQA }) => {
  const { t, i18n } = useTranslation();
  const cashOffer = offers.Cash.Offer;
  return (
    <OfferRates cashOffer>
      <CashOffer>
        <CashText data-cy={`${idForQA} + cash-offer-title`}>
          {t('promotions.offers.cashOffer')}
        </CashText>
        <CashNumber>
          {numberFormatter(cashOffer.cashOffer, i18n.language)}
          {IS_CN_PAGE && <CashText>{t('promotions.offers.cashOfferPt2')}</CashText>}
          <SuperScript
            scriptNumber={5}
            legals={legals}
            idForQA={idForQA}
            legalType={LEGAL_LIST.CASH}
          />
        </CashNumber>
      </CashOffer>
    </OfferRates>
  );
};

export default Cash;
