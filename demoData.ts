import { 
  SkillCategory, 
  Challenge, 
  Submission, 
  CandidateProfile, 
  CompanyProfile 
} from '../types';

export const INITIAL_CATEGORIES: SkillCategory[] = [
  {
    id: 'graphic-design',
    name: 'Graphic Design',
    nameAr: 'التصميم الجرافيكي',
    icon: 'Palette',
    description: 'Visual identity systems, brand guideline decks, typography pairings, and digital campaign vectors.',
    descriptionAr: 'الهويات البصرية الشاملة، أدلة العلامات التجارية، توافق الخطوط، وتصاميم الحملات الرقمية.',
    challengeCount: 16,
    activeCandidates: 340
  },
  {
    id: 'video-editing',
    name: 'Video Editing',
    nameAr: 'تحرير الفيديو والمونتاج',
    icon: 'Film',
    description: 'High-retention commercial cuts, kinetic typography, dynamic sound design, and color grading mastery.',
    descriptionAr: 'المونتاج الإعلاني عالي التفاعل، الطباعة الحركية، هندسة المؤثرات الصوتية، والتلوين السينمائي.',
    challengeCount: 22,
    activeCandidates: 410
  }
];

export const DEMO_COMPANIES: CompanyProfile[] = [
  {
    id: 'comp-apex',
    name: 'Apex Capital MENA',
    industry: 'Financial Technology & Venture',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
    location: 'Dubai & Riyadh',
    verifiedHiresCount: 14,
    activeChallengesCount: 3,
    about: 'Leading digital asset and infrastructure venture firm in the GCC, hiring design and video craftsmen based purely on verified outputs.'
  },
  {
    id: 'comp-loomic',
    name: 'Loomic Studios',
    industry: 'Creative Production & Growth Media',
    logo: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=150&q=80',
    location: 'London & Cairo (Remote)',
    verifiedHiresCount: 28,
    activeChallengesCount: 4,
    about: 'High-growth media collective building retention-focused video pipelines for tier-1 SaaS brands.'
  }
];

