import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  rotation: number;
  vRot: number;
  color: string;
  shape: 'heart' | 'star' | 'petal' | 'gold';
}

const COLORS = [
  '#DFC19A',
  '#C49A6C',
  '#F5D0C5',
  '#E06D82',
  '#B8334A',
  '#FFF3DB',
];

// Global burst event helper so any component can trigger a celebratory firework burst
export function triggerCelebrationBurst(x?: number, y?: number, count = 55) {
  window.dispatchEvent(
    new CustomEvent('wedding:burst', {
      detail: {
        x: x ?? window.innerWidth / 2,
        y: y ?? window.innerHeight / 2,
        count,
      },
    })
  );
}

export const CursorMagic: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const particles: Particle[] = [];
    let lastX = -100;
    let lastY = -100;

    const spawnTrail = (x: number, y: number, count = 2) => {
      const shapes: Particle['shape'][] = ['gold', 'star', 'heart', 'petal'];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.4 + Math.random() * 1.8;
        particles.push({
          x: x + (Math.random() - 0.5) * 10,
          y: y + (Math.random() - 0.5) * 10,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.5,
          size: 3.5 + Math.random() * 5.5,
          alpha: 0.92,
          decay: 0.015 + Math.random() * 0.014,
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.08,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          shape: shapes[Math.floor(Math.random() * shapes.length)],
        });
      }
    };

    const spawnBurst = (x: number, y: number, count = 55) => {
      const shapes: Particle['shape'][] = ['heart', 'star', 'petal', 'gold'];
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.35;
        const speed = 2.2 + Math.random() * 8.5;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2.2,
          size: 5 + Math.random() * 8,
          alpha: 1,
          decay: 0.01 + Math.random() * 0.01,
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.14,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          shape: shapes[Math.floor(Math.random() * shapes.length)],
        });
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      if (Math.hypot(dx, dy) > 14) {
        spawnTrail(e.clientX, e.clientY, 2);
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };

    const onClick = (e: MouseEvent) => {
      spawnBurst(e.clientX, e.clientY, 22);
    };

    const onCustomBurst = (e: Event) => {
      const detail = (e as CustomEvent<{ x: number; y: number; count: number }>).detail;
      if (detail) {
        spawnBurst(detail.x, detail.y, detail.count);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('click', onClick, { passive: true });
    window.addEventListener('wedding:burst', onCustomBurst);

    const drawHeart = (size: number) => {
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(0, topCurveHeight);
      ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      ctx.bezierCurveTo(
        -size / 2,
        (size + topCurveHeight) / 2,
        0,
        (size + topCurveHeight) / 1.4,
        0,
        size
      );
      ctx.bezierCurveTo(
        0,
        (size + topCurveHeight) / 1.4,
        size / 2,
        (size + topCurveHeight) / 2,
        size / 2,
        topCurveHeight
      );
      ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
      ctx.closePath();
      ctx.fill();
    };

    const drawStar = (size: number) => {
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2;
        ctx.lineTo(Math.cos(angle) * size, Math.sin(angle) * size);
        const midAngle = angle + Math.PI / 4;
        ctx.lineTo(
          Math.cos(midAngle) * (size * 0.35),
          Math.sin(midAngle) * (size * 0.35)
        );
      }
      ctx.closePath();
      ctx.fill();
    };

    let rafId = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.055; // gentle gravity
        p.vx *= 0.985;
        p.alpha -= p.decay;
        p.rotation += p.vRot;

        if (p.alpha <= 0.02) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;

        if (p.shape === 'heart') {
          drawHeart(p.size * 1.3);
        } else if (p.shape === 'star') {
          drawStar(p.size);
        } else if (p.shape === 'petal') {
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 0.9, p.size * 0.5, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.45, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('wedding:burst', onCustomBurst);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[55] h-full w-full"
    />
  );
};
