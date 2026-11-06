import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Code2,
  CheckCircle,
  ExternalLink,
  MessageSquare,
  Star,
  Users,
  Layers,
  Globe,
  Terminal,
  Cpu,
  Lock,
} from 'lucide-react';
import { NavPage, PortfolioItem, Theme } from '../types';
import { FOUNDERS_DATA, PORTFOLIO_DATA, SERVICES_DATA, TESTIMONIALS_DATA } from '../data/content';
import { FaqSection } from '../components/FaqSection';

interface HomeViewProps {
  theme: Theme;
  onNavigate: (page: NavPage) => void;
  onOpenHireModal: (servicePref?: string) => void;
  onSelectProject: (project: PortfolioItem) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  theme,
  onNavigate,
  onOpenHireModal,
  onSelectProject,
}) => {
  const techBadges = [
    { name: 'React.js', icon: '⚛' },
    { name: 'Next.js', icon: '▲' },
    { name: 'Angular', icon: '🅰' },
    { name: 'PHP', icon: '🐘' },
    { name: 'Laravel', icon: '🔴' },
    { name: 'Tailwind CSS', icon: '🎨' },
    { name: 'Bootstrap 5', icon: '🅱' },
    { name: 'WordPress', icon: '🌐' },
    { name: 'WooCommerce', icon: '🛒' },
    { name: 'TypeScript', icon: 'TS' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'MySQL', icon: '🐬' },
  ];

  return (
    <div className="space-y-24 sm:space-y-28">
      {/* 1. HERO SECTION */}
      <section className="relative pt-10 sm:pt-16 pb-12 sm:pb-16 overflow-hidden">
        {/* Subtle background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Quiet Agency Label */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available for Q1/Q2 Digital Projects</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] text-slate-900 dark:text-white">
                Engineering Scalable Web Apps & Modern SaaS Platforms.
              </h1>

              {/* Clean Subheading */}
              <p className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 text-slate-600 dark:text-slate-300">
                FK Labs is an elite software engineering agency. We build bespoke full-stack web applications, robust SaaS products, and lightning-fast WordPress solutions with clean architecture and direct senior engineer access.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => onOpenHireModal()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 shadow-md transition-all active:scale-[0.98]"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    onNavigate('portfolio');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold border transition-all ${
                    theme === 'dark'
                      ? 'border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-200'
                      : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <span>View Our Work</span>
                </button>
              </div>

              {/* Proof Points */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 dark:text-slate-400 font-mono">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>35+ Production Releases</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>95+ Core Web Vitals</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-500" />
                  <span>100% IP & Code Ownership</span>
                </div>
              </div>
            </div>

            {/* Right: Architectural Agency Showcase Card (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div
                className={`w-full max-w-md rounded-2xl border p-6 sm:p-7 shadow-xl transition-all ${
                  theme === 'dark'
                    ? 'bg-slate-900/90 border-slate-800 shadow-indigo-950/20'
                    : 'bg-white border-slate-200 shadow-slate-200/80'
                }`}
              >
                {/* Window Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-[11px] font-mono text-slate-500 ml-2">fklabs-system.ts</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-500 font-bold">READY</span>
                </div>

                {/* Mock Code & Capabilities */}
                <div className="mt-4 font-mono text-xs space-y-2 leading-relaxed">
                  <p className="text-slate-400 dark:text-slate-500">// FK Labs Engineering Spec</p>
                  <p>
                    <span className="text-indigo-600 dark:text-indigo-400">const</span>{' '}
                    <span className="text-slate-900 dark:text-white font-bold">agencyServices</span> = &#123;
                  </p>
                  <p className="pl-4 text-slate-600 dark:text-slate-300">
                    saasArchitecture:{' '}
                    <span className="text-emerald-600 dark:text-emerald-400">'Multi-Tenant & Scale'</span>,
                  </p>
                  <p className="pl-4 text-slate-600 dark:text-slate-300">
                    frontend:{' '}
                    <span className="text-emerald-600 dark:text-emerald-400">'React.js · Next.js · Angular'</span>,
                  </p>
                  <p className="pl-4 text-slate-600 dark:text-slate-300">
                    backend:{' '}
                    <span className="text-emerald-600 dark:text-emerald-400">'PHP · Laravel · Node.js · APIs'</span>,
                  </p>
                  <p className="pl-4 text-slate-600 dark:text-slate-300">
                    cmsEngine:{' '}
                    <span className="text-emerald-600 dark:text-emerald-400">'Bespoke WordPress & Plugins'</span>,
                  </p>
                  <p className="pl-4 text-slate-600 dark:text-slate-300">
                    delivery:{' '}
                    <span className="text-emerald-600 dark:text-emerald-400">'Direct Senior Engineer Access'</span>,
                  </p>
                  <p>&#125;;</p>
                </div>

                {/* Quick Consultation Badge */}
                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs font-semibold text-slate-900 dark:text-white">Senior Lead Only</span>
                  </div>
                  <button
                    onClick={() => onOpenHireModal()}
                    className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Request Proposal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TECH STACK BADGES */}
      <section className="border-y border-slate-200 dark:border-slate-800/80 py-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-5">
            Core Production Technologies & Frameworks
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
            {techBadges.map((badge) => (
              <div
                key={badge.name}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-mono font-medium transition-colors ${
                  theme === 'dark'
                    ? 'bg-slate-900/80 border-slate-800 text-slate-200'
                    : 'bg-white border-slate-200 text-slate-800 shadow-sm'
                }`}
              >
                <span>{badge.icon}</span>
                <span>{badge.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
              Our Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 text-slate-900 dark:text-white">
              Engineered for Modern Web & SaaS
            </h2>
            <p className="text-sm mt-1 max-w-xl text-slate-600 dark:text-slate-400">
              From enterprise SaaS architecture to conversion-optimized WordPress portals, we deliver clean, secure, and maintainable systems.
            </p>
          </div>

          <button
            onClick={() => {
              onNavigate('services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <span>Explore All Services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.slice(0, 3).map((service) => (
            <div
              key={service.id}
              className={`p-6 sm:p-7 rounded-2xl border transition-all flex flex-col justify-between group ${
                theme === 'dark'
                  ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    {service.id.includes('saas') ? (
                      <Layers className="w-5 h-5" />
                    ) : service.id.includes('wp') || service.id.includes('wordpress') ? (
                      <Globe className="w-5 h-5" />
                    ) : (
                      <Code2 className="w-5 h-5" />
                    )}
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-500">
                    {service.startingPrice}
                  </span>
                </div>

                <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                  {service.id.includes('saas')
                    ? 'SaaS Product Architecture'
                    : service.id.includes('wordpress')
                    ? 'Custom WordPress & WooCommerce'
                    : 'Full-Stack Web Applications'}
                </h3>
                <p className="text-xs sm:text-sm mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
                  {service.id.includes('saas')
                    ? 'Multi-tenant subscription architectures, Stripe billing webhooks, user roles, and live data dashboards.'
                    : service.id.includes('wordpress')
                    ? 'Custom lightweight themes coded from scratch, bespoke plugins, and guaranteed 95+ PageSpeed scores.'
                    : 'Scalable web platforms built with React, Angular, PHP, and Laravel with robust databases and APIs.'}
                </p>

                {/* Tech chips */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {service.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">⏱ {service.estimatedTimeline}</span>
                <button
                  onClick={() => onOpenHireModal(service.id)}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>Book Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SELECTED CASE STUDIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
              Selected Work
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 text-slate-900 dark:text-white">
              Proven Real-World Case Studies
            </h2>
            <p className="text-sm mt-1 max-w-xl text-slate-600 dark:text-slate-400">
              A sample of the production SaaS products, custom web apps, and WordPress platforms engineered by FK Labs.
            </p>
          </div>

          <button
            onClick={() => {
              onNavigate('portfolio');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <span>View All Case Studies</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.slice(0, 3).map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectProject(item)}
              className={`rounded-2xl p-5 sm:p-6 border transition-all cursor-pointer group flex flex-col justify-between ${
                theme === 'dark'
                  ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700 shadow-lg'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md'
              }`}
            >
              <div>
                {/* Visual Banner */}
                <div
                  className={`h-36 rounded-xl bg-gradient-to-br ${item.gradient} p-4 flex flex-col justify-between text-white relative overflow-hidden`}
                >
                  <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm self-start">
                    {item.category}
                  </span>
                  <div>
                    <h4 className="text-base font-bold leading-snug">{item.title.split('-')[0]}</h4>
                    <p className="text-[11px] opacity-80 line-clamp-1">{item.client}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-bold text-sm tracking-tight text-slate-900 dark:text-white">
                    {item.tagline.en}
                  </h4>
                  <p className="text-xs mt-1 line-clamp-2 leading-relaxed text-slate-600 dark:text-slate-300">
                    {item.description.en}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                  {item.metrics[0].label.en}: {item.metrics[0].value}
                </span>
                <span className="inline-flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. WHY WORK WITH US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
            The FK Labs Difference
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 text-slate-900 dark:text-white">
            Built for Quality, Not Middlemen
          </h2>
          <p className="text-sm mt-2 text-slate-600 dark:text-slate-400">
            Why visionary founders, agencies, and businesses partner directly with our engineering team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              title: 'Direct Senior Leads',
              desc: 'No account managers or junior interns. Your project is architected and built directly by Fahim and Kayes.',
              icon: <Users className="w-5 h-5 text-indigo-500" />,
            },
            {
              title: '100% Code & IP Ownership',
              desc: 'You receive all repository commits, clean documentation, and full intellectual property upon completion.',
              icon: <Lock className="w-5 h-5 text-emerald-500" />,
            },
            {
              title: 'Speed & Core Web Vitals',
              desc: 'Zero bloated page builders. Sub-second load times and 95+ PageSpeed scores to maximize conversions.',
              icon: <Zap className="w-5 h-5 text-amber-500" />,
            },
            {
              title: 'Milestone-Based Peace of Mind',
              desc: 'Transparent sprint schedules with 30-day post-launch warranty and guaranteed technical stability.',
              icon: <ShieldCheck className="w-5 h-5 text-cyan-500" />,
            },
          ].map((point, i) => (
            <div
              key={i}
              className={`p-6 rounded-2xl border transition-all ${
                theme === 'dark'
                  ? 'bg-slate-900/60 border-slate-800'
                  : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                {point.icon}
              </div>
              <h3 className="font-bold text-base tracking-tight mb-1.5 text-slate-900 dark:text-white">
                {point.title}
              </h3>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                {point.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CLIENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
            Client Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 text-slate-900 dark:text-white">
            What Our Clients Say
          </h2>
          <p className="text-sm mt-2 text-slate-600 dark:text-slate-400">
            Real feedback from international founders, e-commerce owners, and digital brands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((rev) => (
            <div
              key={rev.id}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                theme === 'dark'
                  ? 'bg-slate-900/60 border-slate-800'
                  : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm italic leading-relaxed text-slate-700 dark:text-slate-300">
                  "{rev.quote.en}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{rev.clientName}</h4>
                  <p className="text-[11px] text-slate-500">{rev.role}, {rev.company}</p>
                </div>
                <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold">{rev.country}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS (Directly beneath testimonials as requested) */}
      <FaqSection theme={theme} onOpenHireModal={() => onOpenHireModal()} />

      {/* 8. LEADERSHIP / MEET THE FOUNDERS (Moved to the very end of page as requested) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
            Leadership & Engineering Leads
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 text-slate-900 dark:text-white">
            Meet the Founders & Lead Developers
          </h2>
          <p className="text-sm mt-2 text-slate-600 dark:text-slate-400">
            The hands-on engineers personally overseeing every architecture and deliverable at FK Labs.
          </p>
        </div>

        {/* 2 Founders Cards Side by Side with Actual Photos & Facebook Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FOUNDERS_DATA.map((founder) => {
            const isFahim = founder.id === 'fahim';
            return (
              <div
                key={founder.id}
                className={`rounded-2xl p-6 sm:p-8 border transition-all flex flex-col justify-between ${
                  theme === 'dark'
                    ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700 shadow-xl'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                      {founder.role.en}
                    </span>
                    <a
                      href={founder.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:underline"
                    >
                      <span>Facebook Profile</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="flex items-center gap-4 mt-5">
                    {/* Founder Real Photo */}
                    <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl p-0.5 bg-gradient-to-br from-indigo-500 to-cyan-400 flex-shrink-0 shadow-md relative overflow-hidden">
                      <div className="w-full h-full rounded-[14px] bg-slate-900 flex items-center justify-center font-bold text-white text-base relative">
                        <span className="font-mono text-sm text-slate-300">
                          {isFahim ? 'FH' : 'KM'}
                        </span>
                        {founder.avatarUrl && (
                          <img
                            src={founder.avatarUrl}
                            alt={founder.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover rounded-[14px] absolute inset-0 z-10"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {founder.name}
                      </h3>
                      <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                        {founder.title.en}
                      </p>
                      <span className="text-[11px] font-mono text-slate-500 block mt-1">
                        Dhaka, Bangladesh · Global Remote
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm mt-4 leading-relaxed text-slate-600 dark:text-slate-300 font-normal">
                    {founder.bio.en}
                  </p>

                  {/* Skills badge list */}
                  <div className="mt-5">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider font-mono mb-2 text-slate-400">
                      Primary Expertise:
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {founder.skills.slice(0, 6).map((s) => (
                        <span
                          key={s.name}
                          className="px-2.5 py-1 rounded text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Card Action */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-mono">
                    {founder.experienceYears}+ Years Engineering Experience
                  </span>
                  <button
                    onClick={() => {
                      onNavigate('team');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. FINAL HIGH-CONVERTING CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl p-8 sm:p-12 bg-slate-900 text-white relative overflow-hidden shadow-xl text-center sm:text-left">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Ready to Build Your Next Web Platform?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-3 max-w-xl leading-relaxed">
              Partner directly with FK Labs to launch a high-performance SaaS product, custom web application, or bespoke WordPress system. Free architectural consultation within 24 hours.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3.5 mt-6">
              <button
                onClick={() => onOpenHireModal()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-950 bg-white hover:bg-slate-100 shadow-lg transition-all active:scale-[0.98]"
              >
                <span>Start Project Consultation</span>
                <ArrowRight className="w-4 h-4 text-indigo-600" />
              </button>

              <a
                href="https://wa.me/8801622383939?text=Hello%20FK%20Labs%2C%20I%20would%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
