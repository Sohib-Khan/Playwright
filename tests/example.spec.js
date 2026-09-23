// @ts-check
import { test, expect } from '@playwright/test';

test('Invalid Login', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/');

  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');

  await page.getByRole('textbox', { name: 'Password' }).fill('wrong123');

  await page.getByRole('button', { name: 'Login' }).click();

  const errorMessage = page.getByText('Invalid credentials');

  await expect(errorMessage).toBeVisible();

  console.log('Error Message:', await errorMessage.textContent());
});

 