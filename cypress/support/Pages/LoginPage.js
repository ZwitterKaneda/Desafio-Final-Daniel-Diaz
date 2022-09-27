/// <reference types="cypress" />
export class LoginPage{

    typeUser(usuario){
        cy.get('#user').type(usuario);
    };
    typePassword(password){
        cy.get('#pass').type(password);
    };
    clickloginbutton(){
        cy.get('#submitForm').click();    
    };
    
    }