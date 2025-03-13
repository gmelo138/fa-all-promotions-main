import allOffers from '../fixtures/all-offers-data.json';
import modelNames from '../fixtures/modelNamesSortOrder.json';

const dollarUSLocale = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});

let selectors;

beforeEach(() => {
  cy.fixture('selectors').then((data) => {
    selectors = data;
  });
  cy.viewport('macbook-15');
  cy.setCookie('AUDI_ENSIGHTEN_PRIVACY_BANNER_VIEWED', '1');
  cy.setCookie('AUDI_ENSIGHTEN_PRIVACY_Do_Not_Track', '1');
  cy.setCookie('AUDI_ENSIGHTEN_PRIVACY_Performance', '1');
  cy.setCookie('AUDI_ENSIGHTEN_PRIVACY_Functional', '1');
  cy.intercept('https://api.audiusa.com/graphql').as('balrog');
  cy.visit(Cypress.env('all-offers-live-en'));
  //cy.intercept('https://qa-api.audiusa.com/graphql').as('balrog');
  //cy.visit(Cypress.env('all-offers-staging-en'));
  //cy.wait('@balrog')
  cy.url().should('include', 'promotions');
});

describe('NARSHOP-825: Verify all offers frontend data matches with backend', () => {
  it('NARSHOP-801,806,831,832:VAN - verify offers data', function () {
    cy.get(selectors.carTitle, { timeout: 10000 }).eq(0).should('be.visible');
    const van = allOffers
      .sort((a, b) => {
        return modelNames.indexOf(a.modelName) - modelNames.indexOf(b.modelName);
      })
      .filter((promotion) => promotion.dag === 'VAN');

    const vanNew = van.sort((a, b) => {
      if (a.featuredOffer !== b.featuredOffer) {
        return a.featuredOffer ? -1 : 1;
      }

      if (a.featuredHierarchy === null) return 1;
      if (b.featuredHierarchy === null) return -1;
      return a.featuredHierarchy - b.featuredHierarchy;
    });

    let modelNameFromRFC = [];
    if (vanNew.length > 0) {
      for (var i = 0; i < vanNew.length; i++) {
        modelNameFromRFC[i] = vanNew[i].modelId;
      }
    }

    cy.get('[id="count-number"]')
      .invoke('text')
      .then((offersResults) => {
        cy.get(selectors.filtersToggle).first().click({ force: true });
        cy.get(selectors.showOffersBtn)
          .first()
          .invoke('text')
          .then((text) => {
            expect(text).to.contain(offersResults);
          });
        // cy.get(showOffersBtn).should(($el) => {
        // access the native DOM element
        //     expect($el.get(0).innerText).to.eq(`Show ${count} results`)
        //})

        cy.get(selectors.NAT).find('button').click();
        cy.get(selectors.VAN).first().click({ force: true });
        cy.get(selectors.NAT).find('button').parent().should('have.attr', 'aria-checked', 'false');
        cy.get(selectors.VAN).should('have.attr', 'aria-checked', 'true');
        cy.get(selectors.showOffersBtn).click();
        cy.get(selectors.showOffersBtn).should('not.exist');
        cy.get(selectors.carTitle).eq(0).should('be.visible');
      });
    cy.get(selectors.dagOfferText).eq(0).should('have.text', 'Vancouver area offer');

    cy.get(selectors.carTitle).each((element, index) => {
      cy.wrap(element).should('contain', vanNew[index].modelName);
    });

    cy.get(selectors.lease).each((element, index) => {
      cy.wrap(element).should(
        'contain',
        vanNew[index].offers[0].offertypes[1].leaseRate.toFixed(2),
      );
    });

    cy.get(selectors.leasePeriod).each((element, index) => {
      cy.wrap(element).should('contain', vanNew[index].offers[0].offertypes[1].leasePeriod);
    });

    cy.get(selectors.leaseBiWeeklyPayments).each((element, index) => {
      cy.wrap(element).should('contain', vanNew[index].offers[0].offertypes[0].leaseMinimumPayment);
    });

    //for lease down payment
    cy.get(selectors.leaseBiWeeklyPayments)
      .next()
      .each((element, index) => {
        cy.wrap(element).should(
          'contain',
          dollarUSLocale.format(vanNew[index].offers[0].offertypes[0].leaseDownPayment),
        );
      });

    cy.get(selectors.buildYourAudiCTA).each((element, index) => {
      cy.wrap(element).should('have.attr', 'href', van[index].configuratorUrlEn);
    });

    console.log('MODEL RFC: ', modelNameFromRFC);
    console.log('VAN NEW: ', vanNew);
    cy.get(selectors.legalBtn).each((element, index) => {
      cy.wrap(element).click();
      cy.wait(2000);
      cy.get(selectors.legalText).should('contain', 'February 28');
      // .and('contain', vanNew[index].modelName.slice(0, 2));
      // .and('contain', modelNameFromRFC[index]);
      cy.get(selectors.legalText).should('contain', 'including $2,850 freight and PDI');
      //cy.get(selectors.legalText).should('contain', vanNew[index].modelName.slice(0, 2));
      cy.get(selectors.legalCloseBtn).click();
      cy.get(selectors.legalCloseBtn).should('not.exist');
    });
  });

  it('NARSHOP-800:GTA - verify offers data', function () {
    const gta = allOffers
      .sort((a, b) => {
        return modelNames.indexOf(a.modelName) - modelNames.indexOf(b.modelName);
      })
      .filter((promotion) => promotion.dag === 'GTA');

    const gtaNew = gta.sort((a, b) => {
      const hierarchyA = a.featuredHierarchy || Infinity;
      const hierarchyB = b.featuredHierarchy || Infinity;
      if (a.featuredOffer && b.featuredOffer && a.dag === b.dag && hierarchyA < hierarchyB)
        return -1;
      if (a.featuredOffer && b.featuredOffer && a.dag === b.dag && hierarchyA > hierarchyB)
        return 1;
      a.modelFamily === b.modelFamily ? b.year - a.year : 0;
    });
    console.log('####', gtaNew);

    cy.get('[id="count-number"]')
      .invoke('text')
      .then((offersResults) => {
        cy.get(selectors.filtersToggle).click();
        cy.get(selectors.showOffersBtn)
          .invoke('text')
          .then((text) => {
            expect(text).to.contain(offersResults);
          });
        cy.get(selectors.NAT).find('button').click();
        cy.get(selectors.GTA).first().click({ force: true });
        cy.get(selectors.NAT).find('button').parent().should('have.attr', 'aria-checked', 'false');
        cy.get(selectors.GTA).should('have.attr', 'aria-checked', 'true');
        cy.get(selectors.showOffersBtn).click();
        cy.get(selectors.showOffersBtn).should('not.exist');
        cy.get(selectors.carTitle).eq(0).should('be.visible');
      });
    cy.get(selectors.dagOfferText).eq(0).should('have.text', 'Toronto area offer');

    console.log('Toronto', gtaNew);

    cy.get(selectors.carTitle).each((element, index) => {
      cy.wrap(element).should('contain', gtaNew[index].modelName);
    });

    cy.get(selectors.lease).each((element, index) => {
      cy.wrap(element).should(
        'contain',
        gtaNew[index].offers[0].offertypes[1].leaseRate.toFixed(2),
      );
    });

    cy.get(selectors.leasePeriod).each((element, index) => {
      cy.wrap(element).should('contain', gtaNew[index].offers[0].offertypes[1].leasePeriod);
    });

    cy.get(selectors.leaseBiWeeklyPayments).each((element, index) => {
      cy.wrap(element).should(
        'contain',
        dollarUSLocale.format(gtaNew[index].offers[0].offertypes[0].leaseMinimumPayment),
      );
    });

    cy.get(selectors.leaseBiWeeklyPayments)
      .next()
      .each((element, index) => {
        cy.wrap(element).should(
          'contain',
          dollarUSLocale.format(gtaNew[index].offers[0].offertypes[0].leaseDownPayment),
        );
      });

    const gta2 = allOffers
      .sort((a, b) => {
        return modelNames.indexOf(a.modelName) - modelNames.indexOf(b.modelName);
      })
      .filter((promotion) => promotion.dag === 'GTA' && promotion.configuratorUrlEn != null);

    const gta2New = gta2.sort((a, b) => {
      const hierarchyA = a.featuredHierarchy || Infinity;
      const hierarchyB = b.featuredHierarchy || Infinity;
      if (a.featuredOffer && b.featuredOffer && a.dag === b.dag && hierarchyA < hierarchyB)
        return -1;
      if (a.featuredOffer && b.featuredOffer && a.dag === b.dag && hierarchyA > hierarchyB)
        return 1;
      a.modelFamily === b.modelFamily ? b.year - a.year : 0;
    });

    let modelNameFromRFC = [];
    if (gta2New.length > 0) {
      for (var i = 0; i < gta2New.length; i++) {
        modelNameFromRFC[i] = gta2New[i].modelId;
      }
    }

    cy.get(selectors.buildYourAudiCTA).each((element, index) => {
      cy.wrap(element).should('have.attr', 'href', gta2New[index].configuratorUrlEn);
      console.log(gta2New[index].configuratorUrlEn);
    });
    const gta3 = allOffers
      .sort((a, b) => {
        return modelNames.indexOf(a.modelName) - modelNames.indexOf(b.modelName);
      })
      .filter((promotion) => promotion.dag === 'GTA' && promotion.configuratorUrlEn === null);

    gta3.forEach(function (record) {
      if (record.configuratorUrlEn === null) {
        record.configuratorUrlEn = 'disabled';
      }
    });

    //cy.get(buildYourAuidCTA_Dis).each((element, index) => {
    //cy.wrap(element).should('have.attr', 'disabled', gta3[index].configuratorUrlEn)
    //console.log(gta3[index].configuratorUrlEn)
    //})

    // cy.get(buildYourAudiCTA).first().should('have.attr', 'href', gta[0].configuratorUrlEn)

    console.log(modelNameFromRFC);
    cy.get(selectors.legalBtn).each((element, index) => {
      cy.wrap(element).click();
      cy.get(selectors.legalText).should('contain', 'Offers end February 28, 2025');
      //.and('contain', modelNameFromRFC[index]);
      cy.get(selectors.legalText).should('contain', 'including $2,850 freight and PDI');
      cy.get(selectors.legalCloseBtn).click();
      cy.get(selectors.legalCloseBtn).should('not.exist');
    });
  });

  it('NARSHOP-799:MTL - verify offers data', function () {
    const mtl = allOffers
      .sort((a, b) => {
        return modelNames.indexOf(a.modelName) - modelNames.indexOf(b.modelName);
      })
      .filter((promotion) => promotion.dag === 'MTL');

    const mtlNew = mtl.sort((a, b) => {
      const hierarchyA = a.featuredHierarchy || Infinity;
      const hierarchyB = b.featuredHierarchy || Infinity;
      if (hierarchyA < hierarchyB) return -1;
      if (hierarchyA > hierarchyB) return 1;
    });

    let modelNameFromRFC = [];
    if (mtlNew.length > 0) {
      for (var i = 0; i < mtlNew.length; i++) {
        modelNameFromRFC[i] = mtlNew[i].modelId;
      }
    }

    cy.get('[id="count-number"]')
      .invoke('text')
      .then((offersResults) => {
        cy.get(selectors.filtersToggle).click();
        cy.get(selectors.showOffersBtn)
          .invoke('text')
          .then((text) => {
            expect(text).to.contain(offersResults);
          });
        cy.get(selectors.NAT).find('button').click();
        cy.get(selectors.MTL).first().click({ force: true });
        cy.get(selectors.NAT).find('button').parent().should('have.attr', 'aria-checked', 'false');
        cy.get(selectors.MTL).should('have.attr', 'aria-checked', 'true');
        cy.get(selectors.showOffersBtn).click();
        cy.get(selectors.showOffersBtn).should('not.exist');
        cy.get(selectors.carTitle).eq(0).should('be.visible');
      });
    cy.get(selectors.dagOfferText).eq(0).should('have.text', 'Montreal area offer');

    console.log('Montreal', mtlNew);
    cy.get(selectors.mtlTrimName).each((element, index) => {
      cy.wrap(element).should('contain', mtlNew[index].mtlTrimName);
    });
    cy.get(selectors.mtlPrice).each((element, index) => {
      cy.wrap(element).should('contain', dollarUSLocale.format(mtlNew[index].msrp));
    });

    cy.get(selectors.carTitle).each((element, index) => {
      cy.wrap(element).should('contain', mtlNew[index].modelName);
    });

    cy.get(selectors.lease).each((element, index) => {
      cy.wrap(element).should(
        'contain',
        mtlNew[index].offers[0].offertypes[1].leaseRate.toFixed(2),
      );
    });

    cy.get(selectors.leasePeriod).each((element, index) => {
      cy.wrap(element).should('contain', mtlNew[index].offers[0].offertypes[1].leasePeriod);
    });

    cy.get(selectors.leaseBiWeeklyPayments).each((element, index) => {
      cy.wrap(element).should(
        'contain',
        dollarUSLocale.format(
          Math.round(mtlNew[index].offers[0].offertypes[0].leaseMinimumPayment.toFixed(0)),
        ),
      );
    });

    cy.get(selectors.leaseBiWeeklyPayments)
      .next()
      .each((element, index) => {
        cy.wrap(element).should(
          'contain',
          dollarUSLocale.format(mtlNew[index].offers[0].offertypes[0].leaseDownPayment.toFixed(0)),
        );
      });

    cy.get(selectors.buildYourAudiCTA).each((element, index) => {
      cy.wrap(element).should('have.attr', 'href', mtl[index].configuratorUrlEn);
    });

    cy.get(selectors.legalBtn).each((element, index) => {
      cy.wrap(element).click();
      cy.get(selectors.legalText).should('contain', 'February 28');
      //.and('contain', modelNameFromRFC[index]);
      cy.get(selectors.legalText).should('contain', '2,850 freight and PDI');
      cy.get(selectors.legalCloseBtn).click();
      cy.get(selectors.legalCloseBtn).should('not.exist');
    });
  });
});
