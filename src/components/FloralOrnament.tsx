import React from 'react';
import { motion } from 'framer-motion';

interface FloralDividerProps {
  className?: string;
  light?: boolean;
}

export const FloralDivider: React.FC<FloralDividerProps> = ({
  className = '',
  light = false,
}) => {
  const strokeColor = light ? '#E7CFAF' : '#C49A6C';

  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <motion.span
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 0.75 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ backgroundColor: strokeColor }}
        className="h-[1px] w-16 origin-right sm:w-20"
      />
      <motion.svg
        width="36"
        height="24"
        viewBox="0 0 36 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.25, duration: 0.6, ease: 'easeOut' }}
      >
        <circle cx="4" cy="12" r="2" fill={strokeColor} fillOpacity="0.85" />
        <path
          d="M18 3C20.4 7.2 23.2 9.6 27.5 12C23.2 14.4 20.4 16.8 18 21C15.6 16.8 12.8 14.4 8.5 12C12.8 9.6 15.6 7.2 18 3Z"
          stroke={strokeColor}
          strokeWidth="1.15"
          fill={light ? 'rgba(231, 207, 175, 0.22)' : 'rgba(196, 154, 108, 0.18)'}
        />
        <circle cx="32" cy="12" r="2" fill={strokeColor} fillOpacity="0.85" />
      </motion.svg>
      <motion.span
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 0.75 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ backgroundColor: strokeColor }}
        className="h-[1px] w-16 origin-left sm:w-20"
      />
    </div>
  );
};

export const CornerFlourish: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${className}`}
  >
    <path
      d="M4 60V16C4 9.373 9.373 4 16 4H60"
      stroke="#C49A6C"
      strokeWidth="1.2"
      strokeOpacity="0.65"
    />
    <path
      d="M12 52V20C12 15.582 15.582 12 20 12H52"
      stroke="#C49A6C"
      strokeWidth="0.7"
      strokeOpacity="0.45"
    />
    <circle cx="12" cy="12" r="2.2" fill="#C49A6C" fillOpacity="0.65" />
  </svg>
);
