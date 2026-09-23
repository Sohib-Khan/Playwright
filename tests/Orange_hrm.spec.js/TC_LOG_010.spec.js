import { test, expect } from '@playwright/test';

test('TC_LOG_010 - Verify login page remains usable after browser refresh', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  const usernameField = page.getByPlaceholder('Username');
  const passwordField = page.getByPlaceholder('Password');

  await expect(usernameField).toBeVisible();
  await expect(passwordField).toBeVisible();

  await page.reload();

  await expect(page.getByPlaceholder('Username')).toBeVisible();
  await expect(page.getByPlaceholder('Password')).toBeVisible();

  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');

  await expect(page.getByPlaceholder('Username')).toHaveValue('Admin');
  await expect(page.getByPlaceholder('Password')).toHaveValue('admin123');
});
