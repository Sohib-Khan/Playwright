import { test, expect } from '@playwright/test';

test('TC_LOG_004 - Verify Login button is visible', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});
