/// <reference types="cypress" />
import allOffers from '../fixtures/all-offers-data.json';
import modelNames from '../fixtures/modelNamesSortOrder.json';
import selectors from '../fixtures/selectors.json';

const dollarUSLocale = Intl.NumberFormat('en-US', {
  style: 'decimal',
  currency: 'USD',
  minimumFractionDigits: 0,
});

beforeEach(() => {
  let selectors;
  cy.fixture('selectors').then((data) => {
    selectors = data;
  });
  cy.viewport('macbook-15');
  cy.setCookie('AUDI_ENSIGHTEN_PRIVACY_BANNER_VIEWED', '1');
  cy.setCookie('AUDI_ENSIGHTEN_PRIVACY_Do_Not_Track', '1');
  cy.setCookie('AUDI_ENSIGHTEN_PRIVACY_Performance', '1');
  cy.setCookie('AUDI_ENSIGHTEN_PRIVACY_Functional', '1');
  cy.visit(Cypress.env('all-offers-live-en'));
  //cy.visit(Cypress.env('all-offers-staging-en'));
  cy.url().should('include', 'promotions');

  cy.get('#count-number').invoke('text').as('offersTotalResults');
});

describe('NARSHOP-829:Verify all offers frontend data matches with backend', () => {
  it('NARSHOP-798,805,827,838: NAT Lease - verify offers data', function () {
    cy.get(selectors.carTitle, { timeout: 10000 }).eq(0).should('be.visible');
    const nat = allOffers
      .sort((a, b) => {
        return modelNames.indexOf(a.modelName) - modelNames.indexOf(b.modelName);
      })
      .filter((promotion) => promotion.dag === 'NAT');

    cy.get(selectors.filtersToggle).first().click({ force: true });
    cy.get(selectors.NAT).find('button').parent().should('have.attr', 'aria-checked', 'true');
    cy.get(selectors.showOffersBtn).click();
    console.log('NAT');
    console.log(nat);
    const natNew = nat.sort((a, b) => {
      const hierarchyA = a.featuredHierarchy || Infinity;
      const hierarchyB = b.featuredHierarchy || Infinity;
      if (hierarchyA < hierarchyB) return -1;
      if (hierarchyA > hierarchyB) return 1;
    });

    let modelNameFromRFC = [];
    if (natNew.length > 0) {
      for (var i = 0; i < natNew.length; i++) {
        modelNameFromRFC[i] = natNew[i].modelId;
      }
    }

    console.log('Nat new sort');
    for (let i = 0; i < natNew.length; i++) {
      console.log('nat model: ' + natNew[i].modelName);
    }

    const loadMoreOffersCounter = Math.floor(this.offersTotalResults / 10);
    for (let n = 0; n < loadMoreOffersCounter; n++) {
      cy.wait(2000);
      cy.get(selectors.loadMoreOffersBtn).first().scrollIntoView().click();
    }
    cy.get(selectors.loadMoreOffersBtn).should('not.exist');
    cy.get(selectors.carTitle).eq(0).should('be.visible');

    cy.get(selectors.carTitle).should(($carNames) => {
      const carTitles = Cypress._.map($carNames, ($name) => $name.innerText);
      console.log(carTitles);
      const sorted = Cypress._.sortBy(carTitles);
      //expect(carTitles, "NAT carTitles").to.deep.equal(sortedCarsNamesNAT);
      //expect(carTitles, "NAT carTitles to be displayed in the correct order")
      //.to.have.ordered.members(sortedCarsNamesNAT);
    });

    cy.get(selectors.carTitle).each((element, index) => {
      cy.log(index);
      console.log('Index: ' + index, 'Vehicle:' + natNew[index].modelName);
      cy.wrap(element).should('contain', natNew[index].modelName);
    });

    cy.get(selectors.lease).each((element, index) => {
      cy.wrap(element).should(
        'contain',
        natNew[index].offers[0].offertypes[1].leaseRate.toFixed(2),
      );
    });

    cy.get(selectors.leasePeriod).each((element, index) => {
      cy.wrap(element).should('contain', natNew[index].offers[0].offertypes[1].leasePeriod);
    });

    cy.get(selectors.leaseBiWeeklyPayments).each((element, index) => {
      cy.wrap(element).should(
        'contain',
        dollarUSLocale.format(
          Math.round(natNew[index].offers[0].offertypes[0].leaseMinimumPayment.toFixed(2)),
        ),
      );
    });

    cy.get(selectors.leaseBiWeeklyPayments)
      .next()
      .each((element, index) => {
        cy.wrap(element).should(
          'contain',
          dollarUSLocale.format(
            Math.round(natNew[index].offers[0].offertypes[0].leaseDownPayment.toFixed(0)),
          ),
        );
      });

    /*cy.get(buildYourAudiCTA).each((element, index) => {
      console.log("Nat new: " + natNew[index].modelName + " url: " + natNew[index].configuratorUrlEn)
      cy.wrap(element).should(
        "have.attr",
        "href",
        natNew[index].configuratorUrlEn
      );
    });*/

    cy.get(selectors.legalBtn).each((element, index) => {
      cy.wrap(element).click();
      cy.get(selectors.legalText).should('contain', 'Offers end February 28, 2025');
      //.and('contain', modelNameFromRFC[index]);
      cy.get(selectors.legalText).should('contain', '$2,850 freight and PDI');
      cy.get(selectors.legalCloseBtn).click();
      cy.get(selectors.legalCloseBtn).should('not.exist');
    });
  });

  it('NARSHOP-839,841,842,843:NAT Finance - verify offers data', function () {
    const nat = allOffers
      .sort((a, b) => {
        return modelNames.indexOf(a.modelName) - modelNames.indexOf(b.modelName);
      })
      .filter((promotion) => promotion.dag === 'NAT');

    const natNew = nat.sort((a, b) => {
      const hierarchyA = a.featuredHierarchy || Infinity;
      const hierarchyB = b.featuredHierarchy || Infinity;
      if (hierarchyA < hierarchyB) return -1;
      if (hierarchyA > hierarchyB) return 1;
    });

    let modelNameFromRFC = [];
    if (natNew.length > 0) {
      for (var i = 0; i < natNew.length; i++) {
        modelNameFromRFC[i] = natNew[i].modelId;
      }
    }

    const loadMoreOffersCounter = Math.floor(this.offersTotalResults / 10);
    for (let n = 0; n < loadMoreOffersCounter; n++) {
      cy.get(selectors.loadMoreOffersBtn).first().click();
    }
    cy.get(selectors.loadMoreOffersBtn).should('not.exist');
    cy.get(selectors.carTitle).eq(0).should('be.visible');

    cy.get(selectors.carTitle).should(($carNames) => {
      const carTitles = Cypress._.map($carNames, ($name) => $name.innerText);
      console.log(carTitles);
      // const sorted = Cypress._.sortBy(carTitles)
      // expect(carTitles, "NAT carTitles").to.deep.equal(sortedCarsNamesNAT);
      // expect(carTitles, "NAT carTitles to be displayed in the correct order")
      //     .to.have.ordered.members(sortedCarsNamesNAT);
    });

    cy.get('[role="tablist"] li:nth-child(2)').each((element, index) => {
      cy.get(element).click();
    });
    cy.get(selectors.leasePeriod).each((element, index) => {
      cy.wrap(element).should('contain', natNew[index].offers[1].offertypes[1].financePeriod);
    });
    cy.get(selectors.lease).each((element, index) => {
      cy.wrap(element).should(
        'contain',
        natNew[index].offers[1].offertypes[1].financeRate.toFixed(2),
      );
    });
    cy.get(selectors.leaseBiWeeklyPayments)
      .next()
      .each((element, index) => {
        cy.wrap(element).should(
          'contain',
          dollarUSLocale.format(
            Math.round(natNew[index].offers[1].offertypes[0].financeDownPayment.toFixed(0)),
          ),
        );
      });
    cy.get(selectors.leaseBiWeeklyPayments).each((element, index) => {
      cy.wrap(element).should(
        'contain',
        dollarUSLocale.format(Math.round(nat[index].offers[1].offertypes[0].financeMinimumPayment)),
      );
    });

    cy.get(selectors.legalBtn).each((element, index) => {
      cy.wrap(element).click();
      cy.get(selectors.legalText).should('contain', 'Offers end February 28, 2025');
      //.and('contain', modelNameFromRFC[index]);
      cy.get(selectors.legalText).should('contain', '$2,850 freight and PDI');
      cy.get(selectors.legalCloseBtn).click();
      cy.get(selectors.legalCloseBtn).should('not.exist');
    });
  });
});
