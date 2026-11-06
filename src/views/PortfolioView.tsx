import React, { useState } from 'react';
import {
  Briefcase,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Layers,
  Globe,
  Code2,
  Palette,
  CheckCircle,
} from 'lucide-react';
import { Language, PortfolioItem, Theme } from '../types';
import { DICTIONARY, PORTFOLIO_DATA } from '../data/content';
import { playSound } from '../utils/audio';

interface PortfolioViewProps {
  lang: Language;
  theme: Theme;
  onSelectProject: (project: PortfolioItem) => void;
  onOpenHireModal: (servicePref?: string) => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({
  lang,
  theme,
  onSelectProject,
  onOpenHireModal,
}) => {
  const isEn = lang === 'en';
  const t = DICTIONARY[lang].portfolioSection;
  const [filter, setFilter] = useState<'all' | 'saas' | 'wordpress' | 'web' | 'uiux' | 'ai'>('all');

  const filterButtons: { id: 'all' | 'saas' | 'wordpress' | 'web' | 'uiux' | 'ai'; label: string }[] = [
    { id: 'all', label: t.filterAll },
    { id: 'saas', label: t.filterSaaS },
    { id: 'wordpress', label: t.filterWordPress },
    { id: 'web', label: t.filterWeb },
    { id: 'uiux', label: t.filterUIUX },
    { id: 'ai', label: t.filterAI },
  ];

  const filteredProjects =
    filter === 'all'
      ? PORTFOLIO_DATA
      : PORTFOLIO_DATA.filter((item) => item.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
          {t.tag}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-3">{t.title}</h1>
        <p className={`text-sm sm:text-base mt-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
          {t.subtitle}
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {filterButtons.map((btn) => {
          const active = filter === btn.id;
          return (
            <button
              key={btn.id}
              onClick={() => {
                playSound('click');
                setFilter(btn.id);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                active
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400'
                  : theme === 'dark'
                  ? 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {btn.label}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => {
              playSound('click');
              onSelectProject(project);
            }}
            className={`rounded-3xl p-6 border transition-all cursor-pointer group flex flex-col justify-between relative overflow-hidden ${
              theme === 'dark'
                ? 'bg-slate-900/80 border-slate-800 hover:border-indigo-500/40 shadow-xl'
                : 'bg-white border-slate-200 hover:border-indigo-200 shadow-md'
            }`}
          >
            <div>
              {/* Project Card Header Graphic Banner */}
              <div
                className={`h-48 rounded-2xl bg-gradient-to-br ${project.gradient} p-6 flex flex-col justify-between text-white relative overflow-hidden shadow-inner group-hover:scale-[1.02] transition-transform`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md bg-black/40 backdrop-blur-sm">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono opacity-80">{project.year}</span>
                </div>

                <div>
                  <h3 className="text-xl font-black leading-snug">{project.title.split('-')[0]}</h3>
                  <p className="text-xs opacity-90 mt-1 line-clamp-1">{project.client}</p>
                </div>
              </div>

              {/* Title & Tagline */}
              <div className="mt-5 space-y-2">
                <h4 className="font-bold text-base tracking-tight leading-snug">
                  {project.tagline[lang]}
                </h4>
                <p className={`text-xs leading-relaxed line-clamp-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  {project.description[lang]}
                </p>
              </div>

              {/* Metrics Highlights */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800/60">
                {project.metrics.slice(0, 2).map((m, idx) => (
                  <div key={idx} className="p-2 rounded-xl bg-slate-800/40 text-center">
                    <span className="text-sm font-black text-indigo-400 block">{m.value}</span>
                    <span className="text-[10px] text-slate-400">{m.label[lang]}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className={`px-2 py-0.5 rounded-md text-[11px] font-mono ${
                      theme === 'dark' ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono">FK Labs Case Study</span>
              <span className="inline-flex items-center gap-1 font-bold text-indigo-400 group-hover:translate-x-1 transition-transform">
                <span>{t.viewCaseStudy}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div
        className={`rounded-3xl p-8 sm:p-12 border text-center max-w-3xl mx-auto ${
          theme === 'dark'
            ? 'bg-slate-900/60 border-slate-800'
            : 'bg-indigo-50/60 border-indigo-200'
        }`}
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          {isEn ? 'Have a unique idea?' : 'আপনার কোনো বিশেষ পরিকল্পনা আছে?'}
        </span>
        <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
          {isEn ? 'Let’s Build Your Flagship Product' : 'চলুন তৈরি করি আপনার ড্রিম ডিজিটাল প্রোডাক্ট'}
        </h3>
        <p className={`text-xs sm:text-sm mt-2 max-w-xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
          {isEn
            ? 'Whether you need a multi-tenant SaaS application or a high-velocity WooCommerce store, we engineer for scale.'
            : 'আপনার প্রয়োজন হোক একটি জটিল SaaS প্ল্যাটফর্ম কিংবা সুপারফাস্ট ই-কমার্স শপ—আমরা প্রস্তুত আপনাকে সহযোগিতা করতে।'}
        </p>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => {
              playSound('pop');
              onOpenHireModal();
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isEn ? 'Consult With Our Engineers' : 'আমাদের ইঞ্জিনিয়ারদের সাথে পরামর্শ করুন'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
