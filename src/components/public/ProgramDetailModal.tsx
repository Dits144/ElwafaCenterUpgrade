import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle, Clock, Calendar, Users, Building, GraduationCap, FileText, ArrowRight, ShieldCheck } from 'lucide-react';

interface ProgramDetailModalProps {
  onRegisterFromDetail?: () => void;
  onSelectProgram?: (program: any) => void;
}

export const ProgramDetailModal: React.FC<ProgramDetailModalProps> = ({ onRegisterFromDetail, onSelectProgram }) => {
  const { selectedProgramForDetail, setSelectedProgramForDetail } = useApp();

  if (!selectedProgramForDetail) return null;

  const prog = selectedProgramForDetail;
  const percentage = Math.round((prog.enrolledCount / prog.quota) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-elwafa-surface-border">
        
        {/* Header Banner Image */}
        <div className="relative h-60 bg-elwafa-ocean overflow-hidden">
          <img
            src={prog.image}
            alt={prog.title}
            className="w-full h-full object-cover opacity-85"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/assets/background.jpeg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-elwafa-ocean-dark via-elwafa-ocean-dark/40 to-transparent" />
          
          <button
            onClick={() => setSelectedProgramForDetail(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute top-4 left-4">
            <span className="px-3.5 py-1.5 rounded-full bg-elwafa-teal text-white text-xs font-bold uppercase tracking-wider shadow">
              {prog.category}
            </span>
          </div>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <h2 className="text-xl sm:text-2xl font-extrabold leading-tight">
              {prog.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-white/80 mt-2">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-elwafa-gold" />
                {prog.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-elwafa-teal-light" />
                {prog.schedule}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-elwafa-gold" />
                Kuota: {prog.enrolledCount} / {prog.quota} Santri ({percentage}%)
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Deskripsi Singkat */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-elwafa-ocean mb-2">
              Deskripsi Program
            </h3>
            <p className="text-sm text-elwafa-text-muted leading-relaxed">
              {prog.description}
            </p>
          </div>

          {/* Kurikulum & Silabus */}
          {prog.curriculum && prog.curriculum.length > 0 && (
            <div className="p-5 bg-elwafa-surface rounded-2xl border border-elwafa-surface-border">
              <div className="flex items-center gap-2 text-sm font-bold text-elwafa-ocean mb-3">
                <GraduationCap className="w-4 h-4 text-elwafa-teal" />
                <span>Materi &amp; Kurikulum Pembelajaran</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {prog.curriculum.map((cur, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-elwafa-text-main">
                    <CheckCircle className="w-3.5 h-3.5 text-elwafa-teal shrink-0 mt-0.5" />
                    <span>{cur}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fasilitas Terbimbing: Indonesia vs Kairo Mesir */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Fasilitas Indonesia */}
            <div className="p-5 bg-elwafa-teal/5 rounded-2xl border border-elwafa-teal/20">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-elwafa-ocean mb-3">
                <Building className="w-4 h-4 text-elwafa-teal" />
                <span>Asrama di Indonesia</span>
              </div>
              <ul className="space-y-2 text-xs text-elwafa-text-main">
                {prog.facilitiesIndonesia?.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-elwafa-teal mt-1.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                )) || (
                  <li className="text-gray-500">Karantina bahasa &amp; asrama terpadu.</li>
                )}
              </ul>
            </div>

            {/* Fasilitas Mesir */}
            <div className="p-5 bg-elwafa-gold/10 rounded-2xl border border-elwafa-gold/30">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-elwafa-ocean mb-3">
                <ShieldCheck className="w-4 h-4 text-elwafa-gold" />
                <span>Pendampingan di Kairo Mesir</span>
              </div>
              <ul className="space-y-2 text-xs text-elwafa-text-main">
                {prog.facilitiesMesir?.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-elwafa-gold mt-1.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                )) || (
                  <li className="text-gray-500">Penjemputan bandara &amp; wali asuh di Kairo.</li>
                )}
              </ul>
            </div>

          </div>

          {/* Syarat Pendaftaran */}
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-elwafa-ocean mb-3">
              <FileText className="w-4 h-4 text-elwafa-teal" />
              <span>Persyaratan Berkas Dokumen</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-elwafa-text-muted">
              {prog.requirements.map((req, rIdx) => (
                <div key={rIdx} className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-elwafa-surface-border">
                  <span className="w-5 h-5 rounded-full bg-elwafa-surface-subtle text-elwafa-ocean font-bold flex items-center justify-center shrink-0 text-[10px]">
                    {rIdx + 1}
                  </span>
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Catatan Biaya & Akomodasi */}
          <div className="p-4 bg-elwafa-surface-subtle rounded-2xl border border-elwafa-surface-border flex items-center justify-between flex-wrap gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-elwafa-text-muted block">
                Skema Pembiayaan &amp; Fasilitas
              </span>
              <p className="text-sm font-bold text-elwafa-ocean mt-0.5">
                {prog.priceNote}
              </p>
            </div>

            <button
              onClick={() => {
                const currentProg = prog;
                setSelectedProgramForDetail(null);
                if (onSelectProgram) {
                  onSelectProgram(currentProg);
                } else if (onRegisterFromDetail) {
                  onRegisterFromDetail();
                }
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-elwafa-teal hover:bg-elwafa-teal-dark text-white font-bold text-xs sm:text-sm shadow-md transition-all"
            >
              <span>Daftar Program Ini Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
