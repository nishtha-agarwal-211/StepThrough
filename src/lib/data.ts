import {
  Opportunity, Journey, Document, NextAction,
  OnboardingQuestion, Achievement, DashboardStats, UserProfile
} from './types';

// ============================================
// MOCK USER PROFILE
// ============================================
export const mockUser: UserProfile = {
  id: 'u1',
  name: 'Arjun Sharma',
  age: 21,
  income: 180000,
  education: 'B.Tech (2nd Year)',
  location: 'Lucknow, Uttar Pradesh',
  category: 'student',
  careerGoals: ['Software Engineer', 'Higher Studies'],
  needs: ['scholarship', 'training'],
  documents: ['aadhaar', 'pan', 'marksheet_10', 'marksheet_12'],
  digitalLiteracyLevel: 'intermediate',
  onboardingCompleted: true,
  createdAt: '2025-11-15',
};

// ============================================
// OPPORTUNITIES
// ============================================
export const opportunities: Opportunity[] = [
  {
    id: 'opp1',
    title: 'PM Vidyalakshmi Scholarship',
    description: 'Central government scholarship for economically weaker students pursuing higher education. Covers tuition fees up to ₹2,00,000 per year.',
    type: 'scholarship',
    provider: 'Ministry of Education, GOI',
    benefit: '₹2,00,000/year tuition + ₹50,000 maintenance',
    eligibility: ['Age 18–30', 'Family income < ₹4,50,000/year', 'Enrolled in recognized institution', 'Min 60% in previous exam'],
    requiredDocuments: ['Aadhaar Card', 'Income Certificate', '10th Marksheet', '12th Marksheet', 'College Enrollment Proof', 'Bank Passbook'],
    deadline: '2026-06-30',
    difficulty: 'moderate',
    estimatedTime: '7–10 days',
    successRate: 78,
    matchScore: 94,
    urgency: 'high',
    tags: ['scholarship', 'education', 'central_govt'],
    portalUrl: 'https://vidyalakshmi.co.in',
    icon: '🎓',
    color: '#6366f1',
    steps: [
      { id: 's1', title: 'Obtain Income Certificate', description: 'Get a valid income certificate from your district office or CSC center. Must show annual family income below ₹4,50,000.', estimatedTime: '3–5 days', difficulty: 'moderate', requiredDocuments: ['Aadhaar Card', 'Ration Card'], tips: ['Apply online via e-District portal for faster processing', 'Keep self-attested copies ready'], warnings: ['Certificate must be from current financial year'], status: 'completed', order: 1 },
      { id: 's2', title: 'Verify Eligibility Online', description: 'Visit the Vidyalakshmi portal and use the eligibility checker to confirm you qualify.', estimatedTime: '15 minutes', difficulty: 'easy', requiredDocuments: [], tips: ['Use Chrome or Firefox for best experience'], warnings: [], status: 'completed', order: 2 },
      { id: 's3', title: 'Register on Portal', description: 'Create your student account on vidyalakshmi.co.in using Aadhaar-linked mobile number.', estimatedTime: '20 minutes', difficulty: 'easy', requiredDocuments: ['Aadhaar Card'], tips: ['Keep OTP-enabled phone handy'], warnings: ['Use the same email for all communications'], status: 'in_progress', order: 3 },
      { id: 's4', title: 'Fill Application Form', description: 'Complete the detailed scholarship application with personal, academic, and financial details.', estimatedTime: '45 minutes', difficulty: 'moderate', requiredDocuments: ['Income Certificate', '10th Marksheet', '12th Marksheet'], tips: ['Save draft frequently', 'Double-check all entries'], warnings: ['Incorrect information leads to rejection'], status: 'available', order: 4 },
      { id: 's5', title: 'Upload Documents', description: 'Scan and upload all required documents in prescribed format (PDF, max 2MB each).', estimatedTime: '30 minutes', difficulty: 'easy', requiredDocuments: ['All listed documents'], tips: ['Use CamScanner for clean scans', 'Name files clearly'], warnings: ['Blurry scans will be rejected'], status: 'locked', order: 5 },
      { id: 's6', title: 'Submit & Track', description: 'Final submission and download acknowledgement receipt. Track status via portal dashboard.', estimatedTime: '10 minutes', difficulty: 'easy', requiredDocuments: [], tips: ['Save application ID safely'], warnings: ['Cannot edit after submission'], status: 'locked', order: 6 },
    ],
  },
  {
    id: 'opp2',
    title: 'Startup India Seed Fund',
    description: 'Financial assistance for startups at ideation and proof-of-concept stage. Provides up to ₹20 lakh for validation.',
    type: 'startup_support',
    provider: 'DPIIT, Ministry of Commerce',
    benefit: 'Up to ₹20,00,000 seed funding',
    eligibility: ['DPIIT registered startup', 'Incorporated < 2 years', 'Not received > ₹10L government funding'],
    requiredDocuments: ['DPIIT Certificate', 'Incorporation Certificate', 'PAN Card', 'Business Plan', 'Bank Account Details'],
    deadline: '2026-08-15',
    difficulty: 'hard',
    estimatedTime: '3–4 weeks',
    successRate: 42,
    matchScore: 67,
    urgency: 'medium',
    tags: ['startup', 'funding', 'central_govt'],
    icon: '🚀',
    color: '#8b5cf6',
    steps: [
      { id: 's1', title: 'Get DPIIT Recognition', description: 'Register as a startup on the Startup India portal.', estimatedTime: '1 week', difficulty: 'moderate', requiredDocuments: ['Incorporation Certificate', 'PAN Card'], tips: ['Prepare a crisp business description'], warnings: ['Approval may take 5–7 working days'], status: 'available', order: 1 },
      { id: 's2', title: 'Prepare Business Plan', description: 'Create a detailed business plan with market analysis and revenue model.', estimatedTime: '1 week', difficulty: 'hard', requiredDocuments: [], tips: ['Use Startup India template'], warnings: [], status: 'locked', order: 2 },
      { id: 's3', title: 'Apply via Incubator', description: 'Apply through an approved incubator for seed fund allocation.', estimatedTime: '2 weeks', difficulty: 'hard', requiredDocuments: ['DPIIT Certificate', 'Business Plan'], tips: ['Choose incubator in your domain'], warnings: ['Limited slots available'], status: 'locked', order: 3 },
    ],
  },
  {
    id: 'opp3',
    title: 'PM Kisan Samman Nidhi',
    description: 'Direct income support of ₹6,000 per year to all landholding farmer families across India.',
    type: 'government_scheme',
    provider: 'Ministry of Agriculture',
    benefit: '₹6,000/year in 3 installments',
    eligibility: ['Landholding farmer family', 'Valid Aadhaar', 'Active bank account'],
    requiredDocuments: ['Aadhaar Card', 'Land Records', 'Bank Passbook'],
    difficulty: 'easy',
    estimatedTime: '2–3 days',
    successRate: 92,
    matchScore: 45,
    urgency: 'low',
    tags: ['farmer', 'income_support', 'central_govt'],
    icon: '🌾',
    color: '#34d399',
    steps: [
      { id: 's1', title: 'Visit Local CSC/Patwari', description: 'Visit your nearest Common Service Center or Patwari office.', estimatedTime: '1 day', difficulty: 'easy', requiredDocuments: ['Aadhaar Card', 'Land Records'], tips: ['Go early morning to avoid crowds'], warnings: [], status: 'available', order: 1 },
      { id: 's2', title: 'Submit Application', description: 'Fill form and submit with documents.', estimatedTime: '30 minutes', difficulty: 'easy', requiredDocuments: ['Bank Passbook'], tips: ['Ensure Aadhaar linked to bank'], warnings: [], status: 'locked', order: 2 },
    ],
  },
  {
    id: 'opp4',
    title: 'National Skill Development Certificate',
    description: 'Free skill certification under NSDC-approved programs. Covers IT, manufacturing, healthcare and 40+ sectors.',
    type: 'training',
    provider: 'NSDC / Skill India',
    benefit: 'Free certification + placement assistance',
    eligibility: ['Age 18–35', 'Class 10 pass', 'Indian citizen'],
    requiredDocuments: ['Aadhaar Card', '10th Marksheet', 'Passport Photo'],
    difficulty: 'easy',
    estimatedTime: '2–6 months',
    successRate: 85,
    matchScore: 88,
    urgency: 'medium',
    tags: ['skill', 'training', 'certificate', 'employment'],
    icon: '📜',
    color: '#22d3ee',
    steps: [
      { id: 's1', title: 'Browse Skill Courses', description: 'Visit Skill India portal and explore courses relevant to your interest.', estimatedTime: '1 hour', difficulty: 'easy', requiredDocuments: [], tips: ['Filter by your district for nearby centers'], warnings: [], status: 'available', order: 1 },
      { id: 's2', title: 'Register & Enroll', description: 'Register on portal and enroll in chosen program.', estimatedTime: '30 minutes', difficulty: 'easy', requiredDocuments: ['Aadhaar Card', '10th Marksheet'], tips: ['Check batch start dates'], warnings: [], status: 'locked', order: 2 },
      { id: 's3', title: 'Complete Training', description: 'Attend training sessions and complete required hours.', estimatedTime: '2–6 months', difficulty: 'moderate', requiredDocuments: [], tips: ['Maintain 80% attendance'], warnings: ['Low attendance = disqualification'], status: 'locked', order: 3 },
      { id: 's4', title: 'Take Assessment', description: 'Appear for SSC assessment exam.', estimatedTime: '1 day', difficulty: 'moderate', requiredDocuments: ['ID Proof'], tips: ['Revise practical modules'], warnings: [], status: 'locked', order: 4 },
    ],
  },
  {
    id: 'opp5',
    title: 'Ayushman Bharat Health Card',
    description: 'Get free health insurance coverage of ₹5 lakh per family per year under PM-JAY for hospitalization expenses.',
    type: 'healthcare',
    provider: 'National Health Authority',
    benefit: '₹5,00,000 health cover per family/year',
    eligibility: ['SECC 2011 listed family', 'BPL category', 'No existing health insurance'],
    requiredDocuments: ['Aadhaar Card', 'Ration Card', 'Family ID'],
    difficulty: 'easy',
    estimatedTime: '1–2 days',
    successRate: 90,
    matchScore: 72,
    urgency: 'high',
    tags: ['health', 'insurance', 'welfare', 'central_govt'],
    icon: '🏥',
    color: '#fb7185',
    steps: [
      { id: 's1', title: 'Check Eligibility', description: 'Visit mera.pmjay.gov.in and enter mobile or ration card number.', estimatedTime: '5 minutes', difficulty: 'easy', requiredDocuments: [], tips: ['Try both mobile and ration card'], warnings: [], status: 'available', order: 1 },
      { id: 's2', title: 'Visit Empanelled Hospital', description: 'Go to nearest Ayushman-empanelled hospital with documents.', estimatedTime: '2 hours', difficulty: 'easy', requiredDocuments: ['Aadhaar Card', 'Ration Card'], tips: ['Call hospital helpdesk beforehand'], warnings: [], status: 'locked', order: 2 },
    ],
  },
  {
    id: 'opp6',
    title: 'Ujjwala 2.0 LPG Connection',
    description: 'Free LPG connection for women from BPL families. Includes first refill and stove.',
    type: 'welfare',
    provider: 'Ministry of Petroleum',
    benefit: 'Free LPG connection + first refill + stove',
    eligibility: ['BPL family', 'Woman applicant', 'No existing LPG connection', 'Age 18+'],
    requiredDocuments: ['Aadhaar Card', 'BPL Certificate', 'Bank Passbook', 'Passport Photo'],
    difficulty: 'easy',
    estimatedTime: '1 week',
    successRate: 88,
    matchScore: 35,
    urgency: 'low',
    tags: ['welfare', 'women', 'energy', 'central_govt'],
    icon: '🔥',
    color: '#fb923c',
    steps: [
      { id: 's1', title: 'Visit LPG Distributor', description: 'Visit your nearest LPG distributor with required documents.', estimatedTime: '1 day', difficulty: 'easy', requiredDocuments: ['Aadhaar Card', 'BPL Certificate'], tips: [], warnings: [], status: 'available', order: 1 },
      { id: 's2', title: 'Submit KYC', description: 'Complete KYC verification at the distributor.', estimatedTime: '30 minutes', difficulty: 'easy', requiredDocuments: ['Bank Passbook'], tips: [], warnings: [], status: 'locked', order: 2 },
    ],
  },
];

