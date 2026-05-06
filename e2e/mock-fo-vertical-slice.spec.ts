import { expect, type Page, test } from '@playwright/test';

test('anonymous home shows login CTA and service intro', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId('service-intro')).toContainText('Technology Evaluation Integrated Platform');
  await expect(page.getByTestId('login-cta')).toBeVisible();
});

test('user can open login page and see three tabs', async ({ page }) => {
  await page.goto('/login');

  await expect(page.getByTestId('login-tabs')).toBeVisible();
  await expect(page.getByTestId('tab-id-login')).toBeVisible();
  await expect(page.getByTestId('tab-certificate-login')).toBeVisible();
  await expect(page.getByTestId('tab-simple-login')).toBeVisible();
});

test('company mock login navigates to company dashboard', async ({ page }) => {
  await page.goto('/login');
  await page.getByTestId('login-company').click();

  await expect(page).toHaveURL(/\/company$/);
  await expect(page.getByTestId('company-dashboard')).toBeVisible();
});

test('company can open KTRS-FM self-diagnosis list', async ({ page }) => {
  await loginAsCompany(page);

  await page.getByTestId('company-ktrs-link').click();
  await expect(page).toHaveURL(/\/evaluations\/ktrs-fm\/company$/);
  await expect(page.getByTestId('company-applications-table')).toBeVisible();
});

test('company can create mock KTRS-FM application, consent, submit, and see My Page state', async ({ page }) => {
  await loginAsCompany(page);
  await page.goto('/evaluations/ktrs-fm/company');
  await page.getByTestId('create-application-link').click();

  await expect(page).toHaveURL(/\/evaluations\/ktrs-fm\/company\/new$/);
  await expect(page.getByTestId('mock-result-chart')).toBeVisible();
  await page.getByTestId('required-consent').check();
  await page.getByTestId('submit-application').click();

  await expect(page).toHaveURL(/\/mypage$/);
  await expect(page.getByTestId('mypage-dashboard')).toBeVisible();
  await expect(page.getByTestId('mypage-applications-table')).toContainText('Mock autonomous inspection robot');
  await expect(page.getByTestId('mypage-applications-table')).toContainText('SUBMITTED');
});

test('institution mock login navigates to institution dashboard', async ({ page }) => {
  await page.goto('/login');
  await page.getByTestId('login-institution').click();

  await expect(page).toHaveURL(/\/institution$/);
  await expect(page.getByTestId('institution-dashboard')).toBeVisible();
});

test('institution can open KTRS-FM individual evaluation list', async ({ page }) => {
  await loginAsInstitution(page);

  await page.getByTestId('institution-ktrs-link').click();
  await expect(page).toHaveURL(/\/evaluations\/ktrs-fm\/institution$/);
  await expect(page.getByTestId('institution-applications-table')).toBeVisible();
  await expect(page.getByTestId('institution-applications-table')).toContainText('Seed Bio Materials');
});

const loginAsCompany = async (page: Page) => {
  await page.goto('/login');
  await page.getByTestId('login-company').click();
  await expect(page).toHaveURL(/\/company$/);
};

const loginAsInstitution = async (page: Page) => {
  await page.goto('/login');
  await page.getByTestId('login-institution').click();
  await expect(page).toHaveURL(/\/institution$/);
};
