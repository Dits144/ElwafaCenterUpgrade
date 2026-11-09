// Read-only preflight: never import db.mjs (its startup persists to disk).
import fs from 'node:fs';
import initSqlJs from 'sql.js';

const source = process.argv[2];
const json = process.argv.includes('--json');
if (!source) {
  console.error('Usage: node server/migration-preflight.mjs <sqlite-file> [--json]');
  process.exit(2);
}
try {
  const bytes = fs.readFileSync(source);
  if (!bytes.subarray(0, 16).equals(Buffer.from('SQLite format 3\0'))) throw new Error('Invalid SQLite header');
  const SQL = await initSqlJs();
  const db = new SQL.Database(bytes);
  const scalar = (sql) => db.exec(sql)[0]?.values[0]?.[0] ?? 0;
  const tables = new Set((db.exec("SELECT name FROM sqlite_master WHERE type='table'")[0]?.values || []).map(row => row[0]));
  const required = ['admins', 'sessions', 'inquiries', 'entries'];
  const missing = required.filter(table => !tables.has(table));
  if (missing.length) throw new Error(`Missing tables: ${missing.join(', ')}`);
  const counts = Object.fromEntries(required.map(table => [table, Number(scalar(`SELECT COUNT(*) FROM ${table}`))]));
  const knownStages = ['baru', 'ditangani', 'menunggu', 'selesai'];
  const stages = db.exec('SELECT stage, COUNT(*) FROM inquiries GROUP BY stage')[0]?.values || [];
  const stageCounts = Object.fromEntries(knownStages.map(stage => [stage, 0]));
  let unknownStageCount = 0;
  for (const [stage, count] of stages) {
    if (knownStages.includes(stage)) stageCounts[stage] = Number(count);
    else unknownStageCount += Number(count);
  }
  const report = {
    integrity: String(scalar('PRAGMA integrity_check')),
    counts,
    stageCounts,
    unknownStageCount,
    orphanEntries: Number(scalar('SELECT COUNT(*) FROM entries e LEFT JOIN inquiries i ON e.inquiry_id=i.id WHERE i.id IS NULL')),
    orphanAgents: Number(scalar('SELECT COUNT(*) FROM inquiries i LEFT JOIN admins a ON i.agent_id=a.id WHERE i.agent_id IS NOT NULL AND a.id IS NULL')),
    orphanAuthors: Number(scalar('SELECT COUNT(*) FROM entries e LEFT JOIN admins a ON e.author_id=a.id WHERE a.id IS NULL')),
    orphanSessions: Number(scalar('SELECT COUNT(*) FROM sessions s LEFT JOIN admins a ON s.admin_id=a.id WHERE a.id IS NULL')),
  };
  db.close();
  if (json) console.log(JSON.stringify(report));
  else console.log(JSON.stringify(report, null, 2));
  if (report.integrity !== 'ok' || report.unknownStageCount || report.orphanEntries || report.orphanAgents || report.orphanAuthors || report.orphanSessions) process.exitCode = 1;
} catch {
  // Avoid leaking filesystem paths or database contents in diagnostic output.
  console.error('Preflight gagal: berkas tidak tersedia, rusak, atau skema tidak cocok.');
  process.exitCode = 1;
}
