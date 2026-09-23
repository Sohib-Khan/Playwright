import { test, expect } from '@playwright/test';

test.use({ video: 'on' });

test('Invalid Login', async ({ page }) => {

  // Open OrangeHRM
  await page.goto('https://opensource-demo.orangehrmlive.com/');

  // Enter username
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');

  // Enter WRONG password
  await page.getByRole('textbox', { name: 'Password' }).fill('wrong123');

  // Click Login
  await page.getByRole('button', { name: 'Login' }).click();

  // Check error message
  const errorMessage = page.getByText('Invalid credentials');

  await expect(errorMessage).toBeVisible();

  // Print actual error message in terminal
  console.log('Error Message:', await errorMessage.textContent());
});