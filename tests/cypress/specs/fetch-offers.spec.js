import modelNames from '../fixtures/modelNamesSortOrder.json';

//https://api.audiusa.com/graphql
it('fetches all items', () => {
  cy.request({
    method: 'POST',
    url: 'https://api.audiusa.com/graphql',
    body: {
      query: `query GetSearchResults {
  getPromotionOfferByMultiParams(type:"NEW-CAR", year:"", modelSalesCode:"") {
    dag
    expiryDate
    msrp
    modelSalesCode
    modelId
    modelFamily
    modelName
    bodyStyleEn
    image
    trimName
    mtlTrimName
    dealerId
    type
    buildPrice
    paymentEstimator
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
    year
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
        ... on PromotionsFinanceCash {
          name
          audiCredit
        }
        ... on PromotionsFinanceMinimumPayment {
          name
          financeDownPayment
          financeMinimumPayment
          financePaymentFrequency
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
`,
    },
  }).then((response) => {
    cy.writeFile(
      'tests/cypress/fixtures/all-offers-data.json',
      response.body.data.getPromotionOfferByMultiParams,
    );
    console.log(response.body.data.getPromotionOfferByMultiParams);
    console.log(
      response.body.data.getPromotionOfferByMultiParams
        .sort((a, b) => {
          return modelNames.indexOf(a.modelName) - modelNames.indexOf(b.modelName);
        })
        .filter((promotion) => promotion.dag === 'VAN'),
    );
  });
});
