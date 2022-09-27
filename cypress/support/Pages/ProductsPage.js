/// <reference types="cypress" />

export class ProductsPage {
     

    addProductToCart(product){
        cy.get(`[value='${product}']`).click();
      }
     
    goShoppingCart(){
        cy.xpath('//button//ancestor::button[@id="goShoppingCart"]').click();
    }
    };