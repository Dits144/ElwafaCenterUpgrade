import React, { useEffect, useMemo, useState } from 'react';
import { CalendarClock, ChevronRight, CircleAlert, ExternalLink, MessageCircle, Plus, Search, Send, UserRound, Users, X } from 'lucide-react';

type Stage = 'baru' | 'ditangani' | 'menunggu' | 'selesai';
type Agent = 'Belum ditugaskan' | 'Admin 1' | 'Admin 2' | 'Admin 3';
type Entry = { id: string; at: string; author: string; kind: 'internal' | 'outgoing'; text: string };
type Inquiry = { id: string; name: string; phone: string; subject: string; stage: Stage; agent: Agent; due: string; entries: Entry[]; updatedAt: string };
const KEY = 'elwafa_team_inbox_demo_v1';
const agents: Agent[] = ['Belum ditugaskan', 'Admin 1', 'Admin 2', 'Admin 3'];
const stages: { id: Stage; label: string; hint: string }[] = [
  { id: 'baru', label: 'Belum ditangani', hint: 'Perlu diambil tim' },
  { id: 'ditangani', label: 'Sedang ditangani', hint: 'Ada penanggung jawab' },
  { id: 'menunggu', label: 'Menunggu calon santri', hint: 'Perlu tindak lanjut' },
  { id: 'selesai', label: 'Selesai', hint: 'Percakapan ditutup' },
];
const initial: Inquiry[] = [
  { id: 'demo-inq-1', name: 'Calon Santri A (contoh)', phone: '', subject: 'Tanya persiapan bahasa Arab', stage: 'baru', agent: 'Belum ditugaskan', due: '', updatedAt: new Date().toISOString(), entries: [{ id: 'e-1', at: new Date().toISOString(), author: 'Simulasi', kind: 'internal', text: 'Contoh inquiry untuk latihan alur tim. Bukan pesan WhatsApp asli.' }] },
  { id: 'demo-inq-2', name: 'Wali Santri B (contoh)', phone: '', subject: 'Konsultasi persyaratan Ma’had', stage: 'ditangani', agent: 'Admin 2', due: '', updatedAt: new Date().toISOString(), entries: [{ id: 'e-2', at: new Date().toISOString(), author: 'Simulasi', kind: 'internal', text: 'Contoh handoff antar admin; belum tersambung ke WhatsApp.' }] },
];
const dateText = (v: string) => v ? new Date(`${v}T12:00:00`).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Belum dijadwalkan';
const normalizePhone = (v: string) => { const digits = v.replace(/\D/g, ''); return digits.startsWith('0') ? `62${digits.slice(1)}` : digits; };
const validPhone = (v: string) => /^\d{9,15}$/.test(normalizePhone(v));
const stamp = () => new Date().toISOString();

