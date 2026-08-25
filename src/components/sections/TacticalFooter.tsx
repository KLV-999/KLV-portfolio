'use client';

import React from 'react';
import { Settings, ArrowUp, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';
import { SocialIcon } from '../ui/SocialIcon';
import { CornerBrackets } from '../ui/CornerBrackets';

export const TacticalFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-space-bg/95 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Footer Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-10 border-b border-white/10">
          {/* Left: Gear Icon + KLV ROBOTICS Wordmark */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-space-bg border border-cyan/40 text-cyan">
              <Settings className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-white tracking-widest font-sans">
                {PORTFOLIO_DATA.logoText}
              </span>
              <span className="text-cyan text-xs font-mono font-bold ml-2 tracking-widest">
                ROBOTICS
              </span>
            </div>
          </div>

          {/* Right: Back To Summit Button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-white/10 hover:border-cyan hover:text-cyan text-xs font-mono tracking-widest text-gray-300 transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)]"
          >
            <span>BACK TO SUMMIT</span>
            <ArrowUp className="w-4 h-4 text-cyan" />
          </button>
        </div>

        {/* 4-Column Tactical Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 my-12 font-sans text-xs">
          {/* Column 1: "I MAY DO THESE" Bio */}
          <div>
            <h4 className="font-mono text-cyan text-xs tracking-widest font-bold uppercase mb-3 flex items-center gap-2">
              // {PORTFOLIO_DATA.bio.title}
            </h4>
            <p className="text-gray-400 leading-relaxed font-sans">
              {PORTFOLIO_DATA.bio.text}
            </p>
          </div>

          {/* Column 2: "STUDYING-CURRENTLY-IN" */}
          <div>
            <h4 className="font-mono text-cyan text-xs tracking-widest font-bold uppercase mb-3 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-cyan" />
              // STUDYING-CURRENTLY-IN
            </h4>
            <div className="text-gray-200 font-bold mb-1">{PORTFOLIO_DATA.bio.institution}</div>
            <div className="text-gray-400 mb-3">{PORTFOLIO_DATA.bio.location}</div>
            <div className="font-mono text-cyan/90 text-[11px] bg-cyan/10 border border-cyan/20 px-2.5 py-1 rounded inline-block">
              {PORTFOLIO_DATA.bio.coordinates}
            </div>
          </div>

          {/* Column 3: "ENGINEERING-FOCUS" */}
          <div>
            <h4 className="font-mono text-cyan text-xs tracking-widest font-bold uppercase mb-3">
              // ENGINEERING-FOCUS
            </h4>
            <ul className="space-y-2">
              {PORTFOLIO_DATA.bio.focusList.map((focus, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan shrink-0" />
                  <span>{focus}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: "DIAGNOSTICS" Panel */}
          <div className="relative p-4 rounded-xl glass-panel border border-white/10">
            <CornerBrackets active={false} size={8} />
            <h4 className="font-mono text-cyan text-xs tracking-widest font-bold uppercase mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan" />
              // DIAGNOSTICS
            </h4>
            <div className="space-y-2 font-mono text-[11px]">
              {PORTFOLIO_DATA.diagnostics.map((diag, idx) => (
                <div key={idx} className="flex items-center justify-between border-b border-white/5 pb-1">
                  <span className="text-gray-400">{diag.name}:</span>
                  <div className="flex items-center gap-1.5 font-bold text-cyan">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
                    <span>{diag.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social Icons Row */}
        <div className="flex flex-wrap items-center justify-center gap-4 py-8 border-t border-b border-white/10 my-8">
          {PORTFOLIO_DATA.socials.map((social) => (
            <SocialIcon
              key={social.name}
              name={social.name}
              url={social.url}
              iconName={social.iconName}
            />
          ))}
        </div>

        {/* Bottom Line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[10px] text-gray-500 tracking-wider">
          <div>
            © 2026 {PORTFOLIO_DATA.logoText} ROBOTICS. ALL RIGHTS RESERVED.
          </div>
          <div className="text-cyan/70">
            // SECURE DATA TRANSMISSION PROTOCOL
          </div>
        </div>
      </div>
    </footer>
  );
};
