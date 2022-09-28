/// <reference types="cypress" />
export class TicketPage{

    TicketTimeOut(){
        cy.get('[class="chakra-progress__indicator css-10wc2yc"]',{timeout: 10000}).should('not.exist');
    }

    CCardVerification1(CardFirstName,CardLastName){
    cy.get('#name').should('have.text', `${CardFirstName} ${CardLastName} has succesfully purchased the following items`);
    }

    ProductsVerification(ProductName){
    cy.contains(`${ProductName}`).should('include.text', `${ProductName}`);
    }

    CCardVerification2(CCNumber){
    cy.contains(`${CCNumber}`).should('have.text', `${CCNumber}`);
    }
    
    FinalPriceVerification(priceOne, priceTwo){
    cy.get('#totalPrice').should(`have.text`, `You have spent $${priceOne + priceTwo}`);
    }

}