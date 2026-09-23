import { test, expect } from '@playwright/test';

test('TC_LOG_005 - Verify Username and Password fields accept input', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  const usernameField = page.getByPlaceholder('Username');
  const passwordField = page.getByPlaceholder('Password');

  await usernameField.click();
  await usernameField.fill('Admin');
  await expect(usernameField).toHaveValue('Admin');

  await passwordField.click();
  await passwordField.fill('admin123');
  await expect(passwordField).toHaveValue('admin123');
});
