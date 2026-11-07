import React, { useState } from 'react';
import { useProof } from '../../context/ProofContext';
import { 
  CheckCircle2, 
  ExternalLink, 
  Share2, 
  Award, 
  FileText, 
  ShieldAlert, 
  Copy, 
  Check, 
  QrCode 
} from 'lucide-react';

export function SkillPassport() {
  const { candidateProfile, t, lang, showToast } = useProof();
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/passport/${candidateProfile.passportId}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      showToast(lang === 'en' ? 'Passport public URL copied to clipboard!' : 'تم نسخ رابط جواز المهارات للحافظة!');
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <span className="text-[11px] font-mono uppercase text-[#B7F36B] font-semibold">
            {t.passportIdLabel}: {candidateProfile.passportId}
          </span>
          <h3 className="text-lg font-bold text-white mt-0.5">
            {t.passportTitle}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {t.passportSub}
          </p>
        </div>

        <button
          onClick={handleShare}
          className="px-4 py-2.5 rounded-xl font-bold text-xs bg-[#B7F36B] text-[#101827] hover:bg-[#a6ec52] transition flex items-center gap-2 shrink-0 shadow-md shadow-[#B7F36B]/10"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-[#101827]" />
              <span>{t.linkCopied}</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 text-[#101827]" />
              <span>{t.sharePassportBtn}</span>
            </>
          )}
        </button>
      </div>

      {/* The Passport Document Card */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
        {/* Document Header Ribbon */}
        <div className="bg-[#0b101c] p-6 sm:p-8 border-b border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#B7F36B] shrink-0 shadow-lg shadow-[#B7F36B]/10">
              <img 
                src={candidateProfile.avatar} 
                alt={candidateProfile.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-extrabold text-white tracking-tight">
                  {lang === 'ar' && candidateProfile.nameAr ? candidateProfile.nameAr : candidateProfile.name}
                </h2>
                <span className="text-[10px] font-mono font-bold uppercase text-[#B7F36B] bg-emerald-950/70 border border-emerald-800/80 px-2 py-0.5 rounded">
                  {t.verifiedBadge}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                {lang === 'ar' && candidateProfile.headlineAr ? candidateProfile.headlineAr : candidateProfile.headline}
              </p>
              <div className="text-[11px] text-slate-500 font-mono">
                <span>{candidateProfile.location}</span>
                <span className="mx-2">·</span>
                <span>Member since {candidateProfile.joinedDate}</span>
              </div>
            </div>
          </div>

          <div className="text-left md:text-right font-mono p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="text-3xl font-extrabold text-[#B7F36B] tabular-nums">
              {candidateProfile.averageScore}
              <span className="text-sm text-slate-400 font-normal">/100</span>
            </div>
            <div className="text-[11px] uppercase tracking-wider text-slate-400 mt-0.5">
              {t.globalAvgScore}
            </div>
            <div className="text-[10px] text-emerald-400 font-semibold mt-1">
              Top {100 - candidateProfile.percentileRank}% Globally
            </div>
          </div>
        </div>

        {/* Passport Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* SECTION 1: VERIFIED COMPETENCIES (EVIDENCE BACKED) */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-slate-800">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B7F36B]" />
                  <span>{t.verifiedSkillsTitle}</span>
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {t.verifiedSkillsSub}
                </p>
              </div>
              <span className="text-[11px] font-mono text-[#B7F36B] font-semibold">
                {candidateProfile.verifiedSkills.length} Verified Credentials
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {candidateProfile.verifiedSkills.map((skill) => (
                <div 
                  key={skill.id}
                  className="p-4 rounded-xl bg-[#0b101c] border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-white text-xs">
                        {lang === 'ar' && skill.nameAr ? skill.nameAr : skill.name}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                        Verified at: {skill.verifiedAt}
                      </span>
                    </div>
                    {skill.score && (
                      <span className="font-mono text-xs font-bold text-[#B7F36B] bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                        {skill.score}/100
                      </span>
                    )}
                  </div>

                  {skill.evidenceTitle && (
                    <div className="mt-3 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                      <span className="truncate pr-2">{skill.evidenceTitle}</span>
                      <span className="text-[#B7F36B] font-semibold underline shrink-0 cursor-pointer">
                        {t.inspectChallengeEvidence}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 2: SELF-REPORTED SKILLS (EXPLICITLY UNVERIFIED - REQUIREMENT 7) */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-slate-800">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-slate-500" />
                  <span>{t.unverifiedSkillsTitle}</span>
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {t.unverifiedSkillsSub}
                </p>
              </div>
              <span className="text-[10px] font-mono text-slate-500 uppercase">
                Pending Challenge Evidence
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5 pt-2">
              {candidateProfile.unverifiedSkills.map((skill) => (
                <div 
                  key={skill.id}
                  className="px-3 py-1.5 rounded-lg bg-slate-950 border border-dashed border-slate-700 text-slate-400 text-xs font-mono flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                  <span>{lang === 'ar' && skill.nameAr ? skill.nameAr : skill.name}</span>
                  <span className="text-[10px] text-slate-500">({t.unverifiedBadge})</span>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: COMPLETED CHALLENGE EVIDENCE LOG */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              {t.completedChallengesLog}
            </h4>
            
            <div className="border border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-800 text-xs">
              <div className="p-4 bg-[#0b101c] flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div>
                  <span className="font-semibold text-white">
                    High-Retention SaaS Product Explainer (60s)
                  </span>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Evaluated by Loomic Studios on 4-Point Standard Rubric
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[#B7F36B] font-bold">
                    Composite Grade: 92.5/100
                  </span>
                </div>
              </div>

              <div className="p-4 bg-slate-900/60 flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-[11px] text-slate-400">
                <span>
                  Delivered Master Outputs in 16:9 & 9:16 + Premiere Pro Project Archive
                </span>
                <a 
                  href="https://proof.platform/evidence/omar-k-saas-cut-v2.mp4"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#B7F36B] underline flex items-center gap-1 font-mono"
                >
                  <span>Verify Artifact URL</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* SECTION 4: CANDIDATE PORTFOLIO ARTIFACTS */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Verified Deliverable Artifacts
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {candidateProfile.portfolioItems.map((item) => (
                <div 
                  key={item.id}
                  className="p-3.5 rounded-xl bg-[#0b101c] border border-slate-800 flex items-center justify-between"
                >
                  <div>
                    <span className="font-semibold text-slate-200 block">{item.title}</span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">{item.type} artifact</span>
                  </div>
                  <a 
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-slate-800 text-[#B7F36B] hover:bg-slate-700 transition"
                    title="Open proof link"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Passport Footer Seal */}
        <div className="bg-[#0b101c] px-6 sm:px-8 py-4 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-slate-400 text-[11px] font-mono gap-3">
          <div className="flex items-center gap-2">
            <QrCode className="w-4 h-4 text-[#B7F36B]" />
            <span>PROOF CRYPTOGRAPHIC VERIFICATION PIPELINE</span>
          </div>
          <span className="text-slate-400">TAMPER-EVIDENT MERITOCRACY</span>
        </div>
      </div>
    </div>
  );
}
