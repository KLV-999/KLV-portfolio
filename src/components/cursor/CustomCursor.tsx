'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Rocket } from 'lucide-react';

interface TrailParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  alpha: number;
}

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState<boolean>(false);
  const [trails, setTrails] = useState<TrailParticle[]>([]);
  const [angle, setAngle] = useState<number>(0);
  const trailIdCounter = useRef(0);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    // Only enable custom cursor if fine pointer is supported
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mediaQuery.matches) return;

    setIsPointer(true);

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      setPos({ x, y });

      if (lastPos.current) {
        const dx = x - lastPos.current.x;
        const dy = y - lastPos.current.y;
        // Only update heading on real movement, so the rocket doesn't
        // jitter when the mouse is essentially still.
        if (Math.hypot(dx, dy) > 2) {
          // The rocket glyph noses toward the upper-right by default;
          // +135deg rotates that nose to align with the travel direction.
          setAngle((Math.atan2(dy, dx) * 180) / Math.PI + 135);
        }
      }
      lastPos.current = { x, y };

      // Add a trailing thruster particle
      trailIdCounter.current += 1;
      const newParticle: TrailParticle = {
        id: trailIdCounter.current,
        x,
        y,
        size: Math.random() * 4 + 2,
        alpha: 0.8,
      };

      setTrails((prev) => [...prev.slice(-18), newParticle]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animate trail fading
  useEffect(() => {
    if (!isPointer) return;

    const interval = setInterval(() => {
      setTrails((prev) =>
        prev
          .map((p) => ({
            ...p,
            alpha: p.alpha - 0.05,
            size: Math.max(0, p.size - 0.1),
          }))
          .filter((p) => p.alpha > 0.05)
      );
    }, 25);

    return () => clearInterval(interval);
  }, [isPointer]);

  if (!isPointer) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Thruster Trail Particles */}
      {trails.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-cyan"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            transform: 'translate(-50%, -50%)',
            opacity: particle.alpha,
            boxShadow: `0 0 ${particle.size * 2}px #00E5FF`,
          }}
        />
      ))}

      {/* Rocket Cursor */}
      <div
        className="absolute transition-transform duration-100 ease-out"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: `translate(-50%, -50%) rotate(${angle}deg)`,
        }}
      >
        <Rocket
          className="h-6 w-6 text-cyan drop-shadow-[0_0_8px_#00E5FF]"
          strokeWidth={1.75}
          fill="rgba(0,229,255,0.18)"
        />
      </div>
    </div>
  );
};
