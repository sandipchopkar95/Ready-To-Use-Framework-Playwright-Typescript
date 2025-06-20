import { defineConfig, devices } from '@playwright/test';
import { testConfig } from './src/config/testConfig';

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: testConfig.parallel,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never', outputFolder: 'playwright-report' }]
], // Prevent auto-opening
  timeout: 120000,
  use: {
    headless: testConfig.headless,  // Ensures browser is always headed
    baseURL: testConfig.baseURL,
    trace: 'retain-on-failure',
    screenshot:'on'
  },
 //storageState: testConfig.storagePaths.admin, // Default to regular user
  // globalSetup: require.resolve('./src/utils/globalSetup'), // Run before tests
  // globalTeardown: require.resolve('./src/utils/globalTeardown'),

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],

});
