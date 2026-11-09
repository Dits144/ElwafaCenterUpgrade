const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch();
  try {
    for (const width of [360, 390, 768, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: 844 }, reducedMotion: 'reduce' });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      await page.goto('http://127.0.0.1:5198/', { waitUntil: 'domcontentloaded' });
      await page.getByRole('heading', { name: /Program Studi.*Pembinaan Elwafa/ }).waitFor();
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `home overflow ${width}`);
      await page.goto('http://127.0.0.1:5198/#login', { waitUntil: 'domcontentloaded' });
      await page.getByRole('button', { name: /ID: EWF-2026/ }).first().click();
      const nav = page.getByRole('navigation', { name: 'Menu mahasiswa', exact: true });
      await nav.getByRole('button', { name: /Biodata Santri/ }).click();
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `student overflow ${width}`);
      assert.equal(await nav.getByRole('button', { name: /Biodata Santri/ }).getAttribute('aria-current'), 'page');
      assert.deepEqual(errors, [], `page errors ${width}`);
      console.log(`Home + student nav/no overflow: PASS ${width}px`);
      await context.close();
    }
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:5198/#login', { waitUntil: 'domcontentloaded' });
    await page.getByRole('button', { name: 'Portal Administrator' }).click();
    await page.getByRole('button', { name: /Masuk sebagai Admin Demo/ }).click();
    await page.getByLabel('Navigasi admin').getByRole('button', { name: /Inbox Tim/ }).click();
    await page.getByRole('heading', { name: 'Inbox Tim belum dapat dimuat' }).waitFor({ timeout: 15000 });
    await page.getByRole('button', { name: 'Coba lagi' }).click();
    await page.getByRole('heading', { name: 'Inbox Tim belum dapat dimuat' }).waitFor({ timeout: 15000 });
    console.log('API unavailable shows real retryable error: PASS');
    await context.close();
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
