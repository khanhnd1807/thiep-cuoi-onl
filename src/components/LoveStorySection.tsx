import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { LOVE_STORY } from '../data/weddingData';
import { FloralDivider } from './FloralOrnament';

export const LoveStorySection: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 80%'],
  });
  const lineScaleY = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
  });

  return (
    <section id="story" className="paper-texture relative overflow-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75 }}
          className="text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.34em] text-gold-dark">
            Our Love Story
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-espresso sm:text-5xl">
            Hành Trình Yêu Thương
          </h2>
          <FloralDivider className="my-5" />
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-taupe sm:text-base">
            Hơn 1.800 ngày bên nhau với biết bao kỷ niệm — từ cơn mưa thu bất chợt đến
            ngày nắm tay nhau bước vào lễ đường.
          </p>
        </motion.div>

        {/* Scroll-animated Vertical Timeline */}
        <div ref={timelineRef} className="relative mt-16">
          {/* Background track */}
          <div className="absolute bottom-4 left-4 top-4 w-[2px] bg-gold/20 md:left-1/2 md:-translate-x-1/2" />
          {/* Active growing gold line */}
          <motion.div
            style={{ scaleY: lineScaleY }}
            className="absolute bottom-4 left-4 top-4 w-[2px] origin-top bg-gradient-to-b from-burgundy via-gold to-burgundy md:left-1/2 md:-translate-x-1/2"
          />

          <div className="space-y-14 sm:space-y-20">
            {LOVE_STORY.map((item, index) => {
              const isReversed = index % 2 === 1;
              return (
                <div
                  key={item.id}
                  className="relative grid items-center gap-6 pl-12 md:grid-cols-2 md:gap-12 md:pl-0"
                >
                  {/* Timeline Node Dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                    className="absolute left-[9px] top-6 z-10 flex h-4 w-4 items-center justify-center rounded-full border-2 border-burgundy bg-ivory shadow md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  </motion.div>

                  {/* Image Side */}
                  <motion.div
                    initial={{ opacity: 0, x: isReversed ? 32 : -32 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className={isReversed ? 'md:order-2' : 'md:order-1'}
                  >
                    <div className="group relative overflow-hidden rounded-3xl border border-gold/30 bg-ivory p-2.5 shadow-editorial">
                      <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-linen">
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                      </div>
                      <span className="absolute left-5 top-5 rounded-full border border-gold-light/50 bg-espresso/75 px-3.5 py-1 text-[11px] font-medium tracking-wider text-gold-light backdrop-blur-sm">
                        {item.date}
                      </span>
                    </div>
                  </motion.div>

                  {/* Text Side */}
                  <motion.div
                    initial={{ opacity: 0, x: isReversed ? -32 : 32 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className={`${
                      isReversed ? 'md:order-1 md:text-right' : 'md:order-2 md:text-left'
                    }`}
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.26em] text-gold-dark">
                      Chương 0{index + 1}
                    </span>
                    <h3 className="mt-2 font-serif text-2xl font-semibold text-burgundy sm:text-3xl">
                      {item.title}
                    </h3>
                    <p className="mt-1 font-serif text-base italic text-espresso/80">
                      {item.subtitle}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-taupe sm:text-[15px]">
                      {item.description}
                    </p>
                    <div
                      className={`mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-gold-dark ${
                        isReversed ? 'md:flex-row-reverse' : ''
                      }`}
                    >
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{item.location}</span>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
