describe('connect wallet spec', () => {
  before(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('should login with with injected preloaded wallet', () => {
    Cypress.config('includeShadowDom', true);
    cy.importMetamaskAccount(
      '68f51b43323f4750dba98c2fa68dea151c513aab83bc93e73aab01e9c55a2d42',
    );
    cy.get('w3m-connect-button').should('be.visible').click();z
    cy.get('wui-flex > wui-list-wallet:nth-child(3)').click();
    cy.acceptMetamaskAccess();
    cy.contains('Holesky').click();
    cy.allowMetamaskToAddNetwork();
    cy.allowMetamaskToSwitchNetwork();
    cy.get('#__next > div > header > div > div:nth-child(3) > button > p').should(
      'have.text',
      '0xeBA9...e6Af47',
    );
  });
});
