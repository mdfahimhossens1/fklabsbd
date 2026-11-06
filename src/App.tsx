/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavPage, PortfolioItem, Theme } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HireModal } from './components/HireModal';
import { PortfolioModal } from './components/PortfolioModal';
import { HomeView } from './views/HomeView';
import { ServicesView } from './views/ServicesView';
import { PortfolioView } from './views/PortfolioView';
import { TeamView } from './views/TeamView';
import { PricingView } from './views/PricingView';
import { ContactView } from './views/ContactView';

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavPage>('home');
  const [theme, setTheme] = useState<Theme>('light'); // Opens in light mode by default

  // Modals state
  const [hireModalOpen, setHireModalOpen] = useState(false);
  const [prefillScope, setPrefillScope] = useState<any>(null);
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  // Open Hire Modal with optional prefilled service or calculated scope
  const handleOpenHireModal = (servicePref?: string) => {
    setPrefillScope(servicePref ? { servicePref } : null);
    setHireModalOpen(true);
  };

  // When client requests similar solution from portfolio modal
  const handleRequestSimilarProject = (projectTitle: string) => {
    setSelectedProject(null);
    handleOpenHireModal(`Similar Solution to: ${projectTitle}`);
  };

  // Apply dark or light mode class to document element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.className = 'bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500 selection:text-white';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.className = 'bg-slate-50 text-slate-900 antialiased selection:bg-indigo-500 selection:text-white';
    }
  }, [theme]);

  return (
    <div
      className={`min-h-screen flex flex-col justify-between font-sans transition-colors duration-200 ${
        theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Top Sticky Header */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        theme={theme}
        setTheme={setTheme}
        onOpenHireModal={handleOpenHireModal}
      />

      {/* Main View Router */}
      <main className="flex-1 w-full">
        {currentPage === 'home' && (
          <HomeView
            theme={theme}
            onNavigate={setCurrentPage}
            onOpenHireModal={handleOpenHireModal}
            onSelectProject={setSelectedProject}
          />
        )}

        {currentPage === 'services' && (
          <ServicesView
            lang="en"
            theme={theme}
            onOpenHireModal={handleOpenHireModal}
          />
        )}

        {currentPage === 'portfolio' && (
          <PortfolioView
            lang="en"
            theme={theme}
            onSelectProject={setSelectedProject}
            onOpenHireModal={handleOpenHireModal}
          />
        )}

        {currentPage === 'team' && (
          <TeamView
            lang="en"
            theme={theme}
            onOpenHireModal={handleOpenHireModal}
          />
        )}

        {currentPage === 'pricing' && (
          <PricingView
            lang="en"
            theme={theme}
            onOpenHireModal={handleOpenHireModal}
            onBookScope={(scope) => {
              setPrefillScope(scope);
              setHireModalOpen(true);
            }}
          />
        )}

        {currentPage === 'contact' && (
          <ContactView
            lang="en"
            theme={theme}
            onOpenHireModal={handleOpenHireModal}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        theme={theme}
        onNavigate={setCurrentPage}
        onOpenHireModal={handleOpenHireModal}
      />

      {/* Modals */}
      <HireModal
        isOpen={hireModalOpen}
        onClose={() => setHireModalOpen(false)}
        lang="en"
        theme={theme}
        prefillScope={prefillScope}
      />

      {selectedProject && (
        <PortfolioModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          lang="en"
          theme={theme}
          onRequestSimilar={handleRequestSimilarProject}
        />
      )}
    </div>
  );
}
