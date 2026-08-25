'use client';

import React, { useState } from 'react';
import { Mail, Linkedin, Github, Instagram, Youtube, Facebook } from 'lucide-react';

interface SocialIconProps {
  name: string;
  url: string;
  iconName: 'mail' | 'linkedin' | 'github' | 'instagram' | 'youtube' | 'facebook';
}

const getSocialIcon = (iconName: string) => {
  switch (iconName) {
    case 'mail':
      return Mail;
    case 'linkedin':
      return Linkedin;
    case 'github':
      return Github;
    case 'instagram':
      return Instagram;
    case 'youtube':
      return Youtube;
    case 'facebook':
      return Facebook;
    default:
      return Mail;
  }
};

export const SocialIcon: React.FC<SocialIconProps> = ({ name, url, iconName }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const Icon = getSocialIcon(iconName);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group p-3 rounded-full bg-space-bg border border-white/10 hover:border-cyan hover:bg-cyan/10 transition-all duration-300 flex items-center justify-center text-gray-400 hover:text-cyan shadow-[0_0_15px_rgba(0,0,0,0.5)]"
    >
      <Icon className="w-5 h-5 z-10 group-hover:scale-110 transition-transform" />

      {/* Cyan Particle Ripple Burst Effect on Hover */}
      {isHovered && (
        <>
          <span className="absolute inset-0 rounded-full border border-cyan animate-ping opacity-60 pointer-events-none" />
          <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_6px_#00E5FF] animate-pulse" />
          <span className="absolute -bottom-1 -left-1 w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_6px_#00E5FF] animate-pulse" />
        </>
      )}
    </a>
  );
};
