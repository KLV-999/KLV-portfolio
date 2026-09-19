'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const SRC = '/audio/interstellar.mp3';
const STORAGE_KEY = 'klv-music';
const TARGET_VOLUME = 0.35;
const FADE_MS = 1200;

export const MusicToggle: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const wantsPlayRef = useRef<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const stopFade = () => {
    if (fadeRef.current !== null) {
      cancelAnimationFrame(fadeRef.current);
      fadeRef.current = null;
    }
  };

  const fadeTo = useCallback((to: number, done?: () => void) => {
    const el = audioRef.current;
    if (!el) return;
    stopFade();
    const from = el.volume;
    const startedAt = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - startedAt) / FADE_MS, 1);
      el.volume = from + (to - from) * t;
      if (t < 1) {
        fadeRef.current = requestAnimationFrame(step);
      } else {
        fadeRef.current = null;
        done?.();
      }
    };
    fadeRef.current = requestAnimationFrame(step);
  }, []);

  /** Unmute and fade in. Returns false if the browser blocked playback. */
  const start = useCallback(async () => {
    const el = audioRef.current;
    if (!el) return false;
    el.muted = false;
    el.volume = 0;
    try {
      await el.play();
    } catch {
      // No user activation yet — stay silent and wait for a real gesture.
      el.muted = true;
      return false;
    }
    wantsPlayRef.current = true;
    setIsPlaying(true);
    fadeTo(TARGET_VOLUME);
    return true;
  }, [fadeTo]);

  /** Fade out, then pause AND mute so nothing can leak through. */
  const stop = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    wantsPlayRef.current = false;
    setIsPlaying(false);
    fadeTo(0, () => {
      el.pause();
      el.muted = true;
      el.volume = 0;
    });
  }, [fadeTo]);

  // Silent on load; fade in on the first real user interaction.
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      /* blocked storage — treat as no preference */
    }
    if (saved === 'off') return; // user muted it before, respect that

    let settled = false;
    const events = ['pointerdown', 'keydown', 'touchstart', 'scroll', 'wheel'] as const;
    const detach = () => events.forEach((e) => window.removeEventListener(e, onGesture));
    const onGesture = async () => {
      if (settled) return;
      const ok = await start();
      if (ok) {
        settled = true;
        detach();
      }
    };

    events.forEach((e) => window.addEventListener(e, onGesture, { passive: true }));
    return detach;
  }, [start]);

  // Don't keep playing into a background tab.
  useEffect(() => {
    const onVisibility = () => {
      const el = audioRef.current;
      if (!el) return;
      if (document.hidden) {
        el.pause();
      } else if (wantsPlayRef.current) {
        el.play().catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  useEffect(
    () => () => {
      stopFade();
      audioRef.current?.pause();
    },
    []
  );

  const toggleMusic = async () => {
    if (isPlaying) {
      stop();
      try {
        window.localStorage.setItem(STORAGE_KEY, 'off');
      } catch {}
    } else {
      const ok = await start();
      if (ok) {
        try {
          window.localStorage.setItem(STORAGE_KEY, 'on');
        } catch {}
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} src={SRC} loop preload="auto" playsInline muted />

      <button
        onClick={toggleMusic}
        type="button"
        aria-pressed={isPlaying}
        aria-label={isPlaying ? 'Mute background music' : 'Play background music'}
        className="pointer-events-auto group relative flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border border-white/10 hover:border-cyan/50 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(0,229,255,0.2)] text-xs font-mono tracking-wider uppercase text-gray-300 hover:text-cyan"
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-3.5 h-3.5 text-cyan animate-pulse" />
            <span>MUSIC ON // LOOP</span>
            {/* Animated Equalizer Bars */}
            <div className="flex items-end gap-[2px] h-3 ml-1">
              <span className="w-[2px] bg-cyan rounded-full animate-equalizer" style={{ animationDelay: '0ms' }} />
              <span className="w-[2px] bg-cyan rounded-full animate-equalizer" style={{ animationDelay: '200ms' }} />
              <span className="w-[2px] bg-cyan rounded-full animate-equalizer" style={{ animationDelay: '400ms' }} />
            </div>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 text-gray-500 group-hover:text-cyan" />
            <span className="text-gray-400 group-hover:text-cyan">MUSIC MUTED</span>
          </>
        )}
      </button>
    </>
  );
};
