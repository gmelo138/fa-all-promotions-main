describe('Welcome', () => {
  it('should not log any errors', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win.console, 'error').as('consoleError');
      },
    });

    cy.get('@consoleError').should('not.be.called');
  });

  it('should render the title on the page', () => {
    cy.visit('/');
    cy.get('[data-test-id=welcome]').should('be.visible');
  });
});
