/// <reference types="cypress" />
export class HomePage{

    clickOnlineShop(){
        cy.get('#onlineshoplink').should('exist').click();
    }
    }
