import { test, expect } from '@playwright/test';

test.describe('Tier 3: Cross-Feature Combinations', () => {

  test('Journey 1: Homepage -> Roofing Services Repairs Card -> Contact Form Submit', async ({ page }) => {
    // 1. Visit homepage
    await page.goto('/');
    
    // 2. Click Repairs card link
    const repairsLink = page.locator('main a[href="/roofing-services#repairs"]').first();
    await repairsLink.scrollIntoViewIfNeeded();
    await expect(repairsLink).toBeVisible();
    await repairsLink.click();
    await page.waitForURL('**/roofing-services#repairs');

    // 3. Navigate to contact page from nav/CTA
    const isMobile = (page.viewportSize()?.width ?? 1280) < 1024;
    if (isMobile) {
      await page.locator('button.lg\\:hidden').click();
      await page.locator('nav.bg-white div.lg\\:hidden a[href="/contact"]').first().click();
    } else {
      const contactNav = page.locator('nav a[href="/contact"]').first();
      await expect(contactNav).toBeVisible();
      await contactNav.click();
    }
    await page.waitForURL('**/contact');

    // 4. Submit contact form
    await page.fill('input[name="firstName"]', 'Journey');
    await page.fill('input[name="lastName"]', 'Tester');
    await page.fill('input[name="phone"]', '239-555-0155');
    await page.fill('input[name="email"]', 'journey@example.com');
    await page.fill('input[name="streetAddress"]', '123 Journey Rd');
    await page.fill('input[name="city"]', 'Tampa');
    await page.fill('input[name="zip"]', '33602');
    await page.selectOption('select[name="service"]', 'repairs');
    await page.fill('textarea[name="message"]', 'Cross-feature test message.');
    
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Thank you for your inquiry')).toBeVisible();
  });

  test('Journey 2: Localized Landing Page Form Submission', async ({ page }) => {
    // 1. Visit Fort Myers Roof Repair landing page (expected to exist after Milestone 5)
    const response = await page.goto('/locations/fort-myers/roof-repair');
    // If not implemented, skip this check to allow the test framework to run but mark failure on this specific test
    expect(response?.status()).toBe(200);

    // 2. Fill local page contact form (embedded directly on the landing page)
    await page.fill('input[name="firstName"]', 'Local');
    await page.fill('input[name="lastName"]', 'Fort Myers');
    await page.fill('input[name="phone"]', '239-555-0211');
    await page.fill('input[name="email"]', 'local.fm@example.com');
    
    // Some landing page forms might have fewer or matching fields depending on template. Let's fill standard contact details.
    if (await page.locator('input[name="streetAddress"]').isVisible()) {
      await page.fill('input[name="streetAddress"]', '100 Broadway');
      await page.fill('input[name="city"]', 'Fort Myers');
      await page.fill('input[name="zip"]', '33901');
    }

    await page.click('button[type="submit"]');
    
    // Expect success message
    await expect(page.locator('text=Thank you').or(page.locator('text=received'))).toBeVisible();
  });

  test('Journey 3: News Article -> Request a Free Estimate Navigation', async ({ page }) => {
    // 1. Visit target news listing
    await page.goto('/target-news');

    // 2. Click the first news article
    const articleLink = page.locator('a[href^="/target-news/"]').first();
    await articleLink.click();
    await expect(page.locator('text=Back to News')).toBeVisible();

    // 3. Find and click "Request a Free Estimate" CTA at the bottom of the article
    const estimateCta = page.locator('text=Request a Free Estimate').first();
    await expect(estimateCta).toBeVisible();
    await estimateCta.click();

    // 4. Verify we are on contact page
    await page.waitForURL('**/contact');
    await expect(page.locator('h1')).toContainText('Contact Us');
  });

  test('Journey 4: Portal Login -> Dashboard Tab Navigation -> Log Out', async ({ page }) => {
    // 1. Visit portal login
    await page.goto('/portal');
    
    // 2. Fill details and sign in
    await page.fill('input[type="email"]', 'john.davis@coastal.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');

    // 3. Check dashboard renders
    await expect(page.locator('text=John Davis')).toBeVisible();

    // 4. Click invoices tab
    const invoicesTab = page.locator('button:has-text("invoices")');
    await expect(invoicesTab).toBeVisible();
    await invoicesTab.click();
    await expect(page.locator('text=Invoice').first()).toBeVisible();
    await expect(page.locator('text=INV-4821')).toBeVisible();

    // 5. Click sign out
    const signOutBtn = page.locator('button:has-text("Sign Out")');
    await expect(signOutBtn).toBeVisible();
    await signOutBtn.click();

    // 6. Verify we are back on login form
    await expect(page.locator('text=Welcome Back')).toBeVisible();
  });

  test('Journey 5: Softwash Page -> Roofing Services Navigation', async ({ page }) => {
    // 1. Visit softwash page
    await page.goto('/softwash');
    
    // 2. Click navigation link to roofing services
    const isMobile = (page.viewportSize()?.width ?? 1280) < 1024;
    if (isMobile) {
      await page.locator('button.lg\\:hidden').click();
      await page.locator('nav.bg-white div.lg\\:hidden a[href="/roofing-services"]').first().click();
    } else {
      const headerServicesLink = page.locator('nav a[href="/roofing-services"]').first();
      await expect(headerServicesLink).toBeVisible();
      await headerServicesLink.click();
    }
    
    // 3. Verify we are on roofing services page
    await page.waitForURL('**/roofing-services');
    await expect(page.locator('h1')).toContainText("Extend Your Roof's Lifespan with Expert Repairs & Maintenance");
  });
});
