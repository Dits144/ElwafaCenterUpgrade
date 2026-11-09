import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, GraduationCap, Building2, BookOpen, MapPin } from 'lucide-react';

const DESTINATIONS = [
  { label: 'Universitas Al-Azhar Kairo', tag: 'S1 Mesir', icon: <GraduationCap className="w-3.5 h-3.5 text-elwafa-gold" /> },
  { label: "Ma'had Bu'uts Al-Azhar", tag: 'SMP & SMA', icon: <Building2 className="w-3.5 h-3.5 text-elwafa-teal" /> },
  { label: 'Fakultas Ushuluddin', tag: 'Akademi', icon: <BookOpen className="w-3.5 h-3.5 text-elwafa-gold" /> },
  { label: "Fakultas Syari'ah wal Qanun", tag: 'Akademi', icon: <BookOpen className="w-3.5 h-3.5 text-elwafa-teal" /> },
  { label: 'Fakultas Bahasa Arab (Lughah)', tag: 'Akademi', icon: <BookOpen className="w-3.5 h-3.5 text-elwafa-gold" /> },
  { label: 'Fakultas Dirasat Islamiyyah', tag: 'Akademi', icon: <BookOpen className="w-3.5 h-3.5 text-elwafa-teal" /> },
  { label: 'Karantina Bahasa Arab 24 Jam', tag: 'Biah Lughawiyyah', icon: <Sparkles className="w-3.5 h-3.5 text-elwafa-gold" /> },
  { label: 'Markaz Lughoh & Tahfidz Mutqin', tag: 'Persiapan', icon: <Sparkles className="w-3.5 h-3.5 text-elwafa-teal" /> },
  { label: 'Persiapan Seleksi Pusiba & Diktis', tag: 'Ujian Negara', icon: <GraduationCap className="w-3.5 h-3.5 text-elwafa-gold" /> },
  { label: 'Asrama Terbina Nasr City Kairo', tag: 'Fasilitas Mesir', icon: <MapPin className="w-3.5 h-3.5 text-elwafa-teal" /> },
];

export const TickerMarquee: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden py-4 bg-elwafa-surface border-y border-[#003B46]/10">
      {/* Left/Right fading mask for smooth aesthetic appearance */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-elwafa-surface to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-elwafa-surface to-transparent z-10" />

      <div className="flex items-center">
        <motion.div
          className="flex shrink-0 items-center gap-3 sm:gap-4 pr-3"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            ease: 'linear',
            duration: 28,
            repeat: Infinity,
          }}
        >
          {[...DESTINATIONS, ...DESTINATIONS].map((item, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 border border-elwafa-surface-border text-xs font-semibold text-elwafa-ocean shadow-2xs hover:border-elwafa-teal hover:bg-white transition-all cursor-default select-none shrink-0"
            >
              {item.icon}
              <span>{item.label}</span>
              <span className="text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded-md bg-elwafa-ocean/5 text-elwafa-teal">
                {item.tag}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
