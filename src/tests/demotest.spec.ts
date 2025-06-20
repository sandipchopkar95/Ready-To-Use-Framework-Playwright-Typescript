import { testConfig } from '../config/testConfig';
import { test, expect } from '../fixtures/authFixture';
import { DashboardPage } from '../pages/DashboardPage';
import clearAllSessions from '../utils/clearAllSessions';

test.describe('User and Admin Login Tests', () => {

    test.beforeAll(async () => {
        await clearAllSessions();
    })

    test('Admin login', async ({ adminPage }) => {
        const dashboard = new DashboardPage(adminPage);
        await dashboard.navigateToUrl(testConfig.endpoints.dashboardUrl);
        const adminUserText = await dashboard.getLoginUserName();
        expect(adminUserText).toEqual('manda user');
    });


    test('User login', async ({ userPage }) => {
        const dashboard = new DashboardPage(userPage);
        await dashboard.navigateToUrl(testConfig.endpoints.dashboardUrl);
        const adminUserText = await dashboard.getLoginUserName();
        expect(adminUserText).toEqual('Amelia Brown');
    });

});
