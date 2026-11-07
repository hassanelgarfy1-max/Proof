import React from 'react';
import { useProof } from '../../context/ProofContext';
import { Challenge, SkillCategory } from '../../types';
import { 
  ArrowRight, 
  Check, 
  Clock, 
  Layers, 
  Award, 
  Sparkles, 
  FileCheck, 
  ExternalLink 
} from 'lucide-react';

export function LandingPage() {
  const { 
    t, 
    lang, 
    categories, 
    challenges, 
    setSelectedChallenge, 
    setActiveView, 
    setCurrentRole 
  } = useProof();

  const handleInspectChallenge = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setCurrentRole('talent');
    setActiveView('talent');
  };

  return (
    <div className="bg-[#101827] text-slate-100 min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-16 sm:pt-24 pb-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline & Action */}
            <div className="lg:col-span-7 space-y-6">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#B7F36B]">
                {t.heroBadge}
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-balance">
                {t.heroHeadline}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                {t.heroSub}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    setCurrentRole('talent');
                    setActiveView('talent');
                  }}
                  className="px-6 py-3.5 rounded-xl font-bold text-sm bg-[#B7F36B] text-[#101827] hover:bg-[#a4ea4f] transition shadow-lg shadow-[#B7F36B]/15 flex items-center gap-2"
                >
                  <span>{t.getStarted}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>

                <button
                  onClick={() => {
                    setCurrentRole('talent');
                    setActiveView('talent');
                  }}
                  className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-900 text-slate-200 border border-slate-700 hover:border-slate-500 hover:text-white transition"
                >
                  {t.exploreChallenges}
                </button>
              </div>

              {/* Supporting tagline */}
              <div className="pt-4 text-xs font-mono text-slate-400">
                <span>{t.tagline}</span>
                <span aria-hidden="true" className="mx-2 text-slate-600">·</span>
                <span>{t.supportingStatement}</span>
              </div>
            </div>

            {/* Right Column: Hero Visual Asset */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-900">
                <img 
                  src="/src/assets/images/hero_evidence_showcase_1794084161894.jpg" 
                  alt="Proof workstation showcase with creative software"
                  className="w-full h-80 sm:h-96 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101827] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="font-semibold text-white">Live Challenge Artifact Inspection</span>
                    <span className="font-mono text-[#B7F36B] font-bold">4-Point Rubric Active</span>
                  </div>
                  <div className="mt-2 text-[11px] text-slate-400 font-mono flex items-center gap-2">
                    <span>Quality 40%</span>
                    <span>·</span>
                    <span>Instructions 25%</span>
                    <span>·</span>
                    <span>Problem Solving 20%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BENCHMARK STRIP (CLEARLY MARKED DEMO DATA) */}
      <section className="bg-[#0b111c] border-b border-slate-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-3">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#B7F36B] font-mono tabular-nums">
                1,420+
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1">
                {t.statChallengesDone}
              </div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                ({t.demoBenchmark})
              </div>
            </div>

            <div className="p-3">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#B7F36B] font-mono tabular-nums">
                4.2
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1">
                {t.statAvgHireTime}
              </div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                ({t.demoBenchmark})
              </div>
            </div>

            <div className="p-3">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#B7F36B] font-mono tabular-nums">
                890+
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1">
                {t.statTalentAssessed}
              </div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                ({t.demoBenchmark})
              </div>
            </div>

            <div className="p-3">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#B7F36B] font-mono tabular-nums">
                120+
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1">
                {t.statPartnerCompanies}
              </div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                ({t.demoBenchmark})
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW PROOF WORKS */}
      <section className="py-20 bg-white text-[#101827] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#101827]">
              {t.howItWorksTitle}
            </h2>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              {t.howItWorksSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F3F5F7] p-8 rounded-2xl border border-slate-200 hover:border-slate-400 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#101827] text-[#B7F36B] flex items-center justify-center font-bold font-mono text-sm mb-6">
                01
              </div>
              <h3 className="text-lg font-bold text-[#101827] mb-2">
                {t.step1Title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.step1Desc}
              </p>
            </div>

            <div className="bg-[#F3F5F7] p-8 rounded-2xl border border-slate-200 hover:border-slate-400 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#101827] text-[#B7F36B] flex items-center justify-center font-bold font-mono text-sm mb-6">
                02
              </div>
              <h3 className="text-lg font-bold text-[#101827] mb-2">
                {t.step2Title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.step2Desc}
              </p>
            </div>

            <div className="bg-[#F3F5F7] p-8 rounded-2xl border border-slate-200 hover:border-slate-400 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#101827] text-[#B7F36B] flex items-center justify-center font-bold font-mono text-sm mb-6">
                03
              </div>
              <h3 className="text-lg font-bold text-[#101827] mb-2">
                {t.step3Title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.step3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CANDIDATE VS COMPANY VALUE PROPOSITIONS */}
      <section className="py-20 bg-[#F3F5F7] text-slate-900 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* For Candidates */}
            <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="text-xs font-mono font-bold uppercase text-[#101827]">
                {t.forCandidatesBadge}
              </div>
              <h3 className="text-2xl font-bold text-[#101827] leading-snug">
                {t.candidateTitle}
              </h3>
              <ul className="space-y-3.5 text-xs text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{t.candidateB1}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{t.candidateB2}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{t.candidateB3}</span>
                </li>
              </ul>
              <button
                onClick={() => {
                  setCurrentRole('talent');
                  setActiveView('talent');
                }}
                className="text-xs font-bold text-[#101827] underline hover:text-slate-700 transition"
              >
                {t.exploreChallenges} →
              </button>
            </div>

            {/* For Employers */}
            <div className="bg-[#101827] text-white p-8 sm:p-10 rounded-2xl border border-slate-800 shadow-sm space-y-6">
              <div className="text-xs font-mono font-bold uppercase text-[#B7F36B]">
                {t.forCompaniesBadge}
              </div>
              <h3 className="text-2xl font-bold text-white leading-snug">
                {t.companyTitle}
              </h3>
              <ul className="space-y-3.5 text-xs text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-[#B7F36B] font-bold">✓</span>
                  <span>{t.companyB1}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B7F36B] font-bold">✓</span>
                  <span>{t.companyB2}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#B7F36B] font-bold">✓</span>
                  <span>{t.companyB3}</span>
                </li>
              </ul>
              <button
                onClick={() => {
                  setCurrentRole('company');
                  setActiveView('company');
                }}
                className="text-xs font-bold text-[#B7F36B] underline hover:text-[#c4f87f] transition"
              >
                {t.roleCompany} →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* INITIAL SKILL VERTICALS */}
      <section className="py-20 bg-white text-[#101827] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500">
                Disciplines Ready for Evidence
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#101827] mt-1">
                {t.categoriesTitle}
              </h3>
            </div>
            <p className="text-xs text-slate-500 max-w-sm">
              {t.categoriesSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((cat: SkillCategory) => (
              <div 
                key={cat.id}
                className="p-8 rounded-2xl border border-slate-200 bg-[#F3F5F7] hover:border-slate-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span className="font-semibold text-slate-800">
                      {cat.challengeCount} {t.liveChallenges}
                    </span>
                    <span>{cat.activeCandidates || 250}+ Verified Talents</span>
                  </div>
                  <h4 className="text-xl font-bold text-[#101827] mt-3">
                    {lang === 'ar' ? cat.nameAr : cat.name}
                  </h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {lang === 'ar' ? cat.descriptionAr : cat.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-500">4-Point Rubric Standardized</span>
                  <button
                    onClick={() => {
                      setCurrentRole('talent');
                      setActiveView('talent');
                    }}
                    className="font-bold text-[#101827] hover:underline flex items-center gap-1"
                  >
                    <span>{t.viewChallenges}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED ACTIVE CHALLENGES */}
      <section className="py-20 bg-[#101827] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-wider text-[#B7F36B] font-semibold">
              Practical Real-World Briefs
            </span>
            <h3 className="text-3xl font-extrabold text-white mt-1">
              {t.featuredChallengesTitle}
            </h3>
            <p className="text-xs text-slate-400 mt-2">
              {t.featuredChallengesSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {challenges.slice(0, 2).map((ch: Challenge) => (
              <div 
                key={ch.id}
                className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700 transition"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-white">
                      {ch.companyName}
                    </span>
                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      <span>{ch.difficulty}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#B7F36B]" />
                        ~{ch.estimatedHours}h
                      </span>
                    </div>
                  </div>

                  <h4 className="text-lg font-bold text-white">
                    {lang === 'ar' ? ch.titleAr : ch.title}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {lang === 'ar' ? ch.briefSummaryAr : ch.briefSummary}
                  </p>

                  {/* Required skills (clean unboxed text with separators per §1.A) */}
                  <div className="pt-2 text-xs text-slate-400 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px]">
                    <span className="text-slate-500 uppercase">{t.requiredSkillsTitle}:</span>
                    {ch.requiredSkills.map((s, idx) => (
                      <React.Fragment key={idx}>
                        <span className="text-slate-200">{s}</span>
                        {idx < ch.requiredSkills.length - 1 && <span className="text-slate-700">·</span>}
                      </React.Fragment>
                    ))}
                  </div>

                  {ch.prizesOrCompensation && (
                    <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs text-[#B7F36B] font-mono">
                      Opportunity: {ch.prizesOrCompensation}
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-500">
                    {ch.submissionCount} {t.candidatesParticipated}
                  </span>
                  <button
                    onClick={() => handleInspectChallenge(ch)}
                    className="px-4 py-2 rounded-lg font-bold text-xs bg-[#B7F36B] text-[#101827] hover:bg-[#a6ec52] transition"
                  >
                    {t.viewChallengeDetails}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS (CLEARLY LABELED PLACEHOLDER CONTENT) */}
      <section className="py-20 bg-[#0b111c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
              {t.testimonialsBadge}
            </span>
            <h3 className="text-2xl font-bold text-white mt-1">
              {t.testimonialsTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-6">
              <p className="text-sm text-slate-300 leading-relaxed italic">
                {t.testimonial1Text}
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
                <img 
                  src="/src/assets/images/avatar_sami_karim_1794084164356.jpg" 
                  alt="Sami Karim"
                  className="w-11 h-11 rounded-xl object-cover border border-slate-700"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="text-xs font-bold text-white">
                    {t.testimonial1Author}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {t.testimonial1Role}
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-6">
              <p className="text-sm text-slate-300 leading-relaxed italic">
                {t.testimonial2Text}
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
                <img 
                  src="/src/assets/images/avatar_layla_saeed_1794084167166.jpg" 
                  alt="Layla Saeed"
                  className="w-11 h-11 rounded-xl object-cover border border-slate-700"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="text-xs font-bold text-white">
                    {t.testimonial2Author}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {t.testimonial2Role}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
