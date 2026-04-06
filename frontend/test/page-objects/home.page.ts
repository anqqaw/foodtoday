import { type Page } from '@playwright/test';

export class HomePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async loadState() {
    await this.page.goto('/');

    const authJson = process.env.GOOGLE_AUTH_JSON;
    if (!authJson) {
      throw new Error('GOOGLE_AUTH_JSON secret is missing');
    }

    const localStorageData = JSON.parse(authJson);

    await this.page.evaluate((data) => {
      for (let key in data) {
        localStorage.setItem(key, data[key]);
      }
    }, localStorageData);

    await this.page.reload();
  }

  async navigate() {
    await this.page.goto('/');
  }
}
