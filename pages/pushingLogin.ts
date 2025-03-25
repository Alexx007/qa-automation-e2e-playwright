import { Page,Locator,expect} from "@playwright/test";

export class PushingLogin{
    page: Page;
    loginLink: Locator;
    btnLogin: Locator;
    nameInput: Locator;
    passInput: Locator;
  
    constructor(page:Page){
        this.page = page;
        this.loginLink = page.locator('#registertoggle');
        this.btnLogin = page.locator('#submitForm');
        this.nameInput = page.locator('[name="user"]');
        this.passInput = page.locator('[name="pass"]');
        
    }

    async goToLogin(){
        await this.loginLink.waitFor();
        expect(this.loginLink).toContainText('Iniciá sesión');
        await this.loginLink.dblclick();
    }

    async loginCredential(user:string,pass:string){
        await this.nameInput.fill(user);
        await this.passInput.fill(pass);
        await this.btnLogin.click();

    }

}