'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { onboardingQuestions } from '@/lib/data';
import { ArrowLeft, Check, Zap } from 'lucide-react';

export default function OnboardingFlow() {
  const { onboardingStep, setOnboardingStep, onboardingAnswers, setOnboardingAnswer, completeOnboarding } = useAppStore();

  const currentQuestion = onboardingQuestions[onboardingStep];
  const progress = (onboardingStep / onboardingQuestions.length) * 100;

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
        <div className="ambient-blob blob-1 opacity-50" />
        <div className="ambient-blob blob-2 opacity-50" />
        <div className="ambient-blob blob-3 opacity-50" />
      </div>

      {/* Progress Header */}
      <div className="w-full max-w-2xl flex items-center justify-between mb-16 animate-fade relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md" style={{ background: 'linear-gradient(135deg, #C9A96E, #8B7355)' }}>
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-[var(--st-text-primary)] tracking-tight">StepThrough</span>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-[10px] font-bold text-[var(--st-text-faint)] uppercase tracking-[0.2em] opacity-60">Step {onboardingStep + 1} of {onboardingQuestions.length}</span>
          <div className="w-32 h-1.5 relative overflow-hidden rounded-full border border-[var(--st-glass-border)]" style={{ background: 'var(--st-glass-surface)' }}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }}
              className="absolute inset-y-0 left-0 rounded-full" style={{ background: 'linear-gradient(90deg, #C9A96E, #D4B88A)' }} />
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl relative z-10">
        <AnimatePresence mode="wait">
          <motion.div key={onboardingStep}
            initial={{ opacity: 0, scale: 0.98, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -5 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-12"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-[var(--st-accent-mocha)] uppercase tracking-[0.25em]">Intelligence Discovery</span>
                <div className="h-px w-8" style={{ background: 'rgba(139,115,85,0.2)' }} />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--st-text-primary)] leading-[1.15]">
                {currentQuestion.question}
              </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentQuestion.options?.map((option) => {
                const isSelected = Array.isArray(onboardingAnswers[currentQuestion.id])
                  ? (onboardingAnswers[currentQuestion.id] as string[]).includes(option.value)
                  : onboardingAnswers[currentQuestion.id] === option.value;

                return (
                  <button key={option.value} onClick={() => handleOptionSelect(option.value)}
                    className={`flex items-center gap-5 p-6 rounded-[24px] transition-all duration-300 text-left relative overflow-hidden group shadow-sm
                      ${isSelected
                        ? 'shadow-md ring-1'
                        : 'hover:bg-[var(--st-glass-surface-hover)]'}
                    `}
                    style={isSelected
                      ? { background: 'var(--st-glass-surface-hover)', border: '1px solid rgba(201,169,110,0.4)', boxShadow: '0 8px 32px rgba(201,169,110,0.12)', ringColor: 'rgba(201,169,110,0.2)' }
                      : { background: 'var(--st-glass-surface)', border: '1px solid var(--st-glass-border)' }
                    }
                  >
                    {isSelected && (
                      <motion.div layoutId="selection-glow" className="absolute inset-0 blur-2xl" style={{ background: 'rgba(201,169,110,0.06)' }} />
                    )}
                    <div className={`w-12 h-12 rounded-[18px] flex items-center justify-center text-2xl transition-all duration-300 border`}
                      style={isSelected
                        ? { background: 'linear-gradient(135deg, #C9A96E, #8B7355)', borderColor: 'transparent', color: 'white', boxShadow: '0 4px 12px rgba(201,169,110,0.3)' }
                        : { background: 'var(--st-glass-surface)', borderColor: 'var(--st-glass-border)', color: 'var(--st-text-faint)' }
                      }>
                      {option.icon || <Check className="w-6 h-6" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold text-[16px] transition-all ${isSelected ? 'text-[var(--st-text-primary)]' : 'text-[var(--st-text-muted)] group-hover:text-[var(--st-text-primary)]'}`}>
                        {option.label}
                      </p>
                    </div>
                    {isSelected && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                        className="w-6 h-6 rounded-full flex items-center justify-center shadow-md" style={{ background: 'linear-gradient(135deg, #C9A96E, #8B7355)' }}>
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </button>
                );
              })}

              {currentQuestion.type === 'range' && (
                <div className="col-span-2">
                  <input type="number" placeholder={currentQuestion.placeholder} autoFocus
                    className="w-full border rounded-[28px] p-8 text-3xl sm:text-5xl font-bold text-center text-[var(--st-text-primary)] focus:outline-none transition-all placeholder:text-[var(--st-text-faint)] opacity-80 shadow-sm"
                    style={{ background: 'var(--st-glass-surface)', borderColor: 'var(--st-glass-border)' }}
                    onFocus={(e) => { e.target.style.borderColor = 'rgba(201,169,110,0.4)'; e.target.style.boxShadow = '0 8px 32px rgba(201,169,110,0.1)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--st-glass-border)'; e.target.style.boxShadow = 'none'; }}
                    onChange={(e) => setOnboardingAnswer(currentQuestion.id, e.target.value)}
                  />
                </div>
              )}

              {currentQuestion.type === 'location' && (
                <div className="col-span-2">
                  <input type="text" placeholder={currentQuestion.placeholder} autoFocus
                    className="w-full border rounded-[28px] p-8 text-xl sm:text-3xl font-bold text-[var(--st-text-primary)] focus:outline-none transition-all placeholder:text-[var(--st-text-faint)] opacity-80 shadow-sm"
                    style={{ background: 'var(--st-glass-surface)', borderColor: 'var(--st-glass-border)' }}
                    onFocus={(e) => { e.target.style.borderColor = 'rgba(201,169,110,0.4)'; e.target.style.boxShadow = '0 8px 32px rgba(201,169,110,0.1)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--st-glass-border)'; e.target.style.boxShadow = 'none'; }}
                    onChange={(e) => setOnboardingAnswer(currentQuestion.id, e.target.value)}
                  />
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer Navigation */}
        <div className="mt-20 flex items-center justify-between border-t border-[var(--st-glass-border)] pt-10">
          <button onClick={handleBack} disabled={onboardingStep === 0}
            className={`flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest transition-all
              ${onboardingStep === 0 ? 'opacity-0 pointer-events-none' : 'text-[var(--st-text-faint)] hover:text-[var(--st-text-primary)]'}
            `}>
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
          
          {(currentQuestion.type === 'multiple' || currentQuestion.type === 'range' || currentQuestion.type === 'location') && (
            <button onClick={handleNext} className="btn-glass-primary h-14 px-10 text-[12px] font-bold uppercase tracking-[0.2em]">
              Continue Journey
            </button>
          )}
          
          {currentQuestion.type === 'single' && (
            <div className="flex items-center gap-3 opacity-40" style={{ color: 'var(--st-accent-mocha)' }}>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Processing Profile...</span>
              <div className="flex gap-1">
                <div className="w-1 h-1 rounded-full animate-bounce" style={{ background: 'var(--st-accent-gold)', animationDelay: '0ms' }} />
                <div className="w-1 h-1 rounded-full animate-bounce" style={{ background: 'var(--st-accent-gold)', animationDelay: '150ms' }} />
                <div className="w-1 h-1 rounded-full animate-bounce" style={{ background: 'var(--st-accent-gold)', animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <div className="mt-20 flex items-center gap-8 opacity-40 animate-fade flex-wrap justify-center">
        <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[var(--st-text-faint)]">Verified Protocol</span>
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--st-bg-deeper)' }} />
        <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[var(--st-text-faint)]">Secure Identity Vault</span>
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--st-bg-deeper)' }} />
        <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[var(--st-text-faint)]">AI Optimized</span>
      </div>
    </div>
  );
}
