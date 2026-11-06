import React from 'react';
import {
  Facebook,
  Mail,
  MessageSquare,
  ArrowUp,
  ShieldCheck,
} from 'lucide-react';
import { NavPage, Theme } from '../types';
import { FOUNDERS_DATA } from '../data/content';

interface FooterProps {
  theme: Theme;
  onNavigate: (page: NavPage) => void;
  onOpenHireModal: (servicePref?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  theme,
  onNavigate,
  onOpenHireModal,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: { page: NavPage; label: string }[] = [
    { page: 'home', label: 'Home' },
    { page: 'services', label: 'Services' },
    { page: 'portfolio', label: 'Work' },
    { page: 'team', label: 'Team' },
    { page: 'contact', label: 'Contact' },
  ];

  const serviceLinks = [
    'SaaS Engineering',
    'Custom Web Apps',
    'WordPress & Plugins',
    'WooCommerce Development',
    'UI/UX & Frontend Architecture',
    'API & Database Systems',
  ];

  return (
    <footer
      className={`border-t transition-colors mt-20 ${
        theme === 'dark'
          ? 'bg-slate-950 border-slate-800/80 text-slate-400'
          : 'bg-slate-50 border-slate-200 text-slate-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-white flex items-center justify-center font-black text-white dark:text-slate-950 text-sm">
                FK
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                FK Labs
              </span>
            </div>

            <p className={`text-xs sm:text-sm leading-relaxed max-w-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              FK Labs is an elite software engineering agency building scalable SaaS platforms, high-performance web applications, and custom WordPress solutions.
            </p>

            <div className="pt-2">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-500">
                <ShieldCheck className="w-4 h-4" />
                <span>Direct Engineer Collaboration</span>
              </div>
              <p className={`text-[11px] mt-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
                Zero middlemen. Senior developers directly leading every line of code.
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className={`text-xs font-bold uppercase tracking-wider font-mono mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              {navLinks.map((item) => (
                <li key={item.page}>
                  <button
                    onClick={() => {
                      onNavigate(item.page);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`transition-colors ${theme === 'dark' ? 'hover:text-white text-slate-400' : 'hover:text-slate-950 text-slate-600'}`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className={`text-xs font-bold uppercase tracking-wider font-mono mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Expertise
            </h4>
            <ul className="space-y-2 text-xs">
              {serviceLinks.map((service, i) => (
                <li key={i}>
                  <button
                    onClick={() => {
                      onNavigate('services');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`transition-colors text-left ${theme === 'dark' ? 'hover:text-white text-slate-400' : 'hover:text-slate-950 text-slate-600'}`}
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Channels */}
          <div>
            <h4 className={`text-xs font-bold uppercase tracking-wider font-mono mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Contact
            </h4>
            <div className="space-y-3 text-xs">
              <a
                href="mailto:mdfahimhossen.dev@gmail.com"
                className={`flex items-center gap-2 transition-colors ${theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-slate-950'}`}
              >
                <Mail className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                <span className="truncate">mdfahimhossen.dev@gmail.com</span>
              </a>

              <a
                href="https://wa.me/8801622383939"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-500 hover:text-emerald-400 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 flex-shrink-0" />
                <span>+880 1622-383939</span>
              </a>

              <div className="pt-2">
                <span className="text-[11px] font-mono text-slate-500 block mb-2">Connect with Leads:</span>
                <div className="flex gap-2">
                  {FOUNDERS_DATA.map((founder) => (
                    <a
                      key={founder.id}
                      href={founder.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
                        theme === 'dark'
                          ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                          : 'bg-white border-slate-200 text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                      }`}
                      title={`${founder.name} on Facebook`}
                    >
                      <Facebook className="w-3.5 h-3.5 text-blue-600" />
                      <span className="font-medium text-[11px]">{founder.id === 'fahim' ? 'Fahim' : 'Kayes'}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
            theme === 'dark' ? 'border-slate-800/80 text-slate-500' : 'border-slate-200 text-slate-500'
          }`}
        >
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} FK Labs. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenHireModal()}
              className={`hover:underline ${theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-950'}`}
            >
              Start a Project
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={scrollToTop}
              className={`flex items-center gap-1 transition-colors ${
                theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
