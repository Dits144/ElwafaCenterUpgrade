const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async () => {
 const browser = await chromium.launch();
 try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  await page.goto('http://127.0.0.1:5199/#login', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Portal Administrator' }).click();
  await page.getByRole('button', { name: /Masuk sebagai Admin Demo/ }).click();
  const tabs = page.getByLabel('Navigasi admin');
  const report = [];
  for (const [tab, label] of [['students','Kelola Mahasiswa'],['programs','Kelola Program'],['articles','Kelola Berita'],['calendar','Kalender'],['analytics','Statistik'],['settings','Pengaturan'],['inbox','Inbox Tim']]) {
   await tabs.getByRole('button', { name: new RegExp(label) }).click();
   await page.waitForTimeout(120);
   const width = await page.evaluate(() => ({ document: document.documentElement.scrollWidth, viewport: innerWidth }));
   const action = tab === 'students' ? await page.getByRole('button', { name: 'Review Berkas' }).first().isVisible().catch(() => false) : true;
   report.push({ tab, ...width, action });
  }
  console.log(JSON.stringify(report, null, 2));
  assert.deepEqual(errors, []);
  assert.ok(report.every(r => r.document <= r.viewport && r.action), 'Mobile overflow or inaccessible review action');
  for (const width of [360, 768]) {
   await page.setViewportSize({ width, height: 844 });
   for (const label of ['Kelola Mahasiswa', 'Kelola Berita', 'Inbox Tim']) {
    await tabs.getByRole('button', { name: new RegExp(label) }).click();
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `Overflow at ${width}px on ${label}`);
   }
   console.log(`Admin navigation at ${width}px: PASS`);
  }
 } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
