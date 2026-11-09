// In-memory rehearsal only. No filesystem access, CLI entry point, or active DB import.
const TABLES = ['admins', 'inquiries', 'entries'];
const REQUIRED = [...TABLES, 'sessions'];

function rows(db, table) {
  return db.exec(`SELECT * FROM "${table}"`)[0]?.values ?? [];
}

function count(db, table) {
  return Number(db.exec(`SELECT COUNT(*) FROM "${table}"`)[0].values[0][0]);
}

function checkSchema(db) {
  const names = new Set((db.exec("SELECT name FROM sqlite_master WHERE type='table'")[0]?.values ?? []).map(([name]) => name));
  if (REQUIRED.some(name => !names.has(name))) throw new Error('Schema mismatch');
  if (db.exec('PRAGMA integrity_check')[0]?.values[0]?.[0] !== 'ok') throw new Error('Integrity failure');
}

function checkRelationships(db) {
  const countQuery = sql => Number(db.exec(sql)[0]?.values[0]?.[0] ?? 0);
  if (countQuery("SELECT COUNT(*) FROM inquiries WHERE stage NOT IN ('baru','ditangani','menunggu','selesai') OR stage IS NULL")) throw new Error('Unknown stage');
  if (countQuery('SELECT COUNT(*) FROM entries e LEFT JOIN inquiries i ON e.inquiry_id=i.id WHERE i.id IS NULL') ||
      countQuery('SELECT COUNT(*) FROM inquiries i LEFT JOIN admins a ON i.agent_id=a.id WHERE i.agent_id IS NOT NULL AND a.id IS NULL') ||
      countQuery('SELECT COUNT(*) FROM entries e LEFT JOIN admins a ON e.author_id=a.id WHERE a.id IS NULL') ||
      countQuery('SELECT COUNT(*) FROM sessions s LEFT JOIN admins a ON s.admin_id=a.id WHERE a.id IS NULL')) throw new Error('Orphan relationship');
}

export async function rehearseInboxTransfer(SQL, sourceBytes, targetBytes) {
  const source = new SQL.Database(sourceBytes);
  let target;
  try {
    checkSchema(source);
    checkRelationships(source);
    if (targetBytes) {
      target = new SQL.Database(targetBytes);
      checkSchema(target);
      if (count(target, 'sessions') !== 0) throw new Error('Target conflict');
      try { checkRelationships(target); } catch { throw new Error('Target conflict'); }
    } else {
      target = new SQL.Database();
      const definitions = source.exec("SELECT sql FROM sqlite_master WHERE type='table' AND name IN ('admins','sessions','inquiries','entries') ORDER BY CASE name WHEN 'admins' THEN 0 WHEN 'sessions' THEN 1 WHEN 'inquiries' THEN 2 ELSE 3 END")[0]?.values ?? [];
      if (definitions.length !== REQUIRED.length) throw new Error('Schema mismatch');
      for (const [sql] of definitions) target.run(sql);
      // Keep the existing indexes for fidelity, but never import live sessions.
      const indexes = source.exec("SELECT sql FROM sqlite_master WHERE type='index' AND sql IS NOT NULL AND tbl_name IN ('admins','sessions','inquiries','entries')")[0]?.values ?? [];
      for (const [sql] of indexes) target.run(sql);
    }
    if (count(target, 'sessions') !== 0) throw new Error('Target conflict');
    const definitions = db => (db.exec("SELECT name, sql FROM sqlite_master WHERE type='table' AND name IN ('admins','sessions','inquiries','entries') ORDER BY name")[0]?.values ?? []);
    if (JSON.stringify(definitions(source)) !== JSON.stringify(definitions(target))) throw new Error('Schema mismatch');
    const staged = {};
    for (const table of TABLES) {
      const columns = source.exec(`PRAGMA table_info("${table}")`)[0]?.values.map(row => row[1]) ?? [];
      const targetColumns = target.exec(`PRAGMA table_info("${table}")`)[0]?.values.map(row => row[1]) ?? [];
      if (JSON.stringify(columns) !== JSON.stringify(targetColumns)) throw new Error('Schema mismatch');
      staged[table] = rows(source, table);
      const existing = rows(target, table);
      const byId = new Map(existing.map(row => [row[0], row]));
      if (existing.some(row => !staged[table].some(item => item[0] === row[0]))) throw new Error('Target conflict');
      for (const row of staged[table]) {
        const prior = byId.get(row[0]);
        if (prior && JSON.stringify(prior) !== JSON.stringify(row)) throw new Error('Target conflict');
      }
    }
    target.run('BEGIN TRANSACTION');
    try {
      for (const table of TABLES) {
        for (const row of staged[table]) {
          const exists = target.exec(`SELECT 1 FROM "${table}" WHERE id = ?`, [row[0]]).length > 0;
          if (!exists) target.run(`INSERT INTO "${table}" VALUES (${row.map(() => '?').join(',')})`, row);
        }
      }
      for (const table of TABLES) {
        if (count(source, table) !== count(target, table)) throw new Error('Reconciliation failure');
      }
      target.run('COMMIT');
    } catch {
      target.run('ROLLBACK');
      throw new Error('Transfer failure');
    }
    const report = {
      admins: count(target, 'admins'),
      sessionsSkipped: count(source, 'sessions'),
      inquiries: count(target, 'inquiries'),
      entries: count(target, 'entries'),
    };
    return { bytes: Buffer.from(target.export()), report };
  } finally {
    target?.close();
    source.close();
  }
}
