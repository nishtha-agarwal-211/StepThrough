'use client';

import { NextAction } from '@/lib/types';
import { 
  Clock, FileText, ChevronRight, Zap, AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

interface NextActionItemProps {
  action: NextAction;
}

export default function NextActionItem({ action }: NextActionItemProps) {
  return (
    <motion.div 
      whileHover={{ x: 2 }}
      className="group flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all cursor-pointer border border-transparent hover:border-gray-100"
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors
        ${action.urgency === 'high' ? 'bg-rose-50 text-rose-600' : 'bg-gray-50 text-gray-400 group-hover:bg-white group-hover:text-gray-900'}
      `}>
        {action.type === 'upload_document' ? <FileText className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h4 className="text-sm font-bold text-gray-900 truncate">{action.title}</h4>
          {action.urgency === 'high' && (
            <div className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-widest text-rose-600 px-1.5 py-0.5 bg-rose-50 rounded">
              <AlertCircle className="w-2 h-2" />
              Prioritized
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <p className="text-[12px] font-medium text-gray-500 truncate opacity-80 group-hover:opacity-100 transition-opacity">{action.description}</p>
          <div className="h-3 w-px bg-gray-200" />
          <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <Clock className="w-3 h-3" />
            {action.dueDate ? 'Tomorrow' : 'ASAP'}
          </div>
        </div>
      </div>

      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-900 transition-colors" />
    </motion.div>
  );
}
