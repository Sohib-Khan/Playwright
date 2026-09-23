# Playwright Practice Project

This project is a basic Playwright setup for UI automation testing. It includes commands to install Playwright, write tests, run them in different modes, and generate reports.

## Prerequisites

Before starting, make sure you have the following installed on your machine:

- Node.js (recommended version 18 or later)
- npm (comes with Node.js)
- A modern browser (Chrome, Firefox, WebKit support is included by Playwright)

## Install Playwright

Run the following commands in the project folder:

```bash
npm init -y
npm install -D @playwright/test
npx playwright install
```

### What these commands do

- `npm init -y`  
  Creates a `package.json` file with default values.

- `npm install -D @playwright/test`  
  Installs Playwright Test and all required dependencies for testing.

- `npx playwright install`  
  Downloads the browser binaries needed to run Playwright tests.

## Verify Installation

```bash
npx playwright --version
```

This command confirms that Playwright is correctly installed.

## Useful Playwright Commands

### 1. Run all tests

```bash
npx playwright test
```

Runs all test files in the project.

### 2. Run a specific test file

```bash
npx playwright test tests/example.spec.js
```

Runs only the selected test file.

### 3. Run a test by name

```bash
npx playwright test -g "should login successfully"
```

Runs only the tests whose names match the given pattern.

### 4. Run tests in headed mode

```bash
npx playwright test --headed
```

Opens the browser UI while the test is running so you can visually inspect it.

### 5. Run tests in debug mode

```bash
npx playwright test --debug
```

Opens Playwright Inspector and lets you debug step by step.

### 6. Run tests using a specific browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

Runs the tests in a specific browser engine.

### 7. Show the HTML report

```bash
npx playwright show-report
```

Opens the generated HTML test report in the browser.

### 8. Generate screenshot for a failed test

```bash
npx playwright test --reporter=line
```

This prints a simple output and helps debug failing tests.

### 9. Run with UI mode

```bash
npx playwright test --ui
```

Launches the Playwright UI dashboard to run and inspect tests visually.

## Example Project Structure

```text
playwright-practice/
├── tests/
│   └── example.spec.js
├── playwright.config.js
├── package.json
└── package-lock.json
```

## Example Playwright Test Code

Create a file like `tests/example.spec.js` with the following code:

```js
const { test, expect } = require('@playwright/test');

test('homepage loads successfully', async ({ page }) => {
  await page.goto('https://example.com');

  await expect(page).toHaveTitle(/Example Domain/);
  await expect(page.locator('h1')).toContainText('Example Domain');
});

test('login page works', async ({ page }) => {
  await page.goto('https://example.com');

  const heading = page.locator('h1');
  await expect(heading).toBeVisible();
});
```

### Explanation

- `test(...)` defines a test case.
- `page.goto(url)` opens the website.
- `expect(...)` checks the actual result against expected conditions.
- `locator(...)` finds HTML elements.

## Example Login UI Test

```js
const { test, expect } = require('@playwright/test');

test('user can login', async ({ page }) => {
  await page.goto('https://example.com/login');

  await page.fill('input[name="username"]', 'admin');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');

  await expect(page.locator('text=Welcome')).toBeVisible();
});
```

## Common Playwright Actions

### Open a page

```js
await page.goto('https://example.com');
```

### Click an element

```js
await page.click('button');
```

### Fill a text field

```js
await page.fill('input[name="email"]', 'test@example.com');
```

### Check text visibility

```js
await expect(page.locator('text=Login')).toBeVisible();
```

### Check page title

```js
await expect(page).toHaveTitle(/Playwright/);
```

## Playwright Config File

A typical `playwright.config.js` file looks like this:

```js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  reporter: [['list'], ['html']],
});
```

### Configuration details

- `testDir`: folder where tests are stored
- `timeout`: default timeout for each test
- `headless`: runs browser without showing UI
- `screenshot`: takes screenshot when a test fails
- `trace`: saves execution trace for failures
- `reporter`: generates test output in console and HTML report

## Run the Complete Test Suite

```bash
npx playwright test
```

## Run in UI Mode

```bash
npx playwright test --ui
```

This is helpful when you want to manually run and debug tests in a visual interface.

## Helpful Debugging Tips

- Use `--headed` to see browser actions
- Use `--debug` to step through test execution
- Use `page.screenshot()` to capture screenshots during a test
- Use `console.log()` to check values manually
- Review the HTML report generated after running tests

## Example Screenshot Command inside a Test

```js
test('take screenshot', async ({ page }) => {
  await page.goto('https://example.com');
  await page.screenshot({ path: 'screenshot.png', fullPage: true });
});
```

## Summary

Playwright is a powerful automation tool for UI testing. It allows you to:

- open websites and interact with elements
- validate UI text and page states
- test login, forms, buttons, and navigation
- run tests in Chromium, Firefox, and WebKit
- generate detailed reports for debugging

## Quick Start Commands

```bash
npm init -y
npm install -D @playwright/test
npx playwright install
npx playwright test
```

This is the basic workflow for starting a Playwright UI test project.
