import { test, expect } from '@playwright/test';

test.describe('Tier 2: Boundary & Corner Cases', () => {

  // --- 1. Contact Form Boundary Cases ---
  test.describe('Contact Form Boundaries', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/contact');
    });

    test('should show validation errors on empty submission', async ({ page }) => {
      await page.click('button[type="submit"]');
      
      // Look for individual validation messages
      await expect(page.locator('text=First Name is required')).toBeVisible();
      await expect(page.locator('text=Last Name is required')).toBeVisible();
      await expect(page.locator('text=A valid email address is required')).toBeVisible();
      await expect(page.locator('text=A valid phone number is required')).toBeVisible();
      await expect(page.locator('text=Street Address is required')).toBeVisible();
      await expect(page.locator('text=City is required')).toBeVisible();
      await expect(page.locator('text=ZIP Code is required')).toBeVisible();
      await expect(page.locator('text=Service of Interest is required')).toBeVisible();
      await expect(page.locator('text=Please describe your needs')).toBeVisible();
    });

    test('should show error for invalid email format', async ({ page }) => {
      await page.fill('input[name="firstName"]', 'Test');
      await page.fill('input[name="lastName"]', 'User');
      await page.fill('input[name="phone"]', '239-332-5707');
      await page.fill('input[name="email"]', 'notanemail'); // Invalid format
      await page.fill('input[name="streetAddress"]', '123 Main St');
      await page.fill('input[name="city"]', 'Fort Myers');
      await page.fill('input[name="zip"]', '33901');
      await page.selectOption('select[name="service"]', 'repairs');
      await page.fill('textarea[name="message"]', 'Valid message details.');
      
      await page.click('button[type="submit"]');
      await expect(page.locator('text=A valid email address is required')).toBeVisible();
    });

    test('should show error for invalid phone number format', async ({ page }) => {
      await page.fill('input[name="firstName"]', 'Test');
      await page.fill('input[name="lastName"]', 'User');
      await page.fill('input[name="phone"]', '12345'); // Invalid phone
      await page.fill('input[name="email"]', 'test@example.com');
      await page.fill('input[name="streetAddress"]', '123 Main St');
      await page.fill('input[name="city"]', 'Fort Myers');
      await page.fill('input[name="zip"]', '33901');
      await page.selectOption('select[name="service"]', 'repairs');
      await page.fill('textarea[name="message"]', 'Valid message details.');

      await page.click('button[type="submit"]');
      await expect(page.locator('text=A valid phone number is required')).toBeVisible();
    });

    test('should show error for names shorter than 2 characters', async ({ page }) => {
      await page.fill('input[name="firstName"]', 'A'); // Short name
      await page.fill('input[name="lastName"]', 'B'); // Short name
      await page.fill('input[name="phone"]', '239-332-5707');
      await page.fill('input[name="email"]', 'test@example.com');
      await page.fill('input[name="streetAddress"]', '123 Main St');
      await page.fill('input[name="city"]', 'Fort Myers');
      await page.fill('input[name="zip"]', '33901');
      await page.selectOption('select[name="service"]', 'repairs');
      await page.fill('textarea[name="message"]', 'Valid message details.');

      await page.click('button[type="submit"]');
      await expect(page.locator('text=First Name is required and must be at least 2 characters')).toBeVisible();
      await expect(page.locator('text=Last Name is required and must be at least 2 characters')).toBeVisible();
    });
  });

  // --- 2. Softwash Form Boundary Cases ---
  test.describe('Softwash Form Boundaries', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/softwash');
    });

    test('should show errors on empty submission', async ({ page }) => {
      await page.click('button[type="submit"]');
      await expect(page.locator('text=First Name is required')).toBeVisible();
      await expect(page.locator('text=Last Name is required')).toBeVisible();
      await expect(page.locator('text=A valid email address is required')).toBeVisible();
      await expect(page.locator('text=A valid phone number is required')).toBeVisible();
      await expect(page.locator('text=Service Address is required')).toBeVisible();
    });

    test('should validate phone and email formats', async ({ page }) => {
      await page.fill('input[name="firstName"]', 'Test');
      await page.fill('input[name="lastName"]', 'User');
      await page.fill('input[name="phone"]', '999');
      await page.fill('input[name="email"]', 'bad_email');
      await page.fill('input[name="serviceAddress"]', '123 Main St');

      await page.click('button[type="submit"]');
      await expect(page.locator('text=A valid email address is required')).toBeVisible();
      await expect(page.locator('text=A valid phone number is required')).toBeVisible();
    });
  });

  // --- 3. Portal Login Form Boundary Cases ---
  test.describe('Portal Login Boundaries', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/portal');
    });

    test('should show errors on empty login details', async ({ page }) => {
      await page.click('button[type="submit"]');
      await expect(page.locator('text=Email address is required')).toBeVisible();
      await expect(page.locator('text=Password is required')).toBeVisible();
    });

    test('should show error for password shorter than 6 characters', async ({ page }) => {
      await page.fill('input[type="email"]', 'test@example.com');
      await page.fill('input[type="password"]', '12345'); // too short

      await page.click('button[type="submit"]');
      await expect(page.locator('text=Password must be at least 6 characters')).toBeVisible();
    });
  });

  // --- 4. Localized Router Corner Cases (Expected fail on baseline, passes on M5) ---
  test.describe('Localized Router Corner Cases', () => {
    test('should return 404 or redirect for invalid cities', async ({ page }) => {
      const response = await page.goto('/locations/chicago/roof-repair');
      expect(response?.status()).toBe(404);
    });

    test('should return 404 or redirect for invalid services', async ({ page }) => {
      const response = await page.goto('/locations/fort-myers/siding-repair');
      expect(response?.status()).toBe(404);
    });
  });
});
