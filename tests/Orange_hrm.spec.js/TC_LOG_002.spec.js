import {test ,expect} from '@playwright/test';

test('TC_LOG_002 - Verify Username field', async ({page}) => {
    
//open website
await page .goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

   // Check Username field is visible
        await expect(page.getByPlaceholder('Username')).toBeVisible();
    });
