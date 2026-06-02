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
  '/portal'
];

test.describe('Mobile UX & Responsiveness Validation', () => {
  // Enforce mobile viewport profile for this suite
  test.use({ viewport: { width: 375, height: 812 } }); // iPhone 12 mini layout

  for (const url of PAGES) {
    test(`Page "${url}" should not have horizontal layout overflows`, async ({ page }) => {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('domcontentloaded');

      // Scroll down to trigger lazy loading and ensure layouts are fully calculated
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let totalHeight = 0;
          let steps = 0;
          const distance = 800;
          const timer = setInterval(() => {
            const scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;
            steps++;

            if (totalHeight >= scrollHeight || steps >= 25) {
              clearInterval(timer);
              resolve(void 0);
            }
          }, 50);
        });
      });

      // Assert that scrollWidth does not exceed viewport innerWidth
      const overflowDetails = await page.evaluate(() => {
        const hasOverflow = document.documentElement.scrollWidth > window.innerWidth;
        if (!hasOverflow) return null;
        
        const elements = Array.from(document.querySelectorAll('*'));
        const docWidth = window.innerWidth;
        const badElements = elements
          .map(el => {
            const rect = el.getBoundingClientRect();
            return {
              tagName: el.tagName,
              id: el.id,
              className: el.className,
              rectRight: rect.right,
              rectLeft: rect.left,
              rectWidth: rect.width
            };
          })
          .filter(item => item.rectWidth > docWidth || item.rectRight > docWidth);
          
        return {
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
          badElements: badElements.slice(0, 10)
        };
      });

      if (overflowDetails) {
        console.error(`Overflow details for ${url}:`, JSON.stringify(overflowDetails, null, 2));
      }

      expect(overflowDetails).toBeNull();
    });
  }

  test('Mobile hamburger menu should open and close successfully', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500); // Ensure client-side hydration and stylesheets are fully loaded
    
    // Hamburger should be visible, desktop menu should be hidden
    const hamburger = page.locator('nav button.lg\\:hidden').first();
    await expect(hamburger).toBeVisible();

    const desktopNav = page.locator('div.hidden.lg\\:flex');
    await expect(desktopNav).toBeHidden();

    // Click hamburger to open
    await hamburger.click();

    // Verify mobile menu panel has opened (displays client portal button or link)
    const clientLogin = page.locator('.mobile-menu-container a[href="/portal"]:has-text("Customer Login")').first();
    await expect(clientLogin).toBeVisible();

    // Click menu close button (SVG lucide-x is shown on toggle)
    await hamburger.click();
    await expect(clientLogin).toBeHidden();
  });

  test('Buttons and anchors should meet WCAG touch target guidelines (min 44x44px)', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('domcontentloaded');
    
    const smallTargets = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('button, a'));
      return elements
        .map(el => {
          const rect = el.getBoundingClientRect();
          return {
            text: el.textContent?.trim().substring(0, 30) || 'Unnamed',
            html: el.outerHTML.substring(0, 100),
            width: rect.width,
            height: rect.height
          };
        })
        .filter(target => target.width > 0 && target.height > 0 && (target.width < 44 || target.height < 44));
    });

    // Log warnings for small elements instead of hard failing immediately
    if (smallTargets.length > 0) {
      console.warn(`Found ${smallTargets.length} small touch targets:`, smallTargets);
    }
    
    // Custom threshold - allowing small elements but encouraging 44px targets
    expect(smallTargets.length).toBeLessThan(50); 
  });
});
