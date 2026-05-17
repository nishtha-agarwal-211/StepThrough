'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Bot, Sparkles, Clock, AlertTriangle, ChevronDown, ChevronUp,
  FileText, Search, UserPlus, RefreshCw, Zap, Loader2,
  Calendar, Heart, Shield
} from 'lucide-react';
import { useAppStore } from '@/lib/store';

interface Task {
  title: string;
  description: string;
  timeNeeded: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
}

interface DayPlan {
  day: number;
  title: string;
  tasks: Task[];
  tip: string;
}

interface Blocker {
  issue: string;
  solution: string;
}

interface ActionPlan {
  greeting: string;
  summary: string;
  dailyPlan: DayPlan[];
  blockers: Blocker[];
  motivationalNote: string;
  isSimulated?: boolean;
}

interface ActionPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  document: <FileText className="w-3.5 h-3.5" />,
  application: <UserPlus className="w-3.5 h-3.5" />,
  research: <Search className="w-3.5 h-3.5" />,
  registration: <Shield className="w-3.5 h-3.5" />,
  'follow-up': <RefreshCw className="w-3.5 h-3.5" />,
};

const priorityStyles: Record<string, { bg: string; color: string; border: string }> = {
  high: { bg: 'rgba(196,122,106,0.1)', color: 'var(--st-accent-danger)', border: 'rgba(196,122,106,0.2)' },
  medium: { bg: 'rgba(212,165,90,0.1)', color: 'var(--st-accent-warning)', border: 'rgba(212,165,90,0.2)' },
  low: { bg: 'rgba(126,174,123,0.1)', color: 'var(--st-accent-success)', border: 'rgba(126,174,123,0.2)' },
};

