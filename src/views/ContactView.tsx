import React, { useState } from 'react';
import {
  Mail,
  Send,
  Sparkles,
  PhoneCall,
  MessageSquare,
  Facebook,
  Clock,
  MapPin,
  CheckCircle,
  Copy,
  Check,
  Calendar,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, Theme } from '../types';
import { DICTIONARY, FOUNDERS_DATA } from '../data/content';
import { playSound } from '../utils/audio';

interface ContactViewProps {
  lang: Language;
  theme: Theme;
  onOpenHireModal?: (servicePref?: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ lang, theme }) => {
  const isEn = lang === 'en';
  const t = DICTIONARY[lang].contactSection;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Full-Stack Web Development');
  const [budget, setBudget] = useState('$500 - $1,500');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('click');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      playSound('success');

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#10b981', '#38bdf8', '#f59e0b'],
      });
    }, 700);
  };

  const copyEmail = () => {
    playSound('click');
    navigator.clipboard.writeText('mdfahimhossen.dev@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const openMailto = () => {
    playSound('click');
    const subject = encodeURIComponent(`Project Inquiry: ${service} - from ${name || 'Prospective Client'}`);
    const body = encodeURIComponent(
      `Hi Md. Fahim Hossen and Kayes Mahamud,\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\nBudget: ${budget}\n\nProject details:\n${message}\n\nLooking forward to discussing with FK Labs!`
    );
    window.location.href = `mailto:mdfahimhossen.dev@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Mail className="w-3.5 h-3.5 text-indigo-400" />
          {t.tag}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-3">{t.title}</h1>
        <p className={`text-sm sm:text-base mt-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
          {t.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Direct Agency Channels & Founder Connect (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Fast Response Guarantee Box */}
          <div
            className={`rounded-3xl p-6 sm:p-7 border ${
              theme === 'dark'
                ? 'bg-slate-900/80 border-slate-800'
                : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold font-mono">
              <Clock className="w-4 h-4" />
              <span>{t.responsePromise}</span>
            </div>
            <h3 className={`text-lg font-bold tracking-tight mt-2 ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
              {isEn ? 'Direct Line to Lead Engineers' : 'সরাসরি লিড ইঞ্জিনিয়ারদের সাথে কথা বলুন'}
            </h3>
            <p className={`text-xs mt-1 leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-700'}`}>
              {isEn
                ? 'Skip the sales reps. When you reach out to FK Labs, your message lands straight in our lead technical engineers’ inbox.'
                : 'কোনো মধ্যস্বত্বভোগী নেই। আপনার প্রতিটি মেসেজ সরাসরি আমাদের লিড টেকনিক্যাল ডেভেলপারদের ইনবক্সে পৌঁছায়।'}
            </p>

            {/* Email Copy Box */}
            <div className={`mt-5 p-3.5 rounded-2xl border flex items-center justify-between ${theme === 'dark' ? 'bg-slate-800/60 border-slate-700/60' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center gap-2.5 overflow-hidden">
                <Mail className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                <span className={`text-xs font-mono font-medium truncate ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
                  mdfahimhossen.dev@gmail.com
                </span>
              </div>
              <button
                onClick={copyEmail}
                className={`p-1.5 rounded-lg transition-colors ${theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
                title="Copy Email"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* WhatsApp Quick Link */}
            <div className="mt-3">
              <a
                href="https://wa.me/8801622383939?text=Hello%20FK%20Labs%2C%20I%20would%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound('click')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t.quickWhatsApp} (+880 1622-383939)</span>
              </a>
            </div>
          </div>

          {/* Individual Founders Contact Cards */}
          <div className="space-y-4">
            <h4 className={`text-xs font-bold uppercase tracking-wider font-mono ${theme === 'dark' ? 'text-slate-400' : 'text-slate-700'}`}>
              {isEn ? 'Direct Engineering Contacts' : 'আমাদের ফাউন্ডার ও লিড ডেভেলপার পরিচিতি'}
            </h4>

            {FOUNDERS_DATA.map((founder) => (
              <div
                key={founder.id}
                className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
                  theme === 'dark'
                    ? 'bg-slate-900/60 border-slate-800'
                    : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl p-0.5 bg-gradient-to-br from-indigo-500 to-cyan-400 flex-shrink-0 relative overflow-hidden">
                    <div className="w-full h-full rounded-[10px] bg-slate-900 flex items-center justify-center font-bold text-white text-xs relative">
                      <span className="font-mono text-[11px] text-slate-300">
                        {founder.id === 'fahim' ? 'FH' : 'KM'}
                      </span>
                      {founder.avatarUrl && (
                        <img
                          src={founder.avatarUrl}
                          alt={founder.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover rounded-[10px] absolute inset-0 z-10"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <h5 className={`font-bold text-sm tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
                      {founder.name}
                    </h5>
                    <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">{founder.role[lang]}</p>
                    <span className="text-[10px] text-slate-500">{founder.title[lang]}</span>
                  </div>
                </div>

                <a
                  href={founder.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors flex-shrink-0"
                >
                  <Facebook className="w-3.5 h-3.5" />
                  <span>Facebook</span>
                </a>
              </div>
            ))}
          </div>

          {/* Location & Timezone */}
          <div
            className={`p-4 rounded-2xl border text-xs text-slate-400 space-y-1 ${
              theme === 'dark' ? 'bg-slate-900/40 border-slate-800/80' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-1.5 text-slate-300 font-medium">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" />
              <span>Dhaka, Bangladesh • GMT+6 (Global Remote Ready)</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              We collaborate smoothly with clients across US (EST/PST), UK (GMT), Europe (CET), and Australia.
            </p>
          </div>
        </div>

        {/* Right Column: Project Proposal Form (7 cols) */}
        <div
          className={`lg:col-span-7 rounded-3xl p-6 sm:p-10 border transition-all ${
            theme === 'dark'
              ? 'bg-slate-900/80 border-slate-800 shadow-2xl'
              : 'bg-white border-slate-200 shadow-xl'
          }`}
        >
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 inline-flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black">{isEn ? 'Inquiry Sent Successfully!' : 'মেসেজটি সফলভাবে পাঠানো হয়েছে!'}</h3>
              <p className={`text-xs sm:text-sm max-w-md mx-auto leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                {t.formSuccess}
              </p>
              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={openMailto}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500"
                >
                  {isEn ? 'Open Email App' : 'ইমেইল অ্যাপে খুলুন'}
                </button>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold border border-slate-700 text-slate-300 hover:text-white"
                >
                  {isEn ? 'Send Another Message' : 'আরেকটি মেসেজ পাঠান'}
                </button>
              </div>
            </div>
          ) : (
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-500 font-bold">
                {isEn ? 'Project Proposal Form' : 'প্রজেক্ট প্রপোজাল ফর্ম'}
              </span>
              <h2 className={`text-2xl sm:text-3xl font-black tracking-tight mt-1 ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
                {isEn ? 'Tell Us About Your Project' : 'আপনার প্রজেক্ট সম্পর্কে জানান'}
              </h2>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-800'}`}>
                      {t.formName} *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={isEn ? 'Your Name' : 'আপনার পুরো নাম'}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        theme === 'dark'
                          ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500'
                          : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 shadow-sm'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-800'}`}>
                      {t.formEmail} *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        theme === 'dark'
                          ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500'
                          : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 shadow-sm'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-800'}`}>
                      {isEn ? 'Phone / WhatsApp' : 'ফোন / হোয়াটসঅ্যাপ'}
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+880 1833... / +1..."
                      className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        theme === 'dark'
                          ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500'
                          : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 shadow-sm'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-800'}`}>
                      {t.formService}
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        theme === 'dark'
                          ? 'bg-slate-950 border-slate-800 text-white'
                          : 'bg-white border-slate-300 text-slate-900 shadow-sm'
                      }`}
                    >
                      <option value="SaaS Product Engineering">SaaS Product Engineering</option>
                      <option value="Full-Stack Web Development">Full-Stack Web Development</option>
                      <option value="Custom WordPress & WooCommerce">Custom WordPress & WooCommerce</option>
                      <option value="WordPress Plugin Development">WordPress Plugin Development</option>
                      <option value="UI/UX Design Systems">UI/UX Design Systems</option>
                      <option value="AI Automation & Integrations">AI Automation & Integrations</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-800'}`}>
                      {t.formBudget}
                    </label>
                    <input
                      type="text"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder="$300 - $1,500 / ৳30k - ৳150k"
                      className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        theme === 'dark'
                          ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500'
                          : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 shadow-sm'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-800'}`}>
                    {t.formMessage} *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={
                      isEn
                        ? 'Describe your project requirements, target goals, and timeline...'
                        : 'আপনার প্রজেক্টের লক্ষ্য, কী কী ফিচার দরকার এবং কাঙ্ক্ষিত ডেলিভারি ডেট বিস্তারিত লিখুন...'
                    }
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      theme === 'dark'
                        ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500'
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 shadow-sm'
                    }`}
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={openMailto}
                    className={`text-xs font-semibold flex items-center gap-1.5 underline ${
                      theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{isEn ? 'Prefer sending an email directly?' : 'সরাসরি ইমেইল করতে চান?'}</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 shadow-md shadow-indigo-600/30 transition-all disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? t.formSending : t.formSubmit}</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
