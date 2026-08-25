'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const MusicToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscNodesRef = useRef<OscillatorNode[]>([]);

  // Initialize Web Audio API sci-fi ambient synth loop
  const startAmbientSynth = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, ctx.currentTime);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, ctx.currentTime);

      filter.connect(masterGain);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Deep sci-fi drone frequencies (F# minor space chord: F#1, C#2, F#2, A2)
      const freqs = [46.25, 69.30, 92.50, 110.00];
      const oscs: OscillatorNode[] = [];

      freqs.forEach((f) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, ctx.currentTime);

        // Low LFO detune wobble for cosmic feel
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.2, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();

        osc.connect(filter);
        osc.start();
        oscs.push(osc);
      });

      oscNodesRef.current = oscs;
    } catch {
      // AudioContext fallback
    }
  };

  const stopAmbientSynth = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.5);
      setTimeout(() => {
        oscNodesRef.current.forEach((osc) => {
          try { osc.stop(); } catch {}
        });
        if (audioCtxRef.current) {
          audioCtxRef.current.close().catch(() => {});
          audioCtxRef.current = null;
        }
      }, 500);
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopAmbientSynth();
      setIsPlaying(false);
    } else {
      startAmbientSynth();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      stopAmbientSynth();
    };
  }, []);

  return (
    <button
      onClick={toggleMusic}
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
  );
};
