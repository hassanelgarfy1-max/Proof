import React, { useState } from 'react';
import { useProof } from '../../context/ProofContext';
import { Submission } from '../../types';
import { X, CheckCircle2, Link2, FileText, AlertCircle } from 'lucide-react';

export function SubmissionModal() {
  const { 
    isSubmitModalOpen, 
    setIsSubmitModalOpen, 
    selectedChallenge, 
    addSubmission, 
    candidateProfile,
    t,
    lang 
  } = useProof();

  const [workUrl, setWorkUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [confirmedDeliverables, setConfirmedDeliverables] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isSubmitModalOpen || !selectedChallenge) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workUrl.trim()) {
      setError(lang === 'en' ? 'Please provide a valid evidence link.' : 'يرجى تقديم رابط صالح لدليل الإنجاز.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    setTimeout(() => {
      const newSub: Submission = {
        id: `sub-${Date.now().toString().slice(-4)}`,
        challengeId: selectedChallenge.id,
        challengeTitle: selectedChallenge.title,
        candidateId: candidateProfile.id,
        candidateName: candidateProfile.name,
        candidateAvatar: candidateProfile.avatar,
        candidateTitle: candidateProfile.headline,
        submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
        status: 'submitted',
        workUrl: workUrl.trim(),
        notes: notes.trim() || 'Work delivered according to specified brief constraints.',
        rubricEvaluation: selectedChallenge.rubric.map(r => ({
          ...r,
          score: undefined,
          notes: undefined
        }))
      };

      addSubmission(newSub);
      setIsSubmitting(false);
      setIsSubmitModalOpen(false);
      setWorkUrl('');
      setNotes('');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="bg-[#101827] text-slate-100 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-700 my-8 transition-all"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#B7F36B] font-semibold">
              {t.submitModalTitle}
            </span>
            <h3 className="text-xl font-bold text-white mt-1">
              {lang === 'ar' ? selectedChallenge.titleAr : selectedChallenge.title}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {t.publisher}: <span className="text-slate-200 font-medium">{selectedChallenge.companyName}</span>
            </p>
          </div>
          <button 
            onClick={() => setIsSubmitModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Deliverables Reminder */}
        <div className="my-5 p-4 rounded-xl bg-slate-900/90 border border-slate-800">
          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            {t.deliverablesTitle}
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-400">
            {selectedChallenge.deliverables.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#B7F36B] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Submission Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 rounded-lg bg-red-950/60 border border-red-800 text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Link2 className="w-3.5 h-3.5 text-[#B7F36B]" />
              {t.submitUrlLabel}
            </label>
            <input 
              type="url"
              required
              placeholder="https://figma.com/@file/... or https://vimeo.com/... or Google Drive"
              value={workUrl}
              onChange={(e) => setWorkUrl(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-[#B7F36B] transition font-mono"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              {t.submitUrlHelp}
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#B7F36B]" />
              {t.submitNotesLabel}
            </label>
            <textarea 
              rows={4}
              placeholder={t.submitNotesPlaceholder}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-[#B7F36B] transition"
            />
          </div>

          {/* Evaluation Rubric preview */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                {t.evaluationRubric}
              </span>
              <span className="text-[11px] font-mono text-slate-400">100% Total Weight</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <div className="p-2 rounded bg-slate-800/80 border border-slate-700/60">
                <span className="text-slate-400 block">{t.critQuality}</span>
                <span className="font-mono text-[#B7F36B] font-bold">40%</span>
              </div>
              <div className="p-2 rounded bg-slate-800/80 border border-slate-700/60">
                <span className="text-slate-400 block">{t.critInstructions}</span>
                <span className="font-mono text-[#B7F36B] font-bold">25%</span>
              </div>
              <div className="p-2 rounded bg-slate-800/80 border border-slate-700/60">
                <span className="text-slate-400 block">{t.critProblemSolving}</span>
                <span className="font-mono text-[#B7F36B] font-bold">20%</span>
              </div>
              <div className="p-2 rounded bg-slate-800/80 border border-slate-700/60">
                <span className="text-slate-400 block">{t.critComm}</span>
                <span className="font-mono text-[#B7F36B] font-bold">15%</span>
              </div>
            </div>
          </div>

          <label className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer pt-1">
            <input 
              type="checkbox"
              checked={confirmedDeliverables}
              onChange={(e) => setConfirmedDeliverables(e.target.checked)}
              className="mt-0.5 rounded border-slate-700 bg-slate-900 text-[#B7F36B] focus:ring-0"
            />
            <span>
              {lang === 'en' 
                ? 'I confirm this work is my original craftsmanship, verified against the brief constraints.' 
                : 'أؤكد أن هذا العمل تم تنفيذه بجهدي الشخصي ومطابق للشروط والمتطلبات المحددة.'}
            </span>
          </label>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsSubmitModalOpen(false)}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              {t.cancelBtn}
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !confirmedDeliverables}
              className="px-6 py-2.5 rounded-lg text-xs font-bold bg-[#B7F36B] text-[#101827] hover:bg-[#a6eb52] transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-[#B7F36B]/20"
            >
              {isSubmitting ? t.submittingBtn : t.submitWork}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
