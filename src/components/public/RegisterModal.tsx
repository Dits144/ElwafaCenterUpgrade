import React, { useState, useEffect } from 'react';

// Data di formulir ini hanya untuk simulasi lokal, bukan pendaftaran resmi.
import { useApp } from '../../context/AppContext';
import { Program } from '../../types';
import { X, Sparkles, User, Mail, Phone, BookOpen, ArrowRight } from 'lucide-react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProgram?: Program | null;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, preselectedProgram }) => {
  const { programs, registerStudent } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [programId, setProgramId] = useState(preselectedProgram ? preselectedProgram.id : programs[0]?.id || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) setProgramId(preselectedProgram?.id || programs[0]?.id || '');
  }, [isOpen, preselectedProgram?.id, programs]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !whatsapp.trim()) {
      setError('Mohon lengkapi seluruh kolom formulir pendaftaran.');
      return;
    }

    registerStudent({
      name,
      email,
      whatsapp,
      selectedProgramId: programId,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-elwafa-surface-border relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-elwafa-text-muted hover:text-elwafa-text-main p-1.5 rounded-xl hover:bg-elwafa-surface-subtle transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-elwafa-teal" />
          <span className="text-xs font-bold text-elwafa-teal uppercase tracking-wider">
            Pendaftaran Mahasiswa Baru
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-elwafa-ocean">
          Mulai Langkah Studi Al-Azhar
        </h3>
        <p className="text-xs sm:text-sm text-elwafa-text-muted mt-1 mb-6">
Simulasi portal lokal tanpa akun asli. Gunakan identitas fiktif saja; data disimpan hanya di browser ini dan bukan pendaftaran resmi.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-elwafa-ocean mb-1">
              Nama Lengkap Calon Santri *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-elwafa-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Contoh: Muhammad Farhan Al-Ghifari"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-elwafa-surface border border-elwafa-surface-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-elwafa-teal"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-elwafa-ocean mb-1">
                Alamat Email *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-elwafa-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="santri@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-elwafa-surface border border-elwafa-surface-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-elwafa-teal"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-elwafa-ocean mb-1">
                Nomor WhatsApp Aktif *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-elwafa-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  placeholder="08123456789"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-elwafa-surface border border-elwafa-surface-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-elwafa-teal"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-elwafa-ocean mb-1">
              Pilihan Program Pembinaan *
            </label>
            <div className="relative">
              <BookOpen className="w-4 h-4 text-elwafa-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <select
                value={programId}
                onChange={(e) => setProgramId(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-elwafa-surface border border-elwafa-surface-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-elwafa-teal cursor-pointer"
              >
                {programs.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} ({p.category})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="p-3 bg-elwafa-surface-subtle border border-elwafa-surface-border rounded-xl text-xs text-elwafa-text-muted">
            Setelah pendaftaran awal, Anda akan langsung dialihkan ke <strong>Portal Mahasiswa</strong> untuk melengkapi biodata dan memantau status verifikasi berkas secara live.
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-elwafa-text-muted hover:bg-elwafa-surface-subtle transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-elwafa-teal hover:bg-elwafa-teal-dark shadow-md transition-all"
            >
              <span>Lanjut ke Portal Mahasiswa</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
