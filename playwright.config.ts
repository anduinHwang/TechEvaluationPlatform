import { defineConfig, devices } from '@playwright/test';

const apiPort = 8080;
const webPort = 3000;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: `http://localhost:${webPort}`,
    trace: 'on-first-retry',
  },
  webServer: [
    {
      command: 'cd apps/api && ./gradlew bootRun',
      url: `http://localhost:${apiPort}/api/v1/common/notices`,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
    {
      command: 'npm --workspace apps/external-web run dev',
      url: `http://localhost:${webPort}`,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
      env: {
        NEXT_PUBLIC_API_URL: `http://localhost:${apiPort}`,
      },
    },
  ],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
