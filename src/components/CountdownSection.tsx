import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { COUPLE_INFO, WEDDING_DATE_ISO } from '../data/weddingData';
import { FloralDivider } from './FloralOrnament';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const target = new Date(WEDDING_DATE_ISO).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const TimeDigitCard: React.FC<{ value: number; label: string }> = ({ value, label }) => {
  const formatted = String(value).padStart(2, '0');
  return (
    <div className="flex flex-col items-center rounded-2xl border border-gold/30 bg-ivory/95 px-4 py-5 shadow-card sm:px-6 sm:py-6">
      <div className="relative h-12 w-16 overflow-hidden text-center sm:h-14 sm:w-20">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={formatted}
            initial={{ y: 26, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -26, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center font-serif text-4xl font-semibold text-burgundy sm:text-5xl"
          >
            {formatted}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-1 text-[11px] font-medium uppercase tracking-[0.22em] text-taupe">
        {label}
      </span>
    </div>
  );
};

// December 2026 starts on Tuesday (index 1 in Mon..Sun grid)
const DEC_2026_DAYS: (number | null)[] = [
  null,
  ...Array.from({ length: 31 }, (_, i) => i + 1),
  null,
  null,
  null,
];
const WEEKDAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

export const CountdownSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft());

  useEffect(() => {
    const id = window.setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="countdown"
      className="paper-texture relative overflow-hidden py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Quote Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.34em] text-gold-dark">
            Đếm Ngược Ngày Hạnh Phúc
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-espresso sm:text-4xl">
            Cùng Chờ Đón Khoảnh Khắc Thiêng Liêng
          </h2>
          <FloralDivider className="my-5" />
          <p className="font-serif text-lg italic leading-relaxed text-taupe sm:text-xl">
            {COUPLE_INFO.quote}
          </p>
        </motion.div>

        {/* Countdown + Mini Calendar Split */}
        <div className="mt-14 grid items-center gap-8 lg:grid-cols-12">
          {/* Countdown digits */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="grid grid-cols-4 gap-3 sm:gap-4">
              <TimeDigitCard value={timeLeft.days} label="Ngày" />
              <TimeDigitCard value={timeLeft.hours} label="Giờ" />
              <TimeDigitCard value={timeLeft.minutes} label="Phút" />
              <TimeDigitCard value={timeLeft.seconds} label="Giây" />
            </div>

            <div className="mt-6 rounded-2xl border border-gold/25 bg-champagne/75 p-5 text-center sm:flex sm:items-center sm:justify-between sm:text-left">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-gold-dark">
                  Ngày Trọng Đại
                </p>
                <p className="mt-1 font-serif text-xl font-semibold text-burgundy">
                  {COUPLE_INFO.fullVietnameseDate}
                </p>
                <p className="text-xs text-taupe">{COUPLE_INFO.lunarDate}</p>
              </div>
              <a
                href="#events"
                className="mt-4 inline-flex items-center justify-center rounded-full border border-burgundy/40 px-5 py-2 text-xs font-medium uppercase tracking-widest text-burgundy transition hover:bg-burgundy hover:text-ivory sm:mt-0"
              >
                Chi tiết tiệc
              </a>
            </div>
          </motion.div>

          {/* Animated Calendar Card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl border border-gold/35 bg-ivory p-6 shadow-editorial lg:col-span-5"
          >
            <div className="mb-4 flex items-center justify-between border-b border-gold/20 pb-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.26em] text-gold-dark">
                  Save The Date
                </p>
                <h3 className="font-serif text-2xl font-semibold text-burgundy">
                  Tháng 12, 2026
                </h3>
              </div>
              <span className="rounded-full bg-burgundy/10 px-3 py-1 font-serif text-sm font-semibold text-burgundy">
                20/12
              </span>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-medium text-taupe">
              {WEEKDAYS.map((day) => (
                <div key={day} className="py-1">
                  {day}
                </div>
              ))}
            </div>

            <div className="mt-1 grid grid-cols-7 gap-1 text-center text-xs">
              {DEC_2026_DAYS.map((day, idx) => {
                const isWeddingDay = day === 20;
                return (
                  <div
                    key={idx}
                    className="relative flex h-9 items-center justify-center"
                  >
                    {day && isWeddingDay ? (
                      <motion.div
                        animate={{ scale: [1, 1.12, 1] }}
                        transition={{
                          duration: 2.1,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className="relative flex h-9 w-9 items-center justify-center rounded-full bg-burgundy font-semibold text-ivory shadow-md"
                      >
                        <span>20</span>
                        <Heart className="absolute -right-1 -top-1 h-3.5 w-3.5 fill-gold text-gold" />
                      </motion.div>
                    ) : (
                      <span
                        className={
                          day ? 'text-espresso/80' : 'text-transparent select-none'
                        }
                      >
                        {day ?? '.'}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
