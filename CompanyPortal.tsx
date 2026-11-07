import React, { useState } from 'react';
import { useProof } from '../../context/ProofContext';
import { Challenge, Submission, SkillCategory } from '../../types';
import { 
  PlusCircle, 
  CheckCircle2, 
  ExternalLink, 
  Users, 
  FileText, 
  Sliders, 
  Award, 
  Building2,
  AlertCircle
} from 'lucide-react';

export function CompanyPortal() {
  const { 
    t, 
    lang, 
    challenges, 
    addChallenge, 
    submissions, 
    evaluateSubmission, 
    categories, 
    showToast 
  } = useProof();

  const [companyTab, setCompanyTab] = useState<'submissions' | 'create' | 'challenges' | 'discovery'>('submissions');

  // New challenge form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState(categories[0]?.id || 'graphic-design');
  const [newDifficulty, setNewDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'>('Intermediate');
  const [newHours, setNewHours] = useState(6);
  const [newBrief, setNewBrief] = useState('');
  const [newDeliverables, setNewDeliverables] = useState('');
  const [newSkills, setNewSkills] = useState('');
  const [newCompensation, setNewCompensation] = useState('');

  // Interactive submission evaluation state
  const [activeReviewSubId, setActiveReviewSubId] = useState<string | null>(submissions[1]?.id || submissions[0]?.id || null);
  const [qualityScore, setQualityScore] = useState<number>(92);
  const [instructionsScore, setInstructionsScore] = useState<number>(90);
  const [problemSolvingScore, setProblemSolvingScore] = useState<number>(88);
  const [commScore, setCommScore] = useState<number>(90);
  const [reviewFeedback, setReviewFeedback] = useState<string>('');

  // Calculate weighted composite score
  // Quality (40%) + Instructions (25%) + Problem Solving (20%) + Communication (15%)
  const computedCompositeScore = Math.round(
    (qualityScore * 0.40) + 
    (instructionsScore * 0.25) + 
    (problemSolvingScore * 0.20) + 
    (commScore * 0.15)
  );

  const handleCreateChallengeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newBrief.trim()) {
      showToast(lang === 'en' ? 'Please fill in all mandatory fields.' : 'يرجى ملء جميع الحقول المطلوبة.');
      return;
    }

    const deliverablesArray = newDeliverables.split('\n').filter(d => d.trim().length > 0);
    const skillsArray = newSkills.split(',').map(s => s.trim()).filter(s => s.length > 0);

    const createdChallenge: Challenge = {
      id: `ch-custom-${Date.now().toString().slice(-4)}`,
      title: newTitle.trim(),
      titleAr: newTitle.trim(),
      companyId: 'comp-apex',
      companyName: 'Apex Capital MENA',
      categoryId: newCategory,
      difficulty: newDifficulty,
      estimatedHours: Number(newHours),
      briefSummary: newBrief.slice(0, 120) + '...',
      briefSummaryAr: newBrief.slice(0, 120) + '...',
      description: newBrief.trim(),
      descriptionAr: newBrief.trim(),
      deliverables: deliverablesArray.length > 0 
        ? deliverablesArray 
        : ['Production-ready source files', 'Design token or stem export', 'Recorded walkthrough'],
      requiredSkills: skillsArray.length > 0 
        ? skillsArray 
        : ['Craftsmanship', 'Industry Standards'],
      createdAt: new Date().toISOString().substring(0, 10),
      submissionCount: 0,
      status: 'active',
      prizesOrCompensation: newCompensation.trim() || 'Direct Project Contract Interview',
      rubric: [
        { id: 'r-1', title: 'Quality of execution', titleAr: 'جودة التنفيذ والإتقان الفني', weight: 40, description: 'Core output fidelity and craftsmanship', descriptionAr: 'الإتقان الفني للمخرج' },
        { id: 'r-2', title: 'Following instructions', titleAr: 'الالتزام بالمواصفات والشروط', weight: 25, description: 'Strict compliance with brief constraints', descriptionAr: 'الالتزام بالشروط' },
        { id: 'r-3', title: 'Problem solving', titleAr: 'حل المشكلات والابتكار', weight: 20, description: 'Creative ingenuity and workarounds', descriptionAr: 'حل المشكلات' },
        { id: 'r-4', title: 'Communication and delivery', titleAr: 'التواصل والتسليم المنظم', weight: 15, description: 'Clean file organization and clarity', descriptionAr: 'نظافة الملفات' }
      ]
    };

    addChallenge(createdChallenge);
    setNewTitle('');
    setNewBrief('');
    setNewDeliverables('');
    setNewSkills('');
    setNewCompensation('');
    setCompanyTab('challenges');
  };

  const handleRecordEvaluation = (submission: Submission) => {
    const rubricWithScores = [
      { id: 'r-1', title: 'Quality of execution (40%)', titleAr: 'جودة التنفيذ (٤٠٪)', weight: 40, score: qualityScore, description: 'Quality of execution' },
      { id: 'r-2', title: 'Following instructions (25%)', titleAr: 'الالتزام بالمواصفات (٢٥٪)', weight: 25, score: instructionsScore, description: 'Following instructions' },
      { id: 'r-3', title: 'Problem solving (20%)', titleAr: 'حل المشكلات (٢٠٪)', weight: 20, score: problemSolvingScore, description: 'Problem solving' },
      { id: 'r-4', title: 'Communication and delivery (15%)', titleAr: 'التواصل والتسليم (١٥٪)', weight: 15, score: commScore, description: 'Communication and delivery' }
    ];

    evaluateSubmission(
      submission.id, 
      rubricWithScores as any, 
      computedCompositeScore, 
      reviewFeedback || 'Candidate met professional output benchmarks with structured craftsmanship.'
    );

    setReviewFeedback('');
  };

  const currentReviewSub = submissions.find(s => s.id === activeReviewSubId) || submissions[0];

  return (
    <div className="bg-[#101827] text-slate-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* COMPANY PORTAL HEADER */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0b101c] border border-slate-700 flex items-center justify-center text-[#B7F36B] shrink-0 font-bold">
              <Building2 className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">Apex Capital Studio & Hiring Desk</h2>
                <span className="text-[11px] font-mono text-[#B7F36B] font-semibold">
                  · Enterprise Employer
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Review candidate deliverables against standard 4-point rubrics and post active production briefs.
              </p>
            </div>
          </div>

          {/* Sub navigation */}
          <div className="flex items-center gap-1.5 p-1 bg-[#0b111c] rounded-xl border border-slate-800 text-xs font-semibold shrink-0">
            <button
              onClick={() => setCompanyTab('submissions')}
              className={`px-3.5 py-2 rounded-lg transition ${
                companyTab === 'submissions' 
                  ? 'bg-[#B7F36B] text-[#101827] font-bold shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.tabReviewSubmissions} ({submissions.length})
            </button>
            <button
              onClick={() => setCompanyTab('create')}
              className={`px-3.5 py-2 rounded-lg transition ${
                companyTab === 'create' 
                  ? 'bg-[#B7F36B] text-[#101827] font-bold shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              + {t.tabCreateChallenge}
            </button>
            <button
              onClick={() => setCompanyTab('challenges')}
              className={`px-3.5 py-2 rounded-lg transition ${
                companyTab === 'challenges' 
                  ? 'bg-[#B7F36B] text-[#101827] font-bold shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Active Briefs ({challenges.length})
            </button>
            <button
              onClick={() => setCompanyTab('discovery')}
              className={`px-3.5 py-2 rounded-lg transition ${
                companyTab === 'discovery' 
                  ? 'bg-[#B7F36B] text-[#101827] font-bold shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.tabTalentDiscovery}
            </button>
          </div>
        </div>

        {/* TAB 1: REVIEW SUBMISSIONS & 4-POINT SCORING */}
        {companyTab === 'submissions' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 4 Cols: Submission Queue */}
            <div className="lg:col-span-4 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                Evaluation Queue ({submissions.length})
              </h3>

              <div className="space-y-3">
                {submissions.map((sub: Submission) => {
                  const isSelected = (currentReviewSub?.id === sub.id);
                  return (
                    <div
                      key={sub.id}
                      onClick={() => setActiveReviewSubId(sub.id)}
                      className={`p-4 rounded-xl border transition cursor-pointer ${
                        isSelected 
                          ? 'bg-slate-900 border-[#B7F36B] shadow-lg shadow-[#B7F36B]/5' 
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={sub.candidateAvatar} 
                          alt={sub.candidateName}
                          className="w-10 h-10 rounded-lg object-cover border border-slate-700 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white truncate">{sub.candidateName}</span>
                            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                              sub.status === 'evaluated' 
                                ? 'bg-emerald-950 text-[#B7F36B] border border-emerald-800' 
                                : 'bg-amber-950 text-amber-300 border border-amber-800'
                            }`}>
                              {sub.status === 'evaluated' ? `${sub.totalScore}/100` : 'Pending'}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 truncate mt-0.5">
                            {sub.challengeTitle}
                          </p>
                          <span className="text-[10px] text-slate-500 font-mono block mt-1">
                            {sub.submittedAt}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right 8 Cols: Interactive Evaluation Workbench */}
            <div className="lg:col-span-8">
              {currentReviewSub ? (
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6">
                  {/* Candidate Brief Info */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-800">
                    <div className="flex items-center gap-4">
                      <img 
                        src={currentReviewSub.candidateAvatar} 
                        alt={currentReviewSub.candidateName}
                        className="w-14 h-14 rounded-xl object-cover border border-slate-700"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="text-lg font-bold text-white">
                          {currentReviewSub.candidateName}
                        </h4>
                        <span className="text-xs text-slate-400">
                          {currentReviewSub.candidateTitle}
                        </span>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                          Brief: {currentReviewSub.challengeTitle}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono text-slate-400 block">
                        Delivered: {currentReviewSub.submittedAt}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#B7F36B] block mt-0.5">
                        Status: {currentReviewSub.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Submitted Link & Candidate Notes */}
                  <div className="p-4 rounded-xl bg-[#0b101c] border border-slate-800 space-y-3">
                    <div className="text-xs">
                      <span className="font-semibold text-slate-400 uppercase tracking-wider text-[11px] block mb-1">
                        Proof Deliverable Artifact Link
                      </span>
                      <a 
                        href={currentReviewSub.workUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-[#B7F36B] font-mono underline break-all inline-flex items-center gap-1.5"
                      >
                        <span>{currentReviewSub.workUrl}</span>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      </a>
                    </div>

                    <div className="text-xs pt-2 border-t border-slate-800/80">
                      <span className="font-semibold text-slate-400 uppercase tracking-wider text-[11px] block mb-1">
                        Candidate Problem-Solving Context & Notes
                      </span>
                      <p className="text-slate-300 leading-relaxed font-mono text-[11px]">
                        {currentReviewSub.notes}
                      </p>
                    </div>
                  </div>

                  {/* 4-POINT EVALUATION RUBRIC SLIDERS (Requirement 6) */}
                  <div className="p-6 rounded-2xl bg-[#0b101c] border border-slate-800 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h5 className="text-xs font-bold uppercase tracking-wider text-white">
                          {t.evaluationHeader}
                        </h5>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Rate candidate output across the 4 objective weights to compute certified score.
                        </p>
                      </div>
                      <div className="text-right font-mono bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
                        <span className="text-xs text-slate-400 block text-[10px] uppercase">Composite Weighted Grade</span>
                        <span className="text-xl font-bold text-[#B7F36B] tabular-nums">
                          {computedCompositeScore}
                          <span className="text-xs text-slate-400">/100</span>
                        </span>
                      </div>
                    </div>

                    {/* Criteria Sliders */}
                    <div className="space-y-4">
                      {/* 1. Quality (40%) */}
                      <div className="space-y-1.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                        <div className="flex justify-between items-center text-xs font-medium">
                          <span className="text-slate-200">1. {t.critQuality} (Weight: 40%)</span>
                          <span className="font-mono text-[#B7F36B] font-bold tabular-nums">{qualityScore}/100</span>
                        </div>
                        <input 
                          type="range"
                          min="40"
                          max="100"
                          value={qualityScore}
                          onChange={(e) => setQualityScore(Number(e.target.value))}
                          className="w-full accent-[#B7F36B] h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                        />
                        <span className="text-[10px] text-slate-400 block">
                          Visual hierarchy, motion fluidity, typography balance, and audio clarity.
                        </span>
                      </div>

                      {/* 2. Instructions (25%) */}
                      <div className="space-y-1.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                        <div className="flex justify-between items-center text-xs font-medium">
                          <span className="text-slate-200">2. {t.critInstructions} (Weight: 25%)</span>
                          <span className="font-mono text-[#B7F36B] font-bold tabular-nums">{instructionsScore}/100</span>
                        </div>
                        <input 
                          type="range"
                          min="40"
                          max="100"
                          value={instructionsScore}
                          onChange={(e) => setInstructionsScore(Number(e.target.value))}
                          className="w-full accent-[#B7F36B] h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                        />
                        <span className="text-[10px] text-slate-400 block">
                          Strict compliance with brief duration, file naming, required stems, and formats.
                        </span>
                      </div>

                      {/* 3. Problem Solving (20%) */}
                      <div className="space-y-1.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                        <div className="flex justify-between items-center text-xs font-medium">
                          <span className="text-slate-200">3. {t.critProblemSolving} (Weight: 20%)</span>
                          <span className="font-mono text-[#B7F36B] font-bold tabular-nums">{problemSolvingScore}/100</span>
                        </div>
                        <input 
                          type="range"
                          min="40"
                          max="100"
                          value={problemSolvingScore}
                          onChange={(e) => setProblemSolvingScore(Number(e.target.value))}
                          className="w-full accent-[#B7F36B] h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                        />
                        <span className="text-[10px] text-slate-400 block">
                          Creative treatment of rough stems, handling interface glitches or edge cases.
                        </span>
                      </div>

                      {/* 4. Communication & Delivery (15%) */}
                      <div className="space-y-1.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                        <div className="flex justify-between items-center text-xs font-medium">
                          <span className="text-slate-200">4. {t.critComm} (Weight: 15%)</span>
                          <span className="font-mono text-[#B7F36B] font-bold tabular-nums">{commScore}/100</span>
                        </div>
                        <input 
                          type="range"
                          min="40"
                          max="100"
                          value={commScore}
                          onChange={(e) => setCommScore(Number(e.target.value))}
                          className="w-full accent-[#B7F36B] h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                        />
                        <span className="text-[10px] text-slate-400 block">
                          Documentation clarity, organized layer structures, and export hygiene.
                        </span>
                      </div>
                    </div>

                    {/* Qualitative Reviewer Feedback */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        {t.reviewerNotesLabel}
                      </label>
                      <textarea 
                        rows={3}
                        placeholder={lang === 'en' ? "Specific critique, highlights, and guidance on how candidate can improve or advance..." : "ملاحظات تقييمية وتوجيه فني للمرشح..."}
                        value={reviewFeedback}
                        onChange={(e) => setReviewFeedback(e.target.value)}
                        className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-[#B7F36B]"
                      />
                    </div>

                    {/* Save Score Action */}
                    <button
                      onClick={() => handleRecordEvaluation(currentReviewSub)}
                      className="w-full py-3 rounded-xl font-bold text-xs bg-[#B7F36B] text-[#101827] hover:bg-[#a6ec52] transition uppercase tracking-wider shadow-lg shadow-[#B7F36B]/15"
                    >
                      {t.recordScoreBtn} ({computedCompositeScore}/100)
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-400">
                  Select a submission to review deliverables and record rubric scores.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: CREATE A CHALLENGE (Requirement 3.B & 5) */}
        {companyTab === 'create' && (
          <div className="max-w-3xl mx-auto bg-slate-900 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-[11px] font-mono uppercase text-[#B7F36B] font-semibold">
                Challenge Publisher
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                {t.createChallengeTitle}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {t.createChallengeSub}
              </p>
            </div>

            <form onSubmit={handleCreateChallengeSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  {t.formTitleLabel}
                </label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. 30s High-Conversion Product Reel for Mobile App Launch"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0b101c] border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-[#B7F36B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                    {t.formCategoryLabel}
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0b101c] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-[#B7F36B]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {lang === 'ar' ? c.nameAr : c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                    {t.formDifficultyLabel}
                  </label>
                  <select
                    value={newDifficulty}
                    onChange={(e: any) => setNewDifficulty(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0b101c] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-[#B7F36B]"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                    {t.formHoursLabel}
                  </label>
                  <input 
                    type="number"
                    min="1"
                    max="40"
                    value={newHours}
                    onChange={(e) => setNewHours(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0b101c] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-[#B7F36B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  {t.formDeliverablesLabel}
                </label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Describe the real-world scenario, provided input assets, and required output formats..."
                  value={newBrief}
                  onChange={(e) => setNewBrief(e.target.value)}
                  className="w-full p-4 rounded-xl bg-[#0b101c] border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-[#B7F36B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Deliverables Checklist (One per line)
                </label>
                <textarea 
                  rows={3}
                  placeholder={"Master Export in 1080x1920\nProject timeline archive\nWalkthrough Loom video"}
                  value={newDeliverables}
                  onChange={(e) => setNewDeliverables(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#0b101c] border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-[#B7F36B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                    Evaluated Competencies (Comma-separated)
                  </label>
                  <input 
                    type="text"
                    placeholder="Premiere Pro, Sound Design, Timing"
                    value={newSkills}
                    onChange={(e) => setNewSkills(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0b101c] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-[#B7F36B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                    Hiring Opportunity / Bounty / Compensation
                  </label>
                  <input 
                    type="text"
                    placeholder="e.g. $1,000 Bounty + Senior Producer Contract"
                    value={newCompensation}
                    onChange={(e) => setNewCompensation(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0b101c] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-[#B7F36B]"
                  />
                </div>
              </div>

              {/* Rubric confirmation banner */}
              <div className="p-4 rounded-xl bg-[#0b101c] border border-slate-800 text-xs text-slate-400 space-y-1">
                <span className="text-white font-semibold block">Automatic 4-Point Weighted Rubric Attached</span>
                <p>Quality of execution (40%) · Following instructions (25%) · Problem solving (20%) · Delivery (15%)</p>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-xs bg-[#B7F36B] text-[#101827] hover:bg-[#a6ec52] transition uppercase tracking-wider shadow-lg shadow-[#B7F36B]/15"
              >
                {t.publishChallengeBtn}
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: MANAGE PUBLISHED CHALLENGES */}
        {companyTab === 'challenges' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Published Challenges & Active Briefs</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Monitor candidate participation and review submissions.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {challenges.map((ch: Challenge) => (
                <div 
                  key={ch.id}
                  className="bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                      <span>{ch.difficulty} · ~{ch.estimatedHours}h</span>
                      <span className="text-[#B7F36B] font-bold">STATUS: {ch.status.toUpperCase()}</span>
                    </div>

                    <h4 className="text-base font-bold text-white mt-2">{ch.title}</h4>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">{ch.briefSummary}</p>

                    <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between font-mono">
                      <span>{ch.submissionCount} submissions received</span>
                      <span>Rubric: 4 criteria</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setCompanyTab('submissions')}
                    className="w-full py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition"
                  >
                    Review Submissions for this Brief →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: TALENT DISCOVERY */}
        {companyTab === 'discovery' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">{t.tabTalentDiscovery}</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Browse talent verified through practical challenge proofs. Zero keyword-stuffed resumes.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profile 1: Omar Khaled */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <img 
                    src="/src/assets/images/avatar_omar_khaled_1794084162984.jpg" 
                    alt="Omar Khaled"
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-700"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-white">Omar Khaled</h4>
                      <span className="text-[10px] font-mono text-[#B7F36B] bg-emerald-950/70 border border-emerald-800 px-1.5 py-0.5 rounded">
                        PRF-2026-EG-9981
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">Cairo, Egypt · Open to Global Remote</p>
                    <div className="text-[11px] font-mono text-[#B7F36B] font-semibold mt-1">
                      Composite Score: 92.5/100 (Top 4%)
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#0b101c] border border-slate-800 text-xs">
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider mb-1 font-semibold">
                    Verified Competencies (Evidence Backed):
                  </span>
                  <div className="space-y-1 font-mono text-[11px] text-slate-300">
                    <div>✓ Premiere Pro (Score: 95) — SaaS Product Explainer</div>
                    <div>✓ Kinetic Typography (Score: 94) — Motion Graphics</div>
                    <div>✓ Sound Design & Mastering (Score: 92) — Audio Stems</div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono">100% Blind Rubric Certified</span>
                  <button 
                    onClick={() => showToast(lang === 'en' ? 'Direct contract offer invitation dispatched!' : 'تم إرسال دعوة التعاقد المباشر!')}
                    className="px-4 py-2 rounded-lg font-bold text-xs bg-[#B7F36B] text-[#101827] hover:bg-[#a6ec52] transition"
                  >
                    Direct Interview Offer
                  </button>
                </div>
              </div>

              {/* Profile 2: Layla Saeed */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <img 
                    src="/src/assets/images/avatar_layla_saeed_1794084167166.jpg" 
                    alt="Layla Saeed"
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-700"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-white">Layla Saeed</h4>
                      <span className="text-[10px] font-mono text-[#B7F36B] bg-emerald-950/70 border border-emerald-800 px-1.5 py-0.5 rounded">
                        PRF-2026-AE-4019
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">Dubai, UAE · Hybrid / Remote</p>
                    <div className="text-[11px] font-mono text-[#B7F36B] font-semibold mt-1">
                      Composite Score: 94.0/100 (Top 2%)
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#0b101c] border border-slate-800 text-xs">
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider mb-1 font-semibold">
                    Verified Competencies (Evidence Backed):
                  </span>
                  <div className="space-y-1 font-mono text-[11px] text-slate-300">
                    <div>✓ Figma Design Systems (Score: 96) — FinTech Brand Identity</div>
                    <div>✓ WCAG AAA Contrast (Score: 92) — Accessibility Tokens</div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono">100% Blind Rubric Certified</span>
                  <button 
                    onClick={() => showToast(lang === 'en' ? 'Direct contract offer invitation dispatched!' : 'تم إرسال دعوة التعاقد المباشر!')}
                    className="px-4 py-2 rounded-lg font-bold text-xs bg-[#B7F36B] text-[#101827] hover:bg-[#a6ec52] transition"
                  >
                    Direct Interview Offer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
