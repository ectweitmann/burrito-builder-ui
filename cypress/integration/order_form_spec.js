describe('Feedback Loop login flows', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:3001/api/v1/orders')
  })

  it('Should confirm that true is equal to true', () => {
    expect(true).to.equal(true)
  });
});
