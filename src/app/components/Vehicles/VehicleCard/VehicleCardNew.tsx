import React, { useMemo } from 'react';
import _ from 'lodash';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';
import {
  Card,
  DagAndFeature,
  Dag,
  FeaturedOffer,
  VehicleInfo,
  VehicleInfoHeader,
  Title,
  Cpo,
  Image,
  OffersInfo,
  CTA,
  TrilLine,
} from './style/indexNew.style';
import TagIcon from '../../../assets/icons/TagIcon';
import { PromotionVehicleType } from '../../../types/promotionsTypes';
import VehicleImage from './VehicleImage';
import { INVENTORY_TYPE_FILTER_LIST, REGION_FILTER_LIST } from '../../../constants/FilterList';
import { CTA_LIST } from '../../../constants/CtaList';
import Button from '../../CtaButtons/Button';
import OffersNew from '../Offers/indexNew';
import OffersUsed from '../Offers/indexUsed';
import { transformNewOffers } from '../../../functions/transformOffers';
import VehiclePrice from './VehiclePrice';

interface VehicleCardProps {
  singlePromotion: PromotionVehicleType;
  idForQA: string;
}

const VehicleCardNew: React.FC<VehicleCardProps> = ({ singlePromotion, idForQA }) => {
  const { t, i18n } = useTranslation();

  const {
    offers,
    legalCopyCn,
    legalCopyEn,
    legalCopyFr,
    cpoOffers,
    bodyStyleEn,
    modelFamily,
    modelName,
    modelId,
    dag,
    image,
    type,
    mtlTrimName,
    year,
    msrp,
    configuratorUrlFr,
    configuratorUrlEn,
    featuredOffer,
    plusEn,
    plusFr,
    expiryDate,
  } = singlePromotion;

  const isCpoVehicle = type === INVENTORY_TYPE_FILTER_LIST.Cpo;
  const formattedExpiryDate = DateTime.fromISO(expiryDate, { zone: 'America/New_York' }).toFormat(
    'MMMM dd, yyyy',
  );

  const sortedNewOffers = transformNewOffers(offers);

  const featuredLabel = featuredOffer || cpoOffers?.featuredOffer;

  const legals = useMemo(() => {
    // return {
    //   en: transformLegals(legalCopyEn),
    //   fr: transformLegals(legalCopyFr),
    //   cn: transformLegals(legalCopyCn),
    // };
    return {
      en: legalCopyEn,
      fr: legalCopyFr,
      cn: legalCopyCn,
    };
  }, [legalCopyCn, legalCopyEn, legalCopyFr]);

  const buildAndPriceUrl = useMemo(() => {
    if (i18n.language === 'fr') return configuratorUrlFr;
    return configuratorUrlEn;
  }, [configuratorUrlEn, configuratorUrlFr, i18n.language]);

  return (
    <Card data-cy={idForQA} data-promo-offer-component="offer-card">
      <DagAndFeature>
        <Dag data-testid="dag">{t(`promotions.dag.${dag}`)}</Dag>
        {featuredLabel && (
          <FeaturedOffer data-cy={`${idForQA} + special-offer-text`}>
            <p>{t('promotions.specialOffer')}</p>
            <TagIcon />
          </FeaturedOffer>
        )}
      </DagAndFeature>
      <VehicleInfo>
        <VehicleInfoHeader>
          <Title data-cy={`${idForQA} + carTitle`}>
            {year} Audi {modelName}
          </Title>
          {!isCpoVehicle && <TrilLine data-testid="mtl-tile">{mtlTrimName}</TrilLine>}
          {isCpoVehicle && (
            <Cpo>
              <div data-testid="cpo-tile">
                <span style={{ color: '#BB0A30', fontWeight: 'bold' }}>Audi</span> {t(`certified`)}{' '}
                <span style={{ color: '#BB0A30', fontWeight: 'bold', fontStyle: 'italic' }}>
                  :plus
                </span>
              </div>
            </Cpo>
          )}
        </VehicleInfoHeader>
        <Image>
          <VehicleImage
            idForQA={idForQA}
            modelImage={image}
            isCpoVehicle={isCpoVehicle}
            year={year}
          />
        </Image>
        <VehiclePrice
          isCpoVehicle={isCpoVehicle}
          msrp={msrp}
          idForQA={idForQA}
          legals={legals}
          dag={dag}
          modelId={modelId}
        />
      </VehicleInfo>
      <OffersInfo>
        {isCpoVehicle && cpoOffers ? (
          <OffersUsed
            cpoOffers={cpoOffers}
            idForQA={idForQA}
            legals={legals}
            plusEn={plusEn}
            plusFr={plusFr}
            expiryDate={formattedExpiryDate}
            isCpoVehicle={isCpoVehicle}
          />
        ) : (
          <OffersNew
            isCpoVehicle={isCpoVehicle}
            offers={sortedNewOffers}
            idForQA={idForQA}
            legals={legals}
            expiryDate={formattedExpiryDate}
          />
        )}

        <CTA>
          <Button
            buttonName={isCpoVehicle ? CTA_LIST.WHY_BUY_CERTIFIED_PLUS : CTA_LIST.BUILD_YOUR_AUDI}
            configuratorUrl={buildAndPriceUrl}
            data-cy={`${idForQA} + build-price`}
          />
          <Button
            buttonName={isCpoVehicle ? CTA_LIST.VIEW_INVENTORY_USED : CTA_LIST.VIEW_INVENTORY_NEW}
            modelType={type}
            modelId={modelId}
            modelFamily={modelFamily}
            bodyStyleEn={bodyStyleEn}
            year={year}
            data-cy={`${idForQA} + view-inventory`}
          />
        </CTA>
      </OffersInfo>
    </Card>
  );
};

export default VehicleCardNew;
