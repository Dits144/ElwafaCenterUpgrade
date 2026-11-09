const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');
const {spawnSync} = require('node:child_process');
const initSqlJs = require('sql.js');
const hash = p => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
(async () => {
  const SQL = await initSqlJs();
  const dir = fs.mkdtempSync(path.join(process.env.TMPDIR || os.tmpdir(), 'v2-file-test-'));
  try {
    const src = path.join(dir,'source.sqlite'), dst = path.join(dir,'v2.sqlite');
    const db = new SQL.Database();
    db.run(`CREATE TABLE admins(id TEXT PRIMARY KEY,name TEXT,password_hash TEXT,created_at TEXT);
      CREATE TABLE sessions(token_hash TEXT PRIMARY KEY,admin_id TEXT,expires_at INTEGER);
      CREATE TABLE inquiries(id TEXT PRIMARY KEY,name TEXT,phone TEXT,subject TEXT,stage TEXT,agent_id TEXT,due TEXT,updated_at TEXT);
      CREATE TABLE entries(id TEXT PRIMARY KEY,inquiry_id TEXT,author_id TEXT,kind TEXT,text TEXT,at TEXT);
      INSERT INTO admins VALUES('a1','Synthetic','HASH','2026-01-01');`);
    fs.writeFileSync(src, Buffer.from(db.export())); db.close();
    const before=hash(src);
    const cli=path.resolve('server/apply-v2-copy.mjs');
    let r=spawnSync(process.execPath,[cli,src,dst],{encoding:'utf8'});
    assert.equal(r.status,0,r.stderr);
    assert.equal(hash(src),before);
    const migrated=new SQL.Database(fs.readFileSync(dst));
    assert.equal(migrated.exec('PRAGMA user_version')[0].values[0][0],1);
    assert.equal(migrated.exec('SELECT COUNT(*) FROM admins')[0].values[0][0],1);
    assert.equal(migrated.exec('PRAGMA integrity_check')[0].values[0][0],'ok'); migrated.close();
    const targetHash=hash(dst);
    r=spawnSync(process.execPath,[cli,src,dst],{encoding:'utf8'});
    assert.notEqual(r.status,0,'Must reject existing output');
    assert.equal(hash(dst),targetHash);
    r=spawnSync(process.execPath,[cli,src,src],{encoding:'utf8'});
    assert.notEqual(r.status,0,'Must reject same input/output');
    assert.equal(hash(src),before);
    console.log('V2 file migration: distinct output, no overwrite, source unchanged: PASS');
  } finally {fs.rmSync(dir,{recursive:true,force:true});}
})().catch(e=>{console.error(e);process.exitCode=1});
