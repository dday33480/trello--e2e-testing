import { email } from "../fixtures/user";

beforeEach( () => {
  cy.login(email);
})

describe('Disconnect User', () => {
    it('Disconnect', () => {
      // Go to the dashboard
      cy.visit("https://trello.com/");

      cy.wait(2000);

      // Click on memeber icon
      cy.get('[data-testid="header-member-menu-avatar"]').click();

      // Wait for menu to unfold
      cy.wait(2000);

      // Click on log out
      cy.get('[data-testid="account-menu-logout"]').click();

      // Redirect to id.atlassian.com
      cy.origin('https://id.atlassian.com/', () => {
        // Import user data from user.json file
        const name = Cypress.require('../fixtures/user');

        // Wait for poage load
        cy.wait(2000);

        // Click on Log out button
        cy.get ('#logout-submit').click();
      });
      
      // Redirection back to trello
      cy.url('https://trello.com/home')

      // Verify user is correctly disconnected by seeing the "Log in" option
      cy.get('[data-uuid="MJFtCCgVhXrVl7v9HA7EH_login"]').should('have.text', 'Log in');

    });
  });