import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Heart, Send, Sparkles, Users } from 'lucide-react';
import { Guest, Wish } from '../types/wedding';
import { formatGuestDisplay } from '../utils/urlGuest';
import { FloralDivider } from './FloralOrnament';

interface RsvpWishesSectionProps {
  activeGuest: Guest;
  wishes: Wish[];
  onAddWish: (wish: Wish) => void;
}

export const RsvpWishesSection: React.FC<RsvpWishesSectionProps> = ({
  activeGuest,
  wishes,
  onAddWish,
}) => {
  const [name, setName] = useState(formatGuestDisplay(activeGuest));
  const [side, setSide] = useState<Wish['side']>('Nhà trai');
  const [attending, setAttending] = useState<Wish['attending']>('yes');
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Sync guest name automatically whenever user switches guest from Excel list
  useEffect(() => {
    setName(formatGuestDisplay(activeGuest));
    if (activeGuest.group.toLowerCase().includes('gái')) {
      setSide('Nhà gái');
    } else if (activeGuest.group.toLowerCase().includes('trai')) {
      setSide('Nhà trai');
    } else {
      setSide('Bạn chung');
    }
  }, [activeGuest]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newWish: Wish = {
      id: `wish-${Date.now()}`,
      name: name.trim(),
      side,
      attending,
      guestCount: attending === 'yes' ? guestCount : 0,
      message:
        message.trim() ||
        'Chúc mừng Ngọc Lâm & Việt Dũng trăm năm hạnh phúc, luôn yêu thương và đồng hành bên nhau!',
      createdAt: 'Vừa xong',
    };

    onAddWish(newWish);
    setMessage('');
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 3800);
  };

  return (
    <section id="rsvp" className="relative bg-champagne/70 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75 }}
          className="text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.34em] text-gold-dark">
            RSVP &amp; Guestbook
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-espresso sm:text-5xl">
            Xác Nhận Tham Dự &amp; Gửi Lời Chúc
          </h2>
          <FloralDivider className="my-5" />
          <p className="mx-auto max-w-xl text-sm text-taupe sm:text-base">
            Sự hiện diện và những lời chúc phúc của bạn là món quà trân quý nhất đối với
            Ngọc Lâm &amp; Việt Dũng.
          </p>
        </motion.div>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-12">
          {/* Left: RSVP Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl border border-gold/35 bg-ivory p-6 shadow-editorial sm:p-8 lg:col-span-5"
          >
            <h3 className="font-serif text-2xl font-semibold text-burgundy">
              Phản Hồi Tham Dự
            </h3>
            <p className="mt-1 text-xs text-taupe">
              Tên khách mời đã được điền sẵn theo thiệp của bạn.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-taupe">
                  Tên của bạn
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nhập tên khách mời..."
                  className="w-full rounded-xl border border-gold/35 bg-champagne/40 px-4 py-2.5 text-sm text-espresso outline-none transition focus:border-burgundy focus:bg-ivory"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-taupe">
                  Bạn là khách của
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Nhà trai', 'Nhà gái', 'Bạn chung'] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSide(option)}
                      className={`rounded-xl border px-3 py-2 text-xs font-medium transition ${
                        side === option
                          ? 'border-burgundy bg-burgundy text-ivory shadow-sm'
                          : 'border-gold/35 bg-ivory text-taupe hover:border-gold'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-taupe">
                  Bạn sẽ tham dự chứ?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAttending('yes')}
                    className={`rounded-xl border px-3 py-2.5 text-xs font-medium transition ${
                      attending === 'yes'
                        ? 'border-burgundy bg-burgundy/10 text-burgundy ring-1 ring-burgundy'
                        : 'border-gold/35 bg-ivory text-taupe hover:border-gold'
                    }`}
                  >
                    Chắc chắn sẽ đến
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttending('no')}
                    className={`rounded-xl border px-3 py-2.5 text-xs font-medium transition ${
                      attending === 'no'
                        ? 'border-burgundy bg-burgundy/10 text-burgundy ring-1 ring-burgundy'
                        : 'border-gold/35 bg-ivory text-taupe hover:border-gold'
                    }`}
                  >
                    Rất tiếc bận việc
                  </button>
                </div>
              </div>

              {attending === 'yes' && (
                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-taupe">
                    <Users className="h-3.5 w-3.5 text-gold-dark" />
                    <span>Số lượng người tham dự</span>
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full rounded-xl border border-gold/35 bg-champagne/40 px-4 py-2.5 text-sm text-espresso outline-none transition focus:border-burgundy focus:bg-ivory"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n} khách
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-taupe">
                  Lời chúc gửi cặp đôi
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Viết vài dòng yêu thương gửi Ngọc Lâm & Việt Dũng..."
                  className="w-full resize-none rounded-xl border border-gold/35 bg-champagne/40 px-4 py-2.5 text-sm text-espresso outline-none transition focus:border-burgundy focus:bg-ivory"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-burgundy via-burgundy-soft to-burgundy px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-ivory shadow-lg transition hover:brightness-110"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Gửi xác nhận &amp; Lời chúc</span>
              </button>

              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="flex items-center gap-2 rounded-xl border border-sage/40 bg-sage/10 px-4 py-3 text-xs font-medium text-espresso"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-sage" />
                    <span>
                      Cảm ơn bạn thật nhiều! Lời chúc đã xuất hiện trên sổ lưu bút.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.form>

          {/* Right: Live Wishes Wall */}
          <div className="lg:col-span-7">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-gold-dark" />
                <h3 className="font-serif text-2xl font-semibold text-espresso">
                  Sổ Lưu Bút ({wishes.length})
                </h3>
              </div>
              <span className="text-xs text-taupe">Cập nhật trực tiếp</span>
            </div>

            <div className="max-h-[560px] space-y-4 overflow-y-auto pr-1">
              <AnimatePresence initial={false}>
                {wishes.map((wish) => (
                  <motion.div
                    key={wish.id}
                    layout
                    initial={{ opacity: 0, y: -16, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-2xl border border-gold/30 bg-ivory p-5 shadow-sm"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-burgundy/10 font-serif text-sm font-semibold text-burgundy">
                          {wish.name.charAt(0).toUpperCase()}
                        </span>
                        <div>
                          <p className="font-serif text-lg font-semibold text-espresso">
                            {wish.name}
                          </p>
                          <p className="text-[11px] text-taupe">
                            {wish.side} • {wish.createdAt}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-medium ${
                          wish.attending === 'yes'
                            ? 'bg-sage/15 text-sage'
                            : 'bg-gold/15 text-gold-dark'
                        }`}
                      >
                        <Heart className="h-3 w-3 fill-current" />
                        {wish.attending === 'yes'
                          ? `Tham dự (${wish.guestCount} khách)`
                          : 'Gửi lời chúc từ xa'}
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-espresso/85">
                      “{wish.message}”
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
