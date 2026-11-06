import React, { useState } from 'react';
import {
  Layers,
  Globe,
  Sparkles,
  Zap,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Copy,
  Check,
} from 'lucide-react';
import { Language, Theme } from '../types';
import { DICTIONARY } from '../data/content';
import { playSound } from '../utils/audio';

interface ProjectEstimatorProps {
  lang: Language;
  theme: Theme;
  onBookScope: (scopeSummary: {
    productType: string;
    pages: string;
    features: string[];
    urgency: string;
    estimatedUSD: number;
    estimatedBDT: number;
    deliveryWeeks: string;
  }) => void;
}

export const ProjectEstimator: React.FC<ProjectEstimatorProps> = ({
  lang,
  theme,
  onBookScope,
}) => {
  const t = DICTIONARY[lang].estimatorSection;
  const isEn = lang === 'en';

  // 1. Product Type selection
  const productOptions = [
    {
      id: 'saas',
      title: isEn ? 'Enterprise SaaS Platform' : 'এন্টারপ্রাইজ SaaS প্ল্যাটফর্ম',
      desc: isEn ? 'React/Angular + Laravel/Node with subscriptions' : 'রিঅ্যাক্ট/অ্যাঙ্গুলার + লারাভেল ব্যাকএন্ড ও সাবস্ক্রিপশন',
      baseUSD: 850,
      baseBDT: 92000,
      days: 28,
      icon: <Layers className="w-5 h-5 text-indigo-400" />,
    },
    {
      id: 'wordpress',
      title: isEn ? 'Custom WordPress & WooCommerce' : 'কাস্টম ওয়ার্ডপ্রেস ও উ-কমার্স',
      desc: isEn ? 'Fast bespoke theme, plugins, and checkout' : 'কাস্টম স্পিডি থিম, প্লাগিন ও অপটিমাইজড চেকআউট',
      baseUSD: 390,
      baseBDT: 42000,
      days: 12,
      icon: <Globe className="w-5 h-5 text-emerald-400" />,
    },
    {
      id: 'webapp',
      title: isEn ? 'Full-Stack Custom Web App' : 'ফুল-স্ট্যাক কাস্টম ওয়েব অ্যাপ',
      desc: isEn ? 'Custom database, API endpoints & rich UI' : 'কাস্টম ডাটাবেস, এপিআই ও রেসপন্সিভ রিঅ্যাক্টিভ ইন্টারফেস',
      baseUSD: 590,
      baseBDT: 64000,
      days: 18,
      icon: <Zap className="w-5 h-5 text-cyan-400" />,
    },
    {
      id: 'landing',
      title: isEn ? 'High-Converting Landing Page' : 'হাই-কনভার্টিং ল্যান্ডিং পেজ',
      desc: isEn ? 'Modern branding, speed-optimized, interactive' : 'মডার্ন ব্র্যান্ডিং, দ্রুতগতির ও কনভার্সন অপটিমাইজড',
      baseUSD: 240,
      baseBDT: 26000,
      days: 6,
      icon: <Sparkles className="w-5 h-5 text-purple-400" />,
    },
  ];

  // 2. Page counts
  const pageOptions = [
    { id: '1-3', label: isEn ? '1 - 3 Pages / Views' : '১ - ৩টি পেজ / ভিউজ', multiplier: 1.0, addedDays: 0 },
    { id: '4-7', label: isEn ? '4 - 7 Pages / Views' : '৪ - ৭টি পেজ / ভিউজ', multiplier: 1.25, addedDays: 4 },
    { id: '8-14', label: isEn ? '8 - 14 Pages / Views' : '৮ - ১৪টি পেজ / ভিউজ', multiplier: 1.55, addedDays: 8 },
    { id: '15+', label: isEn ? '15+ Enterprise Views' : '১৫+ এন্টারপ্রাইজ ভিউজ', multiplier: 1.9, addedDays: 14 },
  ];

  // 3. Features & Add-ons
  const featureOptions = [
    {
      id: '3d',
      name: isEn ? 'Interactive 3D / Three.js Visuals' : 'ইন্টারেক্টিভ ৩D / থ্রি.জেএস ভিজ্যুয়াল',
      costUSD: 140,
      costBDT: 15000,
      days: 3,
    },
    {
      id: 'payment',
      name: isEn ? 'Payment Gateway (Stripe, bKash, SSL)' : 'পেমেন্ট গেটওয়ে (Stripe, বিকাশ, SSLCommerz)',
      costUSD: 120,
      costBDT: 13000,
      days: 3,
    },
    {
      id: 'auth',
      name: isEn ? 'User Roles, Permissions & Auth' : 'ইউজার রোলস, পারমিশন ও সাইন-ইন',
      costUSD: 100,
      costBDT: 11000,
      days: 2,
    },
    {
      id: 'ai',
      name: isEn ? 'AI Workflow & LLM Automation' : 'স্মার্ট এআই অটোমেশন ও বট ইন্টিগ্রেশন',
      costUSD: 160,
      costBDT: 17500,
      days: 4,
    },
    {
      id: 'speed',
      name: isEn ? 'PageSpeed 95+ Core Web Vitals Guarantee' : 'পেজস্পিড ৯৫+ কোর ওয়েব ভাইটালস গ্যারান্টি',
      costUSD: 80,
      costBDT: 8500,
      days: 2,
    },
    {
      id: 'seo',
      name: isEn ? 'Advanced SEO & Schema Architecture' : 'অ্যাডভান্সড এসইও ও স্কিমা আর্কিটেকচার',
      costUSD: 70,
      costBDT: 7500,
      days: 2,
    },
  ];

  // 4. Urgency
  const urgencyOptions = [
    { id: 'standard', label: isEn ? 'Standard Speed (Balanced)' : 'স্বাভাবিক গতি (প্রস্তাবিত)', mult: 1.0, dayMult: 1.0 },
    { id: 'priority', label: isEn ? 'Priority Sprint (+20% faster)' : 'প্রায়োরিটি স্প্রিন্ট (২০% দ্রুত)', mult: 1.2, dayMult: 0.8 },
    { id: 'express', label: isEn ? 'Express VIP Delivery' : 'এক্সপ্রেস ভিআইপি ডেলিভারি', mult: 1.45, dayMult: 0.6 },
  ];

  // Selection states
  const [selectedProduct, setSelectedProduct] = useState(productOptions[0].id);
  const [selectedPage, setSelectedPage] = useState(pageOptions[1].id);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['payment', 'speed']);
  const [selectedUrgency, setSelectedUrgency] = useState(urgencyOptions[0].id);
  const [copied, setCopied] = useState(false);

  // Toggle feature
  const handleFeatureToggle = (id: string) => {
    playSound('toggle');
    if (selectedFeatures.includes(id)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== id));
    } else {
      setSelectedFeatures([...selectedFeatures, id]);
    }
  };

  // Calculations
  const activeProduct = productOptions.find((p) => p.id === selectedProduct)!;
  const activePage = pageOptions.find((p) => p.id === selectedPage)!;
  const activeUrgency = urgencyOptions.find((u) => u.id === selectedUrgency)!;

  const featuresUSD = selectedFeatures.reduce((acc, fId) => {
    const f = featureOptions.find((item) => item.id === fId);
    return acc + (f ? f.costUSD : 0);
  }, 0);

  const featuresBDT = selectedFeatures.reduce((acc, fId) => {
    const f = featureOptions.find((item) => item.id === fId);
    return acc + (f ? f.costBDT : 0);
  }, 0);

  const totalUSD = Math.round(
    (activeProduct.baseUSD * activePage.multiplier + featuresUSD) * activeUrgency.mult
  );

  const totalBDT = Math.round(
    (activeProduct.baseBDT * activePage.multiplier + featuresBDT) * activeUrgency.mult
  );

  const totalDays = Math.max(
    3,
    Math.round((activeProduct.days + activePage.addedDays) * activeUrgency.dayMult)
  );

  const deliveryWeeks =
    totalDays <= 7
      ? isEn ? '1 Week' : '১ সপ্তাহ'
      : totalDays <= 14
      ? isEn ? '2 Weeks' : '২ সপ্তাহ'
      : totalDays <= 21
      ? isEn ? '3 Weeks' : '৩ সপ্তাহ'
      : `${Math.ceil(totalDays / 7)} ${isEn ? 'Weeks' : 'সপ্তাহ'}`;

  const handleBook = () => {
    playSound('pop');
    onBookScope({
      productType: activeProduct.title,
      pages: activePage.label,
      features: selectedFeatures.map((fId) => featureOptions.find((f) => f.id === fId)?.name || fId),
      urgency: activeUrgency.label,
      estimatedUSD: totalUSD,
      estimatedBDT: totalBDT,
      deliveryWeeks,
    });
  };

  const handleCopyQuote = () => {
    playSound('click');
    const quoteText = `FK Labs Project Estimate:\n- Product: ${activeProduct.title}\n- Scope: ${activePage.label}\n- Features: ${selectedFeatures.map(f => featureOptions.find(item => item.id === f)?.name).join(', ')}\n- Estimated Investment: $${totalUSD} USD / ৳${totalBDT.toLocaleString()} BDT\n- Estimated Delivery: ~${totalDays} Days (${deliveryWeeks})\n- Contact: mdfahimhossen.dev@gmail.com`;
    navigator.clipboard.writeText(quoteText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReset = () => {
    playSound('click');
    setSelectedProduct(productOptions[0].id);
    setSelectedPage(pageOptions[1].id);
    setSelectedFeatures(['payment', 'speed']);
    setSelectedUrgency(urgencyOptions[0].id);
  };

  return (
    <div
      className={`rounded-3xl p-6 sm:p-10 border transition-all ${
        theme === 'dark'
          ? 'bg-slate-900/90 border-slate-800 shadow-2xl shadow-indigo-950/30'
          : 'bg-white border-slate-200 shadow-xl shadow-slate-200/60'
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-700/40">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            {t.tag}
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2">{t.title}</h3>
          <p className={`text-sm mt-1 max-w-2xl ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            {t.subtitle}
          </p>
        </div>
        <button
          onClick={handleReset}
          className={`self-start md:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
            theme === 'dark'
              ? 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              : 'border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
          title="Reset selections"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{isEn ? 'Reset Options' : 'রিসেট করুন'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Left Column: Interactive Options (7 cols) */}
        <div className="lg:col-span-7 space-y-7">
          {/* Step 1: Product Type */}
          <div>
            <label className="block text-sm font-bold tracking-wide uppercase text-indigo-400 mb-3">
              {t.platformLabel}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {productOptions.map((opt) => {
                const selected = selectedProduct === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      playSound('click');
                      setSelectedProduct(opt.id);
                    }}
                    className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                      selected
                        ? 'border-indigo-500 bg-indigo-500/10 shadow-md shadow-indigo-500/10 ring-1 ring-indigo-500'
                        : theme === 'dark'
                        ? 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                        : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 rounded-xl bg-slate-800/80">{opt.icon}</div>
                      {selected && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm tracking-tight">{opt.title}</h4>
                      <p className={`text-xs mt-1 leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                        {opt.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Page Counts */}
          <div>
            <label className="block text-sm font-bold tracking-wide uppercase text-indigo-400 mb-3">
              {t.pagesLabel}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {pageOptions.map((opt) => {
                const selected = selectedPage === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      playSound('click');
                      setSelectedPage(opt.id);
                    }}
                    className={`p-3 rounded-xl text-center text-xs font-semibold border transition-all ${
                      selected
                        ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300 ring-1 ring-indigo-500 font-bold'
                        : theme === 'dark'
                        ? 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Add-on Capabilities */}
          <div>
            <label className="block text-sm font-bold tracking-wide uppercase text-indigo-400 mb-3">
              {t.featuresLabel}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {featureOptions.map((f) => {
                const active = selectedFeatures.includes(f.id);
                return (
                  <button
                    key={f.id}
                    onClick={() => handleFeatureToggle(f.id)}
                    className={`p-3 rounded-xl text-left border transition-all flex items-center justify-between text-xs ${
                      active
                        ? 'border-indigo-500/80 bg-indigo-500/10 text-slate-100 font-semibold'
                        : theme === 'dark'
                        ? 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span className="flex-1 pr-2">{f.name}</span>
                    <span
                      className={`inline-flex items-center justify-center w-5 h-5 rounded-md border text-[10px] ${
                        active
                          ? 'bg-indigo-600 border-indigo-400 text-white'
                          : theme === 'dark'
                          ? 'border-slate-700 bg-slate-800'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {active ? '✓' : '+'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Urgency */}
          <div>
            <label className="block text-sm font-bold tracking-wide uppercase text-indigo-400 mb-3">
              {t.timelineLabel}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {urgencyOptions.map((opt) => {
                const selected = selectedUrgency === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      playSound('click');
                      setSelectedUrgency(opt.id);
                    }}
                    className={`p-3 rounded-xl text-center text-xs font-semibold border transition-all ${
                      selected
                        ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300 ring-1 ring-indigo-500 font-bold'
                        : theme === 'dark'
                        ? 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Live Estimate Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div
            className={`rounded-2xl p-6 sm:p-8 border h-full flex flex-col justify-between relative overflow-hidden ${
              theme === 'dark'
                ? 'bg-gradient-to-b from-slate-950 to-slate-900 border-indigo-500/30 shadow-2xl'
                : 'bg-gradient-to-b from-indigo-50/70 to-white border-indigo-200 shadow-xl'
            }`}
          >
            {/* Ambient glow */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-44 h-44 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest font-mono text-indigo-400 font-bold">
                  {t.summaryTitle}
                </span>
                <button
                  onClick={handleCopyQuote}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-indigo-400 transition-colors"
                  title="Copy quote summary"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">{isEn ? 'Copied' : 'কপি হয়েছে'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{isEn ? 'Copy Quote' : 'কপি করুন'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Price display */}
              <div className="mt-5 pt-5 border-t border-slate-700/30">
                <p className="text-xs font-mono text-slate-400">{t.estimatedCost}</p>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
                    ${totalUSD}
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-slate-400">
                    / ৳{totalBDT.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-3 text-sm text-indigo-300 font-medium">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  <span>{t.estimatedDays} <strong className="text-white font-bold">{totalDays} {isEn ? 'Days' : 'দিন'} (~{deliveryWeeks})</strong></span>
                </div>
              </div>

              {/* Scope Breakdown */}
              <div className="mt-6 space-y-2.5 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">{isEn ? 'Selected Core:' : 'নির্বাচিত ক্যাটাগরি:'}</span>
                  <span className="font-semibold text-right">{activeProduct.title}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">{isEn ? 'Screen Scope:' : 'স্ক্রিন সংখ্যা:'}</span>
                  <span className="font-semibold text-right">{activePage.label}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">{isEn ? 'Active Add-ons:' : 'অতিরিক্ত ফিচার:'}</span>
                  <span className="font-semibold text-indigo-300 text-right">
                    {selectedFeatures.length} {isEn ? 'features selected' : 'টি ফিচার সক্রিয়'}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">{isEn ? 'Delivery Pace:' : 'ডেলিভারি মোড:'}</span>
                  <span className="font-semibold text-right">{activeUrgency.label}</span>
                </div>
              </div>

              {/* Guarantee */}
              <div className="mt-5 p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-start gap-2 text-[11px] text-indigo-300">
                <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>{t.guarantee}</span>
              </div>
            </div>

            {/* Book Scope CTA */}
            <div className="mt-6 pt-4">
              <button
                onClick={handleBook}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>{t.bookScopeBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
