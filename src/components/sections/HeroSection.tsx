'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { SearchConsole } from './SearchConsole';
import { MusicToggle } from '../hud/MusicToggle';
import { ChevronDown } from 'lucide-react';

// Dynamic import for 3D Planet canvas to avoid SSR issues
const PlanetCanvas = dynamic(
  () => import('../canvas/PlanetCanvas').then((mod) => mod.PlanetCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="w-64 h-64 rounded-full border border-cyan/20 animate-pulse flex items-center justify-center font-mono text-xs text-cyan/60">
        INITIALIZING 3D TELEMETRY...
      </div>
    ),
  }
);

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between items-center px-4 py-16 sm:py-20 z-10 overflow-hidden">
      {/* Background 3D Revolving Planet Model */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-80 scale-100 sm:scale-110 md:scale-125">
        <div className="w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] md:w-[640px] md:h-[640px]">
          <PlanetCanvas />
        </div>
      </div>

      {/* Hero Header Space Label */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-mono text-[10px] sm:text-xs text-cyan tracking-[0.3em] uppercase bg-space-bg/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-cyan/30 shadow-[0_0_15px_rgba(0,229,255,0.2)] mt-8"
      >
        // KLV COMMAND MODULE ONLINE
      </motion.div>

      {/* Main Hero Centerstage */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center my-auto flex flex-col items-center">
        {/* Large Bold "KLV" Glitch Logo */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-7xl sm:text-9xl lg:text-[11rem] font-extrabold tracking-tighter text-white drop-shadow-[0_0_35px_rgba(0,229,255,0.5)] font-sans animate-glitch-slow select-none"
        >
          {PORTFOLIO_DATA.logoText}
        </motion.h1>

        {/* Italic Tagline Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg sm:text-xl md:text-2xl italic font-light text-cyan/90 mb-4 max-w-2xl px-4 drop-shadow-[0_0_10px_rgba(0,229,255,0.3)]"
        >
          &ldquo;{PORTFOLIO_DATA.tagline}&rdquo;
        </motion.blockquote>

        {/* Space-Themed Search Console */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full px-2"
        >
          <SearchConsole />
        </motion.div>
      </div>

      {/* Hero Footer Scroll Cue & Audio Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="flex flex-col items-center gap-4 z-20 mb-4"
      >
        {/* Audio Toggle Pill Button */}
        <MusicToggle />

        {/* Scroll Cue */}
        <a
          href="#portfolio-grid"
          className="flex flex-col items-center gap-1 group text-gray-400 hover:text-cyan transition-colors"
        >
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-gray-400 group-hover:text-cyan">
            SCROLLING TO PORTFOLIO GRID...
          </span>
          <div className="relative p-1.5 rounded-full border border-gray-600 group-hover:border-cyan transition-colors shadow-[0_0_10px_rgba(0,229,255,0.2)]">
            <ChevronDown className="w-4 h-4 text-cyan animate-bounce" />
          </div>
        </a>
      </motion.div>
    </section>
  );
};
