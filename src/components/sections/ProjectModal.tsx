'use client';

import React from 'react';
import { ProjectItem } from '@/data/portfolioData';
import { X, Cpu, Activity, Zap, Radio, ShieldCheck, Github, ExternalLink } from 'lucide-react';
import { CornerBrackets } from '../ui/CornerBrackets';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl glass-panel-cyan p-6 sm:p-8 rounded-2xl border border-cyan/40 shadow-[0_0_50px_rgba(0,229,255,0.25)] max-h-[90vh] overflow-y-auto">
        <CornerBrackets active={true} size={14} />

        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-cyan/20 pb-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="font-mono text-cyan text-xs font-bold">{project.id}</span>
              <span className="font-mono text-gray-500 text-[11px]">{project.serial}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">{project.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-space-bg border border-cyan/30 text-cyan hover:bg-cyan hover:text-black transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-2 mb-6 px-3 py-2 rounded-lg bg-cyan/10 border border-cyan/30 text-cyan font-mono text-xs">
          <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
          <span className="font-bold">LIVE TELEMETRY STREAM ACTIVE</span>
          <span className="ml-auto text-gray-400 text-[10px]">FREQ: 100Hz</span>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed mb-6 font-sans">{project.description}</p>

        {/* Extended Telemetry Grid */}
        <div className="mb-6">
          <h3 className="font-mono text-cyan text-xs tracking-widest uppercase mb-3 flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan" />
            // SYSTEM TELEMETRY MATRIX
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-space-bg/80 border border-white/5 flex items-start gap-2.5">
              <Cpu className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
              <div>
                <div className="text-gray-500 text-[10px] uppercase">ARCHITECTURE</div>
                <div className="text-gray-200 font-semibold">{project.extendedTelemetry.architecture}</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-space-bg/80 border border-white/5 flex items-start gap-2.5">
              <Zap className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
              <div>
                <div className="text-gray-500 text-[10px] uppercase">CONTROLLER / STACK</div>
                <div className="text-gray-200 font-semibold">{project.extendedTelemetry.controller}</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-space-bg/80 border border-white/5 flex items-start gap-2.5">
              <Radio className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
              <div>
                <div className="text-gray-500 text-[10px] uppercase">SENSORS</div>
                <div className="text-gray-200 font-semibold">{project.extendedTelemetry.sensors}</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-space-bg/80 border border-white/5 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
              <div>
                <div className="text-gray-500 text-[10px] uppercase">POWER / COMM</div>
                <div className="text-gray-200 font-semibold">{project.extendedTelemetry.powerSystem}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Links */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-cyan/20">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-space-bg border border-white/20 text-gray-200 hover:text-cyan hover:border-cyan transition-all text-xs font-mono"
            >
              <Github className="w-4 h-4" />
              <span>SOURCE REPO</span>
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan text-black font-bold hover:bg-white transition-all text-xs font-mono shadow-[0_0_15px_#00E5FF]"
            >
              <ExternalLink className="w-4 h-4" />
              <span>DEPLOYED DEMO</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
