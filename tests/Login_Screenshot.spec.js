const { test, expect } = require('@playwright/test');


test.use({ video: 'on' });
test('Login Screenshot', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/login');

    await page.locator('#username').fill('jlkdfjklgkjl');
    await page.locator('#password').fill('15458214');
    
    await page.getByRole('button', { name: 'Login' }).click();

    await page.screenshot({
        path: 'screenshots/after-login1.png'
    });

});