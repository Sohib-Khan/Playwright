import { test, expect } from '@playwright/test';

test('TC_LOG_001 - Valid Login', async ({ page }) => {
//open website
await page .goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

//Enter username
await page.getByRole('textbox', {name: 'Username'}).fill('Admin');

//Enter password
await page.getByRole('textbox',{name: 'Password'}).fill('admin123');

 
// 4. Click Login
    await page.getByRole('button', { name: 'Login' }).click();
    });