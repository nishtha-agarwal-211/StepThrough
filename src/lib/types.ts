// ============================================
// STEPTHROUGH — CORE TYPE DEFINITIONS
// ============================================

export type UserCategory =
  | 'student'
  | 'unemployed'
  | 'working_professional'
  | 'startup_founder'
  | 'rural_citizen'
  | 'low_income'
  | 'senior_citizen'
  | 'women'
  | 'disabled'
  | 'farmer';

export type OpportunityType =
  | 'scholarship'
  | 'government_scheme'
  | 'grant'
  | 'subsidy'
  | 'job'
  | 'training'
  | 'certificate'
  | 'welfare'
  | 'healthcare'
  | 'startup_support';

export type DifficultyLevel = 'easy' | 'moderate' | 'hard';
export type UrgencyLevel = 'low' | 'medium' | 'high' | 'critical';
export type StepStatus = 'locked' | 'available' | 'in_progress' | 'completed' | 'skipped';
export type JourneyStatus = 'not_started' | 'in_progress' | 'completed' | 'paused';

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  income: number;
  education: string;
  location: string;
  category: UserCategory;
  careerGoals: string[];
  needs: string[];
  documents: string[];
  digitalLiteracyLevel: 'beginner' | 'intermediate' | 'advanced';
  onboardingCompleted: boolean;
  createdAt: string;
}

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  type: OpportunityType;
  provider: string;
  benefit: string;
  eligibility: string[];
  requiredDocuments: string[];
  deadline?: string;
  difficulty: DifficultyLevel;
  estimatedTime: string;
  successRate: number;
  matchScore: number;
  urgency: UrgencyLevel;
  tags: string[];
  portalUrl?: string;
  steps: JourneyStep[];
  icon: string;
  color: string;
}

export interface JourneyStep {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  difficulty: DifficultyLevel;
  requiredDocuments: string[];
  tips: string[];
  warnings: string[];
  status: StepStatus;
  order: number;
}

export interface Journey {
  id: string;
  opportunityId: string;
  opportunity: Opportunity;
  status: JourneyStatus;
  currentStepIndex: number;
  completedSteps: number;
  totalSteps: number;
  startedAt: string;
  lastActivityAt: string;
  streakDays: number;
  progress: number;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  status: 'missing' | 'uploaded' | 'verified' | 'expired';
  expiryDate?: string;
  uploadedAt?: string;
  icon: string;
  required: boolean;
}

export interface NextAction {
  id: string;
  type: 'upload_document' | 'complete_step' | 'deadline_warning' | 'new_opportunity' | 'resume_journey';
  title: string;
  description: string;
  urgency: UrgencyLevel;
  relatedJourneyId?: string;
  relatedOpportunityId?: string;
  dueDate?: string;
  icon: string;
}

export interface OnboardingQuestion {
  id: string;
  question: string;
  type: 'single' | 'multiple' | 'text' | 'range' | 'location';
  options?: { value: string; label: string; icon?: string }[];
  placeholder?: string;
  dependsOn?: { questionId: string; values: string[] };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress: number;
  total: number;
}

export interface DashboardStats {
  activeJourneys: number;
  completedJourneys: number;
  documentsUploaded: number;
  totalDocuments: number;
  matchedOpportunities: number;
  streakDays: number;
  nextDeadline?: string;
  awarenessScore: number;
}
