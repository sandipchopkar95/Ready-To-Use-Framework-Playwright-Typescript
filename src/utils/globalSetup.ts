import { chromium, FullConfig } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { testConfig } from '../config/testConfig';
import { LoginPage } from '../pages/LoginPage';

// Load user credentials
const users = JSON.parse(fs.readFileSync('./src/testdata/users.json', 'utf-8'));

async function loginAndSaveSession(username: string, password: string, storagePath: string) {
    const browser = await chromium.launch({ headless: testConfig.headless });
    const page = await browser.newPage();

    // Perform Login
    const loginPage = new LoginPage(page);
    await loginPage.navigateToUrl(testConfig.endpoints.login);
    await loginPage.login(username, password);
    await loginPage.waitForPageLoadAfterNavigation(await loginPage.getPageHeader());

    // Ensure directory exists
    fs.mkdirSync(path.dirname(storagePath), { recursive: true });

    // Save Storage State
    await page.context().storageState({ path: storagePath });

    await browser.close();
}

async function globalSetup(config: FullConfig) {
    await loginAndSaveSession(users.admin.username, users.admin.password, testConfig.storagePaths.admin);
    await loginAndSaveSession(users.user.username, users.user.password, testConfig.storagePaths.user);
}

export default globalSetup;
