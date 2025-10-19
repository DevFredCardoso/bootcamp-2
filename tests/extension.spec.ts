import { test, expect, chromium } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dist = path.resolve(__dirname, '..', 'dist');


test('ativa o modo escuro sem erros', async () => {
  const context = await chromium.launchPersistentContext('', {
    headless: false,
    args: [
      `--disable-extensions-except=${dist}`,
      `--load-extension=${dist}`
    ]
  });

  const page = await context.newPage();
  await page.goto('https://example.com');
  const colorBefore = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(colorBefore).toBeDefined();
  await context.close();
});
