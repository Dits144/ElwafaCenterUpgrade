import React, { useCallback, useEffect, useState } from 'react';
import { INBOX_TEMPLATES, applyTemplate } from '../../utils/inboxTemplates';
type Admin = { id: string; name: string };
type Entry = { id: string; kind: string; text: string; author: string; at: string };
type Inquiry = { id: string; name: string; phone: string; subject: string; stage: string; agentId: string | null; agent: string; due: string; entries: Entry[] };
const stages = [{ id: 'baru', label: 'Belum ditangani' }, { id: 'ditangani', label: 'Sedang ditangani' }, { id: 'menunggu', label: 'Menunggu calon santri' }, { id: 'selesai', label: 'Selesai' }];
async function api<T>(url: string, method = 'GET', data?: object): Promise<T> {
  const res = await fetch(url, { method, credentials: 'same-origin', signal: AbortSignal.timeout(12000), headers: { 'Content-Type': 'application/json' }, body: data ? JSON.stringify(data) : undefined });
  if (!res.ok) { const body = await res.json().catch(() => ({})); throw Error(body.error || `HTTP ${res.status}`); }
  return res.status === 204 ? undefined as T : res.json();
}
export function ServerInbox() {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [items, setItems] = useState<Inquiry[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [login, setLogin] = useState({ name: '', password: '' });
  const [form, setForm] = useState({ name: '', subject: '', phone: '', due: '' });
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [notice, setNotice] = useState('');
  const [ready, setReady] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [retryKey, setRetryKey] = useState(0);
  const selected = items.find(i => i.id === selectedId);
  const refresh = useCallback(async () => { const [list, users] = await Promise.all([api<Inquiry[]>('/api/inquiries'), api<Admin[]>('/api/admins')]); setItems(list); setAdmins(users); }, []);
  const syncError = (error: unknown) => {
    if (error instanceof Error && /Login admin diperlukan|Autentikasi diperlukan|Sesi berakhir|HTTP 401/i.test(error.message)) {
      setAdmin(null); setItems([]); setSelectedId(null);
      setNotice('Sesi inbox berakhir. Silakan login ulang.');
    } else setNotice('Sinkronisasi gagal; periksa koneksi atau coba lagi.');
  };
  useEffect(() => {
    let active = true;
    setReady(false);
    api<Admin>('/api/auth/me').then(user => {
      if (!active) return;
      setAdmin(user);
      setLoadError('');
      return refresh();
    }).catch(error => {
      if (!active) return;
      if (error instanceof Error && /Login admin diperlukan|Autentikasi diperlukan|Sesi berakhir|HTTP 401/i.test(error.message)) {
        setAdmin(null); setLoadError('');
      } else {
        setLoadError(error instanceof Error && error.name === 'TimeoutError' ? 'Server inbox tidak merespons dalam 12 detik.' : 'Server inbox tidak dapat dijangkau. Jalankan API atau periksa koneksi.');
      }
    }).finally(() => { if (active) setReady(true); });
    return () => { active = false; };
  }, [refresh, retryKey]);
  const retryLoad = () => { setLoadError(''); setRetryKey(key => key + 1); };
  useEffect(() => { if (!admin) return; const timer = setInterval(() => { if (document.visibilityState === 'visible') refresh().catch(syncError); }, 5000); return () => clearInterval(timer); }, [admin, refresh]);
  const action = async (url: string, method: string, data: object) => { try { const result = await api<Inquiry>(url, method, data); await refresh(); return result; } catch (e) { setNotice(e instanceof Error ? e.message : 'Permintaan gagal'); return null; } };
  const patch = (item: Inquiry, values: object) => action(`/api/inquiries/${item.id}`, 'PATCH', values);
  const submit = async (e: React.FormEvent) => { e.preventDefault(); const created = await action('/api/inquiries', 'POST', form); if (created) { setOpen(false); setSelectedId(created.id); setForm({ name: '', subject: '', phone: '', due: '' }); } };
  const send = async (kind: 'internal' | 'outgoing') => {
    if (!selected || !draft.trim()) return;
    const text = draft.trim();
    const updated = await action(`/api/inquiries/${selected.id}/entries`, 'POST', { kind, text });
    if (!updated) return;
    setDraft('');
    if (kind === 'outgoing') {
      const digits = selected.phone.replace(/\D/g, ''); const number = digits.startsWith('0') ? `62${digits.slice(1)}` : digits;
      if (/^\d{9,15}$/.test(number)) {
        window.open(`https://wa.me/${number}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
        setNotice('Draf dibuka di WhatsApp; ini bukan bukti pesan terkirim.');
      } else {
        setNotice('Nomor WhatsApp tidak valid untuk membuka draf.');
      }
    } else setNotice('Catatan tersimpan di server.');
  };
  if (!ready) return <p role="status">Memuat inbox...</p>;
  if (loadError) return <section role="alert" className="max-w-lg rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm"><h2 className="text-lg font-semibold">Inbox Tim belum dapat dimuat</h2><p className="my-3">{loadError}</p><button type="button" onClick={retryLoad} className="min-h-11 rounded-lg bg-[#123C35] px-4 text-white">Coba lagi</button></section>;
  if (!admin) return <section className="max-w-lg rounded-xl border bg-white p-6"><h2 className="text-xl font-bold">Login Inbox Tim</h2><p className="my-3 text-sm">Login demo dashboard tidak memberi akses server. Gunakan akun admin inbox yang dibuat lewat CLI.</p><form onSubmit={async e => { e.preventDefault(); try { const user = await api<Admin>('/api/auth/login', 'POST', login); setAdmin(user); setLogin({ name: '', password: '' }); await refresh(); setNotice(''); } catch (error) { setNotice(error instanceof Error ? error.message : 'Login gagal'); } }} className="space-y-3"><label className="block">Nama admin<input aria-label="Nama admin inbox" autoComplete="username" value={login.name} onChange={e => setLogin({ ...login, name: e.target.value })} className="block w-full rounded-lg border p-2" required/></label><label className="block">Kata sandi<input aria-label="Kata sandi inbox" type="password" autoComplete="current-password" value={login.password} onChange={e => setLogin({ ...login, password: e.target.value })} className="block w-full rounded-lg border p-2" required/></label><button className="rounded-lg bg-elwafa-ocean px-4 py-2 text-white">Masuk ke inbox</button></form>{notice && <p role="alert" className="mt-3 text-red-700">{notice}</p>}</section>;
  return <section aria-label="Inbox tim server" className="space-y-4"><header className="rounded-xl border bg-white p-5"><div className="flex flex-wrap justify-between gap-3"><div><h2 className="text-xl font-bold">Inbox Tim • {admin.name}</h2><p className="text-xs text-gray-600">Data bersama tersimpan di server; sinkron tiap 5 detik. WhatsApp API belum terintegrasi.</p></div><div className="flex gap-2"><button onClick={() => setOpen(true)} className="rounded-lg bg-elwafa-ocean px-3 py-2 text-xs text-white">+ Catat inquiry</button><button onClick={async () => { await api('/api/auth/logout', 'POST').catch(() => {}); setAdmin(null); setItems([]); }} className="rounded-lg border px-3 py-2 text-xs">Keluar</button></div></div><p className="mt-3 text-xs">Total {items.length} · Belum ditugaskan {items.filter(i => !i.agentId).length} · Selesai {items.filter(i => i.stage === 'selesai').length}</p></header>{notice && <p role="status" className="rounded-lg border bg-white p-3 text-xs">{notice}</p>}<div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">{stages.map(stage => <div key={stage.id} onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); const item = items.find(i => i.id === e.dataTransfer.getData('text/plain')); if (item) void patch(item, { stage: stage.id }); }} className="min-h-40 min-w-0 rounded-xl border bg-[#F3F7F5] p-3"><h3 className="mb-3 font-bold">{stage.label} ({items.filter(i => i.stage === stage.id).length})</h3>{items.filter(i => i.stage === stage.id).map(item => <div key={item.id} draggable onDragStart={e => e.dataTransfer.setData('text/plain', item.id)} className="mb-2 rounded-lg border bg-white p-3"><button aria-label={`Buka inquiry ${item.name}`} onClick={() => setSelectedId(item.id)} className="w-full text-left"><strong className="block text-sm">{item.name}</strong><span className="block text-xs">{item.subject}</span><span className="block text-xs text-gray-600">{item.agent} · {item.due || 'Tanpa tenggat'}</span></button><select aria-label={`Pindah tahap ${item.name}`} value={item.stage} onChange={e => void patch(item, { stage: e.target.value })} className="mt-2 w-full rounded-lg border p-1 text-xs">{stages.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}</select></div>)}</div>)}</div>
  {selected && <div className="fixed inset-0 z-[80] flex justify-end bg-black/50" onClick={() => setSelectedId(null)}><div role="dialog" aria-modal="true" aria-label={`Detail inquiry ${selected.name}`} onClick={e => e.stopPropagation()} className="flex h-full w-full max-w-lg flex-col overflow-y-auto bg-white p-5"><div className="flex justify-between"><h3 className="text-xl font-bold">{selected.name}</h3><button aria-label="Tutup detail inquiry" onClick={() => setSelectedId(null)}>✕</button></div><p className="text-sm">{selected.subject}</p><div className="mt-5 grid grid-cols-2 gap-3 text-xs"><label className="col-span-2">Nomor WhatsApp<input aria-label="Nomor WhatsApp inquiry" key={`${selected.id}-${selected.phone}`} defaultValue={selected.phone} onBlur={e => { if (e.target.value !== selected.phone) void patch(selected, { phone: e.target.value }); }} className="block w-full rounded-lg border p-2"/></label><label>Penanggung jawab<select aria-label="Penanggung jawab inquiry" value={selected.agentId || ''} onChange={e => void patch(selected, { agentId: e.target.value || null })} className="block w-full rounded-lg border p-2"><option value="">Belum ditugaskan</option>{admins.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}</select></label><label>Tenggat tindak lanjut<input aria-label="Tenggat tindak lanjut" type="date" value={selected.due} onChange={e => void patch(selected, { due: e.target.value })} className="block w-full rounded-lg border p-2"/></label><label className="col-span-2">Tahap<select aria-label="Tahap inquiry" value={selected.stage} onChange={e => void patch(selected, { stage: e.target.value })} className="block w-full rounded-lg border p-2">{stages.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}</select></label></div><div className="mt-5 flex-1"><h4 className="font-bold">Riwayat & catatan</h4>{selected.entries.map(entry => <div key={entry.id} className="mt-2 rounded-lg bg-[#F3F7F5] p-3 text-xs"><strong>{entry.kind === 'internal' ? 'Catatan internal' : 'Draf WhatsApp'} · {entry.author}</strong><p className="whitespace-pre-wrap break-words">{entry.text}</p><time>{new Date(entry.at).toLocaleString('id-ID')}</time></div>)}</div><div className="sticky bottom-0 mt-5 bg-white pt-3"><div className="mb-2"><div className="text-[11px] font-semibold text-gray-700 mb-1">Template Balasan WhatsApp Cepat:</div><div className="flex flex-wrap gap-1.5">{INBOX_TEMPLATES.map(tmpl => (<button key={tmpl.id} type="button" onClick={() => setDraft(applyTemplate(tmpl.text, selected, admin?.name))} className="rounded-md border border-elwafa-teal/30 bg-elwafa-teal/5 px-2 py-0.5 text-[10px] font-medium text-elwafa-ocean hover:bg-elwafa-teal/15 transition-colors" title="Klik untuk mengisi draf">{tmpl.label}</button>))}</div></div><textarea aria-label="Catatan atau draf balasan" value={draft} onChange={e => setDraft(e.target.value)} rows={3} className="w-full rounded-lg border p-2"/><div className="flex flex-wrap gap-2"><button disabled={!draft.trim()} onClick={() => void send('internal')} className="rounded-lg border p-2 text-xs disabled:opacity-40">Simpan catatan</button><button disabled={!draft.trim()} onClick={() => void send('outgoing')} className="rounded-lg bg-elwafa-ocean p-2 text-xs text-white disabled:opacity-40">Buka draf di WhatsApp</button></div></div></div></div>}
  {open && <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 p-4" onClick={() => setOpen(false)}><form aria-label="Form catat inquiry" onClick={e => e.stopPropagation()} onSubmit={submit} className="w-full max-w-md space-y-3 rounded-xl bg-white p-6"><h3 className="font-bold">Catat inquiry manual</h3>{(['name','subject','phone'] as const).map(key => <label key={key} className="block text-xs">{key === 'name' ? 'Nama calon santri / wali' : key === 'subject' ? 'Topik inquiry' : 'Nomor WhatsApp (opsional)'}<input required={key !== 'phone'} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} className="block w-full rounded-lg border p-2"/></label>)}<label className="block text-xs">Tenggat tindak lanjut<input type="date" value={form.due} onChange={e => setForm({ ...form, due: e.target.value })} className="block w-full rounded-lg border p-2"/></label><button className="rounded-lg bg-elwafa-ocean p-2 text-white">Simpan ke board</button><button type="button" onClick={() => setOpen(false)} className="ml-2 rounded-lg border p-2">Batal</button></form></div>}</section>;
}
