import { expect, test } from '@playwright/test';

const SERVICE_MENU_ITEMS = [
  '공개기술평가',
  'KTRS-FM',
  'TECH-INDEX',
  '원천기술평가',
  '투자모형',
  'BIGx 리포트',
  '뉴스 / 알림',
];

test('home page renders service title', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId('home-page')).toBeVisible();
  await expect(page.getByTestId('service-intro')).toContainText('기술평가 통합 플랫폼');
});

test('home page exposes login CTA', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId('login-cta')).toBeVisible();
});

test('home page links to the verification dashboard', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId('verify-link')).toBeVisible();
  await expect(page.getByTestId('verify-link')).toHaveAttribute('href', '/verify');
});

test('home page shows Front Office service menu placeholders', async ({ page }) => {
  await page.goto('/');

  const serviceMenu = page.getByTestId('fo-service-menu');
  await expect(serviceMenu).toBeVisible();

  for (const item of SERVICE_MENU_ITEMS) {
    await expect(serviceMenu).toContainText(item);
  }
});
