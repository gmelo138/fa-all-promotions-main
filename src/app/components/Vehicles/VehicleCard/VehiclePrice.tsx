import React from 'react';
import { useTranslation } from 'react-i18next';
import { CpoPricing, MSRP, MSRPNumber, Price, PriceAndContact } from './style/indexNew.style';
import SuperScript from '../../SuperScript';
import Button from '../../CtaButtons/Button';
import { CTA_LIST, LEGAL_LIST } from '../../../constants/CtaList';
import numberFormatter from '../../../functions/numberFormatter';
import { IS_CN_PAGE } from '../../../constants/environment';

interface VehiclePriceTypes {
  isCpoVehicle: boolean;
  msrp: number | null;
  idForQA: string;
  legals: {
    en: string | null;
    fr: string | null;
    cn: string | null;
  };
  dag: string;
  modelId: string | null;
}

const VehiclePrice: React.FC<VehiclePriceTypes> = ({
  isCpoVehicle,
  msrp,
  idForQA,
  legals,
  dag,
  modelId,
}) => {
  const { t, i18n } = useTranslation();

  const lang = i18n.language;

  if (isCpoVehicle)
    return (
      <PriceAndContact>
        <Price>
          <CpoPricing
            data-cy={`${idForQA} + cpoPrice`}
            lang={lang}
          >{t`promotions.cpoPrice`}</CpoPricing>
        </Price>
        <Button buttonName={CTA_LIST.CONTACT_DEALER_CARD} dag={dag} modelId={modelId} />
      </PriceAndContact>
    );

  return (
    <PriceAndContact>
      <Price>
        {!IS_CN_PAGE && <MSRP>{t('promotions.msrp')}</MSRP>}
        <MSRPNumber data-testid="msrp-text" data-cy={`${idForQA} + msrp-price`}>
          {numberFormatter(msrp, i18n.language)}
          {IS_CN_PAGE && <MSRP>{t('promotions.startingFrom')}</MSRP>}
          <SuperScript
            scriptNumber={3}
            legalType={LEGAL_LIST.PRICE}
            idForQA={idForQA}
            legals={legals}
          />
        </MSRPNumber>
      </Price>
      <Button buttonName={CTA_LIST.CONTACT_DEALER_CARD} dag={dag} modelId={modelId} />
    </PriceAndContact>
  );
};

export default VehiclePrice;
