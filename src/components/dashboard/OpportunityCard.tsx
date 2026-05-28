'use client';

import { motion } from 'framer-motion';
import { Opportunity } from '@/lib/types';
import { ChevronRight, Clock, ShieldCheck, MapPin, Sparkles } from 'lucide-react';

interface OpportunityCardProps {
  opportunity: Opportunity;
  onClick: () => void;
}

export default function OpportunityCard({ opportunity, onClick }: OpportunityCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: '0 16px 36px rgba(15, 23, 42, 0.05)' }}
      onClick={onClick}
      className="glass-card p-7 flex flex-col group cursor-pointer h-full relative overflow-hidden transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-6">
        <div 
          className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl border border-[var(--st-glass-border)] group-hover:scale-105 transition-all duration-300 shadow-sm"
          style={{ background: 'var(--st-bg-blue-tint)' }}
        >
          {opportunity.icon}
        </div>
        <div className="flex flex-col items-end gap-2">
           <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[9px] font-bold uppercase tracking-wider bg-emerald-50 border border-emerald-100 text-emerald-700">
             <ShieldCheck className="w-3.5 h-3.5" />
             Verified
           </div>
           {opportunity.title.length > 20 && (
              <div className="flex items-center gap-1.5 text-[9px] font-bold px-2.5 py-0.5 rounded-lg uppercase tracking-widest bg-orange-50 border border-orange-100 text-orange-700">
                <Sparkles className="w-2.5 h-2.5 text-[var(--st-accent-gold)]" />
                Featured
              </div>
           )}
        </div>
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-bold text-[var(--st-text-primary)] mb-1 leading-tight tracking-tight group-hover:text-[var(--st-accent-mocha)] transition-colors duration-300">
          {opportunity.title}
        </h3>
        <p className="text-[10px] font-bold text-[var(--st-text-faint)] mb-4 uppercase tracking-[0.15em] opacity-80">{opportunity.provider}</p>
        
        <p className="text-xs text-[var(--st-text-muted)] line-clamp-3 leading-relaxed mb-6 font-medium opacity-80 group-hover:opacity-100 transition-opacity">
          {opportunity.description}
        </p>
      </div>

      <div className="pt-4 border-t border-[var(--st-glass-border)] flex items-center justify-between mt-auto">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[10px] font-bold text-[var(--st-text-faint)] uppercase tracking-widest">
            <Clock className="w-3.5 h-3.5 group-hover:text-[var(--st-accent-gold)] transition-colors" />
            {opportunity.steps.length} Phases
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-[var(--st-text-faint)] uppercase tracking-widest">
             <MapPin className="w-3.5 h-3.5 group-hover:text-[var(--st-accent-terracotta)] transition-colors" />
             National
          </div>
        </div>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 shadow-sm" style={{ background: 'var(--st-gradient-gold)', boxShadow: '0 2px 8px rgba(224, 106, 59, 0.2)' }}>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
      
      {/* Subtle corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity -z-10" style={{ background: 'linear-gradient(225deg, rgba(224, 106, 59, 0.03), transparent)' }} />
    </motion.div>
  );
}
