const { test, expect } = require('@playwright/test');

test('invalid password test', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    await page.locator('input[name="username"]').fill('Admin');
    await page.locator('input[name="password"]').fill('wrong-password');
    await page.locator("button[type='submit']").click();

    const errorMessage = page.locator("xpath=//p[contains(@class,'oxd-alert-content-text')]");
    await expect(errorMessage).toHaveText('Invalid credentials');
});