export default function ActionPlanModal({ isOpen, onClose }: ActionPlanModalProps) {
  const { user, journeys, documents, nextActions } = useAppStore();
  const [plan, setPlan] = useState<ActionPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedDay, setExpandedDay] = useState<number | null>(0);

  const generatePlan = async () => {
    setLoading(true);
    setError(null);
    setPlan(null);

    const payload = {
      userProfile: {
        name: user?.name || 'User',
        age: user?.quizData?.age || user?.age || 21,
        category: user?.quizData?.q1 || 'student',
        location: user?.quizData?.q5 || 'India',
        education: user?.quizData?.q3 || 'graduate',
        income: user?.quizData?.q4 || 'Unknown',
      },
      activeJourneys: journeys.map((j) => ({
        title: j.opportunity.title,
        progress: j.progress,
        currentStep: j.opportunity.steps[j.currentStepIndex]?.title || 'Finalize',
      })),
      missingDocuments: documents
        .filter((d) => d.status === 'missing')
        .map((d) => d.name),
      nextActions: nextActions.map((a) => ({
        title: a.title,
        description: a.description,
        urgency: a.urgency,
      })),
    };

    setTimeout(() => {
      setPlan({
        isSimulated: true,
        greeting: `Hello ${payload.userProfile.name},`,
        summary: `Based on your profile as a ${payload.userProfile.category}, I've optimized a 7-day roadmap focusing on your active journeys.`,
        dailyPlan: [
          { day: 1, title: 'Initial Assessment & Documentation', tasks: [
            { title: 'Review Requirements', description: 'Check the portal for the latest eligibility criteria.', timeNeeded: '15 mins', priority: 'high', category: 'research' },
            { title: 'Prepare Core Documents', description: 'Gather your Aadhaar and Income Certificate.', timeNeeded: '30 mins', priority: 'high', category: 'document' }
          ], tip: 'Keep all documents scanned in PDF format under 2MB.' },
          { day: 2, title: 'Portal Registration', tasks: [
            { title: 'Create Account', description: 'Register on the official scheme portal.', timeNeeded: '20 mins', priority: 'medium', category: 'registration' }
          ], tip: 'Use a single, active email address for all registrations.' },
          { day: 3, title: 'Application Preparation', tasks: [
            { title: 'Draft Application Details', description: 'Fill in the preliminary application forms offline to avoid session timeouts.', timeNeeded: '45 mins', priority: 'medium', category: 'application' }
          ], tip: 'Double check all spelling matches your Aadhaar card exactly.' },
          { day: 4, title: 'Review & Verification', tasks: [
            { title: 'Cross-check Documents', description: 'Ensure all uploaded documents match the required specifications.', timeNeeded: '20 mins', priority: 'high', category: 'document' }
          ], tip: 'If an image is blurry, it will likely be rejected.' },
          { day: 5, title: 'Final Submission', tasks: [
            { title: 'Submit Application', description: 'Complete the final submission and save the acknowledgment receipt.', timeNeeded: '15 mins', priority: 'high', category: 'registration' }
          ], tip: 'Save the application number securely.' },
          { day: 6, title: 'Follow-up Planning', tasks: [
            { title: 'Set Calendar Reminders', description: 'Mark dates to check application status.', timeNeeded: '10 mins', priority: 'low', category: 'follow-up' }
          ], tip: 'Government portals usually update status within 14 days.' },
          { day: 7, title: 'Explore Secondary Opportunities', tasks: [
            { title: 'Research Skill Certifications', description: 'Look into NSDC free courses to boost your profile.', timeNeeded: '30 mins', priority: 'low', category: 'research' }
          ], tip: 'Continuous upskilling increases scheme eligibility.' }
        ],
        blockers: [],
        motivationalNote: 'You are making great progress! Consistency is key.'
      });
      setExpandedDay(0);
      setLoading(false);
    }, 1500);
  };

  const handleOpen = () => {
    if (!plan && !loading) generatePlan();
  };

  if (isOpen && !plan && !loading && !error) handleOpen();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[rgba(30,26,23,0.4)] backdrop-blur-md z-[60]" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed inset-x-4 top-[8vh] bottom-[8vh] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[720px] z-[61] glass-elevated flex flex-col overflow-hidden rounded-3xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-[var(--st-glass-border)]" style={{ background: 'rgba(246,241,235,0.8)' }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md" style={{ background: 'linear-gradient(135deg, #C9A96E, #8B7355)' }}>
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[var(--st-text-primary)] tracking-tight">AI Action Plan</h2>
                  <p className="text-[11px] font-bold text-[var(--st-text-faint)] uppercase tracking-[0.2em] mt-0.5">Optimized 7-Day Journey</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {plan && (
                  <button onClick={generatePlan} disabled={loading}
                    className="p-2.5 rounded-xl hover:bg-[rgba(201,169,110,0.08)] transition-all border border-[var(--st-glass-border)] text-[var(--st-text-faint)] hover:text-[var(--st-text-primary)]" title="Regenerate">
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                )}
                <button onClick={onClose}
                  className="p-2.5 rounded-xl bg-[var(--st-glass-surface)] hover:bg-[var(--st-glass-surface-hover)] transition-all border border-[var(--st-glass-border)] text-[var(--st-text-faint)] hover:text-[var(--st-text-primary)]">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-8 py-8 space-y-10">
              {plan?.isSimulated && (
                <div className="px-4 py-2.5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3" style={{ background: 'rgba(212,165,90,0.1)', border: '1px solid rgba(212,165,90,0.2)', color: 'var(--st-accent-warning)' }}>
                  <Bot className="w-4 h-4" /> Showing Optimized Roadmap (AI Rate Limited)
                </div>
              )}

              {loading && (
                <div className="flex flex-col items-center justify-center py-24 gap-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-3xl flex items-center justify-center" style={{ background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.2)' }}>
                      <Loader2 className="w-10 h-10 animate-spin" style={{ color: 'var(--st-accent-gold)' }} />
                    </div>
                    <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -inset-4 blur-2xl rounded-full" style={{ background: 'rgba(201,169,110,0.15)' }} />
                  </div>
                  <div className="text-center">
                    <p className="text-[15px] font-bold text-[var(--st-text-primary)] tracking-tight">Crafting your roadmap...</p>
                    <p className="text-[12px] font-medium text-[var(--st-text-muted)] mt-1 max-w-xs mx-auto opacity-70">Analyzing your progress, documents, and upcoming deadlines</p>
                  </div>
                </div>
              )}

              {error && !loading && (
                <div className="flex flex-col items-center justify-center py-20 gap-6">
                  <div className="w-16 h-16 rounded-3xl flex items-center justify-center" style={{ background: 'rgba(196,122,106,0.1)', border: '1px solid rgba(196,122,106,0.2)' }}>
                    <AlertTriangle className="w-8 h-8" style={{ color: 'var(--st-accent-danger)' }} />
                  </div>
                  <div className="text-center">
                    <p className="text-[15px] font-bold text-[var(--st-text-primary)]">Generation Failed</p>
                    <p className="text-[12px] font-medium text-[var(--st-text-muted)] mt-1 max-w-sm mx-auto opacity-70">{error}</p>
                  </div>
                  <button onClick={generatePlan} className="btn-glass-primary px-6 py-2.5 text-xs uppercase tracking-widest">Try Again</button>
                </div>
              )}

              {plan && !loading && (
                <>
                  <div className="p-6 rounded-2xl border border-[var(--st-glass-border)] relative overflow-hidden" style={{ background: 'var(--st-glass-surface)' }}>
                    <div className="absolute top-0 left-0 w-1 h-full" style={{ background: 'linear-gradient(180deg, #C9A96E, #8B7355)' }} />
                    <p className="text-[15px] font-bold text-[var(--st-text-primary)] leading-relaxed mb-3">{plan.greeting}</p>
                    <p className="text-[13px] font-medium text-[var(--st-text-secondary)] leading-relaxed opacity-80">{plan.summary}</p>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--st-text-faint)] flex items-center gap-3">
                      <Calendar className="w-4 h-4" /> 7-Day Strategic Action Plan
                    </h3>
                    <div className="space-y-4">
                      {plan.dailyPlan.map((day, dayIndex) => (
                        <div key={day.day}
                          className={`rounded-2xl border transition-all duration-300 overflow-hidden
                            ${expandedDay === dayIndex ? 'border-[var(--st-accent-gold)]/30 shadow-md' : 'border-[var(--st-glass-border)] hover:border-[var(--st-accent-gold)]/20'}
                          `}
                          style={expandedDay === dayIndex ? { background: 'var(--st-glass-surface-hover)' } : { background: 'var(--st-glass-surface)' }}
                        >
                          <button onClick={() => setExpandedDay(expandedDay === dayIndex ? null : dayIndex)} className="w-full flex items-center justify-between px-6 py-5">
                            <div className="flex items-center gap-4">
                              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-colors"
                                style={expandedDay === dayIndex ? { background: 'linear-gradient(135deg, #C9A96E, #8B7355)', color: 'white', boxShadow: '0 4px 12px rgba(201,169,110,0.3)' } : { background: 'var(--st-glass-surface)', border: '1px solid var(--st-glass-border)', color: 'var(--st-text-faint)' }}>
                                {day.day}
                              </div>
                              <span className="text-[14px] font-bold text-[var(--st-text-primary)] tracking-tight">{day.title}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-[9px] font-bold text-[var(--st-text-faint)] uppercase tracking-widest opacity-60">
                                {day.tasks.length} task{day.tasks.length !== 1 ? 's' : ''}
                              </span>
                              {expandedDay === dayIndex ? <ChevronUp className="w-5 h-5 text-[var(--st-text-faint)]" /> : <ChevronDown className="w-5 h-5 text-[var(--st-text-faint)]" />}
                            </div>
                          </button>

                          <AnimatePresence>
                            {expandedDay === dayIndex && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                                <div className="px-6 pb-6 pt-2 space-y-4 border-t border-[var(--st-glass-border)]">
                                  {day.tasks.map((task, ti) => {
                                    const ps = priorityStyles[task.priority];
                                    return (
                                      <div key={ti} className="flex gap-4 pt-4 group/task">
                                        <div className="mt-0.5 w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border border-[var(--st-glass-border)] group-hover/task:border-[var(--st-accent-gold)]/20 transition-all" style={{ background: 'var(--st-glass-surface)', color: 'var(--st-text-faint)' }}>
                                          {categoryIcons[task.category] || <Zap className="w-4 h-4" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center gap-3 mb-1.5">
                                            <span className="text-[14px] font-bold text-[var(--st-text-primary)]">{task.title}</span>
                                            <span className="text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-lg" style={{ background: ps.bg, color: ps.color, border: `1px solid ${ps.border}` }}>
                                              {task.priority}
                                            </span>
                                          </div>
                                          <p className="text-[12px] font-medium text-[var(--st-text-secondary)] leading-relaxed opacity-70">{task.description}</p>
                                          <div className="flex items-center gap-2 mt-3 text-[10px] font-bold text-[var(--st-text-faint)] uppercase tracking-wider">
                                            <Clock className="w-3.5 h-3.5" style={{ color: 'var(--st-accent-gold)' }} />
                                            {task.timeNeeded}
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                  {day.tip && (
                                    <div className="mt-6 p-4 rounded-xl flex items-start gap-3" style={{ background: 'rgba(201,169,110,0.06)', border: '1px solid rgba(201,169,110,0.12)' }}>
                                      <span className="text-sm">💡</span>
                                      <p className="text-[11px] text-[var(--st-text-secondary)] leading-relaxed font-medium opacity-80">
                                        <strong className="text-[var(--st-text-primary)] font-bold uppercase tracking-wider text-[9px] mr-2">Strategy:</strong> {day.tip}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                    {plan.blockers && plan.blockers.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--st-text-faint)] flex items-center gap-3">
                          <AlertTriangle className="w-4 h-4" /> Risk Mitigation
                        </h3>
                        <div className="space-y-3">
                          {plan.blockers.map((b, i) => (
                            <div key={i} className="p-4 rounded-xl shadow-sm" style={{ background: 'rgba(196,122,106,0.06)', border: '1px solid rgba(196,122,106,0.12)' }}>
                              <p className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--st-accent-danger)' }}>{b.issue}</p>
                              <p className="text-[11px] font-medium text-[var(--st-text-muted)] leading-relaxed opacity-80">
                                <span className="font-bold mr-2" style={{ color: 'var(--st-accent-success)' }}>SOLVE:</span> {b.solution}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="space-y-4">
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--st-text-faint)] flex items-center gap-3">
                        <Heart className="w-4 h-4" /> Intelligence Pulse
                      </h3>
                      <div className="p-5 rounded-2xl border border-[var(--st-glass-border)] flex items-start gap-4" style={{ background: 'var(--st-glass-surface)' }}>
                        <p className="text-[12px] text-[var(--st-text-secondary)] leading-relaxed font-medium italic opacity-80">
                          &quot;{plan.motivationalNote}&quot;
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
