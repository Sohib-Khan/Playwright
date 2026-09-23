import { test, expect } from '@playwright/test';
test.use({ video: 'on' });

test('TC_LOG_020 - Verify application state/session consistency after logout and re-login', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.locator('input[name="username"]').fill('Admin');
  await page.locator('input[name="password"]').fill('admin123');
  await page.locator('button[type="submit"]').click();
  await expect(page).toHaveURL(/.*dashboard/i);

  await page.locator('.oxd-userdropdown-tab').click();
  await page.locator('.oxd-userdropdown-link').last().click();
  await expect(page).toHaveURL(/auth\/login/);

  await page.locator('input[name="username"]').fill('Admin');
  await page.locator('input[name="password"]').fill('admin123');
  await page.locator('button[type="submit"]').click();

  await expect(page).toHaveURL(/.*dashboard/i);
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  await expect(page.locator('.oxd-userdropdown-tab')).toBeVisible();
});
