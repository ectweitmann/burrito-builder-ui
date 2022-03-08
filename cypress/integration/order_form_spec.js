describe('Burrito Builder user flows', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:3001/api/v1/orders', { fixture: 'orders' }).as('getOrders');
    cy.visit('http://localhost:3000/?name=&sofritas=');
    cy.wait(['@getOrders']);
  })

  it('should start off with three orderers submitted and an empty order form', () => {
    cy.get('input[name=name]').should('have.value', '');
    cy.get('form').children('button').should('have.length', 13);
    cy.get('form > p').contains('Order: Nothing selected');
    cy.get('.orders-container').children().should('have.length', 3);
  })

  it('should be able to add their name and ingredients to their order', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', { fixture: 'newOrder' }).as('postOrder');
    cy.get('.orders-container').children().should('have.length', 3);
    cy.get('input[name=name]').type('Ethan');
    cy.get('button[value=carnitas]').click();
    cy.get('form > p').contains('Order: carnitas');
    cy.get('button').contains('Submit Order').click();
    cy.wait(['@postOrder']);
    cy.get('input[name=name]').should('have.value', '');
    cy.get('form > p').contains('Order: Nothing selected');
    cy.get('.orders-container').children().should('have.length', 4);
    cy.get('.order').last()
      .contains('h3', 'Ethan')
    cy.get('.ingredient-list').last()
      .contains('li', 'carnitas');
  });

  it('should maintain submitted orders after page reload', () => {
    cy.intercept('http://localhost:3001/api/v1/orders', { fixture: 'updatedOrders' }).as('updatedOrders');
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', { fixture: 'newOrder' }).as('postOrder');
    cy.get('.orders-container').children().should('have.length', 3);
    cy.get('input[name=name]').type('Ethan');
    cy.get('button[value=carnitas]').click();
    cy.get('form > p').contains('Order: carnitas');
    cy.get('button').contains('Submit Order').click();
    cy.wait(['@postOrder']);
    cy.reload();
    cy.wait(['@updatedOrders']);
    cy.get('.orders-container').children().should('have.length', 4);
  });

  it('should not be able to submit form if no name is provided for the order', () => {
    cy.get('button[value=carnitas]').click();
    cy.get('form > p').contains('Order: carnitas');
    cy.get('button').contains('Submit Order').click();
    cy.get('.orders-container').children().should('not.have.length', 4);
  });

  it('should not be able to submit form if no ingredients are added to the order', () => {
    cy.get('input[name=name]').type('Ethan');
    cy.get('form > p').contains('Order: Nothing selected');
    cy.get('button').contains('Submit Order').click();
    cy.get('.orders-container').children().should('not.have.length', 4);
  });
});
