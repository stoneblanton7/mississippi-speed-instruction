import { defineConfig, devices } from '@playwright/test';

// Route smoke tests run against the local dev server on port 5191. If a dev
// server is already running it's reused; otherwise Playwright starts one.
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:5191',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm --prefix ../frontend run dev',
    url: 'http://localhost:5191',
    reuseExistingServer: true,
    timeout: 120000,
  },
});
