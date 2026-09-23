import { test, expect } from '@playwright/test';

test('TC_LOG_014 - Verify login with valid username and invalid password', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('wrongpass');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText(/Invalid credentials|Invalid username|Password is invalid/)).toBeVisible();
});
