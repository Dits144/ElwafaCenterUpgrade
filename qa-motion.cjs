const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const base = 'http://127.0.0.1:4174/';
(async () => {
  const browser = await chromium.launch();
  try {
    for (const [width, reducedMotion] of [[390, 'no-preference'], [1440, 'no-preference'], [390, 'reduce']]) {
      const context = await browser.newContext({ viewport: { width, height: 844 }, reducedMotion });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(base, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await page.getByRole('heading', { name: /Program Studi.*Pembinaan Elwafa/ }).scrollIntoViewIfNeeded();
      const card = page.locator('#program .group').first();
      await card.waitFor({ state: 'visible' });
      await page.waitForTimeout(reducedMotion === 'reduce' ? 50 : 700);
      const opacity = await card.evaluate(el => getComputedStyle(el).opacity);
      assert.ok(Number(opacity) > 0.95, `card remains hidden: ${opacity}`);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `overflow ${width}`);
      await page.goto(`${base}#login`, { waitUntil: 'domcontentloaded' });
      await page.getByRole('button', { name: /ID: EWF-2026/ }).first().click();
      const nav = page.getByRole('navigation', { name: 'Menu mahasiswa', exact: true });
      await nav.getByRole('button', { name: /Biodata Santri/ }).click();
      assert.equal(await nav.getByRole('button', { name: /Biodata Santri/ }).getAttribute('aria-current'), 'page');
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `student overflow ${width}`);
      assert.deepEqual(errors, [], `JS errors ${width} ${reducedMotion}`);
      console.log(`Motion + student navigation PASS ${width}px reduced=${reducedMotion}`);
      await context.close();
    }
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    await page.goto(`${base}#login`, { waitUntil: 'domcontentloaded' });
    await page.getByRole('button', { name: 'Portal Administrator' }).click();
    await page.getByRole('button', { name: /Masuk sebagai Admin Demo/ }).click();
    const nav = page.getByLabel('Navigasi admin');
    await nav.getByRole('button', { name: /Kelola Program/ }).click();
    await page.getByRole('button', { name: /Kelola Mahasiswa/ }).click();
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'admin overflow');
    console.log('Admin tab motion PASS');
    await context.close();
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
