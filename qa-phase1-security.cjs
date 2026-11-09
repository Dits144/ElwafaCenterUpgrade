const { spawnSync, spawn } = require('node:child_process');
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

async function runTest() {
  console.log('Running Phase 1 Security & Persistence Test...');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'elwafa-sec-'));
  const database = path.join(dir, 'inbox.sqlite');
  const port = '5381';
  const baseUrl = `http://127.0.0.1:${port}`;
  const baseEnv = {
    ...process.env,
    ELWAFA_DB_PATH: database,
    PORT: port,
    ELWAFA_APP_ORIGIN: 'http://127.0.0.1:5198,http://localhost:5198'
  };

  // 1. Initial admin
  const admin1Pass = crypto.randomBytes(16).toString('hex');
  const initAdmin = spawnSync(process.execPath, ['server/create-admin.mjs', 'Initial Admin'], {
    env: { ...baseEnv, ELWAFA_NEW_ADMIN_PASSWORD: admin1Pass },
    encoding: 'utf8'
  });
  assert.equal(initAdmin.status, 0, initAdmin.stderr);

  // 2. Start API server
  const api = spawn(process.execPath, ['server/index.mjs'], { env: baseEnv, stdio: 'ignore' });
  try {
    await ready(`${baseUrl}/api/health`, api, 'API');

    // 3. Test Origin allowlist and rejection
    const allowedRes = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Origin': 'http://localhost:5198',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: 'Initial Admin', password: admin1Pass })
    });
    assert.equal(allowedRes.status, 200, 'localhost:5198 must be accepted as allowed origin');
    const cookie = allowedRes.headers.get('set-cookie');
    assert.ok(cookie && cookie.includes('elwafa_admin='), 'Must set session cookie');

    const blockedRes = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Origin': 'http://malicious-site.example',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: 'Initial Admin', password: admin1Pass })
    });
    assert.equal(blockedRes.status, 403, 'Unauthorized origin must be rejected with 403');

    // 4. Test Cross-site mutation rejection without origin
    const crossSiteRes = await fetch(`${baseUrl}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Sec-Fetch-Site': 'cross-site',
        'Cookie': cookie
      }
    });
    assert.equal(crossSiteRes.status, 403, 'Cross-site mutation without origin must be rejected');

    // 5. Concurrency test: Add a SECOND admin via CLI while server is running (SEC-01)
    const admin2Pass = crypto.randomBytes(16).toString('hex');
    const admin2 = spawnSync(process.execPath, ['server/create-admin.mjs', 'Concurrent Admin'], {
      env: { ...baseEnv, ELWAFA_NEW_ADMIN_PASSWORD: admin2Pass },
      encoding: 'utf8'
    });
    assert.equal(admin2.status, 0, admin2.stderr);

    // Login with the new admin without restarting server!
    const admin2LoginRes = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Origin': 'http://127.0.0.1:5198',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: 'Concurrent Admin', password: admin2Pass })
    });
    assert.equal(admin2LoginRes.status, 200, 'Concurrent admin created via CLI must be able to log in without server restart');
    const cookie2 = admin2LoginRes.headers.get('set-cookie');

    // Create inquiry with admin 2 to trigger server-side write to disk
    const createRes = await fetch(`${baseUrl}/api/inquiries`, {
      method: 'POST',
      headers: {
        'Origin': 'http://127.0.0.1:5198',
        'Content-Type': 'application/json',
        'Cookie': cookie2
      },
      body: JSON.stringify({ name: 'Santri Test', subject: 'Pendaftaran 2026', phone: '08123456789' })
    });
    assert.equal(createRes.status, 201, 'Inquiry creation must succeed');

    // Verify both admins still exist in the database!
    const listAdminsRes = await fetch(`${baseUrl}/api/admins`, {
      headers: { 'Cookie': cookie2 }
    });
    assert.equal(listAdminsRes.status, 200);
    const admins = await listAdminsRes.json();
    assert.ok(admins.some(a => a.name === 'Initial Admin'), 'Initial admin must still exist');
    assert.ok(admins.some(a => a.name === 'Concurrent Admin'), 'Concurrent admin must not be overwritten');

    console.log('Phase 1 Security & Persistence: ALL PASS');
  } finally {
    api.kill();
    try { fs.rmSync(dir, { recursive: true, force: true }); } catch {}
  }
}

runTest().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
