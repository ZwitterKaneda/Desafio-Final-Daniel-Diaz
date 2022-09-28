/// <reference types="cypress" />
//describe - before - it - after
require('cypress-xpath');

import { HomePage } from "../support/Pages/HomePage"
import { LoginPage } from "../support/Pages/LoginPage"
import { RegisterPage } from "../support/Pages/RegisterPage"
import { ProductsPage } from "../support/Pages/ProductsPage"
import { ShoppingCartPage } from "../support/Pages/ShoppingCartPage";
import { CheckOutPage } from "../support/Pages/CheckOutPage";
import { TicketPage } from "../support/Pages/TicketPage"

describe('Final Challenge', () => {

  const homepage = new HomePage();
  const registerpage = new RegisterPage();
  const loginpage = new LoginPage();
  const productspage = new ProductsPage();
  const shoppingcartpage = new ShoppingCartPage();
  const checkoutpage = new CheckOutPage();
  const ticketpage = new TicketPage();


  let productsdata, creditcarddata;
  let username = 'kaneharu';
  let password = '123456!';
  let gender = 'Male';
  let day = '08';
  let month = 'May';
  let year = '1986';

  before('login', () => {
    
      cy.fixture('ProductsData').then(Pdata => {productsdata = Pdata});    
      cy.fixture('CreditCardData').then(CCdata => {creditcarddata = CCdata});    

      cy.request({
      url: "https://pushing-it-backend.herokuapp.com/api/register",
      method: "POST",
      body: {
        username: username,
        password: password,
        gender: gender,
        day: day,
        month: month,
        year: year,
      }
    });
  });

it('Test', () => {
  cy.visit('');   //Web site
  registerpage.DobleClick();
  loginpage.typeUser(username);   //login
  loginpage.typePassword(password);
  loginpage.clickloginbutton();
  homepage.clickOnlineShop();  //Go to Online Shop
    // Searching, adding, checking
  productspage.addProductToCart(productsdata.FirstProduct.name);
  cy.get('#closeModal').click();
  productspage.addProductToCart(productsdata.SecondProduct.name);
  cy.get('#closeModal').click();
  productspage.goShoppingCart();
  shoppingcartpage.CheckProducts(productsdata.FirstProduct.name);
  shoppingcartpage.CheckProducts(productsdata.SecondProduct.name);
  shoppingcartpage.CheckPriceProducts(productsdata.FirstProduct.price, productsdata.FirstProduct.name);
  shoppingcartpage.CheckPriceProducts(productsdata.SecondProduct.price, productsdata.SecondProduct.name);
  shoppingcartpage.CheckFinalPrice(productsdata.FirstProduct.price, productsdata.SecondProduct.price);
  //Paying
  checkoutpage.goToCheckOutPage();
  checkoutpage.typeFirstName(creditcarddata.CreditCard.FirstName);
  checkoutpage.typeLastName(creditcarddata.CreditCard.LastName);
  checkoutpage.typeCardNumber(creditcarddata.CreditCard.CardNumber);
  cy.contains('Purchase').should('be.exist').click();
  //Ticket Verification
  ticketpage.TicketTimeOut();
  ticketpage.CCardVerification1(creditcarddata.CreditCard.FirstName, creditcarddata.CreditCard.LastName);
  ticketpage.ProductsVerification(productsdata.FirstProduct.name);
  ticketpage.ProductsVerification(productsdata.SecondProduct.name);
  ticketpage.CCardVerification2(creditcarddata.CreditCard.CardNumber);
  ticketpage.FinalPriceVerification(productsdata.FirstProduct.price, productsdata.SecondProduct.price);
})


after('Delete New User', () => {
  cy.request({
    url: 'https://pushing-it-backend.herokuapp.com/api/deleteuser/' + username,
    method: 'DELETE'
  }).then((response) => {
    expect(response.status).equal(200);
  });
});
});