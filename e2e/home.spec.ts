import { expect, test } from '@playwright/test';

const SERVICE_MENU_ITEMS = [
  'Open Technology Evaluation',
  'KTRS-FM',
  'TECH-INDEX',
  'Source Technology Evaluation',
  'Investment Model',
  'BIGx Report',
  'News / Notifications',
];

test('home page renders service title', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId('service-intro')).toContainText('Technology Evaluation Integrated Platform');
});

test('home page exposes login CTA', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId('login-cta')).toBeVisible();
});

test('home page shows Front Office service menu placeholders', async ({ page }) => {
  await page.goto('/');

  const serviceMenu = page.getByTestId('fo-service-menu');
  await expect(serviceMenu).toBeVisible();

  for (const item of SERVICE_MENU_ITEMS) {
    await expect(serviceMenu).toContainText(item);
  }
});
