import { test, expect } from '@playwright/test';


test('SauceDemo - Login, Product and Add to Cart', async ({ page }) => {

    // 1. Open website
    await page.goto('https://www.saucedemo.com/');
    await page.waitForTimeout(1000);

    // 2. Enter username
    await page.locator('#user-name').fill('standard_user');
    await page.waitForTimeout(1000);

    // 3. Enter password
    await page.locator('#password').fill('secret_sauce');
    await page.waitForTimeout(1000);

    // 4. Click Login
    await page.locator('#login-button').click();
    await page.waitForTimeout(1500);

    // 5. Verify successful login
    await expect(page).toHaveURL(/inventory.html/);
    await page.waitForTimeout(1000);

    // 6. Verify Products heading
    await expect(page.locator('.title')).toHaveText('Products');
    console.log('Login Test Passed Successfully');
    await page.waitForTimeout(1000);


    // ==========================================
    // PRODUCT SELECTION
    // ==========================================

    // 7. Click on product
    await page.getByText('Sauce Labs Backpack').click();
    await page.waitForTimeout(1500);

    // 8. Verify product detail page
    await expect(page.locator('.inventory_details_name'))
        .toHaveText('Sauce Labs Backpack');

    console.log('Product Detail Page Verified');
    await page.waitForTimeout(1000);


    // ==========================================
    // ADD TO CART
    // ==========================================

    // 9. Click Add to Cart
    await page.getByRole('button', { name: 'Add to cart' }).click();
    await page.waitForTimeout(1500);

    console.log('Product Added to Cart');
    

    // 10. Verify cart badge
    await expect(page.locator('.shopping_cart_badge'))
        .toHaveText('1');

    console.log('Cart Badge Verified');
    await page.waitForTimeout(1000);


    // ==========================================
    // OPEN CART
    // ==========================================

    // 11. Click Cart
    await page.locator('.shopping_cart_link').click();
    await page.waitForTimeout(1500);

    // 12. Verify Cart page
    await expect(page.locator('.title')).toHaveText('Your Cart');

    console.log('Cart Page Opened');
    await page.waitForTimeout(1000);


    // ==========================================
    // VERIFY PRODUCT IN CART
    // ==========================================

    // 13. Verify product is present
    await expect(page.locator('.inventory_item_name'))
        .toHaveText('Sauce Labs Backpack');

    console.log('Product Successfully Verified in Cart');
    await page.waitForTimeout(1000);


    // ==========================================
    // CHECKOUT
    // ==========================================

    // 14. Click Checkout
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.waitForTimeout(1500);

    // 15. Verify checkout page
    await expect(page.locator('.title'))
        .toHaveText('Checkout: Your Information');

    console.log('Checkout Page Verified');

});