export const DEMO_CHALLENGES: Challenge[] = [
  {
    id: 'ch-gd-01',
    title: 'FinTech Brand Identity & Design System Extension',
    titleAr: 'توسعة الهوية البصرية ونظام التصميم لشركة تقنية مالية',
    companyId: 'comp-apex',
    companyName: 'Apex Capital MENA',
    categoryId: 'graphic-design',
    difficulty: 'Intermediate',
    estimatedHours: 6,
    briefSummary: 'Design a high-contrast corporate identity deck and 4 responsive social media templates adhering to dark-mode finance guidelines.',
    briefSummaryAr: 'تصميم حزمة هوية بصرية متكاملة وعالية التباين مع ٤ قوالب تسويقية رقمية متوافقة مع نمط الوضع الداكن.',
    description: 'Apex Capital is launching "Nexus Finance", a sovereign enterprise treasury solution. You are tasked with taking our core vector mark and constructing: 1) A 10-page brand guidelines mini-deck in Figma, 2) Complete accessible color tokens passing WCAG AAA contrast, and 3) Four high-impact editorial social announcement cards. File hygiene, layer naming, and auto-layout precision will be inspected.',
    descriptionAr: 'تطلق شركة Apex Capital حلاً مالياً رقمياً باسم Nexus Finance. مهمتك أخذ الشعار الأساسي وتطوير: ١) دليل مصغر للهوية من ١٠ صفحات على فيجما، ٢) منظومة ألوان معتمدة لمعايير التباين العالمية، ٣) ٤ تصاميم إعلانية لمنصات التواصل مع الالتزام التام بنظام Auto-Layout وتسمية الطبقات.',
    deliverables: [
      'Figma source file link with view/inspect permission and auto-layout components',
      'Exported multi-page brand presentation PDF (min 1920x1080)',
      'Recorded 2-minute Loom/video walkthrough discussing typography scale and accessibility choices'
    ],
    deliverablesAr: [
      'رابط ملف فيجما مع صلاحيات الفحص والمكونات المنظمة',
      'ملف PDF عالي الجودة يحتوي على صفحات الدليل الإرشادي',
      'فيديو توثيقي مدته دقيقتان يوضح فلسفة اختيار الخطوط وتوزيع التباين'
    ],
    requiredSkills: ['Figma Auto-Layout', 'Brand Identity Systems', 'WCAG AAA Accessibility', 'Typography Hierarchy'],
    heroImage: '/src/assets/images/challenge_fintech_brand_1794084165188.jpg',
    prizesOrCompensation: 'Fast-track Senior Brand Designer Interview + $750 Fast-Pass Bonus',
    rubric: [
      {
        id: 'rub-1',
        title: 'Quality of execution',
        titleAr: 'جودة التنفيذ والإتقان الفني',
        weight: 40,
        description: 'Visual balance, typography rhythm, alignment precision, and sophisticated color handling.',
        descriptionAr: 'التوازن البصري، إيقاع الخطوط، دقة المحاذاة، والتعامل الاحترافي مع تدرجات الألوان.'
      },
      {
        id: 'rub-2',
        title: 'Following instructions',
        titleAr: 'الالتزام بالشروط والمواصفات',
        weight: 25,
        description: 'Exact adherence to WCAG AAA contrast ratio, delivered page count, and export file formats.',
        descriptionAr: 'الالتزام التام بنسب التباين المعيارية، عدد الصفحات المطلوب، وصيغ التصدير.'
      },
      {
        id: 'rub-3',
        title: 'Problem solving',
        titleAr: 'حل المشكلات والابتكار',
        weight: 20,
        description: 'Creative visual metaphors for complex financial concepts without visual clichés.',
        descriptionAr: 'ابتكار دلالات بصرية ذكية لتبسيط المفاهيم المالية المعقدة بعيداً عن القوالب المكررة.'
      },
      {
        id: 'rub-4',
        title: 'Communication and delivery',
        titleAr: 'التواصل وجودة التسليم',
        weight: 15,
        description: 'Walkthrough video clarity, organized Figma frame structure, and descriptive component labels.',
        descriptionAr: 'وضوح الفيديو التوثيقي، ونظافة تنظيم إطارات العمل وتسمية المكونات.'
      }
    ],
    createdAt: '2026-03-20',
    submissionCount: 28,
    status: 'active'
  },
  {
    id: 'ch-ve-02',
    title: 'High-Retention SaaS Product Explainer (60s)',
    titleAr: 'فيديو تسويقي تفاعلي عالي الاحتفاظ لمنتج SaaS (٦٠ ثانية)',
    companyId: 'comp-loomic',
    companyName: 'Loomic Studios',
    categoryId: 'video-editing',
    difficulty: 'Advanced',
    estimatedHours: 8,
    briefSummary: 'Transform raw product screencasts and unmastered voice stems into a punchy, kinetic-text product trailer with sound design.',
    briefSummaryAr: 'تحويل تسجيلات شاشة خام وتسجيل صوتي إلى فيديو ترويجي إيقاعي مدته ٦٠ ثانية مع مؤثرات صوتية احترافية.',
    description: 'Given 5 raw unedited screencasts of a collaborative software platform and a rough scratch vocal recording, create a 60-second broadcast trailer. Deliverables include kinetic typography hooks in the first 3 seconds, dynamic UI zooms with smooth bezier ease, bespoke sound design with risers/whooshes, and precise color-coded subtitle styling.',
    descriptionAr: 'باستخدام ٥ تسجيلات خام للشاشة وتسجيل صوتي تجريبي، قم بإنتاج فيديو ترويجي مدته ٦٠ ثانية. يتضمن التحدي خطافاً بصرياً في أول ٣ ثوانٍ، تقريب ديناميكي ناعم للواجهات، هندسة صوتية متكاملة، ونصوصاً حركية جذابة مع ترجمة متزامنة بدقة.',
    deliverables: [
      'Rendered ProRes 422 or High-Bitrate H.265 in 1920x1080 (16:9) and 1080x1920 (9:16)',
      'Master Premiere Pro Project File or DaVinci Resolve Project Archive (.dra)',
      'Exported Stems folder split into Dialog, SFX, and Music'
    ],
    deliverablesAr: [
      'فيديو نهائي عالي الجودة بصيغتي العرض الأفقي ١٦:٩ والعمودي ٩:١٦',
      'ملف المشروع المصدري (بريمير برو أو دافينشي ريزولف)',
      'مجلد المسارات الصوتية المنفصلة (حوار، مؤثرات، وموسيقى)'
    ],
    requiredSkills: ['Adobe Premiere Pro', 'After Effects', 'Kinetic Typography', 'Sound Design & Mastering'],
    heroImage: '/src/assets/images/hero_evidence_showcase_1794084161894.jpg',
    prizesOrCompensation: '$1,200 Challenge Bounty + Direct Lead Video Producer Contract Offer',
    rubric: [
      {
        id: 'rub-1',
        title: 'Quality of execution',
        titleAr: 'جودة التنفيذ والإتقان الفني',
        weight: 40,
        description: 'Smooth motion interpolation, audio balance without vocal masking, and color grade consistency.',
        descriptionAr: 'سلاسة الحركة والتحريك، ميكساج الصوت دون تشويش على الحوار، وثبات درجات الألوان.'
      },
      {
        id: 'rub-2',
        title: 'Following instructions',
        titleAr: 'الالتزام بالمواصفات والشروط',
        weight: 25,
        description: 'Exact 60.00-second timeline duration, dual aspect delivery, and complete stems package.',
        descriptionAr: 'الالتزام التام بالمدة المحددة (٦٠ ثانية بالضبط)، والتسليم بالأبعاد الأفقية والرأسية.'
      },
      {
        id: 'rub-3',
        title: 'Problem solving',
        titleAr: 'حل المشكلات والابتكار',
        weight: 20,
        description: 'Creative framing to hide prototype UI layout bugs in the raw capture clips.',
        descriptionAr: 'استخدام القطع والتقريب الذكي لإخفاء الأخطاء البرمجية الظاهرة في التسجيلات الخام.'
      },
      {
        id: 'rub-4',
        title: 'Communication and delivery',
        titleAr: 'التواصل والتسليم المنظم',
        weight: 15,
        description: 'Timeline cleanliness, track labeling, export notes, and well-packaged cloud folder archive.',
        descriptionAr: 'ترتيب الخط الزمني، تسمية المسارات، وإرفاق ملاحظات فنية واضحة مع الملفات.'
      }
    ],
    createdAt: '2026-03-22',
    submissionCount: 42,
    status: 'active'
  },
  {
    id: 'ch-gd-03',
    title: 'Mobile Banking Design System Component Library',
    titleAr: 'بناء مكتبة مكونات نظام تصميم لتطبيق مصرفي ذكي',
    companyId: 'comp-apex',
    companyName: 'Apex Capital MENA',
    categoryId: 'graphic-design',
    difficulty: 'Advanced',
    estimatedHours: 10,
    briefSummary: 'Construct a reusable, responsive tokenized component library in Figma for an enterprise mobile fintech application.',
    briefSummaryAr: 'تطوير مكتبة مكونات تفاعلية قابلة لإعادة الاستخدام في فيجما لتطبيق مصرفي بنكي متكامل.',
    description: 'Create an accessible, multi-state token library covering transactional cards, biometric auth states, security pins, and dynamic charts with light & dark theme variance.',
    descriptionAr: 'بناء منظومة مكونات تدعم الحالات التفاعلية المختلفة (البطاقات البنكية، شاشات البصمة، الرسوم البيانية) مع دعم كامل للوضعين الفاتح والداكن.',
    deliverables: [
      'Interactive Figma Component Set with variants and auto-layout',
      'Design Token JSON schema export',
      'Documentation frame explaining spacing, radius, and elevation math'
    ],
    deliverablesAr: [
      'مجموعة مكونات تفاعلية في فيجما مع كافة المتغيرات',
      'ملف Design Tokens بصيغة JSON',
      'إطار توثيقي يوضح حسابات المسافات ودرجات الظلال'
    ],
    requiredSkills: ['Figma Variants', 'Design Tokens', 'Mobile UI Systems', 'Financial UX'],
    heroImage: '/src/assets/images/challenge_fintech_brand_1794084165188.jpg',
    prizesOrCompensation: '$900 Honorarium + Design Systems Contract Interview',
    rubric: [
      { id: 'rub-1', title: 'Quality of execution', titleAr: 'جودة التنفيذ والإتقان الفني', weight: 40, description: 'Component scalability and token logic' },
      { id: 'rub-2', title: 'Following instructions', titleAr: 'الالتزام بالمواصفات والشروط', weight: 25, description: 'All states provided: default, hover, focused, disabled, error' },
      { id: 'rub-3', title: 'Problem solving', titleAr: 'حل المشكلات والابتكار', weight: 20, description: 'Compact display of complex ledger tables' },
      { id: 'rub-4', title: 'Communication and delivery', titleAr: 'التواصل والتسليم المنظم', weight: 15, description: 'Clean naming hierarchy and developer handoff notes' }
    ],
    createdAt: '2026-03-24',
    submissionCount: 19,
    status: 'active'
  }
];

