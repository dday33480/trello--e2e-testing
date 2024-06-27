/// <reference types="cypress" />
//import { email } from "../fixtures/user";

  
describe.skip('Acces Espace travail', () => {

    beforeEach( () => {
      const email = Cypress.env('email');
      cy.login(email);
    })

    //Accés à l"espace de travail 
    
    it('Access Workspace et tableaux',() =>{
   
    cy.visit("https://trello.com/u/adjwcs1/boards");
    cy.wait(5000);
    cy.url().should('include','/u/');
    cy.get('[href="/w/espacedetravail27174793/home"]').should('have.text','Espace de travail de azizsene')
    .click({force:true});

    //Aller sur les tableaux

    cy.get('[data-testid="home-team-boards-tab"] > .DD3DlImSMT6fgc').click({force:true});
    // Selectionner le Tableau Api 2

    cy.get('[href="/b/jnljgobd/api-tableau-2"]').should('have.text', 'API Tableau 2')
    .click({force:true});
    //Fermer le tableau:
    cy.get('[data-testid="OverflowMenuHorizontalIcon"]').click();
    cy.get('[href="#"]').click();
   
    });
    
    // Créer un tableau
    
    it.skip('Creer un tableau ',() =>{
        cy.visit("https://trello.com/w/espacedetravail27174793/home");
        cy.wait(5000);
        cy.get('[data-testid="create-board-tile"]').type(titre).click();
        cy.get('.css-spyyn7-singleValue').type(Espace).click();
        
    
    cy.wait(5000);

    cy.url().should('include','/w/');
    cy.contains('Créer un tableau').should('be.vivble');
    
    cy.wait(6000);
    cy.get('[data-testid="create-board-tile"]').click();
    
    cy.get('[data-testid="create-board-submit-button"]')
    .should('have.text','Créer').click();
    
    });
    });

