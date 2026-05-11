'use client';

import { motion } from 'framer-motion';
import { Opportunity } from '@/lib/types';
import { ChevronRight, ArrowUpRight, Clock, ShieldCheck, MapPin } from 'lucide-react';

interface OpportunityCardProps {
  opportunity: Opportunity;
  onClick: () => void;
}

export default function OpportunityCard({ opportunity, onClick }: OpportunityCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      onClick={onClick}
      className="premium-card p-6 flex flex-col group cursor-pointer"
    >
      <div className="flex items-start justify-between mb-6">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-slate-50 border border-slate-100 group-hover:border-slate-200 transition-colors"
        >
          {opportunity.icon}
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          <ShieldCheck className="w-3 h-3 text-emerald-500" />
          Verified
        </div>
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
          {opportunity.title}
        </h3>
        <p className="text-xs font-medium text-slate-400 mb-4">{opportunity.provider}</p>
        
        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-6">
          {opportunity.description}
        </p>
      </div>

      <div className="pt-6 border-t border-slate-50 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            {opportunity.steps.length} Steps
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
             <MapPin className="w-3.5 h-3.5" />
             Lucknow
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
}