export const DEMO_CANDIDATE_PROFILE: CandidateProfile = {
  id: 'usr-omar-k',
  name: 'Omar Khaled',
  nameAr: 'عمر خالد',
  avatar: '/src/assets/images/avatar_omar_khaled_1794084162984.jpg',
  headline: 'Commercial Video Editor & Senior Brand Systems Designer',
  headlineAr: 'مونتير إعلاني ومصمم نظم هويات بصرية متقدمة',
  location: 'Cairo, Egypt (Open to Global Remote)',
  locationAr: 'القاهرة، مصر (متاح للعمل عن بُعد دولياً)',
  bio: 'Specialist in high-velocity visual communication. 6+ years producing retention-engineered product explainers and systematic brand identities. I prefer to show verified evidence rather than generic CV claims.',
  bioAr: 'متخصص في التواصل البصري عالي الإيقاع. أكثر من ٦ سنوات في إنتاج الفيديوهات التسويقية والهويات البصرية المؤسسية. أؤمن بتقديم أدلة حقيقية تثبت جودة المهارة بدلاً من الكلمات الرنانة.',
  passportId: 'PRF-2026-EG-9981',
  joinedDate: 'Jan 2026',
  averageScore: 92.5,
  percentileRank: 96,
  verifiedSkills: [
    {
      id: 'sk-1',
      name: 'Adobe Premiere Pro',
      nameAr: 'أدوبي بريمير برو',
      categoryId: 'video-editing',
      isVerified: true,
      verifiedAt: '2026-03-24',
      evidenceChallengeId: 'ch-ve-02',
      evidenceTitle: 'High-Retention SaaS Product Explainer (60s)',
      score: 95
    },
    {
      id: 'sk-2',
      name: 'Kinetic Typography',
      nameAr: 'الطباعة الحركية التفاعلية',
      categoryId: 'video-editing',
      isVerified: true,
      verifiedAt: '2026-03-24',
      evidenceChallengeId: 'ch-ve-02',
      evidenceTitle: 'High-Retention SaaS Product Explainer (60s)',
      score: 94
    },
    {
      id: 'sk-3',
      name: 'Sound Design & Mastering',
      nameAr: 'هندسة وميكساج الصوت',
      categoryId: 'video-editing',
      isVerified: true,
      verifiedAt: '2026-03-24',
      evidenceChallengeId: 'ch-ve-02',
      evidenceTitle: 'High-Retention SaaS Product Explainer (60s)',
      score: 92
    },
    {
      id: 'sk-4',
      name: 'Figma Brand Guidelines',
      nameAr: 'أدلة الهوية في فيجما',
      categoryId: 'graphic-design',
      isVerified: true,
      verifiedAt: '2026-02-18',
      evidenceChallengeId: 'ch-gd-01',
      evidenceTitle: 'FinTech Brand Identity & Design System Extension',
      score: 89
    }
  ],
  unverifiedSkills: [
    {
      id: 'sk-u1',
      name: '3D Blender Animation',
      nameAr: 'تصميم ثلاثي الأبعاد (بلندر)',
      categoryId: 'graphic-design',
      isVerified: false
    },
    {
      id: 'sk-u2',
      name: 'Cinema 4D Broadcast Packaging',
      nameAr: 'سينما فور دي للبث التلفزيوني',
      categoryId: 'video-editing',
      isVerified: false
    },
    {
      id: 'sk-u3',
      name: 'Full Color Timing (DaVinci Resolve)',
      nameAr: 'تلوين متقدم (دافينشي ريزولف)',
      categoryId: 'video-editing',
      isVerified: false
    }
  ],
  portfolioItems: [
    {
      id: 'port-1',
      title: 'SaaS Explainer Cut v2 (Master Output)',
      url: 'https://proof.platform/evidence/omar-k-saas-cut-v2.mp4',
      type: 'video'
    },
    {
      id: 'port-2',
      title: 'Nexus Capital Brand Kit & Tokens',
      url: 'https://figma.com/@omarkhaled/nexus-brand-deck',
      type: 'figma'
    }
  ]
};

