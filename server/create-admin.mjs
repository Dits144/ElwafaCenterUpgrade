import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';
import { get, run } from './db.mjs';
const name = process.argv[2]?.trim();
const password = process.env.ELWAFA_NEW_ADMIN_PASSWORD;
if (!name || name.length > 80 || !password || password.length < 12) { console.error('Usage: set ELWAFA_NEW_ADMIN_PASSWORD (min 12 chars), then node server/create-admin.mjs "Nama Admin". Jangan simpan kata sandi di command history.'); process.exit(1); }
if (get('SELECT id FROM admins WHERE name=?',[name])) { console.error('Nama admin sudah ada.'); process.exit(1); }
run('INSERT INTO admins(id,name,password_hash,created_at) VALUES (?,?,?,?)',[crypto.randomUUID(),name,bcrypt.hashSync(password,12),new Date().toISOString()]);
console.log(`Akun ${name} dibuat. Login lewat Inbox Tim di dashboard.`);
