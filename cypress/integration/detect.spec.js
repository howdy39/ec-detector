describe('Detectable EC', function() {
  it('Detectable STORESJP', function() {
    cy.visit('https://techthetoaster.stores.jp');
    cy.get('html[ng-app]').should('attr', 'ng-app', 'StoresJp');
  });

  it('Detectable BASE', function() {
    cy.visit('https://senbei.saleshop.jp');
    cy.get('meta[content="BASE"]').should('exist');
  });

  it('Detectable SHOPIFY', function() {
    cy.visit('https://jp.kurasu.kyoto');
    cy.get('[src*="cdn.shopify.com"]').should('exist');
  });
});
