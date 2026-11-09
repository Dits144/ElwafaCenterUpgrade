import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

/** Decorative, non-blocking welcome. The site remains fully interactive underneath. */
export const IntroExperience: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    try {
      if (sessionStorage.getItem('elwafa_intro_seen_v1')) return;
      sessionStorage.setItem('elwafa_intro_seen_v1', '1');
      setVisible(true);
    } catch { return; }
  }, [reducedMotion]);

  // Keep the exit timer tied to visibility: React StrictMode replays mount
  // effects and would otherwise clear the only timer while retaining state.
  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => setVisible(false), 1900);
    return () => window.clearTimeout(timer);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center overflow-hidden bg-[#F8F6F0]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div className="absolute h-[min(80vw,540px)] w-[min(80vw,540px)] rotate-45 border border-[#C6A76A]/40" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1 }} />
          <motion.div className="absolute h-[min(57vw,400px)] w-[min(57vw,400px)] rotate-45 border border-[#C6A76A]/30" initial={{ opacity: 0, scale: 0.75, rotate: 0 }} animate={{ opacity: 1, scale: 1, rotate: 45 }} transition={{ duration: 1.3 }} />
          <div className="relative flex flex-col items-center gap-5 px-6 text-center">
            <motion.img src="/assets/logo-elwafa-vertical-transparent.png" alt="" className="h-28 w-28 object-contain sm:h-36 sm:w-36" initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.65 }} />
            <motion.p className="font-serif text-3xl font-semibold tracking-wide text-[#123C35] sm:text-5xl" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34, duration: 0.6 }}>Elwafa Center</motion.p>
            <motion.span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#1E5447] sm:text-xs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>Menuntun langkah menuju ilmu</motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
