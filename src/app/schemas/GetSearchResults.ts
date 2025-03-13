/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const GET_SEARCH_RESULTS = gql`
  query GetSearchResults {
    getPromotionOfferByMultiParams(type: "", year: "") {
      expiryDate
      msrp
      modelFamily
      modelName
      modelId
      bodyStyleEn
      image
      trimName
      mtlTrimName
      dealerId
      type
      buildPrice
      paymentEstimator
      plusEn
      plusFr
      featuredOffer
      featuredHierarchy
      legalCopyEn
      legalCopyFr
      legalCopyCn
      extrasEn
      extrasFr
      extrasCn
      customHeadlineEn
      customHeadlineFr
      customHeadlineCn
      configuratorUrlEn
      configuratorUrlFr
      dag
      year
      apr0_24
      apr25_36
      apr37_48
      apr49_60
      apr61_72
      modelSalesCode
      cpoOffers {
        featuredOffer
        featuredHierarchy
        apr0_24
        apr25_36
        apr37_48
        apr49_60
        apr61_72
        rateReduction
      }
      offers {
        title
        offertypes {
          __typename
          ... on PromotionsLeaseMinimumPayment {
            name
            leaseDownPayment
            leaseMinimumPayment
            leasePaymentFrequency
          }
          ... on PromotionsLeaseRateReduction {
            name
            leaseRateReduction
            leaseExpiryDate
          }
          ... on PromotionsLeasePercentage {
            name
            leaseRate
            leasePeriod
            leaseApr
          }
          ... on PromotionsLeaseCash {
            name
            audiCredit
          }
          ... on PromotionsLeaseOffersPlus {
            name
            offerPlusEn
            offerPlusFr
            offerPlusCn
          }
          ... on PromotionsFinancePercentage {
            name
            financeRate
            financeApr
            financePeriod
          }
          ... on PromotionsFinanceRateReduction {
            name
            financeRateReduction
            financeExpiryDate
          }
          ... on PromotionsFinanceMinimumPayment {
            name
            financeDownPayment
            financeMinimumPayment
            financePaymentFrequency
          }
          ... on PromotionsFinanceCash {
            name
            audiCredit
          }
          ... on PromotionsFinanceOffersPlus {
            name
            offerPlusEn
            offerPlusFr
            offerPlusCn
          }
          ... on PromotionsCashOffer {
            name
            cashOffer
          }
          ... on PromotionsCashOfferPlus {
            name
            offerPlusEn
            offerPlusFr
            offerPlusCn
          }
        }
      }
    }
  }
`;
