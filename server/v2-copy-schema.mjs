// Additive, in-memory V2 schema draft. Never imports server/db.mjs or writes files.
const legacyTables = ['admins', 'sessions', 'inquiries', 'entries'];
const v2Tables = ['v2_users', 'v2_applications', 'v2_application_events'];
const ddl = `
CREATE TABLE v2_users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK(role IN ('STUDENT','ADMIN')),
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE TABLE v2_applications (
  id TEXT PRIMARY KEY,
  student_id TEXT NOT NULL REFERENCES v2_users(id) ON DELETE RESTRICT,
  status TEXT NOT NULL DEFAULT 'DRAFT' CHECK(status IN ('DRAFT','SUBMITTED','UNDER_REVIEW','REVISION_REQUIRED','APPROVED','REJECTED')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX v2_applications_student_idx ON v2_applications(student_id);
CREATE TABLE v2_application_events (
  id TEXT PRIMARY KEY,
  application_id TEXT NOT NULL REFERENCES v2_applications(id) ON DELETE RESTRICT,
  action TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE INDEX v2_application_events_application_idx ON v2_application_events(application_id);
`;

export function applyV2Schema(SQL, sourceBytes) {
  const db = new SQL.Database(new Uint8Array(sourceBytes));
  try {
    const names = new Set((db.exec("SELECT name FROM sqlite_master WHERE type='table'")[0]?.values || []).map(([name]) => name));
    if (legacyTables.some(name => !names.has(name))) throw new Error('Legacy schema incomplete');
    if (db.exec('PRAGMA integrity_check')[0]?.values[0]?.[0] !== 'ok') throw new Error('Source integrity failed');
    const version = Number(db.exec('PRAGMA user_version')[0].values[0][0]);
    if (version !== 0 && version !== 1) throw new Error('Unsupported schema version');
    const present = v2Tables.filter(name => names.has(name));
    if (present.length && (version !== 1 || present.length !== v2Tables.length)) throw new Error('Partial V2 schema');
    if (!present.length && version === 1) throw new Error('V2 version without tables');
    db.run('PRAGMA foreign_keys=ON');
    if (!present.length) {
      db.run('BEGIN IMMEDIATE');
      try {
        db.run(ddl);
        db.run('PRAGMA user_version=1');
        db.run('COMMIT');
      } catch (error) {
        db.run('ROLLBACK');
        throw error;
      }
    }
    if (db.exec('PRAGMA foreign_key_check').length || db.exec('PRAGMA integrity_check')[0]?.values[0]?.[0] !== 'ok') throw new Error('Target validation failed');
    return Buffer.from(db.export());
  } finally {
    db.close();
  }
}
