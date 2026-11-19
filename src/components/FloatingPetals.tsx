import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  swayAmp: number;
  swayFreq: number;
  angle: number;
  spin: number;
  opacity: number;
  kind: 'petal' | 'sparkle';
  color: string;
  phase: number;
}

const PETAL_COLORS = [
  'rgba(226, 179, 184, 0.55)',
  'rgba(241, 211, 206, 0.55)',
  'rgba(196, 154, 108, 0.38)',
  'rgba(164, 74, 88, 0.28)',
];

export const FloatingPetals: React.FC<{ active?: boolean }> = ({ active = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const count = Math.min(34, Math.max(18, Math.floor(width / 48)));
    const items: Petal[] = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: i % 3 === 0 ? 2.5 + Math.random() * 2.5 : 7 + Math.random() * 8,
      speedY: 0.35 + Math.random() * 0.7,
      speedX: (Math.random() - 0.5) * 0.3,
      swayAmp: 0.4 + Math.random() * 0.9,
      swayFreq: 0.008 + Math.random() * 0.012,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.018,
      opacity: 0.25 + Math.random() * 0.45,
      kind: i % 3 === 0 ? 'sparkle' : 'petal',
      color: PETAL_COLORS[i % PETAL_COLORS.length],
      phase: Math.random() * 1000,
    }));

    let tick = 0;
    const draw = () => {
      tick += 1;
      ctx.clearRect(0, 0, width, height);

      for (const p of items) {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(tick * p.swayFreq + p.phase) * p.swayAmp;
        p.angle += p.spin;

        if (p.y > height + 30) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 30) p.x = -20;
        if (p.x < -30) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        if (p.kind === 'sparkle') {
          const glow = 0.35 + 0.4 * Math.sin(tick * 0.04 + p.phase);
          ctx.fillStyle = `rgba(218, 179, 128, ${glow.toFixed(2)})`;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.bezierCurveTo(
            p.size * 0.85,
            -p.size * 0.45,
            p.size * 0.65,
            p.size * 0.7,
            0,
            p.size
          );
          ctx.bezierCurveTo(
            -p.size * 0.65,
            p.size * 0.7,
            -p.size * 0.85,
            -p.size * 0.45,
            0,
            -p.size
          );
          ctx.fill();
        }
        ctx.restore();
      }

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 h-full w-full"
    />
  );
};
