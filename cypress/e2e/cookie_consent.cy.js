describe.skip('Cookie Consent Accept', () => {
    it('Accept cookies', () => {
        // Go to the trello.com homepage
        cy.visit('https://trello.com/');

        // Wait for page to lod
        cy.wait(5000);

        // Verify consent banner is visible
        cy.get('#onetrust-button-group-parent').should('be.visible');

        // Accept cookies
        cy.get('#onetrust-accept-btn-handler').click();

        let cookieValue = document.cookie;

        console.log(cookieValue);

        cy.wait(1000);

        // Verify banner is no longer visible
        cy.get('#onetrust-button-group-parent').should('not.be.visible');

        // Verify cookie has been accepted and cookie value stored
        cy.getCookie('OptanonConsent').should('exist');
        cy.getCookie('OptanonConsent').then((cookie) => {
            // Retrieve the value from the cookie
            const cookieValue = cookie.value;

            // Parse the value of the cookie
            cy.parseCookieValue(cookieValue).then(parsedValue => {
                // Find and assert intType within cookie value is equal to 1
                expect(parsedValue.intType).to.equal('1');
            })
        })

    });


    it('Reject cookies', () => {
        // Go to the trello.com homepage
        cy.visit('https://trello.com/');

        // Wait for page to lod
        cy.wait(5000);

        // Verify consent banner is visible
        cy.get('#onetrust-button-group-parent').should('be.visible');

        // Accept cookies
        cy.get('#onetrust-reject-all-handler').click();

        cy.wait(1000);

        // Verify banner is no longer visible
        cy.get('#onetrust-reject-all-handler').should('not.be.visible');

        // Verify cookie has been accepted and cookie value stored
        cy.getCookie('OptanonConsent').should('exist');
        cy.getCookie('OptanonConsent').then((cookie) => {
            // Retrieve the value from the cookie
            const cookieValue = cookie.value;

            // Parse the value of the cookie
            cy.parseCookieValue(cookieValue).then(parsedValue => {
                // Find and assert intType within cookie value is equal to 1
                expect(parsedValue.intType).to.equal('2');
            })
        })

    })
})