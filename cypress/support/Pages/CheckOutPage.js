/// <reference types="cypress" />
export class CheckOutPage{

    goToCheckOutPage(){
        cy.get('#onlineshoplink').should('exist').click();

        cy.get('//*[@id="root"]/div/div[2]/div[3]/div/button').click();
    }

    typeFirstName(FirstName){
        cy.get('#FirstName').type(FirstName);
    };
    typeLastName(LastName){
        cy.get('#lastName').type(LastName);
    };
    typeCardNumber(CardNumber){
        cy.get('#cardNumber').type(CardNumber);    
    };
    clickPurchase(){
        cy.xpath('//*[@id="root"]/div/div[2]/div[2]/form/div/div[4]/button[1]').click();    
    };
    
    }