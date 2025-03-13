import allOffers from '../fixtures/all-offers-data.json';
import modelNames from '../fixtures/modelNamesSortOrder.json';

const dollarUSLocale = Intl.NumberFormat('en-US', {
  style: 'decimal',
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
  cy.visit(Cypress.env('all-offers-live-fr'));
  //cy.intercept('https://qa-api.audiusa.com/graphql').as('balrog');
  //cy.visit(Cypress.env('all-offers-staging-fr'));
  //cy.wait('@balrog')
  cy.url().should('include', 'promotions');
});

describe('NARSHOP:824: Verify all offers frontend data matches with backend', () => {
  it('VAN - verify offers data', function () {
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
        cy.get(selectors.filtersToggle).click();
        cy.get(selectors.showOffersBtn)
          .invoke('text')
          .then((text) => {
            expect(text).to.contain(offersResults);
          });
        cy.get(selectors.NAT).find('button').click();
        cy.get(selectors.VAN).first().click({ force: true });
        cy.get(selectors.NAT).find('button').parent().should('have.attr', 'aria-checked', 'false');
        cy.get(selectors.VAN).should('have.attr', 'aria-checked', 'true');
        cy.get(selectors.showOffersBtn).click();
        cy.get(selectors.showOffersBtn).should('not.exist');
        cy.get(selectors.carTitle).eq(0).should('be.visible');
      });
    cy.get(selectors.dagOfferText).eq(0).should('have.text', 'Offre Vancouver');

    cy.get(selectors.carTitle).each((element, index) => {
      cy.wrap(element).should('contain', vanNew[index].modelName);
    });

    cy.get(selectors.lease).each((element, index) => {
      cy.wrap(element).should(
        'contain',
        vanNew[index].offers[0].offertypes[1].leaseRate.toFixed(2).replace(/\./g, ','),
      );
    });

    cy.get(selectors.leasePeriod).each((element, index) => {
      cy.wrap(element).should('contain', vanNew[index].offers[0].offertypes[1].leasePeriod);
    });

    cy.get(selectors.leaseBiWeeklyPayments).each((element, index) => {
      cy.wrap(element).should('contain', vanNew[index].offers[0].offertypes[0].leaseMinimumPayment);
    });

    cy.get(selectors.leaseBiWeeklyPayments)
      .next()
      .each((element, index) => {
        cy.wrap(element).should(
          'contain',
          dollarUSLocale
            .format(vanNew[index].offers[0].offertypes[0].leaseDownPayment)
            .replace(/,/g, ' '),
        );
      });

    cy.get(selectors.buildYourAudiCTA).each((element, index) => {
      cy.wrap(element).should('have.attr', 'href', vanNew[index].configuratorUrlFr);
    });

    cy.get(selectors.legalBtn).each((element, index) => {
      cy.wrap(element).click();
      cy.get(selectors.legalText).and('contain', '28 février 2025');
      //.and("contain", modelNameFromRFC[index]);
      /*cy.get(selectors.legalText).should(
        'contain',
        'incluant 2 850 $ de transport et de préparation',
      );*/
      cy.get(selectors.legalCloseBtn).click();
      cy.get(selectors.legalCloseBtn).should('not.exist');
    });
  });

  it('GTA - verify offers data', function () {
    const gta = allOffers
      .sort((a, b) => {
        return modelNames.indexOf(a.modelName) - modelNames.indexOf(b.modelName);
      })
      .filter((promotion) => promotion.dag === 'GTA');

    const gtaNew = gta.sort((a, b) => {
      const hierarchyA = a.featuredHierarchy || Infinity;
      const hierarchyB = b.featuredHierarchy || Infinity;
      if (hierarchyA < hierarchyB) return -1;
      if (hierarchyA > hierarchyB) return 1;
    });

    let modelNameFromRFC = [];
    if (gtaNew.length > 0) {
      for (var i = 0; i < gtaNew.length; i++) {
        modelNameFromRFC[i] = gtaNew[i].modelId;
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
        cy.get(selectors.GTA).first().click({ force: true });
        cy.get(selectors.NAT).find('button').parent().should('have.attr', 'aria-checked', 'false');
        cy.get(selectors.GTA).should('have.attr', 'aria-checked', 'true');
        cy.get(selectors.showOffersBtn).click();
        cy.get(selectors.showOffersBtn).should('not.exist');
        cy.get(selectors.carTitle).eq(0).should('be.visible');
      });
    cy.get(selectors.dagOfferText).eq(0).should('have.text', 'Offre Toronto');

    cy.get(selectors.carTitle).each((element, index) => {
      cy.wrap(element).should('contain', gtaNew[index].modelName);
    });

    cy.get(selectors.lease).each((element, index) => {
      cy.wrap(element).should(
        'contain',
        gtaNew[index].offers[0].offertypes[1].leaseRate.toFixed(2).replace(/\./g, ','),
      );
    });

    cy.get(selectors.leasePeriod).each((element, index) => {
      cy.wrap(element).should('contain', gtaNew[index].offers[0].offertypes[1].leasePeriod);
    });

    cy.get(selectors.leaseBiWeeklyPayments).each((element, index) => {
      cy.wrap(element).should(
        'contain',
        dollarUSLocale
          .format(gtaNew[index].offers[0].offertypes[0].leaseMinimumPayment)
          .replace(/,/g, ' '),
      );
    });

    cy.get(selectors.leaseBiWeeklyPayments)
      .next()
      .each((element, index) => {
        cy.wrap(element).should(
          'contain',
          dollarUSLocale
            .format(gtaNew[index].offers[0].offertypes[0].leaseDownPayment)
            .replace(/,/g, ' '),
        );
      });

    // cy.get(buildYourAudiCTA).each((element, index) => {
    //     cy.wrap(element).should('have.attr', 'href', gta[index].configuratorUrlEn)
    // })

    cy.get(selectors.legalBtn).each((element, index) => {
      cy.wrap(element).click();
      cy.get(selectors.legalText).should('contain', '28 février 2025');
      //cy.get(selectors.legalText).should('contain', 'incluant 2 850 $ de frais de transport');
      cy.get(selectors.legalCloseBtn).click();
      cy.get(selectors.legalCloseBtn).should('not.exist');
    });
  });

  it('MTL - verify offers data', function () {
    const mtl = allOffers
      .sort((a, b) => {
        return modelNames.indexOf(a.modelName) - modelNames.indexOf(b.modelName);
      })
      .filter((promotion) => promotion.dag === 'MTL');

    let mtlNew = mtl.sort((a, b) => {
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

    console.log('Model Name from: ', modelNameFromRFC);
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
    cy.get(selectors.dagOfferText).eq(0).should('have.text', 'Offre Montreal');

    cy.get(selectors.mtlTrimName).each((element, index) => {
      cy.wrap(element).should('contain', mtlNew[index].mtlTrimName);
    });
    cy.get(selectors.mtlPrice).each((element, index) => {
      cy.wrap(element).should(
        'contain',
        dollarUSLocale.format(mtlNew[index].msrp).replace(/,/g, ' '),
      );
    });

    cy.get(selectors.carTitle).each((element, index) => {
      cy.wrap(element).should('contain', mtlNew[index].modelName);
    });

    cy.get(selectors.lease).each((element, index) => {
      cy.wrap(element).should(
        'contain',
        mtlNew[index].offers[0].offertypes[1].leaseRate.toFixed(2).replace(/\./g, ','),
      );
    });

    cy.get(selectors.leasePeriod).each((element, index) => {
      cy.wrap(element).should('contain', mtlNew[index].offers[0].offertypes[1].leasePeriod);
    });

    cy.get(selectors.leaseBiWeeklyPayments).each((element, index) => {
      cy.wrap(element).should(
        'contain',
        dollarUSLocale
          .format(mtlNew[index].offers[0].offertypes[0].leaseMinimumPayment.toFixed(0))
          .replace(/,/g, ' '),
      );
    });

    cy.get(selectors.leaseBiWeeklyPayments)
      .next()
      .each((element, index) => {
        cy.wrap(element).should(
          'contain',
          dollarUSLocale
            .format(mtlNew[index].offers[0].offertypes[0].leaseDownPayment.toFixed(0))
            .replace(/,/g, ' '),
        );
      });

    // cy.get(buildYourAudiCTA).each((element, index) => {
    //     cy.wrap(element).should('have.attr', 'href', mtl[index].configuratorUrlFr)
    // })

    cy.get(selectors.legalCheck).each((element, index) => {
      cy.wrap(element).click();
      cy.get(selectors.legalText).should('contain', '28 février 2025');
      // .and('contain', 'mai')
      //.and("contain", modelNameFromRFC[index]);
      cy.get(selectors.legalCloseBtn).click();
      cy.get(selectors.legalCloseBtn).should('not.exist');
    });
  });
});
