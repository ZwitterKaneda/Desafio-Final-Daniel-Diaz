/// <reference types="cypress" />

export class ShoppingCartPage {

    CheckProducts(product) {
        cy.get(`[name='${product}']`).should('have.text', product);

    }
    CheckPriceProducts(price, product) {
        cy.get(`[name='${product}']`).siblings('#productPrice').should('have.text', `$${price}`);
    }
    CheckFinalPrice(price) {
        cy.xpath('//button[@class="chakra-button css-15tuzzq"]').should('exist').click();
        cy.xpath('//*[@id="price"]').should('have.text', `${price}`)

    }
}

