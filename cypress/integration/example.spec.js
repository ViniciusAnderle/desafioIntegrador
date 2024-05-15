describe('Example Test Suite', () => {
    it('should display the title correctly', () => {
      cy.visit('https://example.com');
      cy.title().should('equal', 'Example Domain');
    });
  });