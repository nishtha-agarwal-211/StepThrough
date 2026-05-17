'use client';

import { motion } from 'framer-motion';
import { Journey } from '@/lib/types';
import { CheckCircle2, Clock, ArrowRight, Activity } from 'lucide-react';

interface JourneyProgressCardProps {
  journey: Journey;
  onClick: () => void;
}

export default function JourneyProgressCard({ journey, onClick }: JourneyProgressCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 20px 48px rgba(139,115,85,0.12)' }}
      onClick={onClick}
      className="glass-card p-6 cursor-pointer group relative overflow-hidden transition-all duration-300"
    >
      <div className="flex items-start gap-5 mb-6">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl border border-[var(--st-glass-border)] group-hover:scale-110 transition-transform duration-500"
          style={{ background: 'var(--st-glass-surface)' }}
        >
          {journey.opportunity.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
             <h3 className="text-sm font-bold text-[var(--st-text-primary)] truncate">{journey.opportunity.title}</h3>
             <Activity className="w-3 h-3 text-[var(--st-accent-success)] animate-pulse" />
          </div>
          <p className="text-[11px] font-medium text-[var(--st-text-faint)] truncate">
            Pending: <span className="text-[var(--st-text-secondary)]">{journey.opportunity.steps[journey.currentStepIndex]?.title || 'Finalize'}</span>
          </p>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold text-[var(--st-text-primary)]">{journey.progress}%</span>
        </div>
      </div>

      <div className="space-y-5">
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--st-bg-deeper)' }}>
          <motion.div 
            className="h-full rounded-full" 
            initial={{ width: 0 }}
            animate={{ width: `${journey.progress}%` }}
            transition={{ duration: 1.5, ease: [0.2, 0, 0, 1] }}
            style={{ background: 'linear-gradient(90deg, #C9A96E, #D4B88A)' }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-[var(--st-text-faint)] uppercase tracking-widest">
              <CheckCircle2 className="w-3 h-3 text-[var(--st-accent-success)]" />
              {journey.completedSteps}/{journey.totalSteps}
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-[var(--st-text-faint)] uppercase tracking-widest">
              <Clock className="w-3 h-3 text-[var(--st-accent-gold)]" />
              Active
            </div>
          </div>
          <button className="text-[11px] font-bold text-[var(--st-text-muted)] group-hover:text-[var(--st-text-primary)] transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-transparent hover:border-[var(--st-glass-border)] hover:bg-[var(--st-glass-surface)] transition-all">
            Continue <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
      
      {/* Warm decorative element */}
      <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" style={{ background: 'rgba(201,169,110,0.08)' }} />
    </motion.div>
  );
}
