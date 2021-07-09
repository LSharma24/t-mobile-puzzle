describe('When: Use the search feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  /* disabling this test as it's not required now with instant search implementation */
  xit('Then: I should be able to search books by title', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);
  });

  it('Then: I should see search results as I am typing', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);
  });
});
