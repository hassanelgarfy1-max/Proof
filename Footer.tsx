import React from 'react';
import { useProof } from '../../context/ProofContext';

export function Footer() {
  const { t, setActiveView, setCurrentRole } = useProof();

  return (
    <footer className="bg-[#0c121e] border-t border-slate-800 text-slate-400 py-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-3.5 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-[#B7F36B] flex items-center justify-center text-[#101827] font-black text-xs">
                P
              </span>
              <span className="text-base font-black tracking-tight text-white">PROOF</span>
            </div>
            <p className="font-mono text-[11px] text-[#B7F36B] uppercase tracking-wider font-semibold">
              {t.tagline}
            </p>
            <p className="text-slate-400 text-xs leading-relaxed">
              {t.supportingStatement}
            </p>
          </div>

          {/* Col 2: Initial Skill Verticals */}
          <div className="space-y-3">
            <h5 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">
              Initial Launch Disciplines
            </h5>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button 
                  onClick={() => { setCurrentRole('talent'); setActiveView('talent'); }}
                  className="hover:text-white transition-colors"
                >
                  Graphic & Brand Design
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentRole('talent'); setActiveView('talent'); }}
                  className="hover:text-white transition-colors"
                >
                  Video Editing & Motion
                </button>
              </li>
              <li className="text-slate-500">
                UI & Design Systems (Roadmap)
              </li>
              <li className="text-slate-500">
                3D Motion & Spatial (Coming Soon)
              </li>
            </ul>
          </div>

          {/* Col 3: Objective 4-Point Standard */}
          <div className="space-y-3">
            <h5 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">
              Standard 4-Point Rubric
            </h5>
            <div className="space-y-1.5 text-[11px] text-slate-400">
              <div className="flex justify-between py-0.5 border-b border-slate-800">
                <span>{t.critQuality}</span>
                <span className="font-mono text-slate-300">40%</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-slate-800">
                <span>{t.critInstructions}</span>
                <span className="font-mono text-slate-300">25%</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-slate-800">
                <span>{t.critProblemSolving}</span>
                <span className="font-mono text-slate-300">20%</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-slate-800">
                <span>{t.critComm}</span>
                <span className="font-mono text-slate-300">15%</span>
              </div>
            </div>
          </div>

          {/* Col 4: Platform Architecture */}
          <div className="space-y-3">
            <h5 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">
              Technical Integrity
            </h5>
            <p className="text-slate-400 text-xs leading-relaxed">
              Designed for direct Supabase edge authentication, object storage buckets for proof artifacts, and PostgreSQL row-level security.
            </p>
            <div className="inline-block bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400 px-2.5 py-1 rounded">
              Immutable Verification Standard
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div>
            © 2026 PROOF International Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>SHOW WHAT YOU CAN DO.</span>
            <span aria-hidden="true">·</span>
            <span>Zero Unassessed Badges Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
