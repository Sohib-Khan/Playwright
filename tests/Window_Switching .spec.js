import { test, expect } from '@playwright/test';

test('Window Switching - Playwright', async ({ page, context }) => {

    // Main window open karo
    await page.goto('https://the-internet.herokuapp.com/windows');

    console.log('Main Window URL:', page.url());

    // New tab/window open hone ka wait
    const newPagePromise = context.waitForEvent('page');

    // "Click Here" link par click
    await page.getByText('Click Here').click();

    // New window ko capture karo
    const newPage = await newPagePromise;

    // New window load hone ka wait
    await newPage.waitForLoadState();

    // New window ko front mein lao
    await newPage.bringToFront();

    // New window ka URL print
    console.log('New Window URL:', newPage.url());

    // New window par heading verify
    await expect(newPage.locator('h3')).toHaveText('New Window');

    console.log('New Window Title:', await newPage.locator('h3').textContent());
});