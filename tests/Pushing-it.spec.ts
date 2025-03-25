
import { test, expect, Page } from '@playwright/test';
import { PushingLogin } from '../pages/pushingLogin';
import {CreateAccount} from '../pages/createAccountPage';
import {HomePage} from '../pages/homePageIT';
import {OnlineShop} from '../pages/onLineShop'
import { Context } from 'vm';
require('dotenv').config();


test.skip("Create new user",async({page}) =>{
  await page.goto('/');
  const newUser = new CreateAccount(page);
  const username = process.env.APP_USER as string;
  const password = process.env.APP_USER_PASSWORD as string;
  await newUser.createNewUser(username, password);
  await page.waitForLoadState('networkidle')
  await expect( page.locator('.chakra-heading').nth(1)).toContainText('Welcome');
  await page.locator('#logout').click();
});

test.describe.serial("Login and Shopping", async () => {

  let context:Context, page:Page;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
  });

test('Order by Popularity and search ', async () => {
  await page.goto('/');
  const loginPage = new PushingLogin(page);
  await loginPage.goToLogin();
  const username = process.env.APP_USER as string;
  const password = process.env.APP_USER_PASSWORD as string;
  await loginPage.loginCredential(username,password);
  await page.waitForLoadState('domcontentloaded');
  await expect( page.locator('.chakra-heading').nth(1)).toContainText('Welcome')

});

test('Online shopping', async() => {

  const homePage = new HomePage(page);

  await homePage.goOnlineShop();

  //Add procducts to shopping car
  const onlineShop = new OnlineShop(page);

  await onlineShop.addProductByName('Jean Azul');
  await page.locator('#closeModal').click();

  await onlineShop.addProductByName('Medias Negra');
  await page.locator('#closeModal').click();

  await onlineShop.addProductByName('Sweater rosa');
  await page.locator('#closeModal').click();

  await onlineShop.goToShoppingCar();

  await onlineShop.validateShoppingCar();

      if(!await onlineShop.validateSummary()){
          test.fail();
      };

  await onlineShop.validateCheckOut();

});

test ('Logout',async () => {
  const homePage = new HomePage(page);
  await homePage.logout();
});

})
