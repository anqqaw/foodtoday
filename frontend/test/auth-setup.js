import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launchPersistentContext(
      '<home>/Library/Application\ Support/Google/Chrome/Default/',
      {
        headless: false,
        args: [
          '--disable-blink-features=AutomationControlled',
          '--no-sandbox',
          '--disable-web-security',
          '--disable-infobars',
          '--disable-extensions',
          '--start-maximized',
          '--window-size=1280,720',
        ],
      }
  );

  const page = await browser.newPage();
  await page.goto('http://localhost:8080');

  await page.waitForTimeout(30000);

  await browser.storageState({ path: 'auth.json' });

  await browser.close();
})();
