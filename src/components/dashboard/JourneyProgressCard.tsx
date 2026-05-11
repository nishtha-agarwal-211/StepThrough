'use client';

import { motion } from 'framer-motion';
import { Journey } from '@/lib/types';
import { CheckCircle2, Clock, ArrowRight, Map } from 'lucide-react';

interface JourneyProgressCardProps {
  journey: Journey;
  onClick: () => void;
}

export default function JourneyProgressCard({ journey, onClick }: JourneyProgressCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      onClick={onClick}
      className="premium-card p-6 cursor-pointer group"
    >
      <div className="flex items-start gap-4 mb-6">
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center text-xl bg-slate-50 border border-slate-100"
        >
          {journey.opportunity.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-slate-900 truncate">{journey.opportunity.title}</h3>
          <p className="text-[11px] font-medium text-slate-400 truncate">Next: {journey.opportunity.steps[journey.currentStepIndex]?.title || 'Finalize'}</p>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-slate-900">{journey.progress}%</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="st-progress-bar">
          <motion.div 
            className="st-progress-fill" 
            initial={{ width: 0 }}
            animate={{ width: `${journey.progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-tight">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              {journey.completedSteps}/{journey.totalSteps} Completed
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-tight">
              <Clock className="w-3 h-3" />
              Active
            </div>
          </div>
          <button className="text-[10px] font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
            Resume <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
