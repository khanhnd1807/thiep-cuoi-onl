import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { COUPLE_INFO, DEFAULT_GUESTS, DEFAULT_WISHES } from './data/weddingData';
import { Guest, Wish } from './types/wedding';
import { ambientPlayer } from './utils/ambientMusic';
import { getGuestFromUrl, syncGuestToUrl } from './utils/urlGuest';
import { CountdownSection } from './components/CountdownSection';
import { CoupleSection } from './components/CoupleSection';
import { CursorMagic, triggerCelebrationBurst } from './components/CursorMagic';
import { EnvelopeIntro } from './components/EnvelopeIntro';
import { EventDetailsSection } from './components/EventDetailsSection';
import { FloatingPetals } from './components/FloatingPetals';
import { FloatingReactions } from './components/FloatingReactions';
import { GallerySection } from './components/GallerySection';
import { GiftModal } from './components/GiftModal';
import { GuestExcelDrawer } from './components/GuestExcelDrawer';
import { HeroSection } from './components/HeroSection';
import { LoveStorySection } from './components/LoveStorySection';
import { MusicPlayer } from './components/MusicPlayer';
import { Navbar } from './components/Navbar';
import { RsvpWishesSection } from './components/RsvpWishesSection';

const STORAGE_GUESTS_KEY = 'wedding_invitation_guests_v1';
const STORAGE_WISHES_KEY = 'wedding_invitation_wishes_v1';

