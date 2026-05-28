'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { onboardingQuestions } from '@/lib/data';
import { ArrowLeft, Check, Zap, HelpCircle } from 'lucide-react';

const questionHints: Record<string, string> = {
  q1: "We customize the schemes to suit students, job seekers, professionals, startup founders, senior citizens, or farmers.",
  q2: "Many government welfare benefits, pension schemes, and educational scholarships are restricted to specific age brackets.",
  q3: "Scholarships and skill training programs require minimum qualification levels to ensure eligibility.",
  q4: "Most direct benefits and subsidies are targeted towards economically weaker sections (EWS) or low-income groups.",
  q5: "State-specific schemes differ widely. We match you with programs in your home state.",
  q6: "This helps prioritize discovery, placing relevant roadmap recommendations first."
};

export default function OnboardingFlow() {
  const { onboardingStep, setOnboardingStep, onboardingAnswers, setOnboardingAnswer, completeOnboarding } = useAppStore();
  const [showHint, setShowHint] = useState(false);

  const currentQuestion = onboardingQuestions[onboardingStep];
  const progress = (onboardingStep / onboardingQuestions.length) * 100;

  useEffect(() => {
    setShowHint(false);
  }, [onboardingStep]);

  const handleNext = async () => {
    if (onboardingStep < onboardingQuestions.length - 1) {
      setOnboardingStep(onboardingStep + 1);
    } else {
      await completeOnboarding();
    }
  };

  const handleBack = () => {
    if (onboardingStep > 0) setOnboardingStep(onboardingStep - 1);
  };

  const handleOptionSelect = (value: string) => {
    if (currentQuestion.type === 'single') {
      setOnboardingAnswer(currentQuestion.id, value);
      setTimeout(handleNext, 400);
    } else if (currentQuestion.type === 'multiple') {
      const current = (onboardingAnswers[currentQuestion.id] as string[]) || [];
      const updated = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
      setOnboardingAnswer(currentQuestion.id, updated);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-6 relative overflow-hidden" style={{ background: 'var(--st-bg-base)' }}>
      <div className="ambient-container">
        <div className="ambient-blob blob-1 opacity-20" />
        <div className="ambient-blob blob-2 opacity-20" />
        <div className="ambient-blob blob-3 opacity-20" />
      </div>

      {/* Progress Header */}
      <div className="w-full max-w-2xl flex items-center justify-between mb-12 animate-fade relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md shadow-orange-500/10" style={{ background: 'var(--st-gradient-gold)' }}>
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-[var(--st-text-primary)] tracking-tight">StepThrough</span>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-[10px] font-bold text-[var(--st-text-faint)] uppercase tracking-[0.2em] opacity-80">Step {onboardingStep + 1} of {onboardingQuestions.length}</span>
          <div className="w-32 h-1.5 relative overflow-hidden rounded-full border border-[var(--st-glass-border)] bg-[var(--st-bg-blue-tint)]">
            <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }}
              className="absolute inset-y-0 left-0 rounded-full" style={{ background: 'var(--st-gradient-gold)' }} />
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl relative z-10">
        <AnimatePresence mode="wait">
          <motion.div key={onboardingStep}
            initial={{ opacity: 0, scale: 0.99, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.99, y: -5 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-[var(--st-accent-mocha)] uppercase tracking-[0.25em]">Citizen Profiling</span>
                <div className="h-px w-8 bg-slate-300/60" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--st-text-primary)] leading-[1.15]">
                {currentQuestion.question}
              </h1>

              {/* Expandable Hints & Est. Time */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="text-[11px] font-bold text-[var(--st-text-secondary)] bg-[var(--st-bg-blue-tint)] px-2.5 py-1 rounded-lg border border-[var(--st-glass-border)] flex items-center gap-1 shadow-sm">
                  ⏱️ 2 min quiz
                </div>
                {questionHints[currentQuestion.id] && (
                  <div className="relative">
                    <button 
                      onClick={() => setShowHint(!showHint)}
                      className="text-[11px] font-bold text-[var(--st-accent-mocha)] hover:text-[#1e4e7c] flex items-center gap-1.5 cursor-pointer select-none focus:outline-none focus:underline"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-[var(--st-accent-gold)]" /> Why do we ask this?
                    </button>
                    <AnimatePresence>
                      {showHint && (
                        <motion.div 
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          className="absolute left-0 mt-2 p-4 bg-white border border-[var(--st-glass-border-strong)] rounded-xl shadow-lg z-30 w-72 text-xs text-[var(--st-text-secondary)] font-medium leading-relaxed"
                        >
                          {questionHints[currentQuestion.id]}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {currentQuestion.options?.map((option) => {
                const isSelected = Array.isArray(onboardingAnswers[currentQuestion.id])
                  ? (onboardingAnswers[currentQuestion.id] as string[]).includes(option.value)
                  : onboardingAnswers[currentQuestion.id] === option.value;

                return (
                  <button key={option.value} onClick={() => handleOptionSelect(option.value)}
                    className={`glass-card flex items-center gap-5 p-5 transition-all duration-300 text-left relative overflow-hidden group border cursor-pointer
                      ${isSelected
                        ? 'border-[var(--st-accent-gold)] shadow-md bg-orange-50/5'
                        : 'border-[var(--st-glass-border)]'}
                    `}
                    style={{ borderRadius: 'var(--st-radius-lg)' }}
                  >
                    {isSelected && (
                      <motion.div layoutId="selection-glow" className="absolute inset-0 blur-2xl" style={{ background: 'rgba(224, 106, 59, 0.03)' }} />
                    )}
                    <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center text-xl transition-all duration-300 border`}
                      style={isSelected
                        ? { background: 'var(--st-gradient-hero)', borderColor: 'transparent', color: 'white', boxShadow: '0 4px 12px rgba(10, 48, 84, 0.15)' }
                        : { background: 'var(--st-bg-base)', borderColor: 'var(--st-glass-border-strong)', color: 'var(--st-text-faint)' }
                      }>
                      {option.icon || <Check className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold text-[15px] transition-all ${isSelected ? 'text-[var(--st-text-primary)] font-extrabold' : 'text-[var(--st-text-secondary)] group-hover:text-[var(--st-text-primary)]'}`}>
                        {option.label}
                      </p>
                    </div>
                    {isSelected && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                        className="w-6 h-6 rounded-full flex items-center justify-center shadow-md shrink-0" style={{ background: 'var(--st-gradient-gold)' }}>
                        <Check className="w-3.5 h-3.5 text-white" />
                      </motion.div>
                    )}
                  </button>
                );
              })}

              {currentQuestion.type === 'range' && (
                <div className="col-span-2">
                  <input type="number" placeholder={currentQuestion.placeholder} autoFocus
                    className="input-liquid w-full p-6 text-3xl sm:text-4xl font-bold text-center placeholder:text-[var(--st-text-faint)] focus:ring-4 focus:ring-[var(--st-accent-mocha)]/5"
                    onChange={(e) => setOnboardingAnswer(currentQuestion.id, e.target.value)}
                  />
                </div>
              )}

              {currentQuestion.type === 'location' && (
                <div className="col-span-2">
                  <input type="text" placeholder={currentQuestion.placeholder} autoFocus
                    className="input-liquid w-full p-6 text-lg sm:text-2xl font-bold placeholder:text-[var(--st-text-faint)] focus:ring-4 focus:ring-[var(--st-accent-mocha)]/5"
                    onChange={(e) => setOnboardingAnswer(currentQuestion.id, e.target.value)}
                  />
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer Navigation */}
        <div className="mt-16 flex items-center justify-between border-t border-[var(--st-glass-border)] pt-8">
          <button onClick={handleBack} disabled={onboardingStep === 0}
            className={`flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest transition-all cursor-pointer
              ${onboardingStep === 0 ? 'opacity-0 pointer-events-none' : 'text-[var(--st-text-faint)] hover:text-[var(--st-text-primary)]'}
            `}>
            <ArrowLeft className="w-4 h-4 animate-fade" /> Go Back
          </button>
          
          {(currentQuestion.type === 'multiple' || currentQuestion.type === 'range' || currentQuestion.type === 'location') && (
            <button onClick={handleNext} className="btn-liquid-gold h-14 px-10 text-[12px] font-bold uppercase tracking-[0.2em]">
              Continue
            </button>
          )}
          
          {currentQuestion.type === 'single' && (
            <div className="flex items-center gap-3 opacity-60" style={{ color: 'var(--st-accent-mocha)' }}>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Selecting pathway...</span>
              <div className="flex gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full animate-bounce bg-[var(--st-accent-gold)]" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 rounded-full animate-bounce bg-[var(--st-accent-gold)]" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 rounded-full animate-bounce bg-[var(--st-accent-gold)]" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <div className="mt-16 flex items-center gap-8 opacity-50 animate-fade flex-wrap justify-center">
        <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[var(--st-text-muted)] flex items-center gap-1.5">🛡️ Verified GOI Protocol</span>
        <div className="w-1 h-1 rounded-full bg-slate-300" />
        <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[var(--st-text-muted)] flex items-center gap-1.5">🔒 256-Bit Secure Vault</span>
        <div className="w-1 h-1 rounded-full bg-slate-300" />
        <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[var(--st-text-muted)] flex items-center gap-1.5">🤖 AI Eligibility Check</span>
      </div>
    </div>
  );
}
