import { test, expect } from '@playwright/test';
import { HomePage } from './page-objects/home.page';

test('frontpage should show correct data', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.loadState();

  const container = page.locator('div.absolute.bottom-10.left-10.text-white.space-y-4');
  await expect(container).toBeVisible();

  const title = container.locator('h1.text-4xl.font-bold');
  await expect(title).toBeVisible();
});
