import express from 'express';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';
import { z } from 'zod';
import { db, get, all, run, persist } from './db.mjs';

const app = express();
app.disable('x-powered-by');
app.use(helmet());
app.use(express.json({ limit: '32kb' }));
// Polling uses two authenticated reads every 5 seconds per admin (~360 reads/15 min).
// Separate write/auth limits so ordinary team synchronization does not hit a write ceiling.
const readLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 6000, standardHeaders: 'draft-8', legacyHeaders: false });
const writeLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 240, standardHeaders: 'draft-8', legacyHeaders: false });
app.use('/api', (req, res, next) => (req.method === 'GET' ? readLimiter : writeLimiter)(req, res, next));
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: 'draft-8', legacyHeaders: false });
app.use('/api/auth/login', authLimiter);
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const err = (res, status, message) => res.status(status).json({ error: message });
const cookieOptions = { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production', path: '/api', maxAge: 8 * 60 * 60 * 1000 };
const parseCookie = req => req.headers.cookie?.split(';').map(x => x.trim()).find(x => x.startsWith('elwafa_admin='))?.slice('elwafa_admin='.length) || '';
function auth(req, res, next) {
  const token = parseCookie(req);
  if (!token) return err(res, 401, 'Login admin diperlukan.');
  const session = get('SELECT admins.id, admins.name FROM sessions JOIN admins ON admins.id = sessions.admin_id WHERE sessions.token_hash=? AND sessions.expires_at>?', [hash(token), Date.now()]);
  if (!session) return err(res, 401, 'Sesi berakhir. Silakan login kembali.');
  req.admin = session; next();
}
function sameOrigin(req, res, next) {
  const origin = req.get('Origin');
  const envOrigins = process.env.ELWAFA_APP_ORIGIN
    ? process.env.ELWAFA_APP_ORIGIN.split(',').map(s => s.trim()).filter(Boolean)
    : [];
  const allowed = [
    'http://127.0.0.1:5198',
    'http://127.0.0.1:5199',
    'http://localhost:5198',
    'http://localhost:5199',
    'http://127.0.0.1:4174',
    'http://localhost:4174',
    ...envOrigins
  ];
  if (origin && !allowed.includes(origin)) return err(res, 403, 'Origin tidak diizinkan.');
  if (!origin && ['POST', 'PATCH', 'DELETE'].includes(req.method)) {
    const secFetch = req.get('Sec-Fetch-Site');
    if (secFetch === 'cross-site') return err(res, 403, 'Cross-site request tidak diizinkan.');
    const referer = req.get('Referer');
    if (referer) {
      try {
        const refOrigin = new URL(referer).origin;
        if (!allowed.includes(refOrigin)) return err(res, 403, 'Referer origin tidak diizinkan.');
      } catch {
        return err(res, 400, 'Header Referer tidak valid.');
      }
    }
  }
  next();
}
app.use('/api', sameOrigin);

function pruneExpiredSessions() {
  try {
    run('DELETE FROM sessions WHERE expires_at <= ?', [Date.now()]);
  } catch (e) {
    console.error('Session prune error', e?.message || e);
  }
}
pruneExpiredSessions();
const parse = (schema, req, res) => {
  const result = schema.safeParse(req.body);
  if (!result.success) { err(res, 400, 'Data tidak valid.'); return null; }
  return result.data;
};
const id = z.string().uuid();
const date = z.union([z.literal(''), z.iso.date()]);
const phone = z.string().max(24).regex(/^[\d+\s()-]*$/);
const createSchema = z.object({ name: z.string().trim().min(1).max(120), phone: phone.default(''), subject: z.string().trim().min(1).max(200), due: date.default('') }).strict();
const patchSchema = z.object({ phone, due: date, stage: z.enum(['baru','ditangani','menunggu','selesai']), agentId: z.union([id,z.null()]) }).partial().strict();
const noteSchema = z.object({ text: z.string().trim().min(1).max(4000), kind: z.enum(['internal','outgoing']) }).strict();
function row(item) {
  return { id: item.id, name: item.name, phone: item.phone, subject: item.subject, stage: item.stage, agentId: item.agent_id || null, agent: item.agent_name || 'Belum ditugaskan', due: item.due, updatedAt: item.updated_at,
    entries: all('SELECT e.id, e.at, a.name AS author, e.kind, e.text FROM entries e JOIN admins a ON a.id=e.author_id WHERE e.inquiry_id=? ORDER BY e.at, e.rowid', [item.id]) };
}
function inquiry(inquiryId) { return get('SELECT i.*, a.name AS agent_name FROM inquiries i LEFT JOIN admins a ON a.id=i.agent_id WHERE i.id=?', [inquiryId]); }
app.get('/api/health', (_req,res) => res.json({ ok: true }));
app.post('/api/auth/login', (req, res) => {
  pruneExpiredSessions();
  const input = parse(z.object({ name: z.string().min(1).max(80), password: z.string().min(1).max(200) }).strict(), req, res);
  if (!input) return;
  const admin = get('SELECT * FROM admins WHERE name=?', [input.name]);
  if (!admin || !bcrypt.compareSync(input.password, admin.password_hash)) return err(res, 401, 'Nama admin atau kata sandi salah.');
  const token = crypto.randomBytes(32).toString('hex');
  run('INSERT INTO sessions(token_hash,admin_id,expires_at) VALUES (?,?,?)', [hash(token),admin.id, Date.now() + cookieOptions.maxAge]);
  res.cookie('elwafa_admin',token,cookieOptions).json({ id: admin.id, name: admin.name });
});
app.post('/api/auth/logout', auth, (req,res) => { run('DELETE FROM sessions WHERE token_hash=?', [hash(parseCookie(req))]); res.clearCookie('elwafa_admin', { path: '/api', sameSite: 'strict', secure: cookieOptions.secure }).status(204).end(); });
app.get('/api/auth/me',auth,(req,res)=>res.json(req.admin));
app.get('/api/admins',auth,(_req,res)=>res.json(all('SELECT id,name FROM admins ORDER BY name')));
app.get('/api/inquiries',auth,(_req,res)=>res.json(all('SELECT i.*, a.name AS agent_name FROM inquiries i LEFT JOIN admins a ON a.id=i.agent_id ORDER BY i.updated_at DESC').map(row)));
app.post('/api/inquiries',auth,(req,res)=>{
  const data = parse(createSchema,req,res); if (!data) return;
  const now = new Date().toISOString(); const inquiryId = crypto.randomUUID();
  run('INSERT INTO inquiries(id,name,phone,subject,stage,agent_id,due,updated_at) VALUES (?,?,?,?,?,?,?,?)',[inquiryId,data.name,data.phone,data.subject,'baru',null,data.due,now]);
  res.status(201).json(row(inquiry(inquiryId)));
});
app.patch('/api/inquiries/:id',auth,(req,res)=>{
  if (!id.safeParse(req.params.id).success) return err(res,400,'ID tidak valid.');
  const data = parse(patchSchema,req,res); if (!data) return;
  const current = inquiry(req.params.id); if (!current) return err(res,404,'Inquiry tidak ditemukan.');
  if (data.agentId && !get('SELECT id FROM admins WHERE id=?',[data.agentId])) return err(res,400,'Admin tidak ditemukan.');
  const agentId = data.agentId !== undefined ? data.agentId : current.agent_id;
  if (data.stage && data.stage !== 'baru' && !agentId) return err(res,400,'Tetapkan penanggung jawab terlebih dahulu.');
  if (data.agentId === null && current.stage !== 'baru' && data.stage !== 'baru') return err(res,400,'Ubah tahap ke Baru sebelum melepas penanggung jawab.');
  const now = new Date().toISOString();
  run('UPDATE inquiries SET phone=?, due=?, stage=?, agent_id=?, updated_at=? WHERE id=?', [data.phone ?? current.phone,data.due ?? current.due,data.stage ?? current.stage,agentId,now,current.id]);
  res.json(row(inquiry(current.id)));
});
app.post('/api/inquiries/:id/entries',auth,(req,res)=>{
  if (!id.safeParse(req.params.id).success) return err(res,400,'ID tidak valid.');
  const data = parse(noteSchema,req,res); if (!data) return;
  const current = inquiry(req.params.id); if (!current) return err(res,404,'Inquiry tidak ditemukan.');
  if (data.kind === 'outgoing' && !current.phone) return err(res,400,'Nomor WhatsApp diperlukan untuk draf.');
  const entryId=crypto.randomUUID(); const now=new Date().toISOString();
  run('INSERT INTO entries(id,inquiry_id,author_id,kind,text,at) VALUES (?,?,?,?,?,?)',[entryId,current.id,req.admin.id,data.kind,data.text,now]);
  run('UPDATE inquiries SET updated_at=? WHERE id=?',[now,current.id]);
  res.status(201).json(row(inquiry(current.id)));
});
app.use('/api',(_req,res)=>err(res,404,'Endpoint tidak ditemukan.'));
app.use((error,_req,res,_next)=>{console.error(error);err(res,500,'Terjadi kesalahan server.');});
const port = Number(process.env.PORT || 5201);
app.listen(port,process.env.HOST || '127.0.0.1',()=>console.log(`Elwafa inbox API listening on ${port}`));
