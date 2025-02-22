import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('/');
  }

  async login(username: string = 'user@hopefully.works', password: string = 'hopeless') {
    await this.page.fill('#email', username);
    await this.page.fill('#password', password);
    await this.page.click('button[type="submit"]');
  }

  async loginFailed() {
    await this.page.waitForSelector('text="Please check your username or password."', { timeout: 5000 });
    return this.page.locator('text="Please check your username or password."').isVisible();
  }

  async isLoggedIn() {
    await this.page.waitForSelector('#lastupdated', { timeout: 5000 });
    const content = await this.page.locator('#lastupdated').textContent();
    return content?.includes('viimeksi päivitetty');
  }
}
