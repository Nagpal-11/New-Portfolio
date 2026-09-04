import React from 'react';
import { X, ArrowUpRight, Github, CheckCircle2, Cpu, BarChart2, Shield } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      data-lenis-prevent
    >
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 border border-neutral-200 accelerate-gpu"
        data-lenis-prevent
      >
        {/* Modal Header */}
        <div className="p-6 sm:p-8 bg-neutral-900 text-white flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase font-semibold">
                {project.category}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {project.title}
            </h3>
            <p className="text-sm text-neutral-300 font-medium">
              {project.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[75vh] max-h-[75dvh] overflow-y-auto" data-lenis-prevent>
          {/* Key Metrics Banner */}
          <div className="grid grid-cols-3 gap-3">
            {project.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-[#f3f3f0] border border-neutral-200"
              >
                <div className="text-lg sm:text-xl font-black text-neutral-900">
                  {metric.value}
                </div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 mt-0.5 truncate">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Project Architecture & Engineering Highlights */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold">
              SYSTEM ARCHITECTURE & KEY ACHIEVEMENTS
            </h4>
            <div className="space-y-3">
              {project.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/70 text-sm text-neutral-800"
                >
                  <CheckCircle2 size={18} className="text-blue-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Stack Tags */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold">
              TECHNOLOGIES & PROTOCOLS APPLIED
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-neutral-100 border border-neutral-200 text-neutral-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* External Links */}
          <div className="pt-6 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full border border-neutral-300 text-xs font-bold uppercase tracking-wider text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              Close Window
            </button>

            <div className="flex gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <Github size={15} />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
