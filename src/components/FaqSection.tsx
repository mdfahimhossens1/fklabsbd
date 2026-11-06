import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { Theme } from '../types';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  theme: Theme;
  onOpenHireModal: () => void;
}

const FAQS: FaqItem[] = [
  {
    question: 'How quickly can we start our project?',
    answer:
      'We can typically kick off within 48 to 72 hours following our initial consultation and scope alignment. Once requirements are defined and milestones agreed upon, our lead engineers begin sprint planning and architecture immediately.',
  },
  {
    question: 'Who will actually write the code and manage development?',
    answer:
      'Unlike traditional bloated agencies that outsource work to junior contractors or assign layers of account managers, at FK Labs you work directly with our lead developers—Md. Fahim Hossen (Full-Stack & SaaS) and Kayes Mahamud (WordPress & Frontend). You get direct technical leadership from day one.',
  },
  {
    question: 'Do we get full ownership of the source code and intellectual property?',
    answer:
      'Yes, 100%. Upon completion and milestone settlement, all source code, database architectures, design systems, and IP belong entirely to you and your business. We push directly to your private GitHub/GitLab repositories.',
  },
  {
    question: 'What technologies and frameworks do you specialize in?',
    answer:
      'Our primary stack includes React.js, Next.js, Angular, PHP, Laravel, Tailwind CSS, Bootstrap 5, TypeScript, Node.js, MySQL database systems, and custom WordPress theme & plugin development with WooCommerce. We select the best technology tailored to your specific business requirements.',
  },
  {
    question: 'How do you structure pricing and milestones?',
    answer:
      'We offer transparent, milestone-based fixed pricing or dedicated sprint contracts. Payments are divided across clear deliverables (e.g. Design & Architecture, Core Development, QA & Launch), so you only release funds when satisfied with verified milestones.',
  },
  {
    question: 'Do you provide post-launch support and maintenance?',
    answer:
      'Every project includes a 30-day complimentary post-launch support window covering bug fixes and performance monitoring. We also provide ongoing monthly maintenance, security audits, and continuous feature expansion packages for scaling businesses.',
  },
  {
    question: 'Can you work with our existing codebase or redesign an existing website?',
    answer:
      'Yes. We frequently audit, refactor, and modernize legacy codebases, optimize Core Web Vitals and load times (achieving 90+ to 95+ PageSpeed scores), and rebuild existing platforms with modern reactive frameworks.',
  },
];

export const FaqSection: React.FC<FaqSectionProps> = ({ theme, onOpenHireModal }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          <HelpCircle className="w-4 h-4" />
          <span>Frequently Asked Questions</span>
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 text-slate-900 dark:text-white">
          Everything You Need to Know
        </h2>
        <p className="text-sm sm:text-base mt-2 text-slate-600 dark:text-slate-400">
          Clear answers about how we collaborate, our tech stack, pricing, and project deliverables.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3.5">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                theme === 'dark'
                  ? isOpen
                    ? 'bg-slate-900/90 border-slate-700 shadow-md'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                  : isOpen
                  ? 'bg-white border-slate-300 shadow-sm'
                  : 'bg-white/70 border-slate-200 hover:border-slate-300'
              }`}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full py-4.5 px-5 sm:px-6 flex items-center justify-between text-left gap-4 focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                  {faq.question}
                </span>
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                    isOpen
                      ? 'bg-indigo-600 text-white rotate-180'
                      : theme === 'dark'
                      ? 'bg-slate-800 text-slate-400'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-5 pt-1 border-t border-slate-100 dark:border-slate-800/80">
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Question Support Box */}
      <div
        className={`mt-10 p-5 sm:p-6 rounded-2xl border text-center flex flex-col sm:flex-row items-center justify-between gap-4 ${
          theme === 'dark'
            ? 'bg-slate-900/50 border-slate-800'
            : 'bg-slate-50 border-slate-200'
        }`}
      >
        <div className="text-center sm:text-left">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Have a custom or technical question not answered here?
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Get in touch directly with our engineering team for a swift response.
          </p>
        </div>
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <button
            onClick={onOpenHireModal}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white dark:bg-white dark:text-slate-950 hover:opacity-90 transition-opacity"
          >
            Ask Us Anything
          </button>
          <a
            href="https://wa.me/8801622383939"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500 transition-colors"
            title="Chat on WhatsApp"
          >
            <MessageSquare className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
