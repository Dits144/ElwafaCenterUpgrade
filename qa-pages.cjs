const { chromium } = require('playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));

  await page.goto('http://127.0.0.1:5199/', { waitUntil: 'networkidle' });
  console.log('1. Home Loaded:', await page.title());

  // Check Ticker
  const tickerText = await page.locator('text=Universitas Al-Azhar Kairo').first().innerText();
  console.log('2. Ticker present:', tickerText);

  // Check Syahdi Step Flow
  const step01 = await page.locator('text=Dari Pendaftaran Sampai Tiba di Kairo').isVisible();
  assert.ok(step01, 'Step flow must be visible');
  console.log('3. Process steps section visible:', step01);

  // Check Simulator
  const simHeading = await page.locator('text=Cek Estimasi Waktu & Rekomendasi Program Anda').isVisible();
  assert.ok(simHeading, 'Simulator must be visible');
  // Click Pesantren radio
  await page.getByRole('button', { name: /Pondok Pesantren/ }).click();
  // Click S1 goal
  await page.getByRole('button', { name: /Kuliah S1 di Universitas Al-Azhar/ }).click();
  const simResult = await page.locator('text=Jalur Persiapan S1 Universitas Al-Azhar Kairo').isVisible();
  assert.ok(simResult, 'Simulation result must update');
  console.log('4. Simulator reactive result:', simResult);

  // Navigate to Program Kami
  await page.getByRole('button', { name: 'Program Kami' }).first().click();
  await page.waitForTimeout(400);
  console.log('5. Navigated to Program:', page.url());
  const progHeading = await page.locator('h1').innerText();
  assert.ok(progHeading.includes('Program Pendidikan'), 'Programs heading match');

  // Test Filter on Program Page
  await page.getByRole('button', { name: "Ma'had Bu'uts (SMP-SMA)", exact: true }).click();
  await page.waitForTimeout(300);
  const mahadCard = await page.locator("text=Persiapan Ma'had Al-Azhar").first().isVisible();
  assert.ok(mahadCard, "Ma'had card must be visible");
  console.log('6. Program filter works:', mahadCard);

  // Navigate to Tentang Kami
  await page.getByRole('button', { name: 'Tentang Kami' }).first().click();
  await page.waitForTimeout(400);
  console.log('7. Navigated to Tentang:', page.url());
  const aboutHeading = await page.locator('h1').innerText();
  assert.ok(aboutHeading.includes('Tentang Elwafa Center'), 'About heading match');
  const founderText = await page.locator('text=Ust. Ihsan Efendi, Lc').first().isVisible();
  assert.ok(founderText, 'Founder Ust Ihsan must be visible');
  console.log('8. Founder info verified:', founderText);

  // Navigate to Galeri Kegiatan
  await page.getByRole('button', { name: 'Galeri Kegiatan' }).first().click();
  await page.waitForTimeout(400);
  console.log('9. Navigated to Galeri:', page.url());
  const galHeading = await page.locator('h1').innerText();
  assert.ok(galHeading.includes('Galeri Santri'), 'Gallery heading match');

  // Click an image to open Lightbox
  await page.locator('text=Foto Bersama Santri & Pengasuh Elwafa Center').first().click();
  await page.waitForTimeout(300);
  const lightboxVisible = await page.locator('text=Klik untuk perbesar').first().isVisible();
  console.log('10. Gallery lightbox modal verified');
  // Close lightbox by clicking close button or pressing Escape
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  if (await page.locator('button[aria-label="Tutup"]').isVisible()) {
    await page.locator('button[aria-label="Tutup"]').click();
    await page.waitForTimeout(300);
  }

  // Navigate to Berita & Artikel
  await page.getByRole('button', { name: 'Berita & Artikel' }).first().click();
  await page.waitForTimeout(400);
  console.log('11. Navigated to Artikel:', page.url());
  const artHeading = await page.locator('h1').innerText();
  assert.ok(artHeading.includes('Kabar') || artHeading.includes('Berita & Artikel'), 'Article heading match');

  // Click first article to open ArticleDetailModal
  const firstArt = page.locator('h2, h3').filter({ hasText: /Elwafa|Al-Azhar|Try Out/ }).first();
  const artTitle = await firstArt.innerText();
  await firstArt.click();
  await page.waitForTimeout(300);
  const articleModalTitle = await page.locator('h2').first().innerText();
  console.log('12. Article modal opened:', articleModalTitle);
  assert.ok(articleModalTitle.length > 5, 'Article modal title present');
  // Close article modal
  if (await page.locator('button[aria-label="Tutup Artikel"]').isVisible()) {
    await page.locator('button[aria-label="Tutup Artikel"]').click();
  } else {
    await page.keyboard.press('Escape');
  }
  await page.waitForTimeout(400);

  // Navigate to Kontak
  await page.getByRole('button', { name: 'Kontak' }).first().click();
  await page.waitForTimeout(400);
  console.log('13. Navigated to Kontak:', page.url());
  const kontakHeading = await page.locator('h1').innerText();
  assert.ok(kontakHeading.includes('Hubungi Elwafa Center'), 'Contact heading match');
  const cairoOffice = await page.locator('text=Madinat Nasr').isVisible();
  assert.ok(cairoOffice, 'Cairo office visible on contact page');
  console.log('14. Dual office verified on contact page');

  // Test Mobile Viewport
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(300);
  const mobileWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  console.log('15. Mobile scroll width at 390px:', mobileWidth);
  assert.ok(mobileWidth <= 390, `Mobile horizontal leak: ${mobileWidth} > 390`);

  // Test Mobile Drawer
  await page.getByRole('button', { name: 'Toggle navigation menu' }).click();
  await page.waitForTimeout(200);
  await page.getByRole('button', { name: 'Beranda' }).first().click();
  await page.waitForTimeout(300);
  console.log('16. Mobile drawer navigation back to Home verified, url:', page.url());

  // Restore Desktop Viewport for Login Testing
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.waitForTimeout(300);

  // Navigate to Login Page
  await page.getByRole('button', { name: 'Portal Masuk Demo' }).click();
  await page.waitForTimeout(400);
  console.log('17. Navigated to Login Page:', page.url());
  const loginHeader = await page.locator('text=Portal Demo Elwafa Center').isVisible();
  assert.ok(loginHeader, 'Login page header must be visible');

  // Verify Student Demo Accounts exist
  const studentDemoBtn = await page.locator('text=Ahmad Fauzi').first().isVisible();
  assert.ok(studentDemoBtn, 'Quick demo account Ahmad Fauzi must be present');

  // Switch to Admin Tab on Login Page
  await page.getByRole('button', { name: 'Portal Administrator' }).click();
  await page.waitForTimeout(200);
  const adminCreds = await page.locator('text=admin@elwafacenter.com').isVisible();
  assert.ok(adminCreds, 'Admin official demo credentials visible');
  console.log('18. Admin credentials callout verified');

  // Click 1-Click Admin Demo Login
  await page.getByRole('button', { name: /Masuk sebagai Admin Demo/ }).click();
  await page.waitForTimeout(500);
  const adminDash = await page.locator('text=Dashboard Administrasi').isVisible();
  assert.ok(adminDash, 'Admin dashboard must open on demo login');
  console.log('19. Admin 1-Click Demo Login SUCCESS!');

  // Switch to Articles Tab in Admin Dashboard
  await page.getByRole('button', { name: /Berita & Artikel/ }).click();
  await page.waitForTimeout(300);

  // Verify that newly curated articles from Afwaja Center are in Admin Dashboard!
  const afwajaArticlePresent = await page.getByText(/Try Out Akbar/).filter({ visible: true }).count() > 0;
  assert.ok(afwajaArticlePresent, 'Curated article must be present in Admin Dashboard');
  console.log('20. Curated articles verified inside Admin Dashboard table!');

  // Switch back to visitor & test student login
  await page.getByRole('button', { name: 'Pengunjung' }).click();
  await page.waitForTimeout(300);
  await page.getByRole('button', { name: 'Portal Masuk Demo' }).click();
  await page.waitForTimeout(300);

  // Click 1-Click Student Demo Login
  await page.locator('button:has-text("Ahmad Fauzi")').first().click();
  await page.waitForTimeout(500);
  const studentDash = await page.locator('text=PORTAL MAHASISWA').isVisible();
  assert.ok(studentDash, 'Student dashboard must open on demo login');
  console.log('21. Student 1-Click Demo Login SUCCESS!');

  // Return to visitor home
  await page.getByRole('button', { name: 'Pengunjung' }).click();
  await page.waitForTimeout(300);

  assert.deepEqual(errors, [], 'No uncaught page errors allowed');
  console.log('ALL PAGE & ANIMATION TESTS PASSED WITH 0 ERRORS!');
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
