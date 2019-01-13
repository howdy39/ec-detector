describe('Detectable EC', function() {
  it('Detectable STORESJP', function() {
    cy.visit('https://techthetoaster.stores.jp');
    cy.get('html[ng-app]').should('attr', 'ng-app', 'StoresJp');
  });

  it('Detectable BASE', function() {
    cy.visit('https://senbei.saleshop.jp');
    cy.get('meta[content="BASE"]').should('exist');
  });
});
