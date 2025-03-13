import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import numberFormatter from '../../../functions/numberFormatter';
import rateTransform from '../../../functions/rateTransform';
import SuperScript from '../../SuperScript';
import {
  OfferRates,
  APR,
  OfferTitle,
  Percentage,
  AdditionalText,
  BoldText,
  RateReduction,
  Payments,
  CashPayments,
} from '../VehicleCard/style/indexNew.style';
import { UpdatedOffers } from '../../../types/promotionsTypes';
import { LEGAL_LIST } from '../../../constants/CtaList';

interface LeaseAndFinanceTypes {
  selectedTab: string;
  offers: UpdatedOffers;
  idForQA: string;
  expiryDate: string;
  legals: {
    en: string | null;
    fr: string | null;
    cn: string | null;
  };
}

const LeaseAndFinance: React.FC<LeaseAndFinanceTypes> = ({
  offers,
  selectedTab,
  idForQA,
  legals,
  expiryDate,
}) => {
  const { t, i18n } = useTranslation();
  const minimumPayments = offers[selectedTab].MinimumPayment;
  const percentage = offers[selectedTab].Percentage;
  const rateReduction = offers[selectedTab].RateReduction;
  const cash = offers[selectedTab].Cash;

  const paymentFrequency = useMemo(() => {
    if (minimumPayments?.PaymentFrequency === 'MONTHLY')
      return t('promotions.offers.monthlyPayment');
    if (minimumPayments?.PaymentFrequency === 'BI-WEEKLY')
      return t('promotions.offers.biWeeklyPayment');
    return t('promotions.offers.weeklyPayment');
  }, [minimumPayments?.PaymentFrequency, t]);
  return (
    <OfferRates data-cy={`${idForQA} + offer-rates`}>
      <APR data-cy={`${idForQA} + apr`}>
        <OfferTitle data-cy={`${idForQA} + apr-title`}>{t('promotions.offers.apr')}</OfferTitle>
        <Percentage isBigSize data-cy={`${idForQA} + apr-percentage`}>
          {rateTransform(percentage.Rate, i18n.language)}%
          <SuperScript
            legalType={LEGAL_LIST.APR}
            scriptNumber={2}
            idForQA={idForQA}
            legals={legals}
          />
        </Percentage>
        <AdditionalText>
          {t('promotions.offers.upTo')}{' '}
          <BoldText data-cy={`${idForQA} + apr-period`}>
            {percentage.Period} {t('promotions.offers.months')}{' '}
          </BoldText>
          {rateReduction && t('promotions.offers.includesRateRed')}
        </AdditionalText>
      </APR>
      {rateReduction && (
        <RateReduction data-cy={`${idForQA} + rate-reduction`}>
          <OfferTitle>{t('promotions.offers.rateReduction')}</OfferTitle>
          <Percentage>
            {rateReduction?.RateReduction}%
            <SuperScript
              legalType={LEGAL_LIST.RATE_RED}
              scriptNumber={1}
              idForQA={idForQA}
              legals={legals}
            />
          </Percentage>
          <AdditionalText>
            {t('promotions.offers.expires')} {expiryDate}
          </AdditionalText>
        </RateReduction>
      )}
      {minimumPayments && (
        <Payments data-cy={`${idForQA} + payments`}>
          <OfferTitle data-cy={`${idForQA} + payment-frequency-title`}>
            {paymentFrequency}
          </OfferTitle>
          <Percentage data-cy={`${idForQA} + payment-frequency-price`}>
            {numberFormatter(minimumPayments.MinimumPayment, i18n.language)}
            <SuperScript
              legalType={LEGAL_LIST.APR}
              scriptNumber={2}
              idForQA={idForQA}
              legals={legals}
            />
          </Percentage>
          <AdditionalText>
            {t('promotions.offers.with')}{' '}
            <BoldText>{numberFormatter(minimumPayments.DownPayment, i18n.language)} </BoldText>
            {i18n.language !== 'fr' && t('promotions.offers.downPayment')}
          </AdditionalText>
        </Payments>
      )}
      {cash && (
        <CashPayments>
          <OfferTitle>{t('promotions.offers.audiCredit')}</OfferTitle>
          <Percentage>
            {numberFormatter(cash.audiCredit, i18n.language)}
            <SuperScript
              legalType={LEGAL_LIST.APR}
              scriptNumber={2}
              idForQA={idForQA}
              legals={legals}
            />
          </Percentage>
        </CashPayments>
      )}
    </OfferRates>
  );
};

export default LeaseAndFinance;
