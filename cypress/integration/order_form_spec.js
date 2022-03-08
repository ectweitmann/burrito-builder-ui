describe('Feedback Loop login flows', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:3001/api/v1/orders', { fixture: 'orders' }).as('getOrders')
    cy.visit('http://localhost:3000/?name=&sofritas=');
    cy.wait(['@getOrders']);
  })

  it('should be able to add their name and ingredients to their order', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', { fixture: 'newOrder' }).as('postOrder')
    cy.get('input[name=name]').type('Ethan');
    cy.get('button[value=carnitas]').click();
    cy.get('button').contains('Submit Order').click();
    cy.wait(['@postOrder']);
    cy.get('.order').last()
      .contains('h3', 'Ethan')
    cy.get('.ingredient-list').last()
      .contains('li', 'carnitas');
  });
});
