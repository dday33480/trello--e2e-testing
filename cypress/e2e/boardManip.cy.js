/// <reference types="cypress" />
import { email } from "../fixtures/user";

beforeEach( () => {
  cy.login(email);
  cy.timeout(7000)
      cy.visit("https://trello.com/");
cy.get(':nth-child(2) > :nth-child(2) > .boards-page-board-section-list > :nth-child(1) > .board-tile > .board-tile-details').click()
cy.wait(10000)
})

const title = 'Hello le monde'

describe('boardManip', () => {

it.skip('create listAndcard', () => {

cy.contains("Ajoutez une autre liste").click()
cy.get('.vVqwaYKVgTygrk > [data-testid="list-name-textarea"]').type('In progress')
cy.get('[data-testid="list-composer-add-list-button"]').click()

cy.wait(5000)

cy.get('[data-testid="list-add-card-button"]')
  .should('have.length.gte', 3)
  .eq(3)
  .contains('Ajouter une carte') 
  .click({force:true});

cy.get('[data-testid="list-card-composer-textarea"]')
    .should('be.visible')
    .type(title)


cy.get('[data-testid="list-card-composer-add-card-button"]')
.should('be.visible')
.click()

})

it('dragAnddrop', () => {
  
  cy.get('.T9JQSaXUsHTEzk').should('have.text', title).drag('[data-list-id="667a9a46966d6248e4419ac2"]', {force: true})

})

it('archiver et supprimer card', () => {
  
  cy.get('.amUfYqLTZOvGsn').should('be.visible').click();
  cy.wait(5000)
  cy.get('.window-title').should('have.text', title)
  
  cy.get('[data-testid="card-back-archive-button"]').click();

  cy.get('[data-testid="card-back-delete-card-button"]')
  .should('be.visible')
  .click();
  cy.get('.pop-over-content > :nth-child(1) > div > [data-testid]').click()
  cy.get('.mKJWg6W_CLHoiO').should('be.visible')

})

it.skip('Archiver liste', () => {
  cy.timeout(7000);
  cy.visit("https://trello.com/");
  cy.get(':nth-child(2) > :nth-child(2) > .boards-page-board-section-list > :nth-child(1) > .board-tile > .board-tile-details').click();
  cy.wait(8000)
})
it('Modifier la visibilité', () => {
  
  
  cy.get('[data-testid="board-visibility-option-org"]').click()
  cy.get('.TzntopStGOcVjM').should('have.text', 'Modifier la visibilité')

})
})