import React from 'react';
import { useApp } from '../../context/AppContext';
import { Program } from '../../types';
import { ArrowRight, CheckCircle2, Clock, Calendar, Info, BookCheck } from 'lucide-react';

interface ProgramsSectionProps {
  onSelectProgram: (program: Program) => void;
}

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({ onSelectProgram }) => {
  const { programs, setSelectedProgramForDetail } = useApp();

  return (
    <section id="program" className="py-20 bg-white border-b border-elwafa-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-elwafa-teal/10 text-elwafa-teal text-xs font-bold uppercase tracking-wider mb-3">
            <BookCheck className="w-3.5 h-3.5" />
            <span>Pilihan Program Resmi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-elwafa-ocean tracking-tight">
            Program Studi &amp; Pembinaan Elwafa Center
          </h2>
          <p className="mt-3 text-sm sm:text-base text-elwafa-text-muted leading-relaxed">
            Menyediakan bimbingan terpadu untuk pendidikan formal di Mesir, Turki, dan Malaysia mulai dari tingkat sekolah menengah hingga perkuliahan sarjana.
          </p>
        </div>

        {/* 3 Authentic Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((prog) => {
            const percentage = Math.round((prog.enrolledCount / prog.quota) * 100);

            return (
              <div
                key={prog.id}
                className="group flex flex-col bg-elwafa-surface rounded-3xl border border-elwafa-surface-border overflow-hidden hover:shadow-elevated transition-all duration-300"
              >
                {/* Header Image */}
                <div className="relative h-52 bg-elwafa-ocean overflow-hidden">
                  <img
                    src={prog.image}
                    alt={prog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/assets/background.jpeg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-elwafa-ocean-dark via-transparent to-black/20" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-elwafa-ocean/90 backdrop-blur-md text-[11px] font-bold text-elwafa-gold border border-elwafa-gold/30">
                      {prog.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center gap-3 text-xs text-white/90">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-elwafa-gold" />
                        {prog.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-elwafa-teal-light" />
                        {prog.schedule}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-elwafa-ocean group-hover:text-elwafa-teal transition-colors leading-snug">
                      {prog.title}
                    </h3>
                    <p className="mt-2 text-xs text-elwafa-text-muted leading-relaxed">
                      {prog.description}
                    </p>

                    <div className="mt-4 pt-4 border-t border-elwafa-surface-border space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-elwafa-ocean block">
                        Keunggulan Pembinaan:
                      </span>
                      {prog.highlights.slice(0, 3).map((item, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2 text-xs text-elwafa-text-main">
                          <CheckCircle2 className="w-3.5 h-3.5 text-elwafa-teal shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quota & Action Buttons */}
                  <div className="pt-4 border-t border-elwafa-surface-border space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                        <span className="text-elwafa-text-muted">Kuota Pendaftar:</span>
                        <span className="font-bold text-elwafa-ocean">
                          {prog.enrolledCount} / {prog.quota} ({percentage}%)
                        </span>
                      </div>

                      <div className="w-full bg-elwafa-surface-subtle h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-elwafa-teal h-full rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => setSelectedProgramForDetail(prog)}
                        className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white hover:bg-elwafa-surface-subtle border border-elwafa-surface-border text-elwafa-ocean text-xs font-bold transition-all shadow-xs"
                      >
                        <Info className="w-3.5 h-3.5 text-elwafa-teal" />
                        <span>Detail Program</span>
                      </button>

                      <button
                        onClick={() => onSelectProgram(prog)}
                        className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-elwafa-teal hover:bg-elwafa-teal-dark text-white text-xs font-bold transition-all shadow-sm"
                      >
                        <span>Daftar</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
