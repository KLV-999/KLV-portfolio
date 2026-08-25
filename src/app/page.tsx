'use client';

import React from 'react';
import { StarfieldCanvas } from '@/components/canvas/StarfieldCanvas';
import { CustomCursor } from '@/components/cursor/CustomCursor';
import { HUDOverlay } from '@/components/hud/HUDOverlay';
import { HeroSection } from '@/components/sections/HeroSection';
import { PortfolioGrid } from '@/components/sections/PortfolioGrid';
import { TacticalFooter } from '@/components/sections/TacticalFooter';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-space-bg text-gray-100 selection:bg-cyan selection:text-black overflow-x-hidden">
      {/* Background Starfield Canvas with Mouse Parallax */}
      <StarfieldCanvas />

      {/* Reticle Cursor with Cyan Particle Trail */}
      <CustomCursor />

      {/* Viewport Corner HUD Overlay */}
      <HUDOverlay />

      {/* Hero Section with Revolving 3D Planet & Space Search Bar */}
      <HeroSection />

      {/* Active Hardware Modules Portfolio Grid */}
      <PortfolioGrid />

      {/* Tactical Sci-Fi Multi-Column Footer */}
      <TacticalFooter />
    </main>
  );
}
