// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email) => {
    cy.session(email, () => {
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
    },
    {
        cacheAcrossSpecs: true
    }
    );
});