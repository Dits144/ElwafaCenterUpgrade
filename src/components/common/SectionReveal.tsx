import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/** One-time, subtle entrance for below-the-fold content; never hides reduced-motion content. */
export function SectionReveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08, margin: '0px 0px 80px 0px' }}
      transition={reducedMotion ? { duration: 0 } : { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
