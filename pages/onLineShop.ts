import { Page,Locator,expect} from "@playwright/test";

export class OnlineShop{
 
    Allproducts: Locator;
    page:Page
    goToshoppingCar: Locator;
    dynamicTitle : Locator;
    showTotalPrice : Locator;
    billingSummary : Locator;
    totalPrice : number;
    price: Locator;
    static priceValue: number = 0;
    goCheckOut: Locator;
    firstName: Locator;
    lastName: Locator;
    cardNumber: Locator;
    purchaseBtn: Locator;

    constructor(page:Page){
        this.Allproducts =  page.locator('.chakra-skeleton.css-cdkrf0');
        this.goToshoppingCar = page.locator('#goShoppingCart');
        this.dynamicTitle = page.locator('#title');
        this.showTotalPrice = page.getByText('Show total price');
        this.billingSummary = page.locator('#goBillingSummary');
        this.price = page.locator('#price');
        this.page = page;
        this.goCheckOut = page.locator('#goCheckout');
        this.firstName = page.locator('#FirstName');
        this.lastName = page.locator('#lastName');
        this.cardNumber = page.locator('#cardNumber');
        this.purchaseBtn = page.locator('[data-cy="purchase"]')
       
    }


    async addProductByName(productName: string) {
        
        await this.Allproducts.nth(1).waitFor({ state: 'visible' });

        const matchingProduct = this.Allproducts
        .locator('[data-cy="name"]') 
        .filter({ hasText: productName })
        .locator('..');

        await matchingProduct.locator('[aria-label="Add to cart"]').click();

     
    }

    async goToShoppingCar(){
        await this.goToshoppingCar.click()
        await this.page.waitForLoadState('load');
    }

    async validateShoppingCar(){
        await this.dynamicTitle.waitFor();
        await this.showTotalPrice.click();
        let priceText = await this.price.textContent()

        if(priceText) {
            
            OnlineShop.priceValue = parseFloat(priceText);

            console.log(`El valor total es ${OnlineShop.priceValue}`);
        }
        await this.page.waitForLoadState('load');

        await this.billingSummary.click();

    }

    async validateSummary(){

        await this.dynamicTitle.waitFor();
        const totalPrice =  await this.page.locator('#totalPriceAmount').textContent() || "";
        const prePrice = totalPrice.replace("$", "");
        const priceValue = parseFloat(prePrice);
        const precioRedondeado = Number(priceValue.toFixed(2));
        console.log(precioRedondeado,'Valores ',  OnlineShop.priceValue)
            if(precioRedondeado === OnlineShop.priceValue){
                return true
            }else {
                return false }      

    }

    async validateCheckOut(){
        await this.goCheckOut.click();
        await this.dynamicTitle.waitFor();
        await this.firstName.fill('Nelson');
        await this.lastName.fill('Rodriguez');
        await this.cardNumber.fill('4242424242424242');
        await this.purchaseBtn.click();
        await this.page.locator('[aria-label="Close"]').last().click()

    }

    

}