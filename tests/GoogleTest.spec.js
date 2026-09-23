import { test, expect } from '@playwright/test';


test('Google Search Test', async ({ page }) => {

  // Open website
  await page.goto('https://www.google.com/');

  // Verify title
  await expect(page).toHaveTitle(/Google/);

  // Search something
  await page.getByRole('combobox', { name: 'Search' }).fill('Playwright');

  // Press Enter
  await page.getByRole('combobox', { name: 'Search' }).press('Enter');

  // Verify result page
  await expect(page).toHaveURL(/search/);

});