import { test, expect } from '@playwright/test';
import { LoginPage } from './page-objects/login.page';

test('should fail login with incorrect credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('not-user@hopefully.works', 'not-password');
  expect(await loginPage.loginFailed()).toBeTruthy();
});

test('should log in successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login();
  expect(await loginPage.isLoggedIn()).toBeTruthy();
});
