/// <reference types="cypress" />
import { name } from "../fixtures/user";

// Successful user login with valide credentials
describe('User Login Success', () => {
    it('Successful connexion', () => {
      cy.visit("https://trello.com/");

      cy.contains("Log in").click();

      // wait for redirection
      cy.wait(5000);

      // Visit atlassian to avoid domain change issue
      cy.visit("https://id.atlassian.com");

      // domain change to id.atlassian
      cy.origin("https://id.atlassian.com", () => {
        const { email, password } = Cypress.require("../fixtures/user");

        // enter email
        cy.get('[data-testid="username"]').type(email);

        // login submit (email only)
        cy.get("#login-submit").click();

        // wait for password field to become visible
        cy.wait(4000);

        // enter password
        cy.get("#password").type(password);

        // login submit (email + password)
        cy.get("#login-submit").click();

        // domain change wait (very long)
        cy.wait(20000);
      });

      // another domain change to team.atlassian
      cy.origin("https://team.atlassian.com/", () => {
        const { email } = Cypress.require("../fixtures/user");

        // close dialog window
        cy.get('.what-is-atlas-button > .css-178ag6o').click();

        cy.get(
          `[href='https://trello.com/appSwitcherLogin?login_hint=${email}']`
        ).click();
      });
    });
});