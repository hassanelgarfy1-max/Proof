import React from 'react';
import { useProof } from '../../context/ProofContext';
import { Globe, ShieldCheck } from 'lucide-react';

export function Header() {
  const { lang, setLang, isRtl, t, activeView, setActiveView, currentRole, setCurrentRole } = useProof();

  return (
    <header className="sticky top-0 z-40 bg-[#101827]/95 backdrop-blur-md border-b border-slate-800 text-slate-100">
      {/* Micro Prototype Top Bar */}
      <div className="bg-[#0b101b] border-b border-slate-800/80 px-4 py-1.5 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] font-mono">
            <span className="text-[#B7F36B] font-bold">{t.demoPrototypeTag}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="hidden sm:inline text-slate-400">{t.demoNotice}</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Perspective Selector */}
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-700/80 px-2 py-0.5 rounded text-[11px]">
              <span className="text-slate-400 hidden md:inline">{t.switchRole}:</span>
              <button
                onClick={() => {
                  setCurrentRole('talent');
                  setActiveView('talent');
                }}
                className={`px-1.5 py-0.5 rounded transition ${
                  currentRole === 'talent' && activeView === 'talent' 
                    ? 'text-[#B7F36B] font-bold' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.roleTalent}
              </button>
              <span aria-hidden="true" className="text-slate-700">|</span>
              <button
                onClick={() => {
                  setCurrentRole('company');
                  setActiveView('company');
                }}
                className={`px-1.5 py-0.5 rounded transition ${
                  currentRole === 'company' && activeView === 'company' 
                    ? 'text-[#B7F36B] font-bold' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.roleCompany}
              </button>
              <span aria-hidden="true" className="text-slate-700">|</span>
              <button
                onClick={() => {
                  setCurrentRole('admin');
                  setActiveView('admin');
                }}
                className={`px-1.5 py-0.5 rounded transition ${
                  currentRole === 'admin' && activeView === 'admin' 
                    ? 'text-[#B7F36B] font-bold' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.roleAdmin}
              </button>
            </div>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-slate-700 text-[11px] text-slate-300 hover:text-white hover:border-[#B7F36B] transition font-medium"
              title="Toggle LTR English / RTL Arabic"
            >
              <Globe className="w-3 h-3 text-[#B7F36B]" />
              <span>{lang === 'en' ? 'العربية' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: 3 zones separated by gap-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark, single text element */}
        <button
          onClick={() => setActiveView('landing')}
          className="text-left rtl:text-right flex items-center gap-2 group whitespace-nowrap shrink-0"
        >
          <span className="w-7 h-7 rounded bg-[#B7F36B] flex items-center justify-center text-[#101827] font-black text-sm tracking-tight group-hover:scale-105 transition-transform">
            P
          </span>
          <span className="text-lg font-black tracking-tight text-white flex items-center gap-1">
            PROOF
            <span className="text-[#B7F36B]">.</span>
          </span>
        </button>

        {/* Zone 2: 4-5 clean single-line nav links with subtle hover underlines */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveView('landing')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white pb-0.5 ${
              activeView === 'landing' ? 'text-white border-b-2 border-[#B7F36B]' : ''
            }`}
          >
            {t.navLanding}
          </button>
          <button
            onClick={() => {
              setCurrentRole('talent');
              setActiveView('talent');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white pb-0.5 ${
              activeView === 'talent' ? 'text-white border-b-2 border-[#B7F36B]' : ''
            }`}
          >
            {t.navTalent}
          </button>
          <button
            onClick={() => {
              setCurrentRole('company');
              setActiveView('company');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white pb-0.5 ${
              activeView === 'company' ? 'text-white border-b-2 border-[#B7F36B]' : ''
            }`}
          >
            {t.navCompany}
          </button>
          <button
            onClick={() => setActiveView('passport')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white pb-0.5 ${
              activeView === 'passport' ? 'text-white border-b-2 border-[#B7F36B]' : ''
            }`}
          >
            {t.navPassport}
          </button>
          <button
            onClick={() => {
              setCurrentRole('admin');
              setActiveView('admin');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white pb-0.5 ${
              activeView === 'admin' ? 'text-white border-b-2 border-[#B7F36B]' : ''
            }`}
          >
            {t.navAdmin}
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              setCurrentRole('talent');
              setActiveView('talent');
            }}
            className="px-4 py-2 text-xs font-bold text-[#101827] bg-[#B7F36B] hover:bg-[#a5ea52] rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            {t.getStarted}
          </button>
        </div>
      </div>
    </header>
  );
}
