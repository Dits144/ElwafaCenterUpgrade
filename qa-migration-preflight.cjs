const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const initSqlJs = require('sql.js');

(async () => {
  const SQL = await initSqlJs();
  const dir = fs.mkdtempSync(path.join(process.env.TMPDIR || os.tmpdir(), 'elwafa-preflight-'));
  const dbFile = path.join(dir, 'fixture.sqlite');
  try {
    const db = new SQL.Database();
    db.run(`CREATE TABLE admins(id TEXT PRIMARY KEY,name TEXT NOT NULL,password_hash TEXT NOT NULL,created_at TEXT NOT NULL);
      CREATE TABLE sessions(token_hash TEXT PRIMARY KEY,admin_id TEXT NOT NULL,expires_at INTEGER NOT NULL);
      CREATE TABLE inquiries(id TEXT PRIMARY KEY,name TEXT NOT NULL,phone TEXT NOT NULL,subject TEXT NOT NULL,stage TEXT NOT NULL,agent_id TEXT,due TEXT NOT NULL,updated_at TEXT NOT NULL);
      CREATE TABLE entries(id TEXT PRIMARY KEY,inquiry_id TEXT NOT NULL,author_id TEXT NOT NULL,kind TEXT NOT NULL,text TEXT NOT NULL,at TEXT NOT NULL);
      INSERT INTO admins VALUES('a1','Rahasia Nama','HASH_PRIVATE','2026-01-01');
      INSERT INTO inquiries VALUES('i1','RAHASIA SANTRI','08123456789','PRIVATE SUBJECT','baru','a1','','2026-01-01');
      INSERT INTO entries VALUES('e1','i1','a1','internal','PRIVATE NOTE','2026-01-01');`);
    fs.writeFileSync(dbFile, Buffer.from(db.export()));
    db.close();
    const digest = () => crypto.createHash('sha256').update(fs.readFileSync(dbFile)).digest('hex');
    const before = digest();
    const script = path.resolve('server/migration-preflight.mjs');
    const run = spawnSync(process.execPath, [script, dbFile, '--json'], { cwd: process.cwd(), encoding: 'utf8' });
    assert.equal(run.status, 0, run.stderr);
    const report = JSON.parse(run.stdout);
    assert.deepEqual(report.counts, { admins: 1, sessions: 0, inquiries: 1, entries: 1 });
    assert.equal(report.stageCounts.baru, 1);
    assert.equal(report.stageCounts.ditangani, 0);
    assert.equal(report.stageCounts.menunggu, 0);
    assert.equal(report.stageCounts.selesai, 0);
    assert.equal(report.integrity, 'ok');
    assert.equal(report.orphanEntries, 0);
    assert.equal(report.orphanAgents, 0);
    assert.equal(report.unknownStageCount, 0);
    assert.equal(digest(), before, 'Preflight must not write to database');
    assert.ok(!/RAHASIA|PRIVATE|08123456789|HASH_PRIVATE/.test(run.stdout + run.stderr), 'No PII or hashes in report');

    const anomalous = new SQL.Database(fs.readFileSync(dbFile));
    anomalous.run("INSERT INTO entries VALUES('e2','missing','a1','internal','ANOTHER PRIVATE NOTE','2026-01-02')");
    anomalous.run("INSERT INTO inquiries VALUES('i2','PRIVATE NAME','08123456789','PRIVATE SUBJECT','unknown','missing','','2026-01-02')");
    const badFile = path.join(dir, 'anomalous.sqlite');
    fs.writeFileSync(badFile, Buffer.from(anomalous.export()));
    anomalous.close();
    const badHash = crypto.createHash('sha256').update(fs.readFileSync(badFile)).digest('hex');
    const bad = spawnSync(process.execPath, [script, badFile, '--json'], { cwd: process.cwd(), encoding: 'utf8' });
    assert.equal(bad.status, 1, 'Anomalies must fail the preflight gate');
    const badReport = JSON.parse(bad.stdout);
    assert.equal(badReport.orphanEntries, 1);
    assert.equal(badReport.orphanAgents, 1);
    assert.equal(badReport.unknownStageCount, 1);
    assert.equal(crypto.createHash('sha256').update(fs.readFileSync(badFile)).digest('hex'), badHash);
    assert.ok(!/PRIVATE|08123456789/.test(bad.stdout + bad.stderr), 'Anomaly output must not disclose PII');
    console.log('Read-only migration preflight fixtures (valid/anomalous): PASS');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
})().catch(err => { console.error(err); process.exitCode = 1; });
