const { spawnSync, spawn } = require('node:child_process');
const fs = require('node:fs'); const os = require('node:os'); const path = require('node:path'); const assert = require('node:assert/strict'); const crypto = require('node:crypto');
(async () => {
 const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'elwafa-inbox-test-')); const db = path.join(dir, 'db.sqlite');
 const password = crypto.randomBytes(24).toString('hex'); const env = { ...process.env, ELWAFA_DB_PATH: db, ELWAFA_NEW_ADMIN_PASSWORD: password, PORT: '5291' };
 const create = spawnSync(process.execPath, ['server/create-admin.mjs', 'Admin QA'], { env, encoding: 'utf8' }); assert.equal(create.status, 0, create.stderr);
 const server = spawn(process.execPath, ['server/index.mjs'], { env, stdio: ['ignore', 'pipe', 'pipe'] });
 let serverLog = ''; server.stdout.on('data', d => { serverLog += String(d); }); server.stderr.on('data', d => { serverLog += String(d); });
 const base = 'http://127.0.0.1:5291/api';
 async function call(path, method = 'GET', body, cookie) { const res = await fetch(base + path, { method, headers: { ...(body ? { 'Content-Type': 'application/json' } : {}), ...(cookie ? { Cookie: cookie } : {}) }, body: body ? JSON.stringify(body) : undefined }); return { status: res.status, cookie: res.headers.get('set-cookie')?.split(';')[0], body: res.status === 204 ? null : await res.json() }; }
 try {
  let ready = false; for (let n = 0; n < 150; n++) { await new Promise(r => setTimeout(r, 100)); try { ready = (await call('/health')).status === 200; if (ready) break; } catch {} } assert.ok(ready, `API did not start: ${serverLog}`);
  assert.equal((await call('/inquiries')).status, 401);
  assert.equal((await call('/auth/login', 'POST', { name: 'Admin QA', password: 'wrong' })).status, 401);
  const login = await call('/auth/login', 'POST', { name: 'Admin QA', password }); assert.equal(login.status, 200); const cookie = login.cookie; assert.ok(cookie?.startsWith('elwafa_admin='));
  const created = await call('/inquiries', 'POST', { name: 'QA Santri', subject: 'Tanya program', phone: '', due: '' }, cookie); assert.equal(created.status, 201); const id = created.body.id;
  assert.equal((await call(`/inquiries/${id}`, 'PATCH', { stage: 'ditangani' }, cookie)).status, 400);
  const assigned = await call(`/inquiries/${id}`, 'PATCH', { agentId: login.body.id, stage: 'ditangani' }, cookie); assert.equal(assigned.status, 200);
  const note = await call(`/inquiries/${id}/entries`, 'POST', { kind: 'internal', text: 'Follow up' }, cookie); assert.equal(note.status, 201); assert.equal(note.body.entries[0].author, 'Admin QA');
  assert.equal((await call('/inquiries', 'POST', { name: 'No subject' }, cookie)).status, 400);
  assert.equal((await call('/inquiries', 'GET', undefined, cookie)).body[0].entries[0].text, 'Follow up');
  for (let i = 0; i < 110; i++) assert.equal((await call('/inquiries', 'GET', undefined, cookie)).status, 200, `Polling read ${i + 1} was rate-limited`);
  assert.equal((await call('/auth/logout', 'POST', undefined, cookie)).status, 204);
  assert.equal((await call('/inquiries', 'GET', undefined, cookie)).status, 401);
  console.log('API auth, unauthorized, create, assign, stage, note, validation, persistence, logout: PASS');
 } finally { server.kill(); fs.rmSync(dir, { recursive: true, force: true }); }
})().catch(e => { console.error(e); process.exitCode = 1; });
