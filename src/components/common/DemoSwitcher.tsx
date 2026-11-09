import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Role } from '../../types';
import { Users, GraduationCap, ShieldCheck, RotateCcw, ChevronDown, ChevronUp, Sparkles, Check, HelpCircle } from 'lucide-react';

export const DemoSwitcher: React.FC = () => {
  const { role, setRole, currentPage, setCurrentPage, activeStudentId, setActiveStudentId, activeStudent, students, resetDemoData, showToast } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [showScenarioModal, setShowScenarioModal] = useState(false);

  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
  };

  const handleReset = () => {
    if (window.confirm('Reset semua data pendaftaran & kembalikan ke kondisi demo awal?')) {
      resetDemoData();
    }
  };

  return (
    <>
      {/* Demo navigation stays in the document flow so it never covers form actions. */}
      <div className="relative z-40 w-full max-w-3xl mx-auto p-2">
        <div className="bg-elwafa-ocean-dark/95 backdrop-blur-md border border-white/15 text-white rounded-2xl shadow-elevated p-2.5 transition-all duration-300">
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2">
            {/* Left badge */}
            <div className="flex items-center gap-2 pl-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold tracking-wider uppercase text-elwafa-teal-light hidden sm:inline">
                Mode Demo Interaktif
              </span>
            </div>

            {/* Role switch buttons */}
            <div className="flex flex-wrap items-center bg-white/10 p-1 rounded-xl gap-1 max-w-full">
              <button
                onClick={() => handleRoleChange('visitor')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  role === 'visitor'
                    ? 'bg-elwafa-teal text-white shadow-sm'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Pengunjung</span>
              </button>

              <button
                onClick={() => handleRoleChange('student')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  role === 'student'
                    ? 'bg-elwafa-teal text-white shadow-sm'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Mahasiswa</span>
              </button>

              <button
                onClick={() => handleRoleChange('admin')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  role === 'admin'
                    ? 'bg-elwafa-gold text-elwafa-ocean-dark shadow-sm'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>

              <button
                onClick={() => {
                  setRole('visitor');
                  setCurrentPage('login');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  role === 'visitor' && currentPage === 'login'
                    ? 'bg-white text-elwafa-ocean font-bold shadow-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>Halaman Login Demo</span>
              </button>
            </div>

            {/* Right Quick Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowScenarioModal(true)}
                title="Panduan Skenario Presentasi"
                className="flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white/90 hover:text-white px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-elwafa-gold" />
                <span className="hidden md:inline">Skenario Demo</span>
              </button>

              <button
                onClick={handleReset}
                title="Reset Data Demo"
                className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Expanded Drawer: Active Student Switcher when in Student Mode */}
          {isOpen && role === 'student' && (
            <div className="mt-2.5 pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-between text-xs gap-2 px-2">
              <div className="flex items-center gap-2">
                <span className="text-white/60">Calon Mahasiswa Aktif:</span>
                <select
                  value={activeStudentId}
                  onChange={(e) => setActiveStudentId(e.target.value)}
                  className="bg-white/15 border border-white/20 rounded-lg px-2.5 py-1 text-white font-medium focus:outline-none focus:ring-1 focus:ring-elwafa-teal-light cursor-pointer"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id} className="bg-elwafa-ocean-dark text-white">
                      {s.name} ({s.id}) — {s.status}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-white/60 text-[11px] flex items-center gap-1.5">
                <span>Status Berkas:</span>
                <span
                  className={`px-2 py-0.5 rounded-full font-semibold ${
                    activeStudent.status === 'APPROVED'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : activeStudent.status === 'REVISION_REQUIRED'
                      ? 'bg-amber-500/20 text-amber-300'
                      : activeStudent.status === 'REJECTED'
                      ? 'bg-red-500/20 text-red-300'
                      : 'bg-blue-500/20 text-blue-300'
                  }`}
                >
                  {activeStudent.status}
                </span>
              </div>
            </div>
          )}

          {isOpen && role === 'admin' && (
            <div className="mt-2.5 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs px-2 text-white/80">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-elwafa-gold" />
                <span>Login sebagai: <strong>Ustadz Ridwan, Lc.</strong> (Tim Verifikator Administrasi Kairo)</span>
              </div>
              <span className="text-white/50 text-[11px]">Live Sync dengan Portal Mahasiswa</span>
            </div>
          )}
        </div>
      </div>

      {/* Scenario Walkthrough Modal */}
      {showScenarioModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-elwafa-text-main rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-elwafa-surface-border">
            <div className="flex items-center justify-between pb-3 border-b border-elwafa-surface-subtle">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-elwafa-teal" />
                <h3 className="text-lg font-bold text-elwafa-ocean">Skenario Presentasi Klien</h3>
              </div>
              <button
                onClick={() => setShowScenarioModal(false)}
                className="text-elwafa-text-muted hover:text-elwafa-text-main p-1"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3.5 text-sm text-elwafa-text-muted leading-relaxed">
              <p className="text-xs text-elwafa-text-main font-semibold bg-elwafa-surface-subtle p-3 rounded-xl border border-elwafa-surface-border">
                Gunakan alur berikut di depan pimpinan/klien Elwafa Center untuk mendemonstrasikan pengalaman digital yang utuh:
              </p>

              <ol className="list-decimal list-inside space-y-2.5 text-xs text-elwafa-text-main font-medium">
                <li className="p-2 rounded-lg bg-elwafa-surface hover:bg-elwafa-surface-subtle transition-colors">
                  <strong>Tampilan Publik:</strong> Perlihatkan landing page modern dengan brand identitas resmi Elwafa, katalog program S1 Al-Azhar, dan timeline pendaftaran.
                </li>
                <li className="p-2 rounded-lg bg-elwafa-surface hover:bg-elwafa-surface-subtle transition-colors">
                  <strong>Pendaftaran Santri Baru:</strong> Klik tombol <em>Daftar Sekarang</em> atau switch ke tab <em>Mahasiswa</em>. Lengkapi form biodata & pilih program.
                </li>
                <li className="p-2 rounded-lg bg-elwafa-surface hover:bg-elwafa-surface-subtle transition-colors">
                  <strong>Menunggu Verifikasi:</strong> Status mahasiswa menjadi <span className="text-blue-600 font-bold">PENDING</span> dengan tracker alur tahapan.
                </li>
                <li className="p-2 rounded-lg bg-elwafa-surface hover:bg-elwafa-surface-subtle transition-colors">
                  <strong>Beralih ke Admin:</strong> Klik pill <em>Admin</em>. Buka tabel pendaftar, klik berkas santri, periksa dokumen, lalu klik tombol <span className="text-emerald-600 font-bold">Setujui (ACC)</span> atau <span className="text-amber-600 font-bold">Minta Revisi</span>.
                </li>
                <li className="p-2 rounded-lg bg-elwafa-surface hover:bg-elwafa-surface-subtle transition-colors">
                  <strong>Kembali ke Mahasiswa:</strong> Kembali ke peran santri. Status otomatis berubah menjadi <span className="text-emerald-600 font-bold">DISETUJUI</span> lengkap dengan jadwal karantina & modul persiapan.
                </li>
              </ol>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowScenarioModal(false)}
                className="px-5 py-2.5 rounded-xl bg-elwafa-ocean text-white font-semibold text-sm hover:bg-elwafa-ocean-light transition-colors"
              >
                Tutup & Mulai Demo
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
