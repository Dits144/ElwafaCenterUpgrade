const { spawn } = require('node:child_process');
const { chromium } = require('playwright');
const assert = require('node:assert/strict');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function waitForServer(url, proc, label, maxRetries = 100) {
  for (let i = 0; i < maxRetries; i++) {
    if (proc.exitCode !== null) throw new Error(`${label} process exited with code ${proc.exitCode}`);
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {}
    await delay(100);
  }
  throw new Error(`${label} failed to respond at ${url}`);
}

(async () => {
  const port = 5188;
  console.log(`Starting Vite preview on port ${port}...`);
  const preview = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--port', String(port), '--strictPort'], {
    cwd: 'D:/Projects/ElwafaUpgrade',
    stdio: 'ignore'
  });

  let browser;
  try {
    await waitForServer(`http://127.0.0.1:${port}/`, preview, 'Vite Preview');
    console.log('Vite preview is ready.');

    browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));

    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // 1. Check CostCalculatorWidget on HomePage
    const calcHeading = page.getByRole('heading', { name: /Kalkulator Biaya Studi & Biaya Hidup di Mesir/i });
    await calcHeading.waitFor({ timeout: 5000 });
    assert.ok(await calcHeading.isVisible(), 'Cost Calculator heading must be visible');

    // Verify initial calculation text
    const initialText = await page.locator('#kalkulator-biaya').textContent();
    assert.ok(initialText.includes('Al-Azhar Friendly'), 'Must include Al-Azhar Friendly tag');
    assert.ok(initialText.includes('Bebas SPP (Gratis)'), 'Must highlight Bebas SPP');

    // Switch accommodation to Flat Mandiri
    const flatOption = page.locator('#kalkulator-biaya').getByText(/Flat Mandiri Sharing/i);
    await flatOption.click();
    await page.waitForTimeout(300);

    // Capture screenshot of the new CostCalculatorWidget
    const screenshotPath = 'D:/Projects/ElwafaUpgrade/cost-calculator-preview.png';
    await page.locator('#kalkulator-biaya').screenshot({ path: screenshotPath });
    console.log(`Saved screenshot to ${screenshotPath}`);

    // 2. Check lazy loading of secondary pages
    await page.getByRole('button', { name: 'Tentang Kami' }).first().click();
    await page.waitForTimeout(500);
    const aboutHeading = page.getByRole('heading', { name: /Tentang Elwafa Center/i });
    await aboutHeading.waitFor({ timeout: 4000 });
    assert.ok(await aboutHeading.isVisible(), 'AboutPage lazy loaded successfully');

    await page.getByRole('button', { name: 'Galeri' }).first().click();
    await page.waitForTimeout(500);
    const galleryItem = page.getByText(/Dokumentasi Kegiatan/i).first();
    await galleryItem.waitFor({ timeout: 4000 });
    assert.ok(await galleryItem.isVisible(), 'GalleryPage lazy loaded successfully');

    // Check for any unhandled page errors
    assert.equal(errors.length, 0, 'No unhandled page errors: ' + errors.join('; '));

    console.log('All Browser Feature QA: PASS');
  } finally {
    if (browser) await browser.close();
    preview.kill();
  }
})().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
