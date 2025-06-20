import { test as base, Browser, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { testConfig } from '../config/testConfig';
import fs from 'fs';

// Load users from JSON
const users = JSON.parse(fs.readFileSync('./src/testdata/users.json', 'utf-8'));

export const test = base.extend<{ adminPage: Page; userPage: Page }>({
    adminPage: async ({ browser }: { browser: Browser }, use: (page: Page) => Promise<void>) => {
        const storageStatePath = testConfig.storagePaths.admin;
        const sessionExists = fs.existsSync(storageStatePath);

        // Create a new browser context with stored session (if exists)
        const context = await browser.newContext({
            storageState: sessionExists ? storageStatePath : undefined
        });
        const page = await context.newPage();

        if (!sessionExists) {
            console.log("Admin session not found or expired. Logging in...");
            const loginPage = new LoginPage(page);
            await loginPage.navigateToUrl(testConfig.endpoints.login);
            await loginPage.login(users.admin.username, users.admin.password);
            await loginPage.waitForPageLoadAfterNavigation(await loginPage.getPageHeader());
            // Save session state
            await page.context().storageState({ path: storageStatePath });
            console.log("Admin session stored successfully.");
        }

        await use(page);
        await context.close();
    },

    userPage: async ({ browser }: { browser: Browser }, use: (page: Page) => Promise<void>) => {
        const storageStatePath = testConfig.storagePaths.user;
        const sessionExists = fs.existsSync(storageStatePath);

        // Create a new browser context with stored session (if exists)
        const context = await browser.newContext({
            storageState: sessionExists ? storageStatePath : undefined
        });
        const page = await context.newPage();
        if (!sessionExists) {
            console.log("User session not found or expired. Logging in...");
            const loginPage = new LoginPage(page);
            await loginPage.navigateToUrl(testConfig.endpoints.login);
            await loginPage.login(users.user.username, users.user.password);
            await loginPage.waitForPageLoadAfterNavigation(await loginPage.getPageHeader());
            // Save session state
            await page.context().storageState({ path: storageStatePath });
            console.log("User session stored successfully.");
        }

        await use(page);
        await context.close();
    },
});

export { expect } from '@playwright/test';
