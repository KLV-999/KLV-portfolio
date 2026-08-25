'use client';

import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

export const StarfieldCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const scrollRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse -1 to 1
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY * 0.05;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Generate ~160 space stars with depth z
    const stars: Star[] = Array.from({ length: 180 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 0.8 + 0.2, // Depth scaling for parallax
      size: Math.random() * 1.6 + 0.4,
      baseAlpha: Math.random() * 0.7 + 0.2,
      twinkleSpeed: Math.random() * 0.03 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2,
    }));

    let time = 0;

    const render = () => {
      time += 0.016;

      ctx.clearRect(0, 0, width, height);

      // Deep space base fill
      ctx.fillStyle = '#05050A';
      ctx.fillRect(0, 0, width, height);

      // Faint nebula gradient blobs (muted gray/blue, very low opacity)
      const nebulaGrad1 = ctx.createRadialGradient(
        width * 0.2 + mouseRef.current.x * 20,
        height * 0.3 + mouseRef.current.y * 20,
        50,
        width * 0.2,
        height * 0.3,
        width * 0.5
      );
      nebulaGrad1.addColorStop(0, 'rgba(20, 30, 45, 0.25)');
      nebulaGrad1.addColorStop(1, 'rgba(5, 5, 10, 0)');

      ctx.fillStyle = nebulaGrad1;
      ctx.fillRect(0, 0, width, height);

      const nebulaGrad2 = ctx.createRadialGradient(
        width * 0.75 - mouseRef.current.x * 30,
        height * 0.65 - mouseRef.current.y * 30,
        80,
        width * 0.75,
        height * 0.65,
        width * 0.6
      );
      nebulaGrad2.addColorStop(0, 'rgba(15, 25, 40, 0.2)');
      nebulaGrad2.addColorStop(1, 'rgba(5, 5, 10, 0)');

      ctx.fillStyle = nebulaGrad2;
      ctx.fillRect(0, 0, width, height);

      // Render stars with parallax and twinkling
      stars.forEach((star) => {
        const parallaxX = mouseRef.current.x * star.z * 15;
        const parallaxY = mouseRef.current.y * star.z * 15 + scrollRef.current * star.z;

        let posX = (star.x + parallaxX) % width;
        let posY = (star.y + parallaxY) % height;
        if (posX < 0) posX += width;
        if (posY < 0) posY += height;

        const alpha =
          star.baseAlpha + Math.sin(time * star.twinkleSpeed * 100 + star.twinklePhase) * 0.25;
        const clampedAlpha = Math.max(0.1, Math.min(1, alpha));

        ctx.fillStyle = `rgba(220, 240, 255, ${clampedAlpha})`;
        ctx.beginPath();
        ctx.arc(posX, posY, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Subtle cyan glow for larger foreground stars
        if (star.size > 1.4 && clampedAlpha > 0.6) {
          ctx.fillStyle = `rgba(0, 229, 255, ${clampedAlpha * 0.3})`;
          ctx.beginPath();
          ctx.arc(posX, posY, star.size * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};
