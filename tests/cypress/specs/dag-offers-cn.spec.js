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
  cy.visit(Cypress.env('all-offers-live-cn'));
  //cy.intercept('https://qa-api.audiusa.com/graphql').as('balrog')
  //cy.visit(Cypress.env('all-offers-staging-cn'))
  //cy.wait('@balrog')
  cy.url().should('include', 'promotions');
  cy.get(selectors.carTitle, { timeout: 10000 }).eq(0).should('be.visible');
});

describe.skip('Verify all offers frontend data matches with backend', () => {
  it('VAN - verify offers data', function () {
    const van = allOffers
      .sort((a, b) => {
        return modelNames.indexOf(a.modelName) - modelNames.indexOf(b.modelName);
      })
      .filter((promotion) => promotion.dag === 'VAN');

    cy.get('[id="count-number"]')
      .invoke('text')
      .then((offersResults) => {
        cy.get(selectors.filtersToggle).click();
        cy.get(selectors.showOffersBtn)
          .invoke('text')
          .then((text) => {
            expect(text).to.contain(offersResults);
          });
        cy.get('[data-testid="NAT"]').find('button').click();
        cy.get('[data-testid="VAN"]').first().click({ force: true });
        cy.get('[data-testid="NAT"]')
          .find('button')
          .parent()
          .should('have.attr', 'aria-checked', 'false');
        cy.get('[data-testid="VAN"]').should('have.attr', 'aria-checked', 'true');
        cy.get(selectors.showOffersBtn).click();
        cy.get(selectors.showOffersBtn).should('not.exist');
        cy.get(selectors.carTitle).eq(0).should('be.visible');
      });
    cy.get(selectors.dagOfferText).eq(0).should('have.text', '温哥华优惠');

    cy.get(selectors.carTitle).each((element, index) => {
      cy.wrap(element).should('contain', van[index].modelName);
    });

    cy.get(selectors.lease).each((element, index) => {
      cy.wrap(element).should('contain', van[index].offers[0].offertypes[1].leaseRate.toFixed(2));
    });

    cy.get(selectors.leasePeriod).each((element, index) => {
      cy.wrap(element).should('contain', van[index].offers[0].offertypes[1].leasePeriod);
    });

    cy.get(selectors.leaseBiWeeklyPayments).each((element, index) => {
      cy.wrap(element).should('contain', van[index].offers[0].offertypes[0].leaseMinimumPayment);
    });

    cy.get(selectors.leaseDownPayment).each((element, index) => {
      cy.wrap(element).should(
        'contain',
        dollarUSLocale.format(van[index].offers[0].offertypes[0].leaseDownPayment),
      );
    });

    // cy.get(buildYourAudiCTA).each((element, index) => {
    //    cy.wrap(element).should('have.attr', 'href', van[index].configuratorUrlEn)
    // })

    cy.get(selectors.legalBtn).each((element, index) => {
      cy.wrap(element).click();
      cy.get(selectors.legalText)
        .should('contain', '31')
        .and('contain', '10')
        .and('contain', '2023');
      cy.get(selectors.legalText).should('contain', '2,850');
      // .and('contain', van[index].trimName)
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

    const gtaNew = gta.sort((a, b) => (a.modelFamily === b.modelFamily ? b.year - a.year : 0));

    cy.get('[id="count-number"]')
      .invoke('text')
      .then((offersResults) => {
        cy.get(selectors.filtersToggle).click();
        cy.get(selectors.showOffersBtn)
          .invoke('text')
          .then((text) => {
            expect(text).to.contain(offersResults);
          });
        cy.get('[data-testid="NAT"]').find('button').click();
        cy.get('[data-testid="GTA"]').first().click({ force: true });
        cy.get('[data-testid="NAT"]')
          .find('button')
          .parent()
          .should('have.attr', 'aria-checked', 'false');
        cy.get('[data-testid="GTA"]').should('have.attr', 'aria-checked', 'true');
        cy.get(selectors.showOffersBtn).click();
        cy.get(selectors.showOffersBtn).should('not.exist');
        cy.get(selectors.carTitle).eq(0).should('be.visible');
      });
    cy.get(selectors.dagOfferText).eq(0).should('have.text', '多伦多优惠');

    cy.get(selectors.carTitle).each((element, index) => {
      cy.wrap(element).should('contain', gtaNew[index].modelFamily);
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
      cy.wrap(element).should('contain', gtaNew[index].offers[0].offertypes[0].leaseMinimumPayment);
    });

    cy.get(selectors.leaseDownPayment).each((element, index) => {
      cy.wrap(element).should(
        'contain',
        dollarUSLocale.format(gtaNew[index].offers[0].offertypes[0].leaseDownPayment),
      );
    });

    // cy.get(buildYourAudiCTA).each((element, index) => {
    //     cy.wrap(element).should('have.attr', 'href', gta[index].configuratorUrlEn)
    // })

    cy.get(selectors.legalBtn).each((element, index) => {
      cy.wrap(element).click();
      cy.get(selectors.legalText)
        .should('contain', '31')
        .and('contain', '10')
        .and('contain', '2023');
      cy.get(selectors.legalText).should('contain', '2,850');
      // .and('contain', gta[index].trimName)
      cy.get(selectors.legalCloseBtn).click();
      cy.get(selectors.legalCloseBtn).should('not.exist');
    });
  });
});
