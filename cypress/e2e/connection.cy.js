/// <reference types="cypress" />
import { name } from "../fixtures/user";

describe('User Login', () => {
    it('Successful connexion', () => {
cy.visit("https://trello.com/");

cy.contains("Log in").click();

cy.wait(5000);

// Visit atlassian to avoid domain change issue
cy.visit("https://id.atlassian.com");

cy.origin("https://id.atlassian.com", () => {
  const { email, password } = Cypress.require("../fixtures/user");

  // enter email
  cy.get('[data-testid="username"]').type(email);

  // goto next
  cy.get("#login-submit").click();

  // Detect that we are automate
  cy.wait(4000);

  // enter password
  cy.get("#password").type(password);

  // goto next
  cy.get("#login-submit").click();

  // domain change wait is veryyy long
  cy.wait(20000);
});

cy.origin("https://team.atlassian.com/", () => {
  const { email } = Cypress.require("../fixtures/user");

  cy.get('.what-is-atlas-button > .css-178ag6o').click();

  cy.get(
    `[href='https://trello.com/appSwitcherLogin?login_hint=${email}']`
  ).click();
});
});
});