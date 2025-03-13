import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation, Trans } from 'react-i18next';
import {
  CtaHref,
  Button,
  PrimaryButton,
  BasicFilterButton,
  ShowResultsButton,
  CardButton,
  ContactDealerCTA,
  LoadMoreButton,
} from './CtaButtons.style';
import getMappedKeyWords from '../../functions/getKeyWordMapped';
import { CTA_LIST } from '../../constants/CtaList';
import { deleteAllFilters } from '../../redux/actions';
import useCtaURL from '../../hooks/useCtaURL';
import ForwardIcon from '../../assets/icons/ForwardIcon';

interface CtaButtonProp {
  buttonName: string;
  modelFamily?: string;
  modelId?: string | null;
  modelType?: string;
  bodyStyleEn?: string;
  dag?: string;
  configuratorUrl?: string | null;
  year?: number;
  paymentEstimator?: boolean | null;
  isButtonDisabled?: boolean;
  numberOfOngoingResults?: string;
  noResults?: boolean;
  handleClick?: () => void;
}

const CtaButton: React.FC<CtaButtonProp> = ({
  buttonName,
  modelId,
  modelType,
  bodyStyleEn,
  dag,
  configuratorUrl,
  year,
  paymentEstimator,
  isButtonDisabled,
  numberOfOngoingResults,
  noResults,
  handleClick,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const modelTypeForInventory = modelType && getMappedKeyWords(modelType);

  const {
    paymentEstimatorUrl,
    basicInventoryUrl,
    inventoryNewUrl,
    inventoryUsedUrl,
    whyBuyCertifiedUrl,
    cpoFaqUrl,
    contactDealerUrl,
  } = useCtaURL(modelId, bodyStyleEn, modelTypeForInventory, dag, year);

  // All These buttons related to vehicle card
  const viewInventoryNew = useMemo(() => {
    return (
      <CtaHref
        target="_blank"
        href={inventoryNewUrl}
        tabIndex={-1}
        data-testid={buttonName}
        data-cy={buttonName}
      >
        <CardButton>{t(`promotions.cta.viewInventory`)}</CardButton>
      </CtaHref>
    );
  }, [buttonName, inventoryNewUrl, t]);

  const viewInventoryUsed = useMemo(() => {
    return (
      <CtaHref
        target="_blank"
        href={inventoryUsedUrl}
        tabIndex={-1}
        data-testid={buttonName}
        data-cy={buttonName}
      >
        <CardButton>{t(`promotions.cta.viewInventory`)}</CardButton>
      </CtaHref>
    );
  }, [buttonName, inventoryUsedUrl, t]);

  const viewInventoryNoResults = (
    <CtaHref
      target="_blank"
      href={basicInventoryUrl}
      tabIndex={-1}
      data-testid={buttonName}
      data-cy={buttonName}
    >
      <PrimaryButton>{t(`promotions.cta.viewInventory`)}</PrimaryButton>
    </CtaHref>
  );

  const buildYourAudi = (
    <CtaHref
      target="_blank"
      href={configuratorUrl ?? undefined}
      tabIndex={-1}
      data-testid={buttonName}
      data-cy={buttonName}
    >
      <CardButton disabled={!configuratorUrl}>{t(`promotions.cta.buildYourAudi`)}</CardButton>
    </CtaHref>
  );
  const paymentEstimatorButton = (
    <CtaHref
      target="_blank"
      href={paymentEstimatorUrl}
      tabIndex={-1}
      data-testid={buttonName}
      data-cy={buttonName}
    >
      <Button disabled={paymentEstimator === false}>{t(`promotions.cta.estimateSavings`)}</Button>
    </CtaHref>
  );
  const contactDealer = useMemo(() => {
    return (
      <CtaHref
        target="_blank"
        href={contactDealerUrl}
        tabIndex={-1}
        data-testid={buttonName}
        data-cy={buttonName}
      >
        <Button>{t(`promotions.cta.contactDealer`)}</Button>
      </CtaHref>
    );
  }, [buttonName, contactDealerUrl, t]);

  const contactDealerCard = useMemo(() => {
    return (
      <CtaHref
        target="_blank"
        href={contactDealerUrl}
        tabIndex={-1}
        data-testid={buttonName}
        data-cy={buttonName}
      >
        <ContactDealerCTA>
          {t(`promotions.cta.contactDealer`)} <ForwardIcon />
        </ContactDealerCTA>
      </CtaHref>
    );
  }, [buttonName, contactDealerUrl, t]);
  const whyBuyCPO = (
    <CtaHref
      target="_blank"
      href={whyBuyCertifiedUrl}
      tabIndex={-1}
      data-testid={buttonName}
      data-cy={buttonName}
    >
      <CardButton>
        <Trans
          i18nKey="promotions.cta.whyBuyCertified"
          components={{ italic: <span style={{ fontStyle: 'italic' }} /> }}
        />
      </CardButton>
    </CtaHref>
  );
  const cpoFAQ = (
    <CtaHref
      target="_blank"
      href={cpoFaqUrl}
      tabIndex={-1}
      data-testid={buttonName}
      data-cy={buttonName}
    >
      <Button>
        <Trans
          i18nKey="promotions.cta.cpoFAQ"
          components={{ italic: <span style={{ fontStyle: 'italic' }} /> }}
        />
      </Button>
    </CtaHref>
  );

  // Filter buttons

  const cancelFilters = (
    <BasicFilterButton
      onClick={() => dispatch(deleteAllFilters())}
      data-testid="cancel-filters-btn"
    >
      {t(`promotions.cta.clearFilter`)}
    </BasicFilterButton>
  );

  const applyFilters = (
    <ShowResultsButton
      onClick={handleClick}
      disabled={isButtonDisabled}
      data-testid="confirm-filters-btn"
    >
      {numberOfOngoingResults}
    </ShowResultsButton>
  );

  // Load More Button

  const loadMoreButton = (
    <LoadMoreButton data-cy="load-more-btn">{t(`promotions.buttons.loadMore`)}</LoadMoreButton>
  );

  if (buttonName === CTA_LIST.VIEW_INVENTORY_NEW) return viewInventoryNew;

  if (buttonName === CTA_LIST.VIEW_INVENTORY_USED) return viewInventoryUsed;

  if (buttonName === CTA_LIST.VIEW_INVENTORY_NO_RESULTS) return viewInventoryNoResults;

  if (buttonName === CTA_LIST.BUILD_YOUR_AUDI) return buildYourAudi;

  if (buttonName === CTA_LIST.ESTIMATE_YOUR_SAVINGS) return paymentEstimatorButton;

  if (buttonName === CTA_LIST.CONTACT_DEALER) return contactDealer;

  if (buttonName === CTA_LIST.CONTACT_DEALER_CARD) return contactDealerCard;

  if (buttonName === CTA_LIST.WHY_BUY_CERTIFIED_PLUS) return whyBuyCPO;

  if (buttonName === CTA_LIST.CPO_FAQ) return cpoFAQ;

  if (buttonName === CTA_LIST.CANCEL_FILTERS) return cancelFilters;

  if (buttonName === CTA_LIST.APPLY_FILTERS) return applyFilters;

  if (buttonName === CTA_LIST.LOAD_MORE) return loadMoreButton;

  return null;
};

export default CtaButton;
