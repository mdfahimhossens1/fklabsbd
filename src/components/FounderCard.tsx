import React from 'react';
import {
  ExternalLink,
  Mail,
  CheckCircle,
  MapPin,
  Calendar,
  Sparkles,
  Facebook,
  Code2,
} from 'lucide-react';
import { Founder, Language, Theme } from '../types';
import { playSound } from '../utils/audio';

interface FounderCardProps {
  founder: Founder;
  lang: Language;
  theme: Theme;
  onDirectHire: (founderName: string) => void;
}

export const FounderCard: React.FC<FounderCardProps> = ({
  founder,
  lang,
  theme,
  onDirectHire,
}) => {
  const isEn = lang === 'en';

  // Real or stylized avatars for the founders
  const isFahim = founder.id === 'fahim';

  return (
    <div
      className={`rounded-3xl p-6 sm:p-8 border transition-all relative overflow-hidden group ${
        theme === 'dark'
          ? 'bg-slate-900/90 border-slate-800 hover:border-indigo-500/50 shadow-2xl hover:shadow-indigo-950/40'
          : 'bg-white border-slate-200 hover:border-indigo-300 shadow-xl hover:shadow-slate-200'
      }`}
    >
      {/* Top subtle gradient glow */}
      <div
        className={`absolute -top-24 -right-24 w-52 h-52 rounded-full blur-3xl opacity-20 pointer-events-none ${
          isFahim ? 'bg-indigo-500' : 'bg-emerald-500'
        }`}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-slate-700/40">
        {/* Founder Avatar with Verified Badge & Actual Photo */}
        <div className="relative">
          <div
            className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl p-1 bg-gradient-to-br ${
              isFahim
                ? 'from-indigo-500 via-purple-500 to-cyan-400'
                : 'from-emerald-500 via-teal-500 to-cyan-400'
            } shadow-lg shadow-indigo-500/20`}
          >
            <div
              className={`w-full h-full rounded-[14px] flex items-center justify-center overflow-hidden font-black text-2xl ${
                theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-900'
              }`}
            >
              {founder.avatarUrl ? (
                <img
                  src={founder.avatarUrl}
                  alt={founder.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-[14px] transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to stylized monogram if image link has CDN issue
                    (e.target as HTMLElement).style.display = 'none';
                    const parent = (e.target as HTMLElement).parentElement;
                    if (parent) {
                      const fallback = parent.querySelector('.avatar-fallback');
                      if (fallback) fallback.classList.remove('hidden');
                    }
                  }}
                />
              ) : null}

              {/* Monogram Fallback */}
              <div
                className={`avatar-fallback ${founder.avatarUrl ? 'hidden' : ''} relative w-full h-full flex flex-col items-center justify-center`}
              >
                <span
                  className={`bg-clip-text text-transparent bg-gradient-to-r font-black text-2xl ${
                    isFahim ? 'from-indigo-400 to-cyan-400' : 'from-emerald-500 to-teal-400'
                  }`}
                >
                  {isFahim ? 'FH' : 'KM'}
                </span>
                <span className="text-[9px] uppercase font-mono tracking-widest text-slate-400 font-semibold mt-0.5">
                  {isFahim ? 'FullStack' : 'WordPress'}
                </span>
              </div>
            </div>
          </div>
          {/* Verified status pill */}
          <div className="absolute -bottom-2 -right-1 px-2 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center gap-1 shadow-md border border-white dark:border-slate-900">
            <CheckCircle className="w-3 h-3 text-cyan-300" />
            <span>Co-Founder</span>
          </div>
        </div>

        {/* Founder Name & Meta */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={`text-xl sm:text-2xl font-black tracking-tight ${
                theme === 'dark' ? 'text-white' : 'text-slate-950'
              }`}
            >
              {founder.name}
            </h3>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                isFahim
                  ? theme === 'dark'
                    ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                    : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                  : theme === 'dark'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}
            >
              {founder.role[lang]}
            </span>
          </div>

          <p
            className={`text-xs sm:text-sm font-semibold mt-1 ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}
          >
            {founder.title[lang]}
          </p>

          <div
            className={`flex flex-wrap items-center gap-4 mt-2 text-xs font-mono ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-indigo-500" />
              <span>{founder.location[lang]}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-indigo-500" />
              <span>{founder.experienceYears}+ {isEn ? 'Years Experience' : 'বছরের অভিজ্ঞতা'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bio Paragraph */}
      <div className="mt-5">
        <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700 font-medium'}`}>
          {founder.bio[lang]}
        </p>
      </div>

      {/* Key Highlights */}
      <div className="mt-5 space-y-2">
        <h4 className={`text-xs font-bold uppercase tracking-wider font-mono ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>
          {isEn ? 'Key Milestones' : 'বিশেষ মাইলফলক'}
        </h4>
        {founder.highlights.map((h, i) => (
          <div key={i} className="flex items-start gap-2 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500 flex-shrink-0 mt-0.5" />
            <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-800'}>{h[lang]}</span>
          </div>
        ))}
      </div>

      {/* Technical Arsenal with Progress Meters */}
      <div className={`mt-6 pt-5 border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
        <h4 className={`text-xs font-bold uppercase tracking-wider font-mono mb-3 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>
          {isEn ? 'Core Technical Skills' : 'টেকনিক্যাল দক্ষতাসমূহ'}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {founder.skills.map((skill) => (
            <div key={skill.name} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className={`font-semibold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>{skill.name}</span>
                <span className={`font-mono ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{skill.level}%</span>
              </div>
              <div className={`h-2 w-full rounded-full overflow-hidden ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'}`}>
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${
                    isFahim ? 'from-indigo-600 to-cyan-500' : 'from-emerald-600 to-teal-500'
                  }`}
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Profiles & Actions */}
      <div className={`mt-7 pt-5 border-t flex flex-wrap items-center justify-between gap-3 ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
        {/* Facebook link as requested by user */}
        <a
          href={founder.facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => playSound('click')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-sm"
          title={`Open ${founder.name}'s Facebook Profile`}
        >
          <Facebook className="w-3.5 h-3.5" />
          <span>{isEn ? 'Facebook Profile' : 'ফেসবুক প্রোফাইল'}</span>
          <ExternalLink className="w-3 h-3 opacity-70" />
        </a>

        {/* Direct Hire / Message */}
        <button
          onClick={() => {
            playSound('pop');
            onDirectHire(founder.name);
          }}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
            theme === 'dark'
              ? 'border-indigo-500/40 text-indigo-300 hover:bg-indigo-600/20'
              : 'border-indigo-300 text-indigo-700 bg-indigo-50/50 hover:bg-indigo-100'
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span>{isEn ? `Message ${founder.name.split(' ')[0]}` : `${founder.name.split(' ')[0]}-কে মেসেজ দিন`}</span>
        </button>
      </div>
    </div>
  );
};
