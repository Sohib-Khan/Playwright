import { test, expect } from '@playwright/test';

test.use({ video: 'retain-on-failure' });

test('Invalid Login Test - VWO', async ({ page }) => {

    // Open the VWO Login Page
    await page.goto('https://app.vwo.com/#/login');

    // Enter invalid username/email
    await page.locator('#login-username').fill('Adminname');

    // Enter invalid password
    await page.locator('#login-password').fill('Sohibkhan');

    // Click on Sign In button
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

    await page.locator('#login-password').screenshot({
        path: `screenshots/after-login7-${timestamp}.png`
    });



    // // Wait for 2 seconds
    // await page.waitForTimeout(2000);
});