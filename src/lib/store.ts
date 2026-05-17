import { create } from 'zustand';
import {
  UserProfile, Journey, Document, NextAction,
  Opportunity, DashboardStats, Achievement
} from './types';
import {
  opportunities, activeJourneys, userDocuments,
  nextActions, dashboardStats, achievements
} from './data';

interface AppState {
  // User
  user: any | null; 
  setUser: (user: any) => void;
  logout: () => void;

  // Onboarding
  onboardingStep: number;
  onboardingAnswers: Record<string, any>;
  setOnboardingStep: (step: number) => void;
  setOnboardingAnswer: (questionId: string, answer: any) => void;
  completeOnboarding: () => Promise<void>;
  isOnboarded: boolean;

  // Navigation
  currentPage: 'landing' | 'onboarding' | 'dashboard' | 'explore' | 'journey' | 'documents' | 'assistant' | 'schemes';
  setCurrentPage: (page: AppState['currentPage']) => void;
  selectedOpportunityId: string | null;
  setSelectedOpportunityId: (id: string | null) => void;
  selectedJourneyId: string | null;
  setSelectedJourneyId: (id: string | null) => void;

  // Data
  opportunities: Opportunity[];
  journeys: Journey[];
  documents: Document[];
  nextActions: NextAction[];
  stats: DashboardStats;
  achievements: Achievement[];

  // Journey actions
  startJourney: (opportunityId: string) => void;
  completeStep: (journeyId: string, stepIndex: number) => void;

  // Document actions
  uploadDocument: (docId: string) => void;

  // UI state
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isAssistantOpen: boolean;
  toggleAssistant: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeFilter: string;
  setActiveFilter: (f: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // User
  user: null,
  setUser: (user) => {
    const hasQuizData = user?.quizData && Object.keys(user.quizData).length > 0;
    set({ 
      user, 
      isOnboarded: hasQuizData,
      currentPage: hasQuizData ? 'dashboard' : 'onboarding'
    });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, isOnboarded: false, currentPage: 'landing' });
  },

  // Onboarding
  onboardingStep: 0,
  onboardingAnswers: {},
  isOnboarded: false,
  setOnboardingStep: (step) => set({ onboardingStep: step }),
  setOnboardingAnswer: (questionId, answer) =>
    set((s) => ({ onboardingAnswers: { ...s.onboardingAnswers, [questionId]: answer } })),
  
  completeOnboarding: async () => {
    const { onboardingAnswers } = get();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:5001/api/user/quiz', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(onboardingAnswers),
      });

      const data = await response.json();
      if (data.success) {
        set((s) => ({ 
          user: { ...s.user, quizData: data.data },
          isOnboarded: true, 
          currentPage: 'dashboard' 
        }));
      }
    } catch (err) {
      console.error('Failed to save quiz data', err);
      // Fallback for UI demo if backend is not yet running
      set({ isOnboarded: true, currentPage: 'dashboard' });
    }
  },

  // Navigation
  currentPage: 'landing',
  setCurrentPage: (page) => set({ currentPage: page, selectedOpportunityId: null, selectedJourneyId: null }),
  selectedOpportunityId: null,
  setSelectedOpportunityId: (id) => set({ selectedOpportunityId: id }),
  selectedJourneyId: null,
  setSelectedJourneyId: (id) => set({ selectedJourneyId: id }),

  // Data
  opportunities,
  journeys: activeJourneys,
  documents: userDocuments,
  nextActions,
  stats: dashboardStats,
  achievements,

  // Journey actions
  startJourney: (opportunityId) => {
    const opp = get().opportunities.find((o) => o.id === opportunityId);
    if (!opp) return;
    const newJourney: Journey = {
      id: `j${Date.now()}`,
      opportunityId,
      opportunity: opp,
      status: 'in_progress',
      currentStepIndex: 0,
      completedSteps: 0,
      totalSteps: opp.steps.length,
      startedAt: new Date().toISOString(),
      lastActivityAt: new Date().toISOString(),
      streakDays: 1,
      progress: 0,
    };
    set((s) => ({
      journeys: [...s.journeys, newJourney],
      stats: { ...s.stats, activeJourneys: s.stats.activeJourneys + 1 },
    }));
  },

  completeStep: (journeyId, stepIndex) => {
    set((s) => ({
      journeys: s.journeys.map((j) => {
        if (j.id !== journeyId) return j;
        const newCompleted = stepIndex + 1;
        const newProgress = Math.round((newCompleted / j.totalSteps) * 100);
        const updatedSteps = j.opportunity.steps.map((step, i) => {
          if (i === stepIndex) return { ...step, status: 'completed' as const };
          if (i === stepIndex + 1) return { ...step, status: 'available' as const };
          return step;
        });
        return {
          ...j,
          completedSteps: newCompleted,
          currentStepIndex: Math.min(stepIndex + 1, j.totalSteps - 1),
          progress: newProgress,
          lastActivityAt: new Date().toISOString(),
          opportunity: { ...j.opportunity, steps: updatedSteps },
          status: newProgress === 100 ? 'completed' as const : 'in_progress' as const,
        };
      }),
    }));
  },

  // Document actions
  uploadDocument: (docId) => {
    set((s) => ({
      documents: s.documents.map((d) =>
        d.id === docId ? { ...d, status: 'uploaded', uploadedAt: new Date().toISOString() } : d
      ),
      stats: { ...s.stats, documentsUploaded: s.stats.documentsUploaded + 1 },
    }));
  },

  // UI state
  isSidebarOpen: true,
  toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
  isAssistantOpen: false,
  toggleAssistant: () => set((s) => ({ isAssistantOpen: !s.isAssistantOpen })),
  searchQuery: '',
  setSearchQuery: (q) => set({ searchQuery: q }),
  activeFilter: 'all',
  setActiveFilter: (f) => set({ activeFilter: f }),
}));
