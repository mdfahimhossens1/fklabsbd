import React from 'react';
import {
  X,
  Sparkles,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Cpu,
  Layers,
  Zap,
} from 'lucide-react';
import { Language, PortfolioItem, Theme } from '../types';
import { playSound } from '../utils/audio';

interface PortfolioModalProps {
  project: PortfolioItem | null;
  onClose: () => void;
  lang: Language;
  theme: Theme;
  onRequestSimilar: (projectTitle: string) => void;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({
  project,
  onClose,
  lang,
  theme,
  onRequestSimilar,
}) => {
  if (!project) return null;
  const isEn = lang === 'en';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        onClick={() => {
          playSound('click');
          onClose();
        }}
      />

      {/* Modal Dialog */}
      <div
        className={`relative w-full max-w-3xl rounded-3xl p-6 sm:p-8 border shadow-2xl z-10 transition-all max-h-[90vh] overflow-y-auto ${
          theme === 'dark'
            ? 'bg-slate-900 border-slate-700/80 text-slate-100 shadow-indigo-950/50'
            : 'bg-white border-slate-200 text-slate-900 shadow-slate-300/50'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            playSound('click');
            onClose();
          }}
          className={`absolute top-5 right-5 p-2 rounded-xl transition-colors ${
            theme === 'dark'
              ? 'text-slate-400 hover:text-white hover:bg-slate-800'
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
          }`}
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Tag & Title */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
            {project.category}
          </span>
          <span className="text-xs text-slate-400 font-mono">
            {project.client} • {project.year}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">{project.title}</h2>
        <p className="text-sm font-medium text-indigo-400 mt-1">{project.tagline[lang]}</p>

        {/* Visual Hero Mockup Banner */}
        <div
          className={`mt-5 rounded-2xl p-6 sm:p-8 bg-gradient-to-br ${project.gradient} text-white shadow-lg relative overflow-hidden`}
        >
          <div className="relative z-10">
            <span className="text-xs font-mono uppercase tracking-widest opacity-80">
              {isEn ? 'Engineered by FK Labs' : 'এফকে ল্যাবস দ্বারা নির্মিত'}
            </span>
            <h3 className="text-xl sm:text-2xl font-black mt-1">{project.title.split('-')[0]}</h3>
            <p className="text-xs sm:text-sm opacity-90 mt-2 max-w-xl leading-relaxed">
              {project.description[lang]}
            </p>
          </div>

          <div className="absolute -bottom-8 -right-8 w-44 h-44 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        </div>

        {/* Verified Impact Metrics */}
        <div className="mt-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-3">
            {isEn ? 'Verified Performance Metrics' : 'যাচাইকৃত পারফরম্যান্স ফলাফল'}
          </h4>
          <div className="grid grid-cols-3 gap-3">
            {project.metrics.map((m, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border text-center ${
                  theme === 'dark' ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="text-xl sm:text-2xl font-black text-indigo-400">{m.value}</div>
                <div className="text-[11px] font-semibold text-slate-400 mt-0.5">{m.label[lang]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture & Engineering Features */}
        <div className="mt-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-3">
            {isEn ? 'Key Engineering Features' : 'মূল টেকনিক্যাল বৈশিষ্ঠ্য'}
          </h4>
          <div className="space-y-2.5">
            {project.features[lang].map((feature, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs sm:text-sm ${
                  theme === 'dark' ? 'bg-slate-950/40 border-slate-800/80' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Chips */}
        <div className="mt-6 pt-5 border-t border-slate-700/40">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-3">
            {isEn ? 'Technologies Utilized' : 'ব্যবহৃত প্রযুক্তিসমূহ'}
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className={`px-3 py-1 rounded-xl text-xs font-mono font-medium border ${
                  theme === 'dark'
                    ? 'bg-slate-800 border-slate-700 text-slate-200'
                    : 'bg-slate-100 border-slate-200 text-slate-800'
                }`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Bottom */}
        <div className="mt-8 pt-5 border-t border-slate-700/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-slate-400">
            {isEn ? 'Need a system like this for your business?' : 'আপনার ব্যবসার জন্য এমন একটি সিস্টেম চান?'}
          </span>
          <button
            onClick={() => {
              playSound('pop');
              onRequestSimilar(project.title);
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 shadow-lg shadow-indigo-600/30 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isEn ? 'Request Similar Solution' : 'অনুরূপ সমাধান চান'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
