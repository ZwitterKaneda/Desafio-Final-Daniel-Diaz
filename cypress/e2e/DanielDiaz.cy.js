/// <reference types="cypress" />

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
  let userName = 'kaneharu';
  let passWord = '123456!';
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
        username: userName,
        password: passWord,
        gender: gender,
        day: day,
        month: month,
        year: year,
      }
    });
    cy.request({
      method: "POST",
      url: "https://pushing-it-backend.herokuapp.com/api/login",
      body: {"username": "kaneharu", "password": "123456!"}
    }).then(({ body }) =>{
        window.localStorage.setItem("token", body.token)
        window.localStorage.setItem("user", body.user.username)
      });
  });

it('Test', () => {
  cy.visit('');   //Web site
  homepage.clickOnlineShop();  //Go to Online Shop
  // Searching, adding, checking
  productspage.addProductToCart(productsdata.FirstProduct.name);
  productspage.CloseModal();
  productspage.addProductToCart(productsdata.SecondProduct.name);
  productspage.CloseModal();
  productspage.goShoppingCart();
  shoppingcartpage.CheckProducts(productsdata.FirstProduct.name);
  shoppingcartpage.CheckProducts(productsdata.SecondProduct.name);
  shoppingcartpage.CheckPriceProducts(productsdata.FirstProduct.price, productsdata.FirstProduct.name);
  shoppingcartpage.CheckPriceProducts(productsdata.SecondProduct.price, productsdata.SecondProduct.name);
  shoppingcartpage.CheckFinalPrice(productsdata.FirstProduct.price + productsdata.SecondProduct.price);
  //Paying
  checkoutpage.goToCheckOutPage();
  checkoutpage.typeFirstName(creditcarddata.CreditCard.FirstName);
  checkoutpage.typeLastName(creditcarddata.CreditCard.LastName);
  checkoutpage.typeCardNumber(creditcarddata.CreditCard.CardNumber);
  checkoutpage.goToPurchase();
  //Ticket Verification
  ticketpage.waitForLoadingBarToDissapear();
  ticketpage.CCardVerification1(creditcarddata.CreditCard.FirstName, creditcarddata.CreditCard.LastName);
  ticketpage.ProductsVerification(productsdata.FirstProduct.name);
  ticketpage.ProductsVerification(productsdata.SecondProduct.name);
  ticketpage.CCardVerification2(creditcarddata.CreditCard.CardNumber);
  ticketpage.FinalPriceVerification(productsdata.FirstProduct.price, productsdata.SecondProduct.price);
})


after('Delete New User', () => {
  cy.request({
    url: 'https://pushing-it-backend.herokuapp.com/api/deleteuser/' + userName,
    method: 'DELETE'
  }).then((response) => {
    expect(response.status).equal(200);
  });
});
});