'use client';

import { NextAction } from '@/lib/types';
import { 
  Clock, AlertCircle, FileText, CheckCircle2, 
  ArrowRight, ChevronRight, Zap
} from 'lucide-react';
import { getUrgencyColor } from '@/lib/utils';

interface NextActionItemProps {
  action: NextAction;
}

export default function NextActionItem({ action }: NextActionItemProps) {
  const urgencyColor = getUrgencyColor(action.urgency);
  
  return (
    <div className="group flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0
        ${action.urgency === 'high' ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-400'}
      `}>
        {action.type === 'upload_document' ? <FileText className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h4 className="text-sm font-semibold text-slate-900 truncate">{action.title}</h4>
          {action.urgency === 'high' && (
            <span className="text-[9px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">Urgent</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <p className="text-[11px] font-medium text-slate-400 truncate">{action.description}</p>
          <div className="h-3 w-px bg-slate-200 hidden sm:block" />
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 uppercase tracking-tighter">
            <Clock className="w-3 h-3" />
            {action.dueDate ? 'Due Tomorrow' : 'ASAP'}
          </div>
        </div>
      </div>

      <div className="w-6 h-6 rounded-full flex items-center justify-center text-slate-300 group-hover:text-slate-900 group-hover:bg-slate-100 transition-all">
        <ChevronRight className="w-4 h-4" />
      </div>
    </div>
  );
}
