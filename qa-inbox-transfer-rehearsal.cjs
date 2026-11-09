// Synthetic-only rehearsal. No reference to the active database path.
const assert = require('node:assert/strict');
const initSqlJs = require('sql.js');

(async () => {
  const SQL = await initSqlJs();
  const { rehearseInboxTransfer } = await import('./server/inbox-transfer-rehearsal.mjs');
  const source = new SQL.Database();
  source.run(`CREATE TABLE admins(id TEXT PRIMARY KEY, name TEXT NOT NULL, password_hash TEXT NOT NULL, created_at TEXT NOT NULL);
    CREATE TABLE sessions(token_hash TEXT PRIMARY KEY, admin_id TEXT NOT NULL, expires_at INTEGER NOT NULL);
    CREATE TABLE inquiries(id TEXT PRIMARY KEY, name TEXT NOT NULL, phone TEXT NOT NULL DEFAULT '', subject TEXT NOT NULL, stage TEXT NOT NULL DEFAULT 'baru', agent_id TEXT, due TEXT NOT NULL DEFAULT '', updated_at TEXT NOT NULL);
    CREATE TABLE entries(id TEXT PRIMARY KEY, inquiry_id TEXT NOT NULL, author_id TEXT NOT NULL, kind TEXT NOT NULL CHECK(kind IN ('internal','outgoing')), text TEXT NOT NULL, at TEXT NOT NULL);
    INSERT INTO admins VALUES('legacy-A','SYNTHETIC ADMIN','SYNTHETIC_HASH','2026-01-01');
    INSERT INTO sessions VALUES('SYNTHETIC_TOKEN_HASH','legacy-A',123456);
    INSERT INTO inquiries VALUES('legacy-I','SYNTHETIC PERSON','000000','SYNTHETIC SUBJECT','menunggu','legacy-A','','2026-01-02');
    INSERT INTO entries VALUES('legacy-E','legacy-I','legacy-A','internal','SYNTHETIC NOTE','2026-01-02');`);
  const sourceBytes = Buffer.from(source.export());
  source.close();
  const original = Buffer.from(sourceBytes);
  const first = await rehearseInboxTransfer(SQL, sourceBytes);
  assert.deepEqual(first.report, { admins: 1, sessionsSkipped: 1, inquiries: 1, entries: 1 });
  const target = new SQL.Database(first.bytes);
  const values = (table) => target.exec(`SELECT * FROM ${table}`)[0].values;
  assert.deepEqual(values('admins')[0], ['legacy-A','SYNTHETIC ADMIN','SYNTHETIC_HASH','2026-01-01']);
  assert.deepEqual(values('inquiries')[0], ['legacy-I','SYNTHETIC PERSON','000000','SYNTHETIC SUBJECT','menunggu','legacy-A','','2026-01-02']);
  assert.deepEqual(values('entries')[0], ['legacy-E','legacy-I','legacy-A','internal','SYNTHETIC NOTE','2026-01-02']);
  assert.equal(target.exec('SELECT COUNT(*) FROM sessions')[0].values[0][0], 0);
  target.close();
  assert.deepEqual(Buffer.from(sourceBytes), original, 'Source bytes untouched');
  const second = await rehearseInboxTransfer(SQL, sourceBytes, first.bytes);
  assert.deepEqual(second.report, first.report, 'Import is idempotent');
  const seeded = new SQL.Database(first.bytes);
  seeded.run("UPDATE inquiries SET subject='CONFLICT' WHERE id='legacy-I'");
  const conflicting = Buffer.from(seeded.export());
  seeded.close();
  await assert.rejects(() => rehearseInboxTransfer(SQL, sourceBytes, conflicting), /conflict/i);
  const altered = new SQL.Database();
  const sourceSchema = new SQL.Database(sourceBytes);
  for (const [name, ddl] of sourceSchema.exec("SELECT name, sql FROM sqlite_master WHERE type='table' AND name IN ('admins','sessions','inquiries','entries')")[0].values) {
    altered.run(name === 'entries' ? ddl.replace(" CHECK(kind IN ('internal','outgoing'))", '') : ddl);
  }
  sourceSchema.close();
  const alteredBytes = Buffer.from(altered.export());
  altered.close();
  await assert.rejects(() => rehearseInboxTransfer(SQL, sourceBytes, alteredBytes), /schema mismatch/i,
    'Same columns but missing CHECK constraint must be rejected');
  const invalid = new SQL.Database(sourceBytes);
  invalid.run("INSERT INTO entries VALUES('orphan','missing','legacy-A','internal','SYNTHETIC ORPHAN','2026-01-03')");
  const invalidBytes = Buffer.from(invalid.export());
  invalid.close();
  await assert.rejects(() => rehearseInboxTransfer(SQL, invalidBytes), /orphan/i);
  const unknown = new SQL.Database(sourceBytes);
  unknown.run("UPDATE inquiries SET stage='unmapped' WHERE id='legacy-I'");
  const unknownBytes = Buffer.from(unknown.export());
  unknown.close();
  await assert.rejects(() => rehearseInboxTransfer(SQL, unknownBytes), /stage/i);

  // Inject a failure after a new inquiry is inserted, before its entry is inserted.
  const extended = new SQL.Database(original);
  assert.equal(extended.exec("SELECT stage FROM inquiries WHERE id='legacy-I'")[0].values[0][0], 'menunggu', 'Fixture baseline must be unchanged');
  assert.equal(extended.exec("SELECT stage FROM inquiries WHERE id='legacy-I2'").length, 0);
  extended.run("INSERT INTO inquiries VALUES('legacy-I2','SYNTHETIC PERSON 2','000001','SYNTHETIC SUBJECT 2','baru','legacy-A','','2026-01-03')");
  extended.run("INSERT INTO entries VALUES('legacy-E2','legacy-I2','legacy-A','internal','SYNTHETIC NOTE 2','2026-01-03')");
  const extendedBytes = Buffer.from(extended.export());
  extended.close();
  let rollbackSnapshot;
  let injections = 0;
  const faultSQL = {
    Database: class {
      constructor(bytes) {
        const db = new SQL.Database(bytes);
        if (bytes !== undefined) return db;
        return new Proxy(db, {
          get(obj, property) {
            if (property === 'run') return (sql, params) => {
              if (/^INSERT INTO "entries"/.test(sql)) { injections++; throw new Error('Injected write failure'); }
              const result = obj.run(sql, params);
              if (sql === 'ROLLBACK') rollbackSnapshot = Buffer.from(obj.export());
              return result;
            };
            const value = obj[property];
            return typeof value === 'function' ? value.bind(obj) : value;
          },
        });
      }
    },
  };
  await assert.rejects(() => rehearseInboxTransfer(faultSQL, extendedBytes), /Transfer failure/);  // fresh isolated target only; no persisted bytes handed in
  assert.equal(injections, 1, 'Failure occurs on the second inserted row');
  assert.ok(rollbackSnapshot, 'Transaction was rolled back');
  const rolledBack = new SQL.Database(rollbackSnapshot);
  assert.equal(rolledBack.exec('SELECT COUNT(*) FROM inquiries')[0].values[0][0], 0,
    'Inserted inquiries must not survive the failure');
  assert.equal(rolledBack.exec('SELECT COUNT(*) FROM admins')[0].values[0][0], 0);
  assert.equal(rolledBack.exec('SELECT COUNT(*) FROM entries')[0].values[0][0], 0);
  rolledBack.close();
  console.log('Synthetic SQLite transfer, idempotence, collision, invalid source, rollback: PASS');
})().catch(err => { console.error(err); process.exitCode = 1; });
