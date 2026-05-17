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
      whileHover={{ y: -8, boxShadow: '0 25px 60px rgba(139,115,85,0.12)' }}
      onClick={onClick}
      className="glass-card p-8 flex flex-col group cursor-pointer h-full relative overflow-hidden transition-all duration-500"
    >
      <div className="flex items-start justify-between mb-8">
        <div 
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl border border-[var(--st-glass-border)] group-hover:scale-110 transition-all duration-500 shadow-sm"
          style={{ background: 'var(--st-glass-surface)' }}
        >
          {opportunity.icon}
        </div>
        <div className="flex flex-col items-end gap-2">
           <div className="flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{ background: 'rgba(126,174,123,0.1)', border: '1px solid rgba(126,174,123,0.15)', color: 'var(--st-accent-success)' }}>
             <ShieldCheck className="w-3.5 h-3.5" />
             Verified
           </div>
           {opportunity.title.length > 20 && (
              <div className="flex items-center gap-1.5 text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-widest" style={{ background: 'rgba(201,169,110,0.1)', color: 'var(--st-accent-gold)' }}>
                <Sparkles className="w-2.5 h-2.5" />
                Featured
              </div>
           )}
        </div>
      </div>

      <div className="flex-1">
        <h3 className="text-xl font-bold text-[var(--st-text-primary)] mb-2 leading-tight tracking-tight group-hover:text-[var(--st-accent-mocha)] transition-colors duration-300">
          {opportunity.title}
        </h3>
        <p className="text-[11px] font-bold text-[var(--st-text-faint)] mb-6 uppercase tracking-[0.15em]">{opportunity.provider}</p>
        
        <p className="text-sm text-[var(--st-text-muted)] line-clamp-3 leading-relaxed mb-8 font-medium opacity-80 group-hover:opacity-100 transition-opacity">
          {opportunity.description}
        </p>
      </div>

      <div className="pt-6 border-t border-[var(--st-glass-border)] flex items-center justify-between mt-auto">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-[11px] font-bold text-[var(--st-text-faint)] uppercase tracking-widest">
            <Clock className="w-3.5 h-3.5 group-hover:text-[var(--st-accent-gold)] transition-colors" />
            {opportunity.steps.length} Phases
          </div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-[var(--st-text-faint)] uppercase tracking-widest">
             <MapPin className="w-3.5 h-3.5 group-hover:text-[var(--st-accent-terracotta)] transition-colors" />
             Lucknow
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500" style={{ background: 'linear-gradient(135deg, #C9A96E, #8B7355)', boxShadow: '0 4px 16px rgba(201,169,110,0.3)' }}>
          <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
      
      {/* Subtle corner accent */}
      <div className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity -z-10" style={{ background: 'linear-gradient(225deg, rgba(201,169,110,0.06), transparent)' }} />
    </motion.div>
  );
}
