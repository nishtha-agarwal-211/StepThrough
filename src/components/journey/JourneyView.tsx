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
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 border-b border-slate-200 pb-10">
        <div className="flex items-start gap-6">
          <button 
            onClick={() => setSelectedJourneyId(null)}
            className="mt-1 p-2 rounded-lg border border-slate-200 hover:bg-white hover:border-slate-300 transition-all text-slate-400 hover:text-slate-900 shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-2xl bg-white border border-slate-100 shadow-sm">
                {journey.opportunity.icon}
              </div>
              <span className="section-label mb-0">Active Pathway</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{journey.opportunity.title}</h1>
            <p className="text-slate-500 font-medium mt-1">{journey.opportunity.provider}</p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3">
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Progression</p>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-slate-900">{journey.progress}%</span>
              <div className="w-32 st-progress-bar bg-slate-100">
                <div className="st-progress-fill" style={{ width: `${journey.progress}%` }} />
              </div>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
             <Share2 className="w-3.5 h-3.5" /> Share Roadmap
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Simplified Roadmap List */}
        <div className="lg:col-span-4 space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 px-1">Roadmap</h2>
          <div className="space-y-4">
            {steps.map((step, index) => {
              const isCompleted = index < journey.completedSteps;
              const isActive = index === journey.currentStepIndex;
              const isLocked = index > journey.completedSteps && !isActive;

              return (
                <div 
                  key={step.id}
                  className={`relative flex gap-4 p-4 rounded-xl transition-all
                    ${isActive ? 'bg-white border border-slate-200 shadow-md ring-1 ring-blue-600/5' : 'bg-transparent border border-transparent'}
                    ${isLocked ? 'opacity-40 grayscale' : ''}
                  `}
                >
                  <div className="flex flex-col items-center gap-2 shrink-0">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all
                      ${isCompleted ? 'bg-emerald-500 border-emerald-500' : 
                        isActive ? 'bg-white border-blue-600' : 'bg-white border-slate-200'}
                    `}>
                      {isCompleted ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      ) : (
                        <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-blue-600' : 'bg-slate-200'}`} />
                      )}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-0.5 flex-1 rounded-full ${isCompleted ? 'bg-emerald-500/20' : 'bg-slate-100'}`} />
                    )}
                  </div>

                  <div className="flex-1 pb-4 min-w-0">
                    <h4 className={`text-sm font-semibold truncate ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>
                      {step.title}
                    </h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-1">
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
              className="bg-white border border-slate-200 rounded-3xl p-10 shadow-lg shadow-slate-200/50 space-y-10"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-[0.1em]">
                      Current Mission • Step {journey.currentStepIndex + 1}
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-[0.1em]">
                      <Clock className="w-3.5 h-3.5" /> {currentStep.estimatedTime} Effort
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{currentStep.title}</h2>
                </div>
              </div>

              <p className="text-slate-600 text-lg leading-relaxed max-w-3xl">
                {currentStep.description}
              </p>

              {/* Requirement Checklist */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-slate-900">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h3 className="text-base font-bold">Evidence Required</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentStep.requiredDocuments.map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 group hover:border-slate-200 transition-all">
                      <span className="text-xs font-semibold text-slate-600">{doc}</span>
                      <div className="w-5 h-5 rounded border-2 border-slate-200 flex items-center justify-center bg-white">
                         {/* Checkmark placeholder */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Intelligence Box */}
              <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100 flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                  <Info className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-blue-900 mb-1">Guidance for this step</h4>
                  <p className="text-xs text-blue-700 leading-relaxed font-medium">
                    Our analysis shows that most successful applicants prepare their digital copies at least 48 hours before submission.
                  </p>
                </div>
              </div>

              <div className="pt-10 border-t border-slate-100 flex items-center justify-between">
                <button className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors">
                  Need Help with this Step?
                </button>
                <button 
                  onClick={() => completeStep(journey.id, journey.currentStepIndex)}
                  className="btn-primary py-3 px-8 text-base shadow-lg shadow-blue-900/10"
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
