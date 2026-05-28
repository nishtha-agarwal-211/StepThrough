'use client';

import { useAppStore } from '@/lib/store';
import { FileText, ShieldCheck, Upload, Search, Filter, MoreVertical, Clock, CheckCircle2, AlertCircle, Trash2, Eye, Download, Lock, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DocumentCenter() {
  const { documents, stats, uploadDocument } = useAppStore();

  return (
    <div className="space-y-12 animate-fade">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--st-text-primary)] tracking-tight">Evidence Vault</h1>
          <p className="text-[var(--st-text-secondary)] mt-2 max-w-xl font-medium opacity-80">Securely manage your verified documents and certifications required for government and academic pathways.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="btn-secondary">Manage Storage</button>
           <button className="btn-primary"><Upload className="w-4 h-4" /> Upload Document</button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 text-[var(--st-text-faint)] mb-2">
            <Lock className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Storage Status</span>
          </div>
          <h3 className="text-xl font-bold text-[var(--st-text-primary)]">12 / 50 MB</h3>
          <p className="text-[11px] text-[var(--st-text-faint)] font-bold mt-1 opacity-60">Encrypted on-device</p>
        </div>
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 text-[var(--st-text-faint)] mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Verification Rate</span>
          </div>
          <h3 className="text-xl font-bold text-[var(--st-text-primary)]">88% Approved</h3>
          <p className="text-[11px] text-[var(--st-text-faint)] font-bold mt-1 opacity-60">7 Documents Verified</p>
        </div>
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 text-[var(--st-text-faint)] mb-2">
            <AlertCircle className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Pending Sync</span>
          </div>
          <h3 className="text-xl font-bold text-[var(--st-text-primary)]">2 Actions</h3>
          <p className="text-[11px] text-[var(--st-text-faint)] font-bold mt-1 opacity-60">Needs attention</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[var(--st-text-primary)]">Your Documents</h2>
          <div className="flex items-center gap-4">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--st-text-faint)] opacity-40" />
                <input type="text" placeholder="Filter vault..."
                  className="border border-[var(--st-glass-border)] rounded-lg py-1.5 pl-9 pr-4 text-xs font-medium text-[var(--st-text-primary)] focus:border-[var(--st-accent-gold)]/40 focus:shadow-sm outline-none w-48 transition-all placeholder:text-[var(--st-text-faint)]"
                  style={{ background: 'var(--st-glass-surface)' }}
                />
             </div>
             <button className="p-2 border border-[var(--st-glass-border)] rounded-lg hover:bg-[var(--st-glass-surface-hover)] transition-colors text-[var(--st-text-faint)]" style={{ background: 'var(--st-glass-surface)' }}>
               <Filter className="w-4 h-4" />
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div key={doc.id} className="glass-card p-6 flex flex-col group transition-all bg-white">
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                  style={doc.status === 'uploaded'
                    ? { background: 'rgba(21,128,61,0.06)', color: 'var(--st-accent-success)', border: '1px solid rgba(21,128,61,0.15)' }
                    : { background: 'var(--st-bg-blue-tint)', color: 'var(--st-text-faint)', border: '1px solid var(--st-glass-border)' }
                  }>
                  <FileText className="w-6 h-6" />
                </div>
                <button className="p-1.5 rounded-lg hover:bg-[var(--st-bg-blue-tint)] transition-colors text-[var(--st-text-faint)] opacity-30 group-hover:opacity-100 cursor-pointer">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1">
                <h4 className="text-sm font-bold text-[var(--st-text-primary)] mb-1">{doc.name}</h4>
                <div className="flex items-center gap-2">
                   <span className="text-[10px] font-bold text-[var(--st-text-faint)] uppercase tracking-tight opacity-80">{doc.type}</span>
                   <div className="w-1 h-1 rounded-full bg-slate-300" />
                   <span className="text-[10px] font-bold text-[var(--st-text-faint)] uppercase tracking-tight opacity-80">PDF • 1.2MB</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[var(--st-glass-border)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {doc.status === 'uploaded' ? (
                    <div className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-md" style={{ color: 'var(--st-accent-success)', background: 'rgba(21,128,61,0.06)' }}>
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-[10px] font-bold text-[var(--st-text-faint)] px-2.5 py-0.5 rounded-md border border-[var(--st-glass-border)] bg-slate-50">
                      <Clock className="w-3 h-3" /> Required
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                   <button className="p-2 rounded-lg hover:bg-[var(--st-bg-blue-tint)] text-[var(--st-text-faint)] hover:text-[var(--st-text-primary)] transition-colors cursor-pointer"><Eye className="w-4 h-4" /></button>
                   <button className="p-2 rounded-lg hover:bg-[var(--st-bg-blue-tint)] text-[var(--st-text-faint)] hover:text-[var(--st-text-primary)] transition-colors cursor-pointer"><Download className="w-4 h-4" /></button>
                </div>
              </div>

              {doc.status !== 'uploaded' && (
                <button onClick={() => uploadDocument(doc.id)}
                  className="mt-6 w-full py-2.5 rounded-xl text-white text-[11px] font-bold uppercase tracking-widest transition-all shadow-sm cursor-pointer"
                  style={{ background: 'var(--st-gradient-gold)', boxShadow: '0 4px 16px rgba(224, 106, 59, 0.2)' }}>
                  Verify Now
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Intelligence Suggestions */}
      <section className="glass-card rounded-xl p-6 sm:p-10 flex flex-col md:flex-row items-center gap-6 sm:gap-10 bg-white">
         <div className="w-20 h-20 rounded-xl border border-[var(--st-glass-border)] flex items-center justify-center shadow-inner shrink-0 bg-[var(--st-bg-blue-tint)]">
            <Sparkles className="w-10 h-10 text-[var(--st-accent-gold)]" />
         </div>
         <div className="flex-1 space-y-2">
            <h3 className="text-xl font-bold text-[var(--st-text-primary)]">Intelligence Insight</h3>
            <p className="text-sm text-[var(--st-text-secondary)] leading-relaxed max-w-2xl font-medium opacity-80">
              We detected that you have 3 scholarships requiring a <strong>Community Certificate</strong>. 
              Uploading this document now will pre-verify your eligibility for all 3 paths instantly.
            </p>
         </div>
         <button className="btn-liquid-gold py-3 px-8 text-[11px] font-bold uppercase tracking-widest shrink-0 h-12 cursor-pointer">
            Resolve Requirement
         </button>
      </section>
    </div>
  );
}
