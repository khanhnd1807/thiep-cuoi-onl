import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { FileSpreadsheet, Gift, MailOpen, Sparkles } from 'lucide-react';
import { COUPLE_INFO } from '../data/weddingData';
import { Guest } from '../types/wedding';

interface NavbarProps {
  activeGuest: Guest;
  guestCount: number;
  onOpenGuestDrawer: () => void;
  onOpenGiftModal: () => void;
  onReplayEnvelope: () => void;
}

const NAV_LINKS = [
  { href: '#couple', label: 'Cặp đôi' },
  { href: '#story', label: 'Chuyện tình' },
  { href: '#events', label: 'Lịch trình' },
  { href: '#gallery', label: 'Album ảnh' },
  { href: '#rsvp', label: 'Lời chúc' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeGuest,
  guestCount,
  onOpenGuestDrawer,
  onOpenGiftModal,
  onReplayEnvelope,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'border-b border-gold/25 bg-ivory/88 py-2.5 shadow-sm backdrop-blur-md'
          : 'bg-gradient-to-b from-black/55 via-black/25 to-transparent py-4'
      }`}
    >
      {/* Top golden reading progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 h-[2.5px] origin-left bg-gradient-to-r from-burgundy via-gold to-burgundy"
      />

      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Monogram */}
        <a
          href="#top"
          className={`flex items-center gap-2.5 font-serif text-xl font-semibold tracking-wider transition ${
            scrolled ? 'text-burgundy' : 'text-ivory'
          }`}
        >
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm ${
              scrolled
                ? 'border-gold/50 bg-champagne text-burgundy'
                : 'border-gold-light/60 bg-black/25 text-gold-light backdrop-blur-sm'
            }`}
          >
            {COUPLE_INFO.monogram}
          </span>
          <span className="hidden sm:inline font-script text-2xl font-normal">
            {COUPLE_INFO.groom.firstName} &amp; {COUPLE_INFO.bride.firstName}
          </span>
        </a>

        {/* Navigation Links */}
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-xs font-medium uppercase tracking-[0.2em] transition ${
                scrolled
                  ? 'text-espresso/80 hover:text-burgundy'
                  : 'text-ivory/90 hover:text-gold-light'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onReplayEnvelope}
            title="Xem lại hiệu ứng mở phong bì"
            className={`hidden items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition sm:inline-flex ${
              scrolled
                ? 'border-gold/40 text-taupe hover:border-burgundy hover:text-burgundy'
                : 'border-ivory/30 bg-black/20 text-ivory/90 backdrop-blur-sm hover:border-gold-light'
            }`}
          >
            <MailOpen className="h-3.5 w-3.5" />
            <span>Mở lại thiệp</span>
          </button>

          <button
            type="button"
            onClick={onOpenGiftModal}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              scrolled
                ? 'border-burgundy/30 bg-burgundy/5 text-burgundy hover:bg-burgundy hover:text-ivory'
                : 'border-gold-light/45 bg-black/25 text-gold-light backdrop-blur-sm hover:bg-gold hover:text-espresso'
            }`}
          >
            <Gift className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Mừng cưới</span>
          </button>

          <button
            type="button"
            onClick={onOpenGuestDrawer}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-burgundy to-burgundy-soft px-3.5 py-1.5 text-xs font-medium text-ivory shadow-md transition hover:brightness-110"
          >
            <FileSpreadsheet className="h-3.5 w-3.5 text-gold-light" />
            <span className="max-w-[110px] truncate sm:max-w-[150px]">
              Khách mời ({guestCount})
            </span>
            <Sparkles className="hidden h-3 w-3 text-gold-light sm:inline" />
          </button>
        </div>
      </div>

      {/* Subtle personalized guest strip when scrolled on mobile */}
      {scrolled && (
        <div className="border-t border-gold/15 bg-champagne/65 px-4 py-1 text-center text-[11px] text-taupe sm:hidden">
          Đang xem thiệp mời gửi tới:{' '}
          <strong className="text-burgundy">
            {activeGuest.title} {activeGuest.name}
          </strong>
        </div>
      )}
    </header>
  );
};
