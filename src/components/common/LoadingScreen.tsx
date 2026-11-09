import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface LoadingScreenProps {
  /** If true, renders as a fixed viewport overlay. If false, renders as a centered container element. */
  fullScreen?: boolean;
  /** Status text below the animated logo. */
  message?: string;
  /** Custom min-height for container mode (e.g. 'min-h-[50vh]'). */
  minHeight?: string;
  /** Optional subtitle or tagline. */
  subtitle?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  fullScreen = false,
  message = 'Memuat halaman...',
  minHeight = 'min-h-[55vh]',
  subtitle = 'Menuntun Langkah Menuju Al-Azhar Kairo',
}) => {
  const reducedMotion = useReducedMotion();

  const containerClasses = fullScreen
    ? 'fixed inset-0 z-[90] flex items-center justify-center bg-gradient-to-b from-[#F9FBFA] via-white to-[#F2F7F5] overflow-hidden'
    : `flex ${minHeight} w-full items-center justify-center p-8 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/30 rounded-2xl overflow-hidden relative`;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={message}
      className={containerClasses}
    >
      {/* Decorative background glow */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-elwafa-teal/10 blur-3xl pointer-events-none" />
      <div className="absolute w-60 h-60 sm:w-80 sm:h-80 rounded-full bg-elwafa-gold/15 blur-2xl pointer-events-none -bottom-10" />

      {/* Rotating decorative geometric frames */}
      {!reducedMotion && (
        <>
          <motion.div
            aria-hidden="true"
            className="absolute h-44 w-44 sm:h-56 sm:w-56 rotate-45 rounded-3xl border border-[#C6A76A]/30 pointer-events-none"
            animate={{ rotate: [45, 225, 405] }}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute h-36 w-36 sm:h-48 sm:w-48 rotate-12 rounded-2xl border border-elwafa-teal/25 pointer-events-none"
            animate={{ rotate: [12, -168, -348] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          />
        </>
      )}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-sm">
        {/* Animated Logo Container */}
        <div className="relative mb-5 flex items-center justify-center">
          {/* Pulsing Aura */}
          {!reducedMotion && (
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 -m-3 rounded-full bg-gradient-to-tr from-elwafa-teal/20 to-elwafa-gold/25 blur-lg"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.5, 0.85, 0.5],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          )}

          {/* Logo with gentle floating effect */}
          <motion.div
            animate={
              reducedMotion
                ? {}
                : {
                    y: [-3, 3, -3],
                    scale: [0.99, 1.01, 0.99],
                  }
            }
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative flex items-center justify-center p-3 rounded-2xl bg-white/80 shadow-soft backdrop-blur-xs border border-white/60"
          >
            <img
              src="/assets/logo-elwafa-vertical-transparent.png"
              alt="Logo Elwafa Center"
              className="h-16 w-16 sm:h-20 sm:w-20 object-contain drop-shadow-xs"
              onError={(e) => {
                // Fallback to text initials if image fails
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
          </motion.div>
        </div>

        {/* Brand Name */}
        <motion.h3
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-elwafa-ocean"
        >
          Elwafa Center
        </motion.h3>

        {/* Subtitle */}
        <p className="mt-1 text-[11px] sm:text-xs font-medium text-elwafa-text-muted tracking-wide">
          {subtitle}
        </p>

        {/* Shimmering Progress Bar */}
        <div className="mt-5 w-44 sm:w-52 h-1.5 rounded-full bg-gray-200/70 overflow-hidden relative shadow-inner">
          <motion.div
            aria-hidden="true"
            className="absolute top-0 bottom-0 w-1/2 rounded-full bg-gradient-to-r from-elwafa-teal via-elwafa-gold to-elwafa-ocean"
            animate={
              reducedMotion
                ? { width: '100%' }
                : {
                    x: ['-100%', '200%'],
                  }
            }
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Status text with subtle pulsing opacity */}
        <motion.p
          animate={reducedMotion ? {} : { opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-3 text-[11px] font-semibold text-elwafa-ocean tracking-wide flex items-center gap-1.5"
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-elwafa-teal animate-pulse" />
          {message}
        </motion.p>
      </div>
    </div>
  );
};
