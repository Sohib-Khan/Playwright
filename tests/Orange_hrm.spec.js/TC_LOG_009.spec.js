import { test, expect } from '@playwright/test';

test('TC_LOG_009 - Verify login page UI elements are properly aligned and visible', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  const usernameField = page.getByPlaceholder('Username');
  const passwordField = page.getByPlaceholder('Password');
  const loginButton = page.getByRole('button', { name: 'Login' });
  const orangeLogo = page.locator('img[alt="company-branding"]');

  await expect(orangeLogo).toBeVisible();
  await expect(usernameField).toBeVisible();
  await expect(passwordField).toBeVisible();
  await expect(loginButton).toBeVisible();

  await expect(usernameField).toBeVisible();
  await expect(passwordField).toBeVisible();

  const usernameBox = await usernameField.boundingBox();
  const passwordBox = await passwordField.boundingBox();
  const buttonBox = await loginButton.boundingBox();

  expect(usernameBox).not.toBeNull();
  expect(passwordBox).not.toBeNull();
  expect(buttonBox).not.toBeNull();

  if (!usernameBox || !passwordBox || !buttonBox) {
    throw new Error('One or more login UI elements are missing from the page.');
  }

  expect(usernameBox.y).toBeLessThan(passwordBox.y);
  expect(passwordBox.y).toBeLessThan(buttonBox.y);
});
