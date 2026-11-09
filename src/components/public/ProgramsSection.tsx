import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { Program } from '../../types';
import { ArrowRight, CheckCircle2, Clock, Calendar, Info, BookCheck } from 'lucide-react';

interface ProgramsSectionProps {
  onSelectProgram: (program: Program) => void;
}

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({ onSelectProgram }) => {
  const { programs, setSelectedProgramForDetail } = useApp();
  const reducedMotion = useReducedMotion();
  const safePercentage = (enrolled: number, quota: number) => quota > 0 ? Math.min(100, Math.max(0, Math.round(enrolled / quota * 100))) : 0;

  return (
    <section id="program" className="py-20 bg-[#F8F6F0] border-b border-[#EAE3D5]"> 

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-elwafa-teal/10 text-elwafa-teal text-xs font-bold uppercase tracking-wider mb-3">
            <BookCheck className="w-3.5 h-3.5" />
            <span>Jelajahi Program</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#123C35] tracking-tight">
            Program Studi &amp; Pembinaan Elwafa Center
          </h2>
          <p className="mt-3 text-sm sm:text-base text-elwafa-text-muted leading-relaxed">
            Menyediakan bimbingan terpadu untuk pendidikan formal di Mesir, Turki, dan Malaysia mulai dari tingkat sekolah menengah hingga perkuliahan sarjana.
          </p>
        </div>

        {/* 3 Authentic Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((prog) => {
            const percentage = safePercentage(prog.enrolledCount, prog.quota);

            return (
              <motion.div
                key={prog.id}
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.08 }}
                transition={{ duration: reducedMotion ? 0 : 0.46, delay: reducedMotion ? 0 : Math.min(0.16, programs.indexOf(prog) * 0.08), ease: 'easeOut' }}
                className="group flex flex-col bg-white rounded-2xl border border-[#EAE3D5] overflow-hidden hover:border-[#C6A76A] hover:shadow-elevated transition-[box-shadow,border-color] duration-300"
              >
                {/* Header Image */}
                <div className="relative h-52 bg-elwafa-ocean overflow-hidden">
                  <img
                    src={prog.image || '/assets/8.jpeg'}
                    alt={prog.title}
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 motion-reduce:transition-none opacity-95"
                    onError={(e) => {
                      const image = e.currentTarget;
                      image.onerror = null;
                      image.src = '/assets/8.jpeg';
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

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
