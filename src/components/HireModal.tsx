import React, { useState, useEffect } from 'react';
import {
  X,
  Mail,
  Send,
  Sparkles,
  PhoneCall,
  MessageSquare,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, Theme } from '../types';
import { DICTIONARY } from '../data/content';
import { playSound } from '../utils/audio';

interface HireModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  theme: Theme;
  prefillScope?: {
    productType?: string;
    pages?: string;
    features?: string[];
    urgency?: string;
    estimatedUSD?: number;
    estimatedBDT?: number;
    deliveryWeeks?: string;
    servicePref?: string;
  } | null;
}

export const HireModal: React.FC<HireModalProps> = ({
  isOpen,
  onClose,
  lang,
  theme,
  prefillScope,
}) => {
  const t = DICTIONARY[lang].contactSection;
  const isEn = lang === 'en';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneOrWhatsApp, setPhoneOrWhatsApp] = useState('');
  const [service, setService] = useState('SaaS Product Development');
  const [budget, setBudget] = useState('$500 - $1,500');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync prefilled scope from calculator or service card
  useEffect(() => {
    if (prefillScope) {
      if (prefillScope.servicePref) {
        setService(prefillScope.servicePref);
      } else if (prefillScope.productType) {
        setService(prefillScope.productType);
      }
      if (prefillScope.estimatedUSD) {
        setBudget(`$${prefillScope.estimatedUSD} USD (~৳${prefillScope.estimatedBDT?.toLocaleString()} BDT)`);
      }
      if (prefillScope.productType && prefillScope.features) {
        setMessage(
          `Hi Fahim & Kayes,\n\nI configured this project on the FK Labs estimator:\n- Product: ${prefillScope.productType}\n- Scope: ${prefillScope.pages}\n- Features: ${prefillScope.features.join(', ')}\n- Est. Timeline: ${prefillScope.deliveryWeeks}\n- Est. Investment: $${prefillScope.estimatedUSD} / ৳${prefillScope.estimatedBDT?.toLocaleString()}\n\nLet's schedule a call to discuss the exact implementation!`
        );
      }
    }
  }, [prefillScope]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('click');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      playSound('success');

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#10b981', '#38bdf8', '#f59e0b'],
      });
    }, 700);
  };

  const handleOpenDirectEmail = () => {
    playSound('click');
    const subject = encodeURIComponent(`Project Proposal for FK Labs: ${service} from ${name || 'Client'}`);
    const body = encodeURIComponent(
      `Hi Md. Fahim Hossen and Kayes Mahamud,\n\nName: ${name}\nEmail: ${email}\nPhone/WhatsApp: ${phoneOrWhatsApp}\nSelected Service: ${service}\nBudget: ${budget}\n\nProject Overview:\n${message}\n\nLooking forward to working together with FK Labs!`
    );
    window.location.href = `mailto:mdfahimhossen.dev@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleOpenWhatsApp = () => {
    playSound('click');
    const text = encodeURIComponent(
      `Hello FK Labs! I want to hire you for a project:\n- Name: ${name || 'Prospective Client'}\n- Service: ${service}\n- Budget: ${budget}\n- Details: ${message || 'I have a project requirement to discuss.'}`
    );
    // WhatsApp direct link with agency contact
    window.open(`https://wa.me/8801622383939?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        onClick={() => {
          playSound('click');
          onClose();
        }}
      />

      {/* Modal Dialog Card */}
      <div
        className={`relative w-full max-w-2xl rounded-3xl p-6 sm:p-8 border shadow-2xl z-10 transition-all ${
          theme === 'dark'
            ? 'bg-slate-900 border-slate-700/80 text-slate-100 shadow-indigo-950/50'
            : 'bg-white border-slate-200 text-slate-900 shadow-slate-300/50'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            playSound('click');
            onClose();
          }}
          className={`absolute top-5 right-5 p-2 rounded-xl transition-colors ${
            theme === 'dark'
              ? 'text-slate-400 hover:text-white hover:bg-slate-800'
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
          }`}
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          /* Success Screen */
          <div className="text-center py-8 space-y-5">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-extrabold tracking-tight">
                {isEn ? 'Proposal Received!' : 'আপনার প্রস্তাবটি গৃহীত হয়েছে!'}
              </h3>
              <p className={`text-sm mt-2 max-w-md mx-auto leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                {t.formSuccess}
              </p>
            </div>

            {/* Direct Quick Launch Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleOpenDirectEmail}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{isEn ? 'Open in Your Email Client' : 'ইমেইল অ্যাপে খুলুন'}</span>
              </button>

              <button
                onClick={handleOpenWhatsApp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{isEn ? 'Chat via WhatsApp' : 'হোয়াটসঅ্যাপে মেসেজ দিন'}</span>
              </button>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className={`text-xs underline ${theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
              >
                {isEn ? 'Close Window' : 'উইন্ডো বন্ধ করুন'}
              </button>
            </div>
          </div>
        ) : (
          /* Form Content */
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>{isEn ? 'Start Your Project with FK Labs' : 'এফকে ল্যাবস-এর সাথে প্রজেক্ট শুরু করুন'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-1">
              {isEn ? 'Direct Consultation & Hire Request' : 'সরাসরি প্রজেক্ট প্রপোজাল ও বুকিং'}
            </h2>
            <p className={`text-xs sm:text-sm mt-1.5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              {isEn
                ? 'Work directly with Md. Fahim Hossen & Kayes Mahamud. Fast response guaranteed within 2-4 hours.'
                : 'মো: ফাহিম হোসেন এবং কায়েস মাহমুদের সাথে সরাসরি কাজ করুন। ২-৪ ঘণ্টার মধ্যে রেসপন্স নিশ্চিত।'}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                    {t.formName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isEn ? 'e.g. John Doe / Arif Rahman' : 'যেমন: মো: আরিফ রহমান'}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                      theme === 'dark'
                        ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500'
                        : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                    {t.formEmail} *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                      theme === 'dark'
                        ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500'
                        : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                    {isEn ? 'WhatsApp / Phone' : 'হোয়াটসঅ্যাপ / ফোন'}
                  </label>
                  <input
                    type="text"
                    value={phoneOrWhatsApp}
                    onChange={(e) => setPhoneOrWhatsApp(e.target.value)}
                    placeholder="+880 1833... / +1..."
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                      theme === 'dark'
                        ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500'
                        : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                    {t.formService}
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                      theme === 'dark'
                        ? 'bg-slate-950 border-slate-800 text-white'
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    <option value="SaaS Product Development">SaaS Product Development</option>
                    <option value="Full-Stack Web Development">Full-Stack Web Development</option>
                    <option value="Custom WordPress & WooCommerce">Custom WordPress & WooCommerce</option>
                    <option value="WordPress Plugin Development">WordPress Plugin Development</option>
                    <option value="UI/UX & Interactive Design">UI/UX & Interactive Design</option>
                    <option value="AI Automation & Integration">AI Automation & Integration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                    {t.formBudget}
                  </label>
                  <input
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="$300 - $1,500 / ৳30k - ৳150k"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                      theme === 'dark'
                        ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500'
                        : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                  {t.formMessage} *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    isEn
                      ? 'Tell us about your project vision, target launch date, and features needed...'
                      : 'আপনার প্রজেক্টের লক্ষ্য, লঞ্চের আনুমানিক তারিখ এবং প্রয়োজনীয় ফিচার বিস্তারিত লিখুন...'
                  }
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                    theme === 'dark'
                      ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500'
                      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleOpenDirectEmail}
                    className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                      theme === 'dark'
                        ? 'border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                        : 'border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                    title="Send via mailto"
                  >
                    <Mail className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{isEn ? 'Direct Email' : 'সরাসরি মেইল'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenWhatsApp}
                    className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                      theme === 'dark'
                        ? 'border-slate-800 text-emerald-400 hover:bg-slate-800'
                        : 'border-slate-200 text-emerald-600 hover:bg-slate-100'
                    }`}
                    title="Send via WhatsApp"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp</span>
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 shadow-lg shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? t.formSending : t.formSubmit}</span>
                </button>
              </div>

              {/* Direct email info notice */}
              <div className="pt-2 text-center">
                <span className={`text-[11px] font-mono ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
                  Direct inbox: <strong className="text-indigo-400">mdfahimhossen.dev@gmail.com</strong> • Phone/WhatsApp: +880 1622-383939
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
