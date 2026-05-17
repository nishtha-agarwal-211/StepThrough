'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { onboardingQuestions } from '@/lib/data';
import { ArrowLeft, Check, Zap } from 'lucide-react';

export default function OnboardingFlow() {
  const { 
    onboardingStep, 
    setOnboardingStep, 
    onboardingAnswers, 
    setOnboardingAnswer, 
    completeOnboarding 
  } = useAppStore();

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
    if (onboardingStep > 0) {
      setOnboardingStep(onboardingStep - 1);
    }
  };

  const handleOptionSelect = (value: string) => {
    if (currentQuestion.type === 'single') {
      setOnboardingAnswer(currentQuestion.id, value);
      setTimeout(handleNext, 400); 
    } else if (currentQuestion.type === 'multiple') {
      const current = (onboardingAnswers[currentQuestion.id] as string[]) || [];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      setOnboardingAnswer(currentQuestion.id, updated);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[var(--st-bg-dark)] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Ambient Background Blobs */}
      <div className="ambient-container">
        <div className="ambient-blob blob-1 opacity-30" />
        <div className="ambient-blob blob-2 opacity-30" />
        <div className="ambient-blob blob-3 opacity-30" />
      </div>

      {/* Progress Header */}
      <div className="w-full max-w-2xl flex items-center justify-between mb-16 animate-fade relative z-10">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--st-accent-brand)] flex items-center justify-center shadow-md">
               <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-[var(--st-text-primary)] tracking-tight">StepThrough</span>
         </div>
         <div className="flex flex-col items-end gap-2">
            <span className="text-[10px] font-bold text-[var(--st-text-muted)] uppercase tracking-[0.2em] opacity-60">Step {onboardingStep + 1} of {onboardingQuestions.length}</span>
            <div className="w-32 h-1.5 bg-white border border-[var(--st-glass-border)] relative overflow-hidden rounded-full shadow-inner">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${progress}%` }}
                 className="absolute inset-y-0 left-0 bg-[var(--st-accent-brand)]" 
               />
            </div>
         </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl relative z-10"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={onboardingStep}
            initial={{ opacity: 0, scale: 0.98, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -5 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-12"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-[var(--st-accent-primary)] uppercase tracking-[0.25em]">Intelligence Discovery</span>
                <div className="h-px w-8 bg-[var(--st-accent-primary)]/20" />
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
                  <button
                    key={option.value}
                    onClick={() => handleOptionSelect(option.value)}
                    className={`flex items-center gap-5 p-6 rounded-[24px] transition-all duration-300 text-left border relative overflow-hidden group shadow-sm
                      ${isSelected 
                        ? 'bg-white border-[var(--st-accent-brand)] shadow-md ring-1 ring-[var(--st-accent-brand)]/20' 
                        : 'bg-white/50 border-[var(--st-glass-border)] hover:border-[var(--st-accent-primary)] hover:bg-white'
                      }
                    `}
                  >
                    {isSelected && (
                      <motion.div 
                        layoutId="selection-glow"
                        className="absolute inset-0 bg-[var(--st-accent-brand)]/5 blur-2xl"
                      />
                    )}
                    <div className={`w-12 h-12 rounded-[18px] flex items-center justify-center text-2xl transition-all duration-300 border
                      ${isSelected ? 'bg-[var(--st-accent-brand)] border-[var(--st-accent-brand)] text-white shadow-md' : 'bg-white border-[var(--st-glass-border)] text-[var(--st-text-muted)] group-hover:text-[var(--st-text-primary)]'}
                    `}>
                      {option.icon || <Check className="w-6 h-6" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold text-[16px] transition-all ${isSelected ? 'text-[var(--st-text-primary)]' : 'text-[var(--st-text-muted)] group-hover:text-[var(--st-text-primary)]'}`}>
                        {option.label}
                      </p>
                    </div>
                    {isSelected && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 rounded-full bg-[var(--st-accent-brand)] flex items-center justify-center shadow-md"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </button>
                );
              })}

              {currentQuestion.type === 'range' && (
                <div className="col-span-2">
                  <input 
                    type="number" 
                    placeholder={currentQuestion.placeholder}
                    autoFocus
                    className="w-full bg-white border border-[var(--st-glass-border)] rounded-[28px] p-8 text-3xl sm:text-5xl font-bold text-center text-[var(--st-text-primary)] focus:outline-none focus:border-[var(--st-accent-primary)] focus:shadow-md transition-all placeholder:text-[var(--st-text-muted)] opacity-80 shadow-sm"
                    onChange={(e) => setOnboardingAnswer(currentQuestion.id, e.target.value)}
                  />
                </div>
              )}

              {currentQuestion.type === 'location' && (
                <div className="col-span-2">
                  <input 
                    type="text" 
                    placeholder={currentQuestion.placeholder}
                    autoFocus
                    className="w-full bg-white border border-[var(--st-glass-border)] rounded-[28px] p-8 text-xl sm:text-3xl font-bold text-[var(--st-text-primary)] focus:outline-none focus:border-[var(--st-accent-primary)] focus:shadow-md transition-all placeholder:text-[var(--st-text-muted)] opacity-80 shadow-sm"
                    onChange={(e) => setOnboardingAnswer(currentQuestion.id, e.target.value)}
                  />
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer Navigation */}
        <div className="mt-20 flex items-center justify-between border-t border-white/5 pt-10">
          <button 
            onClick={handleBack}
            disabled={onboardingStep === 0}
            className={`flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest transition-all
              ${onboardingStep === 0 ? 'opacity-0 pointer-events-none' : 'text-[var(--st-text-muted)] hover:text-[var(--st-text-primary)]'}
            `}
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
          
          {(currentQuestion.type === 'multiple' || currentQuestion.type === 'range' || currentQuestion.type === 'location') && (
            <button 
              onClick={handleNext}
              className="btn-glass-primary h-14 px-10 text-[12px] font-bold uppercase tracking-[0.2em]"
            >
              Continue Journey
            </button>
          )}
          
          {currentQuestion.type === 'single' && (
             <div className="flex items-center gap-3 text-[var(--st-accent-primary)] opacity-40">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Processing Profile...</span>
                <div className="flex gap-1">
                   <div className="w-1 h-1 rounded-full bg-[var(--st-accent-primary)] animate-bounce" style={{ animationDelay: '0ms' }} />
                   <div className="w-1 h-1 rounded-full bg-[var(--st-accent-primary)] animate-bounce" style={{ animationDelay: '150ms' }} />
                   <div className="w-1 h-1 rounded-full bg-[var(--st-accent-primary)] animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
             </div>
          )}
        </div>
      </motion.div>

      {/* Subtle reassurance */}
      <div className="mt-20 flex items-center gap-8 opacity-40 animate-fade flex-wrap justify-center">
         <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[var(--st-text-muted)]">Verified Protocol</span>
         <div className="w-1.5 h-1.5 rounded-full bg-[var(--st-glass-border)]" />
         <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[var(--st-text-muted)]">Secure Identity Vault</span>
         <div className="w-1.5 h-1.5 rounded-full bg-[var(--st-glass-border)]" />
         <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[var(--st-text-muted)]">AI Optimized</span>
      </div>
    </div>
  );
}