export const TeamInbox: React.FC = () => {
  const [items, setItems] = useState<Inquiry[]>(() => {
    try { const raw = localStorage.getItem(KEY); const parsed: unknown = raw ? JSON.parse(raw) : null; return Array.isArray(parsed) ? parsed as Inquiry[] : initial; }
    catch { return initial; }
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [agentFilter, setAgentFilter] = useState<Agent | 'Semua'>('Semua');
  const [createOpen, setCreateOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', subject: '', due: '' });
  const [formError, setFormError] = useState('');
  const [draft, setDraft] = useState('');
  const [dragId, setDragId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(items)); }, [items]);
  const selected = items.find(i => i.id === selectedId);
  const visible = useMemo(() => items.filter(i => (agentFilter === 'Semua' || i.agent === agentFilter) && `${i.name} ${i.subject} ${i.phone}`.toLowerCase().includes(search.toLowerCase())), [items, agentFilter, search]);
  const overdue = (i: Inquiry) => Boolean(i.due && i.due < new Date().toLocaleDateString('en-CA') && i.stage !== 'selesai');
  const update = (id: string, change: Partial<Inquiry>) => setItems(old => old.map(i => i.id === id ? { ...i, ...change, updatedAt: stamp() } : i));
  const changeStage = (i: Inquiry, stage: Stage) => {
    if (stage !== 'baru' && i.agent === 'Belum ditugaskan') { setSelectedId(i.id); setFeedback('Tetapkan penanggung jawab sebelum memindahkan kartu.'); return; }
    update(i.id, { stage }); setFeedback(`Status ${i.name} diperbarui.`);
  };
  const create = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.subject.trim()) { setFormError('Nama dan topik wajib diisi.'); return; }
    if (form.phone.trim() && !validPhone(form.phone)) { setFormError('Nomor WhatsApp tidak valid. Kosongkan bila belum tersedia.'); return; }
    const item: Inquiry = { id: crypto.randomUUID(), name: form.name.trim(), phone: form.phone.trim(), subject: form.subject.trim(), due: form.due, agent: 'Belum ditugaskan', stage: 'baru', updatedAt: stamp(), entries: [] };
    setItems(old => [item, ...old]); setSelectedId(item.id); setCreateOpen(false); setForm({ name: '', phone: '', subject: '', due: '' }); setFormError(''); setFeedback('Inquiry dicatat di board lokal. Tidak ada pesan WhatsApp yang terkirim.');
  };
  const addEntry = (kind: Entry['kind']) => {
    if (!selected || !draft.trim()) return;
    if (kind === 'outgoing' && !validPhone(selected.phone)) { setFeedback('Isi nomor WhatsApp valid sebelum membuka draf pesan.'); return; }
    const entry: Entry = { id: crypto.randomUUID(), at: stamp(), author: selected.agent === 'Belum ditugaskan' ? 'Admin (demo)' : selected.agent, kind, text: draft.trim() };
    update(selected.id, { entries: [...selected.entries, entry] });
    if (kind === 'outgoing') {
      window.open(`https://wa.me/${normalizePhone(selected.phone)}?text=${encodeURIComponent(draft.trim())}`, '_blank', 'noopener,noreferrer');
      setFeedback('Draf dibuka di WhatsApp. Catatan di sini BUKAN bukti pesan sudah terkirim.');
    } else setFeedback('Catatan internal disimpan hanya di browser ini.');
    setDraft('');
  };
  const card = (i: Inquiry) => <div key={i.id} draggable onDragStart={e => { e.dataTransfer.setData('text/plain', i.id); setDragId(i.id); }} onDragEnd={() => setDragId(null)} className={`rounded-2xl border bg-white p-4 shadow-sm transition hover:border-elwafa-teal ${dragId === i.id ? 'opacity-50' : 'border-elwafa-surface-border'}`}>
    <button type="button" onClick={() => { setSelectedId(i.id); setFeedback(''); }} className="w-full text-left focus-visible:outline-2 focus-visible:outline-elwafa-teal" aria-label={`Buka inquiry ${i.name}`}>
      <span className="block text-sm font-bold text-elwafa-ocean">{i.name}</span><span className="mt-1 block text-xs text-elwafa-text-muted">{i.subject}</span>
      <span className="mt-3 flex items-center justify-between gap-2 text-[11px] text-elwafa-text-muted"><span className="flex items-center gap-1"><UserRound size={13}/>{i.agent}</span><ChevronRight size={14}/></span>
      {i.due && <span className={`mt-2 flex items-center gap-1 text-[11px] ${overdue(i) ? 'font-bold text-red-700' : 'text-elwafa-text-muted'}`}><CalendarClock size={13}/>{overdue(i) ? 'Lewat tenggat · ' : 'Tenggat · '}{dateText(i.due)}</span>}
    </button>
    <label className="mt-3 block text-[11px] text-elwafa-text-muted">Pindah tahap
      <select aria-label={`Pindah tahap ${i.name}`} value={i.stage} onChange={e => changeStage(i, e.target.value as Stage)} className="mt-1 w-full rounded-lg border border-elwafa-surface-border bg-elwafa-surface p-2 text-xs text-elwafa-ocean">{stages.map(s => <option value={s.id} key={s.id}>{s.label}</option>)}</select>
    </label>
  </div>;
  return <section className="space-y-5" aria-label="Inbox tim Elwafa">
    <header className="rounded-2xl border border-elwafa-surface-border bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-widest text-elwafa-teal">Operasional • Inbox tim</p><h2 className="mt-1 text-xl font-extrabold text-elwafa-ocean">Satu board, jelas siapa menangani apa.</h2><p className="mt-2 max-w-2xl text-xs leading-relaxed text-elwafa-text-muted">Simulasi alur inquiry Elwafa. Belum terhubung ke WhatsApp API, tidak menerima pesan otomatis, dan data hanya tersimpan di browser ini.</p></div><button type="button" onClick={() => setCreateOpen(true)} className="flex items-center gap-2 rounded-xl bg-elwafa-ocean px-4 py-2.5 text-xs font-bold text-white"><Plus size={16}/>Catat inquiry</button></div>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">{[{ name: 'Total inquiry', n: items.length, icon: MessageCircle }, { name: 'Belum ditugaskan', n: items.filter(i => i.agent === 'Belum ditugaskan').length, icon: Users }, { name: 'Lewat tenggat', n: items.filter(overdue).length, icon: CircleAlert }, { name: 'Selesai', n: items.filter(i => i.stage === 'selesai').length, icon: Send }].map(m => <div key={m.name} className="rounded-xl border border-elwafa-surface-border bg-elwafa-surface p-3"><m.icon size={16} className="text-elwafa-teal"/><strong className="mt-1 block text-lg text-elwafa-ocean">{m.n}</strong><span className="text-[11px] text-elwafa-text-muted">{m.name}</span></div>)}</div>
    </header>
    <div className="flex flex-wrap gap-2"><label className="flex min-w-[180px] flex-1 items-center gap-2 rounded-xl border border-elwafa-surface-border bg-white px-3"><Search size={16} className="text-elwafa-text-muted"/><input aria-label="Cari inquiry" placeholder="Cari nama, nomor, topik" value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-transparent py-3 text-xs outline-none"/></label><select aria-label="Filter penanggung jawab" value={agentFilter} onChange={e => setAgentFilter(e.target.value as Agent | 'Semua')} className="rounded-xl border border-elwafa-surface-border bg-white px-3 text-xs"><option value="Semua">Semua admin</option>{agents.map(a => <option key={a}>{a}</option>)}</select></div>
    {feedback && <p role="status" className="rounded-xl border border-elwafa-teal/20 bg-elwafa-teal/10 p-3 text-xs text-elwafa-ocean">{feedback}</p>}
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">{stages.map(s => <div key={s.id} onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); const id = e.dataTransfer.getData('text/plain'); const item = items.find(i => i.id === id); if (item) changeStage(item, s.id); setDragId(null); }} className="min-h-44 min-w-0 rounded-2xl border border-elwafa-surface-border bg-[#F3F7F5] p-3"><div className="mb-3 flex items-center justify-between"><div><h3 className="text-xs font-bold text-elwafa-ocean">{s.label}</h3><p className="text-[10px] text-elwafa-text-muted">{s.hint}</p></div><span className="rounded-full bg-white px-2 py-1 text-xs font-bold text-elwafa-teal">{visible.filter(i => i.stage === s.id).length}</span></div><div className="space-y-2">{visible.filter(i => i.stage === s.id).map(card)}{!visible.some(i => i.stage === s.id) && <p className="rounded-xl border border-dashed border-elwafa-surface-border p-3 text-center text-xs text-elwafa-text-muted">Belum ada inquiry</p>}</div></div>)}</div>
    {selected && <div className="fixed inset-0 z-[80] flex justify-end bg-black/50" onClick={() => setSelectedId(null)}><div role="dialog" aria-modal="true" aria-label={`Detail inquiry ${selected.name}`} onClick={e => e.stopPropagation()} className="flex h-full w-full max-w-lg flex-col overflow-y-auto bg-white p-5 shadow-2xl sm:p-7"><div className="flex items-start justify-between gap-4"><div><p className="text-[11px] font-bold uppercase text-elwafa-teal">Detail inquiry • simulasi</p><h3 className="text-xl font-bold text-elwafa-ocean">{selected.name}</h3><p className="text-xs text-elwafa-text-muted">{selected.subject}</p></div><button aria-label="Tutup detail inquiry" onClick={() => setSelectedId(null)}><X size={20}/></button></div>
      <div className="mt-6 grid grid-cols-2 gap-3 text-xs"><label className="col-span-2">Nomor WhatsApp (opsional)<input aria-label="Nomor WhatsApp inquiry" value={selected.phone} onChange={e => update(selected.id, { phone: e.target.value })} placeholder="Contoh: 0812..." className="mt-1 w-full rounded-xl border border-elwafa-surface-border p-2.5"/></label><label>Penanggung jawab<select aria-label="Penanggung jawab inquiry" value={selected.agent} onChange={e => update(selected.id, { agent: e.target.value as Agent })} className="mt-1 w-full rounded-xl border border-elwafa-surface-border p-2.5">{agents.map(a => <option key={a}>{a}</option>)}</select></label><label>Tenggat tindak lanjut<input aria-label="Tenggat tindak lanjut" type="date" value={selected.due} onChange={e => update(selected.id, { due: e.target.value })} className="mt-1 w-full rounded-xl border border-elwafa-surface-border p-2.5"/></label><label className="col-span-2">Tahap<select aria-label="Tahap inquiry" value={selected.stage} onChange={e => changeStage(selected, e.target.value as Stage)} className="mt-1 w-full rounded-xl border border-elwafa-surface-border p-2.5">{stages.map(s => <option value={s.id} key={s.id}>{s.label}</option>)}</select></label></div>
      <div className="mt-6 flex-1"><h4 className="text-sm font-bold text-elwafa-ocean">Riwayat & catatan internal</h4><p className="mt-1 text-[11px] text-elwafa-text-muted">Catatan dan draf di bawah tidak tersinkron dengan WhatsApp.</p><div className="mt-3 space-y-2">{selected.entries.map(entry => <div key={entry.id} className="rounded-xl border border-elwafa-surface-border bg-elwafa-surface p-3 text-xs"><span className="font-bold text-elwafa-teal">{entry.kind === 'internal' ? 'Catatan internal' : 'Draf WhatsApp'} · {entry.author}</span><p className="mt-1 whitespace-pre-wrap break-words text-elwafa-ocean">{entry.text}</p><time className="mt-2 block text-[10px] text-elwafa-text-muted">{new Date(entry.at).toLocaleString('id-ID')}</time></div>)}{selected.entries.length === 0 && <p className="text-xs text-elwafa-text-muted">Belum ada catatan.</p>}</div></div>
      <div className="sticky bottom-0 mt-6 border-t border-elwafa-surface-border bg-white pt-4"><textarea aria-label="Catatan atau draf balasan" value={draft} onChange={e => setDraft(e.target.value)} rows={3} placeholder="Tulis catatan tim atau draf balasan..." className="w-full rounded-xl border border-elwafa-surface-border p-3 text-xs"/><div className="mt-2 flex flex-wrap gap-2"><button disabled={!draft.trim()} onClick={() => addEntry('internal')} className="rounded-xl border border-elwafa-teal px-3 py-2 text-xs font-bold text-elwafa-teal disabled:opacity-40">Simpan catatan</button><button disabled={!draft.trim()} onClick={() => addEntry('outgoing')} className="flex items-center gap-1 rounded-xl bg-elwafa-ocean px-3 py-2 text-xs font-bold text-white disabled:opacity-40"><ExternalLink size={13}/>Buka draf di WhatsApp</button></div></div>
    </div></div>}
    {createOpen && <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 p-4" onClick={() => setCreateOpen(false)}><form onClick={e => e.stopPropagation()} onSubmit={create} className="w-full max-w-md space-y-3 rounded-2xl bg-white p-6" aria-label="Form catat inquiry"><div className="flex justify-between"><h3 className="text-lg font-bold text-elwafa-ocean">Catat inquiry manual</h3><button type="button" aria-label="Tutup form" onClick={() => setCreateOpen(false)}><X size={18}/></button></div><p className="text-xs text-elwafa-text-muted">Jangan masukkan data sensitif; simulasi ini tersimpan di browser.</p>{([['name','Nama calon santri / wali'],['subject','Topik inquiry'],['phone','Nomor WhatsApp (opsional)']] as const).map(([key,label]) => <label key={key} className="block text-xs">{label}<input value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} className="mt-1 w-full rounded-xl border border-elwafa-surface-border p-2.5"/></label>)}<label className="block text-xs">Tenggat tindak lanjut<input type="date" value={form.due} onChange={e => setForm({ ...form, due: e.target.value })} className="mt-1 w-full rounded-xl border border-elwafa-surface-border p-2.5"/></label>{formError && <p role="alert" className="text-xs text-red-700">{formError}</p>}<button type="submit" className="w-full rounded-xl bg-elwafa-ocean px-4 py-3 text-xs font-bold text-white">Simpan ke board</button></form></div>}
  </section>;
};
