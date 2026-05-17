'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { 
  ChevronLeft, CheckCircle2, Circle, Lock, Clock, 
  AlertTriangle, Lightbulb, FileText, ArrowRight,
  Sparkles, Zap, Award, Share2, Info
} from 'lucide-react';
import { getDifficultyLabel } from '@/lib/utils';

export default function JourneyView() {
  const { journeys, selectedJourneyId, setSelectedJourneyId, completeStep } = useAppStore();
  
  const journey = journeys.find(j => j.id === selectedJourneyId) || journeys[0];
  
  if (!journey) return null;

  const steps = journey.opportunity.steps;
  const currentStep = steps[journey.currentStepIndex];

  return (
    <div className="space-y-12 pb-24 animate-fade">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 border-b border-[var(--st-glass-border)] pb-10">
        <div className="flex items-start gap-6">
          <button 
            onClick={() => setSelectedJourneyId(null)}
            className="mt-1 p-2 rounded-lg border border-[var(--st-glass-border)] hover:bg-white hover:border-[var(--st-accent-primary)] transition-all text-[var(--st-text-muted)] hover:text-[var(--st-text-primary)] shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-2xl bg-white border border-[var(--st-glass-border)] shadow-sm">
                {journey.opportunity.icon}
              </div>
              <span className="text-[10px] font-bold text-[var(--st-accent-primary)] uppercase tracking-widest">Active Pathway</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-bold text-[var(--st-text-primary)] tracking-tight">{journey.opportunity.title}</h1>
            <p className="text-[var(--st-text-muted)] font-bold mt-1 opacity-60">{journey.opportunity.provider}</p>
          </div>
        </div>

        <div className="flex flex-col items-start sm:items-end gap-3">
          <div className="text-right">
            <p className="text-[10px] font-bold text-[var(--st-text-muted)] uppercase tracking-widest mb-1 opacity-60">Total Progression</p>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-[var(--st-text-primary)]">{journey.progress}%</span>
              <div className="w-32 h-1.5 bg-[var(--st-bg-dark)] rounded-full overflow-hidden border border-[var(--st-glass-border)]">
                <div className="h-full bg-[var(--st-accent-brand)]" style={{ width: `${journey.progress}%` }} />
              </div>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[var(--st-glass-border)] text-[10px] font-bold uppercase tracking-widest text-[var(--st-text-muted)] hover:text-[var(--st-text-primary)] hover:border-[var(--st-accent-primary)] transition-all shadow-sm">
             <Share2 className="w-3.5 h-3.5" /> Share Roadmap
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-16 items-start">
        {/* Simplified Roadmap List */}
        <div className="lg:col-span-4 space-y-6">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--st-text-muted)] px-1 opacity-60">Roadmap Sequence</h2>
          <div className="space-y-4">
            {steps.map((step, index) => {
              const isCompleted = index < journey.completedSteps;
              const isActive = index === journey.currentStepIndex;
              const isLocked = index > journey.completedSteps && !isActive;

              return (
                <div 
                  key={step.id}
                  className={`relative flex gap-4 p-4 rounded-xl transition-all
                    ${isActive ? 'bg-white border border-[var(--st-accent-brand)] shadow-md ring-1 ring-[var(--st-accent-brand)]/10' : 'bg-transparent border border-transparent'}
                    ${isLocked ? 'opacity-30' : ''}
                  `}
                >
                  <div className="flex flex-col items-center gap-2 shrink-0">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all
                      ${isCompleted ? 'bg-emerald-500 border-emerald-500' : 
                        isActive ? 'bg-white border-[var(--st-accent-brand)] shadow-sm' : 'bg-white border-[var(--st-glass-border)]'}
                    `}>
                      {isCompleted ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      ) : (
                        <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[var(--st-accent-brand)]' : 'bg-[var(--st-glass-border)]'}`} />
                      )}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-0.5 flex-1 rounded-full ${isCompleted ? 'bg-emerald-500/20' : 'bg-[var(--st-glass-border)]/50'}`} />
                    )}
                  </div>

                  <div className="flex-1 pb-4 min-w-0">
                    <h4 className={`text-sm font-bold truncate ${isActive ? 'text-[var(--st-text-primary)]' : 'text-[var(--st-text-muted)]'}`}>
                      {step.title}
                    </h4>
                    <p className="text-[10px] font-bold text-[var(--st-text-muted)] uppercase tracking-tight mt-1 opacity-60">
                      {isCompleted ? 'Completed' : isActive ? 'In Progress' : 'Upcoming'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Focused Step Detail */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="bg-white border border-[var(--st-glass-border)] rounded-[32px] p-5 sm:p-10 shadow-lg shadow-[var(--st-accent-brand)]/5 space-y-8 sm:space-y-10"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2.5 py-1 rounded-lg bg-[var(--st-accent-brand)]/10 border border-[var(--st-accent-brand)]/20 text-[var(--st-accent-brand)] text-[10px] font-bold uppercase tracking-[0.1em]">
                      Current Mission • Step {journey.currentStepIndex + 1}
                    </span>
                    <span className="flex items-center gap-1.5 text-[var(--st-text-muted)] text-[10px] font-bold uppercase tracking-[0.1em] opacity-60">
                      <Clock className="w-3.5 h-3.5" /> {currentStep.estimatedTime} Effort
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-3xl font-bold text-[var(--st-text-primary)] tracking-tight">{currentStep.title}</h2>
                </div>
              </div>

              <p className="text-[var(--st-text-secondary)] text-base sm:text-lg leading-relaxed max-w-3xl font-medium opacity-80">
                {currentStep.description}
              </p>

              {/* Requirement Checklist */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-[var(--st-text-primary)]">
                  <FileText className="w-5 h-5 text-[var(--st-accent-brand)]" />
                  <h3 className="text-base font-bold">Evidence Required</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentStep.requiredDocuments.map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-[var(--st-bg-dark)] border border-[var(--st-glass-border)] group hover:border-[var(--st-accent-primary)] transition-all shadow-sm">
                      <span className="text-xs font-bold text-[var(--st-text-secondary)] opacity-80">{doc}</span>
                      <div className="w-5 h-5 rounded-[6px] border-2 border-[var(--st-glass-border)] flex items-center justify-center bg-white shadow-inner">
                         {/* Checkmark placeholder */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Intelligence Box */}
              <div className="p-6 rounded-[24px] bg-[var(--st-accent-brand)]/5 border border-[var(--st-accent-brand)]/20 flex gap-4 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[var(--st-accent-brand)] flex items-center justify-center shrink-0 shadow-md">
                  <Info className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--st-text-primary)] mb-1">AI Logic Engine</h4>
                  <p className="text-[13px] text-[var(--st-text-secondary)] leading-relaxed font-medium opacity-70">
                    Our analysis shows that most successful applicants prepare their digital copies at least 48 hours before submission.
                  </p>
                </div>
              </div>

              <div className="pt-6 sm:pt-10 border-t border-[var(--st-glass-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
                <button className="text-[10px] font-bold uppercase tracking-widest text-[var(--st-text-muted)] hover:text-[var(--st-text-primary)] transition-colors opacity-60">
                  Need Help with this Step?
                </button>
                <button 
                  onClick={() => completeStep(journey.id, journey.currentStepIndex)}
                  className="btn-glass-primary py-3 px-8 text-[12px] font-bold uppercase tracking-[0.2em] h-14"
                >
                  Confirm Completion
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
