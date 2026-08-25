'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_DATA, ProjectItem } from '@/data/portfolioData';
import { Eye, Terminal, Bot, Disc, Code, Cpu } from 'lucide-react';
import { CornerBrackets } from '../ui/CornerBrackets';
import { ProjectModal } from './ProjectModal';

type FilterCategory = 'ALL' | 'HACKATHONS' | 'ROBOTICS' | 'DRONES' | 'SOFTWARE PROJECTS';

const CATEGORIES: FilterCategory[] = ['ALL', 'HACKATHONS', 'ROBOTICS', 'DRONES', 'SOFTWARE PROJECTS'];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'ROBOTICS':
      return Bot;
    case 'DRONES':
      return Disc;
    case 'HACKATHONS':
      return Cpu;
    case 'SOFTWARE PROJECTS':
      return Code;
    default:
      return Terminal;
  }
};

export const PortfolioGrid: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('ALL');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects = activeFilter === 'ALL'
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter((p) => p.category === activeFilter);

  return (
    <section id="portfolio-grid" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Eyebrow Label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 font-mono text-xs text-cyan tracking-widest uppercase mb-3"
      >
        <Terminal className="w-4 h-4 text-cyan" />
        <span>PROJECT_HARDWARE_INDEX // DEPLOYED_ASSETS</span>
      </motion.div>

      {/* Main Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-8"
      >
        ACTIVE HARDWARE MODULES
      </motion.h2>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap gap-2.5 mb-12"
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeFilter === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full font-mono text-xs tracking-wider transition-all duration-300 ${
                isActive
                  ? 'bg-cyan text-black font-bold border border-cyan shadow-[0_0_20px_rgba(0,229,255,0.4)]'
                  : 'bg-space-bg/80 text-gray-400 border border-white/10 hover:border-cyan/40 hover:text-cyan'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </motion.div>

      {/* Project Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => {
            const isHovered = hoveredCardId === project.id;
            const CategoryIcon = getCategoryIcon(project.category);

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                onMouseEnter={() => setHoveredCardId(project.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                className={`relative group rounded-2xl glass-panel p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between ${
                  isHovered
                    ? 'border-cyan shadow-[0_0_30px_rgba(0,229,255,0.2)] bg-space-bg/90'
                    : 'border-white/10 hover:border-cyan/40'
                }`}
              >
                {/* HUD Corner Brackets */}
                <CornerBrackets active={isHovered} size={12} />

                <div>
                  {/* Top Row: Hashtag ID & Serial Unit */}
                  <div className="flex items-center justify-between font-mono text-xs mb-3">
                    <span className="text-cyan font-bold tracking-wider">{project.id}</span>
                    <span className="text-gray-500 text-[11px]">{project.serial}</span>
                  </div>

                  {/* Category Tag */}
                  <div className="inline-block font-mono text-[10px] text-cyan font-semibold uppercase tracking-widest px-2 py-0.5 rounded bg-cyan/10 border border-cyan/30 mb-3">
                    {project.category}
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan transition-colors">
                    {project.title}
                  </h3>

                  {/* Media / Preview Schematic Box */}
                  <div className="relative w-full h-40 rounded-xl bg-space-bg/90 border border-white/5 overflow-hidden flex items-center justify-center mb-4 group-hover:border-cyan/30 transition-all">
                    {/* Background Grid Pattern */}
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00E5FF_1px,transparent_1px)] [background-size:16px_16px]" />

                    {/* Centered Category Schematic Icon */}
                    <CategoryIcon className="w-12 h-12 text-cyan/70 group-hover:text-cyan group-hover:scale-110 transition-all duration-300 z-10" />

                    {/* Floating particle effect on hover */}
                    {isHovered && (
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-4 left-6 w-1.5 h-1.5 rounded-full bg-cyan animate-ping" />
                        <div className="absolute bottom-6 right-8 w-2 h-2 rounded-full bg-cyan/80 animate-pulse" />
                      </div>
                    )}

                    {/* Scanline line animation */}
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-cyan/40 group-hover:translate-y-40 transition-transform duration-1000 ease-linear" />
                  </div>

                  {/* Telemetry Badge */}
                  <div className="flex items-center gap-2 font-mono text-[10px] text-cyan mb-3">
                    <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
                    <span>TELEMETRY FEED CONNECTED</span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                    {project.description}
                  </p>
                </div>

                {/* Bottom Row: Stat Callouts & Inspect Action */}
                <div className="pt-4 border-t border-white/5 flex items-end justify-between gap-4">
                  {/* Two Stat Callouts */}
                  <div className="flex items-center gap-4 sm:gap-6 font-mono">
                    <div>
                      <div className="text-[9px] text-gray-500 uppercase tracking-widest">{project.stats.label1}</div>
                      <div className="text-xs font-bold text-gray-200 group-hover:text-cyan transition-colors">{project.stats.value1}</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-gray-500 uppercase tracking-widest">{project.stats.label2}</div>
                      <div className="text-xs font-bold text-gray-200 group-hover:text-cyan transition-colors">{project.stats.value2}</div>
                    </div>
                  </div>

                  {/* Inspect Button */}
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="flex items-center gap-1.5 font-mono text-xs text-cyan hover:underline group-hover:text-cyan tracking-wider font-semibold"
                  >
                    <span>INSPECT</span>
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Extended Telemetry Inspection Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
