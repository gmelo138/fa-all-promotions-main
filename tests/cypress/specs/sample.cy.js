/// <reference types="cypress" />

describe('All Promotions FA', () => {
  let selectors;
  // Load selectors from fixture before each test
  beforeEach(() => {
    // Load the selectors data from the fixture
    cy.fixture('selectors').then((data) => {
      selectors = data;
    });
  });

  describe('Promotions Page', () => {
    it('should render vehicles with offers on the page', () => {
      // Handle uncaught exceptions to prevent test failures
      cy.on('uncaught:exception', (err) => {
        expect(err.message);
        return false;
      });
      // Visit the specified URL
      cy.visit('https://www.audi.ca/ca/web/en/promotions.html');
      // Click on the banner element
      cy.get(selectors.banner, { timeout: 5000 }).click({ force: true });
      // Scroll down the page to ensure the elements are in view
      cy.window().then((win) => {
        win.scrollBy(0, 300);
      });
      // Wait for 5 seconds to ensure the page content is loaded
      cy.wait(5000);
      // Scroll into view and click on the first result
      cy.get(selectors.results).eq(0).scrollIntoView({ duration: 500 }).should('exist').click();
    });
  });
});
