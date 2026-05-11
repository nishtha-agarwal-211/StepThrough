'use client';

import { useAppStore } from '@/lib/store';
import { 
  FileText, ShieldCheck, Upload, Search, Filter, 
  MoreVertical, Clock, CheckCircle2, AlertCircle, Trash2, 
  Eye, Download, Lock, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DocumentCenter() {
  const { documents, stats, uploadDocument } = useAppStore();

  return (
    <div className="space-y-12 animate-fade">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Evidence Vault</h1>
          <p className="text-slate-500 mt-2 max-w-xl">Securely manage your verified documents and certifications required for government and academic pathways.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="btn-secondary">
             Manage Storage
           </button>
           <button className="btn-primary">
             <Upload className="w-4 h-4" /> Upload Document
           </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="premium-card p-6 border-l-4 border-l-blue-600">
          <div className="flex items-center gap-3 text-slate-400 mb-2">
            <Lock className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Storage Status</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">12 / 50 MB</h3>
          <p className="text-[11px] text-slate-400 font-medium mt-1">Encrypted on-device</p>
        </div>
        <div className="premium-card p-6 border-l-4 border-l-emerald-500">
          <div className="flex items-center gap-3 text-slate-400 mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Verification Rate</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">88% Approved</h3>
          <p className="text-[11px] text-slate-400 font-medium mt-1">7 Documents Verified</p>
        </div>
        <div className="premium-card p-6 border-l-4 border-l-amber-500">
          <div className="flex items-center gap-3 text-slate-400 mb-2">
            <AlertCircle className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Pending Sync</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">2 Actions</h3>
          <p className="text-[11px] text-slate-400 font-medium mt-1">Needs attention</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Your Documents</h2>
          <div className="flex items-center gap-4">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Filter vault..."
                  className="bg-white border border-slate-200 rounded-lg py-1.5 pl-9 pr-4 text-xs focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none w-48 transition-all"
                />
             </div>
             <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
               <Filter className="w-4 h-4 text-slate-500" />
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div key={doc.id} className="premium-card p-6 flex flex-col group">
              <div className="flex items-start justify-between mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl
                  ${doc.status === 'uploaded' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-50 text-slate-400 border border-slate-100'}
                `}>
                  <FileText className="w-6 h-6" />
                </div>
                <button className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                  <MoreVertical className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-900 mb-1">{doc.name}</h4>
                <div className="flex items-center gap-2">
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{doc.type}</span>
                   <div className="w-1 h-1 rounded-full bg-slate-300" />
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">PDF • 1.2MB</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {doc.status === 'uploaded' ? (
                    <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">
                      <Clock className="w-3 h-3" />
                      Required
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                   <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
                      <Eye className="w-4 h-4" />
                   </button>
                   <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
                      <Download className="w-4 h-4" />
                   </button>
                </div>
              </div>

              {doc.status !== 'uploaded' && (
                <button 
                  onClick={() => uploadDocument(doc.id)}
                  className="mt-6 w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all shadow-md shadow-slate-900/10"
                >
                  Confirm Verification
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Intelligence Suggestions */}
      <section className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center gap-6 sm:gap-10">
         <div className="w-20 h-20 rounded-3xl bg-white border border-slate-200 flex items-center justify-center shadow-sm shrink-0">
            <Sparkles className="w-10 h-10 text-blue-600" />
         </div>
         <div className="flex-1 space-y-2">
            <h3 className="text-xl font-bold text-slate-900">Intelligence Suggestion</h3>
            <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">
              We detected that you have 3 scholarships requiring a <strong>Community Certificate</strong>. 
              Uploading this document now will pre-verify your eligibility for all 3 paths instantly.
            </p>
         </div>
         <button className="btn-primary py-3 px-8 text-sm shrink-0">
            Resolve Requirement
         </button>
      </section>
    </div>
  );
}
