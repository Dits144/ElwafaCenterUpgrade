import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { GraduationCap, ShieldCheck, ArrowRight, ArrowLeft, CheckCircle, UserPlus, LogIn, Lock, Mail, Phone, Sparkles, Key } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const {
    role,
    setRole,
    setCurrentPage,
    students,
    activeStudentId,
    setActiveStudentId,
    registerStudent,
    programs,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'student' | 'admin'>('student');
  const [studentMode, setStudentMode] = useState<'login' | 'register'>('login');

  // Student manual login form state
  const [studentIdentifier, setStudentIdentifier] = useState('EWF-2026-001');
  const [studentPassword, setStudentPassword] = useState('santri123');

  // Admin form state
  const [adminEmail, setAdminEmail] = useState('admin@elwafacenter.com');
  const [adminPassword, setAdminPassword] = useState('admin123');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regWhatsapp, setRegWhatsapp] = useState('');
  const [regProgramId, setRegProgramId] = useState(programs[0]?.id || 'prog-s1-azhar');
  const [regPassword, setRegPassword] = useState('');

  // Handle 1-click quick demo login for student
  const handleQuickStudentLogin = (studentId: string, studentName: string) => {
    setActiveStudentId(studentId);
    setRole('student');
    showToast(`Masuk sebagai ${studentName} (${studentId})`, 'success');
  };

  // Handle student manual login
  const handleStudentManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const query = studentIdentifier.trim().toLowerCase();
    const found = students.find(
      (s) => s.id.toLowerCase() === query || s.email.toLowerCase() === query
    );

    if (found) {
      setActiveStudentId(found.id);
      setRole('student');
      showToast(`Selamat datang kembali, ${found.name}!`, 'success');
    } else {
      // Fallback: login with first student or create
      if (students.length > 0) {
        setActiveStudentId(students[0].id);
        setRole('student');
        showToast(`Masuk sebagai ${students[0].name}`, 'info');
      } else {
        showToast('Akun tidak ditemukan. Silakan daftar atau gunakan tombol akun demo.', 'error');
      }
    }
  };

  // Handle Student Registration
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim() || !regWhatsapp.trim()) {
      showToast('Mohon lengkapi nama, email, dan WhatsApp!', 'warning');
      return;
    }

    try {
      const newId = registerStudent({
        name: regName.trim(),
        email: regEmail.trim(),
        whatsapp: regWhatsapp.trim(),
        selectedProgramId: regProgramId,
      });

      setActiveStudentId(newId);
      setRole('student');
      showToast(`Pendaftaran akun baru ${newId} berhasil! Selamat datang!`, 'success');
    } catch (err) {
      showToast('Gagal mendaftar, coba lagi.', 'error');
    }
  };

  // Handle Admin Login
  const handleAdminLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (adminEmail.trim().toLowerCase() === 'admin@elwafacenter.com' && adminPassword === 'admin123') {
      setRole('admin');
      showToast('Login berhasil sebagai Administrator Pusat!', 'success');
    } else {
      // Still allow for demo convenience with warning
      setRole('admin');
      showToast('Login demo admin diizinkan untuk keperluan evaluasi.', 'info');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2F7F6] via-white to-[#E8F2F0] py-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Ambient background decoration */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-elwafa-teal/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-elwafa-gold/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar: Return to Beranda */}
      <div className="w-full max-w-xl flex items-center justify-between mb-6 z-10">
        <button
          onClick={() => setCurrentPage('beranda')}
          className="inline-flex items-center gap-2 text-xs font-bold text-elwafa-ocean hover:text-elwafa-teal transition-colors py-2 px-3 rounded-xl bg-white/80 border border-elwafa-surface-border backdrop-blur-xs shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>

        <span className="text-[11px] font-semibold text-elwafa-text-muted bg-white/60 px-3 py-1 rounded-full border border-elwafa-surface-border">
          Portal Demo Elwafa Center
        </span>
      </div>

      {/* Main Authentication Card */}
      <div className="w-full max-w-xl bg-white/95 backdrop-blur-md rounded-3xl shadow-xl border border-elwafa-surface-border p-6 sm:p-8 z-10">
        
        {/* Brand Logo - Seamlessly blended with transparent background */}
        <div className="flex flex-col items-center text-center mb-6">
          <img
            src="/assets/logo-elwafa-horizontal-dark.png"
            alt="Elwafa Internasional Center"
            className="h-14 sm:h-16 w-auto object-contain mb-2 transition-transform hover:scale-102"
            onError={(e) => {
              // Fallback to vertical transparent logo
              (e.currentTarget as HTMLImageElement).src = '/assets/logo-elwafa-vertical-transparent.png';
            }}
          />
          <p className="text-xs text-elwafa-text-muted max-w-md">
            Pusat Pembinaan &amp; Konsultan Resmi Studi Universitas Al-Azhar Kairo Mesir
          </p>
        </div>

        {/* Portal Type Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-elwafa-surface rounded-2xl border border-elwafa-surface-border mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('student')}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'student'
                ? 'bg-elwafa-ocean text-white shadow-xs'
                : 'text-elwafa-text-muted hover:text-elwafa-ocean'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Portal Calon Santri</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('admin')}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'admin'
                ? 'bg-elwafa-gold text-elwafa-ocean shadow-xs'
                : 'text-elwafa-text-muted hover:text-elwafa-ocean'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Portal Administrator</span>
          </button>
        </div>

        {/* Tab 1: Student Portal */}
        {activeTab === 'student' && (
          <div className="space-y-6">
            
            {/* Sub Mode Toggle: Login vs Register */}
            <div className="flex items-center justify-center gap-3 border-b border-elwafa-surface-border pb-3">
              <button
                type="button"
                onClick={() => setStudentMode('login')}
                className={`text-xs font-bold pb-1 transition-all ${
                  studentMode === 'login'
                    ? 'text-elwafa-teal border-b-2 border-elwafa-teal'
                    : 'text-elwafa-text-muted hover:text-elwafa-ocean'
                }`}
              >
                Masuk Akun Santri
              </button>
              <span className="text-elwafa-surface-border">|</span>
              <button
                type="button"
                onClick={() => setStudentMode('register')}
                className={`text-xs font-bold pb-1 transition-all ${
                  studentMode === 'register'
                    ? 'text-elwafa-teal border-b-2 border-elwafa-teal'
                    : 'text-elwafa-text-muted hover:text-elwafa-ocean'
                }`}
              >
                Daftar Akun Baru
              </button>
            </div>

            {studentMode === 'login' ? (
              <div className="space-y-5">
                {/* 1-Click Demo Accounts Box */}
                <div className="bg-[#EEF5F4] border border-elwafa-teal/20 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-elwafa-ocean flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-elwafa-teal" />
                      Akses Cepat Akun Demo Mahasiswa (1-Klik):
                    </span>
                    <span className="text-[10px] text-elwafa-teal font-semibold">Siap Uji</span>
                  </div>

                  <div className="space-y-2">
                    {students.slice(0, 3).map((std) => (
                      <button
                        key={std.id}
                        type="button"
                        onClick={() => handleQuickStudentLogin(std.id, std.name)}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white hover:bg-elwafa-teal/10 border border-elwafa-surface-border hover:border-elwafa-teal/40 transition-all text-left group"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="text-xs font-bold text-elwafa-ocean group-hover:text-elwafa-teal transition-colors">
                            {std.name}
                          </div>
                          <div className="text-[11px] text-elwafa-text-muted truncate">
                            ID: {std.id} · {std.selectedProgramName || 'Program Al-Azhar'}
                          </div>
                        </div>

                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                            std.status === 'APPROVED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : std.status === 'PENDING'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {std.status === 'APPROVED'
                            ? 'Terverifikasi'
                            : std.status === 'PENDING'
                            ? 'Menunggu'
                            : 'Perlu Revisi'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Manual Form Login */}
                <form onSubmit={handleStudentManualLogin} className="space-y-3.5 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-elwafa-ocean mb-1">
                      No. Registrasi atau Email
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={studentIdentifier}
                        onChange={(e) => setStudentIdentifier(e.target.value)}
                        placeholder="Contoh: EWF-2026-001 atau email@gmail.com"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-elwafa-surface-border bg-white text-xs font-medium text-elwafa-ocean focus:outline-none focus:ring-2 focus:ring-elwafa-teal/30 focus:border-elwafa-teal"
                        required
                      />
                      <Mail className="w-4 h-4 text-elwafa-text-muted absolute left-3 top-3" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-elwafa-ocean">
                        Kata Sandi
                      </label>
                      <span className="text-[10px] text-elwafa-text-muted">
                        Demo: santri123
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        type="password"
                        value={studentPassword}
                        onChange={(e) => setStudentPassword(e.target.value)}
                        placeholder="Masukkan kata sandi"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-elwafa-surface-border bg-white text-xs font-medium text-elwafa-ocean focus:outline-none focus:ring-2 focus:ring-elwafa-teal/30 focus:border-elwafa-teal"
                        required
                      />
                      <Lock className="w-4 h-4 text-elwafa-text-muted absolute left-3 top-3" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-elwafa-teal hover:bg-elwafa-teal-dark text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Masuk ke Dashboard Santri</span>
                  </button>
                </form>
              </div>
            ) : (
              /* Registration Form */
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-elwafa-ocean mb-1">
                    Nama Lengkap Calon Santri *
                  </label>
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Contoh: Muhammad Farhan"
                    className="w-full px-3 py-2.5 rounded-xl border border-elwafa-surface-border bg-white text-xs text-elwafa-ocean focus:outline-none focus:ring-2 focus:ring-elwafa-teal/30 focus:border-elwafa-teal"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-elwafa-ocean mb-1">
                      Alamat Email *
                    </label>
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="farhan@gmail.com"
                      className="w-full px-3 py-2.5 rounded-xl border border-elwafa-surface-border bg-white text-xs text-elwafa-ocean focus:outline-none focus:ring-2 focus:ring-elwafa-teal/30 focus:border-elwafa-teal"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-elwafa-ocean mb-1">
                      Nomor WhatsApp *
                    </label>
                    <input
                      type="tel"
                      value={regWhatsapp}
                      onChange={(e) => setRegWhatsapp(e.target.value)}
                      placeholder="081234567890"
                      className="w-full px-3 py-2.5 rounded-xl border border-elwafa-surface-border bg-white text-xs text-elwafa-ocean focus:outline-none focus:ring-2 focus:ring-elwafa-teal/30 focus:border-elwafa-teal"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-elwafa-ocean mb-1">
                    Pilihan Program Bimbingan *
                  </label>
                  <select
                    value={regProgramId}
                    onChange={(e) => setRegProgramId(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-elwafa-surface-border bg-white text-xs text-elwafa-ocean focus:outline-none focus:ring-2 focus:ring-elwafa-teal/30 focus:border-elwafa-teal"
                  >
                    {programs.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-elwafa-ocean mb-1">
                    Buat Kata Sandi Akun
                  </label>
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Minimal 6 karakter"
                    className="w-full px-3 py-2.5 rounded-xl border border-elwafa-surface-border bg-white text-xs text-elwafa-ocean focus:outline-none focus:ring-2 focus:ring-elwafa-teal/30 focus:border-elwafa-teal"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-elwafa-teal hover:bg-elwafa-teal-dark text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Daftar &amp; Langsung Masuk Dashboard Demo</span>
                </button>
              </form>
            )}

          </div>
        )}

        {/* Tab 2: Administrator Portal */}
        {activeTab === 'admin' && (
          <div className="space-y-5">
            {/* Official Demo Credentials Callout */}
            <div className="bg-[#FFF9E6] border border-elwafa-gold/40 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Key className="w-4 h-4 text-elwafa-ocean" />
                <span className="text-xs font-bold text-elwafa-ocean">
                  Kredensial Akun Administrator Resmi Demo:
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs bg-white/80 p-2.5 rounded-xl border border-elwafa-gold/30">
                <div>
                  <span className="text-elwafa-text-muted text-[11px] block">Email:</span>
                  <code className="font-bold text-elwafa-ocean font-mono text-[11px]">
                    admin@elwafacenter.com
                  </code>
                </div>
                <div>
                  <span className="text-elwafa-text-muted text-[11px] block">Kata Sandi:</span>
                  <code className="font-bold text-elwafa-ocean font-mono text-[11px]">
                    admin123
                  </code>
                </div>
              </div>
              <p className="text-[11px] text-elwafa-ocean/80 mt-2">
                Hak Akses: Verifikasi berkas santri, ekspor CSV, manajemen program, dan penerbitan artikel resmi.
              </p>
            </div>

            {/* 1-Click Admin Button */}
            <button
              type="button"
              onClick={() => handleAdminLogin()}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-elwafa-gold hover:bg-amber-400 text-elwafa-ocean text-xs font-extrabold shadow-md hover:shadow-lg transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Masuk sebagai Admin Demo (1-Klik Cepat)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Manual Admin Form */}
            <form onSubmit={handleAdminLogin} className="space-y-3.5 pt-2 border-t border-elwafa-surface-border">
              <div>
                <label className="block text-xs font-bold text-elwafa-ocean mb-1">
                  Email Administrator
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-elwafa-surface-border bg-white text-xs font-medium text-elwafa-ocean focus:outline-none focus:ring-2 focus:ring-elwafa-gold/30 focus:border-elwafa-gold"
                    required
                  />
                  <Mail className="w-4 h-4 text-elwafa-text-muted absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-elwafa-ocean mb-1">
                  Kata Sandi
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-elwafa-surface-border bg-white text-xs font-medium text-elwafa-ocean focus:outline-none focus:ring-2 focus:ring-elwafa-gold/30 focus:border-elwafa-gold"
                    required
                  />
                  <Lock className="w-4 h-4 text-elwafa-text-muted absolute left-3 top-3" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-elwafa-ocean hover:bg-elwafa-ocean-light text-white text-xs font-bold transition-all"
              >
                Verifikasi &amp; Masuk Portal Admin
              </button>
            </form>
          </div>
        )}

      </div>

      {/* Footer Info */}
      <div className="mt-6 text-center text-xs text-elwafa-text-muted z-10">
        <p>© 2026 PT Elwafa Internasional Center · Simulasi Portal Terintegrasi</p>
      </div>

    </div>
  );
};
