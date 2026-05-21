import { test, expect } from '@playwright/test';

// Every public route should render a real page (a visible heading), return a
// non-error status, and throw no uncaught JS errors. Third-party embed noise
// (Vimeo/YouTube) is ignored on purpose — we listen for `pageerror`
// (uncaught exceptions in our code), not console messages.
const ROUTES = [
  '/',
  '/camp',
  '/camp/boys',
  '/camp/girls',
  '/elements',
  '/elements/acceleration',
  '/about/mike-frascogna',
  '/about/philip-short',
  '/podcast',
  '/videos',
  '/contact',
];

for (const route of ROUTES) {
  test(`route ${route} renders without errors`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));

    const res = await page.goto(route, { waitUntil: 'domcontentloaded' });
    expect(res?.status(), `HTTP status for ${route}`).toBeLessThan(400);

    await expect(page.getByRole('heading').first()).toBeVisible();

    expect(errors, `uncaught JS errors on ${route}`).toEqual([]);
  });
}

test('podcast episode detail renders from the hub', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));

  await page.goto('/podcast');
  const epLink = page.locator('a[href*="/podcast/"]').first();
  await epLink.click();

  await expect(page).toHaveURL(/\/podcast\/.+/);
  await expect(page.getByRole('heading').first()).toBeVisible();
  expect(errors, 'uncaught JS errors on episode detail').toEqual([]);
});

test('unknown route shows the branded 404', async ({ page }) => {
  await page.goto('/definitely-not-a-real-page');
  await expect(page.getByRole('heading', { name: /off the track/i })).toBeVisible();
});
