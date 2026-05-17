// ============================================
// STEPTHROUGH — GOVERNMENT SCHEMES MASTER DATA
// Comprehensive catalog of all government services
// ============================================

export interface SchemeCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
  count: number;
}

export interface SchemeItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  icon: string;
  tagline: string;
  provider: string;
  fee: string;
  estimatedTime: string;
  difficulty: 'easy' | 'moderate' | 'hard';
  popularity: number; // 1-100
  tags: string[];
}

export const schemeCategories: SchemeCategory[] = [
  { id: 'all', label: 'All Schemes', icon: '🏛️', color: '#6366f1', count: 0 },
  { id: 'identity', label: 'Identity & KYC', icon: '🪪', color: '#3b82f6', count: 8 },
  { id: 'passport', label: 'Passport & Visa', icon: '✈️', color: '#8b5cf6', count: 4 },
  { id: 'finance', label: 'Finance & Tax', icon: '💰', color: '#10b981', count: 6 },
  { id: 'education', label: 'Education', icon: '🎓', color: '#f59e0b', count: 5 },
  { id: 'welfare', label: 'Welfare Schemes', icon: '🤝', color: '#ef4444', count: 7 },
  { id: 'health', label: 'Healthcare', icon: '🏥', color: '#ec4899', count: 4 },
  { id: 'housing', label: 'Housing', icon: '🏠', color: '#14b8a6', count: 3 },
  { id: 'agriculture', label: 'Agriculture', icon: '🌾', color: '#84cc16', count: 4 },
  { id: 'employment', label: 'Employment', icon: '💼', color: '#f97316', count: 4 },
  { id: 'business', label: 'Business & Startup', icon: '🚀', color: '#a855f7', count: 4 },
  { id: 'legal', label: 'Legal & Certificates', icon: '⚖️', color: '#64748b', count: 5 },
];

