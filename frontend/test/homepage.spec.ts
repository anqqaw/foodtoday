import { test, expect } from '@playwright/test';
import { LoginPage } from './page-objects/login.page';

test('frontpage should show correct data', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login();
  await loginPage.isLoggedIn();

  // Verify there are two tempboxes
  const tempboxes = page.locator('div.col[role="button"]');
  await expect(tempboxes).toHaveCount(3);
});
