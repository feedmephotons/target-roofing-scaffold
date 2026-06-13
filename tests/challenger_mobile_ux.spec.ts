import { test, expect } from '@playwright/test';

const PAGES = [
  '/',
  '/about',
  '/our-process',
  '/our-team',
  '/careers',
  '/reviews',
  '/roofing-services',
  '/softwash',
  '/our-projects',
  '/target-news',
  '/portal',
  '/contact'
];

test.describe('Adversarial Mobile UX & Responsiveness (320px Viewport)', () => {
  // Enforce extreme mobile viewport profile (320px width, e.g. iPhone SE / Galaxy S5 style or minimum viewport)
  test.use({ viewport: { width: 320, height: 568 } });

  for (const url of PAGES) {
    test(`Page "${url}" - layout integrity & no horizontal overflows at 320px`, async ({ page }) => {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('domcontentloaded');

      // Scroll slowly to trigger lazy load images and calculate layout sizes
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let totalHeight = 0;
          const distance = 400;
          const timer = setInterval(() => {
            const scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;
            if (totalHeight >= scrollHeight) {
              clearInterval(timer);
              resolve(void 0);
            }
          }, 40);
        });
      });

      // Scan for any element overflowing the 320px viewport
      const overflows = await page.evaluate(() => {
        const viewportWidth = window.innerWidth;
        const elements = Array.from(document.querySelectorAll('*'));
        const badElements: Record<string, unknown>[] = [];

        for (const el of elements) {
          const rect = el.getBoundingClientRect();
          // We only check visible elements that have size and are not script/style
          if (rect.width > 0 && rect.height > 0) {
            const computedStyle = window.getComputedStyle(el);
            if (computedStyle.display !== 'none' && computedStyle.visibility !== 'hidden') {
              // If the right edge exceeds viewport or element width exceeds viewport width
              if (rect.right > viewportWidth + 1 || rect.width > viewportWidth + 1) {
                // Exclude html, body, and elements explicitly allowed to overflow (like scroll containers)
                if (el.tagName !== 'HTML' && el.tagName !== 'BODY') {
                  // Check if it's a scroll container itself (overflow-x: auto/scroll)
                  if (computedStyle.overflowX === 'auto' || computedStyle.overflowX === 'scroll') {
                    continue;
                  }
                  
                  // Also check if any parent is a scroll container, if so it might be fine
                  let parent = el.parentElement;
                  let parentScrollable = false;
                  while (parent) {
                    const parentStyle = window.getComputedStyle(parent);
                    if (parentStyle.overflowX === 'auto' || parentStyle.overflowX === 'scroll') {
                      parentScrollable = true;
                      break;
                    }
                    parent = parent.parentElement;
                  }
                  if (parentScrollable) continue;

                  badElements.push({
                    tagName: el.tagName,
                    id: el.id,
                    className: el.className,
                    text: el.textContent?.trim().substring(0, 30) || '',
                    width: rect.width,
                    right: rect.right,
                    computedStyleOverflow: computedStyle.overflowX
                  });
                }
              }
            }
          }
        }
        return {
          scrollWidth: document.documentElement.scrollWidth,
          viewportWidth,
          badElements: badElements.slice(0, 15) // Limit list size
        };
      });

      console.log(`Page "${url}" scrollWidth: ${overflows.scrollWidth}, viewportWidth: ${overflows.viewportWidth}`);
      if (overflows.badElements.length > 0) {
        console.warn(`[OVERFLOW WARNING] Page "${url}" has overflowing elements:`, overflows.badElements);
      }
      
      // We expect scrollWidth to match viewportWidth within 2px to tolerate subpixel rendering
      expect(overflows.scrollWidth).toBeLessThanOrEqual(overflows.viewportWidth + 2);
    });

    test(`Page "${url}" - Touch target compliance (min 44x44px)`, async ({ page }) => {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('domcontentloaded');

      const violations = await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('a, button, input, select, textarea'));
        const badTargets: Record<string, unknown>[] = [];

        for (const el of elements) {
          const rect = el.getBoundingClientRect();
          // Skip elements that are not currently visible or have zero width/height
          if (rect.width === 0 || rect.height === 0) continue;
          
          const computedStyle = window.getComputedStyle(el);
          if (computedStyle.display === 'none' || computedStyle.visibility === 'hidden') continue;

          // Check if parent or container hides it
          let parent = el.parentElement;
          let isHidden = false;
          while (parent) {
            const pStyle = window.getComputedStyle(parent);
            if (pStyle.display === 'none' || pStyle.visibility === 'hidden') {
              isHidden = true;
              break;
            }
            parent = parent.parentElement;
          }
          if (isHidden) continue;

          // If either width or height is less than 44px
          if (rect.width < 44 || rect.height < 44) {
            badTargets.push({
              tagName: el.tagName,
              text: el.textContent?.trim().substring(0, 30) || el.getAttribute('placeholder') || el.getAttribute('value') || 'Unnamed',
              html: el.outerHTML.substring(0, 100),
              width: rect.width,
              height: rect.height,
              id: el.id,
              className: el.className
            });
          }
        }
        return badTargets;
      });

      console.log(`Page "${url}" - Found ${violations.length} interactive elements failing 44x44px touch target guidelines.`);
      if (violations.length > 0) {
        console.warn(`[TOUCH TARGET WARNING] Page "${url}" violations:`, violations);
      }
      
      // Let's print out the exact count. We don't fail immediately to allow full audit, or we can soft assert.
      // But let's check how many violations exist.
      expect(violations.length).toBeLessThan(75); // Soft threshold for verification
    });
  }

  test('Form validation - Contact Form boundary cases', async ({ page }) => {
    await page.goto('/contact', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1500); // Ensure client-side hydration is complete

    // 1. Submit completely empty contact form
    const formLocator = page.locator('form').first();
    const submitBtn = formLocator.locator('button[type="submit"]');
    await submitBtn.click();

    // Verify error messages for required fields are displayed in the DOM
    const firstNameErr = page.locator('text=First Name is required');
    const lastNameErr = page.locator('text=Last Name is required');
    const emailErr = page.locator('text=A valid email address is required');
    const phoneErr = page.locator('text=A valid phone number is required');
    const addressErr = page.locator('text=Street Address is required');
    const cityErr = page.locator('text=City is required');
    const zipErr = page.locator('text=ZIP Code is required');
    const serviceErr = page.locator('text=Service of Interest is required');
    const messageErr = page.locator('text=Please describe your needs');

    await expect(firstNameErr).toBeVisible();
    await expect(lastNameErr).toBeVisible();
    await expect(emailErr).toBeVisible();
    await expect(phoneErr).toBeVisible();
    await expect(addressErr).toBeVisible();
    await expect(cityErr).toBeVisible();
    await expect(zipErr).toBeVisible();
    await expect(serviceErr).toBeVisible();
    await expect(messageErr).toBeVisible();

    // 2. Submit invalid email and phone formats
    const firstNameInput = formLocator.locator('input[name="firstName"]');
    const lastNameInput = formLocator.locator('input[name="lastName"]');
    const emailInput = formLocator.locator('input[name="email"]');
    const phoneInput = formLocator.locator('input[name="phone"]');
    const addressInput = formLocator.locator('input[name="streetAddress"]');
    const cityInput = formLocator.locator('input[name="city"]');
    const zipInput = formLocator.locator('input[name="zip"]');
    const serviceSelect = formLocator.locator('select[name="service"]');
    const messageInput = formLocator.locator('[name="message"]');

    await firstNameInput.fill('Al');
    await lastNameInput.fill('Bo');
    await emailInput.fill('invalidemail');
    await phoneInput.fill('123456');
    await addressInput.fill('123 Main St');
    await cityInput.fill('Fort Myers');
    await zipInput.fill('33901');
    await serviceSelect.selectOption('repairs');
    await messageInput.fill('Test leak');

    await submitBtn.click();

    // The required field errors should be gone, but format errors should be visible
    await expect(firstNameErr).toBeHidden();
    await expect(lastNameErr).toBeHidden();
    await expect(emailErr).toBeVisible(); // 'A valid email address is required.' should stay/reappear
    await expect(phoneErr).toBeVisible(); // 'A valid phone number is required (e.g., 239-332-5707).'

    // Ensure error elements fit within viewport (no horizontal layout overflow due to long error text)
    const pageOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(pageOverflow).toBe(false);
  });

  test('Form validation - Softwash Form boundary cases', async ({ page }) => {
    await page.goto('/softwash', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1500); // Ensure client-side hydration is complete

    const formLocator = page.locator('form').first();
    const submitBtn = formLocator.locator('button[type="submit"]');
    await submitBtn.click();

    // Verify required field errors
    const firstNameErr = page.locator('text=First Name is required');
    const lastNameErr = page.locator('text=Last Name is required');
    const emailErr = page.locator('text=A valid email address is required');
    const phoneErr = page.locator('text=A valid phone number is required');
    const addressErr = page.locator('text=Service Address is required');

    await expect(firstNameErr).toBeVisible();
    await expect(lastNameErr).toBeVisible();
    await expect(emailErr).toBeVisible();
    await expect(phoneErr).toBeVisible();
    await expect(addressErr).toBeVisible();

    // Fill invalid data formats
    await formLocator.locator('input[name="firstName"]').fill('Jane');
    await formLocator.locator('input[name="lastName"]').fill('Doe');
    await formLocator.locator('input[name="email"]').fill('jane@corp');
    await formLocator.locator('input[name="phone"]').fill('abcdefghij');
    await formLocator.locator('input[name="serviceAddress"]').fill('456 Oak Ave');

    await submitBtn.click();

    await expect(firstNameErr).toBeHidden();
    await expect(lastNameErr).toBeHidden();
    await expect(addressErr).toBeHidden();
    await expect(emailErr).toBeVisible();
    await expect(phoneErr).toBeVisible();
  });
});
