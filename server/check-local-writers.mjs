// Conservative preflight: list only potential Node database writer PIDs, never command lines.
import { spawnSync } from 'node:child_process';
const ps = `Get-CimInstance Win32_Process -Filter "Name='node.exe'" | Where-Object { $_.CommandLine -match '(server[\\/]index\\.mjs|server[\\/]create-admin\\.mjs|server[\\/]db\\.mjs|inbox\\.sqlite)' } | ForEach-Object { $_.ProcessId }`;
const result = spawnSync('powershell.exe', ['-NoProfile', '-NonInteractive', '-Command', ps], {encoding:'utf8', timeout:15000});
if (result.status !== 0 || result.error) {
  console.error('Cannot verify Node writers; abort backup.');
  process.exit(1);
}
const pids = result.stdout.trim().split(/\s+/).filter(Boolean).filter(pid => pid !== String(process.pid));
if (pids.length) {
  console.error('Potential Node database writers active (PID only):', pids.join(', '));
  process.exit(1);
}
console.log('No known Node database writer detected (CLI or non-Node writers must still be stopped).');
