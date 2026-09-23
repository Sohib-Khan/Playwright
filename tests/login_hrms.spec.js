import { test, expect } from '@playwright/test';
test.use({ video: 'retain-on-failure' });

test('login Hrms', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');

  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');

  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByText('Invalid credentials').screenshot({
        path: 'screenshots/after-login8.png'
    });


 await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

  await expect(page).toHaveTitle(/OrangeHRM/);

});