import { test, expect } from '@playwright/test';

test('TC_LOG_011 - Verify invalid email and invalid password login fails', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByPlaceholder('Username').fill('invalid@email.com');
  await page.getByPlaceholder('Password').fill('wrongpass');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText(/Invalid credentials|Password is invalid/)).toBeVisible();
});
