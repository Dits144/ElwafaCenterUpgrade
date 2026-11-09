// Explicit source and new output only. Never imported by the active API.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import initSqlJs from 'sql.js';
import {applyV2Schema} from './v2-copy-schema.mjs';

const [from, to] = process.argv.slice(2);
if (!from || !to) {
  console.error('Usage: node server/apply-v2-copy.mjs <source-copy> <new-v2-file>');
  process.exit(2);
}
const hash = b => crypto.createHash('sha256').update(b).digest('hex');
try {
  const source = path.resolve(from), output = path.resolve(to);
  if (source.toLowerCase() === output.toLowerCase() || !fs.statSync(source).isFile() || fs.existsSync(output)) throw Error('Invalid paths');
  const original = fs.readFileSync(source);
  const SQL = await initSqlJs();
  const migrated = applyV2Schema(SQL, original);
  if (hash(fs.readFileSync(source)) !== hash(original)) throw Error('Source changed');
  fs.writeFileSync(output, migrated, {flag:'wx', mode:0o600});
  const check = new SQL.Database(fs.readFileSync(output));
  const integrity = check.exec('PRAGMA integrity_check')[0]?.values[0]?.[0];
  const version = check.exec('PRAGMA user_version')[0]?.values[0]?.[0];
  const tables = (check.exec("SELECT name FROM sqlite_master WHERE type='table' AND name LIKE 'v2_%' ORDER BY name")[0]?.values || []).map(([name]) => name);
  check.close();
  if (hash(fs.readFileSync(output)) !== hash(migrated) || integrity !== 'ok' || version !== 1 || tables.length !== 3) throw Error('Verification failure');
  console.log(JSON.stringify({integrity, version, v2TableCount:tables.length, sourceUnchanged:hash(fs.readFileSync(source))===hash(original)}));
} catch {
  console.error('V2 copy migration failed; no source overwrite attempted. Inspect output before retry.');
  process.exitCode=1;
}
