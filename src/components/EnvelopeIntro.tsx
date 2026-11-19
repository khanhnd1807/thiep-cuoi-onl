import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileSpreadsheet, Sparkles } from 'lucide-react';
import { COUPLE_INFO } from '../data/weddingData';
import { Guest } from '../types/wedding';
import { formatGuestDisplay } from '../utils/urlGuest';
import { triggerCelebrationBurst } from './CursorMagic';

interface EnvelopeIntroProps {
  visible: boolean;
  guest: Guest;
  onOpenComplete: () => void;
  onOpenGuestDrawer: () => void;
}

export const EnvelopeIntro: React.FC<EnvelopeIntroProps> = ({
  visible,
  guest,
  onOpenComplete,
  onOpenGuestDrawer,
}) => {
  const [opening, setOpening] = useState(false);

  const handleOpen = (e?: React.MouseEvent) => {
    if (opening) return;
    setOpening(true);

    const x = e && e.clientX ? e.clientX : window.innerWidth / 2;
    const y = e && e.clientY ? e.clientY : window.innerHeight / 2;
    triggerCelebrationBurst(x, y, 75);
    window.setTimeout(() => {
      triggerCelebrationBurst(window.innerWidth / 2, window.innerHeight * 0.42, 60);
    }, 320);

    window.setTimeout(() => {
      onOpenComplete();
      window.setTimeout(() => setOpening(false), 600);
    }, 1450);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="royal-gatefold-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.12,
            filter: 'blur(10px)',
            transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#1D0B0F] px-4 py-6"
        >
          {/* Animated Ambient Golden Spotlights */}
          <motion.div
            animate={{
              scale: [1, 1.18, 1],
              opacity: [0.35, 0.55, 0.35],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 45%, rgba(223, 193, 154, 0.28) 0%, rgba(110, 30, 43, 0.52) 42%, rgba(18, 6, 9, 0.96) 100%)',
            }}
          />

          {/* Quick Excel Guest Switcher Button */}
          <motion.button
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={(e) => {
              e.stopPropagation();
              onOpenGuestDrawer();
            }}
            className="absolute right-5 top-5 z-30 flex items-center gap-2 rounded-full border border-gold/45 bg-black/35 px-4 py-2 text-xs font-medium tracking-wide text-champagne backdrop-blur-md transition hover:border-gold-light hover:bg-gold/20"
          >
            <FileSpreadsheet className="h-3.5 w-3.5 text-gold-light" />
            <span>Đổi khách mời / Import Excel</span>
          </motion.button>

          {/* Header Crest */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: opening ? 0 : 1, y: opening ? -30 : 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-20 mb-5 text-center"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.42em] text-gold-light">
              The Royal Wedding Invitation
            </p>
            <h1 className="gold-shimmer mt-1.5 font-script text-4xl sm:text-5xl">
              {COUPLE_INFO.groom.firstName} &amp; {COUPLE_INFO.bride.firstName}
            </h1>
          </motion.div>

          {/* 3D Royal Gatefold Double-Door Invitation Stage (Entire card is clickable!) */}
          <div
            onClick={handleOpen}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleOpen();
            }}
            aria-label="Mở thiệp cưới"
            className="group/card relative z-20 w-full max-w-[500px] cursor-pointer focus:outline-none"
            style={{ perspective: 1800 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: opening ? 1.07 : 1,
              }}
              transition={{
                opacity: { duration: 0.8 },
                y: { duration: 0.8 },
                scale: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
              }}
              style={{ transformStyle: 'preserve-3d' }}
              className="relative mx-auto aspect-[4/3.1] w-full rounded-2xl shadow-[0_35px_95px_rgba(0,0,0,0.75)]"
            >
              {/* INNER GLOWING INVITATION CARD (Revealed when doors swing open!) */}
              <motion.div
                animate={
                  opening
                    ? {
                        scale: 1.05,
                        y: -12,
                        boxShadow: '0 30px 90px rgba(223,193,154,0.45)',
                      }
                    : { scale: 0.94, y: 0 }
                }
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-2 z-10 flex flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-gold/60 bg-gradient-to-b from-[#FFFDF9] via-[#FAF3E8] to-[#F2E4CE] p-6 text-center"
              >
                <div className="pointer-events-none absolute inset-2.5 rounded-lg border border-gold/35" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gold-dark">
                  Trân Trọng Kính Mời
                </p>
                <p className="mt-2 font-serif text-2xl font-bold text-burgundy sm:text-3xl">
                  {formatGuestDisplay(guest)}
                </p>
                <div className="my-3 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
                <p className="font-script text-3xl text-espresso sm:text-4xl">
                  {COUPLE_INFO.groom.firstName} &amp; {COUPLE_INFO.bride.firstName}
                </p>
                <p className="mt-1 font-serif text-sm italic tracking-widest text-gold-dark">
                  {COUPLE_INFO.displayDate}
                </p>
              </motion.div>

              {/* LEFT 3D ROYAL VELVET GATEFOLD DOOR */}
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{ rotateY: opening ? -128 : 0 }}
                transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  transformOrigin: 'left center',
                  transformStyle: 'preserve-3d',
                }}
                className="absolute inset-y-0 left-0 z-20 w-1/2 rounded-l-2xl border-y border-l border-r border-gold/45 bg-gradient-to-br from-[#7B2030] via-[#5A1420] to-[#3B0B13] p-4 shadow-2xl"
              >
                <div className="flex h-full w-full flex-col justify-between rounded-l-xl border border-gold/30 p-3">
                  <div className="h-3 w-3 rounded-full border border-gold/50" />
                  <div className="my-auto pl-1 text-left opacity-25">
                    <div className="h-24 w-px bg-gradient-to-b from-transparent via-gold-light to-transparent" />
                  </div>
                  <div className="h-3 w-3 rounded-full border border-gold/50" />
                </div>
              </motion.div>

              {/* RIGHT 3D ROYAL VELVET GATEFOLD DOOR */}
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{ rotateY: opening ? 128 : 0 }}
                transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  transformOrigin: 'right center',
                  transformStyle: 'preserve-3d',
                }}
                className="absolute inset-y-0 right-0 z-20 w-1/2 rounded-r-2xl border-y border-l border-r border-gold/45 bg-gradient-to-bl from-[#7B2030] via-[#5A1420] to-[#3B0B13] p-4 shadow-2xl"
              >
                <div className="flex h-full w-full flex-col items-end justify-between rounded-r-xl border border-gold/30 p-3">
                  <div className="h-3 w-3 rounded-full border border-gold/50" />
                  <div className="my-auto pr-1 opacity-25">
                    <div className="h-24 w-px bg-gradient-to-b from-transparent via-gold-light to-transparent" />
                  </div>
                  <div className="h-3 w-3 rounded-full border border-gold/50" />
                </div>
              </motion.div>

              {/* Personalized Guest Name Banner across the closed doors */}
              <motion.div
                animate={
                  opening
                    ? { opacity: 0, y: 20, scale: 0.9 }
                    : { opacity: 1, y: 0, scale: 1 }
                }
                transition={{ duration: 0.35 }}
                style={{ transform: 'translateZ(18px)' }}
                className="pointer-events-none absolute inset-x-7 bottom-5 z-30 rounded-xl border border-gold-light/40 bg-black/35 px-4 py-2.5 text-center backdrop-blur-md"
              >
                <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-gold-light/85">
                  Kính mời quý khách
                </p>
                <p className="mt-0.5 font-serif text-xl font-semibold text-ivory sm:text-2xl">
                  {formatGuestDisplay(guest)}
                </p>
              </motion.div>

              {/* True-Centered Flexbox Layer for Wax Seal & Shockwave (Elevated in Z-space so it never shifts or misses clicks!) */}
              <div
                style={{ transform: 'translateZ(28px)' }}
                className="pointer-events-none absolute inset-x-0 bottom-16 top-0 z-40 flex items-center justify-center"
              >
                {/* Shockwave Ring when Seal Breaks */}
                <AnimatePresence>
                  {opening && (
                    <motion.div
                      initial={{ scale: 0.4, opacity: 0.95 }}
                      animate={{ scale: 3.4, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.85, ease: 'easeOut' }}
                      className="pointer-events-none absolute h-28 w-28 rounded-full border-2 border-gold-light"
                    />
                  )}
                </AnimatePresence>

                {/* Rotating Golden Halo + 3D Wax Seal Button */}
                <motion.button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpen(e);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.93 }}
                  animate={
                    opening
                      ? { scale: 0.2, opacity: 0, rotate: 90 }
                      : { scale: 1, opacity: 1, rotate: 0 }
                  }
                  transition={{ duration: 0.4 }}
                  aria-label="Chạm dấu sáp mở thiệp"
                  className="pointer-events-auto relative flex h-32 w-32 items-center justify-center rounded-full focus:outline-none"
                >
                  {/* Rotating Ornate SVG Gold Ring */}
                  <svg
                    viewBox="0 0 120 120"
                    className="pointer-events-none absolute inset-0 h-full w-full animate-spin-slow text-gold-light/75"
                  >
                    <circle
                      cx="60"
                      cy="60"
                      r="55"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.1"
                      strokeDasharray="4 6"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="49"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.7"
                    />
                  </svg>

                  {/* Pulse Aura */}
                  <span className="pointer-events-none absolute inset-2 animate-ping rounded-full bg-gold/30 [animation-duration:2.2s]" />

                  {/* 3D Wax Seal Core */}
                  <span className="relative flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 border-gold-light bg-gradient-to-br from-[#A62639] via-[#6E1E2B] to-[#3B0A12] text-ivory shadow-[0_14px_35px_rgba(0,0,0,0.65),inset_0_2px_8px_rgba(255,230,200,0.45)] transition duration-300 group-hover/card:scale-105 group-hover/card:brightness-110">
                    <span className="pointer-events-none absolute inset-1.5 rounded-full border border-dashed border-gold-light/55" />
                    <span className="gold-shimmer font-serif text-xl font-bold tracking-wider">
                      {COUPLE_INFO.monogram}
                    </span>
                    <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-gold-light">
                      Chạm Mở
                    </span>
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Bottom Interactive CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: opening ? 0 : 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative z-20 mt-7 flex flex-col items-center gap-2.5 text-center"
          >
            <button
              type="button"
              onClick={handleOpen}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-dark via-gold-light to-gold-dark px-8 py-3 text-xs font-bold uppercase tracking-[0.24em] text-espresso shadow-[0_10px_30px_rgba(196,154,108,0.4)] transition hover:scale-105 hover:brightness-110"
            >
              <Sparkles className="h-4 w-4 text-burgundy" />
              <span>Chạm dấu sáp hoặc cánh cửa để mở thiệp</span>
            </button>
            {guest.note && (
              <p className="max-w-md font-serif text-sm italic text-champagne/85">
                “{guest.note}”
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
