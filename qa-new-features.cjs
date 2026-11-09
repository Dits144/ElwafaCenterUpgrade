const { chromium } = require('playwright');
const assert = require('assert');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  await page.goto('http://127.0.0.1:5199/#login', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Portal Administrator' }).click();
  await page.getByRole('button', { name: /Masuk sebagai Admin Demo/ }).click();
  await page.waitForTimeout(500);

  // Check Sidebar elements exist
  const sidebarHeading = await page.locator('text=Admin Control Center').isVisible();
  assert.ok(sidebarHeading, 'Sidebar must be visible');
  console.log('1. Admin Sidebar verified');

  // Check Calendar tab
  await page.getByRole('button', { name: /Kalender Seleksi/ }).first().click();
  await page.waitForTimeout(300);
  const calHeader = await page.locator('text=Kalender Seleksi & Kegiatan Santri').isVisible();
  assert.ok(calHeader, 'Calendar header visible');
  const ongoingBadge = await page.locator('text=HARI INI BERLANGSUNG').first().isVisible();
  assert.ok(ongoingBadge, 'Ongoing selection event badge visible');
  console.log('2. Calendar & Selection Agenda verified');

  // Test adding new calendar event
  await page.getByRole('button', { name: /Tambah Jadwal Seleksi Baru/ }).click();
  await page.waitForTimeout(200);
  await page.fill('input[placeholder*="Contoh: Seleksi CBT"]', 'Ujian Lisan Muqabalah Bahasa Arab');
  await page.getByRole('button', { name: 'Jadwalkan Agenda' }).click();
  await page.waitForTimeout(400);
  const newEvtVisible = await page.locator('text=Ujian Lisan Muqabalah Bahasa Arab').isVisible();
  assert.ok(newEvtVisible, 'Newly scheduled event must appear');
  console.log('3. Schedule creation verified');

  // Check Analytics tab & Quota editing
  await page.getByRole('button', { name: /Analitik Kapasitas/ }).first().click();
  await page.waitForTimeout(300);
  const quotaHeader = await page.locator('text=Analitik Kuota & Ketersediaan Program').isVisible();
  assert.ok(quotaHeader, 'Analytics quota header visible');
  console.log('4. Analytics & Quota breakdown verified');

  // Switch to Student Dashboard to verify Student Sidebar
  await page.goto('http://127.0.0.1:5199/#login', { waitUntil: 'networkidle' });
  await page.locator('button:has-text("Ahmad Fauzi")').first().click();
  await page.waitForTimeout(500);
  const studentSidebar = await page.locator('text=Akun Calon Santri').isVisible();
  assert.ok(studentSidebar, 'Student sidebar must be visible');
  console.log('5. Student Portal Sidebar verified');

  // Check Articles Page Carousel Slider Buttons
  await page.goto('http://127.0.0.1:5199/#artikel', { waitUntil: 'networkidle' });
  const prevBtn = await page.locator('button[aria-label="Slide Sebelumnya"]').isVisible();
  const nextBtn = await page.locator('button[aria-label="Slide Berikutnya"]').isVisible();
  assert.ok(prevBtn && nextBtn, 'Article slide left/right buttons visible');
  await page.locator('button[aria-label="Slide Berikutnya"]').click();
  await page.waitForTimeout(500);
  console.log('6. Article Slider Navigation buttons verified');

  // Check Contact Page Maps Embed (Switch to Visitor Role first)
  await page.evaluate(() => localStorage.setItem('elwafa_role_demo_v3', 'visitor'));
  await page.goto('http://127.0.0.1:5199/#kontak', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  const mapIframe = await page.locator('iframe[title*="Google Maps"]').count();
  assert.ok(mapIframe > 0, 'Google Maps iframe visible on contact page');
  console.log('7. Google Maps Embed on Contact Page verified');

  await browser.close();
  console.log('ALL NEW FEATURES VERIFIED SUCCESSFULLY!');
})();
