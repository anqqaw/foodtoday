import { test, expect } from '@playwright/test';
import { HomePage } from './page-objects/home.page';

test('frontpage should show correct data', async ({ page }) => {
  const homePage = new HomePage(page);
  homePage.navigate();

  const loginButton = page.locator('text=Login with Google');
  await expect(loginButton).toBeVisible();
});
