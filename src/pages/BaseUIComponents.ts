import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class BaseUIComponents extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    private readonly pageHeader = this.page.locator('header span').filter({hasText:'Dashboard'});

    async getPageHeader(){
        return this.pageHeader;
    }
   
}