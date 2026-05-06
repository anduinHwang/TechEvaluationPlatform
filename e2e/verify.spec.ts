import { expect, test } from '@playwright/test';

test('verify page shows current mock feature dashboard', async ({ page }) => {
  await page.goto('/verify');

  await expect(page.getByTestId('verify-page')).toBeVisible();
  await expect(page.getByRole('heading', { name: '목업 기능 검증' })).toBeVisible();
  await expect(page.getByTestId('backend-health-card')).toBeVisible();
  await expect(page.getByTestId('mock-version-card')).toBeVisible();
  await expect(page.getByTestId('domain-status-card')).toBeVisible();
  await expect(page.getByTestId('missing-feature-checklist')).toBeVisible();
  await expect(page.getByTestId('placeholder-warning')).toContainText('OAuth');
});

test('verify page reads scaffold backend health and mock version', async ({ page }) => {
  await page.goto('/verify');

  await expect(page.getByTestId('backend-health-card')).toContainText('UP');
  await expect(page.getByTestId('mock-version-card')).toContainText('mock');
});
