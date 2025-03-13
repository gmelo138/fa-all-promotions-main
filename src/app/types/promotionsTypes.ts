/* eslint-disable camelcase */

export interface PromotionVehicleType {
  apr0_24: number | null;
  apr25_36: number | null;
  apr37_48: number | null;
  apr49_60: number | null;
  apr61_72: number | null;
  modelSalesCode: string;
  bodyStyleEn: string;
  buildPrice: string | null;
  cpoOffers: CpoOffersTypes | null;
  configuratorUrlEn: string | null;
  configuratorUrlFr: string | null;
  customHeadlineCn: null;
  customHeadlineEn: null;
  customHeadlineFr: null;
  dag: string;
  dealerId: null;
  expiryDate: string;
  extrasCn: null;
  extrasEn: null;
  extrasFr: null;
  featuredOffer: boolean;
  featuredHierarchy: number | null;
  image: string;
  leaseApr: number | null;
  legalCopyEn: string | null;
  legalCopyFr: string | null;
  legalCopyCn: string | null;
  modelFamily: string;
  modelName: string;
  modelId: string | null;
  msrp: number | null;
  mtlTrimName: string | null;
  offers: ListOfOfferTypes[];
  plusEn: string | null;
  plusFr: string | null;
  paymentEstimator: boolean | null;
  trimName: string;
  type: string;
  year: number;
}

export type UpdatedLegals = {
  [key: string]: {
    [key: string]: string | null;
  } | null;
};

export type UpdatedOffers = {
  [key: string]: {
    [key: string]: {
      ExpiryDate?: string;
      cashOffer?: number;
      name: string;
      newName: string;
      audiCredit?: number;
      DownPayment?: number;
      MinimumPayment?: number;
      PaymentFrequency?: string;
      RateReduction?: number;
      Period?: number;
      Rate: number;
      offerPlusCn?: string;
      offerPlusEn?: string;
      offerPlusFr?: string;
    };
  };
};

export type CpoOffersTypes = {
  apr0_24: number | null;
  apr25_36: number | null;
  apr37_48: number | null;
  apr49_60: number | null;
  apr61_72: number | null;
  rateReduction: number | null;
  featuredOffer: boolean | null;
  featuredHierarchy: number | null;
};

export type ListOfOfferTypes = {
  __typename: string;
  title: string;
  offertypes: OfferTypes[];
};

export type OfferTypes =
  | LeaseMinimumPaymentType
  | LeasePercentageType
  | AudiCrediType
  | OfferPlusType
  | FinancePercentageTypes
  | FinanceMinimumPaymentType
  | CashOffersTypes
  | null;

export type LeaseMinimumPaymentType = {
  __typename: string;
  name: string;
  leaseDownPayment?: number | null;
  leaseMinimumPayment?: number | null;
  leasePaymentFrequency?: string;
};

export type LeasePercentageType = {
  __typename: string;
  name: string;
  leaseRate?: number | null;
  leasePeriod?: number | null;
  leaseApr?: number | null;
};

export type AudiCrediType = {
  __typename: string;
  name: string;
  audiCredit?: number | null;
};

export type OfferPlusType = {
  __typename: string;
  name: string;
  [key: string]: string | null;
};

export type FinancePercentageTypes = {
  __typename: string;
  name: string;
  financeRate?: number | null;
  financePeriod?: number | null;
  financeApr?: number | null;
};

export type FinanceMinimumPaymentType = {
  name: string;
  financePaymentFrequency?: string;
  financeMinimumPayment?: number | null;
  financeDownPayment?: number | null;
};

export type CashOffersTypes = {
  __typename: string;
  name: string;
  cashOffer?: number | null;
};
