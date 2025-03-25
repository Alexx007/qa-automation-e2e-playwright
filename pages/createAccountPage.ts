import { Page,Locator,expect} from "@playwright/test";
import { create } from "domain";

 export class CreateAccount{
    nameInput: Locator;
     passInput: Locator;
     genderMale: Locator;
     dayOfBirth: Locator;
     month: Locator;
     year: Locator;
     registerBtn: Locator;
     page: Page;

    constructor(page:Page){
        this.page = page
        this.nameInput = page.locator('[name="user"]');
        this.passInput = page.locator('[name="pass"]');
        this.genderMale = page.locator('[data-cy="Male"]');
        this.dayOfBirth = page.locator('#day');
        this.month = page.locator('#month');
        this.year = page.locator('#year');
        this.registerBtn = page.locator('#submitForm');
    }

    async createNewUser(user:string, pass:string,){
        await this.nameInput.fill(user);
        await this.passInput.fill(pass);
        await this.genderMale.click();
        await this.dayOfBirth.selectOption('22');
        await this.month.selectOption('June');
        await this.year.selectOption('1992');
        await this.registerBtn.click();
        await this.page.waitForLoadState('load');
        
    }


 }