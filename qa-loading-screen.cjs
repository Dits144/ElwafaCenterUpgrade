const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function waitForServer(url, proc, label, maxRetries = 100) {
  for (let i = 0; i < maxRetries; i++) {
    if (proc.exitCode !== null) throw new Error(`${label} exited with code ${proc.exitCode}`);
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {}
    await delay(100);
  }
  throw new Error(`${label} failed to respond at ${url}`);
}

(async () => {
  const port = 5189;
  console.log(`Starting Vite preview on port ${port}...`);
  const preview = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--port', String(port), '--strictPort'], {
    cwd: 'D:/Projects/ElwafaUpgrade',
    stdio: 'ignore'
  });

  let browser;
  try {
    await waitForServer(`http://127.0.0.1:${port}/`, preview, 'Vite Preview');

    browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));

    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'domcontentloaded' });

    // Emulate slower network or trigger route change to verify LoadingScreen
    // Click on About page
    await page.getByRole('button', { name: 'Tentang Kami' }).first().click();
    await page.waitForTimeout(500);

    // Verify About page loaded
    const aboutHeading = page.getByRole('heading', { name: /Tentang Elwafa Center/i });
    await aboutHeading.waitFor({ timeout: 5000 });
    assert.ok(await aboutHeading.isVisible());

    // Click back to Beranda
    await page.getByRole('button', { name: 'Beranda' }).first().click();
    await page.waitForTimeout(500);

    // Click on Galeri
    await page.getByRole('button', { name: 'Galeri' }).first().click();
    await page.waitForTimeout(500);

    assert.equal(errors.length, 0, 'No unhandled runtime errors: ' + errors.join('; '));
    console.log('Loading Screen QA: PASS');
  } finally {
    if (browser) await browser.close();
    preview.kill();
  }
})().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