// ============================================
// ACTIVE JOURNEYS
// ============================================
export const activeJourneys: Journey[] = [
  {
    id: 'j1',
    opportunityId: 'opp1',
    opportunity: opportunities[0],
    status: 'in_progress',
    currentStepIndex: 2,
    completedSteps: 2,
    totalSteps: 6,
    startedAt: '2026-04-20',
    lastActivityAt: '2026-05-05',
    streakDays: 4,
    progress: 33,
  },
  {
    id: 'j2',
    opportunityId: 'opp4',
    opportunity: opportunities[3],
    status: 'in_progress',
    currentStepIndex: 0,
    completedSteps: 0,
    totalSteps: 4,
    startedAt: '2026-05-01',
    lastActivityAt: '2026-05-04',
    streakDays: 1,
    progress: 0,
  },
];

// ============================================
// DOCUMENTS
// ============================================
export const userDocuments: Document[] = [
  { id: 'd1', name: 'Aadhaar Card', type: 'identity', status: 'verified', icon: '🪪', required: true, uploadedAt: '2026-01-15' },
  { id: 'd2', name: 'PAN Card', type: 'identity', status: 'uploaded', icon: '💳', required: true, uploadedAt: '2026-02-10' },
  { id: 'd3', name: '10th Marksheet', type: 'academic', status: 'verified', icon: '📄', required: true, uploadedAt: '2026-01-20' },
  { id: 'd4', name: '12th Marksheet', type: 'academic', status: 'uploaded', icon: '📄', required: true, uploadedAt: '2026-03-05' },
  { id: 'd5', name: 'Income Certificate', type: 'financial', status: 'missing', icon: '📋', required: true },
  { id: 'd6', name: 'Caste Certificate', type: 'identity', status: 'missing', icon: '📋', required: false },
  { id: 'd7', name: 'Domicile Certificate', type: 'identity', status: 'missing', icon: '🏠', required: true },
  { id: 'd8', name: 'Bank Passbook', type: 'financial', status: 'verified', icon: '🏦', required: true, uploadedAt: '2026-01-25' },
  { id: 'd9', name: 'College Enrollment Proof', type: 'academic', status: 'missing', icon: '🎓', required: true },
  { id: 'd10', name: 'Passport Photo', type: 'identity', status: 'uploaded', icon: '📷', required: false, uploadedAt: '2026-04-01' },
];

