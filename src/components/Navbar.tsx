import React, { useState } from 'react';
import {
  Code2,
  Menu,
  X,
  Moon,
  Sun,
  ArrowRight,
  Layers,
  Briefcase,
  Users,
  Mail,
} from 'lucide-react';
import { NavPage, Theme } from '../types';

interface NavbarProps {
  currentPage: NavPage;
  setCurrentPage: (page: NavPage) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  onOpenHireModal: (servicePref?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  theme,
  setTheme,
  onOpenHireModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: NavPage) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navItems: { page: NavPage; label: string; icon: React.ReactNode }[] = [
    { page: 'home', label: 'Home', icon: <Code2 className="w-4 h-4" /> },
    { page: 'services', label: 'Services', icon: <Layers className="w-4 h-4" /> },
    { page: 'portfolio', label: 'Work', icon: <Briefcase className="w-4 h-4" /> },
    { page: 'team', label: 'Team', icon: <Users className="w-4 h-4" /> },
    { page: 'contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-colors duration-200">
      <div
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-2 sm:mt-3 ${
          theme === 'dark'
            ? 'bg-slate-900/90 border border-slate-800 text-slate-100 shadow-2xl shadow-slate-950/40'
            : 'bg-white/90 border border-slate-200 text-slate-900 shadow-sm'
        } backdrop-blur-xl rounded-2xl transition-all duration-300`}
      >
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo: Clean "FK Labs" without clutter */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
            aria-label="FK Labs Home"
          >
            {/* Minimalist Geometric Mark */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-950 font-black text-sm tracking-tighter shadow-sm group-hover:scale-105 transition-transform duration-200">
              FK
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              FK Labs
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const active = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                    active
                      ? theme === 'dark'
                        ? 'bg-slate-800 text-white font-semibold'
                        : 'bg-slate-100 text-slate-950 font-semibold'
                      : theme === 'dark'
                      ? 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/70'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Theme toggle & CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl border transition-all ${
                theme === 'dark'
                  ? 'bg-slate-800/80 border-slate-700 text-amber-300 hover:bg-slate-800'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle dark and light theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Primary CTA: Start a Project */}
            <button
              onClick={() => onOpenHireModal()}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 shadow-sm transition-all active:scale-[0.98]"
            >
              <span>Start Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2.5 rounded-xl border ${
                theme === 'dark'
                  ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900'
              }`}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden pt-2 pb-5 border-t mt-2 space-y-1.5 ${
              theme === 'dark' ? 'border-slate-800' : 'border-slate-200'
            }`}
          >
            {navItems.map((item) => {
              const active = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left ${
                    active
                      ? theme === 'dark'
                        ? 'bg-slate-800 text-white font-semibold'
                        : 'bg-slate-100 text-slate-950 font-semibold'
                      : theme === 'dark'
                      ? 'text-slate-300 hover:bg-slate-800/50'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className={active ? 'text-indigo-500' : 'opacity-60'}>{item.icon}</span>
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
