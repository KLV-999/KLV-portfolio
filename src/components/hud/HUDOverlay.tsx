'use client';

import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

export const HUDOverlay: React.FC = () => {
  const [latency, setLatency] = useState<number>(8);
  const [altitude, setAltitude] = useState<number>(14200);

  useEffect(() => {
    // Dynamic simulated telemetry variation
    const interval = setInterval(() => {
      setLatency(Math.floor(7 + Math.random() * 4));
      setAltitude(Math.floor(14190 + Math.random() * 20));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-4 md:p-6 font-mono text-[10px] sm:text-xs text-gray-500 tracking-widest uppercase">
      {/* Top Bar */}
      <div className="flex justify-between items-center w-full">
        {/* Top Left Tag */}
        <div className="flex items-center gap-2 bg-space-bg/60 backdrop-blur-sm px-2 py-1 border border-white/5 rounded">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
          <span className="text-cyan/90 font-bold">{PORTFOLIO_DATA.logoText}_01</span>
          <span className="text-gray-400">[PORTFOLIO INDEX]</span>
        </div>

        {/* Top Right Tag */}
        <div className="hidden sm:flex items-center gap-2 bg-space-bg/60 backdrop-blur-sm px-2 py-1 border border-white/5 rounded">
          <span className="text-gray-400">REF_KLV_2026</span>
          <span className="text-cyan/60">// SYS_ACTIVE</span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex justify-between items-end w-full">
        {/* Bottom Left Live Telemetry */}
        <div className="bg-space-bg/60 backdrop-blur-sm px-3 py-1.5 border border-white/5 rounded flex items-center gap-4 text-gray-400">
          <div>
            <span className="text-gray-500 mr-1">ORBIT:</span>
            <span className="text-gray-200 font-bold">{(altitude / 1000).toFixed(1)}K KM</span>
          </div>
          <div>
            <span className="text-gray-500 mr-1">LATENCY:</span>
            <span className="text-cyan font-bold">{latency}ms</span>
          </div>
          <div className="hidden md:block">
            <span className="text-gray-500 mr-1">SIG:</span>
            <span className="text-gray-200">{PORTFOLIO_DATA.telemetry.signalStrength}</span>
          </div>
        </div>

        {/* Bottom Right HUD Bracket Code */}
        <div className="hidden md:block text-right bg-space-bg/60 backdrop-blur-sm px-3 py-1.5 border border-white/5 rounded text-gray-500">
          <span className="text-cyan/80 mr-1">SYS_STATUS:</span> 100% NOMINAL
        </div>
      </div>
    </div>
  );
};
