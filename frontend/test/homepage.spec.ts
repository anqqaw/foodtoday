import { test, expect } from '@playwright/test';
import { HomePage } from './page-objects/home.page';

test('frontpage should show correct data', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();

  await expect(page.getByRole('heading', { name: /tervetuloa|luo tili/i })).toBeVisible();
  await expect(page.locator('button[type="submit"]')).toBeVisible();
});
