export type Language = 'en' | 'ar';
export type UserRole = 'talent' | 'company' | 'admin' | 'public';
export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
export type SubmissionStatus = 'submitted' | 'under_review' | 'evaluated' | 'revision_requested';

export interface Skill {
  id: string;
  name: string;
  nameAr: string;
  categoryId: string;
  isVerified: boolean; // Only verified if demonstrated through completed challenge
  verifiedAt?: string;
  evidenceChallengeId?: string;
  score?: number; // 0 - 100
  evidenceTitle?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
  description: string;
  descriptionAr: string;
  challengeCount: number;
  activeCandidates?: number;
}

export interface RubricCriteria {
  id: string;
  title: string;
  titleAr: string;
  weight: number; // percentage, e.g. 40 for 40%
  description: string;
  descriptionAr?: string;
  score?: number; // 0 - 100
  notes?: string;
}

export interface Challenge {
  id: string;
  title: string;
  titleAr: string;
  companyId: string;
  companyName: string;
  companyLogo?: string;
  categoryId: string;
  difficulty: DifficultyLevel;
  estimatedHours: number;
  description: string;
  descriptionAr: string;
  briefSummary: string;
  briefSummaryAr: string;
  deliverables: string[];
  deliverablesAr?: string[];
  requiredSkills: string[];
  rubric: RubricCriteria[];
  createdAt: string;
  submissionCount: number;
  status: 'active' | 'draft' | 'archived';
  heroImage?: string;
  prizesOrCompensation?: string;
}

export interface Submission {
  id: string;
  challengeId: string;
  challengeTitle: string;
  candidateId: string;
  candidateName: string;
  candidateAvatar: string;
  candidateTitle: string;
  submittedAt: string;
  status: SubmissionStatus;
  workUrl: string;
  notes: string;
  totalScore?: number;
  feedback?: string;
  rubricEvaluation?: RubricCriteria[];
  livePreviewUrl?: string;
}

export interface CandidateProfile {
  id: string;
  name: string;
  nameAr?: string;
  avatar: string;
  headline: string;
  headlineAr?: string;
  location: string;
  locationAr?: string;
  bio: string;
  bioAr?: string;
  passportId: string;
  joinedDate: string;
  averageScore: number;
  percentileRank: number; // e.g. 96 for Top 4%
  verifiedSkills: Skill[];
  unverifiedSkills: Skill[];
  portfolioItems: {
    id: string;
    title: string;
    url: string;
    thumbnail?: string;
    type: 'figma' | 'video' | 'deck' | 'link';
  }[];
}

export interface CompanyProfile {
  id: string;
  name: string;
  industry: string;
  logo: string;
  location: string;
  verifiedHiresCount: number;
  activeChallengesCount: number;
  about: string;
}
