import { test, expect } from '@playwright/test';

test('TC_LOG_012 - Verify invalid Username login fails', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByPlaceholder('Username').fill('invalidusername');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText(/Invalid credentials|Invalid username|Password is invalid/)).toBeVisible();
});
