import React, { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ChevronDown, Heart, Sparkles, UserCheck } from 'lucide-react';
import { COUPLE_INFO, GALLERY_PHOTOS } from '../data/weddingData';
import { Guest } from '../types/wedding';
import { formatGuestDisplay } from '../utils/urlGuest';
import { triggerCelebrationBurst } from './CursorMagic';
import { FloralDivider } from './FloralOrnament';

interface HeroSectionProps {
  guest: Guest;
  onOpenGuestDrawer: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ guest, onOpenGuestDrawer }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '24%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.78], [1, 0]);

  // 3D Interactive Mouse Parallax Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 24 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 24 });

  const bgShiftX = useTransform(smoothX, [-0.5, 0.5], ['1.8%', '-1.8%']);
  const bgShiftY = useTransform(smoothY, [-0.5, 0.5], ['1.8%', '-1.8%']);

  const titleShiftX = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);
  const titleShiftY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);

  const leftCardX = useTransform(smoothX, [-0.5, 0.5], [-34, 34]);
  const leftCardY = useTransform(smoothY, [-0.5, 0.5], [-24, 24]);

  const rightCardX = useTransform(smoothX, [-0.5, 0.5], [34, -34]);
  const rightCardY = useTransform(smoothY, [-0.5, 0.5], [24, -24]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(nx);
    mouseY.set(ny);
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-espresso"
    >
      {/* Multi-Layer Parallax Background Photo */}
      <motion.div
        style={{ y: bgY, x: bgShiftX, translateY: bgShiftY }}
        className="absolute -inset-6"
      >
        <img
          src={COUPLE_INFO.heroImage}
          alt="Ngọc Lâm & Việt Dũng"
          className="animate-ken-burns h-full w-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 38%, rgba(44, 18, 24, 0.25) 0%, rgba(28, 12, 16, 0.65) 60%, rgba(20, 8, 11, 0.88) 100%)',
          }}
        />
      </motion.div>

      {/* Rotating Giant Golden Botanical Ring in Background */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25">
        <svg
          viewBox="0 0 500 500"
          className="h-[360px] w-[360px] animate-spin-slow text-gold-light sm:h-[540px] sm:w-[540px]"
        >
          <circle
            cx="250"
            cy="250"
            r="230"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="6 10"
          />
          <circle
            cx="250"
            cy="250"
            r="205"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
          />
        </svg>
      </div>

      {/* Floating 3D Polaroid Frame — Left (Desktop) */}
      <motion.div
        style={{ x: leftCardX, y: leftCardY }}
        initial={{ opacity: 0, x: -60, rotate: -12 }}
        animate={{ opacity: 1, x: 0, rotate: -7 }}
        transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.08, rotate: -2, zIndex: 30 }}
        className=" hidden xl:block absolute left-10 top-1/3 z-20 w-48 rounded-2xl border border-gold-light/40 bg-ivory/95 p-2.5 shadow-[0_25px_60px_rgba(0,0,0,0.55)] backdrop-blur-md"
      >
        <div className="aspect-[3/4] overflow-hidden rounded-xl">
          <img
            src={GALLERY_PHOTOS[1].url}
            alt="Khoảnh khắc ngọt ngào"
            className="h-full w-full object-cover"
          />
        </div>
        <p className="mt-2 text-center font-script text-base text-burgundy">
          Forever &amp; Always
        </p>
      </motion.div>

      {/* Floating 3D Polaroid Frame — Right (Desktop) */}
      <motion.div
        style={{ x: rightCardX, y: rightCardY }}
        initial={{ opacity: 0, x: 60, rotate: 12 }}
        animate={{ opacity: 1, x: 0, rotate: 8 }}
        transition={{ duration: 1.1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.08, rotate: 2, zIndex: 30 }}
        className="hidden xl:block absolute right-10 bottom-1/4 z-20 w-48 rounded-2xl border border-gold-light/40 bg-ivory/95 p-2.5 shadow-[0_25px_60px_rgba(0,0,0,0.55)] backdrop-blur-md"
      >
        <div className="aspect-[3/4] overflow-hidden rounded-xl">
          <img
            src={GALLERY_PHOTOS[4].url}
            alt="Nắm tay nhau"
            className="h-full w-full object-cover"
          />
        </div>
        <p className="mt-2 text-center font-script text-base text-burgundy">
          20 . 12 . 2026
        </p>
      </motion.div>

      {/* Subtle gold inner border frame */}
      <div className="pointer-events-none absolute inset-4 rounded-2xl border border-gold-light/25 sm:inset-8" />

      {/* Center Content with 3D Parallax */}
      <motion.div
        style={{
          y: contentY,
          opacity: contentOpacity,
          x: titleShiftX,
          translateY: titleShiftY,
        }}
        className="relative z-10 mx-auto max-w-4xl px-6 py-28 text-center text-ivory"
      >
        {/* Personalized Guest Pill */}
        <motion.button
          type="button"
          onClick={onOpenGuestDrawer}
          initial={{ opacity: 0, y: 18, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          whileHover={{ scale: 1.05 }}
          className="group mb-7 inline-flex items-center gap-2.5 rounded-full border border-gold-light/55 bg-black/35 px-5 py-2 text-xs tracking-wide text-champagne shadow-[0_0_25px_rgba(196,154,108,0.28)] backdrop-blur-md transition hover:border-gold-light hover:bg-black/50"
        >
          <UserCheck className="h-3.5 w-3.5 text-gold-light" />
          <span>Trân trọng kính mời:</span>
          <span className="gold-shimmer font-serif text-base font-bold">
            {formatGuestDisplay(guest)}
          </span>
          <span className="ml-1 hidden rounded-full bg-gold/25 px-2 py-0.5 text-[10px] uppercase tracking-wider text-gold-light sm:inline">
            Đổi khách
          </span>
        </motion.button>

        {/* Animated Eyebrow */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.15em' }}
          animate={{ opacity: 1, letterSpacing: '0.42em' }}
          transition={{ duration: 1.1, delay: 0.25 }}
          className="text-xs font-semibold uppercase text-gold-light/95 sm:text-sm"
        >
          Save The Date • Lễ Thành Hôn
        </motion.p>

        {/* Couple Names with Shimmer & Floating Heart */}
        <div className="mt-4 flex flex-col items-center justify-center sm:flex-row sm:gap-5">
          <motion.span
            initial={{ opacity: 0, x: -40, filter: 'blur(8px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.95, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="font-script text-6xl leading-tight text-ivory drop-shadow-[0_8px_28px_rgba(0,0,0,0.55)] sm:text-7xl md:text-8xl"
          >
            {COUPLE_INFO.groom.firstName}
          </motion.span>

          <motion.button
            type="button"
            onClick={(e) => triggerCelebrationBurst(e.clientX, e.clientY, 50)}
            title="Chạm để tung hoa!"
            animate={{ scale: [1, 1.16, 1], rotate: [0, 6, -6, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            className="my-1 flex h-14 w-14 items-center justify-center rounded-full border border-gold-light/50 bg-burgundy/60 text-gold-light shadow-[0_0_25px_rgba(223,193,154,0.35)] backdrop-blur-sm"
          >
            <Heart className="h-6 w-6 fill-rose-400 text-rose-300" />
          </motion.button>

          <motion.span
            initial={{ opacity: 0, x: 40, filter: 'blur(8px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.95, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="font-script text-6xl leading-tight text-ivory drop-shadow-[0_8px_28px_rgba(0,0,0,0.55)] sm:text-7xl md:text-8xl"
          >
            {COUPLE_INFO.bride.firstName}
          </motion.span>
        </div>

        <div className="my-5">
          <FloralDivider light />
        </div>

        {/* Date & Personalized Note */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.55 }}
          className="space-y-2"
        >
          <p className="gold-shimmer font-serif text-3xl font-bold tracking-[0.3em] sm:text-4xl">
            {COUPLE_INFO.displayDate}
          </p>
          <p className="text-sm font-light tracking-wide text-ivory/90 sm:text-base">
            {COUPLE_INFO.fullVietnameseDate} • JW Marriott Hà Nội
          </p>
          {guest.note && (
            <motion.p
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="mx-auto mt-4 max-w-xl rounded-2xl border border-gold-light/35 bg-black/35 px-6 py-3.5 font-serif text-base italic text-champagne shadow-lg backdrop-blur-md"
            >
              “{guest.note}”
            </motion.p>
          )}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.7 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#rsvp"
            onClick={(e) => triggerCelebrationBurst(e.clientX, e.clientY, 40)}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-burgundy via-rose-700 to-burgundy px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-ivory shadow-[0_10px_30px_rgba(110,30,43,0.6)] ring-1 ring-gold-light/50 transition hover:-translate-y-0.5 hover:brightness-110"
          >
            <Sparkles className="h-3.5 w-3.5 text-gold-light" />
            <span>Xác nhận tham dự</span>
          </a>
          <a
            href="#events"
            className="inline-flex items-center gap-2 rounded-full border border-gold-light/50 bg-white/10 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-ivory backdrop-blur-md transition hover:-translate-y-0.5 hover:border-gold-light hover:bg-white/20"
          >
            <span>Xem thiệp &amp; Lịch trình</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.a
        href="#countdown"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 text-[11px] uppercase tracking-[0.25em] text-ivory/80 transition hover:text-gold-light"
      >
        <span>Khám phá thiệp</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.a>
    </section>
  );
};
