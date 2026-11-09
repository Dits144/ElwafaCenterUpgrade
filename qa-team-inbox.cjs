const { chromium } = require('playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://127.0.0.1:5199/#login', { waitUntil: 'networkidle' });
    await page.evaluate(() => localStorage.removeItem('elwafa_team_inbox_demo_v1'));
    await page.reload({ waitUntil: 'networkidle' });
    await page.getByRole('button', { name: 'Portal Administrator' }).click();
    await page.getByRole('button', { name: /Masuk sebagai Admin Demo/ }).click();
    await page.getByRole('button', { name: /Inbox Tim & Inquiry/ }).first().click();
    await page.getByRole('button', { name: 'Catat inquiry' }).click();
    await page.getByLabel('Nama calon santri / wali').fill('Inquiry QA');
    await page.getByLabel('Topik inquiry').fill('Konsultasi kelas bahasa');
    await page.getByRole('button', { name: 'Simpan ke board' }).click();
    await page.getByLabel('Penanggung jawab inquiry').selectOption('Admin 3');
    await page.getByLabel('Tahap inquiry', { exact: true }).selectOption('ditangani');
    await page.getByLabel('Tenggat tindak lanjut').fill('2030-01-31');
    await page.getByLabel('Catatan atau draf balasan').fill('Hubungi ulang setelah konsultasi.');
    await page.getByRole('button', { name: 'Simpan catatan' }).click();
    await page.getByRole('button', { name: 'Tutup detail inquiry' }).click();
    await page.reload({ waitUntil: 'networkidle' });
    await page.getByRole('button', { name: /Inbox Tim & Inquiry/ }).first().click();
    await page.getByRole('button', { name: 'Buka inquiry Inquiry QA' }).click();
    assert.equal(await page.getByLabel('Penanggung jawab inquiry').inputValue(), 'Admin 3');
    assert.equal(await page.getByLabel('Tahap inquiry', { exact: true }).inputValue(), 'ditangani');
    assert.equal(await page.getByLabel('Tenggat tindak lanjut').inputValue(), '2030-01-31');
    assert.equal(await page.getByText('Hubungi ulang setelah konsultasi.').count(), 1);
    await page.getByLabel('Tahap inquiry', { exact: true }).selectOption('selesai');
    assert.equal(await page.getByLabel('Tahap inquiry', { exact: true }).inputValue(), 'selesai');
    assert.deepEqual(errors, []);
    console.log('Team inbox CRUD, assignment, status, note, deadline, persistence: PASS');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByRole('button', { name: 'Tutup detail inquiry' }).click();
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
    console.log('Team inbox mobile overflow: PASS');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
