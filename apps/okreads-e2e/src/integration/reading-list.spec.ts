describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  describe('When: I use the add or remove feature with snack-bar functionality', () => {
    beforeEach(() => {
      cy.get('input[type="search"]').type('java script');
      cy.get('form').submit()
    });
    
    it('Then: I should be able to add book to the reading list and undo it', () => {
      /* counting reading list items */
      const readingListItems = cy.$$('[data-testing="reading-list"]').length;

      /* Adding a book to reading list */
      cy.get('[data-testing="want-to-read-cta"]:enabled').first().click();

      /* checking reading list count value */
      cy.get('[data-testing="reading-list"]').should(
        'have.length',
        readingListItems + 1
      );

      /* clicking snack-bar undo button */
      cy.get(".mat-simple-snackbar-action").click();

      /* verfying that book is removed from reading list */
      cy.get('[data-testing="reading-list"]').should(
        'have.length',
        readingListItems
      );
    });
    
    it('Then: I should be able to remove book from the reading list and undo it', () => {
      /* counting reading list items */
      const readingListItems = cy.$$('[data-testing="reading-list"]').length;

      /* Adding a book to reading list */
      cy.get('[data-testing="want-to-read-cta"]:enabled').first().click();

      /* opening reading list */
      cy.get('[data-testing="toggle-reading-list"]').click();

      /* checking reading list count value */
      cy.get('[data-testing="reading-list"]').should(
        'have.length',
        readingListItems + 1
      );

      /* removing book from reading list */
      cy.get('[data-testing="remove-from-reading-list-cta"]').last().click();

      /* verifying book is removed from reading list */
      cy.get('[data-testing="reading-list"]').should(
        'have.length',
        readingListItems
      );

      /* clicking snack-bar undo button */
      cy.get(".mat-simple-snackbar-action").last().click();

      /* verfying that book is added to reading list */
      cy.get('[data-testing="reading-list"]').should(
        'have.length',
        readingListItems + 1
      );
    });
  })
});
