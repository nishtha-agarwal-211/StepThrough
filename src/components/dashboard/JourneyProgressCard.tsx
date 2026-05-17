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
      whileHover={{ y: -4, shadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
      onClick={onClick}
      className="bg-white border border-gray-100 p-6 cursor-pointer group relative overflow-hidden rounded-2xl transition-all duration-300"
    >
      <div className="flex items-start gap-5 mb-6">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gray-50 border border-gray-100 group-hover:scale-110 transition-transform duration-500"
        >
          {journey.opportunity.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
             <h3 className="text-sm font-bold text-gray-900 truncate">{journey.opportunity.title}</h3>
             <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
          </div>
          <p className="text-[11px] font-medium text-gray-400 truncate">
            Pending: <span className="text-gray-600">{journey.opportunity.steps[journey.currentStepIndex]?.title || 'Finalize'}</span>
          </p>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold text-gray-900">{journey.progress}%</span>
        </div>
      </div>

      <div className="space-y-5">
        <div className="h-1.5 bg-gray-50 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gray-900" 
            initial={{ width: 0 }}
            animate={{ width: `${journey.progress}%` }}
            transition={{ duration: 1.5, ease: [0.2, 0, 0, 1] }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              {journey.completedSteps}/{journey.totalSteps}
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <Clock className="w-3 h-3 text-indigo-500" />
              Active
            </div>
          </div>
          <button className="text-[11px] font-bold text-gray-600 group-hover:text-gray-900 transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-transparent hover:border-gray-100 hover:bg-gray-50 transition-all">
            Continue <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
      
      {/* Decorative background element */}
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gray-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
    </motion.div>
  );
}
