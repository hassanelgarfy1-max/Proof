import React, { useState } from 'react';
import { useProof } from '../../context/ProofContext';
import { SkillCategory, Challenge, Submission } from '../../types';
import { 
  ShieldCheck, 
  Layers, 
  Plus, 
  Users, 
  FileCheck, 
  Settings, 
  Database, 
  Activity,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

export function AdminPortal() {
  const { 
    t, 
    lang, 
    categories, 
    addCategory, 
    challenges, 
    submissions, 
    showToast 
  } = useProof();

  const [adminTab, setAdminTab] = useState<'categories' | 'challenges' | 'users' | 'settings'>('categories');

  // New Category State
  const [newCatNameEn, setNewCatNameEn] = useState('');
  const [newCatNameAr, setNewCatNameAr] = useState('');
  const [newCatDescEn, setNewCatDescEn] = useState('');
  const [newCatDescAr, setNewCatDescAr] = useState('');

  const handleAddCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatNameEn.trim()) return;

    addCategory({
      name: newCatNameEn.trim(),
      nameAr: newCatNameAr.trim() || newCatNameEn.trim(),
      description: newCatDescEn.trim() || 'Professional standardized creative discipline with objective 4-point rubric verification.',
      descriptionAr: newCatDescAr.trim() || 'تخصص مهني معتمد يخضع لمعايير التقييم الرباعية الموحدة.'
    });

    setNewCatNameEn('');
    setNewCatNameAr('');
    setNewCatDescEn('');
    setNewCatDescAr('');
  };

  return (
    <div className="bg-[#101827] text-slate-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* ADMIN HEADER */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0b101c] border border-slate-700 flex items-center justify-center text-[#B7F36B] shrink-0 font-bold">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">{t.adminDashboard}</h2>
                <span className="text-[10px] font-mono uppercase bg-purple-950 text-purple-300 border border-purple-800 px-2 py-0.5 rounded font-bold">
                  Root Governance
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {t.adminSub}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-[#0b111c] rounded-xl border border-slate-800 text-xs font-semibold shrink-0">
            <button
              onClick={() => setAdminTab('categories')}
              className={`px-3.5 py-2 rounded-lg transition ${
                adminTab === 'categories' 
                  ? 'bg-[#B7F36B] text-[#101827] font-bold shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Skill Disciplines ({categories.length})
            </button>
            <button
              onClick={() => setAdminTab('challenges')}
              className={`px-3.5 py-2 rounded-lg transition ${
                adminTab === 'challenges' 
                  ? 'bg-[#B7F36B] text-[#101827] font-bold shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Challenge Governance ({challenges.length})
            </button>
            <button
              onClick={() => setAdminTab('users')}
              className={`px-3.5 py-2 rounded-lg transition ${
                adminTab === 'users' 
                  ? 'bg-[#B7F36B] text-[#101827] font-bold shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Users & Employers
            </button>
            <button
              onClick={() => setAdminTab('settings')}
              className={`px-3.5 py-2 rounded-lg transition ${
                adminTab === 'settings' 
                  ? 'bg-[#B7F36B] text-[#101827] font-bold shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Platform Health
            </button>
          </div>
        </div>

        {/* TELEMETRY CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
            <span className="text-[11px] font-mono uppercase text-slate-400 block">
              {t.totalVerticals}
            </span>
            <div className="text-2xl font-black text-white mt-1 tabular-nums">
              {categories.length}
            </div>
            <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">
              Initial: Graphic Design + Video Editing
            </span>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
            <span className="text-[11px] font-mono uppercase text-slate-400 block">
              {t.activeChallengesCount}
            </span>
            <div className="text-2xl font-black text-[#B7F36B] mt-1 tabular-nums">
              {challenges.length}
            </div>
            <span className="text-[10px] text-emerald-400 font-mono mt-0.5 block">
              100% active rubric compliance
            </span>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
            <span className="text-[11px] font-mono uppercase text-slate-400 block">
              {t.submissionsLogged}
            </span>
            <div className="text-2xl font-black text-white mt-1 tabular-nums">
              {submissions.length}
            </div>
            <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">
              Audited 4-point weighted criteria
            </span>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
            <span className="text-[11px] font-mono uppercase text-slate-400 block">
              {t.rubricCompliance}
            </span>
            <div className="text-2xl font-black text-[#B7F36B] mt-1 tabular-nums">
              100.0%
            </div>
            <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">
              Zero unassessed badges permitted
            </span>
          </div>
        </div>

        {/* TAB 1: MANAGE SKILL CATEGORIES & EXTENSIBILITY (Requirement 4) */}
        {adminTab === 'categories' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Registered Categories List */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <h3 className="text-base font-bold text-white">
                  {t.categoriesManagement}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  The initial release starts with Graphic Design and Video Editing. Additional disciplines can be initialized anytime.
                </p>
              </div>

              <div className="space-y-3">
                {categories.map((cat: SkillCategory) => (
                  <div 
                    key={cat.id} 
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{cat.name}</h4>
                        <span className="text-xs text-slate-400 font-mono">({cat.nameAr})</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {lang === 'ar' ? cat.descriptionAr : cat.description}
                      </p>
                      <div className="text-[11px] font-mono text-slate-500 mt-2 flex items-center gap-3">
                        <span>Identifier: <code className="text-slate-300">{cat.id}</code></span>
                        <span>·</span>
                        <span>Challenges: {cat.challengeCount}</span>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded bg-[#0b101c] border border-slate-700 text-[10px] font-mono text-[#B7F36B] font-bold">
                      ACTIVE
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Add New Category Dynamic Form */}
            <div className="lg:col-span-5 bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-5 h-fit">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#B7F36B]" />
                  <span>{t.addCategoryTitle}</span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Dynamically provision a new skill vertical across the candidate catalog, company challenge publisher, and rubric engine.
                </p>
              </div>

              <form onSubmit={handleAddCategorySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                    {t.catNameEnLabel}
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. UI/UX & Design Systems"
                    value={newCatNameEn}
                    onChange={(e) => setNewCatNameEn(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0b101c] border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-[#B7F36B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                    {t.catNameArLabel}
                  </label>
                  <input 
                    type="text"
                    placeholder="مثال: نظم واجهات وتجربة المستخدم"
                    value={newCatNameAr}
                    onChange={(e) => setNewCatNameAr(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0b101c] border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-[#B7F36B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                    {t.catDescLabel}
                  </label>
                  <textarea 
                    rows={3}
                    placeholder="Scope of evaluation, benchmark expectations, and required tooling..."
                    value={newCatDescEn}
                    onChange={(e) => setNewCatDescEn(e.target.value)}
                    className="w-full p-3 bg-[#0b101c] border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-[#B7F36B]"
                  />
                </div>

                <div className="p-3 rounded-xl bg-[#0b101c] border border-slate-800 text-[11px] text-slate-400">
                  <span className="text-[#B7F36B] font-semibold block">Automatic 4-Point Rubric Inheritance:</span>
                  <span>Execution (40%) · Instructions (25%) · Problem Solving (20%) · Delivery (15%)</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl font-bold text-xs bg-[#B7F36B] text-[#101827] hover:bg-[#a6ec52] transition uppercase tracking-wider shadow-md shadow-[#B7F36B]/15"
                >
                  {t.addCategoryBtn}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 2: CHALLENGE GOVERNANCE */}
        {adminTab === 'challenges' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-white">Challenge Moderation & Rubric Enforcement</h3>
              <p className="text-xs text-slate-400">Verify that all employer briefs comply with blind grading and deliverable transparency.</p>
            </div>

            <div className="space-y-3">
              {challenges.map((ch: Challenge) => (
                <div key={ch.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-slate-400 font-bold">{ch.id}</span>
                      <h4 className="text-sm font-bold text-white">{ch.title}</h4>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Publisher: {ch.companyName} · Category: {ch.categoryId}</p>
                    <div className="text-[11px] font-mono text-slate-500 mt-1">
                      Deliverables: {ch.deliverables.length} items · Time: ~{ch.estimatedHours}h
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[11px] font-mono font-bold">
                      VERIFIED COMPLIANT
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: USERS & EMPLOYERS */}
        {adminTab === 'users' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold text-white">Vetted Employer Directory</h4>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-[#0b101c] border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-white block">Apex Capital MENA</span>
                    <span className="text-slate-400 text-[11px]">FinTech & Venture · Riyadh / Dubai</span>
                  </div>
                  <span className="text-[#B7F36B] font-mono font-bold text-[11px]">14 Hires</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0b101c] border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-white block">Loomic Studios</span>
                    <span className="text-slate-400 text-[11px]">Creative Production · London / Cairo</span>
                  </div>
                  <span className="text-[#B7F36B] font-mono font-bold text-[11px]">28 Hires</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold text-white">Active Verified Talents</h4>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-[#0b101c] border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-white block">Omar Khaled</span>
                    <span className="text-slate-400 text-[11px]">Video & Brand Systems · PRF-2026-EG-9981</span>
                  </div>
                  <span className="text-[#B7F36B] font-mono font-bold text-[11px]">Score: 92.5</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0b101c] border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-white block">Layla Saeed</span>
                    <span className="text-slate-400 text-[11px]">Brand Identity · PRF-2026-AE-4019</span>
                  </div>
                  <span className="text-[#B7F36B] font-mono font-bold text-[11px]">Score: 94.0</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PLATFORM SETTINGS & SUPABASE INTEGRATION READINESS */}
        {adminTab === 'settings' && (
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 max-w-3xl">
            <div>
              <h3 className="text-lg font-bold text-white">Architecture & Supabase Integration Spec</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Proof is engineered with clean TypeScript domain schemas matching PostgreSQL tables.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-[#0b101c] border border-slate-800 space-y-2">
                <span className="font-bold text-white block">1. Database Entity Alignment</span>
                <p className="text-slate-400 leading-relaxed font-mono text-[11px]">
                  Tables: `skill_categories`, `challenges`, `rubrics`, `submissions`, `candidate_profiles`, `skills_ledger`.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0b101c] border border-slate-800 space-y-2">
                <span className="font-bold text-white block">2. Security Hardening & Zero-Fake Policy</span>
                <p className="text-slate-400 leading-relaxed font-mono text-[11px]">
                  Row-Level Security (RLS) policies enforce that candidate skills are flagged `is_verified = true` ONLY when linked to an evaluated submission with composite score $\ge 80\%$.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0b101c] border border-slate-800 space-y-2">
                <span className="font-bold text-white block">3. Storage Buckets Ready</span>
                <p className="text-slate-400 leading-relaxed font-mono text-[11px]">
                  Pre-configured for Supabase Storage buckets: `challenge-artifacts` and `proof-assets`.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
