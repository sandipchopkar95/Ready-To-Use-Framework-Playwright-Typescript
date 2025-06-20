import { Locator, Page } from '@playwright/test';
import { logger } from '../utils/loggers';
export class BasePage {

    constructor(protected page: Page) { }

    async navigateToUrl(url: string, delay?: number) {
        const retries = 2;
        let response = await this.page.goto(url, { timeout: 60000, waitUntil: 'domcontentloaded' });
        logger.info(`Navigating to URL: ${url}`);
        if (response && response.ok()) {
            await this.page.waitForLoadState('load');
            logger.info(`Successfully navigated to ${url}`);
            return;
        }
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                logger.warn(`Waiting for page load (Attempt ${attempt}/${retries})...`);
                await this.page.waitForLoadState('load', { timeout: 10000 });
                logger.info(`Successfully navigated to ${url}`);
                return;
            } catch (error) {
                logger.error(`Page not fully loaded. Retrying wait... (${attempt}/${retries})`);
            }
            await this.page.waitForTimeout(delay ?? 2000);
        }
        logger.error(`Page did not fully load after ${retries} attempts.`);
    }

    async enterText(locator: Locator, value: string) {
        await locator.waitFor();
        await locator.fill(value);
        logger.info(`Entered text  ${value} in ${locator} field.`);
    }

    async gteTextValue(locator: Locator): Promise<string> {
        await locator.waitFor({ timeout: 3000 });
        const text = await locator.textContent();
        return text?.trim() ?? '';
   }

    async clickElement(locator: Locator) {
        await locator.waitFor();
        await locator.click();
        logger.info(`Clicked on ${locator} `);
    }

    async waitForElement(locator: Locator, waitTimeOut?: number) {
        logger.info(`waiting for on ${locator} upto ${waitTimeOut} ms.`);
        await locator.waitFor({ timeout: waitTimeOut ?? 2000 });
    }

    async selectOption(locator: Locator, option: string) {
        await locator.waitFor();
        await locator.selectOption(option);
        logger.info(`Selected option ${option} in ${locator}`);
    }

    async selectCheckBox(locator: Locator, option?: string) {
        const checkBox = option ? locator.filter({ hasText: option }).locator('input[type="radio"]') : locator;
        await checkBox.waitFor();
        await checkBox.click();
    }

    async waitForPageLoadAfterNavigation(locator:Locator) {
        await locator.waitFor({timeout:30000});
        logger.info(`Successfully navigated to dashboard screen after login`);
    }

    async waitForTimeout(delay: number) {
        await this.page.waitForTimeout(delay);
    }

}