import { test, expect } from '@playwright/test';

test('TC_LOG_015 - Verify login with both Username and Password empty', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByRole('button', { name: 'Login' }).click();

  const requiredErrors = page.getByText('Required');

  await expect(requiredErrors).toHaveCount(2);
  await expect(requiredErrors.first()).toBeVisible();
  await expect(requiredErrors.nth(1)).toBeVisible();
});
 