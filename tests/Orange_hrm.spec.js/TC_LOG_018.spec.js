import { test, expect } from '@playwright/test';
//Regression

test('TC_LOG_018 - Verify successful login navigates to the correct Dashboard', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/.*(dashboard|index\.php).*|.*\/web\/index\.php\/dashboard\/index$/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});
