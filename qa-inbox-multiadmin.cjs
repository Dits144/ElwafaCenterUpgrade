const { spawnSync, spawn } = require('node:child_process');
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
async function ready(url, process, label) {
  for (let i = 0; i < 150; i++) {
    if (process.exitCode !== null) throw Error(`${label} exited early (${process.exitCode})`);
    try { if ((await fetch(url)).ok) return; } catch {}
    await delay(100);
  }
  throw Error(`${label} did not start`);
}
async function main() {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'elwafa-browser-'));
  const database = path.join(directory, 'inbox.sqlite');
  const passwordA = crypto.randomBytes(24).toString('hex');
  const passwordB = crypto.randomBytes(24).toString('hex');
  const base = { ...process.env, ELWAFA_DB_PATH: database, ELWAFA_APP_ORIGIN: 'http://127.0.0.1:5294' };
  for (const [name, password] of [['Admin QA Satu', passwordA], ['Admin QA Dua', passwordB]]) {
    const created = spawnSync(process.execPath, ['server/create-admin.mjs', name], { env: { ...base, ELWAFA_NEW_ADMIN_PASSWORD: password }, encoding: 'utf8' });
    assert.equal(created.status, 0, created.stderr);
  }
  const api = spawn(process.execPath, ['server/index.mjs'], { env: { ...base, PORT: '5293' }, stdio: 'ignore' });
  const vite = spawn(process.execPath, ['node_modules/vite/bin/vite.js', '--host', '127.0.0.1', '--port', '5294', '--strictPort'], { env: { ...base, ELWAFA_API_TARGET: 'http://127.0.0.1:5293' }, stdio: 'ignore' });
  let browser;
  try {
    await ready('http://127.0.0.1:5293/api/health', api, 'API');
    await ready('http://127.0.0.1:5294/', vite, 'Vite');
    browser = await chromium.launch();
    const contextA = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const contextB = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const errors = [];
    const openInbox = async context => {
      const page = await context.newPage();
      page.on('pageerror', e => errors.push(e.message));
      await page.goto('http://127.0.0.1:5294/#login', { waitUntil: 'domcontentloaded' });
      await page.getByRole('button', { name: 'Portal Administrator' }).click();
      await page.getByRole('button', { name: /Masuk sebagai Admin Demo/ }).click();
      await page.getByLabel('Navigasi admin').getByRole('button', { name: /Inbox Tim/ }).click();
      await page.getByRole('heading', { name: 'Login Inbox Tim' }).waitFor();
      return page;
    };
    const a = await openInbox(contextA);
    const b = await openInbox(contextB);
    const login = async (page, name, password) => {
      await page.getByLabel('Nama admin inbox').fill(name);
      await page.getByLabel('Kata sandi inbox').fill(password);
      await page.getByRole('button', { name: 'Masuk ke inbox' }).click();
      await page.getByRole('heading', { name: new RegExp(`Inbox Tim • ${name}`) }).waitFor();
    };
    await login(a, 'Admin QA Satu', passwordA);
    await login(b, 'Admin QA Dua', passwordB);
    const title = `QA inquiry ${crypto.randomUUID().slice(0,8)}`;
    await a.getByRole('button', { name: /Catat inquiry/ }).click();
    await a.getByLabel('Nama calon santri / wali').fill(title);
    await a.getByLabel('Topik inquiry').fill('Konsultasi program');
    await a.getByRole('button', { name: 'Simpan ke board' }).click();
    const detailA = a.getByRole('dialog', { name: `Detail inquiry ${title}` });
    await detailA.waitFor();
    const adminId = await a.evaluate(async () => (await (await fetch('/api/auth/me')).json()).id);
    await detailA.getByLabel('Penanggung jawab inquiry').selectOption(adminId);
    await detailA.getByLabel('Tahap inquiry').selectOption('ditangani');
    await detailA.getByLabel('Catatan atau draf balasan').fill('Tindak lanjut dari admin pertama.');
    await detailA.getByRole('button', { name: 'Simpan catatan' }).click();
    await a.getByRole('button', { name: 'Tutup detail inquiry' }).click();
    await b.getByRole('button', { name: `Buka inquiry ${title}` }).waitFor({ timeout: 15000 });
    await b.getByRole('button', { name: `Buka inquiry ${title}` }).click();
    const detailB = b.getByRole('dialog', { name: `Detail inquiry ${title}` });
    await detailB.getByText('Tindak lanjut dari admin pertama.').waitFor();
    assert.equal(await detailB.getByLabel('Tahap inquiry').inputValue(), 'ditangani');
    await detailB.getByLabel('Catatan atau draf balasan').fill('Diambil alih admin kedua.');
    await detailB.getByRole('button', { name: 'Simpan catatan' }).click();
    await a.reload({ waitUntil: 'domcontentloaded' });
    await a.getByLabel('Navigasi admin').getByRole('button', { name: /Inbox Tim/ }).click();
    await a.getByRole('button', { name: `Buka inquiry ${title}` }).click();
    await a.getByRole('dialog', { name: `Detail inquiry ${title}` }).getByText('Diambil alih admin kedua.').waitFor();
    assert.deepEqual(errors, []);
    console.log('Two browser admin sessions, shared inquiry, assignment, status, reciprocal notes, reload, mobile: PASS');
  } finally {
    if (browser) await browser.close();
    vite.kill(); api.kill();
    // Windows child processes may still hold the DB briefly.
    await delay(200);
    fs.rmSync(directory, { recursive: true, force: true });
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
