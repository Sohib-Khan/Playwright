const { test, expect } = require('@playwright/test');

test('TC_LOG_21 - Take Screenshot', async ({ page }) => {

    await page.goto(
        'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
        { waitUntil: 'domcontentloaded' }
    );

    // Wait for Username field
    await expect(page.getByPlaceholder('Username')).toBeVisible();

    // Fill login details
    await page.getByPlaceholder('Username').fill('kjasd');
    await page.getByPlaceholder('Password').fill('Admin123');

    // Click Login
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait for page to render
    await page.waitForTimeout(2000);

    // Take screenshot
    await page.screenshot({
        path: 'screenshots/invalid-login.png',
        fullPage: true
    });

});