'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { ChevronLeft, CheckCircle2, Circle, Lock, Clock, AlertTriangle, Lightbulb, FileText, ArrowRight, Sparkles, Zap, Award, Share2, Info } from 'lucide-react';
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
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 border-b border-[var(--st-glass-border)] pb-8 bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-start gap-6">
          <button onClick={() => setSelectedJourneyId(null)}
            className="mt-1 p-2 rounded-lg border border-[var(--st-glass-border-strong)] hover:bg-[var(--st-bg-blue-tint)] hover:border-[var(--st-accent-gold)]/40 transition-all text-[var(--st-text-faint)] hover:text-[var(--st-text-primary)] shadow-sm cursor-pointer">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-2xl border border-[var(--st-glass-border)] shadow-sm bg-[var(--st-bg-blue-tint)]">
                {journey.opportunity.icon}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--st-accent-mocha)]">Active Pathway</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[var(--st-text-primary)] tracking-tight leading-tight">{journey.opportunity.title}</h1>
            <p className="text-[var(--st-text-faint)] font-bold mt-1 opacity-80 text-xs uppercase tracking-wide">{journey.opportunity.provider}</p>
          </div>
        </div>
        <div className="flex flex-col items-start sm:items-end gap-3 shrink-0">
          <div className="text-left sm:text-right">
            <p className="text-[9px] font-bold text-[var(--st-text-faint)] uppercase tracking-widest mb-1 opacity-80">Total Progression</p>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black text-[var(--st-text-primary)]">{journey.progress}%</span>
              <div className="w-32 h-1.5 rounded-full overflow-hidden border border-[var(--st-glass-border)] bg-slate-100">
                <div className="h-full rounded-full" style={{ width: `${journey.progress}%`, background: 'var(--st-gradient-gold)' }} />
              </div>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--st-glass-border-strong)] text-[10px] font-bold uppercase tracking-widest text-[var(--st-text-secondary)] hover:text-[var(--st-text-primary)] hover:border-[var(--st-accent-gold)]/40 transition-all shadow-sm bg-white cursor-pointer">
            <Share2 className="w-3.5 h-3.5 text-[var(--st-accent-gold)]" /> Share Roadmap
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Roadmap List */}
        <div className="lg:col-span-4 space-y-4 bg-white p-6 rounded-xl border border-[var(--st-glass-border)] shadow-sm">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--st-text-faint)] px-1 opacity-80">Roadmap Sequence</h2>
          <div className="space-y-2">
            {steps.map((step, index) => {
              const isCompleted = index < journey.completedSteps;
              const isActive = index === journey.currentStepIndex;
              const isLocked = index > journey.completedSteps && !isActive;
              return (
                <div key={step.id}
                  className={`relative flex gap-4 p-3 rounded-lg transition-all ${isLocked ? 'opacity-30' : ''}`}
                  style={isActive ? { background: 'var(--st-bg-blue-tint)', border: '1px solid rgba(10, 48, 84, 0.15)', boxShadow: '0 2px 8px rgba(10, 48, 84, 0.03)' } : { border: '1px solid transparent' }}>
                  <div className="flex flex-col items-center gap-2 shrink-0 pt-0.5">
                    <div className={`w-5.5 h-5.5 rounded-full flex items-center justify-center border-2 transition-all`}
                      style={isCompleted ? { background: 'var(--st-accent-success)', borderColor: 'var(--st-accent-success)' }
                        : isActive ? { background: 'white', borderColor: 'var(--st-accent-gold)', boxShadow: '0 2px 8px rgba(224, 106, 59, 0.15)' }
                        : { background: 'white', borderColor: 'var(--st-glass-border-strong)' }}>
                      {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                        : <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: isActive ? 'var(--st-accent-gold)' : 'var(--st-glass-border-strong)' }} />}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-0.5 flex-1 rounded-full min-h-[20px]" style={{ background: isCompleted ? 'var(--st-accent-success)' : 'var(--st-glass-border)' }} />
                    )}
                  </div>
                  <div className="flex-1 pb-1 min-w-0">
                    <h4 className={`text-xs font-bold truncate ${isActive ? 'text-[var(--st-text-primary)] font-extrabold' : 'text-[var(--st-text-muted)]'}`}>{step.title}</h4>
                    <p className="text-[9px] font-bold text-[var(--st-text-faint)] uppercase tracking-tight mt-0.5">
                      {isCompleted ? 'Completed' : isActive ? 'Active' : 'Locked'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Detail */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div key={currentStep.id}
              initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
              className="glass-elevated rounded-xl p-6 sm:p-10 space-y-8 bg-white">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-[0.1em]" style={{ background: 'rgba(224, 106, 59, 0.06)', border: '1px solid rgba(224, 106, 59, 0.15)', color: 'var(--st-accent-gold)' }}>
                      Current step • {journey.currentStepIndex + 1} of {steps.length}
                    </span>
                    <span className="flex items-center gap-1.5 text-[var(--st-text-faint)] text-[10px] font-bold uppercase tracking-[0.1em] opacity-80">
                      <Clock className="w-3.5 h-3.5 text-[var(--st-accent-gold)]" /> {currentStep.estimatedTime} effort
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[var(--st-text-primary)] tracking-tight leading-snug">{currentStep.title}</h2>
                </div>
              </div>

              <p className="text-[var(--st-text-secondary)] text-sm leading-relaxed max-w-3xl font-semibold opacity-95">{currentStep.description}</p>

              {currentStep.requiredDocuments.length > 0 && (
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-2 text-[var(--st-text-primary)] border-b border-slate-100 pb-2">
                    <FileText className="w-4.5 h-4.5 text-[var(--st-accent-gold)]" />
                    <h3 className="text-sm font-bold uppercase tracking-wider">Required Evidence checklist</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentStep.requiredDocuments.map((doc, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-[var(--st-glass-border)] group hover:border-[var(--st-accent-gold)]/30 transition-all bg-white shadow-sm">
                        <span className="text-xs font-bold text-[var(--st-text-secondary)] opacity-90">{doc}</span>
                        <div className="w-5 h-5 rounded-[6px] border border-[var(--st-glass-border-strong)] flex items-center justify-center bg-[var(--st-bg-blue-tint)]" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-6 rounded-xl flex gap-4 bg-orange-50/40 border border-orange-100 shadow-sm">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-[var(--st-gradient-hero)] text-white shadow-md">
                  <Info className="w-5 h-5 text-[var(--st-accent-gold)]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[var(--st-text-primary)] mb-1 uppercase tracking-wider">Strategic Recommendation</h4>
                  <p className="text-xs text-[var(--st-text-secondary)] leading-relaxed font-semibold opacity-85">
                    We suggest gathering certified digital scans at least 48 hours before starting registration to prevent session timeouts.
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-[var(--st-glass-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
                <button className="text-[10px] font-bold uppercase tracking-widest text-[var(--st-text-faint)] hover:text-[var(--st-text-primary)] transition-colors opacity-80 cursor-pointer">
                  Need Help with this Step?
                </button>
                <button onClick={() => completeStep(journey.id, journey.currentStepIndex)}
                  className="btn-liquid-gold py-3 px-8 text-[12px] font-bold uppercase tracking-[0.2em] h-13 cursor-pointer">
                  Confirm step completion <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
