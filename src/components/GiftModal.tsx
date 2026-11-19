import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Copy, Gift, X } from 'lucide-react';
import { COUPLE_INFO } from '../data/weddingData';

interface GiftModalProps {
  open: boolean;
  onClose: () => void;
}

const DecorativeQr: React.FC<{ label: string }> = ({ label }) => (
  <div className="mx-auto flex h-32 w-32 flex-col items-center justify-center rounded-2xl border border-gold/40 bg-white p-2.5 shadow-inner">
    <svg viewBox="0 0 80 80" className="h-full w-full text-espresso">
      <rect x="4" y="4" width="22" height="22" rx="3" fill="none" stroke="currentColor" strokeWidth="4" />
      <rect x="10" y="10" width="10" height="10" rx="1" fill="currentColor" />
      <rect x="54" y="4" width="22" height="22" rx="3" fill="none" stroke="currentColor" strokeWidth="4" />
      <rect x="60" y="10" width="10" height="10" rx="1" fill="currentColor" />
      <rect x="4" y="54" width="22" height="22" rx="3" fill="none" stroke="currentColor" strokeWidth="4" />
      <rect x="10" y="60" width="10" height="10" rx="1" fill="currentColor" />
      <rect x="34" y="10" width="6" height="6" fill="currentColor" />
      <rect x="42" y="18" width="6" height="6" fill="currentColor" />
      <rect x="34" y="34" width="12" height="12" rx="2" fill="#6E1E2B" />
      <rect x="14" y="36" width="6" height="6" fill="currentColor" />
      <rect x="24" y="42" width="6" height="6" fill="currentColor" />
      <rect x="52" y="36" width="6" height="6" fill="currentColor" />
      <rect x="64" y="34" width="8" height="6" fill="currentColor" />
      <rect x="36" y="54" width="8" height="6" fill="currentColor" />
      <rect x="50" y="52" width="6" height="12" fill="currentColor" />
      <rect x="62" y="56" width="10" height="6" fill="currentColor" />
      <rect x="38" y="66" width="10" height="8" fill="currentColor" />
      <rect x="58" y="68" width="14" height="6" fill="currentColor" />
    </svg>
    <span className="mt-1 text-[9px] font-semibold uppercase tracking-widest text-burgundy">
      {label}
    </span>
  </div>
);

export const GiftModal: React.FC<GiftModalProps> = ({ open, onClose }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (id: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value.replace(/\s+/g, ''));
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback ignored
    }
  };

  const accounts = [
    { id: 'groom', title: 'Mừng cưới đến Chú Rể', ...COUPLE_INFO.groom.bank },
    { id: 'bride', title: 'Mừng cưới đến Cô Dâu', ...COUPLE_INFO.bride.bank },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-espresso/75 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-gold/40 bg-ivory p-6 shadow-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 text-taupe transition hover:border-burgundy hover:text-burgundy"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-burgundy/10 text-burgundy">
                <Gift className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-serif text-3xl font-semibold text-burgundy">
                Hộp Mừng Cưới
              </h3>
              <p className="mx-auto mt-1.5 max-w-md text-xs leading-relaxed text-taupe sm:text-sm">
                Cảm ơn tình cảm yêu thương của bạn. Sự hiện diện của bạn trong ngày vui là
                món quà ý nghĩa nhất đối với chúng mình.
              </p>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {accounts.map((acc) => (
                <div
                  key={acc.id}
                  className="rounded-2xl border border-gold/35 bg-champagne/55 p-5 text-center"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-burgundy">
                    {acc.title}
                  </p>
                  <div className="my-4">
                    <DecorativeQr label={acc.bankName} />
                  </div>
                  <p className="text-xs font-medium text-taupe">{acc.bankName}</p>
                  <p className="mt-0.5 font-serif text-lg font-semibold text-espresso">
                    {acc.accountName}
                  </p>
                  <p className="mt-1 font-mono text-sm font-semibold tracking-wider text-burgundy">
                    {acc.accountNumber}
                  </p>
                  <p className="mt-0.5 text-[11px] text-taupe">{acc.branch}</p>

                  <button
                    type="button"
                    onClick={() => handleCopy(acc.id, acc.accountNumber)}
                    className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-burgundy/35 bg-ivory px-3 py-2 text-xs font-medium text-burgundy transition hover:bg-burgundy hover:text-ivory"
                  >
                    {copiedId === acc.id ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span>Đã sao chép STK</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Sao chép số tài khoản</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
