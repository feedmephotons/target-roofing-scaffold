import { test, expect } from '@playwright/test';

test.describe('Tier 4: Real-world User Scenario Flows', () => {

  test('Scenario 1: Roof Damage Emergency Repair Flow', async ({ page }) => {
    // 1. User lands on homepage
    await page.goto('/');
    
    // 2. User notices the phone number for emergency repair and navigation
    const headerPhone = page.locator('a[href="tel:239-332-5707"]').first();
    await expect(headerPhone).toBeVisible();

    // 3. User clicks on "Contact" in the header
    const isMobile = (page.viewportSize()?.width ?? 1280) < 1024;
    if (isMobile) {
      await page.locator('button.lg\\:hidden').click();
      await page.locator('nav.bg-white div.lg\\:hidden a[href="/contact"]').first().click();
    } else {
      const contactNav = page.locator('nav a[href="/contact"]').first();
      await contactNav.click();
    }
    await page.waitForURL('**/contact');

    // 4. User fills out the form specifically requesting urgent roof repairs
    await page.fill('input[name="firstName"]', 'Emergency');
    await page.fill('input[name="lastName"]', 'Customer');
    await page.fill('input[name="phone"]', '239-555-9111');
    await page.fill('input[name="email"]', 'leak@emergency.com');
    await page.fill('input[name="streetAddress"]', '999 Waterlogged Ave');
    await page.fill('input[name="city"]', 'Fort Myers');
    await page.fill('input[name="zip"]', '33919');
    await page.selectOption('select[name="service"]', 'repairs');
    await page.fill('textarea[name="message"]', 'URGENT: Large active leak in commercial building warehouse section.');

    // 5. Submit the form
    await page.click('button[type="submit"]');

    // 6. Verify confirmation message displays
    await expect(page.locator('text=Thank you for your inquiry')).toBeVisible();
  });

  test('Scenario 2: Naples Local Search & Landing Page Conversion Flow', async ({ page }) => {
    // 1. User search lands them directly on the Naples Roof Replacement page
    const response = await page.goto('/locations/naples/roof-replacement');
    expect(response?.status()).toBe(200);

    // 2. User reads local Naples reviews and code details (verifying dynamic content existence)
    await expect(page.locator('h1')).toContainText(/Naples/i);
    await expect(page.locator('h1')).toContainText(/Replacement/i);
    
    // 3. User converts by filling out the embedded contact form
    await page.fill('input[name="firstName"]', 'Naples');
    await page.fill('input[name="lastName"]', 'Manager');
    await page.fill('input[name="phone"]', '239-555-0909');
    await page.fill('input[name="email"]', 'naples.manager@coastal.com');
    
    if (await page.locator('input[name="streetAddress"]').isVisible()) {
      await page.fill('input[name="streetAddress"]', '500 5th Ave S');
      await page.fill('input[name="city"]', 'Naples');
      await page.fill('input[name="zip"]', '34102');
    }

    await page.click('button[type="submit"]');

    // 4. Verification screen confirms inquiry
    await expect(page.locator('text=Thank you').or(page.locator('text=received'))).toBeVisible();
  });

  test('Scenario 3: HOA Board Member Softwash Estimate Flow', async ({ page }) => {
    // 1. User navigates directly to the softwash roof cleaning page
    await page.goto('/softwash');

    // 2. Reads about softwash vs pressure washing, decides to get estimate
    await expect(page.locator('h1')).toContainText("Roof Cleaning & Soft Wash");

    // 3. Fills in HOA community details
    await page.fill('input[name="firstName"]', 'President');
    await page.fill('input[name="lastName"]', 'HOA Board');
    await page.fill('input[name="phone"]', '941-555-1212');
    await page.fill('input[name="email"]', 'board@colonialhoa.com');
    await page.fill('input[name="serviceAddress"]', 'Colonial Country Club Club House, Fort Myers, FL');

    // 4. Submits request
    await page.click('button[type="submit"]');

    // 5. Verify thank you message screen
    await expect(page.locator('text=Thank You!')).toBeVisible();
  });

  test('Scenario 4: Property Manager Project Progress Verification Flow', async ({ page }) => {
    // 1. Property Manager logs in to portal to check active projects
    await page.goto('/portal');
    await page.fill('input[type="email"]', 'manager@coastalrealty.com');
    await page.fill('input[type="password"]', 'secure123');
    await page.click('button[type="submit"]');

    // 2. Manager finds the active project "Colonial Country Club" and verifies progress is 65%
    const projectCard = page.locator('div.rounded-xl').filter({ hasText: 'Colonial Country Club - Bldg 12' }).first();
    await expect(projectCard).toBeVisible();
    await expect(projectCard.locator('text=65%')).toBeVisible();

    // 3. Manager navigates to the messages tab to check for progress photos
    const messagesTab = page.locator('button:has-text("messages")');
    await messagesTab.click();
    await expect(page.locator('text=Progress photos uploaded for Colonial Country Club')).toBeVisible();
  });

  test('Scenario 5: Career Application Navigation Flow', async ({ page }) => {
    // 1. Job seeker visits careers page to check vacancies
    await page.goto('/careers');
    await expect(page.locator('h1')).toContainText("Join the Target Roofing Team");
    
    // 2. Seeker finds "Roofing Technician" or similar career slot
    // We expect some description or open jobs list to be visible
    await expect(page.locator('text=Current Openings').first()).toBeVisible();

    // 3. Seeker clicks CTA to contact HR or apply
    const isMobile = (page.viewportSize()?.width ?? 1280) < 1024;
    if (isMobile) {
      await page.locator('button.lg\\:hidden').click();
      const applyCta = page.locator('nav.bg-white div.lg\\:hidden a[href="/contact"]').first();
      await expect(applyCta).toBeVisible();
      await applyCta.click();
    } else {
      const applyCta = page.locator('a[href="/contact"]').first();
      await expect(applyCta).toBeVisible();
      await applyCta.click();
    }

    // 4. Arrives on contact page and fills information
    await page.waitForURL('**/contact');
    await page.fill('input[name="firstName"]', 'Applicant');
    await page.fill('input[name="lastName"]', 'Job');
    await page.fill('input[name="phone"]', '239-555-7788');
    await page.fill('input[name="email"]', 'applicant@job.com');
    await page.fill('input[name="streetAddress"]', '123 Career Way');
    await page.fill('input[name="city"]', 'Tampa');
    await page.fill('input[name="zip"]', '33602');
    await page.selectOption('select[name="service"]', 'free-estimate');
    await page.fill('textarea[name="message"]', 'Applying for the Commercial Roofing Technician position advertised.');
  });
});
