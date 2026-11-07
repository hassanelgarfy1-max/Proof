import React, { useState } from 'react';
import { useProof } from '../../context/ProofContext';
import { Challenge, Submission } from '../../types';
import { SkillPassport } from './SkillPassport';
import { 
  Clock, 
  CheckCircle2, 
  ExternalLink, 
  UploadCloud, 
  Search, 
  Filter, 
  FileCheck, 
  Award,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

export function TalentPortal() {
  const { 
    t, 
    lang, 
    challenges, 
    submissions, 
    selectedChallenge, 
    setSelectedChallenge, 
    setIsSubmitModalOpen,
    candidateProfile,
    categories 
  } = useProof();

  const [activeSubTab, setActiveSubTab] = useState<'challenges' | 'submissions' | 'passport'>('challenges');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');

  const filteredChallenges = challenges.filter(c => {
    const matchesCat = selectedCategoryFilter === 'all' || c.categoryId === selectedCategoryFilter;
    const matchesSearch = !searchQuery || 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.briefSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.requiredSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  // Calculate stats for Candidate Dashboard
  const mySubmissionsCount = submissions.filter(s => s.candidateId === candidateProfile.id).length;
  const myEvaluatedCount = submissions.filter(s => s.candidateId === candidateProfile.id && s.status === 'evaluated').length;

  return (
    <div className="bg-[#101827] text-slate-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* CANDIDATE DASHBOARD HERO CARD */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#B7F36B] shrink-0">
              <img 
                src={candidateProfile.avatar} 
                alt={candidateProfile.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">
                  {lang === 'ar' && candidateProfile.nameAr ? candidateProfile.nameAr : candidateProfile.name}
                </h2>
                <span className="text-[11px] font-mono text-[#B7F36B] font-semibold">
                  · {candidateProfile.passportId}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                {lang === 'ar' && candidateProfile.headlineAr ? candidateProfile.headlineAr : candidateProfile.headline}
              </p>
              <div className="text-[11px] text-slate-400 mt-1 font-mono flex items-center gap-2">
                <span>{candidateProfile.location}</span>
                <span>·</span>
                <span className="text-[#B7F36B] font-semibold">
                  Verified Avg Score: {candidateProfile.averageScore}/100 (Top {100 - candidateProfile.percentileRank}%)
                </span>
              </div>
            </div>
          </div>

          {/* Sub-Tab Navigation */}
          <div className="flex items-center gap-1.5 p-1 bg-[#0b111c] rounded-xl border border-slate-800 text-xs font-semibold shrink-0">
            <button
              onClick={() => setActiveSubTab('challenges')}
              className={`px-3.5 py-2 rounded-lg transition ${
                activeSubTab === 'challenges' 
                  ? 'bg-[#B7F36B] text-[#101827] font-bold shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.tabAvailableChallenges}
            </button>
            <button
              onClick={() => setActiveSubTab('submissions')}
              className={`px-3.5 py-2 rounded-lg transition ${
                activeSubTab === 'submissions' 
                  ? 'bg-[#B7F36B] text-[#101827] font-bold shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.tabMySubmissions} ({mySubmissionsCount})
            </button>
            <button
              onClick={() => setActiveSubTab('passport')}
              className={`px-3.5 py-2 rounded-lg transition ${
                activeSubTab === 'passport' 
                  ? 'bg-[#B7F36B] text-[#101827] font-bold shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.tabSkillPassport}
            </button>
          </div>
        </div>

        {/* VIEW 1: AVAILABLE CHALLENGES & DETAIL INSPECTOR */}
        {activeSubTab === 'challenges' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 7 Cols: Filterable Challenges Catalog */}
            <div className="lg:col-span-7 space-y-6">
              {/* Search & Category Filter */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 rtl:right-3 rtl:left-auto top-3" />
                  <input 
                    type="text"
                    placeholder={t.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 rtl:pr-9 rtl:pl-4 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#B7F36B]"
                  />
                </div>

                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-[#B7F36B]"
                >
                  <option value="all">{t.filterAllCategories}</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {lang === 'ar' ? c.nameAr : c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Challenge List Items */}
              <div className="space-y-4">
                {filteredChallenges.length === 0 ? (
                  <div className="p-12 text-center rounded-2xl bg-slate-900/50 border border-slate-800 text-slate-400 text-xs">
                    {t.emptyStateTitle}
                  </div>
                ) : (
                  filteredChallenges.map((ch: Challenge) => {
                    const isSelected = selectedChallenge?.id === ch.id;
                    return (
                      <div 
                        key={ch.id}
                        onClick={() => setSelectedChallenge(ch)}
                        className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                          isSelected 
                            ? 'bg-slate-900 border-[#B7F36B] shadow-lg shadow-[#B7F36B]/5' 
                            : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span className="font-semibold text-slate-200">
                            {ch.companyName}
                          </span>
                          <div className="flex items-center gap-2 font-mono text-[11px]">
                            <span>{ch.difficulty}</span>
                            <span>·</span>
                            <span>~{ch.estimatedHours}h</span>
                          </div>
                        </div>

                        <h4 className="text-base font-bold text-white mt-2">
                          {lang === 'ar' ? ch.titleAr : ch.title}
                        </h4>

                        <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                          {lang === 'ar' ? ch.briefSummaryAr : ch.briefSummary}
                        </p>

                        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                          <div className="text-[11px] font-mono text-slate-400">
                            {ch.submissionCount} {t.candidatesParticipated}
                          </div>
                          <span className="text-[#B7F36B] font-semibold hover:underline flex items-center gap-1">
                            <span>{t.viewChallengeDetails}</span>
                            <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right 5 Cols: Challenge Detail & 4-Point Rubric Inspector */}
            <div className="lg:col-span-5">
              {selectedChallenge ? (
                <div className="sticky top-24 bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-6">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-[#B7F36B] font-semibold">
                      {t.challengeBrief}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1">
                      {lang === 'ar' ? selectedChallenge.titleAr : selectedChallenge.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {t.publisher}: <strong className="text-slate-200">{selectedChallenge.companyName}</strong>
                    </p>
                  </div>

                  {/* Metadata Specs Strip */}
                  <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#0b111c] border border-slate-800 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[11px] uppercase font-mono">{t.difficulty}</span>
                      <span className="text-white font-semibold">{selectedChallenge.difficulty}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px] uppercase font-mono">{t.estTime}</span>
                      <span className="text-white font-semibold">~{selectedChallenge.estimatedHours} {t.hours}</span>
                    </div>
                  </div>

                  {/* Challenge Overview */}
                  <div>
                    <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      {t.challengeDescTitle}
                    </h5>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {lang === 'ar' ? selectedChallenge.descriptionAr : selectedChallenge.description}
                    </p>
                  </div>

                  {/* Deliverables List */}
                  <div>
                    <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      {t.deliverablesTitle}
                    </h5>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {selectedChallenge.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#B7F36B] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Evaluation Rubric Breakdown (Requirement 6) */}
                  <div className="p-4 rounded-xl bg-[#0b111c] border border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        {t.evaluationRubric}
                      </span>
                      <span className="text-[10px] font-mono text-[#B7F36B]">100% Weight</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      {selectedChallenge.rubric.map((crit) => (
                        <div key={crit.id} className="p-2.5 rounded bg-slate-900 border border-slate-800">
                          <div className="flex justify-between items-center font-semibold text-slate-200">
                            <span>{lang === 'ar' ? crit.titleAr : crit.title}</span>
                            <span className="font-mono text-[#B7F36B]">{crit.weight}%</span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            {lang === 'ar' ? crit.descriptionAr : crit.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA to Open Submission Modal */}
                  <button
                    onClick={() => setIsSubmitModalOpen(true)}
                    className="w-full py-3 rounded-xl font-bold text-xs bg-[#B7F36B] text-[#101827] hover:bg-[#a6ec52] transition shadow-lg shadow-[#B7F36B]/15 uppercase tracking-wider"
                  >
                    {t.submitWork}
                  </button>
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-400">
                  Select a challenge from the catalog to view details, rubric breakdown, and submit proof.
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 2: MY SUBMISSIONS & EVALUATION REPORTS */}
        {activeSubTab === 'submissions' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">{t.tabMySubmissions}</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Inspect submitted artifacts, reviewer notes, and certified rubric breakdowns.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {submissions.map((sub: Submission) => (
                <div 
                  key={sub.id} 
                  className="bg-slate-900 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-800">
                    <div>
                      <div className="text-[11px] font-mono text-slate-400">
                        SUBMISSION ID: {sub.id}
                      </div>
                      <h4 className="text-lg font-bold text-white mt-1">
                        {sub.challengeTitle}
                      </h4>
                      <span className="text-xs text-slate-400">
                        {t.submittedOn} {sub.submittedAt}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded text-xs font-mono font-bold uppercase ${
                        sub.status === 'evaluated'
                          ? 'bg-emerald-950 text-[#B7F36B] border border-emerald-800'
                          : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}>
                        {sub.status === 'evaluated' 
                          ? `${t.statusEvaluated}: ${sub.totalScore}/100` 
                          : t.statusSubmitted}
                      </span>
                    </div>
                  </div>

                  {/* Submission Evidence details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-[#0b111c] border border-slate-800">
                      <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[11px]">
                        Submitted Proof Artifact
                      </span>
                      <a 
                        href={sub.workUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#B7F36B] font-mono underline break-all mt-1.5 inline-flex items-center gap-1.5"
                      >
                        <span>{sub.workUrl}</span>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      </a>
                    </div>

                    <div className="p-4 rounded-xl bg-[#0b111c] border border-slate-800">
                      <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[11px]">
                        Candidate Delivery Notes
                      </span>
                      <p className="text-slate-300 mt-1.5 leading-relaxed">
                        {sub.notes}
                      </p>
                    </div>
                  </div>

                  {/* If Evaluated: Show 4-Point Rubric Breakdown (Requirement 6) */}
                  {sub.status === 'evaluated' && sub.rubricEvaluation && (
                    <div className="pt-4 border-t border-slate-800 space-y-4">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-bold uppercase tracking-wider text-white">
                          {t.rubricBreakdown}
                        </h5>
                        <span className="text-xs text-[#B7F36B] font-mono font-semibold">
                          Certified Evaluation · Passed Merit Standard
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        {sub.rubricEvaluation.map((crit, idx) => (
                          <div 
                            key={idx} 
                            className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5"
                          >
                            <div className="flex justify-between items-center font-semibold">
                              <span className="text-slate-200">
                                {lang === 'ar' ? crit.titleAr : crit.title}
                              </span>
                              <span className="font-mono text-[#B7F36B] font-bold">
                                {crit.score ?? 90}/100
                              </span>
                            </div>
                            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                              <div 
                                className="bg-[#B7F36B] h-full rounded-full transition-all duration-500"
                                style={{ width: `${crit.score ?? 90}%` }}
                              />
                            </div>
                            <p className="text-[11px] text-slate-400">
                              {crit.notes || crit.description}
                            </p>
                          </div>
                        ))}
                      </div>

                      {sub.feedback && (
                        <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-900/60 text-xs">
                          <span className="font-bold text-[#B7F36B] uppercase tracking-wider block text-[11px]">
                            {t.reviewerFeedback}:
                          </span>
                          <p className="text-slate-200 mt-1 italic leading-relaxed">
                            "{sub.feedback}"
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: SHAREABLE SKILL PASSPORT */}
        {activeSubTab === 'passport' && (
          <SkillPassport />
        )}
      </div>
    </div>
  );
}
