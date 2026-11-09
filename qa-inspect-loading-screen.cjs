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
  const port = 5190;
  console.log(`Starting Vite preview on port ${port}...`);
  const preview = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--port', String(port), '--strictPort'], {
    cwd: 'D:/Projects/ElwafaUpgrade',
    stdio: 'ignore'
  });

  let browser;
  try {
    await waitForServer(`http://127.0.0.1:${port}/`, preview, 'Vite Preview');

    browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

    // Slow down network responses to capture the LoadingScreen state
    await page.route('**/*.js', async route => {
      if (route.request().url().includes('AboutPage') || route.request().url().includes('StudentDashboard')) {
        await delay(1500); // 1.5s delay to capture loading screen
      }
      await route.continue();
    });

    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    // Trigger navigation to AboutPage which is lazy loaded
    console.log('Triggering route change to lazy page...');
    await page.getByRole('button', { name: 'Tentang Kami' }).first().click();

    // The LoadingScreen status should immediately be visible!
    const loader = page.locator('[role="status"]').first();
    await loader.waitFor({ timeout: 2000 });
    assert.ok(await loader.isVisible(), 'LoadingScreen must be visible while chunk loads');

    // Take a screenshot of the branded LoadingScreen
    const loadingScreenshot = 'D:/Projects/ElwafaUpgrade/loading-screen-preview.png';
    await page.screenshot({ path: loadingScreenshot });
    console.log(`Saved screenshot to ${loadingScreenshot}`);

    // Wait for the About page to finish loading
    const heading = page.getByRole('heading', { name: /Tentang Elwafa Center/i });
    await heading.waitFor({ timeout: 6000 });
    assert.ok(await heading.isVisible());

    console.log('Loading Screen capture and route recovery: PASS');
  } finally {
    if (browser) await browser.close();
    preview.kill();
  }
})().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