function loadStoredGuests(): Guest[] {
  try {
    const raw = localStorage.getItem(STORAGE_GUESTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Guest[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // ignore storage errors
  }
  return DEFAULT_GUESTS;
}

function loadStoredWishes(): Wish[] {
  try {
    const raw = localStorage.getItem(STORAGE_WISHES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Wish[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // ignore
  }
  return DEFAULT_WISHES;
}

export default function App() {
  const [guests, setGuests] = useState<Guest[]>(loadStoredGuests);
  const [activeGuest, setActiveGuest] = useState<Guest>(() => {
    const fromUrl = getGuestFromUrl();
    if (fromUrl) return fromUrl;
    const stored = loadStoredGuests();
    return stored[0] || DEFAULT_GUESTS[0];
  });
  const [wishes, setWishes] = useState<Wish[]>(loadStoredWishes);
  const [showEnvelope, setShowEnvelope] = useState(true);
  const [guestDrawerOpen, setGuestDrawerOpen] = useState(false);
  const [giftModalOpen, setGiftModalOpen] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_GUESTS_KEY, JSON.stringify(guests));
    } catch {
      // ignore
    }
  }, [guests]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_WISHES_KEY, JSON.stringify(wishes));
    } catch {
      // ignore
    }
  }, [wishes]);

  useEffect(() => {
    return () => ambientPlayer.stop();
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => {
      setToast((prev) => (prev === msg ? null : prev));
    }, 3400);
  };

  const handleOpenEnvelopeComplete = () => {
    setShowEnvelope(false);
    if (!musicPlaying) {
      const started = ambientPlayer.start();
      setMusicPlaying(started);
    }
  };

  const handleToggleMusic = () => {
    const playing = ambientPlayer.toggle();
    setMusicPlaying(playing);
  };

  const handleSelectGuest = (guest: Guest, replayEnvelope = false) => {
    setActiveGuest(guest);
    syncGuestToUrl(guest);
    if (replayEnvelope) {
      setShowEnvelope(true);
    } else {
      setShowEnvelope(false);
      triggerCelebrationBurst(window.innerWidth / 2, window.innerHeight * 0.35, 45);
    }
    showToast(`Đang hiển thị thiệp mời cho ${guest.title} ${guest.name}`);
  };

  const handleImportGuests = (imported: Guest[], replaceExisting: boolean) => {
    setGuests((prev) => (replaceExisting ? imported : [...imported, ...prev]));
    if (imported.length > 0) {
      setActiveGuest(imported[0]);
      syncGuestToUrl(imported[0]);
    }
  };

  const handleAddManualGuest = (guest: Guest) => {
    setGuests((prev) => [guest, ...prev]);
    setActiveGuest(guest);
    syncGuestToUrl(guest);
  };

  const handleDeleteGuest = (id: string) => {
    setGuests((prev) => {
      const next = prev.filter((g) => g.id !== id);
      if (next.length > 0 && activeGuest.id === id) {
        setActiveGuest(next[0]);
      }
      return next;
    });
  };

  const handleAddWish = (wish: Wish) => {
    setWishes((prev) => [wish, ...prev]);
    triggerCelebrationBurst(window.innerWidth / 2, window.innerHeight / 2, 70);
  };

  return (
    <div className="relative min-h-screen bg-ivory text-espresso">
      {/* Interactive Cursor Stardust Trail & Click Firework Bursts */}
      <CursorMagic />

      {/* Ambient Floating Rose Petals & Gold Bokeh */}
      <FloatingPetals active={!showEnvelope} />

      {/* 3D Royal Gatefold Double-Door Opening Experience */}
      <EnvelopeIntro
        visible={showEnvelope}
        guest={activeGuest}
        onOpenComplete={handleOpenEnvelopeComplete}
        onOpenGuestDrawer={() => setGuestDrawerOpen(true)}
      />

      {/* Sticky Editorial Navbar */}
      <Navbar
        activeGuest={activeGuest}
        guestCount={guests.length}
        onOpenGuestDrawer={() => setGuestDrawerOpen(true)}
        onOpenGiftModal={() => setGiftModalOpen(true)}
        onReplayEnvelope={() => setShowEnvelope(true)}
      />

      {/* Main Wedding Invitation Sections */}
      <main>
        <HeroSection
          guest={activeGuest}
          onOpenGuestDrawer={() => setGuestDrawerOpen(true)}
        />
        <CountdownSection />
        <CoupleSection />
        <LoveStorySection />
        <EventDetailsSection
          guest={activeGuest}
          onOpenGuestDrawer={() => setGuestDrawerOpen(true)}
        />
        <GallerySection />
        <RsvpWishesSection
          activeGuest={activeGuest}
          wishes={wishes}
          onAddWish={handleAddWish}
        />
      </main>

      {/* Romantic Editorial Footer */}
      <footer className="relative overflow-hidden bg-espresso py-16 text-center text-ivory">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${COUPLE_INFO.secondaryBanner})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso via-espresso/90 to-espresso/80" />

        <div className="relative z-10 mx-auto max-w-2xl px-6">
          <p className="text-xs uppercase tracking-[0.34em] text-gold-light">
            Thank You For Being Part Of Our Story
          </p>
          <h2 className="gold-shimmer mt-4 font-script text-5xl sm:text-6xl">
            {COUPLE_INFO.groom.firstName} &amp; {COUPLE_INFO.bride.firstName}
          </h2>
          <p className="mt-3 font-serif text-xl italic text-gold-light">
            {COUPLE_INFO.displayDate}
          </p>
          <p className="mt-5 text-xs leading-relaxed text-champagne/75 sm:text-sm">
            Cảm ơn quý khách đã dành thời gian ghé thăm thiệp cưới online. Hẹn gặp bạn
            trong ngày hạnh phúc nhất của chúng mình!
          </p>

          <div className="mt-7 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setGiftModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-gold-light/50 bg-gold/15 px-6 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-gold-light transition hover:bg-gold hover:text-espresso"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Gửi quà mừng cưới</span>
            </button>
          </div>

          <div className="mt-10 flex items-center justify-center gap-2 text-[11px] text-champagne/55">
            <span>Made with</span>
            <Heart className="h-3 w-3 fill-burgundy-soft text-burgundy-soft" />
            <span>for Minh Quân &amp; Thảo Linh</span>
          </div>
        </div>
      </footer>

      {/* Floating Interactive Heart & Flower Reaction Cannon (Bottom-Left) */}
      {!showEnvelope && <FloatingReactions />}

      {/* Floating Vinyl Music Player (Bottom-Right) */}
      {!showEnvelope && (
        <MusicPlayer playing={musicPlaying} onToggle={handleToggleMusic} />
      )}

      {/* Guest Manager & Excel Import Drawer */}
      <GuestExcelDrawer
        open={guestDrawerOpen}
        guests={guests}
        activeGuest={activeGuest}
        onClose={() => setGuestDrawerOpen(false)}
        onSelectGuest={handleSelectGuest}
        onImportGuests={handleImportGuests}
        onAddManualGuest={handleAddManualGuest}
        onDeleteGuest={handleDeleteGuest}
        onNotify={showToast}
      />

      {/* Wedding Gift Modal */}
      <GiftModal open={giftModalOpen} onClose={() => setGiftModalOpen(false)} />

      {/* Elegant Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-full border border-gold/40 bg-espresso/95 px-5 py-2.5 text-xs font-medium text-champagne shadow-2xl backdrop-blur-md"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
