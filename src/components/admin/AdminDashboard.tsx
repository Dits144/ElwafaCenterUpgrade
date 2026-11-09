import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { RouteErrorBoundary } from '../common/RouteErrorBoundary';
import { useApp } from '../../context/AppContext';
import { ServerInbox } from './ServerInbox';
import { MessagesSquare } from 'lucide-react';

import { Student, Program, Article, CalendarEvent } from '../../types';
import { 
  Users, 
  FileCheck, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Filter, 
  ArrowLeft, 
  Eye, 
  ShieldCheck, 
  BookOpen, 
  Download, 
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Calendar,
  X,
  Newspaper,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  ChevronRight,
  Info,
  CalendarDays,
  BarChart3,
  Settings,
  Layers,
  GraduationCap,
  TrendingUp,
  Award,
  BellRing
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const {
    students, 
    programs, 
    articles,
    calendarEvents,
    addCalendarEvent,
    deleteCalendarEvent,
    adminApproveApplication, 
    adminRequestRevision, 
    adminRejectApplication, 
    addArticle,
    updateArticle,
    deleteArticle,
    setSelectedArticle,
    addProgram,
    updateProgram,
    deleteProgram,
    setSelectedProgramForDetail,
    setRole, 
    setActiveStudentId,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'students' | 'programs' | 'articles' | 'calendar' | 'analytics' | 'settings' | 'inbox'>('students');

  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Decision Modal State
  const [decisionAction, setDecisionAction] = useState<'approve' | 'revision' | 'reject' | null>(null);
  const [decisionNotes, setDecisionNotes] = useState<string>('');

  // Article Modal State
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [articleForm, setArticleForm] = useState<{
    title: string;
    category: Article['category'];
    author: string;
    readTime: string;
    summary: string;
    content: string;
    image: string;
    status: 'PUBLISHED' | 'DRAFT';
  }>({
    title: '',
    category: 'Kegiatan',
    author: 'Redaksi Elwafa Center',
    readTime: '3 menit',
    summary: '',
    content: '',
    image: '/assets/gallery/1.jpeg',
    status: 'PUBLISHED'
  });

  // Program Modal State
  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);
  const [editingProgramId, setEditingProgramId] = useState<string | null>(null);
  const [programForm, setProgramForm] = useState({
    title: '',
    category: 'Al-Azhar Mesir',
    duration: '1 Tahun Bimbingan',
    schedule: 'Mulai Juli 2026',
    quota: 50,
    description: '',
    highlightsText: 'Bimbingan Kitab Turats\nKarantina Bahasa Arab\nLegalitas Kemenkumham\nPendampingan Visa',
    image: '/assets/8.jpeg'
  });

  // Calendar Event Modal State
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [calendarForm, setCalendarForm] = useState<{
    title: string;
    date: string;
    time: string;
    location: string;
    category: CalendarEvent['category'];
    description: string;
    quotaTarget: number;
    status: CalendarEvent['status'];
  }>({
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '08:30 WIB',
    location: 'Sekretariat Elwafa Bogor',
    category: 'SELEKSI',
    description: '',
    quotaTarget: 50,
    status: 'UPCOMING'
  });

  // Metrics KPI calculations
  const totalStudents = students.length;
  const pendingCount = students.filter((s) => s.status === 'PENDING').length;
  const approvedCount = students.filter((s) => s.status === 'APPROVED').length;
  const revisionCount = students.filter((s) => s.status === 'REVISION_REQUIRED').length;
  const rejectedCount = students.filter((s) => s.status === 'REJECTED').length;

  // Filtered Students List
  const filteredStudents = students.filter((s) => {
    const matchesStatus = statusFilter === 'ALL' || s.status === statusFilter;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.originCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.selectedProgramName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleOpenReview = (student: Student) => {
    setSelectedStudent(student);
    setDecisionAction(null);
    setDecisionNotes('');
  };

  const handleConfirmDecision = () => {
    if (!selectedStudent) return;

    if (decisionAction === 'approve') {
      adminApproveApplication(selectedStudent.id, decisionNotes || 'Berkas telah lengkap dan disetujui.');
    } else if (decisionAction === 'revision') {
      if (!decisionNotes.trim()) {
        alert('Mohon cantumkan rincian bagian berkas yang perlu diperbaiki oleh calon mahasiswa.');
        return;
      }
      adminRequestRevision(selectedStudent.id, decisionNotes);
    } else if (decisionAction === 'reject') {
      if (!decisionNotes.trim()) {
        alert('Mohon cantumkan alasan penolakan berkas.');
        return;
      }
      adminRejectApplication(selectedStudent.id, decisionNotes);
    }

    setSelectedStudent(null);
    setDecisionAction(null);
    setDecisionNotes('');
  };

  // Article handlers
  const handleOpenNewArticle = () => {
    setEditingArticleId(null);
    setArticleForm({
      title: '',
      category: 'Kegiatan',
      author: 'Redaksi Elwafa Center',
      readTime: '3 menit',
      summary: '',
      content: '',
      image: '/assets/gallery/1.jpeg',
      status: 'PUBLISHED'
      });
    setIsArticleModalOpen(true);
  };

  const handleEditArticle = (art: Article) => {
    setEditingArticleId(art.id);
    setArticleForm({
      title: art.title,
      category: art.category,
      author: art.author,
      readTime: art.readTime,
      summary: art.summary,
      content: art.content,
      image: art.image,
      status: art.status
    });
    setIsArticleModalOpen(true);
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleForm.title.trim()) {
      alert('Judul berita/artikel wajib diisi.');
      return;
    }

    if (editingArticleId) {
      updateArticle(editingArticleId, {
        title: articleForm.title,
        category: articleForm.category,
        author: articleForm.author,
        readTime: articleForm.readTime,
        summary: articleForm.summary,
        content: articleForm.content,
        image: articleForm.image,
        status: articleForm.status
      });
    } else {
      addArticle({
        slug: articleForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: articleForm.title,
        category: articleForm.category,
        author: articleForm.author,
        authorRole: 'Redaksi Humas Elwafa',
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        readTime: articleForm.readTime,
        summary: articleForm.summary,
        content: articleForm.content,
        image: articleForm.image,
        status: articleForm.status
      });
    }

    setIsArticleModalOpen(false);
  };

  // Program handlers
  const handleOpenNewProgram = () => {
    setEditingProgramId(null);
    setProgramForm({
      title: '',
      category: 'Al-Azhar Mesir',
      duration: '1 Tahun',
      schedule: 'Mulai Juli 2026',
      quota: 40,
      description: '',
      highlightsText: 'Bimbingan Masyaikh\nKarantina Bahasa Arab\nLegalitas Kemenkumham\nAsrama di Kairo',
      image: '/assets/8.jpeg'
      });
    setIsProgramModalOpen(true);
  };

  const handleSaveProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!programForm.title.trim()) {
      alert('Nama program wajib diisi.');
      return;
    }

    const highlightsArr = programForm.highlightsText.split('\n').filter((s) => s.trim().length > 0);

    if (editingProgramId) {
      updateProgram(editingProgramId, {
        title: programForm.title,
        category: programForm.category,
        duration: programForm.duration,
        schedule: programForm.schedule,
        quota: Number(programForm.quota) || 50,
        description: programForm.description,
        highlights: highlightsArr,
        image: programForm.image
      });
    } else {
      addProgram({
        slug: programForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: programForm.title,
        category: programForm.category,
        duration: programForm.duration,
        schedule: programForm.schedule,
        quota: Number(programForm.quota) || 50,
        enrolledCount: 0,
        requirements: ['Ijazah SMA/MA/Sederajat', 'Pas Foto resmi', 'Komitmen belajar & asrama'],
        featured: false,
        priceNote: 'Biaya asrama & bimbingan terjangkau',
        description: programForm.description,
        highlights: highlightsArr,
        image: programForm.image
      });
    }

    setIsProgramModalOpen(false);
  };

  const handleSaveCalendarEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!calendarForm.title.trim()) {
      showToast('Judul kegiatan / agenda seleksi wajib diisi.', 'warning');
      return;
    }

    addCalendarEvent({
      title: calendarForm.title,
      date: calendarForm.date,
      time: calendarForm.time,
      location: calendarForm.location,
      category: calendarForm.category,
      description: calendarForm.description,
      quotaTarget: Number(calendarForm.quotaTarget) || 50,
      status: calendarForm.status
    });

    setIsCalendarModalOpen(false);
    setCalendarForm({
      title: '',
      date: new Date().toISOString().split('T')[0],
      time: '08:30 WIB',
      location: 'Sekretariat Elwafa Bogor',
      category: 'SELEKSI',
      description: '',
      quotaTarget: 50,
      status: 'UPCOMING'
    });
  };

  return (
    <div className="min-h-screen min-w-0 bg-elwafa-surface pb-28">
      {/* Top Admin Navigation Header */}
      <div className="bg-elwafa-ocean-dark text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => setRole('visitor')}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
              title="Kembali ke Beranda Publik"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-elwafa-gold/20 border border-elwafa-gold/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-elwafa-gold" />
            </div>
            <div className="min-w-0">
              <div className="flex min-w-0 flex-wrap items-center gap-1.5 sm:gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight">
                  Dashboard Administrasi &amp; Verifikator
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-elwafa-gold/20 text-elwafa-gold text-[10px] font-bold">
                  PORTAL ADMIN
                </span>
              </div>
              <p className="text-xs text-white/70">
                Pusat Pembinaan &amp; Konsultan Studi Al-Azhar Kairo — Elwafa Center
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const fields = ['ID', 'Nama', 'Program', 'Status', 'Tanggal Daftar'];
                const rows = students.map((s) => [s.id, s.name, s.selectedProgramName, s.status, s.registrationDate]);
                const csv = [fields, ...rows].map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\r\n');
                const link = document.createElement('a');
                link.href = URL.createObjectURL(new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8' }));
                link.download = 'elwafa-demo-pendaftar.csv';
                link.click();
                setTimeout(() => URL.revokeObjectURL(link.href), 1000);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors border border-white/10"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Rekap CSV</span>
            </button>
          </div>
        </div>

        {/* Mobile/tablet navigation shows every page without hidden horizontal tabs. */}
        <div aria-label="Navigasi admin" className="mx-auto grid max-w-7xl grid-cols-2 gap-2 border-t border-white/10 px-3 py-3 sm:grid-cols-3 sm:px-6 lg:hidden">
          {[
            { id: 'inbox', label: 'Inbox Tim & Inquiry', count: undefined, icon: <MessagesSquare className="w-4 h-4" /> },
            { id: 'students', label: 'Kelola Mahasiswa', count: pendingCount, icon: <Users className="w-4 h-4" /> },
            { id: 'programs', label: 'Kelola Program', count: programs.length, icon: <BookOpen className="w-4 h-4" /> },
            { id: 'articles', label: 'Kelola Berita', count: articles.length, icon: <Newspaper className="w-4 h-4" /> },
            { id: 'calendar', label: 'Kalender Seleksi', count: calendarEvents.length, icon: <CalendarDays className="w-4 h-4" /> },
            { id: 'analytics', label: 'Statistik & Analitik', count: undefined, icon: <BarChart3 className="w-4 h-4" /> },
            { id: 'settings', label: 'Pengaturan', count: undefined, icon: <Settings className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex min-w-0 min-h-11 items-center gap-2 rounded-xl border px-2.5 py-2 text-left text-[11px] leading-tight sm:text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'border-elwafa-gold text-elwafa-gold bg-white/5'
                  : 'border-transparent text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="shrink-0">{tab.icon}</span>
              <span className="min-w-0 break-words">{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  tab.id === 'students' && pendingCount > 0
                    ? 'bg-amber-500 text-white'
                    : 'bg-white/20 text-white'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout Container with Professional Sidebar & Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-8 min-w-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start min-w-0">
          
          {/* SIDEBAR NAVIGATION (3 COLS) */}
          <aside className="hidden lg:block lg:col-span-3 bg-white rounded-3xl p-5 border border-elwafa-surface-border shadow-soft sticky top-24 space-y-6">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-elwafa-teal block mb-1">
                Navigasi Utama
              </span>
              <h3 className="text-sm font-black text-elwafa-ocean">Admin Control Center</h3>
            </div>

            <nav className="space-y-1.5">
              {[
                { id: 'inbox', label: 'Inbox Tim & Inquiry', count: undefined, icon: <MessagesSquare className="w-4 h-4" /> },
                { id: 'students', label: 'Kelola Mahasiswa', count: pendingCount, icon: <Users className="w-4 h-4" /> },
                { id: 'programs', label: 'Program & Kuota', count: programs.length, icon: <BookOpen className="w-4 h-4" /> },
                { id: 'articles', label: 'Berita & Artikel', count: articles.length, icon: <Newspaper className="w-4 h-4" /> },
                { id: 'calendar', label: 'Kalender Seleksi', count: calendarEvents.length, icon: <CalendarDays className="w-4 h-4" /> },
                { id: 'analytics', label: 'Analitik Kapasitas', count: undefined, icon: <BarChart3 className="w-4 h-4" /> },
                { id: 'settings', label: 'Pengaturan Sistem', count: undefined, icon: <Settings className="w-4 h-4" /> },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === item.id
                      ? 'bg-elwafa-ocean text-white shadow-xs'
                      : 'text-elwafa-text-main hover:bg-elwafa-surface hover:text-elwafa-ocean'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      item.id === 'students' && pendingCount > 0
                        ? 'bg-amber-500 text-white'
                        : activeTab === item.id ? 'bg-white/20 text-white' : 'bg-elwafa-surface text-elwafa-text-muted'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>

            <div className="pt-4 border-t border-elwafa-surface-border">
              <div className="p-3 bg-elwafa-teal/10 rounded-2xl border border-elwafa-teal/20 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-elwafa-teal mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Role Aktif</span>
                </div>
                <p className="text-[11px] text-elwafa-ocean font-medium">Administrator &amp; Verifikator Dokumen</p>
                <button
                  onClick={() => setRole('visitor')}
                  className="mt-2 text-[10px] font-bold text-elwafa-teal hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Buka Beranda Publik →</span>
                </button>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT WORKSPACE (9 COLS) */}
          <motion.main key={activeTab} initial={reducedMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.24, ease: 'easeOut' }} className="min-w-0 lg:col-span-9 space-y-5 sm:space-y-8">

        {/* Metrics belong to registration/analytics, not every workspace. */}
        {(activeTab === 'students' || activeTab === 'analytics') && <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-5 gap-2 sm:gap-4 mb-5 sm:mb-8">
          <div className="bg-white p-3 sm:p-5 rounded-2xl border border-elwafa-surface-border shadow-soft">
            <span className="text-xs font-semibold text-elwafa-text-muted">Total Pendaftar</span>
            <div className="mt-2 text-2xl font-black text-elwafa-ocean">{totalStudents}</div>
            <span className="text-[10px] text-elwafa-teal font-semibold">Tahun Ajaran 2026/2027</span>
          </div>

          <div className="bg-white p-3 sm:p-5 rounded-2xl border-l-4 border-l-blue-500 border-elwafa-surface-border shadow-soft">
            <span className="text-xs font-semibold text-blue-700">Perlu Verifikasi (Pending)</span>
            <div className="mt-2 text-2xl font-black text-blue-700">{pendingCount}</div>
            <span className="text-[10px] text-elwafa-text-muted">Butuh tindakan admin</span>
          </div>

          <div className="bg-white p-3 sm:p-5 rounded-2xl border-l-4 border-l-emerald-500 border-elwafa-surface-border shadow-soft">
            <span className="text-xs font-semibold text-emerald-700">Disetujui (ACC)</span>
            <div className="mt-2 text-2xl font-black text-emerald-700">{approvedCount}</div>
            <span className="text-[10px] text-emerald-600 font-semibold">Siap masuk karantina</span>
          </div>

          <div className="bg-white p-3 sm:p-5 rounded-2xl border-l-4 border-l-amber-500 border-elwafa-surface-border shadow-soft">
            <span className="text-xs font-semibold text-amber-700">Perlu Revisi</span>
            <div className="mt-2 text-2xl font-black text-amber-700">{revisionCount}</div>
            <span className="text-[10px] text-amber-600 font-semibold">Menunggu santri upload</span>
          </div>

          <div className="bg-white p-3 sm:p-5 rounded-2xl border-l-4 border-l-red-500 border-elwafa-surface-border shadow-soft col-span-2 sm:col-span-1">
            <span className="text-xs font-semibold text-red-700">Ditolak</span>
            <div className="mt-2 text-2xl font-black text-red-700">{rejectedCount}</div>
            <span className="text-[10px] text-red-600 font-semibold">Tidak memenuhi syarat</span>
          </div>
        </div>}

        {/* TAB 1: KELOLA MAHASISWA / PENDAFTAR */}
        {activeTab === 'students' && (
          <div className="space-y-6">
            
            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-elwafa-surface-border shadow-soft flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              
              {/* Search Box */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-elwafa-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari santri berdasarkan nama, ID pendaftaran, kota asal, atau program..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-elwafa-surface border border-elwafa-surface-border rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-elwafa-teal"
                />
              </div>

              {/* Status Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-elwafa-text-muted font-bold mr-1 hidden sm:inline">Status:</span>
                {[
                  { id: 'ALL', label: 'Semua' },
                  { id: 'PENDING', label: 'Pending' },
                  { id: 'REVISION_REQUIRED', label: 'Revisi' },
                  { id: 'APPROVED', label: 'Disetujui' },
                  { id: 'REJECTED', label: 'Ditolak' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setStatusFilter(f.id)}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                      statusFilter === f.id
                        ? 'bg-elwafa-ocean text-white shadow-xs'
                        : 'bg-elwafa-surface text-elwafa-text-muted hover:bg-elwafa-surface-subtle'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile student cards keep review actions accessible without horizontal scrolling. */}
            <div className="space-y-3 md:hidden">
              {filteredStudents.length === 0 && <p className="rounded-2xl border bg-white p-5 text-sm text-elwafa-text-muted">Tidak ditemukan data pendaftar.</p>}
              {filteredStudents.map((s) => (
                <article key={s.id} className="min-w-0 rounded-2xl border border-elwafa-surface-border bg-white p-4 shadow-soft">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0"><h3 className="break-words text-sm font-bold text-elwafa-ocean">{s.name}</h3><p className="text-[11px] font-mono text-elwafa-teal">{s.id}</p></div>
                    <span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold ${s.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' : s.status === 'REJECTED' ? 'bg-red-100 text-red-800' : s.status === 'REVISION_REQUIRED' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>{s.status === 'APPROVED' ? 'Disetujui' : s.status === 'REJECTED' ? 'Ditolak' : s.status === 'REVISION_REQUIRED' ? 'Revisi' : 'Pending'}</span>
                  </div>
                  <p className="mt-3 break-words text-xs font-semibold text-elwafa-ocean">{s.selectedProgramName}</p>
                  <p className="mt-1 break-words text-xs text-elwafa-text-muted">{s.originCity} · {s.registrationDate}</p>
                  <div className="mt-4 flex flex-wrap gap-2"><button onClick={() => handleOpenReview(s)} className="rounded-lg bg-elwafa-ocean px-3 py-2 text-xs font-bold text-white">Review Berkas</button><button onClick={() => { setActiveStudentId(s.id); setRole('student'); }} className="rounded-lg border border-elwafa-surface-border px-3 py-2 text-xs font-bold text-elwafa-ocean">Lihat Portal</button></div>
                </article>
              ))}
            </div>
            {/* Desktop student table */}
            <div className="hidden md:block bg-white rounded-2xl border border-elwafa-surface-border shadow-soft overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-elwafa-surface-subtle text-elwafa-ocean uppercase tracking-wider font-bold border-b border-elwafa-surface-border">
                    <tr>
                      <th className="py-3.5 px-4">ID &amp; Santri</th>
                      <th className="py-3.5 px-4">Program Peminatan</th>
                      <th className="py-3.5 px-4">Kota Asal &amp; Sekolah</th>
                      <th className="py-3.5 px-4">Tanggal Daftar</th>
                      <th className="py-3.5 px-4">Status Berkas</th>
                      <th className="py-3.5 px-4 text-right">Aksi Verifikasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-elwafa-surface-border">
                    {filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-10 text-center text-elwafa-text-muted">
                          Tidak ditemukan data pendaftar yang sesuai kriteria pencarian.
                        </td>
                      </tr>
                    ) : (
                      filteredStudents.map((s) => {
                        let statusBadge = (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                            Menunggu Review
                          </span>
                        );

                        if (s.status === 'APPROVED') {
                          statusBadge = (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              Disetujui (ACC)
                            </span>
                          );
                        } else if (s.status === 'REVISION_REQUIRED') {
                          statusBadge = (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                              Perlu Revisi
                            </span>
                          );
                        } else if (s.status === 'REJECTED') {
                          statusBadge = (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-800">
                              Ditolak
                            </span>
                          );
                        }

                        return (
                          <tr key={s.id} className="hover:bg-elwafa-surface/60 transition-colors">
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-elwafa-ocean text-sm">{s.name}</div>
                              <span className="text-[11px] font-mono text-elwafa-teal font-semibold">{s.id}</span>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-elwafa-ocean line-clamp-1">{s.selectedProgramName}</div>
                              <span className="text-[11px] text-elwafa-text-muted">WA: {s.whatsapp}</span>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-medium text-elwafa-ocean">{s.originCity}</div>
                              <span className="text-[11px] text-elwafa-text-muted">{s.schoolOrigin}</span>
                            </td>
                            <td className="py-3.5 px-4 text-elwafa-text-muted font-medium">
                              {s.registrationDate}
                            </td>
                            <td className="py-3.5 px-4">
                              {statusBadge}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleOpenReview(s)}
                                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-elwafa-ocean hover:bg-elwafa-teal text-white font-bold text-[11px] transition-colors shadow-xs"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>Review Berkas</span>
                                </button>
                                <button
                                  onClick={() => {
                                    setActiveStudentId(s.id);
                                    setRole('student');
                                  }}
                                  title="Lihat tampilan dashboard santri ini"
                                  className="px-2 py-1.5 rounded-lg bg-elwafa-surface border border-elwafa-surface-border text-elwafa-text-muted hover:text-elwafa-ocean text-[11px] font-medium"
                                >
                                  Lihat Portal
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: KELOLA PROGRAM & DETAIL PROGRAM */}
        {activeTab === 'programs' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-elwafa-surface-border shadow-soft">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-base font-bold text-elwafa-ocean">Katalog Program Studi &amp; Kuota</h3>
                  <p className="text-xs text-elwafa-text-muted">Kelola data program, kurikulum bimbingan, durasi, dan kapasitas kuota santri.</p>
                </div>

                <button
                  onClick={handleOpenNewProgram}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-elwafa-teal hover:bg-elwafa-teal-dark text-white text-xs font-bold transition-all shadow-sm self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Program Baru</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {programs.map((prog) => {
                  const percentage = Math.round((prog.enrolledCount / prog.quota) * 100);

                  return (
                    <div key={prog.id} className="p-5 bg-elwafa-surface rounded-2xl border border-elwafa-surface-border flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-2.5 py-0.5 rounded-lg bg-white text-elwafa-ocean text-[10px] font-bold border border-elwafa-surface-border">
                            {prog.category}
                          </span>
                          <span className="text-[11px] font-semibold text-elwafa-teal">{prog.duration}</span>
                        </div>

                        <h4 className="text-sm font-bold text-elwafa-ocean mb-1">{prog.title}</h4>
                        <p className="text-xs text-elwafa-text-muted mb-4 line-clamp-2">{prog.description}</p>
                        
                        <div className="bg-white p-3 rounded-xl border border-elwafa-surface-border text-xs space-y-2 mb-4">
                          <div className="flex justify-between font-medium">
                            <span className="text-elwafa-text-muted">Status Kuota:</span>
                            <span className="font-bold text-elwafa-ocean">{prog.enrolledCount} / {prog.quota} Santri ({percentage}%)</span>
                          </div>
                          <div className="w-full bg-elwafa-surface h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-elwafa-teal h-full rounded-full transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>

                        <div className="space-y-1 text-[11px] text-elwafa-text-muted">
                          <div className="font-bold text-elwafa-ocean text-xs">Poin Keunggulan:</div>
                          {prog.highlights.slice(0, 3).map((h, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-elwafa-teal shrink-0" />
                              <span className="line-clamp-1">{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 mt-4 border-t border-elwafa-surface-border flex items-center justify-between gap-2">
                        <button
                          onClick={() => setSelectedProgramForDetail(prog)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-white border border-elwafa-surface-border rounded-lg text-xs font-bold text-elwafa-ocean hover:bg-elwafa-surface-subtle"
                        >
                          <Info className="w-3.5 h-3.5 text-elwafa-teal" />
                          <span>Detail Kurikulum</span>
                        </button>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setEditingProgramId(prog.id);
                              setProgramForm({ title: prog.title, category: prog.category, duration: prog.duration,
                                schedule: prog.schedule, quota: prog.quota, description: prog.description,
                                highlightsText: prog.highlights.join('\n'), image: prog.image });
                              setIsProgramModalOpen(true);
                            }}
                            className="px-2.5 py-1.5 bg-white border border-elwafa-surface-border rounded-lg text-xs font-medium text-elwafa-ocean hover:bg-elwafa-surface-subtle"
                            title="Edit Program"
                          >
                            Edit
                          </button>

                          {programs.length > 1 && (
                            <button
                              onClick={() => {
                                if (confirm(`Yakin ingin menghapus program "${prog.title}"?`)) {
                                  deleteProgram(prog.id);
                                }
                              }}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Hapus Program"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: KELOLA BERITA & ARTIKEL */}
        {activeTab === 'articles' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-elwafa-surface-border shadow-soft">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-base font-bold text-elwafa-ocean">Daftar Berita, Kegiatan &amp; Pengumuman</h3>
                  <p className="text-xs text-elwafa-text-muted">Publikasikan informasi seputar seleksi, karantina santri, dan liputan media.</p>
                </div>

                <button
                  onClick={handleOpenNewArticle}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-elwafa-teal hover:bg-elwafa-teal-dark text-white text-xs font-bold transition-all shadow-sm self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tulis Berita Baru</span>
                </button>
              </div>

              {/* Mobile article list */}
              <div className="space-y-3 md:hidden">
                {articles.map((art) => (
                  <article key={art.id} className="min-w-0 rounded-xl border border-elwafa-surface-border bg-elwafa-surface p-4">
                    <h4 className="break-words text-sm font-bold text-elwafa-ocean">{art.title}</h4>
                    <p className="mt-1 line-clamp-2 text-xs text-elwafa-text-muted">{art.summary}</p>
                    <p className="mt-2 text-xs text-elwafa-text-muted">{art.category} · {art.date}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <button onClick={() => updateArticle(art.id, { status: art.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED' })} className="rounded-lg border border-elwafa-surface-border bg-white px-3 py-2 text-xs font-semibold">{art.status === 'PUBLISHED' ? 'Terbit · jadikan draf' : 'Draf · terbitkan'}</button>
                      <button onClick={() => setSelectedArticle(art)} className="rounded-lg border border-elwafa-surface-border bg-white px-3 py-2 text-xs">Pratinjau</button>
                      <button onClick={() => handleEditArticle(art)} className="rounded-lg border border-elwafa-surface-border bg-white px-3 py-2 text-xs">Edit</button>
                      <button onClick={() => { if (confirm(`Hapus artikel "${art.title}"?`)) deleteArticle(art.id); }} className="rounded-lg border border-red-200 bg-white px-3 py-2 text-xs text-red-700">Hapus</button>
                    </div>
                  </article>
                ))}
              </div>
              {/* Desktop article table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-elwafa-surface-subtle text-elwafa-ocean uppercase tracking-wider font-bold border-b border-elwafa-surface-border">
                    <tr>
                      <th className="py-3.5 px-4">Artikel / Berita</th>
                      <th className="py-3.5 px-4">Kategori</th>
                      <th className="py-3.5 px-4">Penulis &amp; Tanggal</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-elwafa-surface-border">
                    {articles.map((art) => (
                      <tr key={art.id} className="hover:bg-elwafa-surface/60 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-elwafa-ocean text-sm line-clamp-1">{art.title}</div>
                          <span className="text-[11px] text-elwafa-text-muted line-clamp-1">{art.summary}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-elwafa-ocean/10 text-elwafa-ocean">
                            {art.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-medium text-elwafa-ocean">{art.author}</div>
                          <span className="text-[11px] text-elwafa-text-muted">{art.date} • {art.readTime}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => {
                              const newStatus = art.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
                              updateArticle(art.id, { status: newStatus });
                            }}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                              art.status === 'PUBLISHED'
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                            title="Klik untuk ubah status"
                          >
                            {art.status}
                          </button>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedArticle(art)}
                              className="p-1.5 rounded-lg bg-elwafa-surface border border-elwafa-surface-border text-elwafa-ocean hover:bg-elwafa-teal hover:text-white transition-colors"
                              title="Pratinjau Artikel"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleEditArticle(art)}
                              className="p-1.5 rounded-lg bg-elwafa-surface border border-elwafa-surface-border text-elwafa-ocean hover:bg-elwafa-surface-subtle transition-colors"
                              title="Edit Artikel"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Hapus artikel "${art.title}"?`)) {
                                  deleteArticle(art.id);
                                }
                              }}
                              className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                              title="Hapus"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inbox' && <RouteErrorBoundary routeKey="inbox"><ServerInbox /></RouteErrorBoundary>}

        {/* TAB 4: KALENDER & AGENDA SELEKSI MAHASISWA */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-elwafa-surface-border shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elwafa-teal/10 text-elwafa-teal text-xs font-bold uppercase tracking-wider mb-2">
                  <CalendarDays className="w-3.5 h-3.5" />
                  <span>Agenda &amp; Jadwal Seleksi Akademik</span>
                </div>
                <h2 className="text-xl font-black text-elwafa-ocean">
                  Kalender Seleksi &amp; Kegiatan Santri
                </h2>
                <p className="text-xs text-elwafa-text-muted mt-1">
                  Atur tanggal penting seleksi Diktis Kemenag, ujian Hadatsah Mu'adalah, karantina, dan pelepasan kloter santri ke Kairo.
                </p>
              </div>

              <button
                onClick={() => setIsCalendarModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-elwafa-teal hover:bg-elwafa-teal-dark text-white text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Jadwal Seleksi Baru</span>
              </button>
            </div>

            {/* Calendar Events List Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {calendarEvents.map((evt) => {
                const categoryColors: Record<string, string> = {
                  SELEKSI: 'bg-red-50 text-red-700 border-red-200',
                  TRYOUT: 'bg-amber-50 text-amber-700 border-amber-200',
                  ADMINISTRASI: 'bg-blue-50 text-blue-700 border-blue-200',
                  DAUROH: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                  KEBERANGKATAN: 'bg-purple-50 text-purple-700 border-purple-200',
                };
                return (
                  <div key={evt.id} className="bg-white rounded-3xl p-6 border border-elwafa-surface-border shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${categoryColors[evt.category] || 'bg-gray-100 text-gray-700'}`}>
                          {evt.category}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          evt.status === 'ONGOING' 
                            ? 'bg-emerald-500 text-white animate-pulse' 
                            : evt.status === 'COMPLETED' 
                              ? 'bg-gray-200 text-gray-700' 
                              : 'bg-elwafa-surface text-elwafa-teal'
                        }`}>
                          {evt.status === 'ONGOING' ? 'HARI INI BERLANGSUNG' : evt.status}
                        </span>
                      </div>

                      <h3 className="text-sm font-extrabold text-elwafa-ocean mb-2 leading-snug">
                        {evt.title}
                      </h3>

                      <p className="text-xs text-elwafa-text-muted leading-relaxed mb-4">
                        {evt.description}
                      </p>

                      <div className="space-y-2 text-xs text-elwafa-text-main border-t border-elwafa-surface-border pt-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-elwafa-teal shrink-0" />
                          <span className="font-semibold">{evt.date}</span>
                          {evt.time && <span className="text-elwafa-text-muted">• {evt.time}</span>}
                        </div>
                        {evt.location && (
                          <div className="flex items-center gap-2 text-elwafa-text-muted">
                            <MapPin className="w-3.5 h-3.5 text-elwafa-gold shrink-0" />
                            <span className="line-clamp-1">{evt.location}</span>
                          </div>
                        )}
                        {evt.quotaTarget && (
                          <div className="flex items-center gap-2 text-elwafa-text-muted">
                            <Users className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                            <span>Target Kuota: <strong>{evt.quotaTarget} Peserta</strong></span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-elwafa-surface-border mt-4 flex items-center justify-between">
                      <span className="text-[10px] text-elwafa-text-muted font-mono">{evt.id}</span>
                      <button
                        onClick={() => {
                          if (confirm(`Hapus agenda seleksi "${evt.title}"?`)) {
                            deleteCalendarEvent(evt.id);
                          }
                        }}
                        className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                        title="Hapus Jadwal"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: STATISTIK & ANALITIK KUOTA PROGRAM */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-elwafa-surface-border shadow-soft">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-elwafa-teal mb-2">
                <BarChart3 className="w-4 h-4" />
                <span>Monitoring Kapasitas Asrama &amp; Kuota</span>
              </div>
              <h2 className="text-xl font-black text-elwafa-ocean">
                Analitik Kuota &amp; Ketersediaan Program 2026/2027
              </h2>
              <p className="text-xs text-elwafa-text-muted mt-1">
                Pantau okupansi asrama Bogor, flat Kairo, dan rasio kelulusan seleksi berkas calon mahasiswa secara transparan.
              </p>
            </div>

            {/* Quota Progress Breakdown Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {programs.map((prog) => {
                const percent = Math.min(100, Math.round((prog.enrolledCount / (prog.quota || 1)) * 100));
                const sisa = Math.max(0, prog.quota - prog.enrolledCount);
                return (
                  <div key={prog.id} className="bg-white rounded-3xl p-6 border border-elwafa-surface-border shadow-soft flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-elwafa-teal/10 text-elwafa-teal uppercase">
                          {prog.category}
                        </span>
                        <span className="text-xs font-bold text-elwafa-ocean">
                          {percent}% Terisi
                        </span>
                      </div>

                      <h3 className="text-sm font-extrabold text-elwafa-ocean mb-1">
                        {prog.title}
                      </h3>
                      <p className="text-xs text-elwafa-text-muted mb-4">{prog.duration} • {prog.schedule}</p>

                      {/* Progress Bar */}
                      <div className="w-full h-3 bg-elwafa-surface rounded-full overflow-hidden mb-3">
                        <div 
                          className="h-full bg-gradient-to-r from-elwafa-teal to-elwafa-gold rounded-full transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-elwafa-text-main pt-2">
                        <div className="p-2.5 bg-elwafa-surface rounded-xl">
                          <span className="text-[10px] text-elwafa-text-muted block">Santri Terdaftar</span>
                          <strong className="text-sm text-elwafa-ocean">{prog.enrolledCount}</strong>
                        </div>
                        <div className="p-2.5 bg-elwafa-surface rounded-xl">
                          <span className="text-[10px] text-elwafa-text-muted block">Sisa Kursi</span>
                          <strong className="text-sm text-amber-600">{sisa} Kursi</strong>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-elwafa-surface-border mt-4 flex items-center justify-between text-xs">
                      <span className="text-elwafa-text-muted">Total Kuota: <strong>{prog.quota}</strong></span>
                      <button
                        onClick={() => {
                          const newQuota = prompt(`Ubah total kuota untuk "${prog.title}":`, String(prog.quota));
                          if (newQuota && !isNaN(Number(newQuota))) {
                            updateProgram(prog.id, { quota: Number(newQuota) });
                            showToast(`Kuota ${prog.title} berhasil diperbarui menjadi ${newQuota}!`, 'success');
                          }
                        }}
                        className="px-2.5 py-1 rounded-lg bg-elwafa-ocean text-white font-bold text-[11px] hover:bg-elwafa-ocean-light cursor-pointer"
                      >
                        Edit Kuota
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 6: PENGATURAN SISTEM & MASTER DATA */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-elwafa-surface-border shadow-soft max-w-4xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-elwafa-teal mb-2">
                <Settings className="w-4 h-4" />
                <span>Pengaturan &amp; Legalitas Lembaga</span>
              </div>
              <h2 className="text-xl font-black text-elwafa-ocean mb-1">
                Profil Lembaga Elwafa Center
              </h2>
              <p className="text-xs text-elwafa-text-muted mb-6">
                Data resmi yang digunakan dalam kuitansi pendaftaran, surat pengantar seleksi, dan sertifikat kelulusan daurah.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-elwafa-text-main mb-6">
                <div className="p-4 bg-elwafa-surface rounded-2xl border border-elwafa-surface-border">
                  <span className="text-elwafa-text-muted block mb-1">Nama Resmi Lembaga:</span>
                  <strong className="text-sm text-elwafa-ocean">Yayasan Elwafa Center Indonesia</strong>
                </div>
                <div className="p-4 bg-elwafa-surface rounded-2xl border border-elwafa-surface-border">
                  <span className="text-elwafa-text-muted block mb-1">Direktur &amp; Pengasuh:</span>
                  <strong className="text-sm text-elwafa-ocean">Ustadz Ihsan Efendi, Lc</strong>
                </div>
                <div className="p-4 bg-elwafa-surface rounded-2xl border border-elwafa-surface-border">
                  <span className="text-elwafa-text-muted block mb-1">Alamat Asrama Bogor:</span>
                  <strong>Perum Pondok Mutiara Blok D1/06 Sasakpanjang, Tajurhalang, Kab. Bogor</strong>
                </div>
                <div className="p-4 bg-elwafa-surface rounded-2xl border border-elwafa-surface-border">
                  <span className="text-elwafa-text-muted block mb-1">Kantor Cabang Kairo:</span>
                  <strong>Hayy Ats-Tsamien, Madinat Nasr, Kairo, Mesir</strong>
                </div>
              </div>

              <div className="p-5 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold mb-1">Integritas Data Sesuai Master Prompt</h4>
                  <p className="leading-relaxed text-amber-800">
                    Sistem Elwafa Center berpedoman pada bimbingan persiapan resmi tanpa klaim fiktif kelulusan 100% otomatis. Seluruh kelulusan seleksi S1 Al-Azhar ditetapkan oleh Kemenag RI dan Rektorat Universitas Al-Azhar Kairo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

          </motion.main>
        </div>
      </div>

      {/* VERIFICATION DETAIL DRAWER / MODAL */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-elwafa-surface-border overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-6 bg-elwafa-ocean-dark text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-elwafa-gold font-bold">
                  {selectedStudent.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">{selectedStudent.name}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-elwafa-teal/30 text-elwafa-teal-light text-[10px] font-mono font-bold">
                      {selectedStudent.id}
                    </span>
                  </div>
                  <p className="text-xs text-white/70">
                    Status Saat Ini: <strong className="text-elwafa-gold">{selectedStudent.status}</strong>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-elwafa-text-main flex-1">
              
              {/* Review History Banner if reviewed */}
              {selectedStudent.reviewedAt && (
                <div className="p-3 bg-elwafa-surface-subtle border border-elwafa-surface-border rounded-xl">
                  <span className="font-bold text-elwafa-ocean">Riwayat Review Terakhir:</span>
                  <div className="mt-1 text-elwafa-text-muted">
                    {selectedStudent.reviewedAt} oleh {selectedStudent.reviewedBy || 'Admin'}.
                    {selectedStudent.revisionNotes && (
                      <p className="mt-1 italic text-elwafa-ocean font-medium">"{selectedStudent.revisionNotes}"</p>
                    )}
                  </div>
                </div>
              )}

              {/* Biodata Summary Grid */}
              <div className="bg-elwafa-surface p-4 rounded-2xl border border-elwafa-surface-border">
                <h4 className="text-xs font-bold uppercase tracking-wider text-elwafa-ocean mb-3">
                  Data Lengkap Calon Mahasiswa
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div><span className="text-elwafa-text-muted block">WhatsApp:</span> <strong>{selectedStudent.whatsapp}</strong></div>
                  <div><span className="text-elwafa-text-muted block">TTL:</span> <strong>{selectedStudent.birthPlace}, {selectedStudent.birthDate}</strong></div>
                  <div><span className="text-elwafa-text-muted block">Jenis Kelamin:</span> <strong>{selectedStudent.gender === 'L' ? 'Laki-laki' : 'Perempuan'}</strong></div>
                  <div><span className="text-elwafa-text-muted block">Kota Asal:</span> <strong>{selectedStudent.originCity}</strong></div>
                  <div><span className="text-elwafa-text-muted block">Asal Sekolah:</span> <strong>{selectedStudent.schoolOrigin} ({selectedStudent.schoolType})</strong></div>
                  <div><span className="text-elwafa-text-muted block">Tahun Lulus:</span> <strong>{selectedStudent.graduationYear}</strong></div>
                  <div><span className="text-elwafa-text-muted block">Nama Wali:</span> <strong>{selectedStudent.parentName}</strong></div>
                  <div><span className="text-elwafa-text-muted block">Kontak Wali:</span> <strong>{selectedStudent.parentPhone}</strong></div>
                  <div><span className="text-elwafa-text-muted block">Program Studi:</span> <strong className="text-elwafa-teal">{selectedStudent.selectedProgramName}</strong></div>
                  <div><span className="text-elwafa-text-muted block">Hafalan Qur'an:</span> <strong>{selectedStudent.quranHafalanJuz || 'Belum diisi'} Juz</strong></div>
                </div>
              </div>

              {/* Uploaded Documents Preview */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-elwafa-ocean mb-3">
                  Dokumen Berkas Terunggah ({selectedStudent.documents.length})
                </h4>
                <div className="space-y-2">
                  {selectedStudent.documents.map((doc) => (
                    <div key={doc.id} className="p-3 bg-white border border-elwafa-surface-border rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <FileCheck className="w-4 h-4 text-elwafa-teal" />
                        <div>
                          <strong className="block text-elwafa-ocean">{doc.name}</strong>
                          <span className="text-[11px] text-elwafa-text-muted">{doc.fileName} • {doc.uploadDate}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-elwafa-surface text-elwafa-ocean">
                          {doc.status}
                        </span>
                        <button
                          onClick={() => showToast(`Membuka berkas demo: ${doc.fileName}`, 'info')}
                          className="px-2 py-1 rounded border border-elwafa-surface-border hover:bg-elwafa-surface text-[11px]"
                        >
                          Lihat File
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Form if admin clicked an action */}
              {decisionAction && (
                <div className="p-4 bg-elwafa-surface-subtle border-2 border-dashed border-elwafa-teal rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-elwafa-ocean">
                      {decisionAction === 'approve' && 'Konfirmasi: Setujui Pendaftaran (ACC)'}
                      {decisionAction === 'revision' && 'Konfirmasi: Minta Revisi Berkas'}
                      {decisionAction === 'reject' && 'Konfirmasi: Tolak Pendaftaran'}
                    </span>
                    <button
                      onClick={() => setDecisionAction(null)}
                      className="text-elwafa-text-muted hover:text-elwafa-text-main text-xs font-bold"
                    >
                      Batal Aksi
                    </button>
                  </div>

                  <p className="text-xs text-elwafa-text-muted">
                    {decisionAction === 'approve' && 'Santri akan menerima status Disetujui dan jadwal karantina di portal mahasiswa.'}
                    {decisionAction === 'revision' && 'Tuliskan catatan perbaikan spesifik agar santri mengetahui berkas mana yang harus diunggah ulang.'}
                    {decisionAction === 'reject' && 'Tuliskan alasan penolakan berkas.'}
                  </p>

                  <textarea
                    rows={3}
                    placeholder={
                      decisionAction === 'approve'
                        ? 'Catatan kelulusan (opsional)...'
                        : decisionAction === 'revision'
                        ? 'Contoh: Scan ijazah halaman legalisir cap basah buram, mohon upload ulang dengan resolusi lebih tinggi...'
                        : 'Alasan penolakan...'
                    }
                    value={decisionNotes}
                    onChange={(e) => setDecisionNotes(e.target.value)}
                    className="w-full p-3 bg-white border border-elwafa-surface-border rounded-xl text-xs focus:ring-2 focus:ring-elwafa-teal"
                  />

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setDecisionAction(null)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-elwafa-text-muted hover:bg-white"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleConfirmDecision}
                      className={`px-6 py-2 rounded-xl text-xs font-bold text-white shadow-md ${
                        decisionAction === 'approve'
                          ? 'bg-emerald-600 hover:bg-emerald-700'
                          : decisionAction === 'revision'
                          ? 'bg-amber-600 hover:bg-amber-700'
                          : 'bg-red-600 hover:bg-red-700'
                      }`}
                    >
                      Eksekusi Keputusan Verifikator
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer Decision Buttons */}
            {!decisionAction && (
              <div className="p-4 bg-elwafa-surface border-t border-elwafa-surface-border flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-elwafa-text-muted">
                  Tindakan Verifikator:
                </span>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setDecisionAction('reject');
                      setDecisionNotes('');
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-red-300 text-red-700 hover:bg-red-50 text-xs font-bold transition-colors"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Tolak</span>
                  </button>

                  <button
                    onClick={() => {
                      setDecisionAction('revision');
                      setDecisionNotes('Mohon upload ulang scan ijazah halaman legalisir cap basah yang lebih jelas dan terbaca.');
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors shadow-sm"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Minta Revisi Dokumen</span>
                  </button>

                  <button
                    onClick={() => {
                      setDecisionAction('approve');
                      setDecisionNotes('Berkas pendaftaran telah diverifikasi lengkap dan memenuhi kriteria akademik.');
                    }}
                    className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-md"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Setujui (ACC Pendaftaran)</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ARTICLE CREATE / EDIT MODAL */}
      {isArticleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-elwafa-surface-border overflow-hidden">
            <div className="p-5 bg-elwafa-ocean-dark text-white flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-bold">
                {editingArticleId ? 'Edit Berita / Artikel' : 'Tulis Berita / Artikel Baru'}
              </h3>
              <button
                onClick={() => setIsArticleModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="p-6 overflow-y-auto space-y-4 text-xs flex-1">
              <div>
                <label className="font-bold text-elwafa-ocean block mb-1">Judul Berita</label>
                <input
                  type="text"
                  required
                  value={articleForm.title}
                  onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                  placeholder="Misal: Pelepasan 50 Santri Elwafa Center ke Universitas Al-Azhar Kairo..."
                  className="w-full p-2.5 bg-elwafa-surface border border-elwafa-surface-border rounded-xl focus:ring-2 focus:ring-elwafa-teal"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-elwafa-ocean block mb-1">Kategori</label>
                  <select
                    value={articleForm.category}
                    onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value as any })}
                    className="w-full p-2.5 bg-elwafa-surface border border-elwafa-surface-border rounded-xl focus:ring-2 focus:ring-elwafa-teal"
                  >
                    <option value="TERKINI">TERKINI</option>
                    <option value="SEPUTAR AL-AZHAR">SEPUTAR AL-AZHAR</option>
                    <option value="REKOMENDASI">REKOMENDASI</option>
                    <option value="KEGIATAN">KEGIATAN</option>
                    <option value="PENDIDIKAN">PENDIDIKAN</option>
                    <option value="Akademik">Akademik &amp; Seleksi</option>
                    <option value="Pengumuman">Pengumuman</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-elwafa-ocean block mb-1">Status Publikasi</label>
                  <select
                    value={articleForm.status}
                    onChange={(e) => setArticleForm({ ...articleForm, status: e.target.value as any })}
                    className="w-full p-2.5 bg-elwafa-surface border border-elwafa-surface-border rounded-xl focus:ring-2 focus:ring-elwafa-teal"
                  >
                    <option value="PUBLISHED">PUBLISHED (Tampil di Website)</option>
                    <option value="DRAFT">DRAFT (Disimpan Internal)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-elwafa-ocean block mb-1">Penulis / Redaksi</label>
                  <input
                    type="text"
                    value={articleForm.author}
                    onChange={(e) => setArticleForm({ ...articleForm, author: e.target.value })}
                    className="w-full p-2.5 bg-elwafa-surface border border-elwafa-surface-border rounded-xl focus:ring-2 focus:ring-elwafa-teal"
                  />
                </div>

                <div>
                  <label className="font-bold text-elwafa-ocean block mb-1">Foto Sampul (Asset Path)</label>
                  <select
                    value={articleForm.image}
                    onChange={(e) => setArticleForm({ ...articleForm, image: e.target.value })}
                    className="w-full p-2.5 bg-elwafa-surface border border-elwafa-surface-border rounded-xl focus:ring-2 focus:ring-elwafa-teal font-mono text-[11px]"
                  >
                    <option value="/assets/gallery/1.jpeg">/assets/gallery/1.jpeg (Alexandria)</option>
                    <option value="/assets/gallery/2.jpeg">/assets/gallery/2.jpeg (Montaza)</option>
                    <option value="/assets/gallery/5.jpeg">/assets/gallery/5.jpeg (Ziarah Mamluk)</option>
                    <option value="/assets/gallery/14.jpeg">/assets/gallery/14.jpeg (Study Hall)</option>
                    <option value="/assets/8.jpeg">/assets/8.jpeg (Mahasiswa Al-Azhar)</option>
                    <option value="/assets/tentang-elwafa.jpeg">/assets/tentang-elwafa.jpeg (Monumen Kairo)</option>
                    <option value="/assets/gallery/9.jpeg">/assets/gallery/9.jpeg (Talaqqi Kairo)</option>
                    <option value="/assets/before footer.jpeg">/assets/before footer.jpeg (Al-Azhar Wafidin)</option>
                    <option value="/assets/articles/pexels-iramezatil-739231740-20682503-scaled.jpg">/assets/articles/... (Masjid Al-Azhar)</option>
                    <option value="/assets/articles/DSC03995-scaled.jpg">/assets/articles/... (CBT Hall Al-Azhar)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-elwafa-ocean block mb-1">Ringkasan Singkat (Summary)</label>
                <textarea
                  rows={2}
                  value={articleForm.summary}
                  onChange={(e) => setArticleForm({ ...articleForm, summary: e.target.value })}
                  placeholder="Kutipan 1-2 kalimat untuk preview di kartu..."
                  className="w-full p-2.5 bg-elwafa-surface border border-elwafa-surface-border rounded-xl focus:ring-2 focus:ring-elwafa-teal"
                />
              </div>

              <div>
                <label className="font-bold text-elwafa-ocean block mb-1">Isi Berita Lengkap</label>
                <textarea
                  rows={6}
                  required
                  value={articleForm.content}
                  onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                  placeholder="Tuliskan berita lengkap di sini..."
                  className="w-full p-2.5 bg-elwafa-surface border border-elwafa-surface-border rounded-xl focus:ring-2 focus:ring-elwafa-teal"
                />
              </div>

              <div className="pt-4 border-t border-elwafa-surface-border flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsArticleModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-elwafa-surface text-elwafa-ocean font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-elwafa-teal hover:bg-elwafa-teal-dark text-white font-bold shadow-md"
                >
                  Simpan Berita
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PROGRAM CREATE / EDIT MODAL */}
      {isProgramModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-elwafa-surface-border overflow-hidden">
            <div className="p-5 bg-elwafa-ocean-dark text-white flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-bold">
                {editingProgramId ? 'Edit Program' : 'Tambah Program Studi Baru'}
              </h3>
              <button
                onClick={() => setIsProgramModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProgram} className="p-6 overflow-y-auto space-y-4 text-xs flex-1">
              <div>
                <label className="font-bold text-elwafa-ocean block mb-1">Nama Program</label>
                <input
                  type="text"
                  required
                  value={programForm.title}
                  onChange={(e) => setProgramForm({ ...programForm, title: e.target.value })}
                  placeholder="Misal: Persiapan Kuliah S1 Turki & Yaman..."
                  className="w-full p-2.5 bg-elwafa-surface border border-elwafa-surface-border rounded-xl focus:ring-2 focus:ring-elwafa-teal"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-elwafa-ocean block mb-1">Kategori Program</label>
                  <input
                    type="text"
                    value={programForm.category}
                    onChange={(e) => setProgramForm({ ...programForm, category: e.target.value })}
                    className="w-full p-2.5 bg-elwafa-surface border border-elwafa-surface-border rounded-xl focus:ring-2 focus:ring-elwafa-teal"
                  />
                </div>

                <div>
                  <label className="font-bold text-elwafa-ocean block mb-1">Kapasitas Kuota Santri</label>
                  <input
                    type="number"
                    min="1"
                    value={programForm.quota}
                    onChange={(e) => setProgramForm({ ...programForm, quota: Number(e.target.value) })}
                    className="w-full p-2.5 bg-elwafa-surface border border-elwafa-surface-border rounded-xl focus:ring-2 focus:ring-elwafa-teal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-elwafa-ocean block mb-1">Durasi</label>
                  <input
                    type="text"
                    value={programForm.duration}
                    onChange={(e) => setProgramForm({ ...programForm, duration: e.target.value })}
                    className="w-full p-2.5 bg-elwafa-surface border border-elwafa-surface-border rounded-xl focus:ring-2 focus:ring-elwafa-teal"
                  />
                </div>

                <div>
                  <label className="font-bold text-elwafa-ocean block mb-1">Jadwal Pelaksanaan</label>
                  <input
                    type="text"
                    value={programForm.schedule}
                    onChange={(e) => setProgramForm({ ...programForm, schedule: e.target.value })}
                    className="w-full p-2.5 bg-elwafa-surface border border-elwafa-surface-border rounded-xl focus:ring-2 focus:ring-elwafa-teal"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-elwafa-ocean block mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={programForm.description}
                  onChange={(e) => setProgramForm({ ...programForm, description: e.target.value })}
                  className="w-full p-2.5 bg-elwafa-surface border border-elwafa-surface-border rounded-xl focus:ring-2 focus:ring-elwafa-teal"
                />
              </div>

              <div>
                <label className="font-bold text-elwafa-ocean block mb-1">Poin Keunggulan (1 baris per poin)</label>
                <textarea
                  rows={4}
                  value={programForm.highlightsText}
                  onChange={(e) => setProgramForm({ ...programForm, highlightsText: e.target.value })}
                  placeholder="Karantina Bahasa Arab\nBimbingan Kitab Turats\nLegalitas Resmi"
                  className="w-full p-2.5 bg-elwafa-surface border border-elwafa-surface-border rounded-xl focus:ring-2 focus:ring-elwafa-teal font-mono text-[11px]"
                />
              </div>

              <div className="pt-4 border-t border-elwafa-surface-border flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsProgramModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-elwafa-surface text-elwafa-ocean font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-elwafa-teal hover:bg-elwafa-teal-dark text-white font-bold shadow-md"
                >
                  Simpan Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CALENDAR EVENT MODAL (TAMBAH AGENDA SELEKSI / HARI INI SELEKSI) */}
      {isCalendarModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-elwafa-surface-border overflow-hidden">
            <div className="p-6 bg-elwafa-ocean-dark text-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Tambah Agenda Seleksi Baru</h3>
                <p className="text-xs text-white/70">Jadwalkan agenda ujian, CBT, karantina, atau keberangkatan</p>
              </div>
              <button
                onClick={() => setIsCalendarModalOpen(false)}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/80"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCalendarEvent} className="p-6 space-y-4 text-xs">
              <div>
                <label className="font-bold text-elwafa-ocean block mb-1">
                  Nama Agenda / Kegiatan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Seleksi CBT Tahfidz & Bahasa Kemenag (Diktis)"
                  value={calendarForm.title}
                  onChange={(e) => setCalendarForm({ ...calendarForm, title: e.target.value })}
                  className="w-full p-2.5 bg-elwafa-surface border border-elwafa-surface-border rounded-xl focus:ring-2 focus:ring-elwafa-teal"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-elwafa-ocean block mb-1">Kategori Agenda</label>
                  <select
                    value={calendarForm.category}
                    onChange={(e) => setCalendarForm({ ...calendarForm, category: e.target.value as any })}
                    className="w-full p-2.5 bg-elwafa-surface border border-elwafa-surface-border rounded-xl focus:ring-2 focus:ring-elwafa-teal"
                  >
                    <option value="SELEKSI">SELEKSI (CBT &amp; Lisan)</option>
                    <option value="TRYOUT">TRYOUT Akbar</option>
                    <option value="ADMINISTRASI">ADMINISTRASI &amp; Berkas</option>
                    <option value="DAUROH">DAUROH &amp; Karantina</option>
                    <option value="KEBERANGKATAN">KEBERANGKATAN (Kairo)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-elwafa-ocean block mb-1">Status Kegiatan</label>
                  <select
                    value={calendarForm.status}
                    onChange={(e) => setCalendarForm({ ...calendarForm, status: e.target.value as any })}
                    className="w-full p-2.5 bg-elwafa-surface border border-elwafa-surface-border rounded-xl focus:ring-2 focus:ring-elwafa-teal"
                  >
                    <option value="UPCOMING">UPCOMING (Mendatang)</option>
                    <option value="ONGOING">ONGOING (Hari Ini Berlangsung)</option>
                    <option value="COMPLETED">COMPLETED (Selesai)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-elwafa-ocean block mb-1">Tanggal Pelaksanaan</label>
                  <input
                    type="date"
                    value={calendarForm.date}
                    onChange={(e) => setCalendarForm({ ...calendarForm, date: e.target.value })}
                    className="w-full p-2.5 bg-elwafa-surface border border-elwafa-surface-border rounded-xl focus:ring-2 focus:ring-elwafa-teal"
                  />
                </div>

                <div>
                  <label className="font-bold text-elwafa-ocean block mb-1">Waktu Pelaksanaan</label>
                  <input
                    type="text"
                    placeholder="08:30 - 15:00 WIB"
                    value={calendarForm.time}
                    onChange={(e) => setCalendarForm({ ...calendarForm, time: e.target.value })}
                    className="w-full p-2.5 bg-elwafa-surface border border-elwafa-surface-border rounded-xl focus:ring-2 focus:ring-elwafa-teal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-elwafa-ocean block mb-1">Lokasi Kegiatan</label>
                  <input
                    type="text"
                    placeholder="Contoh: Asrama Elwafa Bogor"
                    value={calendarForm.location}
                    onChange={(e) => setCalendarForm({ ...calendarForm, location: e.target.value })}
                    className="w-full p-2.5 bg-elwafa-surface border border-elwafa-surface-border rounded-xl focus:ring-2 focus:ring-elwafa-teal"
                  />
                </div>

                <div>
                  <label className="font-bold text-elwafa-ocean block mb-1">Target Kuota Peserta</label>
                  <input
                    type="number"
                    value={calendarForm.quotaTarget}
                    onChange={(e) => setCalendarForm({ ...calendarForm, quotaTarget: Number(e.target.value) })}
                    className="w-full p-2.5 bg-elwafa-surface border border-elwafa-surface-border rounded-xl focus:ring-2 focus:ring-elwafa-teal"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-elwafa-ocean block mb-1">Deskripsi &amp; Instruksi</label>
                <textarea
                  rows={3}
                  placeholder="Keterangan materi ujian, perlengkapan yang wajib dibawa santri, dsb..."
                  value={calendarForm.description}
                  onChange={(e) => setCalendarForm({ ...calendarForm, description: e.target.value })}
                  className="w-full p-2.5 bg-elwafa-surface border border-elwafa-surface-border rounded-xl focus:ring-2 focus:ring-elwafa-teal"
                />
              </div>

              <div className="pt-4 border-t border-elwafa-surface-border flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCalendarModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-elwafa-surface text-elwafa-ocean font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-elwafa-teal hover:bg-elwafa-teal-dark text-white font-bold shadow-md"
                >
                  Jadwalkan Agenda
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
