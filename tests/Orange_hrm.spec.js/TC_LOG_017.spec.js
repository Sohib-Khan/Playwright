import { test, expect } from '@playwright/test';


test.use({ video: 'on' });

test('TC_LOG_017 - Verify repeated invalid login attempts are handled correctly', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  for (let i = 0; i < 3; i++) {
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill(`wrongpass${i}`);
    await page.getByRole('button', { name: 'Login' }).click();

   

 await page.screenshot({
        path: 'screenshots/invalid-login3.png',
        fullPage: true
    });

    await expect(page.getByText(/Invalid credentials|Invalid username|Password is invalid/)).toBeVisible();
  }
});
