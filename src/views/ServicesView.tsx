import React from 'react';
import {
  Layers,
  Code2,
  Globe,
  Palette,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Zap,
  Server,
  FileCode,
} from 'lucide-react';
import { Language, Theme } from '../types';
import { DICTIONARY, SERVICES_DATA } from '../data/content';
import { playSound } from '../utils/audio';

interface ServicesViewProps {
  lang: Language;
  theme: Theme;
  onOpenHireModal: (servicePref?: string) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  lang,
  theme,
  onOpenHireModal,
}) => {
  const isEn = lang === 'en';
  const t = DICTIONARY[lang].servicesSection;

  const processSteps = [
    {
      num: '01',
      title: isEn ? 'Scope & Architectural Blueprint' : 'প্রজেক্ট স্কোপ ও আর্কিটেকচারাল ব্লুপ্রিন্ট',
      desc: isEn
        ? 'We analyze your business goals, draft data models, user flows, and tech stack choices.'
        : 'আপনার বিজনেস আইডিয়া বিশ্লেষণ করে ডাটাবেজ মডেল, ইউজার ফ্লো এবং সেরা টেক স্ট্যাক নির্ধারণ করি।',
      icon: <Server className="w-5 h-5 text-indigo-400" />,
    },
    {
      num: '02',
      title: isEn ? 'UI/UX & Interactive Prototypes' : 'UI/UX এবং ইন্টারেক্টিভ প্রোটোটাইপ',
      desc: isEn
        ? 'High-fidelity Figma wireframes, design tokens, and fluid component interactions.'
        : 'হাই-ফিডেলিটি ফিগমা ডিজাইন, রেসপন্সিভ গ্রিডস এবং মসৃণ মাইক্রো-ইন্টারঅ্যাকশন তৈরি করি।',
      icon: <Palette className="w-5 h-5 text-purple-400" />,
    },
    {
      num: '03',
      title: isEn ? 'Full-Stack Development Sprints' : 'ফুল-স্ট্যাক ডেভেলপমেন্ট স্প্রিন্টস',
      desc: isEn
        ? 'Clean, modular coding with React/Angular, Laravel/PHP, or WordPress with unit tests.'
        : 'React/Angular, Laravel/PHP অথবা WordPress দিয়ে ক্লিন ও মডুলার কোড লিখি।',
      icon: <Code2 className="w-5 h-5 text-cyan-400" />,
    },
    {
      num: '04',
      title: isEn ? 'Speed, Security & Core Web Vitals Audit' : 'স্পিড, সিকিউরিটি ও কোর ওয়েব ভাইটালস টেস্ট',
      desc: isEn
        ? 'Sub-second optimization, Lighthouse 95+ score validation, SQL hardening, SSL security.'
        : '১ সেকেন্ডের নিচে লোড স্পিড নিশ্চিতকরণ, লাইটহাউস ৯৫+ স্কোর এবং ডাটাবেজ সিকিউরিটি অডিট।',
      icon: <Zap className="w-5 h-5 text-amber-400" />,
    },
    {
      num: '05',
      title: isEn ? 'Deployment & Priority Ongoing Support' : 'ডিপ্লয়মেন্ট ও ফ্রি পোস্ট-লঞ্চ সাপোর্ট',
      desc: isEn
        ? 'Zero-downtime deployment, DNS setup, and dedicated technical maintenance warranty.'
        : 'ক্লাউড হোস্টিংয়ে জিরো-ডাউনটাইম লাইভ ডিপ্লয়মেন্ট এবং ফ্রি টেকনিক্যাল মেইনটেনেন্স গ্যারান্টি।',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Layers className="w-3.5 h-3.5 text-indigo-400" />
          {t.tag}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-3">{t.title}</h1>
        <p className={`text-sm sm:text-base mt-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
          {t.subtitle}
        </p>
      </div>

      {/* Services List Deep-Dive */}
      <div className="space-y-8">
        {SERVICES_DATA.map((srv, index) => {
          const isSaaS = srv.id.includes('saas');
          const isWP = srv.id.includes('wordpress');
          const isWeb = srv.id.includes('web');
          const isUIUX = srv.id.includes('uiux');
          const isAI = srv.id.includes('ai');

          const icon = isSaaS ? (
            <Layers className="w-6 h-6 text-indigo-400" />
          ) : isWP ? (
            <Globe className="w-6 h-6 text-emerald-400" />
          ) : isWeb ? (
            <Code2 className="w-6 h-6 text-cyan-400" />
          ) : isUIUX ? (
            <Palette className="w-6 h-6 text-purple-400" />
          ) : (
            <Sparkles className="w-6 h-6 text-amber-400" />
          );

          const title = isSaaS
            ? isEn ? 'SaaS Product Architecture & Multi-Tenancy' : 'SaaS প্রোডাক্ট আর্কিটেকচার ও মাল্টি-টেন্যান্সি'
            : isWP
            ? isEn ? 'WordPress Custom Theme & Plugin Engineering' : 'ওয়ার্ডপ্রেস কাস্টম থিম ও প্লাগিন ইঞ্জিনিয়ারিং'
            : isWeb
            ? isEn ? 'Full-Stack Web Applications (React, Angular, PHP, Laravel)' : 'ফুল-স্ট্যাক ওয়েব অ্যাপ্লিকেশন (React, Angular, PHP, Laravel)'
            : isUIUX
            ? isEn ? 'UI/UX Design Systems & High-Fidelity Prototypes' : 'UI/UX ডিজাইন সিস্টেমস এবং হাই-ফিডেলিটি প্রোটোটাইপ'
            : isEn ? 'AI Workflow Automations & Gemini/LLM Integration' : 'স্মার্ট এআই অটোমেশন এবং এলএলএম ইন্টিগ্রেশন';

          const desc = isSaaS
            ? isEn
              ? 'Engineered by Md. Fahim Hossen. Scalable SaaS systems built with React or Angular frontends and Laravel/Node backend services. Includes automated recurring billing (Stripe, bKash, SSLCommerz), role-based permissions, multi-tenant database separation, and high-concurrency webhooks.'
              : 'মো: ফাহিম হোসেনের তত্ত্বাবধানে নির্মিত। React বা Angular ফ্রন্টএন্ড এবং Laravel/Node ব্যাকএন্ড সমৃদ্ধ স্কেলেবল SaaS প্ল্যাটফর্ম। সাবস্ক্রিপশন অটোমেশন, মাল্টি-টেন্যান্ট ডাটাবেজ এবং রোল-বেজড সিকিউরিটি অন্তর্ভুক্ত।'
            : isWP
            ? isEn
              ? 'Engineered by Kayes Mahamud. Custom, bloat-free WordPress themes and lightweight bespoke plugins built without heavy slow page-builders. Includes bespoke WooCommerce checkouts, speed optimization with 95+ PageSpeed scores, and custom Gutenberg blocks.'
              : 'কায়েস মাহমুদের পরিচালনায় নির্মিত। কোনো ভারী প্লাগিন ছাড়া সম্পূর্ণ কোডিং করা লাইটওয়েট থিম এবং কাস্টম প্লাগিন। ৯৫+ গুগল পেজস্পিড স্কোর, সুপারফাস্ট উ-কমার্স চেকআউট এবং কাস্টম গুটেনবার্গ ব্লকস।'
            : isWeb
            ? isEn
              ? 'Tailored enterprise portals, business websites, and dynamic web apps utilizing React.js, Angular, PHP, Laravel, Tailwind CSS, and Bootstrap 5. Pixel-perfect responsiveness, SEO-optimized semantic markup, and reliable database architectures.'
              : 'React, Angular, PHP, Laravel এবং Tailwind/Bootstrap দিয়ে তৈরি অত্যাধুনিক ওয়েব পোর্টাল। সুপারফাস্ট লোডিং, শতভাগ রেসপন্সিভ ডিজাইন এবং স্কেলেবল ডাটাবেজ আর্কিটেকচার।'
            : isUIUX
            ? isEn
              ? 'Modern, clean, conversion-tested UI/UX design crafted in Figma. Comprehensive design systems, typography hierarchies, fluid micro-interactions, dark/light color tokens, and production-ready handoff files.'
              : 'মডার্ন ও মিনিমাল ফিগমা ডিজাইন সিস্টেম। আকর্ষণীয় ইন্টারফেস, ইউজার-ফ্রেন্ডলি ফ্লো, লাইট/ডার্ক মোড টোকেন এবং সম্পূর্ণ রেসপন্সিভ প্রোটোটাইপ।'
            : isEn
              ? 'Empower your web apps with cutting-edge AI. Integration of Google Gemini API, OpenAI, automated customer intake bots, CRM webhook workflows, and document semantic search.'
              : 'আপনার অ্যাপ্লিকেশনে আধুনিক এআই যুক্ত করুন। গুগল জেমিনাই API, স্মার্ট কাস্টমার সাপোর্ট চ্যাটবট, অটোমেটেড লিড কোয়ালিফিকেশন এবং সিআরএম ওয়ার্কফ্লো।';

          const deliverables = isSaaS
            ? [
                isEn ? 'Complete Source Code Repository with CI/CD' : 'সম্পূর্ণ সোর্স কোড ও ক্লাউড ডিপ্লয়মেন্ট',
                isEn ? 'Automated Subscription Billing & Invoicing Engine' : 'অটোমেটেড সাবস্ক্রিপশন বিলিং ও ইনভয়েস সিস্টেম',
                isEn ? 'Granular Multi-Tenant Database & Role Control' : 'মাল্টি-টেন্যান্ট ডাটাবেজ ও রোল পারমিশন',
                isEn ? 'Interactive Analytics Charts & Data Filters' : 'লাইভ অ্যানালিটিক্স ও ডায়নামিক ফিল্টার ড্যাশবোর্ড',
              ]
            : isWP
            ? [
                isEn ? '100% Bespoke WordPress Theme (Zero bloated builders)' : '১০০% কাস্টম কোডেড থিম (কোনো ভারী বিল্ডার ছাড়া)',
                isEn ? 'Custom WordPress Plugin for unique business logic' : 'কাস্টম ওয়ার্ডপ্রেস প্লাগিন ও ফাংশনালিটি',
                isEn ? 'Core Web Vitals 95+ Google PageSpeed Guarantee' : 'কোর ওয়েব ভাইটালস ৯৫+ পেজস্পিড গ্যারান্টি',
                isEn ? 'Seamless Payment Gateway Integration' : 'বিকাশ, নগদ, Stripe বা কার্ড পেমেন্ট গেটওয়ে',
              ]
            : isWeb
            ? [
                isEn ? 'React.js / Angular SPA with Laravel API backend' : 'React.js / Angular SPA এবং Laravel REST API',
                isEn ? 'Tailwind CSS / Bootstrap 5 responsive layout' : 'Tailwind CSS / Bootstrap 5 নিখুঁত রেসপন্সিভ লেআউট',
                isEn ? 'Automated Email Notifications & Contact Pipelines' : 'অটোমেটেড ইমেইল অ্যালার্ট ও কন্টাক্ট সিস্টেম',
                isEn ? 'SEO structured meta data and OpenGraph tags' : 'অ্যাডভান্সড এসইও ও মেটা ডাটা অপটিমাইজেশন',
              ]
            : isUIUX
            ? [
                isEn ? 'Full Figma Workspace with Components & Auto-Layout' : 'কম্পোনেন্ট ও অটো-লেআউট সমৃদ্ধ পূর্ণাঙ্গ ফিগমা ফাইল',
                isEn ? 'Interactive Clickable Prototype for Mobile & Desktop' : 'মোবাইল ও ডেস্কটপ ইন্টারেক্টিভ প্রোটোটাইপ',
                isEn ? 'Design System Tokens (Colors, Typography, Elevation)' : 'ডিজাইন সিস্টেম টোকেনস ও কালার গাইডলাইন',
                isEn ? 'Developer Handoff Documentation' : 'ডেভেলপারদের জন্য নিখুঁত হ্যান্ডঅফ ডকুমেন্টেশন',
              ]
            : [
                isEn ? 'Gemini AI API Key Configuration & Server Proxy' : 'জেমিনাই এআই কনফিগারেশন ও সিকিউর সার্ভার প্রক্সি',
                isEn ? 'Automated Webhook Sync with Slack / CRM / Sheets' : 'স্ল্যাক, গুগল শিটস ও সিআরএম-এর সাথে ওয়েবহুক সিংক',
                isEn ? 'Smart Lead Classification & Natural Language Chat' : 'স্মার্ট লিড কোয়ালিফিকেশন ও চ্যাটবট ইন্টারফেস',
                isEn ? 'Production Prompt Engineering & Safeguards' : 'প্রোডাকশন-গ্রেড প্রম্পট ও ফিল্টার সুরক্ষা',
              ];

          return (
            <div
              key={srv.id}
              className={`rounded-3xl p-6 sm:p-10 border transition-all ${
                theme === 'dark'
                  ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700 shadow-xl'
                  : 'bg-white border-slate-200 shadow-lg'
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Service Info (8 cols) */}
                <div className="lg:col-span-8 space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                      {icon}
                    </div>
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold">
                        Service 0{index + 1}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-black tracking-tight">{title}</h2>
                    </div>
                  </div>

                  <p className={`text-xs sm:text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                    {desc}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="pt-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-3">
                      {isEn ? 'Included Deliverables:' : 'অন্তর্ভুক্ত সেবাসমূহ:'}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {deliverables.map((deliv, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span className={theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}>{deliv}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="pt-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-2">
                      {isEn ? 'Tech Stack Applied:' : 'ব্যবহৃত টেকনোলজি:'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {srv.technologies.map((t) => (
                        <span
                          key={t}
                          className={`px-3 py-1 rounded-xl text-xs font-mono border ${
                            theme === 'dark'
                              ? 'bg-slate-800 border-slate-700 text-slate-200'
                              : 'bg-slate-100 border-slate-200 text-slate-800'
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Service Meta & Booking Card (4 cols) */}
                <div
                  className={`lg:col-span-4 rounded-2xl p-6 border flex flex-col justify-between ${
                    theme === 'dark'
                      ? 'bg-slate-950/70 border-slate-800'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-mono text-slate-400">
                        {isEn ? 'Investment Range:' : 'আনুমানিক বাজেট:'}
                      </span>
                      <div className="text-xl sm:text-2xl font-black text-indigo-400 mt-0.5">
                        {srv.startingPrice}
                      </div>
                      <p className="text-[11px] text-emerald-500 font-medium mt-1">
                        {isSaaS ? '✓ Open to discussion & flexible scoping' : '✓ Scope-based negotiation available'}
                      </p>
                    </div>

                    <div>
                      <span className="text-xs font-mono text-slate-400">
                        {isEn ? 'Typical Delivery:' : 'ডেলিভারি সময়সীমা:'}
                      </span>
                      <div className="flex items-center gap-1.5 text-sm font-semibold mt-0.5">
                        <Clock className="w-4 h-4 text-cyan-400" />
                        <span>{srv.estimatedTimeline}</span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-400 space-y-1.5 pt-2 border-t border-slate-800/60">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{isEn ? 'Clean code guarantee' : '১০০% ক্লিন কোড গ্যারান্টি'}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{isEn ? 'Free post-launch support' : 'ফ্রি পোস্ট-লঞ্চ সাপোর্ট'}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{isEn ? 'Direct engineer communication' : 'সরাসরি ডেভেলপারদের সাথে আলোচনা'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() => {
                        playSound('pop');
                        onOpenHireModal(srv.id);
                      }}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
                      <span>{isEn ? 'Book This Service' : 'এই সার্ভিসটি বুক করুন'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 5-Step Process Timeline */}
      <div className="pt-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            {isEn ? 'The FK Labs Workflow' : 'আমাদের কাজের ধাপসমূহ'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mt-3">
            {isEn ? 'How We Take Your Project From Idea to Scale' : 'আইডিয়া থেকে সাকসেসফুল প্রজেক্ট ডেলিভারি পর্যন্ত'}
          </h2>
          <p className={`text-xs sm:text-sm mt-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            {isEn
              ? 'A disciplined 5-phase engineering protocol that guarantees speed, precision, and predictability.'
              : 'একটি সুশৃঙ্খল ৫-ধাপের প্রক্রিয়া যা আপনার প্রজেক্টের সময়, মান ও গতি নিশ্চিত করে।'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {processSteps.map((step) => (
            <div
              key={step.num}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                theme === 'dark'
                  ? 'bg-slate-900/60 border-slate-800'
                  : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div>
                <span className="text-2xl font-black font-mono text-indigo-400">{step.num}</span>
                <div className="my-3">{step.icon}</div>
                <h3 className="font-bold text-sm tracking-tight">{step.title}</h3>
                <p className={`text-xs mt-2 leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
