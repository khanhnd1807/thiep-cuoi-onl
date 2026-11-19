import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { COUPLE_INFO } from '../data/weddingData';
import { triggerCelebrationBurst } from './CursorMagic';
import { FloralDivider } from './FloralOrnament';
import { Tilt3DCard } from './Tilt3DCard';

export const CoupleSection: React.FC = () => {
  const { groom, bride } = COUPLE_INFO;

  return (
    <section id="couple" className="relative overflow-hidden bg-champagne/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75 }}
          className="text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.34em] text-gold-dark">
            Nhân Vật Chính
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-espresso sm:text-5xl">
            Chú Rể &amp; Cô Dâu
          </h2>
          <FloralDivider className="my-5" />
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-taupe sm:text-base">
            Rê chuột lên thẻ của Chú Rể &amp; Cô Dâu để cảm nhận hiệu ứng nghiêng 3D ánh
            kim và chạm để thả tim chúc mừng.
          </p>
        </motion.div>

        <div className="mt-14 grid items-stretch gap-8 md:grid-cols-2 lg:gap-12">
          {/* Groom 3D Tilt Card */}
          <motion.div
            initial={{ opacity: 0, x: -45, rotateY: -12 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <Tilt3DCard
              intensity={9}
              className="flex h-full flex-col items-center rounded-[2rem] border border-gold/40 bg-ivory p-7 text-center shadow-editorial sm:p-10"
            >
              {/* Floating Romantic Badge */}
              <motion.span
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute right-6 top-6 inline-flex items-center gap-1 rounded-full border border-gold/40 bg-champagne px-3 py-1 text-[10px] font-semibold text-burgundy shadow-sm"
              >
                <Sparkles className="h-3 w-3 text-gold-dark" />
                <span>Chú Rể • {groom.role}</span>
              </motion.span>

              {/* Arch Photo Frame with Rotating Dashed Halo */}
              <div className="relative mb-7 mt-4 w-full max-w-[260px]">
                <div className="absolute -inset-2.5 rounded-t-[999px] rounded-b-3xl border border-dashed border-gold/60 transition duration-500 group-hover:scale-105 group-hover:border-burgundy/60" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-2xl bg-linen shadow-lg">
                  <img
                    src={groom.portrait}
                    alt={groom.fullName}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>
                <button
                  type="button"
                  onClick={(e) => triggerCelebrationBurst(e.clientX, e.clientY, 40)}
                  className="absolute -bottom-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-gold-light/50 bg-burgundy px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-light shadow-md transition hover:scale-105"
                >
                  <Heart className="h-3 w-3 fill-current" />
                  <span>Thả tim Chú Rể</span>
                </button>
              </div>

              <h3 className="mt-2 font-script text-4xl text-burgundy sm:text-5xl">
                {groom.firstName}
              </h3>
              <p className="mt-1 font-serif text-lg font-semibold tracking-wide text-espresso">
                {groom.fullName}
              </p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-taupe">
                {groom.bio}
              </p>

              <div className="mt-6 w-full border-t border-gold/25 pt-5 text-xs text-taupe">
                <p className="uppercase tracking-[0.24em] text-gold-dark">Gia Đình Nhà Trai</p>
                <p className="mt-1.5 font-semibold text-espresso">
                  {groom.father} &amp; {groom.mother}
                </p>
                <p className="mt-0.5 text-taupe/85">{groom.address}</p>
              </div>
            </Tilt3DCard>
          </motion.div>

          {/* Bride 3D Tilt Card */}
          <motion.div
            initial={{ opacity: 0, x: 45, rotateY: 12 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <Tilt3DCard
              intensity={9}
              className="flex h-full flex-col items-center rounded-[2rem] border border-gold/40 bg-ivory p-7 text-center shadow-editorial sm:p-10"
            >
              {/* Floating Romantic Badge */}
              <motion.span
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 3.2,
                  delay: 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute right-6 top-6 inline-flex items-center gap-1 rounded-full border border-gold/40 bg-champagne px-3 py-1 text-[10px] font-semibold text-burgundy shadow-sm"
              >
                <Sparkles className="h-3 w-3 text-gold-dark" />
                <span>Cô Dâu • {bride.role}</span>
              </motion.span>

              {/* Arch Photo Frame */}
              <div className="relative mb-7 mt-4 w-full max-w-[260px]">
                <div className="absolute -inset-2.5 rounded-t-[999px] rounded-b-3xl border border-dashed border-gold/60 transition duration-500 group-hover:scale-105 group-hover:border-burgundy/60" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-2xl bg-linen shadow-lg">
                  <img
                    src={bride.portrait}
                    alt={bride.fullName}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>
                <button
                  type="button"
                  onClick={(e) => triggerCelebrationBurst(e.clientX, e.clientY, 40)}
                  className="absolute -bottom-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-gold-light/50 bg-burgundy px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-light shadow-md transition hover:scale-105"
                >
                  <Heart className="h-3 w-3 fill-current" />
                  <span>Thả tim Cô Dâu</span>
                </button>
              </div>

              <h3 className="mt-2 font-script text-4xl text-burgundy sm:text-5xl">
                {bride.firstName}
              </h3>
              <p className="mt-1 font-serif text-lg font-semibold tracking-wide text-espresso">
                {bride.fullName}
              </p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-taupe">
                {bride.bio}
              </p>

              <div className="mt-6 w-full border-t border-gold/25 pt-5 text-xs text-taupe">
                <p className="uppercase tracking-[0.24em] text-gold-dark">Gia Đình Nhà Gái</p>
                <p className="mt-1.5 font-semibold text-espresso">
                  {bride.father} &amp; {bride.mother}
                </p>
                <p className="mt-0.5 text-taupe/85">{bride.address}</p>
              </div>
            </Tilt3DCard>
          </motion.div>
        </div>

        {/* Animated Beating Heart Thread Emblem */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex items-center justify-center gap-4 text-gold-dark"
        >
          <span className="h-px w-24 bg-gradient-to-r from-transparent to-gold" />
          <motion.button
            type="button"
            onClick={(e) => triggerCelebrationBurst(e.clientX, e.clientY, 60)}
            animate={{ scale: [1, 1.18, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-ivory shadow-md"
          >
            <Heart className="h-5 w-5 fill-burgundy text-burgundy" />
          </motion.button>
          <span className="h-px w-24 bg-gradient-to-l from-transparent to-gold" />
        </motion.div>
      </div>
    </section>
  );
};
