# Query Structure

When we load our page - we send **one** request for all offers. After that, the backend is no longer used - all manipulations with filters are carried out on the frontend and offers are stored there.

Let's first look at the request and its structure:

```
query GetSearchResults {

getPromotionOfferByMultiParams(type: "", year: "", modelId: "") {

expiryDate

msrp

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

legalCopyEn

legalCopyFr

legalCopyCn

plusEn

plusFr

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

offers {

title

offertypes {

\_\_typename

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
```

\`  
You can choose in advance by attributes what exactly to get from the request - for example, you can get only new cars, or vice versa. If the field is left empty - by default we get both types of cars. You can also optionally request the year of manufacture of the car.  
But in this project, nothing needs to be specified, since the amount of data is not so large, and we can easily manipulate it on the frontend

I would like to draw attention to the most important parts of this request and what they are responsible for:

| Name                                         | Type of data | Explanation                                                                                                                                                                                                                      |
| -------------------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| expiryDate                                   | String       | The date when offer will be hidden. We have validation on the BE, but to be safe we add validation on the FE too. For example - if expiry date is 04-12-2022 - the offer won't be on the page                                    |
| type                                         | String       | New vehicle or Used (CPO). Used to split them using filters                                                                                                                                                                      |
| configuratorUrlEn/ configuratorUrlFr         | String       | URL used to forward user on Build Your Audi page. Hardcoded in the RFC file.If there is no data (null) - the CTA will be disabled                                                                                                |
| paymentEstimator                             | Boolean      | If this value is false - the Payment Estimator CTA will be disabled. In all other cases - it will be available for click                                                                                                         |
| featuredOffer                                | Boolean      | If this value is true - this vehicle will be on the top of the page                                                                                                                                                              |
| plusEn/plusFr                                | String       | Offer Plus for CPO (Used) vehicles                                                                                                                                                                                               |
| dag                                          | String       | Region of the offer - NAT (National), GTA (Toronto), VAN (Vancouver), MTL (Montreal)                                                                                                                                             |
| apr0_24/apr25_36/apr37_48/ apr49_60/apr61_72 | Number       | Finance rates for only CPO vehicles (used for Payment Estimator too)                                                                                                                                                             |
| offers                                       | Array        | Array with all offers related for a NEW vehicle. There are 3 different types of offer - Lease, Finance, Cash. Every offer may contain different types of data. If there is no data - we won't receive this type of offer at all. |
