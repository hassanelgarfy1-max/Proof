import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Language, 
  UserRole, 
  SkillCategory, 
  Challenge, 
  Submission, 
  CandidateProfile, 
  RubricCriteria,
  Skill
} from '../types';
import { translations } from '../data/translations';
import { 
  INITIAL_CATEGORIES, 
  DEMO_CHALLENGES, 
  DEMO_SUBMISSIONS, 
  DEMO_CANDIDATE_PROFILE 
} from '../data/demoData';

interface ProofContextType {
  lang: Language;
  setLang: (l: Language) => void;
  isRtl: boolean;
  t: typeof translations['en'];
  currentRole: UserRole;
  setCurrentRole: (r: UserRole) => void;
  activeView: 'landing' | 'talent' | 'company' | 'admin' | 'passport';
  setActiveView: (v: 'landing' | 'talent' | 'company' | 'admin' | 'passport') => void;
  categories: SkillCategory[];
  addCategory: (cat: { name: string; nameAr: string; description: string; descriptionAr?: string }) => void;
  challenges: Challenge[];
  addChallenge: (c: Challenge) => void;
  submissions: Submission[];
  addSubmission: (s: Submission) => void;
  evaluateSubmission: (submissionId: string, scores: RubricCriteria[], finalScore: number, feedback: string) => void;
  selectedChallenge: Challenge | null;
  setSelectedChallenge: (c: Challenge | null) => void;
  isSubmitModalOpen: boolean;
  setIsSubmitModalOpen: (open: boolean) => void;
  candidateProfile: CandidateProfile;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const ProofContext = createContext<ProofContextType | undefined>(undefined);

export function ProofProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('en');
  const [currentRole, setCurrentRole] = useState<UserRole>('talent');
  const [activeView, setActiveView] = useState<'landing' | 'talent' | 'company' | 'admin' | 'passport'>('landing');
  
  const [categories, setCategories] = useState<SkillCategory[]>(INITIAL_CATEGORIES);
  const [challenges, setChallenges] = useState<Challenge[]>(DEMO_CHALLENGES);
  const [submissions, setSubmissions] = useState<Submission[]>(DEMO_SUBMISSIONS);
  const [candidateProfile, setCandidateProfile] = useState<CandidateProfile>(DEMO_CANDIDATE_PROFILE);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(DEMO_CHALLENGES[0]);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const isRtl = lang === 'ar';
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang, isRtl]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const addCategory = (cat: { name: string; nameAr: string; description: string; descriptionAr?: string }) => {
    const id = cat.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
    const newCategory: SkillCategory = {
      id,
      name: cat.name,
      nameAr: cat.nameAr || cat.name,
      icon: 'Layers',
      description: cat.description,
      descriptionAr: cat.descriptionAr || cat.description,
      challengeCount: 0,
      activeCandidates: 0
    };
    setCategories(prev => [...prev, newCategory]);
    showToast(lang === 'en' ? `New discipline "${cat.name}" added!` : `تمت إضافة تخصص "${cat.nameAr}" بنجاح!`);
  };

  const addChallenge = (c: Challenge) => {
    setChallenges(prev => [c, ...prev]);
    // update category count
    setCategories(prev => prev.map(cat => cat.id === c.categoryId ? { ...cat, challengeCount: cat.challengeCount + 1 } : cat));
    showToast(lang === 'en' ? `Challenge published to PROOF network!` : `تم نشر التحدي في شبكة بروف!`);
  };

  const addSubmission = (sub: Submission) => {
    setSubmissions(prev => [sub, ...prev]);
    // update challenge submission count
    setChallenges(prev => prev.map(ch => ch.id === sub.challengeId ? { ...ch, submissionCount: ch.submissionCount + 1 } : ch));
    showToast(lang === 'en' ? `Evidence submitted! Sent to employer evaluation queue.` : `تم تسليم دليل الإنجاز! أُرسل لقائمة مراجعة جهة التوظيف.`);
  };

  const evaluateSubmission = (
    submissionId: string, 
    scores: RubricCriteria[], 
    finalScore: number, 
    feedback: string
  ) => {
    setSubmissions(prev => prev.map(sub => {
      if (sub.id === submissionId) {
        return {
          ...sub,
          status: 'evaluated',
          totalScore: finalScore,
          feedback,
          rubricEvaluation: scores
        };
      }
      return sub;
    }));

    // If score >= 80 and submission is for candidate Omar, add to verified skills
    const evaluatedSub = submissions.find(s => s.id === submissionId);
    if (evaluatedSub && finalScore >= 80) {
      const relatedChallenge = challenges.find(ch => ch.id === evaluatedSub.challengeId);
      if (relatedChallenge) {
        const newVerifiedSkill: Skill = {
          id: `sk-ver-${Date.now()}`,
          name: relatedChallenge.requiredSkills[0] || 'Technical Mastery',
          nameAr: relatedChallenge.requiredSkills[0] || 'إتقان فني مثبت',
          categoryId: relatedChallenge.categoryId,
          isVerified: true,
          verifiedAt: new Date().toISOString().substring(0, 10),
          evidenceChallengeId: relatedChallenge.id,
          evidenceTitle: relatedChallenge.title,
          score: finalScore
        };

        setCandidateProfile(prev => ({
          ...prev,
          verifiedSkills: [newVerifiedSkill, ...prev.verifiedSkills],
          averageScore: Math.round(((prev.averageScore * prev.verifiedSkills.length) + finalScore) / (prev.verifiedSkills.length + 1))
        }));
      }
    }

    showToast(lang === 'en' ? `Evaluation and verified grade recorded (${finalScore}/100)` : `تم حفظ واعتماد التقييم الرسمي (${finalScore}/١٠٠)`);
  };

  return (
    <ProofContext.Provider value={{
      lang,
      setLang,
      isRtl,
      t,
      currentRole,
      setCurrentRole,
      activeView,
      setActiveView,
      categories,
      addCategory,
      challenges,
      addChallenge,
      submissions,
      addSubmission,
      evaluateSubmission,
      selectedChallenge,
      setSelectedChallenge,
      isSubmitModalOpen,
      setIsSubmitModalOpen,
      candidateProfile,
      toastMessage,
      showToast
    }}>
      {children}
    </ProofContext.Provider>
  );
}

export function useProof() {
  const context = useContext(ProofContext);
  if (!context) {
    throw new Error('useProof must be used within a ProofProvider');
  }
  return context;
}
