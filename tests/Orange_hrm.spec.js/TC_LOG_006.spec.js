import { test, expect } from '@playwright/test';

test('TC_LOG_006 - Verify password is masked', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  const passwordField = page.getByPlaceholder('Password');

  await passwordField.click();
  await passwordField.fill('admin123');

  await expect(passwordField).toHaveAttribute('type', 'password');
  await expect(passwordField).toHaveValue('admin123');
});
