import React from 'react';
import {
  Users,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  ExternalLink,
  Mail,
  Facebook,
  Code2,
  Terminal,
  HeartHandshake,
  Zap,
} from 'lucide-react';
import { Language, Theme } from '../types';
import { DICTIONARY, FOUNDERS_DATA } from '../data/content';
import { FounderCard } from '../components/FounderCard';
import { playSound } from '../utils/audio';

interface TeamViewProps {
  lang: Language;
  theme: Theme;
  onOpenHireModal: (servicePref?: string) => void;
}

export const TeamView: React.FC<TeamViewProps> = ({
  lang,
  theme,
  onOpenHireModal,
}) => {
  const isEn = lang === 'en';
  const t = DICTIONARY[lang].teamSection;

  const culturePrinciples = [
    {
      title: isEn ? 'Zero Outsourcing' : 'কোনো আউটসোর্সিং নয়',
      desc: isEn
        ? 'We never pass client code to third-party subcontractors. Every architecture, commit, and optimization is done directly by Fahim and Kayes.'
        : 'আমরা কোনো থার্ড পার্টি ফ্রিল্যান্সার বা এজেন্সির কাছে কাজ সাব-কন্ট্রাক্ট দিই না। প্রতিটি কোড ফাহিম ও কায়েস সরাসরি লিখে থাকে।',
      icon: <Code2 className="w-5 h-5 text-indigo-400" />,
    },
    {
      title: isEn ? 'Sub-Second Speeds' : 'সাব-সেকেন্ড লোডিং স্পিড',
      desc: isEn
        ? 'Performance is not an afterthought. We optimize assets, database queries, and caching from day one to guarantee Core Web Vitals 95+.'
        : 'স্পিড কোনো সাধারণ বিষয় নয়। প্রজেক্টের প্রথম দিন থেকেই ডাটাবেজ কোয়েরি এবং অ্যাসেটস অপটিমাইজ করে ১ সেকেন্ডের নিচে লোড নিশ্চিত করি।',
      icon: <Zap className="w-5 h-5 text-amber-400" />,
    },
    {
      title: isEn ? 'Transparent Fixed Pricing' : 'স্বচ্ছ ও নির্দিষ্ট বাজেট',
      desc: isEn
        ? 'No surprise invoices or hidden add-ons. We scope accurately, deliver on time, and back everything with our clean-code warranty.'
        : 'কোনো গোপন ফি নেই। প্রজেক্টের শুরুতেই স্কোপ অনুযায়ী ফিক্সড বাজেট ও নির্দিষ্ট ডেডলাইন চূড়ান্ত করা হয়।',
      icon: <ShieldCheck className="w-5 h-5 text-cyan-400" />,
    },
    {
      title: isEn ? 'Long-Term Partnership' : 'দীর্ঘমেয়াদী টেকনিক্যাল পার্টনারশিপ',
      desc: isEn
        ? 'We treat your product as our own. We stay available for feature iterations, upgrades, security patches, and scaling support.'
        : 'আমরা ক্লায়েন্টের প্রজেক্টকে নিজেদের মনে করে কাজ করি। প্রজেক্ট পরবর্তী আপডেট, নতুন ফিচার ও সিকিউরিটি নিশ্চিতে পাশে থাকি।',
      icon: <HeartHandshake className="w-5 h-5 text-emerald-400" />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Users className="w-3.5 h-3.5 text-indigo-400" />
          {t.tag}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-3 text-slate-900 dark:text-white">
          {t.title}
        </h1>
        <p className={`text-sm sm:text-base mt-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
          {t.subtitle}
        </p>
      </div>

      {/* The 2 Founders Deep Dive Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {FOUNDERS_DATA.map((founder) => (
          <FounderCard
            key={founder.id}
            founder={founder}
            lang={lang}
            theme={theme}
            onDirectHire={(name) => onOpenHireModal(`Consultation with ${name}`)}
          />
        ))}
      </div>

      {/* The Story & Culture */}
      <div
        className={`rounded-3xl p-8 sm:p-12 border ${
          theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-md'
        }`}
      >
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold">
            {isEn ? 'The FK Labs Ethos' : 'আমাদের কর্মদর্শন ও ভিশন'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {isEn ? 'Crafted by Developers, Not Marketers.' : 'আমরা ডেভেলপার—কোনো বিপণনকারী নই।'}
          </h2>
          <p className={`text-xs sm:text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
            {isEn
              ? 'FK Labs was founded in Dhaka by Md. Fahim Hossen and Kayes Mahamud after seeing hundreds of businesses suffer from bloated themes, buggy codebases, and unresponsive agencies. We set out to create a focused, agile engineering studio where founders can talk directly to the engineers building their software.'
              : 'এফকে ল্যাবস শুরু হয়েছে একটি সহজ লক্ষ্য নিয়ে—ক্লায়েন্টদের জটিলতা মুক্ত, দ্রুতগতির এবং নির্ভরযোগ্য ডিজিটাল সল্যুশন দেওয়া। মো: ফাহিম হোসেন এবং কায়েস মাহমুদ দুই ডেভেলপার একত্রিত হয়ে নিশ্চিত করছেন যে আপনার প্রতিটি আইডিয়া যাতে পায় সর্বোচ্চ টেকনিক্যাল পারফেকশন।'}
          </p>
        </div>

        {/* Culture grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 pt-8 border-t border-slate-800/60">
          {culturePrinciples.map((c, i) => (
            <div key={i} className="space-y-2">
              <div className="p-2.5 rounded-xl bg-slate-800/60 w-fit">{c.icon}</div>
              <h3 className="font-bold text-sm tracking-tight">{c.title}</h3>
              <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
