import { test, expect } from '@playwright/test';

test('TC_LOG_016 - Verify username/password case sensitivity', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByPlaceholder('Username').fill('admin');
  await page.getByPlaceholder('Password').fill('ADMIN123');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText(/Invalid credentials|Invalid username|Password is invalid/)).toBeVisible();
  await expect(page).toHaveURL(/auth\/login/);
});
