const { test, expect } = require('@playwright/test');

test('Login Screenshot', async ({ page }) => {
    test.setTimeout(60000);

    await page.goto('https://the-internet.herokuapp.com/login', {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
    });

    await expect(page.locator('h2')).toContainText('Login');
    await page.locator('#username').fill('tomsmith');
    await page.locator('#password').fill('SuperSecretPassword!');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('#flash')).toContainText(/You logged into a secure area!/);

    await page.screenshot({
        path: 'screenshots/after-login1.png',
        fullPage: true,
    });
});