import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { triggerCelebrationBurst } from './CursorMagic';

interface FloatingHeart {
  id: number;
  emoji: string;
  offsetX: number;
  driftX: number;
  scale: number;
  duration: number;
}

const EMOJIS = ['❤️', '💖', '🥂', '🌹', '✨', '💍', '💐', '💕'];

export const FloatingReactions: React.FC = () => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [totalLikes, setTotalLikes] = useState(1286);
  const [combo, setCombo] = useState(0);
  const comboTimeoutRef = useRef<number | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const handleTrigger = () => {
    setTotalLikes((c) => c + 1);
    setCombo((c) => c + 1);

    if (comboTimeoutRef.current) {
      window.clearTimeout(comboTimeoutRef.current);
    }
    comboTimeoutRef.current = window.setTimeout(() => {
      setCombo(0);
    }, 1500);

    // Spawn 3 floating emojis per click
    const now = Date.now() + Math.random();
    const batch: FloatingHeart[] = Array.from({ length: 3 }, (_, idx) => ({
      id: now + idx,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      offsetX: (Math.random() - 0.5) * 44,
      driftX: (Math.random() - 0.5) * 120,
      scale: 0.85 + Math.random() * 0.65,
      duration: 1.8 + Math.random() * 0.9,
    }));

    setHearts((prev) => [...prev.slice(-24), ...batch]);

    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      triggerCelebrationBurst(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
        28
      );
    }
  };

  return (
    <div className="fixed bottom-5 left-5 z-40 flex flex-col items-start">
      {/* Floating Emoji Fountain */}
      <div className="pointer-events-none relative h-0 w-16">
        <AnimatePresence>
          {hearts.map((h) => (
            <motion.span
              key={h.id}
              initial={{
                opacity: 1,
                y: -10,
                x: h.offsetX,
                scale: 0.4,
              }}
              animate={{
                opacity: [1, 1, 0],
                y: -240 - Math.random() * 80,
                x: h.offsetX + h.driftX,
                scale: h.scale,
                rotate: (Math.random() - 0.5) * 45,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: h.duration, ease: 'easeOut' }}
              onAnimationComplete={() => {
                setHearts((prev) => prev.filter((item) => item.id !== h.id));
              }}
              className="absolute bottom-2 left-4 select-none text-2xl drop-shadow-md"
            >
              {h.emoji}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      {/* Combo Badge */}
      <AnimatePresence>
        {combo > 1 && (
          <motion.div
            key={combo}
            initial={{ opacity: 0, y: 10, scale: 0.7 }}
            animate={{ opacity: 1, y: -8, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="mb-1.5 flex items-center gap-1 rounded-full bg-gradient-to-r from-burgundy via-rose-600 to-gold px-3 py-0.5 text-[11px] font-bold text-ivory shadow-lg"
          >
            <Sparkles className="h-3 w-3" />
            <span>Tung hoa x{combo}!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Trigger Pill */}
      <motion.button
        ref={btnRef}
        type="button"
        onClick={handleTrigger}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.88 }}
        className="group relative flex items-center gap-2.5 rounded-full border border-gold/55 bg-espresso/90 p-2 pr-4 text-ivory shadow-[0_12px_30px_rgba(110,30,43,0.45)] backdrop-blur-md transition hover:border-gold-light"
      >
        <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 via-burgundy to-burgundy-deep text-white shadow-inner">
          <span className="absolute -inset-1 animate-ping rounded-full bg-rose-400/35 [animation-duration:2.2s]" />
          <Heart className="h-4 w-4 fill-current transition-transform duration-200 group-hover:scale-125" />
        </span>
        <span className="text-left">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-light">
            Thả tim chúc phúc
          </span>
          <span className="block text-xs font-medium text-ivory/95">
            {totalLikes.toLocaleString('vi-VN')} lượt yêu thích
          </span>
        </span>
      </motion.button>
    </div>
  );
};
