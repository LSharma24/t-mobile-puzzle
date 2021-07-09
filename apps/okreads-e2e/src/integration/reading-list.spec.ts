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

  describe('When: I use mark-as-read book feature of reading list', () => {
    beforeEach(() => {
      cy.get('input[type="search"]').type('python');

      cy.get('form').submit();

      cy.get('[data-testing="want-to-read-cta"]:enabled').first().click();

      cy.get('[data-testing="toggle-reading-list"]').click();
      
      cy.get('[data-testing="mark-as-finished-icon"]').last().click();
    });
    
    it('Then finish date should be visible and want-to-read-cta text should be changed to (Finished) text', () => {
      /* verifying finish date is visible */
      cy.get('[data-testing="finish-date"]').last().should(
        'be.visible'
      );

      /* verifying want-to-read-cta text */
      cy.get('[data-testing="want-to-read-cta"]:disabled').last().should(
        'contain.text',
        'Finished'
      );
    });
    
    it('Then on removing finished book want-to-read-cta text and finish status should be reverted', () => {
      /* removing book from reading list */
      cy.get('[data-testing="remove-icon"]').last().click();

      /* closing reading list */
      cy.get('[data-testing="close-reading-list"]').click();

      /* verifying want-to-read-cta text */
      cy.get('[data-testing="want-to-read-cta"]:enabled').first().should(
        'contain.text',
        'Want to Read'
      );

      /* adding the book again */
      cy.get('[data-testing="want-to-read-cta"]:enabled').first().click();

      /* opening reading list */
      cy.get('[data-testing="toggle-reading-list"]').click();

      /* verifying mark-as-finish icon is enabled */
      cy.get('[data-testing="mark-as-finished-icon"]').last().should('be.enabled');
    });
  });
});
