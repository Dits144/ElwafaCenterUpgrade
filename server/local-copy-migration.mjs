// Explicit-path local copy migration only; never imports the active server database.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import initSqlJs from 'sql.js';
import { rehearseInboxTransfer } from './inbox-transfer-rehearsal.mjs';

const [sourcePath, backupPath, targetPath] = process.argv.slice(2);
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const fail = message => { throw new Error(message); };
if (!sourcePath || !backupPath || !targetPath) {
  console.error('Usage: node server/local-copy-migration.mjs <source> <backup-new-path> <target-new-path>');
  process.exit(2);
}
try {
  const source = path.resolve(sourcePath), backup = path.resolve(backupPath), target = path.resolve(targetPath);
  if (new Set([source.toLowerCase(), backup.toLowerCase(), target.toLowerCase()]).size !== 3) fail('Source, backup, and target must be distinct');
  if (!fs.existsSync(source) || fs.existsSync(backup) || fs.existsSync(target)) fail('Source missing or destination already exists');
  const sourceStat = fs.statSync(source);
  if (!sourceStat.isFile() || sourceStat.size < 100) fail('Invalid source');
  // Operator must ensure writers are stopped. Recheck for accidental races; this is not a lock.
  const sourceBytes = fs.readFileSync(source);
  if (sha(sourceBytes) !== sha(fs.readFileSync(source))) fail('Source changed while reading');
  fs.mkdirSync(path.dirname(backup), { recursive: true, mode: 0o700 });
  fs.mkdirSync(path.dirname(target), { recursive: true, mode: 0o700 });
  fs.writeFileSync(backup, sourceBytes, { flag: 'wx', mode: 0o600 });
  const backupBytes = fs.readFileSync(backup);
  if (sha(backupBytes) !== sha(sourceBytes)) fail('Backup hash mismatch');
  const SQL = await initSqlJs();
  const restored = new SQL.Database(backupBytes);
  if (restored.exec('PRAGMA integrity_check')[0]?.values[0]?.[0] !== 'ok') fail('Backup integrity check failed');
  const restoreBytes = Buffer.from(restored.export());
  restored.close();
  const restoreDb = new SQL.Database(restoreBytes);
  if (restoreDb.exec('PRAGMA integrity_check')[0]?.values[0]?.[0] !== 'ok') fail('Restore verification failed');
  restoreDb.close();
  // The exported restore is logically checked, but may differ bytewise; do not overwrite the backup.
  const result = await rehearseInboxTransfer(SQL, backupBytes);
  const targetDb = new SQL.Database(result.bytes);
  const integrity = targetDb.exec('PRAGMA integrity_check')[0]?.values[0]?.[0];
  const counts = Object.fromEntries(['admins', 'sessions', 'inquiries', 'entries'].map(t => [t, Number(targetDb.exec(`SELECT COUNT(*) FROM ${t}`)[0].values[0][0])]));
  targetDb.close();
  if (integrity !== 'ok' || counts.admins !== result.report.admins || counts.inquiries !== result.report.inquiries || counts.entries !== result.report.entries || counts.sessions !== 0) fail('Target reconciliation failed');
  if (sha(fs.readFileSync(source)) !== sha(sourceBytes)) fail('Source changed during migration; target not written');
  fs.writeFileSync(target, result.bytes, { flag: 'wx', mode: 0o600 });
  if (sha(fs.readFileSync(target)) !== sha(result.bytes)) fail('Target hash mismatch');
  console.log(JSON.stringify({ backupVerified: true, restoreVerified: true, counts, sessionsSkipped: result.report.sessionsSkipped }));
} catch {
  // No paths, credentials or row content in output. A failed backup/target remains for manual inspection.
  console.error('Copy migration failed; inspect input, destinations and writer status. No overwrite performed.');
  process.exitCode = 1;
}
