// Rehearsal exclusively on a synthetic fixture. Never opens the active database.
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const initSqlJs = require('sql.js');

const sha256 = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
(async () => {
  const SQL = await initSqlJs();
  const dir = fs.mkdtempSync(path.join(process.env.TMPDIR || os.tmpdir(), 'elwafa-backup-rehearsal-'));
  try {
    const original = path.join(dir, 'synthetic.sqlite');
    const backup = path.join(dir, 'backup.sqlite');
    const restored = path.join(dir, 'restored.sqlite');
    const db = new SQL.Database();
    db.run(`CREATE TABLE admins(id TEXT PRIMARY KEY,name TEXT NOT NULL,password_hash TEXT NOT NULL,created_at TEXT NOT NULL);
      CREATE TABLE sessions(token_hash TEXT PRIMARY KEY,admin_id TEXT NOT NULL,expires_at INTEGER NOT NULL);
      CREATE TABLE inquiries(id TEXT PRIMARY KEY,name TEXT NOT NULL,phone TEXT NOT NULL,subject TEXT NOT NULL,stage TEXT NOT NULL,agent_id TEXT,due TEXT NOT NULL,updated_at TEXT NOT NULL);
      CREATE TABLE entries(id TEXT PRIMARY KEY,inquiry_id TEXT NOT NULL,author_id TEXT NOT NULL,kind TEXT NOT NULL,text TEXT NOT NULL,at TEXT NOT NULL);
      INSERT INTO admins VALUES('a1','SYNTHETIC NAME','SYNTHETIC_HASH','2026-01-01');
      INSERT INTO inquiries VALUES('i1','SYNTHETIC STUDENT','000000','SYNTHETIC SUBJECT','baru','a1','','2026-01-01');
      INSERT INTO entries VALUES('e1','i1','a1','internal','SYNTHETIC NOTE','2026-01-01');`);
    fs.writeFileSync(original, Buffer.from(db.export()));
    db.close();
    const baselineHash = sha256(original);
    fs.copyFileSync(original, backup, fs.constants.COPYFILE_EXCL);
    assert.equal(sha256(backup), baselineHash, 'Backup bytes must match the frozen source');
    const preflight = file => spawnSync(process.execPath, [path.resolve('server/migration-preflight.mjs'), file, '--json'], { encoding: 'utf8', cwd: process.cwd() });
    const checked = preflight(backup);
    assert.equal(checked.status, 0, 'Backup must pass integrity/relationship checks');
    assert.deepEqual(JSON.parse(checked.stdout).counts, { admins: 1, sessions: 0, inquiries: 1, entries: 1 });
    // A restore is proven on a distinct path, never over the source.
    fs.copyFileSync(backup, restored, fs.constants.COPYFILE_EXCL);
    assert.equal(sha256(restored), baselineHash, 'Restored bytes must match original');
    assert.equal(preflight(restored).status, 0, 'Restored database must pass preflight');
    assert.equal(sha256(original), baselineHash, 'Source must not change');
    assert.ok(!/SYNTHETIC NAME|SYNTHETIC STUDENT|SYNTHETIC_HASH/.test(checked.stdout + checked.stderr));
    console.log('Synthetic backup, hash, integrity, restore rehearsal: PASS');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
})().catch(err => { console.error(err); process.exitCode = 1; });