export const allSchemes: SchemeItem[] = [
  // ===== IDENTITY & KYC =====
  { id: 'sc1', slug: 'apply-for-new-aadhaar-card', title: 'Apply for New Aadhaar Card', category: 'identity', icon: '🪪', tagline: 'Get your 12-digit unique identity number', provider: 'UIDAI', fee: 'Free', estimatedTime: '15-30 days', difficulty: 'easy', popularity: 98, tags: ['aadhaar', 'identity', 'uidai'] },
  { id: 'sc2', slug: 'aadhaar-card-update-correction', title: 'Aadhaar Card Update & Correction', category: 'identity', icon: '✏️', tagline: 'Update name, address, DOB, mobile, email', provider: 'UIDAI', fee: '₹50', estimatedTime: '5-15 days', difficulty: 'easy', popularity: 95, tags: ['aadhaar', 'update', 'correction'] },
  { id: 'sc3', slug: 'aadhaar-pan-linking', title: 'Aadhaar-PAN Linking', category: 'identity', icon: '🔗', tagline: 'Mandatory linking of Aadhaar with PAN card', provider: 'Income Tax Dept', fee: '₹1000 (late fee)', estimatedTime: '1-7 days', difficulty: 'easy', popularity: 90, tags: ['aadhaar', 'pan', 'linking'] },
  { id: 'sc4', slug: 'apply-for-pan-card', title: 'Apply for PAN Card', category: 'identity', icon: '💳', tagline: 'Permanent Account Number for tax purposes', provider: 'Income Tax Dept / NSDL', fee: '₹107', estimatedTime: '7-15 days', difficulty: 'easy', popularity: 92, tags: ['pan', 'tax', 'identity'] },
  { id: 'sc5', slug: 'voter-id-card-application', title: 'Voter ID Card (EPIC)', category: 'identity', icon: '🗳️', tagline: 'Electoral photo identity card for voting', provider: 'Election Commission', fee: 'Free', estimatedTime: '15-30 days', difficulty: 'easy', popularity: 85, tags: ['voter', 'election', 'identity'] },
  { id: 'sc6', slug: 'driving-license-application', title: 'Driving License Application', category: 'identity', icon: '🚗', tagline: 'Learner & permanent driving license', provider: 'MoRTH / State RTO', fee: '₹200-500', estimatedTime: '30-60 days', difficulty: 'moderate', popularity: 88, tags: ['driving', 'license', 'rto'] },
  { id: 'sc7', slug: 'ration-card-application', title: 'Ration Card Application', category: 'identity', icon: '🍚', tagline: 'Essential for PDS food distribution', provider: 'State Food Dept', fee: 'Free-₹45', estimatedTime: '15-30 days', difficulty: 'easy', popularity: 80, tags: ['ration', 'pds', 'food'] },
  { id: 'sc8', slug: 'e-shram-card-registration', title: 'e-Shram Card Registration', category: 'identity', icon: '👷', tagline: 'Unorganized worker identity & benefits', provider: 'Ministry of Labour', fee: 'Free', estimatedTime: '1-3 days', difficulty: 'easy', popularity: 75, tags: ['eshram', 'labour', 'worker'] },

  // ===== PASSPORT & VISA =====
  { id: 'sc9', slug: 'apply-for-fresh-passport', title: 'Apply for Fresh Passport', category: 'passport', icon: '📘', tagline: 'New Indian passport application', provider: 'MEA / Passport Seva', fee: '₹1500-2000', estimatedTime: '7-30 days', difficulty: 'moderate', popularity: 90, tags: ['passport', 'travel', 'mea'] },
  { id: 'sc10', slug: 'passport-renewal', title: 'Passport Renewal', category: 'passport', icon: '🔄', tagline: 'Renew expired or expiring passport', provider: 'MEA / Passport Seva', fee: '₹1500-2000', estimatedTime: '7-21 days', difficulty: 'moderate', popularity: 85, tags: ['passport', 'renewal'] },
  { id: 'sc11', slug: 'tatkal-passport-application', title: 'Tatkal Passport Application', category: 'passport', icon: '⚡', tagline: 'Urgent passport in 1-3 days', provider: 'MEA / Passport Seva', fee: '₹3500-4000', estimatedTime: '1-3 days', difficulty: 'moderate', popularity: 70, tags: ['passport', 'tatkal', 'urgent'] },
  { id: 'sc12', slug: 'police-clearance-certificate', title: 'Police Clearance Certificate', category: 'passport', icon: '🛡️', tagline: 'PCC for visa/immigration purposes', provider: 'Passport Office / Police', fee: '₹500', estimatedTime: '7-15 days', difficulty: 'moderate', popularity: 55, tags: ['pcc', 'police', 'visa'] },

  // ===== FINANCE & TAX =====
  { id: 'sc13', slug: 'income-tax-return-filing', title: 'Income Tax Return Filing', category: 'finance', icon: '📊', tagline: 'File your annual ITR online', provider: 'Income Tax Dept', fee: 'Free (self)', estimatedTime: '1-3 hours', difficulty: 'moderate', popularity: 88, tags: ['itr', 'tax', 'income'] },
  { id: 'sc14', slug: 'sukanya-samriddhi-yojana', title: 'Sukanya Samriddhi Yojana', category: 'finance', icon: '👧', tagline: 'Savings scheme for girl child', provider: 'Ministry of Finance', fee: 'Min ₹250/year', estimatedTime: '1-2 days', difficulty: 'easy', popularity: 82, tags: ['savings', 'girl', 'investment'] },
  { id: 'sc15', slug: 'pradhan-mantri-jan-dhan-yojana', title: 'PM Jan Dhan Yojana', category: 'finance', icon: '🏦', tagline: 'Zero-balance bank account + benefits', provider: 'Ministry of Finance', fee: 'Free', estimatedTime: '1 day', difficulty: 'easy', popularity: 85, tags: ['bank', 'account', 'financial inclusion'] },
  { id: 'sc16', slug: 'atal-pension-yojana', title: 'Atal Pension Yojana', category: 'finance', icon: '🧓', tagline: 'Guaranteed pension after 60', provider: 'PFRDA', fee: '₹42-1454/month', estimatedTime: '1-2 days', difficulty: 'easy', popularity: 78, tags: ['pension', 'retirement'] },
  { id: 'sc17', slug: 'pm-mudra-yojana-loan', title: 'PM MUDRA Yojana Loan', category: 'finance', icon: '💸', tagline: 'Collateral-free loans up to ₹10 lakh', provider: 'MUDRA / Banks', fee: 'Varies', estimatedTime: '7-15 days', difficulty: 'moderate', popularity: 80, tags: ['loan', 'mudra', 'business'] },
  { id: 'sc18', slug: 'gst-registration', title: 'GST Registration', category: 'finance', icon: '🧾', tagline: 'Register for Goods & Services Tax', provider: 'GSTN', fee: 'Free', estimatedTime: '3-7 days', difficulty: 'moderate', popularity: 75, tags: ['gst', 'tax', 'business'] },

  // ===== EDUCATION =====
  { id: 'sc19', slug: 'pm-vidyalakshmi-scholarship', title: 'PM Vidyalakshmi Scholarship', category: 'education', icon: '🎓', tagline: 'Central scholarship for higher education', provider: 'Ministry of Education', fee: 'Free', estimatedTime: '7-10 days', difficulty: 'moderate', popularity: 85, tags: ['scholarship', 'education'] },
  { id: 'sc20', slug: 'national-scholarship-portal', title: 'National Scholarship Portal', category: 'education', icon: '📚', tagline: 'One-stop for all central scholarships', provider: 'Ministry of Education', fee: 'Free', estimatedTime: '10-15 days', difficulty: 'moderate', popularity: 82, tags: ['scholarship', 'nsp'] },
  { id: 'sc21', slug: 'education-loan-application', title: 'Education Loan Application', category: 'education', icon: '🏫', tagline: 'Bank loans for higher studies', provider: 'Banks / Vidya Lakshmi', fee: 'Varies', estimatedTime: '15-30 days', difficulty: 'hard', popularity: 78, tags: ['loan', 'education', 'study'] },
  { id: 'sc22', slug: 'skill-india-nsdc-certification', title: 'Skill India / NSDC Certification', category: 'education', icon: '📜', tagline: 'Free skill training + certification', provider: 'NSDC', fee: 'Free', estimatedTime: '2-6 months', difficulty: 'easy', popularity: 75, tags: ['skill', 'training', 'nsdc'] },
  { id: 'sc23', slug: 'digital-india-free-courses', title: 'Digital India Free Courses', category: 'education', icon: '💻', tagline: 'Free digital literacy & IT courses', provider: 'MeitY', fee: 'Free', estimatedTime: 'Self-paced', difficulty: 'easy', popularity: 70, tags: ['digital', 'courses', 'free'] },

  // ===== WELFARE =====
  { id: 'sc24', slug: 'pm-kisan-samman-nidhi', title: 'PM Kisan Samman Nidhi', category: 'welfare', icon: '🌾', tagline: '₹6000/year direct income support', provider: 'Ministry of Agriculture', fee: 'Free', estimatedTime: '2-3 days', difficulty: 'easy', popularity: 92, tags: ['farmer', 'income', 'kisan'] },
  { id: 'sc25', slug: 'ujjwala-yojana-lpg-connection', title: 'Ujjwala Yojana LPG Connection', category: 'welfare', icon: '🔥', tagline: 'Free LPG connection for BPL families', provider: 'MoPNG', fee: 'Free', estimatedTime: '1 week', difficulty: 'easy', popularity: 80, tags: ['lpg', 'gas', 'welfare'] },
  { id: 'sc26', slug: 'one-nation-one-ration-card', title: 'One Nation One Ration Card', category: 'welfare', icon: '🍛', tagline: 'Get ration from any FPS in India', provider: 'Dept of Food', fee: 'Free', estimatedTime: 'Instant', difficulty: 'easy', popularity: 78, tags: ['ration', 'food', 'pds'] },
  { id: 'sc27', slug: 'pm-awas-yojana-gramin', title: 'PM Awas Yojana (Gramin)', category: 'welfare', icon: '🏡', tagline: 'Housing for rural poor - ₹1.2L grant', provider: 'MoRD', fee: 'Free', estimatedTime: '30-90 days', difficulty: 'moderate', popularity: 85, tags: ['housing', 'rural', 'pmay'] },
  { id: 'sc28', slug: 'pm-awas-yojana-urban', title: 'PM Awas Yojana (Urban)', category: 'welfare', icon: '🏢', tagline: 'Affordable housing subsidy for urban poor', provider: 'MoHUA', fee: 'Free', estimatedTime: '30-90 days', difficulty: 'moderate', popularity: 83, tags: ['housing', 'urban', 'pmay'] },
  { id: 'sc29', slug: 'old-age-pension-scheme', title: 'Old Age Pension Scheme', category: 'welfare', icon: '👴', tagline: 'Monthly pension for senior citizens', provider: 'State Govt', fee: 'Free', estimatedTime: '15-30 days', difficulty: 'easy', popularity: 75, tags: ['pension', 'senior', 'welfare'] },
  { id: 'sc30', slug: 'widow-pension-scheme', title: 'Widow Pension Scheme', category: 'welfare', icon: '🤲', tagline: 'Financial support for widows', provider: 'State Govt', fee: 'Free', estimatedTime: '15-30 days', difficulty: 'easy', popularity: 70, tags: ['pension', 'women', 'welfare'] },

  // ===== HEALTH =====
  { id: 'sc31', slug: 'ayushman-bharat-health-card', title: 'Ayushman Bharat (PM-JAY)', category: 'health', icon: '🏥', tagline: '₹5 lakh free health insurance per family', provider: 'NHA', fee: 'Free', estimatedTime: '1-2 days', difficulty: 'easy', popularity: 90, tags: ['health', 'insurance', 'pmjay'] },
  { id: 'sc32', slug: 'janani-suraksha-yojana', title: 'Janani Suraksha Yojana', category: 'health', icon: '🤰', tagline: 'Safe motherhood financial assistance', provider: 'MoHFW', fee: 'Free', estimatedTime: '1-3 days', difficulty: 'easy', popularity: 72, tags: ['maternity', 'health', 'women'] },
  { id: 'sc33', slug: 'pm-jan-aushadhi-kendra', title: 'PM Jan Aushadhi Kendra', category: 'health', icon: '💊', tagline: 'Generic medicines at affordable prices', provider: 'BPPI', fee: 'N/A', estimatedTime: 'Instant', difficulty: 'easy', popularity: 68, tags: ['medicine', 'generic', 'health'] },
  { id: 'sc34', slug: 'disability-certificate-udid', title: 'Disability Certificate (UDID)', category: 'health', icon: '♿', tagline: 'Unique disability ID for all benefits', provider: 'DEPwD', fee: 'Free', estimatedTime: '7-30 days', difficulty: 'moderate', popularity: 65, tags: ['disability', 'udid', 'certificate'] },

  // ===== EMPLOYMENT =====
  { id: 'sc35', slug: 'mgnrega-job-card', title: 'MGNREGA Job Card', category: 'employment', icon: '🔨', tagline: '100 days guaranteed employment', provider: 'MoRD', fee: 'Free', estimatedTime: '15-30 days', difficulty: 'easy', popularity: 82, tags: ['employment', 'rural', 'mgnrega'] },
  { id: 'sc36', slug: 'pm-rojgar-protsahan-yojana', title: 'PM Rojgar Protsahan Yojana', category: 'employment', icon: '💼', tagline: 'Employer EPF/EPS contribution by govt', provider: 'EPFO', fee: 'Free', estimatedTime: '7-15 days', difficulty: 'moderate', popularity: 65, tags: ['employment', 'epf', 'incentive'] },
  { id: 'sc37', slug: 'national-career-service-portal', title: 'National Career Service Portal', category: 'employment', icon: '🎯', tagline: 'Free job matching & career counseling', provider: 'Ministry of Labour', fee: 'Free', estimatedTime: '1 day', difficulty: 'easy', popularity: 70, tags: ['jobs', 'career', 'ncs'] },
  { id: 'sc38', slug: 'apprenticeship-registration', title: 'Apprenticeship Registration', category: 'employment', icon: '🛠️', tagline: 'Earn while you learn in companies', provider: 'MSDE', fee: 'Free', estimatedTime: '7-15 days', difficulty: 'easy', popularity: 68, tags: ['apprentice', 'training', 'jobs'] },

  // ===== BUSINESS & STARTUP =====
  { id: 'sc39', slug: 'startup-india-registration', title: 'Startup India Registration', category: 'business', icon: '🚀', tagline: 'DPIIT recognition + tax benefits', provider: 'DPIIT', fee: 'Free', estimatedTime: '2-5 days', difficulty: 'moderate', popularity: 78, tags: ['startup', 'dpiit', 'business'] },
  { id: 'sc40', slug: 'msme-udyam-registration', title: 'MSME Udyam Registration', category: 'business', icon: '🏭', tagline: 'Free MSME registration + benefits', provider: 'MoMSME', fee: 'Free', estimatedTime: '1-2 days', difficulty: 'easy', popularity: 80, tags: ['msme', 'udyam', 'business'] },
  { id: 'sc41', slug: 'startup-india-seed-fund', title: 'Startup India Seed Fund', category: 'business', icon: '🌱', tagline: 'Up to ₹20 lakh seed funding', provider: 'DPIIT', fee: 'Free', estimatedTime: '3-4 weeks', difficulty: 'hard', popularity: 72, tags: ['startup', 'funding', 'seed'] },
  { id: 'sc42', slug: 'standup-india-loan', title: 'Stand Up India Loan', category: 'business', icon: '🏗️', tagline: '₹10L-1Cr loan for SC/ST/Women', provider: 'SIDBI', fee: 'Varies', estimatedTime: '15-30 days', difficulty: 'hard', popularity: 65, tags: ['loan', 'sc', 'st', 'women'] },

  // ===== LEGAL & CERTIFICATES =====
  { id: 'sc43', slug: 'birth-certificate-application', title: 'Birth Certificate Application', category: 'legal', icon: '👶', tagline: 'Official birth registration document', provider: 'Municipal Corp', fee: 'Free-₹50', estimatedTime: '7-15 days', difficulty: 'easy', popularity: 85, tags: ['birth', 'certificate', 'registration'] },
  { id: 'sc44', slug: 'death-certificate-application', title: 'Death Certificate Application', category: 'legal', icon: '📋', tagline: 'Official death registration document', provider: 'Municipal Corp', fee: 'Free-₹50', estimatedTime: '7-15 days', difficulty: 'easy', popularity: 70, tags: ['death', 'certificate', 'registration'] },
  { id: 'sc45', slug: 'income-certificate-application', title: 'Income Certificate', category: 'legal', icon: '📄', tagline: 'Proof of annual family income', provider: 'District/Tehsil Office', fee: 'Free-₹30', estimatedTime: '7-15 days', difficulty: 'easy', popularity: 80, tags: ['income', 'certificate'] },
  { id: 'sc46', slug: 'caste-certificate-application', title: 'Caste Certificate (SC/ST/OBC)', category: 'legal', icon: '📑', tagline: 'Required for reservations & benefits', provider: 'District/Tehsil Office', fee: 'Free-₹30', estimatedTime: '7-30 days', difficulty: 'easy', popularity: 78, tags: ['caste', 'certificate', 'reservation'] },
  { id: 'sc47', slug: 'domicile-certificate-application', title: 'Domicile / Residence Certificate', category: 'legal', icon: '🏠', tagline: 'Proof of residence in a state', provider: 'District/Tehsil Office', fee: 'Free-₹30', estimatedTime: '7-15 days', difficulty: 'easy', popularity: 75, tags: ['domicile', 'residence', 'certificate'] },
];

// Update category counts
schemeCategories[0].count = allSchemes.length;
schemeCategories.forEach(cat => {
  if (cat.id !== 'all') {
    cat.count = allSchemes.filter(s => s.category === cat.id).length;
  }
});
