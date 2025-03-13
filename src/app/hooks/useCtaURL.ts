import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { IS_STAGING_PAGE, IS_TESTING_ENVIRONMENT } from '../constants/environment';
import { CARLINES } from '../constants/ModelFamilyList';

const useCtaURL = (
  modelId?: string | null,
  bodyStyleEn?: string,
  modelTypeForInventory?: string,
  dag?: string,
  year?: number,
) => {
  const { i18n } = useTranslation();

  const lang = useMemo(() => {
    if (i18n.language === 'fr') return 'fr';
    return 'en';
  }, [i18n.language]);

  const carline = useMemo(() => {
    if (!modelId || !bodyStyleEn) return '';
    return CARLINES[modelId]?.[bodyStyleEn];
  }, [bodyStyleEn, modelId]);

  const paymentEstimatorUrl = useMemo(() => {
    const stagingUrl = `https://staging.audipaymentestimator.ca/${lang}`;
    const prodUrl = `https://audipaymentestimator.ca/${lang}`;
    return IS_STAGING_PAGE ? stagingUrl : prodUrl;
  }, [lang]);

  const basicInventoryUrl = useMemo(() => {
    const stagingUrl = `https://www.audi.ca/ca/web/${lang}/test_pages/inventory-staging.html`;
    const prodUrl = `https://www.audi.ca/ca/web/${lang}/inventory.html`;
    return IS_STAGING_PAGE || IS_TESTING_ENVIRONMENT ? stagingUrl : prodUrl;
  }, [lang]);

  const inventoryNewUrl = useMemo(() => {
    const stagingUrl = `https://www.audi.ca/ca/web/${lang}/test_pages/inventory-staging.html?carline=${carline}&type=${modelTypeForInventory}`;
    const prodUrl = `https://www.audi.ca/ca/web/${lang}/inventory.html?carline=${carline}&type=${modelTypeForInventory}`;
    return IS_STAGING_PAGE ? stagingUrl : prodUrl;
  }, [carline, lang, modelTypeForInventory]);

  const inventoryUsedUrl = useMemo(() => {
    const stagingUrl = `https://www.audi.ca/ca/web/${lang}/test_pages/inventory-staging.html?carline=${carline}&type=${modelTypeForInventory}&year=${year}:${year}`;
    const prodUrl = `https://www.audi.ca/ca/web/${lang}/inventory.html?carline=${carline}&type=${modelTypeForInventory}&year=${year}:${year}`;
    return IS_STAGING_PAGE ? stagingUrl : prodUrl;
  }, [carline, lang, modelTypeForInventory, year]);

  const whyBuyCertifiedUrl = useMemo(() => {
    return `https://www.audi.ca/ca/web/${lang}/cpo/layer/Why-buy-certified.html`;
  }, [lang]);

  const cpoFaqUrl = useMemo(() => {
    return `https://www.audi.ca/ca/web/${lang}/cpo.html#layer=/ca/web/${lang}/cpo/layer/faq.html`;
  }, [lang]);

  const contactDealerUrl = useMemo(() => {
    return `https://www.audi.ca/ca/web/${lang}/forms/contact-dealer.html?dealer_id=49&partner_id=&dag=${dag}&modelid=${modelId}`;
  }, [dag, lang, modelId]);

  return {
    paymentEstimatorUrl,
    basicInventoryUrl,
    inventoryNewUrl,
    inventoryUsedUrl,
    whyBuyCertifiedUrl,
    cpoFaqUrl,
    contactDealerUrl,
  };
};

export default useCtaURL;