// ============================================
// NEXT ACTIONS
// ============================================
export const nextActions: NextAction[] = [
  { id: 'na1', type: 'upload_document', title: 'Upload Income Certificate', description: 'Required for PM Vidyalakshmi Scholarship application. Visit your district e-Seva center.', urgency: 'high', relatedJourneyId: 'j1', icon: '📋', dueDate: '2026-05-15' },
  { id: 'na2', type: 'deadline_warning', title: 'Scholarship deadline in 55 days', description: 'PM Vidyalakshmi last date: June 30, 2026. Complete remaining steps soon.', urgency: 'medium', relatedJourneyId: 'j1', icon: '⏰' },
  { id: 'na3', type: 'complete_step', title: 'Complete Portal Registration', description: 'You\'re on Step 3 of your scholarship journey. Register on vidyalakshmi.co.in now.', urgency: 'high', relatedJourneyId: 'j1', icon: '✍️' },
  { id: 'na4', type: 'new_opportunity', title: 'New: NSDC Free Certification', description: 'Based on your profile, you qualify for free IT skill certification with placement support.', urgency: 'medium', relatedOpportunityId: 'opp4', icon: '✨' },
  { id: 'na5', type: 'resume_journey', title: 'Resume Skill Training Journey', description: 'You haven\'t made progress on your NSDC certification in 2 days.', urgency: 'low', relatedJourneyId: 'j2', icon: '▶️' },
];

