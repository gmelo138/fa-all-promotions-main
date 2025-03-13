/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState } from 'react';
import { Tab, TabGroup } from '@audi/audi-ui-react';
import { useTranslation } from 'react-i18next';
import { transformCpoOffers, rangeConverter } from '../../../functions/transformOffers';
import {
  APR,
  AdditionalText,
  Frequency,
  Offer,
  OfferRates,
  OfferTitle,
  Percentage,
  RateReduction,
  Tabs,
} from '../VehicleCard/style/indexNew.style';
import { formatOfferPercentage } from '../../../functions/formatOfferPercentage';
import { CpoOffersTypes } from '../../../types/promotionsTypes';
import { LEGAL_LIST } from '../../../constants/CtaList';
import SuperScript from '../../SuperScript';
import OfferPlus from './OfferPlus';

interface OffersProps {
  isCpoVehicle: boolean;
  cpoOffers: CpoOffersTypes;
  idForQA: string;
  plusEn: string | null;
  plusFr: string | null;
  expiryDate: string;
  legals: {
    en: string | null;
    fr: string | null;
    cn: string | null;
  };
}

const OffersUsed: React.FC<OffersProps> = ({
  isCpoVehicle,
  cpoOffers,
  idForQA,
  legals,
  plusEn,
  plusFr,
  expiryDate,
}) => {
  const [selectedTab, setSelectedTab] = useState('Finance');

  const { t, i18n } = useTranslation();
  const { apr0_24, apr25_36, apr37_48, apr49_60, apr61_72, rateReduction } = cpoOffers;
  const cpoRates = {
    apr0_24,
    apr25_36,
    apr37_48,
    apr49_60,
    apr61_72,
  };

  const offerPlusCPO = {
    en: plusEn,
    fr: plusFr,
  };

  // @ts-ignore
  const updatedOffers = transformCpoOffers(cpoRates);
  const listOfAprs = Object.keys(updatedOffers).filter((apr) => updatedOffers[apr] !== null);

  return (
    <Offer>
      <Tabs>
        <TabGroup id="tab-group__basic" selected={selectedTab} onSelect={setSelectedTab}>
          <Tab id="Finance">{t('promotions.offers.Finance')}</Tab>
        </TabGroup>
      </Tabs>
      <OfferRates>
        {listOfAprs.map((aprTab) => (
          <APR key={aprTab}>
            <OfferTitle>{t('promotions.offers.apr')}</OfferTitle>
            <Percentage>
              {formatOfferPercentage(updatedOffers[aprTab])}%
              <SuperScript
                legalType={LEGAL_LIST.APR}
                scriptNumber={2}
                idForQA={idForQA}
                legals={legals}
              />
            </Percentage>
            <Frequency>
              {rangeConverter(aprTab)} {t('promotions.offers.months')}
            </Frequency>
            {rateReduction && (
              <AdditionalText>{t('promotions.offers.includesRateRed')}</AdditionalText>
            )}
          </APR>
        ))}
        {rateReduction && (
          <RateReduction>
            <OfferTitle>{t('promotions.offers.rateReduction')}</OfferTitle>
            <Percentage>
              {rateReduction}%
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
      </OfferRates>
      {plusEn && (
        <OfferPlus
          offerPlusCPO={offerPlusCPO}
          idForQA={idForQA}
          legals={legals}
          isCpoVehicle={isCpoVehicle}
        />
      )}
    </Offer>
  );
};

export default OffersUsed;
