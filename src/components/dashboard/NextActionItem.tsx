'use client';

import { NextAction } from '@/lib/types';
import { Clock, FileText, ChevronRight, Zap, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface NextActionItemProps {
  action: NextAction;
}

export default function NextActionItem({ action }: NextActionItemProps) {
  const isHigh = action.urgency === 'high';
  return (
    <motion.div 
      whileHover={{ x: 2 }}
      className="group flex items-center gap-4 p-4 rounded-xl hover:bg-[rgba(201,169,110,0.04)] transition-all cursor-pointer border border-transparent hover:border-[var(--st-glass-border)]"
    >
      <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors"
        style={isHigh ? { background: 'rgba(196,122,106,0.1)', color: 'var(--st-accent-danger)' } : { background: 'var(--st-glass-surface)', color: 'var(--st-text-faint)' }}
      >
        {action.type === 'upload_document' ? <FileText className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h4 className="text-sm font-bold text-[var(--st-text-primary)] truncate">{action.title}</h4>
          {isHigh && (
            <div className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded" style={{ color: 'var(--st-accent-danger)', background: 'rgba(196,122,106,0.1)' }}>
              <AlertCircle className="w-2 h-2" /> Prioritized
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <p className="text-[12px] font-medium text-[var(--st-text-muted)] truncate opacity-80 group-hover:opacity-100 transition-opacity">{action.description}</p>
          <div className="h-3 w-px bg-[var(--st-glass-border)]" />
          <div className="flex items-center gap-1 text-[10px] font-bold text-[var(--st-text-faint)] uppercase tracking-widest">
            <Clock className="w-3 h-3" />
            {action.dueDate ? 'Tomorrow' : 'ASAP'}
          </div>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-[var(--st-text-faint)] group-hover:text-[var(--st-text-primary)] transition-colors" />
    </motion.div>
  );
}
