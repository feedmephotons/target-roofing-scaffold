import { test, expect } from '@playwright/test';

test.describe('Tier 1: Feature Coverage', () => {

  // --- 1. Root Page (Homepage) ---
  test.describe('Homepage', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
    });

    test('should display main navigation and header elements', async ({ page }) => {
      // Check license number in top bar
      await expect(page.locator('text=License #CCC1334168').first()).toBeVisible();
      // Check phone number link
      const phoneLink = page.locator('a[href="tel:239-332-5707"]').first();
      await expect(phoneLink).toBeVisible();
      // Check logo visibility
      const logo = page.locator('img[alt="Target Roofing & Sheet Metal"]');
      await expect(logo).toBeVisible();
    });

    test('should render hero section with YouTube iframe background and CTAs', async ({ page }) => {
      // Verify hero background iframe exists
      const heroIframe = page.locator('iframe[title="Target Roofing Background Video"]');
      await expect(heroIframe).toBeAttached();
      
      // Verify primary CTAs
      const portalCta = page.locator('a[href="/portal"]').first();
      const processCta = page.locator('a[href="/our-process"]').first();
      await expect(portalCta).toBeVisible();
      await expect(processCta).toBeVisible();
    });

    test('should display services overview cards with links', async ({ page }) => {
      const serviceLinks = [
        '/roofing-services#repairs',
        '/roofing-services#reroofing',
        '/roofing-services#maintenance-plans',
        '/roofing-services#new-roofs',
      ];
      for (const href of serviceLinks) {
        const link = page.locator(`a[href="${href}"]`).first();
        await expect(link).toBeVisible();
      }
    });

    test('should contain testimonials section with reviews', async ({ page }) => {
      const testimonialsHeader = page.locator('text=What Customers Say About');
      await expect(testimonialsHeader).toBeVisible();
      
      // Check for at least one testimonial author
      await expect(page.locator('text=Katie Edmunds')).toBeVisible();
      await expect(page.locator('text=Casey B.')).toBeVisible();
    });

    test('should contain news section showing latest posts', async ({ page }) => {
      const newsHeader = page.locator('text=News About Target Roofing');
      await expect(newsHeader).toBeVisible();
      
      const blogCta = page.locator('a[href="/target-news"]').first();
      await expect(blogCta).toBeVisible();
    });
  });

  // --- 2. Static Pages ---
  test.describe('Static Pages', () => {
    test('About Page: should render company information, value propositions, and certifications', async ({ page }) => {
      await page.goto('/about');
      await expect(page.locator('h1')).toContainText("Extend Your Roof's Lifespan with the Right Repair & Maintenance Partner");
      await expect(page.locator('text=GAF Master Elite Contractor')).toBeVisible();
      await expect(page.locator('text=BBB A+ Rating')).toBeVisible();
    });

    test('Process Page: should display step-by-step methodology', async ({ page }) => {
      await page.goto('/our-process');
      // The process page lists steps. Let's make sure it contains the header or key steps
      await expect(page.locator('h1')).toBeVisible();
    });

    test('Team Page: should load crew list and bios', async ({ page }) => {
      await page.goto('/our-team');
      await expect(page.locator('h1')).toBeVisible();
    });

    test('Careers Page: should show job vacancies and description', async ({ page }) => {
      await page.goto('/careers');
      await expect(page.locator('h1')).toBeVisible();
    });

    test('Reviews Page: should render client testimonials list', async ({ page }) => {
      await page.goto('/reviews');
      await expect(page.locator('h1')).toBeVisible();
    });
  });

  // --- 3. Roofing Services & Softwash ---
  test.describe('Roofing Services & Softwash', () => {
    test('Roofing Services: should display categories and repair/maintenance details', async ({ page }) => {
      await page.goto('/roofing-services');
      await expect(page.locator('h1')).toContainText("Extend Your Roof's Lifespan with Expert Repairs & Maintenance");
      await expect(page.locator('text=Repairs').first()).toBeVisible();
      await expect(page.locator('text=Maintenance Plans').first()).toBeVisible();
    });

    test('Softwash Page: should detail softwash process and contain estimate form', async ({ page }) => {
      await page.goto('/softwash');
      await expect(page.locator('h1')).toContainText("Roof Cleaning & Soft Wash");
      // Look for the embedded estimate form
      await expect(page.locator('form')).toBeVisible();
    });

    test('Commercial HOA: should render commercial maintenance details', async ({ page }) => {
      await page.goto('/commercial-hoa-roof-maintenance');
      await expect(page.locator('h1')).toBeVisible();
    });
  });

  // --- 4. Portfolio Projects ---
  test.describe('Portfolio Projects', () => {
    test('Portfolio Page: should display completed project list/grid', async ({ page }) => {
      await page.goto('/our-projects');
      await expect(page.locator('h1')).toBeVisible();
    });
  });

  // --- 5. Blog / News ---
  test.describe('News & Blogs', () => {
    test('News Listing: should show blog post list', async ({ page }) => {
      await page.goto('/target-news');
      await expect(page.locator('h1')).toContainText('Target News');
    });

    test('Blog Detail: should load individual blog posts dynamically via slug', async ({ page }) => {
      await page.goto('/target-news');
      
      // Click the first "Read More" link
      const readMoreLink = page.locator('a[href^="/target-news/"]').first();
      await expect(readMoreLink).toBeVisible();
      const href = await readMoreLink.getAttribute('href');
      
      await readMoreLink.click();
      await page.waitForURL(`**${href}`);
      
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('text=Back to News')).toBeVisible();
    });
  });

  // --- 6. Video Gallery ---
  test.describe('Video Gallery', () => {
    test('Gallery Page: should load video gallery layout and play embeds', async ({ page }) => {
      await page.goto('/video-gallery');
      await expect(page.locator('h1')).toContainText('Video Gallery');
      // Ensure video cards are present and click play to show iframe
      const playButton = page.locator('button[aria-label^="Play"]').first();
      await expect(playButton).toBeVisible();
      await playButton.click();
      await expect(page.locator('iframe').first()).toBeVisible();
    });
  });

  // --- 7. Localized Landing Pages (Will fail initially, expected) ---
  test.describe('Localized Landing Pages', () => {
    test('Fort Myers Roof Repair: should return 200, contain custom title & dynamic location layout', async ({ page }) => {
      const response = await page.goto('/locations/fort-myers/roof-repair');
      expect(response?.status()).toBe(200);
      
      // Expected SEO Metadata
      await expect(page).toHaveTitle(/Fort Myers/);
      
      // Form existence
      await expect(page.locator('form')).toBeVisible();
    });
  });

  // --- 8. Forms & Intakes ---
  test.describe('Forms', () => {
    test('Contact Page Form: should submit successfully with valid data', async ({ page }) => {
      await page.goto('/contact');
      
      await page.fill('input[name="firstName"]', 'Jane');
      await page.fill('input[name="lastName"]', 'Doe');
      await page.fill('input[name="phone"]', '239-555-0199');
      await page.fill('input[name="email"]', 'jane.doe@example.com');
      await page.fill('input[name="streetAddress"]', '456 Elm St');
      await page.fill('input[name="city"]', 'Naples');
      await page.fill('input[name="zip"]', '34102');
      await page.selectOption('select[name="service"]', { value: 'repairs' });
      await page.fill('textarea[name="message"]', 'Test E2E contact form message submission.');
      
      await page.click('button[type="submit"]');
      
      // Verify success message
      const successMessage = page.locator('text=Thank you for your inquiry');
      await expect(successMessage).toBeVisible();
    });

    test('Softwash Form: should submit successfully with valid data', async ({ page }) => {
      await page.goto('/softwash');
      
      await page.fill('input[name="firstName"]', 'Bob');
      await page.fill('input[name="lastName"]', 'Johnson');
      await page.fill('input[name="phone"]', '239-555-0144');
      await page.fill('input[name="email"]', 'bob.j@example.com');
      await page.fill('input[name="serviceAddress"]', '789 Palm Ave, Sarasota, FL 34236');
      
      await page.click('button[type="submit"]');
      
      const successMessage = page.locator('text=Thank You!');
      await expect(successMessage).toBeVisible();
    });

    test('Portal Login Form: should log in successfully with valid credentials and show dashboard', async ({ page }) => {
      await page.goto('/portal');
      
      await page.fill('input[type="email"]', 'manager@coastalrealty.com');
      await page.fill('input[type="password"]', 'secure123');
      
      await page.click('button[type="submit"]');
      
      // Verify dashboard is shown
      await expect(page.locator('text=Good Morning, John')).toBeVisible();
      await expect(page.locator('text=Active Projects')).toBeVisible();
    });
  });
});
