import { test, expect } from '@playwright/test';

test('TC_LOG_007 - Verify tab-key navigation order', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  const usernameField = page.getByPlaceholder('Username');
  const passwordField = page.getByPlaceholder('Password');
  const loginButton = page.getByRole('button', { name: 'Login' });

  await usernameField.click();
  await expect(usernameField).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(passwordField).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(loginButton).toBeFocused();
});
