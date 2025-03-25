import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';


test('Order by Popularity and search ', async ({ page }) => {
  await page.goto('/');
  const homePage = new HomePage(page);
  await homePage.selectOrderBy('Ordenar por popularidad');

  await homePage.searchBoxByText('bebe');


});

test('Product by name', async ({ page }) => {
  await page.goto('/');
  const homePage = new HomePage(page);
  await homePage.selecttProductByName('Espadas del Caos');

});

test('Product by price',async ({page}) => {
  await page.goto('/')
  const homePage = new HomePage(page);
  //width is 15
  await homePage.changeMinPriceValue(10);
  await homePage.homeLogo.click();

})