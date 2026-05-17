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
      whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.1)' }}
      onClick={onClick}
      className="bg-white border border-gray-100 p-8 flex flex-col group cursor-pointer h-full relative rounded-2xl transition-all duration-500 overflow-hidden"
    >
      <div className="flex items-start justify-between mb-8">
        <div 
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl bg-gray-50 border border-gray-100 group-hover:bg-white group-hover:scale-110 transition-all duration-500 shadow-sm"
        >
          {opportunity.icon}
        </div>
        <div className="flex flex-col items-end gap-2">
           <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
             <ShieldCheck className="w-3.5 h-3.5" />
             Verified
           </div>
           {opportunity.title.length > 20 && (
              <div className="flex items-center gap-1.5 text-[9px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-md uppercase tracking-widest">
                <Sparkles className="w-2.5 h-2.5" />
                Featured
              </div>
           )}
        </div>
      </div>

      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight tracking-tight group-hover:text-indigo-600 transition-colors duration-300">
          {opportunity.title}
        </h3>
        <p className="text-[11px] font-bold text-gray-400 mb-6 uppercase tracking-[0.15em]">{opportunity.provider}</p>
        
        <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed mb-8 font-medium opacity-80 group-hover:opacity-100 transition-opacity">
          {opportunity.description}
        </p>
      </div>

      <div className="pt-6 border-t border-gray-50 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            <Clock className="w-3.5 h-3.5 text-gray-400 group-hover:text-indigo-500 transition-colors" />
            {opportunity.steps.length} Phases
          </div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
             <MapPin className="w-3.5 h-3.5 text-gray-400 group-hover:text-rose-500 transition-colors" />
             Lucknow
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-white scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 shadow-lg shadow-gray-300">
          <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
      
      {/* Subtle corner accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
    </motion.div>
  );
}