export const DEMO_SUBMISSIONS: Submission[] = [
  {
    id: 'sub-808',
    challengeId: 'ch-ve-02',
    challengeTitle: 'High-Retention SaaS Product Explainer (60s)',
    candidateId: 'usr-omar-k',
    candidateName: 'Omar Khaled',
    candidateAvatar: '/src/assets/images/avatar_omar_khaled_1794084162984.jpg',
    candidateTitle: 'Senior Video Editor & Motion Artist',
    submittedAt: '2026-03-24 14:30',
    status: 'evaluated',
    workUrl: 'https://proof.platform/evidence/omar-k-saas-cut-v2.mp4',
    notes: 'Used custom sound design stems from Artlist and custom bezier easing for all screen zooms. Master exports provided in both 16:9 landscape and 9:16 vertical reels with exact 00:59:28 timing.',
    totalScore: 92.5,
    feedback: 'Exceptional pacing and audio sidechaining. The kinetic text in the first 3 seconds immediately hooked attention. Met all technical deliverables with clean timeline labeling.',
    rubricEvaluation: [
      {
        id: 'rub-1',
        title: 'Quality of execution',
        titleAr: 'جودة التنفيذ والإتقان الفني',
        weight: 40,
        score: 95,
        description: 'Pacing, color harmony, and seamless audio transitions',
        descriptionAr: 'سلاسة الحركة والتحريك، ميكساج الصوت، وثبات درجات الألوان',
        notes: 'Crisp audio curves and buttery smooth 60fps keyframes.'
      },
      {
        id: 'rub-2',
        title: 'Following instructions',
        titleAr: 'الالتزام بالشروط والمواصفات',
        weight: 25,
        score: 96,
        description: 'Exact 60-second runtime limit and correct dual-aspect outputs',
        descriptionAr: 'الالتزام بالمدة والمخرجات المطلوبة',
        notes: 'Both 9:16 and 16:9 delivered exactly at 00:59:28 with all three stem folders.'
      },
      {
        id: 'rub-3',
        title: 'Problem solving',
        titleAr: 'حل المشكلات والإبداع',
        weight: 20,
        score: 88,
        description: 'Creative treatment of prototype interface glitches',
        descriptionAr: 'معالجة ذكية للعيوب الظاهرة في التسجيلات',
        notes: 'Clever micro-blur gradient and camera push to conceal prototype interface errors.'
      },
      {
        id: 'rub-4',
        title: 'Communication and delivery',
        titleAr: 'التواصل وجودة التسليم',
        weight: 15,
        score: 85,
        description: 'Clean folder packaging and descriptive export notes',
        descriptionAr: 'ترتيب الخط الزمني وإرفاق ملاحظات فنية واضحة',
        notes: 'Well-structured Google Drive folder with labeled stems and project archive.'
      }
    ]
  },
  {
    id: 'sub-902',
    challengeId: 'ch-gd-01',
    challengeTitle: 'FinTech Brand Identity & Design System Extension',
    candidateId: 'usr-layla-s',
    candidateName: 'Layla Saeed',
    candidateAvatar: '/src/assets/images/avatar_layla_saeed_1794084167166.jpg',
    candidateTitle: 'Brand Identity Specialist',
    submittedAt: '2026-03-25 09:15',
    status: 'under_review',
    workUrl: 'https://figma.com/@laylasaeed/nexus-finance-submission',
    notes: 'Constructed an auto-layout token system for 4 marketing cards with WCAG AAA dark slate contrasts and responsive variant properties.',
    rubricEvaluation: [
      { id: 'rub-1', title: 'Quality of execution', titleAr: 'جودة التنفيذ والإتقان الفني', weight: 40, description: 'Visual balance and layout discipline', descriptionAr: 'التوازن البصري' },
      { id: 'rub-2', title: 'Following instructions', titleAr: 'الالتزام بالمواصفات والشروط', weight: 25, description: 'WCAG AAA contrast check', descriptionAr: 'فحص التباين' },
      { id: 'rub-3', title: 'Problem solving', titleAr: 'حل المشكلات والابتكار', weight: 20, description: 'Financial data treatment', descriptionAr: 'عرض البيانات المالية' },
      { id: 'rub-4', title: 'Communication and delivery', titleAr: 'التواصل والتسليم المنظم', weight: 15, description: 'Documentation frame clarity', descriptionAr: 'وضوح التوثيق' }
    ]
  }
];
