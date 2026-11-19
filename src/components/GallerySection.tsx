import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Expand, Film, X } from 'lucide-react';
import { GALLERY_PHOTOS } from '../data/weddingData';
import { FloralDivider } from './FloralOrnament';
import { Tilt3DCard } from './Tilt3DCard';

export const GallerySection: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) =>
          prev === null ? null : (prev + 1) % GALLERY_PHOTOS.length
        );
      }
      if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedIndex]);

  const activePhoto = selectedIndex !== null ? GALLERY_PHOTOS[selectedIndex] : null;
  const marqueePhotos = [...GALLERY_PHOTOS, ...GALLERY_PHOTOS];

  return (
    <section id="gallery" className="paper-texture relative overflow-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75 }}
          className="text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.34em] text-gold-dark">
            Pre-Wedding Cinema &amp; Album
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-espresso sm:text-5xl">
            Thước Phim Khoảnh Khắc Hạnh Phúc
          </h2>
          <FloralDivider className="my-5" />
          <p className="mx-auto max-w-xl text-sm text-taupe sm:text-base">
            Dải phim kỷ niệm tự động trôi mượt mà — chạm vào bất kỳ bức ảnh nào để phóng
            to toàn màn hình.
          </p>
        </motion.div>
      </div>

      {/* Infinite Smooth Gliding 3D Filmstrip Marquee */}
      <div className="relative mt-10 w-full overflow-hidden py-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ivory to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ivory to-transparent sm:w-28" />

        <div className="animate-marquee flex w-max gap-5 px-4 hover:[animation-play-state:paused]">
          {marqueePhotos.map((photo, idx) => (
            <button
              type="button"
              key={`marquee-${photo.id}-${idx}`}
              onClick={() => setSelectedIndex(idx % GALLERY_PHOTOS.length)}
              className="group relative h-52 w-72 shrink-0 overflow-hidden rounded-2xl border-2 border-gold/35 bg-espresso p-1.5 shadow-editorial transition duration-500 hover:-translate-y-2 hover:rotate-1 hover:border-burgundy sm:h-60 sm:w-80"
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="h-full w-full rounded-xl object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/75 via-transparent to-transparent p-4 opacity-0 transition duration-300 group-hover:opacity-100">
                <div className="flex items-center gap-2 text-left text-xs text-ivory">
                  <Film className="h-3.5 w-3.5 shrink-0 text-gold-light" />
                  <span className="line-clamp-1 font-serif italic">{photo.caption}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Editorial 3D Masonry Grid */}
      <div className="mx-auto mt-10 max-w-6xl px-4 sm:px-6">
        <div className="columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-3">
          {GALLERY_PHOTOS.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 32, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{
                duration: 0.7,
                delay: (index % 3) * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="break-inside-avoid"
            >
              <Tilt3DCard intensity={7} className="overflow-hidden rounded-2xl">
                <button
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  className="group relative block w-full overflow-hidden rounded-2xl border border-gold/35 bg-linen text-left shadow-card focus:outline-none"
                >
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    loading="lazy"
                    className={`w-full object-cover transition duration-700 group-hover:scale-110 ${
                      photo.aspect === 'tall'
                        ? 'aspect-[3/4]'
                        : photo.aspect === 'wide'
                          ? 'aspect-[4/3]'
                          : 'aspect-square'
                    }`}
                  />
                  <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-espresso/85 via-espresso/15 to-transparent p-5 opacity-0 transition duration-400 group-hover:opacity-100">
                    <div className="flex justify-end">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-light/40 bg-black/35 text-ivory backdrop-blur-md">
                        <Expand className="h-4 w-4" />
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.24em] text-gold-light">
                        Moment 0{index + 1}
                      </span>
                      <p className="mt-0.5 font-serif text-lg italic text-ivory">
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                </button>
              </Tilt3DCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Smooth Animated Lightbox */}
      <AnimatePresence>
        {activePhoto && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          >
            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              aria-label="Đóng ảnh"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-white/25"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              type="button"
              aria-label="Ảnh trước"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(
                  (selectedIndex - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length
                );
              }}
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/25 sm:left-6"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <motion.div
              key={activePhoto.id}
              initial={{ opacity: 0, scale: 0.9, rotateY: -8 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateY: 8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[88vh] max-w-4xl flex-col items-center"
            >
              <img
                src={activePhoto.url}
                alt={activePhoto.caption}
                className="max-h-[76vh] w-auto rounded-2xl object-contain shadow-2xl ring-1 ring-gold/40"
              />
              <div className="mt-4 text-center">
                <p className="font-serif text-lg italic text-champagne">
                  {activePhoto.caption}
                </p>
                <p className="mt-1 text-xs tracking-widest text-gold-light/75">
                  {selectedIndex + 1} / {GALLERY_PHOTOS.length}
                </p>
              </div>
            </motion.div>

            <button
              type="button"
              aria-label="Ảnh tiếp theo"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((selectedIndex + 1) % GALLERY_PHOTOS.length);
              }}
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/25 sm:right-6"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
