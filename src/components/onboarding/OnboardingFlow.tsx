'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { onboardingQuestions } from '@/lib/data';
import { ChevronRight, ArrowLeft, Sparkles, Check, Zap, Bot } from 'lucide-react';

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

  const handleNext = () => {
    if (onboardingStep < onboardingQuestions.length - 1) {
      setOnboardingStep(onboardingStep + 1);
    } else {
      completeOnboarding();
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
    <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Minimal Header */}
      <div className="w-full max-w-2xl flex items-center justify-between mb-10 sm:mb-20 animate-fade">
         <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
               <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-900">StepThrough</span>
         </div>
         <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Setup Phase</span>
            <div className="w-20 st-progress-bar bg-slate-100">
               <div className="st-progress-fill" style={{ width: `${progress}%` }} />
            </div>
         </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={onboardingStep}
            initial={{ opacity: 0, x: 5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -5 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-12"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-blue-600">
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Context Discovery</span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-[1.1]">
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
                    className={`flex items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl border text-left transition-all
                      ${isSelected 
                        ? 'bg-blue-50 border-blue-600 shadow-sm ring-1 ring-blue-600/5' 
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }
                    `}
                  >
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-xl transition-all
                      ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-400'}
                    `}>
                      {option.icon || <Check className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <p className={`font-semibold text-[15px] ${isSelected ? 'text-slate-900' : 'text-slate-600'}`}>
                        {option.label}
                      </p>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}

              {currentQuestion.type === 'range' && (
                <div className="col-span-2">
                  <input 
                    type="number" 
                    placeholder={currentQuestion.placeholder}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-8 text-xl sm:text-3xl font-bold text-center focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all"
                    onChange={(e) => setOnboardingAnswer(currentQuestion.id, e.target.value)}
                  />
                </div>
              )}

              {currentQuestion.type === 'location' && (
                <div className="col-span-2">
                  <input 
                    type="text" 
                    placeholder={currentQuestion.placeholder}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-8 text-lg sm:text-xl font-semibold focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all"
                    onChange={(e) => setOnboardingAnswer(currentQuestion.id, e.target.value)}
                  />
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer Navigation */}
        <div className="mt-10 sm:mt-20 flex items-center justify-between border-t border-slate-100 pt-6 sm:pt-10">
          <button 
            onClick={handleBack}
            disabled={onboardingStep === 0}
            className={`flex items-center gap-2 text-xs font-bold transition-all
              ${onboardingStep === 0 ? 'opacity-0 pointer-events-none' : 'text-slate-400 hover:text-slate-900'}
            `}
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
          
          {(currentQuestion.type === 'multiple' || currentQuestion.type === 'range' || currentQuestion.type === 'location') && (
            <button 
              onClick={handleNext}
              className="btn-primary py-3 px-8 text-sm"
            >
              Continue Pathway
            </button>
          )}
          
          {currentQuestion.type === 'single' && (
             <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Auto-progressing...</p>
          )}
        </div>
      </motion.div>

      {/* Subtle reassurance */}
      <div className="mt-10 sm:mt-20 flex items-center gap-4 sm:gap-6 opacity-30 animate-fade flex-wrap justify-center">
         <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">Government Verified</span>
         <div className="w-1 h-1 rounded-full bg-slate-300" />
         <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">Secure Vault</span>
         <div className="w-1 h-1 rounded-full bg-slate-300" />
         <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">Human Assisted</span>
      </div>
    </div>
  );
}
