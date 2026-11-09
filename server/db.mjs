import initSqlJs from 'sql.js';
import fs from 'node:fs';
import path from 'node:path';

const file = process.env.ELWAFA_DB_PATH || path.resolve('server/data/inbox.sqlite');
fs.mkdirSync(path.dirname(file), { recursive: true });
const SQL = await initSqlJs({ locateFile: name => path.resolve('node_modules/sql.js/dist', name) });
let lastMtime = fs.existsSync(file) ? fs.statSync(file).mtimeMs : 0;
export let db = new SQL.Database(fs.existsSync(file) ? fs.readFileSync(file) : undefined);
db.run(`CREATE TABLE IF NOT EXISTS admins (id TEXT PRIMARY KEY, name TEXT NOT NULL, password_hash TEXT NOT NULL, created_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS sessions (token_hash TEXT PRIMARY KEY, admin_id TEXT NOT NULL, expires_at INTEGER NOT NULL, FOREIGN KEY(admin_id) REFERENCES admins(id));
CREATE TABLE IF NOT EXISTS inquiries (id TEXT PRIMARY KEY, name TEXT NOT NULL, phone TEXT NOT NULL DEFAULT '', subject TEXT NOT NULL, stage TEXT NOT NULL DEFAULT 'baru', agent_id TEXT, due TEXT NOT NULL DEFAULT '', updated_at TEXT NOT NULL, FOREIGN KEY(agent_id) REFERENCES admins(id));
CREATE TABLE IF NOT EXISTS entries (id TEXT PRIMARY KEY, inquiry_id TEXT NOT NULL, author_id TEXT NOT NULL, kind TEXT NOT NULL CHECK(kind IN ('internal','outgoing')), text TEXT NOT NULL, at TEXT NOT NULL, FOREIGN KEY(inquiry_id) REFERENCES inquiries(id));
CREATE INDEX IF NOT EXISTS entries_inquiry_idx ON entries(inquiry_id);
CREATE INDEX IF NOT EXISTS sessions_admin_idx ON sessions(admin_id);`);

export function syncFromDisk() {
  if (!fs.existsSync(file)) return;
  try {
    const currentMtime = fs.statSync(file).mtimeMs;
    if (currentMtime > lastMtime) {
      try { db.close(); } catch {}
      db = new SQL.Database(fs.readFileSync(file));
      lastMtime = currentMtime;
    }
  } catch (err) {
    console.error('Database disk sync error:', err.message);
  }
}

export function get(sql, params = []) {
  syncFromDisk();
  const stmt = db.prepare(sql);
  try { stmt.bind(params); return stmt.step() ? stmt.getAsObject() : null; }
  finally { stmt.free(); }
}

export function all(sql, params = []) {
  syncFromDisk();
  const stmt = db.prepare(sql);
  try { stmt.bind(params); const rows = []; while (stmt.step()) rows.push(stmt.getAsObject()); return rows; }
  finally { stmt.free(); }
}

export function run(sql, params = []) {
  syncFromDisk();
  db.run(sql, params);
  persist();
}

export function persist() {
  const tmp = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, Buffer.from(db.export()));
  fs.renameSync(tmp, file);
  try {
    lastMtime = fs.existsSync(file) ? fs.statSync(file).mtimeMs : Date.now();
  } catch {
    lastMtime = Date.now();
  }
}
persist();
