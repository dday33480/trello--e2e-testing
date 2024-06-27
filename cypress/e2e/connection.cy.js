/// <reference types="cypress" />


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
        // Import user credentials from the fixtures
        const { email, password } = Cypress.require("../fixtures/user");

        // Set credential variables based on fixture data or env data if available
        const userEmail = Cypress.env('email') || email;
        const userPassword = Cypress.env('password') || password;

        // enter email
        cy.get('[data-testid="username"]').type(userEmail);

        // login submit (email only)
        cy.get("#login-submit").click();

        // wait for password field to become visible
        cy.wait(4000);

        // enter password
        cy.get("#password").type(userPassword);

        // login submit (email + password)
        cy.get("#login-submit").click();

        // domain change wait (very long)
        cy.wait(20000);
      });

      // another domain change to team.atlassian
      cy.origin("https://team.atlassian.com/", () => {
        // Import user email from the fixtures
        const { email } = Cypress.require("../fixtures/user");

        // Set credential variables based on fixture data or env data if available
        const userEmail = Cypress.env('email') || email;

        // close dialog window
        cy.get('.what-is-atlas-button > .css-178ag6o').click();

        cy.get(
          `[href='https://trello.com/appSwitcherLogin?login_hint=${userEmail}']`
        ).click();
      });
    });
});

// Unsuccessful user login with invalid or missing credentials
describe('User Login Failure', () => {
  it('Connexion with no email', () => {

    // Go to Trello.com
    cy.visit('https://trello.com/');

    // Get and click the "Log in" button
    cy.get('[data-uuid="MJFtCCgVhXrVl7v9HA7EH_login"]').click();

    // Wait for redirection
    cy.wait(5000);

    // Redirection to id.atlassian
    cy.origin('https://id.atlassian.com', () => {

      // Get and click on "Continue"
      cy.get('#login-submit').click();

      // Verify error message appears
      cy.get('#username-uid2-error').should('be.visible').and('have.text', 'Enter an email address');
    })
  });


  it('Connexion with no password', () => {

    // Go to Trello.com
    cy.visit('https://trello.com/');

    // Get and click the "Log in" button
    cy.get('[data-uuid="MJFtCCgVhXrVl7v9HA7EH_login"]').click();

    // Wait for redirection
    cy.wait(5000);

    // Redirection to id.atlassian
    cy.origin('https://id.atlassian.com', () => {
      // Use invalid user data from invalid_user.json file
      const {email, password} = Cypress.require("../fixtures/invalid_user.json");

      // Enter password
      cy.get('[data-testid="username"]').type(email);

      // Get and click on "Continue"
      cy.get('#login-submit').click();

      // Wait for password field to appear
      cy.wait(3000);

      // Verify entrered email is visible
      cy.get('.css-cnfgt3').should('contain', email);

      // Wait for password field to appear
      cy.wait(1000);

      // Click on Log in button
      cy.get("#login-submit").click({force:true});

      // Wait for submission timeout
      cy.wait(1000);

      // Verify error message appears
      cy.get('#password-uid3-error').should('be.visible').and('have.text', 'Enter your password');
    })
  });


  it('Connexion with invalid email', () => {

    // Go to Trello.com
    cy.visit('https://trello.com/')

    // Get and click the "Log in" button
    cy.get('[data-uuid="MJFtCCgVhXrVl7v9HA7EH_login"]').click()

    // Wait for redirection
    cy.wait(5000)

    // Redirection to id.atlassian
    cy.origin('https://id.atlassian.com', () => {
      // Use invalid user data from invalid_user.json file
      const {email, password} = Cypress.require("../fixtures/invalid_user.json");

      // Enter password
      cy.get('[data-testid="username"]').type(email);

      // Get and click on "Continue"
      cy.get('#login-submit').click()

      // Wait for password field to appear
      cy.wait(500)

      // Verify entrered email is visible
      cy.get('.css-cnfgt3').should('contain', email);

      // Enter password
      cy.get('[data-testid="password"]').type(password);

      // Click Log in button
      cy.get('#login-submit').click();

      // Verify error message appears
      cy.get('[data-testid="form-error"]').should('be.visible').and('contain', 'Incorrect email address and / or password');

      cy.wait(800)

    })
  });

  
  it('Connexion with invalid password', () => {

    // Go to Trello.com
    cy.visit('https://trello.com/')

    // Get and click the "Log in" button
    cy.get('[data-uuid="MJFtCCgVhXrVl7v9HA7EH_login"]').click()

    // Wait for redirection
    cy.wait(5000)

    // Redirection to id.atlassian
    cy.origin('https://id.atlassian.com', () => {
        // Use invalid user password from invalid_user.json file and correct email fro user.json file
        const {password} = Cypress.require("../fixtures/invalid_user.json");
        const {email} = Cypress.require("../fixtures/user.json");

      // Enter password
      cy.get('[data-testid="username"]').type(email);

      // Get and click on "Continue"
      cy.get('#login-submit').click()

      // Wait for password field to appear
      cy.wait(500)

      // Verify entrered email is visible
      cy.get('.css-cnfgt3').should('contain', email);

      // Enter password
      cy.get('[data-testid="password"]').type(password);

      // Click Log in button
      cy.get('#login-submit').click();

      // Verify error message appears
      cy.get('[data-testid="form-error"]').should('be.visible').and('contain', 'Incorrect email address and / or password');

      cy.wait(800)

    })
  });
})