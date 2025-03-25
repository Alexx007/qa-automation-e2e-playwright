import { Page,Locator,expect} from "@playwright/test";

export class HomePage{
 
    logOutBtn: Locator;
    homeBtn: Locator;
    onLineBtn: Locator;
    page:Page;
    constructor(page:Page){
        this.page = page;
        this.logOutBtn = page.locator('#logout');
        this.homeBtn = page.locator('.chakra-heading').first();
        this.onLineBtn = page.locator('#onlineshoplink');
    }

    async goOnlineShop(){
        await expect(this.onLineBtn).toContainText('Online Shop');
        await this.onLineBtn.click();
        await this.page.waitForLoadState('load');
        await expect( this.page.locator('.chakra-heading').nth(3)).toContainText('Products');
        await this.page.locator('[data-cy="name"]').nth(1).waitFor()
    }

    async logout(){
        await this.logOutBtn.click();
        expect(this.page.locator('#submitForm')).toBeVisible();
    }

}