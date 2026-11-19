import React from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  ExternalLink,
  Heart,
  MapPin,
  Shirt,
  Sparkles,
} from 'lucide-react';
import { COUPLE_INFO, WEDDING_EVENTS } from '../data/weddingData';
import { Guest } from '../types/wedding';
import { formatGuestDisplay } from '../utils/urlGuest';
import { triggerCelebrationBurst } from './CursorMagic';
import { CornerFlourish, FloralDivider } from './FloralOrnament';
import { Tilt3DCard } from './Tilt3DCard';

interface EventDetailsSectionProps {
  guest: Guest;
  onOpenGuestDrawer: () => void;
}

export const EventDetailsSection: React.FC<EventDetailsSectionProps> = ({
  guest,
  onOpenGuestDrawer,
}) => {
  return (
    <section id="events" className="relative bg-champagne/65 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Formal Personalized 3D Tilt Invitation Card */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl"
        >
          <Tilt3DCard
            intensity={7}
            className="relative overflow-hidden rounded-[2rem] border-2 border-gold/50 bg-ivory p-7 text-center shadow-editorial sm:p-12"
          >
            {/* Decorative Corner Flourishes */}
            <CornerFlourish className="absolute left-4 top-4 h-12 w-12 sm:h-16 sm:w-16" />
            <CornerFlourish className="absolute right-4 top-4 h-12 w-12 rotate-90 sm:h-16 sm:w-16" />
            <CornerFlourish className="absolute bottom-4 left-4 h-12 w-12 -rotate-90 sm:h-16 sm:w-16" />
            <CornerFlourish className="absolute bottom-4 right-4 h-12 w-12 rotate-180 sm:h-16 sm:w-16" />

            <div className="relative z-10 py-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.38em] text-gold-dark">
                Thiệp Mời Chính Thức • 3D Interactive Card
              </p>
              <h2 className="mt-3 font-serif text-2xl font-semibold text-espresso sm:text-3xl">
                TRÂN TRỌNG KÍNH MỜI
              </h2>

              {/* Dynamic Guest Name Badge */}
              <motion.div
                key={`${guest.id}-${guest.name}`}
                initial={{ opacity: 0, scale: 0.88, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="mx-auto mt-5 inline-flex flex-col items-center rounded-2xl border border-gold/50 bg-gradient-to-b from-champagne/90 to-champagne/40 px-8 py-4 shadow-inner"
              >
                <span className="font-serif text-2xl font-bold text-burgundy sm:text-3xl">
                  {formatGuestDisplay(guest)}
                </span>
                {guest.group && (
                  <span className="mt-1 text-[11px] uppercase tracking-[0.22em] text-taupe">
                    {guest.group}
                  </span>
                )}
              </motion.div>

              {guest.note && (
                <p className="mx-auto mt-4 max-w-lg font-serif text-base italic text-burgundy-soft">
                  “{guest.note}”
                </p>
              )}

              <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-taupe sm:text-base">
                Đến dự buổi tiệc chung vui lễ thành hôn của hai con chúng tôi
              </p>

              <div className="mt-5 font-script text-4xl text-burgundy sm:text-5xl">
                {COUPLE_INFO.groom.firstName}{' '}
                <span className="font-serif text-3xl italic text-gold-dark">&amp;</span>{' '}
                {COUPLE_INFO.bride.firstName}
              </div>

              <FloralDivider className="my-5" />

              <p className="font-serif text-xl font-semibold text-espresso">
                Vào lúc 11:00 — {COUPLE_INFO.fullVietnameseDate}
              </p>
              <p className="mt-1 text-xs text-taupe">({COUPLE_INFO.lunarDate})</p>
              <p className="mt-3 text-sm font-semibold text-burgundy">
                Tại Grand Ballroom — Khách sạn JW Marriott Hà Nội
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={onOpenGuestDrawer}
                  className="inline-flex items-center gap-1.5 rounded-full border border-gold/60 bg-ivory px-4 py-2 text-xs font-medium text-burgundy transition hover:border-burgundy hover:bg-burgundy hover:text-ivory"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Đổi tên khách mời / Import Excel</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => triggerCelebrationBurst(e.clientX, e.clientY, 65)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-burgundy px-4 py-2 text-xs font-medium text-ivory shadow transition hover:bg-burgundy-deep"
                >
                  <Heart className="h-3.5 w-3.5 fill-gold-light text-gold-light" />
                  <span>Tung hoa chúc mừng</span>
                </button>
              </div>
            </div>
          </Tilt3DCard>
        </motion.div>

        {/* Two Event Cards with 3D Tilt */}
        <div className="mt-14 grid gap-7 md:grid-cols-2">
          {WEDDING_EVENTS.map((ev, idx) => (
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.75, delay: idx * 0.12 }}
            >
              <Tilt3DCard
                intensity={6}
                className="flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-gold/35 bg-ivory p-7 shadow-card sm:p-9"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-burgundy/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-burgundy">
                      {ev.tag}
                    </span>
                    <span className="font-serif text-sm italic text-gold-dark">
                      {ev.lunarDate}
                    </span>
                  </div>

                  <h3 className="mt-4 font-serif text-2xl font-semibold text-espresso sm:text-3xl">
                    {ev.title}
                  </h3>

                  <div className="mt-5 space-y-3 text-sm text-taupe">
                    <div className="flex items-start gap-3">
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
                      <span className="font-medium text-espresso">{ev.time}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
                      <span>{ev.date}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
                      <div>
                        <p className="font-semibold text-burgundy">{ev.venue}</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-taupe">
                          {ev.address}
                        </p>
                      </div>
                    </div>
                    {ev.dressCode && (
                      <div className="flex items-start gap-3">
                        <Shirt className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
                        <span className="text-xs">
                          <strong className="text-espresso">Dress code:</strong>{' '}
                          {ev.dressCode}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-7 border-t border-gold/20 pt-5">
                  <a
                    href={ev.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-burgundy px-5 py-3 text-xs font-medium uppercase tracking-[0.2em] text-ivory transition hover:bg-burgundy-deep"
                  >
                    <span>Xem chỉ đường Google Maps</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </Tilt3DCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
