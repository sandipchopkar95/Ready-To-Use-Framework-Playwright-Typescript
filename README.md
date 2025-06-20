
# 📘 Ready-To-Use Framework: Playwright + TypeScript

A scalable, modular, and easy-to-extend UI automation framework built with [Playwright](https://playwright.dev/) and [TypeScript](https://www.typescriptlang.org/). Supports multiple user roles, test data management, and reusable page objects for real-world E2E testing.

---

## 📂 Project Structure

```
├── src/
│   ├── config/               # Test configuration (env, base URLs)
│   ├── fixtures/             # Login/Auth/session fixtures
│   ├── pages/                # Page Object Model classes
│   ├── testdata/             # JSON test data
│   ├── tests/                # Test specs
│   └── utils/                # Helpers (e.g., logging, session cleanup)
├── .gitignore
├── package.json
├── playwright.config.ts      # Playwright project & test config
├── tsconfig.json             # TypeScript config
```

---

## 🚀 Features

- ✅ Playwright + TypeScript setup
- ✅ Page Object Model (POM) structure
- ✅ Multi-user login fixture (`authFixture.ts`)
- ✅ Multi-user login session management
- ✅ Test data driven from JSON
- ✅ Session handling and cleanup
- ✅ Headed & UI test runner support (`npx playwright test --ui`)
- ✅ Modular utilities (`loggers.ts`, `clearAllSessions.ts`)

---

## 🛠 Installation

```bash
git clone https://github.com/sandipchopkar95/Ready-To-Use-Framework-Playwright-Typescript.git
cd Ready-To-Use-Framework-Playwright-Typescript
npm install
```

---

## 📦 Run Tests

- Run all tests:
  ```bash
  npx playwright test
  ```

- Open UI mode (headed):
  ```bash
  npx playwright test --ui --headed
  ```

---

## 🧪 Sample Test File

```ts
// src/tests/demotest.spec.ts

   test('Admin login', async ({ adminPage }) => {
        const dashboard = new DashboardPage(adminPage);
        await dashboard.navigateToUrl(testConfig.endpoints.dashboardUrl);
        const adminUserText = await dashboard.getLoginUserName();
        expect(adminUserText).toEqual('manda user');
    });
```

---

## 👤 Author

**Sandip Chopkar**  
- [GitHub Profile](https://github.com/sandipchopkar95)  
- [LinkedIn Profile](https://www.linkedin.com/in/sandip-chopkar)

---

## 📄 License

This project is licensed under the MIT License.
