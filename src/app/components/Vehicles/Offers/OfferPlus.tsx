import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  MultipleOffers,
  OfferPlusInfo,
  OfferPlusWrapper,
  PlusOffers,
  PlusText,
  PlusTitle,
} from '../VehicleCard/style/indexNew.style';
import SuperScript from '../../SuperScript';
import { LEGAL_LIST } from '../../../constants/CtaList';
import { IS_CN_PAGE } from '../../../constants/environment';

interface OfferPlusTypes {
  isCpoVehicle: boolean;
  offerPlusCPO?: {
    en: string | null;
    fr: string | null;
  };
  offersPlus?: {
    offerPlusCn?: string;
    offerPlusEn?: string;
    offerPlusFr?: string;
    name: string;
    newName: string;
  };
  cash?: {
    audiCredit?: number;
    name: string;
    newName: string;
  };
  idForQA: string;
  legals: {
    en: string | null;
    fr: string | null;
    cn: string | null;
  };
}
const OfferPlus: React.FC<OfferPlusTypes> = ({
  offersPlus,
  offerPlusCPO,
  cash,
  idForQA,
  legals,
  isCpoVehicle,
}) => {
  const { t, i18n } = useTranslation();

  const offerPlusToRender = useMemo(() => {
    if (isCpoVehicle && i18n.language === 'fr') return offerPlusCPO?.fr;
    if (isCpoVehicle) return offerPlusCPO?.en;
    if (!isCpoVehicle && i18n.language === 'fr') return offersPlus?.offerPlusFr;
    if (!isCpoVehicle && IS_CN_PAGE) return offersPlus?.offerPlusCn;
    return offersPlus?.offerPlusEn;
  }, [
    i18n.language,
    isCpoVehicle,
    offerPlusCPO?.en,
    offerPlusCPO?.fr,
    offersPlus?.offerPlusCn,
    offersPlus?.offerPlusEn,
    offersPlus?.offerPlusFr,
  ]);

  const multiplyOffers = offerPlusToRender?.split(';').filter((toCheck) => toCheck !== '');

  const isMultipleOffers = !!offerPlusToRender && !!cash;

  return (
    <OfferPlusWrapper>
      <OfferPlusInfo>
        <PlusTitle> {t('promotions.offers.offerPlus')}</PlusTitle>
        <PlusOffers>
          {offerPlusToRender && (
            <PlusText isMultipleOffers={isMultipleOffers}>
              <MultipleOffers>
                {multiplyOffers?.map((offer, index, array) => {
                  const isLastOffer = index === array.length - 1;
                  return (
                    <p key={offer}>
                      {offer}
                      {isLastOffer ? null : ';'}
                    </p>
                  );
                })}
              </MultipleOffers>
              <SuperScript
                legalType={LEGAL_LIST.PLUS}
                scriptNumber={4}
                idForQA={idForQA}
                legals={legals}
              />
            </PlusText>
          )}
        </PlusOffers>
      </OfferPlusInfo>
    </OfferPlusWrapper>
  );
};

export default OfferPlus;
