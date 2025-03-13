import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Cta, ButtonGroup } from './CtaButtons.style';
import CtaButton from './Button';
import { INVENTORY_TYPE_FILTER_LIST } from '../../constants/FilterList';
import { CTA_LIST } from '../../constants/CtaList';

interface DealerProps {
  modelType: string;
  modelId: string | null;
  modelFamily: string;
  bodyStyleEn: string;
  dag: string;
  configuratorUrlEn: string | null;
  configuratorUrlFr: string | null;
  idForQA: string;
  year: number;
  paymentEstimator: boolean | null;
}

const CtaButtons: React.FC<DealerProps> = ({
  modelType,
  modelId,
  modelFamily,
  bodyStyleEn,
  dag,
  year,
  configuratorUrlEn,
  configuratorUrlFr,
  idForQA,
  paymentEstimator,
}) => {
  const { i18n } = useTranslation();

  const buildAndPriceUrl = useMemo(() => {
    if (i18n.language === 'fr') return configuratorUrlFr;
    return configuratorUrlEn;
  }, [configuratorUrlEn, configuratorUrlFr, i18n.language]);

  return (
    <Cta data-cy={`${idForQA} + ctaGroup`}>
      <ButtonGroup>
        {modelType === INVENTORY_TYPE_FILTER_LIST.New ? (
          <>
            <CtaButton
              buttonName={CTA_LIST.VIEW_INVENTORY_NEW}
              modelType={modelType}
              modelId={modelId}
              modelFamily={modelFamily}
              bodyStyleEn={bodyStyleEn}
              year={year}
            />
            <CtaButton buttonName={CTA_LIST.BUILD_YOUR_AUDI} configuratorUrl={buildAndPriceUrl} />
            <CtaButton
              buttonName={CTA_LIST.ESTIMATE_YOUR_SAVINGS}
              paymentEstimator={paymentEstimator}
            />
            <CtaButton
              buttonName={CTA_LIST.CONTACT_DEALER}
              dag={dag}
              modelId={modelId}
              bodyStyleEn={bodyStyleEn}
            />
          </>
        ) : (
          <>
            <CtaButton
              buttonName={CTA_LIST.VIEW_INVENTORY_USED}
              modelType={modelType}
              modelId={modelId}
              modelFamily={modelFamily}
              bodyStyleEn={bodyStyleEn}
              year={year}
            />
            <CtaButton
              buttonName={CTA_LIST.CONTACT_DEALER}
              configuratorUrl={buildAndPriceUrl}
              dag={dag}
              modelId={modelId}
              bodyStyleEn={bodyStyleEn}
            />
            <CtaButton
              buttonName={CTA_LIST.WHY_BUY_CERTIFIED_PLUS}
              paymentEstimator={paymentEstimator}
            />
            <CtaButton buttonName={CTA_LIST.CPO_FAQ} />
          </>
        )}
      </ButtonGroup>
    </Cta>
  );
};

export default CtaButtons;