// ============================================
// ONBOARDING QUESTIONS
// ============================================
export const onboardingQuestions: OnboardingQuestion[] = [
  { id: 'q1', question: 'Welcome! Let\'s understand who you are. Which describes you best?', type: 'single', options: [
    { value: 'student', label: 'Student', icon: '🎓' },
    { value: 'unemployed', label: 'Job Seeker', icon: '🔍' },
    { value: 'working_professional', label: 'Working Professional', icon: '💼' },
    { value: 'startup_founder', label: 'Startup Founder', icon: '🚀' },
    { value: 'farmer', label: 'Farmer', icon: '🌾' },
    { value: 'senior_citizen', label: 'Senior Citizen', icon: '👴' },
  ]},
  { id: 'q2', question: 'How old are you?', type: 'range', placeholder: 'Enter your age' },
  { id: 'q3', question: 'What is your highest education level?', type: 'single', options: [
    { value: 'below_10', label: 'Below 10th' },
    { value: '10th_pass', label: '10th Pass' },
    { value: '12th_pass', label: '12th Pass' },
    { value: 'graduate', label: 'Graduate' },
    { value: 'post_graduate', label: 'Post Graduate' },
    { value: 'doctorate', label: 'Doctorate' },
  ]},
  { id: 'q4', question: 'What\'s your annual family income?', type: 'single', options: [
    { value: 'below_1l', label: 'Below ₹1 Lakh' },
    { value: '1l_2.5l', label: '₹1–2.5 Lakh' },
    { value: '2.5l_5l', label: '₹2.5–5 Lakh' },
    { value: '5l_8l', label: '₹5–8 Lakh' },
    { value: 'above_8l', label: 'Above ₹8 Lakh' },
  ]},
  { id: 'q5', question: 'Where are you located?', type: 'location', placeholder: 'City, State' },
  { id: 'q6', question: 'What kind of support are you looking for?', type: 'multiple', options: [
    { value: 'scholarship', label: 'Scholarships & Education Aid', icon: '🎓' },
    { value: 'job', label: 'Job Opportunities', icon: '💼' },
    { value: 'training', label: 'Skill Training', icon: '📜' },
    { value: 'startup', label: 'Startup Funding', icon: '🚀' },
    { value: 'healthcare', label: 'Healthcare Benefits', icon: '🏥' },
    { value: 'welfare', label: 'Welfare Schemes', icon: '🏛️' },
    { value: 'housing', label: 'Housing Support', icon: '🏠' },
    { value: 'agriculture', label: 'Agriculture Support', icon: '🌾' },
  ]},
];

// ============================================
// ACHIEVEMENTS
// ============================================
export const achievements: Achievement[] = [
  { id: 'a1', title: 'First Step', description: 'Started your first journey', icon: '🚶', unlockedAt: '2026-04-20', progress: 1, total: 1 },
  { id: 'a2', title: 'Document Pro', description: 'Upload 5 documents', icon: '📂', progress: 4, total: 5 },
  { id: 'a3', title: 'Explorer', description: 'Discover 10 opportunities', icon: '🔭', progress: 6, total: 10 },
  { id: 'a4', title: 'Streak Master', description: 'Maintain a 7-day streak', icon: '🔥', progress: 4, total: 7 },
  { id: 'a5', title: 'Completionist', description: 'Complete your first journey', icon: '🏆', progress: 0, total: 1 },
];

// ============================================
// DASHBOARD STATS
// ============================================
export const dashboardStats: DashboardStats = {
  activeJourneys: 2,
  completedJourneys: 0,
  documentsUploaded: 5,
  totalDocuments: 10,
  matchedOpportunities: 6,
  streakDays: 4,
  nextDeadline: '2026-06-30',
  awarenessScore: 72,
};
