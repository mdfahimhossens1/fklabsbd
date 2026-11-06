import React, { useState } from 'react';
import {
  Calculator,
  Sparkles,
  Check,
  Clock,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  ShieldCheck,
} from 'lucide-react';
import { Language, Theme } from '../types';
import { DICTIONARY, PRICING_PLANS } from '../data/content';
import { ProjectEstimator } from '../components/ProjectEstimator';
import { playSound } from '../utils/audio';

interface PricingViewProps {
  lang: Language;
  theme: Theme;
  onOpenHireModal: (servicePref?: string) => void;
  onBookScope: (scope: any) => void;
}

export const PricingView: React.FC<PricingViewProps> = ({
  lang,
  theme,
  onOpenHireModal,
  onBookScope,
}) => {
  const isEn = lang === 'en';
  const t = DICTIONARY[lang].pricingSection;
  const [currency, setCurrency] = useState<'USD' | 'BDT'>('USD');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    playSound('click');
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: isEn ? 'How do project milestones and payments work?' : 'প্রজেক্টের পেমেন্ট ও কিস্তি কীভাবে কাজ করে?',
      a: isEn
        ? 'We typically work with 40% upfront upon architectural sign-off, 30% after staging delivery, and 30% final upon deployment and live verification. We accept Stripe, Bank Transfer, bKash, and Nagad.'
        : 'সাধারণত প্রজেক্ট শুরু করার সময় ৪০% অগ্রিম, স্টেজিং রিভিউ এর পর ৩০% এবং লাইভ ডিপ্লয়মেন্টের পর বাকি ৩০% প্রদান করতে হয়। লোকাল ক্লায়েন্টদের জন্য বিকাশ, নগদ এবং আন্তর্জাতিক ক্লায়েন্টদের জন্য Stripe বা ব্যাংক ট্রান্সফার সাপোর্ট রয়েছে।',
    },
    {
      q: isEn ? 'Do I own 100% of the source code and design assets?' : 'আমি কি সোর্স কোড ও ডিজাইনের সম্পূর্ণ মালিকানা পাব?',
      a: isEn
        ? 'Yes! You receive complete intellectual property and source code ownership upon final delivery, including GitHub repository transfer and Figma design files.'
        : 'হ্যাঁ, সম্পূর্ণ সোর্স কোড, গিটহাব রিপোজিটরি এবং ফিগমা ফাইলসমূহের পূর্ণ মালিকানা ও ইন্টেলেকচুয়াল প্রোপার্টি আপনার থাকবে।',
    },
    {
      q: isEn ? 'What is included in the free post-launch support?' : 'ফ্রি পোস্ট-লঞ্চ সাপোর্টে কী কী অন্তর্ভুক্ত?',
      a: isEn
        ? 'Every package includes free technical support covering bug fixes, speed audits, security updates, and DNS adjustments. We also provide full documentation on how to manage your product.'
        : 'প্রতিটি প্যাকেজে বিনামূল্যে বাগ ফিক্সিং, স্পিড মনিটরিং, সিকিউরিটি আপডেট এবং সাইট ম্যানেজমেন্ট ট্রেইনিং অন্তর্ভুক্ত থাকে।',
    },
    {
      q: isEn ? 'Can you handle custom requirements beyond these packages?' : 'প্যাকেজের বাইরে কোনো কাস্টম রিকোয়ারমেন্ট থাকলে কী করবেন?',
      a: isEn
        ? 'Absolutely! You can use our interactive Project Estimator below to customize your exact scope, pages, and features, or book a direct call with Fahim and Kayes.'
        : 'অবশ্যই! নিচের ইন্টারেক্টিভ প্রজেক্ট ক্যালকুলেটর ব্যবহার করে আপনার সঠিক প্রয়োজন ও বাজেট নির্ধারণ করতে পারেন, অথবা সরাসরি আমাদের সাথে কথা বলতে পারেন।',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Calculator className="w-3.5 h-3.5 text-indigo-400" />
          {t.tag}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-3">{t.title}</h1>
        <p className={`text-sm sm:text-base mt-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
          {t.subtitle}
        </p>

        {/* Currency Switcher */}
        <div className="inline-flex items-center p-1.5 rounded-2xl border mt-6 bg-slate-900/60 border-slate-800">
          <button
            onClick={() => {
              playSound('toggle');
              setCurrency('USD');
            }}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currency === 'USD'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            USD ($)
          </button>
          <button
            onClick={() => {
              playSound('toggle');
              setCurrency('BDT');
            }}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currency === 'BDT'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            BDT (৳)
          </button>
        </div>
      </div>

      {/* 3 Pricing Tier Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {PRICING_PLANS.map((plan) => {
          const isPopular = plan.popular;
          return (
            <div
              key={plan.id}
              className={`rounded-3xl p-7 sm:p-9 border transition-all flex flex-col justify-between relative overflow-hidden ${
                isPopular
                  ? theme === 'dark'
                    ? 'bg-slate-900 border-indigo-500 shadow-2xl shadow-indigo-950/50 ring-1 ring-indigo-500/50'
                    : 'bg-white border-indigo-500 shadow-xl ring-2 ring-indigo-500/30'
                  : theme === 'dark'
                  ? 'bg-slate-900/60 border-slate-800 shadow-lg'
                  : 'bg-white border-slate-200 shadow-md'
              }`}
            >
              {isPopular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-gradient-to-l from-indigo-600 to-purple-600 text-white text-[10px] font-black uppercase tracking-wider py-1.5 px-4 rounded-bl-2xl shadow-md">
                    {plan.badge?.[lang] || 'Recommended'}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight">{plan.name[lang]}</h3>
                <p className={`text-xs mt-1 min-h-[32px] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  {plan.idealFor[lang]}
                </p>

                {/* Price tag */}
                <div className="mt-5 pb-5 border-b border-slate-800/60">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                      {currency === 'USD' ? `$${plan.priceUSD}` : `৳${plan.priceBDT.toLocaleString()}`}
                    </span>
                    <span className="text-xs font-mono text-slate-400">/ project</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-indigo-300 font-medium mt-2">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{plan.deliveryTime[lang]}</span>
                  </div>
                </div>

                {/* Features list */}
                <div className="mt-6 space-y-3">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                    {isEn ? 'Package Deliverables:' : 'প্যাকেজে অন্তর্ভুক্ত:'}
                  </h4>
                  {plan.features[lang].map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs">
                      <div className="p-0.5 rounded-full bg-emerald-500/10 text-emerald-400 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className={theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-6 border-t border-slate-800/60">
                <button
                  onClick={() => {
                    playSound('pop');
                    onOpenHireModal(plan.name[lang]);
                  }}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all shadow-md ${
                    isPopular
                      ? 'text-white bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 shadow-indigo-600/30'
                      : theme === 'dark'
                      ? 'text-slate-200 bg-slate-800 hover:bg-slate-700'
                      : 'text-slate-800 bg-slate-100 hover:bg-slate-200'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isEn ? `Select ${plan.name.en}` : `${plan.name.bn} বেছে নিন`}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dynamic Project Estimator Section */}
      <div className="pt-6">
        <ProjectEstimator
          lang={lang}
          theme={theme}
          onBookScope={onBookScope}
        />
      </div>

      {/* Pricing FAQs Accordion */}
      <div className="max-w-3xl mx-auto pt-6">
        <div className="text-center mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold">
            {isEn ? 'Got Questions?' : 'সাধারণ প্রশ্নোত্তর'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-1">
            {isEn ? 'Frequently Asked Questions' : 'প্রাইসিং ও ডেলিভারি সম্পর্কিত প্রশ্ন'}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all ${
                  theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-sm"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-indigo-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
