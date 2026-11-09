const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch();
  try {
    for (const width of [390, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: 900 } });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      await page.goto('http://127.0.0.1:5199/', { waitUntil: 'domcontentloaded' });
      await page.getByRole('heading', { level: 1, name: /Wujudkan Impian Kuliah di/ }).waitFor();
      const intro = page.locator('[aria-hidden="true"].pointer-events-none.fixed.inset-0');
      await intro.waitFor();
      await intro.waitFor({ state: 'detached', timeout: 6000 });
      assert.equal(await page.evaluate(() => sessionStorage.getItem('elwafa_intro_seen_v1')), '1');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      await page.getByRole('button', { name: /Jelajahi Program/ }).first().click();
      await page.waitForURL(/#program/);
      await page.goto('http://127.0.0.1:5199/', { waitUntil: 'domcontentloaded' });
      assert.equal(await intro.count(), 0, 'Intro should not replay in same session');
      await page.screenshot({ path: `C:/Users/dits1/AppData/Local/hermes/cache/scratch/elwafa-experience-${width}.png`, fullPage: false });
      assert.deepEqual(errors, []);
      console.log(`Intro once, CTA, no overflow, no page errors: PASS ${width}px`);
      await context.close();
    }
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:5199/', { waitUntil: 'domcontentloaded' });
    await page.getByRole('heading', { level: 1, name: /Wujudkan Impian Kuliah di/ }).waitFor();
    assert.equal(await page.locator('[aria-hidden="true"].pointer-events-none.fixed.inset-0').count(), 0);
    console.log('Reduced motion skips intro: PASS');
    await context.close();
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
