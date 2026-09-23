import { test, expect } from '@playwright/test';

//test.use({ video: 'on' });

test('Record OrangeHRM invalid login', async ({ page }) => {
	await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', {
		waitUntil: 'domcontentloaded',
	});

	await expect(page.getByPlaceholder('Username')).toBeVisible();
	await page.getByPlaceholder('Username').fill('Admin');
	await page.getByPlaceholder('Password').fill('wrong123');
	await page.getByRole('button', { name: 'Login' }).click();

	await expect(page.getByText('Invalid credentials')).toBeVisible();
});
