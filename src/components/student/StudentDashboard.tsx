import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ApplicationStatus } from '../../types';
import { 
  User, 
  FileText, 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Bell, 
  Upload, 
  Calendar, 
  ChevronRight, 
  ArrowLeft,
  Sparkles,
  Download,
  AlertTriangle,
  GraduationCap
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { activeStudent, updateBiodata, applyProgram, programs, announcements, setRole, showToast } = useApp();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'biodata' | 'programs' | 'documents' | 'announcements'>('overview');

  // Biodata Form State
  const [formData, setFormData] = useState({
    name: activeStudent.name || '',
    whatsapp: activeStudent.whatsapp || '',
    gender: activeStudent.gender || 'L',
    birthPlace: activeStudent.birthPlace || '',
    birthDate: activeStudent.birthDate || '',
    originCity: activeStudent.originCity || '',
    address: activeStudent.address || '',
    schoolOrigin: activeStudent.schoolOrigin || '',
    schoolType: activeStudent.schoolType || 'MA',
    graduationYear: activeStudent.graduationYear || '2025',
    parentName: activeStudent.parentName || '',
    parentPhone: activeStudent.parentPhone || '',
    parentOccupation: activeStudent.parentOccupation || '',
  });

  const [formStep, setFormStep] = useState<number>(1);

  // Sync form when activeStudent changes
  React.useEffect(() => {
    setFormData({
      name: activeStudent.name || '',
      whatsapp: activeStudent.whatsapp || '',
      gender: activeStudent.gender || 'L',
      birthPlace: activeStudent.birthPlace || '',
      birthDate: activeStudent.birthDate || '',
      originCity: activeStudent.originCity || '',
      address: activeStudent.address || '',
      schoolOrigin: activeStudent.schoolOrigin || '',
      schoolType: activeStudent.schoolType || 'MA',
      graduationYear: activeStudent.graduationYear || '2025',
      parentName: activeStudent.parentName || '',
      parentPhone: activeStudent.parentPhone || '',
      parentOccupation: activeStudent.parentOccupation || '',
    });
  }, [activeStudent.id]);

  const handleSaveBiodata = (e: React.FormEvent) => {
    e.preventDefault();
    updateBiodata(activeStudent.id, formData);
    setActiveTab('overview');
  };

  const statusConfig = {
    DRAFT: {
      label: 'Draft Formulir',
      bg: 'bg-gray-100 text-gray-700 border-gray-300',
      icon: <Clock className="w-5 h-5 text-gray-500" />,
      desc: 'Formulir biodata belum lengkap diserahkan. Silakan lengkapi data Anda.'
    },
    PENDING: {
      label: 'Menunggu Verifikasi',
      bg: 'bg-blue-50 text-blue-800 border-blue-200',
      icon: <Clock className="w-5 h-5 text-blue-600 animate-spin" />,
      desc: 'Berkas dan biodata Anda sedang dalam antrean verifikasi oleh Tim Administrasi Elwafa Center.'
    },
    REVISION_REQUIRED: {
      label: 'Perlu Revisi Dokumen',
      bg: 'bg-amber-50 text-amber-900 border-amber-300',
      icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
      desc: 'Terdapat catatan perbaikan dari verifikator. Mohon perbaiki data/dokumen Anda.'
    },
    APPROVED: {
      label: 'Pendaftaran Disetujui (ACC)',
      bg: 'bg-emerald-50 text-emerald-900 border-emerald-300',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
      desc: 'Alhamdulillah! Berkas pendaftaran Anda telah disetujui resmi. Selamat bergabung dalam program bimbingan.'
    },
    REJECTED: {
      label: 'Pendaftaran Tidak Diterima',
      bg: 'bg-red-50 text-red-900 border-red-200',
      icon: <XCircle className="w-5 h-5 text-red-600" />,
      desc: 'Mohon maaf, berkas pendaftaran belum memenuhi kualifikasi seleksi tahun ini.'
    }
  };

  const currentStatus = statusConfig[activeStudent.status] || statusConfig.PENDING;

  return (
    <div className="min-h-screen bg-elwafa-surface pb-28">
      {/* Top Portal Header */}
      <div className="bg-elwafa-ocean-dark text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setRole('visitor')}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
              title="Kembali ke Beranda Publik"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center overflow-hidden shrink-0">
              {activeStudent.avatar ? (
                <img src={activeStudent.avatar} alt={activeStudent.name} className="w-full h-full object-cover" />
              ) : (
                <User className="w-6 h-6 text-elwafa-teal-light" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white tracking-tight">{activeStudent.name}</h1>
                <span className="px-2 py-0.5 rounded-full bg-elwafa-teal/30 text-elwafa-teal-light text-[10px] font-mono font-bold">
                  {activeStudent.id}
                </span>
              </div>
              <p className="text-xs text-white/70">
                Peminatan: <span className="text-elwafa-gold font-medium">{activeStudent.selectedProgramName}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-white/60 hidden md:inline">Status Pendaftaran:</span>
            <div className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-2 ${currentStatus.bg}`}>
              {currentStatus.icon}
              <span>{currentStatus.label}</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto gap-2 border-t border-white/10 pt-2 pb-0">
          {[
            { id: 'overview', label: 'Ringkasan & Tracker', icon: <User className="w-4 h-4" /> },
            { id: 'biodata', label: 'Biodata Santri', icon: <FileText className="w-4 h-4" /> },
            { id: 'programs', label: 'Program Peminatan', icon: <BookOpen className="w-4 h-4" /> },
            { id: 'documents', label: 'Dokumen Berkas', icon: <Upload className="w-4 h-4" /> },
            { id: 'announcements', label: 'Pengumuman Resmi', icon: <Bell className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'border-elwafa-teal text-elwafa-teal-light bg-white/5'
                  : 'border-transparent text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        {/* Status Alert Banner */}
        <div className={`rounded-2xl p-5 mb-8 border shadow-soft ${currentStatus.bg}`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">{currentStatus.icon}</div>
              <div>
                <h3 className="text-sm sm:text-base font-bold">{currentStatus.label}</h3>
                <p className="text-xs sm:text-sm mt-0.5 opacity-90">{currentStatus.desc}</p>
                {activeStudent.reviewedAt && (
                  <p className="text-[11px] mt-1 opacity-75">
                    Ditinjau pada: {activeStudent.reviewedAt} oleh {activeStudent.reviewedBy || 'Admin'}
                  </p>
                )}
              </div>
            </div>

            {activeStudent.status === 'REVISION_REQUIRED' && (
              <button
                onClick={() => setActiveTab('biodata')}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm transition-all shrink-0"
              >
                Perbaiki Biodata Sekarang
              </button>
            )}

            {activeStudent.status === 'APPROVED' && (
              <button
                onClick={() => showToast('Mengunduh Surat Tanda Penerimaan & Jadwal Karantina PDF...', 'success')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Bukti Kelulusan</span>
              </button>
            )}
          </div>

          {/* Admin Note / Revision Reason if exists */}
          {activeStudent.revisionNotes && (
            <div className="mt-4 pt-3 border-t border-black/10 text-xs">
              <span className="font-bold">Catatan Verifikator:</span>
              <p className="mt-1 p-3 bg-white/70 rounded-xl italic">"{activeStudent.revisionNotes}"</p>
            </div>
          )}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-elwafa-surface-border shadow-soft">
                <span className="text-xs font-semibold text-elwafa-text-muted">Kelengkapan Biodata</span>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-2xl font-bold text-elwafa-ocean">
                    {activeStudent.biodataCompleted ? '100%' : '65%'}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${activeStudent.biodataCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                    {activeStudent.biodataCompleted ? 'Lengkap' : 'Belum Lengkap'}
                  </span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-elwafa-surface-border shadow-soft">
                <span className="text-xs font-semibold text-elwafa-text-muted">Dokumen Terunggah</span>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-2xl font-bold text-elwafa-ocean">
                    {activeStudent.documents.length} Berkas
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                    Terverifikasi: {activeStudent.documents.filter(d => d.status === 'verified').length}
                  </span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-elwafa-surface-border shadow-soft">
                <span className="text-xs font-semibold text-elwafa-text-muted">Jadwal Simulasi Tes</span>
                <div className="mt-2">
                  <span className="text-base font-bold text-elwafa-ocean block">24 Oktober 2026</span>
                  <span className="text-[11px] text-elwafa-teal">Gladi Resik Muqabalah</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-elwafa-surface-border shadow-soft">
                <span className="text-xs font-semibold text-elwafa-text-muted">Helpdesk Santri</span>
                <div className="mt-2">
                  <a
                    href="https://wa.me/6285188445164"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-elwafa-teal hover:underline flex items-center gap-1"
                  >
                    +62 851-8844-5164
                  </a>
                  <span className="text-[11px] text-elwafa-text-muted">Siap Melayani 24 Jam</span>
                </div>
              </div>
            </div>

            {/* Student Journey Tracker */}
            <div className="bg-white rounded-2xl p-6 border border-elwafa-surface-border shadow-soft">
              <h3 className="text-base font-bold text-elwafa-ocean mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-elwafa-teal" />
                <span>Tahapan Perjalanan Seleksi Anda</span>
              </h3>
              <p className="text-xs text-elwafa-text-muted mb-6">
                Pantau proses administrasi mulai dari berkas pendaftaran hingga keberangkatan ke Kairo.
              </p>

              <div className="relative">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {[
                    { step: '1', title: 'Pendaftaran Akun', desc: 'Selesai dibuat', done: true },
                    { step: '2', title: 'Biodata & Dokumen', desc: activeStudent.biodataCompleted ? 'Lengkap diserahkan' : 'Dalam pengisian', done: activeStudent.biodataCompleted },
                    { step: '3', title: 'Verifikasi Admin', desc: activeStudent.status === 'APPROVED' ? 'Disetujui (ACC)' : activeStudent.status === 'REVISION_REQUIRED' ? 'Perlu Revisi' : 'Sedang Ditinjau', done: activeStudent.status === 'APPROVED', current: activeStudent.status === 'PENDING' || activeStudent.status === 'REVISION_REQUIRED' },
                    { step: '4', title: 'Karantina Bahasa', desc: 'Asrama persiapan', done: false },
                    { step: '5', title: 'Keberangkatan Kairo', desc: 'Visa & Penjemputan', done: false }
                  ].map((s, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border text-xs transition-all ${
                        s.done
                          ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900'
                          : s.current
                          ? 'bg-blue-50 border-blue-300 text-blue-900 ring-2 ring-blue-200'
                          : 'bg-elwafa-surface border-elwafa-surface-border text-elwafa-text-muted'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${
                          s.done ? 'bg-emerald-600 text-white' : s.current ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {s.done ? '✓' : s.step}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider">
                          {s.done ? 'Selesai' : s.current ? 'Proses' : 'Menunggu'}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs text-elwafa-ocean">{s.title}</h4>
                      <p className="text-[11px] text-elwafa-text-muted mt-1">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Profile Snapshot & Chosen Program Detail */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left 2 cols: Student Biodata Quick View */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-elwafa-surface-border shadow-soft">
                <div className="flex items-center justify-between pb-4 border-b border-elwafa-surface-border mb-4">
                  <h3 className="text-sm font-bold text-elwafa-ocean flex items-center gap-2">
                    <User className="w-4 h-4 text-elwafa-teal" />
                    <span>Data Pribadi Calon Mahasiswa</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('biodata')}
                    className="text-xs font-bold text-elwafa-teal hover:underline"
                  >
                    Edit Biodata
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-elwafa-text-muted block">Nama Lengkap</span>
                    <span className="font-semibold text-elwafa-ocean text-sm">{activeStudent.name}</span>
                  </div>
                  <div>
                    <span className="text-elwafa-text-muted block">Nomor WhatsApp</span>
                    <span className="font-semibold text-elwafa-ocean text-sm">{activeStudent.whatsapp}</span>
                  </div>
                  <div>
                    <span className="text-elwafa-text-muted block">Kota Asal</span>
                    <span className="font-semibold text-elwafa-ocean">{activeStudent.originCity || '-'}</span>
                  </div>
                  <div>
                    <span className="text-elwafa-text-muted block">Asal Sekolah / Pesantren</span>
                    <span className="font-semibold text-elwafa-ocean">{activeStudent.schoolOrigin || '-'} ({activeStudent.schoolType})</span>
                  </div>
                  <div>
                    <span className="text-elwafa-text-muted block">Nama Wali / Orang Tua</span>
                    <span className="font-semibold text-elwafa-ocean">{activeStudent.parentName || '-'}</span>
                  </div>
                  <div>
                    <span className="text-elwafa-text-muted block">Kontak Wali</span>
                    <span className="font-semibold text-elwafa-ocean">{activeStudent.parentPhone || '-'}</span>
                  </div>
                </div>
              </div>

              {/* Right 1 col: Selected Program Info */}
              <div className="bg-white rounded-2xl p-6 border border-elwafa-surface-border shadow-soft flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-elwafa-teal/10 text-elwafa-teal text-[11px] font-bold mb-3">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Program Dipilih</span>
                  </div>
                  <h4 className="text-base font-bold text-elwafa-ocean leading-snug">
                    {activeStudent.selectedProgramName}
                  </h4>
                  <p className="text-xs text-elwafa-text-muted mt-2">
                    Persiapan seleksi Diktis Kemenag & Pusiba, karantina intensif bahasa Arab fusha dan tahfidz.
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-elwafa-surface-border">
                  <button
                    onClick={() => setActiveTab('programs')}
                    className="w-full py-2.5 rounded-xl bg-elwafa-surface-subtle hover:bg-elwafa-surface text-elwafa-ocean text-xs font-bold transition-all border border-elwafa-surface-border"
                  >
                    Ganti Program Studi
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: BIODATA MULTI-STEP FORM */}
        {activeTab === 'biodata' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-elwafa-surface-border shadow-soft max-w-4xl mx-auto">
            <div className="pb-6 border-b border-elwafa-surface-border mb-6">
              <h3 className="text-lg font-bold text-elwafa-ocean">Formulir Kelengkapan Biodata Santri</h3>
              <p className="text-xs text-elwafa-text-muted mt-1">
                Isi data sebenar-benarnya untuk keperluan registrasi berkas di Kementerian Agama dan Universitas Al-Azhar Kairo.
              </p>

              {/* Stepper indicator */}
              <div className="flex items-center justify-between mt-6 max-w-md mx-auto">
                {[
                  { step: 1, label: 'Pribadi' },
                  { step: 2, label: 'Pendidikan' },
                  { step: 3, label: 'Orang Tua' },
                  { step: 4, label: 'Review' },
                ].map((s) => (
                  <div key={s.step} className="flex flex-col items-center">
                    <button
                      onClick={() => setFormStep(s.step)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        formStep === s.step
                          ? 'bg-elwafa-teal text-white shadow-sm'
                          : formStep > s.step
                          ? 'bg-emerald-600 text-white'
                          : 'bg-elwafa-surface text-elwafa-text-muted'
                      }`}
                    >
                      {formStep > s.step ? '✓' : s.step}
                    </button>
                    <span className="text-[11px] font-semibold text-elwafa-text-muted mt-1">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSaveBiodata} className="space-y-6">
              
              {/* STEP 1: PRIBADI */}
              {formStep === 1 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-elwafa-ocean">Langkah 1: Identitas Pribadi</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-elwafa-ocean mb-1">Nama Lengkap Sesuai Ijazah *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-elwafa-surface border border-elwafa-surface-border rounded-xl text-xs focus:ring-2 focus:ring-elwafa-teal"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-elwafa-ocean mb-1">Nomor WhatsApp Aktif *</label>
                      <input
                        type="text"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-elwafa-surface border border-elwafa-surface-border rounded-xl text-xs focus:ring-2 focus:ring-elwafa-teal"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-elwafa-ocean mb-1">Tempat Lahir *</label>
                      <input
                        type="text"
                        value={formData.birthPlace}
                        onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                        placeholder="Contoh: Cirebon"
                        className="w-full px-3.5 py-2.5 bg-elwafa-surface border border-elwafa-surface-border rounded-xl text-xs focus:ring-2 focus:ring-elwafa-teal"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-elwafa-ocean mb-1">Tanggal Lahir *</label>
                      <input
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-elwafa-surface border border-elwafa-surface-border rounded-xl text-xs focus:ring-2 focus:ring-elwafa-teal"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-elwafa-ocean mb-1">Jenis Kelamin *</label>
                      <select
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'L' | 'P' })}
                        className="w-full px-3.5 py-2.5 bg-elwafa-surface border border-elwafa-surface-border rounded-xl text-xs focus:ring-2 focus:ring-elwafa-teal"
                      >
                        <option value="L">Laki-laki (Ikhwan)</option>
                        <option value="P">Perempuan (Akhwat)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-elwafa-ocean mb-1">Kota & Provinsi Asal *</label>
                      <input
                        type="text"
                        value={formData.originCity}
                        onChange={(e) => setFormData({ ...formData, originCity: e.target.value })}
                        placeholder="Contoh: Cirebon, Jawa Barat"
                        className="w-full px-3.5 py-2.5 bg-elwafa-surface border border-elwafa-surface-border rounded-xl text-xs focus:ring-2 focus:ring-elwafa-teal"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-elwafa-ocean mb-1">Alamat Domisili Lengkap *</label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan"
                      rows={2}
                      className="w-full px-3.5 py-2 bg-elwafa-surface border border-elwafa-surface-border rounded-xl text-xs focus:ring-2 focus:ring-elwafa-teal"
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => setFormStep(2)}
                      className="px-6 py-2.5 rounded-xl bg-elwafa-teal hover:bg-elwafa-teal-dark text-white text-xs font-bold shadow-sm"
                    >
                      Lanjut: Riwayat Pendidikan →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: PENDIDIKAN */}
              {formStep === 2 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-elwafa-ocean">Langkah 2: Riwayat Pendidikan</h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-elwafa-ocean mb-1">Nama Asal Madrasah / Sekolah *</label>
                      <input
                        type="text"
                        value={formData.schoolOrigin}
                        onChange={(e) => setFormData({ ...formData, schoolOrigin: e.target.value })}
                        placeholder="Contoh: MAS Al-Hikmah / SMA Darul Hikam"
                        className="w-full px-3.5 py-2.5 bg-elwafa-surface border border-elwafa-surface-border rounded-xl text-xs focus:ring-2 focus:ring-elwafa-teal"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-elwafa-ocean mb-1">Jenis Institusi Asal *</label>
                      <select
                        value={formData.schoolType}
                        onChange={(e) => setFormData({ ...formData, schoolType: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 bg-elwafa-surface border border-elwafa-surface-border rounded-xl text-xs focus:ring-2 focus:ring-elwafa-teal"
                      >
                        <option value="MA">Madrasah Aliyah (MA)</option>
                        <option value="Pondok Pesantren">Pondok Pesantren Mu'adalah / Salaf</option>
                        <option value="SMA">SMA Umum</option>
                        <option value="Lainnya">Lainnya</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-elwafa-ocean mb-1">Tahun Kelulusan *</label>
                      <input
                        type="text"
                        value={formData.graduationYear}
                        onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                        placeholder="2025"
                        className="w-full px-3.5 py-2.5 bg-elwafa-surface border border-elwafa-surface-border rounded-xl text-xs focus:ring-2 focus:ring-elwafa-teal"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setFormStep(1)}
                      className="px-5 py-2.5 rounded-xl bg-elwafa-surface border border-elwafa-surface-border text-xs font-bold"
                    >
                      ← Kembali
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormStep(3)}
                      className="px-6 py-2.5 rounded-xl bg-elwafa-teal hover:bg-elwafa-teal-dark text-white text-xs font-bold shadow-sm"
                    >
                      Lanjut: Data Orang Tua →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: ORANG TUA */}
              {formStep === 3 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-elwafa-ocean">Langkah 3: Data Orang Tua / Wali</h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-elwafa-ocean mb-1">Nama Lengkap Orang Tua / Wali *</label>
                      <input
                        type="text"
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        placeholder="Nama Ayah / Ibu / Wali"
                        className="w-full px-3.5 py-2.5 bg-elwafa-surface border border-elwafa-surface-border rounded-xl text-xs focus:ring-2 focus:ring-elwafa-teal"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-elwafa-ocean mb-1">Nomor Telepon / WhatsApp Wali *</label>
                      <input
                        type="text"
                        value={formData.parentPhone}
                        onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                        placeholder="08123456789"
                        className="w-full px-3.5 py-2.5 bg-elwafa-surface border border-elwafa-surface-border rounded-xl text-xs focus:ring-2 focus:ring-elwafa-teal"
                        required
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-elwafa-ocean mb-1">Pekerjaan Orang Tua / Wali *</label>
                      <input
                        type="text"
                        value={formData.parentOccupation}
                        onChange={(e) => setFormData({ ...formData, parentOccupation: e.target.value })}
                        placeholder="Contoh: Wiraswasta / Tenaga Pengajar / PNS"
                        className="w-full px-3.5 py-2.5 bg-elwafa-surface border border-elwafa-surface-border rounded-xl text-xs focus:ring-2 focus:ring-elwafa-teal"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setFormStep(2)}
                      className="px-5 py-2.5 rounded-xl bg-elwafa-surface border border-elwafa-surface-border text-xs font-bold"
                    >
                      ← Kembali
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormStep(4)}
                      className="px-6 py-2.5 rounded-xl bg-elwafa-teal hover:bg-elwafa-teal-dark text-white text-xs font-bold shadow-sm"
                    >
                      Lanjut: Review & Simpan →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: REVIEW & SUBMIT */}
              {formStep === 4 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-elwafa-ocean">Langkah 4: Konfirmasi Biodata</h4>
                  <p className="text-xs text-elwafa-text-muted">
                    Pastikan seluruh data di bawah ini telah sesuai sebelum disimpan. Data yang disimpan akan langsung diteruskan ke sistem verifikasi admin.
                  </p>

                  <div className="bg-elwafa-surface p-4 rounded-xl border border-elwafa-surface-border grid grid-cols-2 gap-3 text-xs">
                    <div><span className="text-elwafa-text-muted">Nama:</span> <strong className="text-elwafa-ocean">{formData.name}</strong></div>
                    <div><span className="text-elwafa-text-muted">WhatsApp:</span> <strong className="text-elwafa-ocean">{formData.whatsapp}</strong></div>
                    <div><span className="text-elwafa-text-muted">TTL:</span> <strong className="text-elwafa-ocean">{formData.birthPlace}, {formData.birthDate}</strong></div>
                    <div><span className="text-elwafa-text-muted">Kota Asal:</span> <strong className="text-elwafa-ocean">{formData.originCity}</strong></div>
                    <div><span className="text-elwafa-text-muted">Sekolah:</span> <strong className="text-elwafa-ocean">{formData.schoolOrigin} ({formData.schoolType})</strong></div>
                    <div><span className="text-elwafa-text-muted">Tahun Lulus:</span> <strong className="text-elwafa-ocean">{formData.graduationYear}</strong></div>
                    <div><span className="text-elwafa-text-muted">Wali:</span> <strong className="text-elwafa-ocean">{formData.parentName}</strong></div>
                    <div><span className="text-elwafa-text-muted">Pekerjaan:</span> <strong className="text-elwafa-ocean">{formData.parentOccupation}</strong></div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setFormStep(3)}
                      className="px-5 py-2.5 rounded-xl bg-elwafa-surface border border-elwafa-surface-border text-xs font-bold"
                    >
                      ← Kembali
                    </button>
                    <button
                      type="submit"
                      className="px-7 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Simpan & Ajukan Verifikasi</span>
                    </button>
                  </div>
                </div>
              )}

            </form>
          </div>
        )}

        {/* TAB 3: PROGRAM ENROLLMENT */}
        {activeTab === 'programs' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-elwafa-ocean">Pilih Program Pembinaan Al-Azhar</h3>
                <p className="text-xs text-elwafa-text-muted">Anda dapat beralih ke program lain sebelum status pendaftaran dikunci oleh admin.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {programs.map((prog) => {
                const isSelected = activeStudent.selectedProgramId === prog.id;

                return (
                  <div
                    key={prog.id}
                    className={`rounded-2xl p-6 border transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-white border-elwafa-teal ring-2 ring-elwafa-teal/30 shadow-elevated'
                        : 'bg-white border-elwafa-surface-border shadow-soft'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-1 rounded-lg bg-elwafa-surface-subtle text-elwafa-ocean text-[11px] font-bold">
                          {prog.category}
                        </span>
                        {isSelected && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            Program Aktif Anda
                          </span>
                        )}
                      </div>

                      <h4 className="text-base font-bold text-elwafa-ocean mb-2">{prog.title}</h4>
                      <p className="text-xs text-elwafa-text-muted leading-relaxed mb-4">{prog.description}</p>

                      <div className="space-y-1.5 text-xs text-elwafa-text-main border-t border-elwafa-surface-border pt-3">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-elwafa-ocean mb-1">Syarat Masuk:</div>
                        {prog.requirements.map((req, idx) => (
                          <div key={idx} className="flex items-start gap-1.5">
                            <span className="text-elwafa-teal font-bold">•</span>
                            <span>{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 mt-4 border-t border-elwafa-surface-border">
                      <button
                        onClick={() => applyProgram(activeStudent.id, prog.id)}
                        disabled={isSelected}
                        className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                            : 'bg-elwafa-ocean hover:bg-elwafa-teal text-white shadow-sm'
                        }`}
                      >
                        {isSelected ? '✓ Sedang Dijalani' : 'Pilih & Ajukan Program Ini'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: DOCUMENTS */}
        {activeTab === 'documents' && (
          <div className="bg-white rounded-2xl p-6 border border-elwafa-surface-border shadow-soft space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-elwafa-ocean">Checklist Dokumen Pendaftaran</h3>
                <p className="text-xs text-elwafa-text-muted">Unggah berkas resmi dalam format PDF atau foto berkualitas tinggi.</p>
              </div>
              <button
                onClick={() => showToast('Simulasi unggah berkas baru: Dokumen berhasil ditambahkan.', 'success')}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-elwafa-teal hover:bg-elwafa-teal-dark text-white text-xs font-bold shadow-sm"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Dokumen Baru</span>
              </button>
            </div>

            <div className="divide-y divide-elwafa-surface-border border border-elwafa-surface-border rounded-xl overflow-hidden">
              {activeStudent.documents.map((doc) => (
                <div key={doc.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white hover:bg-elwafa-surface transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-elwafa-surface-subtle flex items-center justify-center text-elwafa-ocean shrink-0">
                      <FileText className="w-5 h-5 text-elwafa-teal" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-elwafa-ocean">{doc.name}</h4>
                      <span className="text-[11px] text-elwafa-text-muted">
                        {doc.fileName} • Diunggah {doc.uploadDate} ({doc.type})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      doc.status === 'verified'
                        ? 'bg-emerald-100 text-emerald-800'
                        : doc.status === 'revision'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {doc.status === 'verified' ? 'Terverifikasi ✓' : doc.status === 'revision' ? 'Perlu Revisi ⚠️' : 'Menunggu Review'}
                    </span>
                    <button
                      onClick={() => showToast(`Membuka berkas demo: ${doc.fileName}`, 'info')}
                      className="px-2.5 py-1 rounded-lg border border-elwafa-surface-border hover:bg-elwafa-surface-subtle text-xs text-elwafa-ocean"
                    >
                      Lihat File
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: ANNOUNCEMENTS */}
        {activeTab === 'announcements' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-elwafa-ocean">Pengumuman & Instruksi Resmi</h3>
            
            <div className="space-y-3">
              {announcements.map((ann) => (
                <div key={ann.id} className="bg-white p-5 rounded-2xl border border-elwafa-surface-border shadow-soft">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-elwafa-surface-subtle text-elwafa-ocean text-[11px] font-bold">
                      {ann.category}
                    </span>
                    <span className="text-[11px] text-elwafa-text-muted">{ann.date}</span>
                  </div>
                  <h4 className="text-sm font-bold text-elwafa-ocean mb-1">{ann.title}</h4>
                  <p className="text-xs text-elwafa-text-muted leading-relaxed">{ann.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
