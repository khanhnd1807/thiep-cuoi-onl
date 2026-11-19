import React from 'react';
import { motion } from 'framer-motion';
import { Music, VolumeX } from 'lucide-react';

interface MusicPlayerProps {
  playing: boolean;
  onToggle: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ playing, onToggle }) => {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.94 }}
      title={playing ? 'Tắt nhạc nền' : 'Bật nhạc nền lãng mạn'}
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 rounded-full border border-gold/50 bg-espresso/90 p-2 pr-4 text-ivory shadow-xl backdrop-blur-md transition hover:border-gold-light"
    >
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-full border border-gold-light/50 bg-gradient-to-br from-burgundy to-burgundy-deep text-gold-light ${
          playing ? 'animate-spin-slow' : ''
        }`}
      >
        {playing ? <Music className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      </span>
      <span className="hidden text-left sm:block">
        <span className="block text-[10px] uppercase tracking-[0.2em] text-gold-light">
          {playing ? 'Đang phát' : 'Nhạc nền'}
        </span>
        <span className="block text-xs font-medium text-ivory/90">
          {playing ? 'Canon Serenade' : 'Chạm để nghe'}
        </span>
      </span>
    </motion.button>
  );
};
