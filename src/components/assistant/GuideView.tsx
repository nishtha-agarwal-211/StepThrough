'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { Bot, Sparkles, Zap, Search, Send, ArrowRight, ShieldCheck, HelpCircle, Lightbulb, Map, Star, Terminal, Cpu, Network } from 'lucide-react';
import { useState } from 'react';

const exampleQueries = [
  "Apply for a Master's degree in Germany with a scholarship",
  "Register a drone in India as an individual",
  "Get a startup seed grant for a social impact project",
  "Process for getting a duplicate 12th marksheet from CBSE",
];

export default function GuideView() {
  const [query, setQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleGenerate = () => {
    if (!query.trim()) return;
    setIsGenerating(true);
    setTimeout(() => { setIsGenerating(false); setShowResult(true); }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Hero */}
      <div className="text-center space-y-6 pt-10">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
          className="w-20 h-20 rounded-xl flex items-center justify-center mx-auto shadow-sm animate-pulse"
          style={{ background: 'var(--st-gradient-hero)' }}>
          <Bot className="w-10 h-10 text-white" />
        </motion.div>
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-[var(--st-text-primary)]">
            Ask for any <span className="gradient-text">Roadmap</span>
          </h1>
          <p className="text-[var(--st-text-secondary)] text-base sm:text-lg max-w-2xl mx-auto font-medium opacity-90 leading-relaxed">
            Our AI Verification Engine breaks down complex administrative and civic processes into clear, step-by-step checklists instantly.
          </p>
        </div>
      </div>

      {/* Generation Interface */}
      <section className="relative">
        <div className="glass-elevated rounded-2xl p-1 overflow-hidden">
          <div className="rounded-2xl p-4 sm:p-6 md:p-8 bg-white">
            <div className="relative">
              <textarea value={query} onChange={(e) => setQuery(e.target.value)}
                placeholder="Describe your goal... e.g., 'Apply for a student scholarship' or 'Register a DPIIT startup'"
                className="w-full border rounded-xl p-4 sm:p-6 text-base font-semibold focus:outline-none transition-all min-h-[120px] resize-none pr-16 sm:pr-20 text-[var(--st-text-primary)] placeholder:text-[var(--st-text-faint)] focus:ring-4 focus:ring-[var(--st-accent-mocha)]/5"
                style={{ background: 'var(--st-bg-blue-tint)', borderColor: 'var(--st-glass-border-strong)' }}
                onFocus={(e) => { e.target.style.borderColor = 'var(--st-accent-mocha)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--st-glass-border-strong)'; }}
              />
              <button onClick={handleGenerate} disabled={isGenerating || !query.trim()}
                className="absolute right-4 bottom-4 w-12 h-12 rounded-lg flex items-center justify-center transition-all cursor-pointer shadow-sm disabled:shadow-none"
                style={isGenerating || !query.trim()
                  ? { background: 'var(--st-bg-warm)', color: 'var(--st-text-faint)' }
                  : { background: 'var(--st-gradient-gold)', color: 'white' }
                }>
                {isGenerating ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                    <Zap className="w-5 h-5" />
                  </motion.div>
                ) : (<ArrowRight className="w-6 h-6" />)}
              </button>
            </div>

            <div className="mt-8">
              <p className="text-[10px] font-bold text-[var(--st-text-faint)] uppercase tracking-[0.2em] mb-4 text-center">Suggested Prompts</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {exampleQueries.map((q, i) => (
                  <button key={i} onClick={() => setQuery(q)}
                    className="text-left p-4 rounded-xl border text-xs font-semibold text-[var(--st-text-secondary)] hover:text-[var(--st-text-primary)] hover:bg-[var(--st-bg-blue-tint)] hover:border-[var(--st-accent-gold)]/40 transition-all flex items-center gap-3 group bg-white cursor-pointer"
                    style={{ borderColor: 'var(--st-glass-border)' }}>
                    <Sparkles className="w-4 h-4 text-[var(--st-accent-gold)] opacity-70 group-hover:opacity-100 shrink-0" />
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Decorations */}
        <div className="absolute top-1/2 -translate-y-1/2 left-[-100px] w-64 h-64 blur-[80px] pointer-events-none" style={{ background: 'rgba(10, 48, 84, 0.03)' }} />
        <div className="absolute top-1/2 -translate-y-1/2 right-[-100px] w-64 h-64 blur-[80px] pointer-events-none" style={{ background: 'rgba(224, 106, 59, 0.03)' }} />
      </section>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-10 bg-slate-900/10 backdrop-blur-md">
            <div className="max-w-md w-full text-center space-y-8 bg-white p-10 rounded-2xl border border-[var(--st-glass-border-strong)] shadow-lg animate-fade">
              <div className="relative">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-24 h-24 border-2 border-dashed rounded-full mx-auto" style={{ borderColor: 'rgba(10, 48, 84, 0.2)', borderTopColor: 'var(--st-accent-gold)' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Bot className="w-10 h-10 text-[var(--st-accent-mocha)]" />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[var(--st-text-primary)]">Synthesizing Your Journey</h3>
                <div className="space-y-2 max-w-xs mx-auto">
                  {["Querying policy registries...", "Extracting document checks...", "Structuring workflow timeline..."].map((text, i) => (
                    <motion.p key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.4 }}
                      className="text-xs font-semibold text-[var(--st-text-faint)] flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-[var(--st-accent-gold)]" /> {text}
                    </motion.p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result Preview */}
      <AnimatePresence>
        {showResult && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-3 text-[var(--st-text-primary)]">
                <Map className="w-5 h-5 text-[var(--st-accent-success)]" /> Generated Roadmap
              </h2>
              <button onClick={() => setShowResult(false)} className="text-xs font-bold text-[var(--st-accent-gold)] hover:text-[#C24E22] hover:underline cursor-pointer">Clear Result</button>
            </div>

            <div className="glass-card p-8 bg-white" style={{ borderColor: 'rgba(21, 128, 61, 0.15)' }}>
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-8">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl shadow-sm border border-emerald-100" style={{ background: 'rgba(21, 128, 61, 0.06)' }}>🎯</div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-1 text-[var(--st-text-primary)]">{query}</h3>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-bold text-[var(--st-text-faint)] uppercase tracking-wider">
                    <span className="text-[var(--st-accent-success)]">6 Steps Checked</span>
                    <span>•</span><span>12-15 Days Effort</span><span>•</span><span>Moderate Action</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {["Gather Primary Identity Evidence", "Verify Academic Credentials Online", "Submit Formal Intent Application", "Undergo Document Verification Phase", "Final Portal Submission", "Post-Submission Tracking Setup"].map((step, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-[var(--st-glass-border)] group hover:border-[var(--st-accent-gold)]/30 transition-colors bg-white">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-extrabold group-hover:text-white transition-colors bg-slate-100 text-[var(--st-text-faint)] group-hover:bg-[var(--st-accent-success)]">
                      {i + 1}
                    </span>
                    <span className="text-sm font-semibold text-[var(--st-text-secondary)] group-hover:text-[var(--st-text-primary)] transition-colors">{step}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-auto text-transparent group-hover:text-[var(--st-text-faint)] transition-all" />
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <button className="btn-primary-st cursor-pointer">Activate Journey roadmap</button>
                <button className="p-3.5 rounded-xl border border-[var(--st-glass-border)] hover:bg-[var(--st-bg-blue-tint)] transition-colors bg-white cursor-pointer">
                  <Star className="w-5 h-5 text-[var(--st-accent-gold)]" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Architecture Badges */}
      <div className="flex flex-wrap items-center justify-center gap-8 opacity-40 py-6 grayscale hover:grayscale-0 transition-all cursor-default text-[var(--st-text-faint)] font-bold text-center">
        <div className="flex items-center gap-2"><Terminal className="w-4 h-4" /><span className="text-[10px] uppercase tracking-widest">LLM CORE</span></div>
        <div className="flex items-center gap-2"><Cpu className="w-4 h-4" /><span className="text-[10px] uppercase tracking-widest">NEURAL MAPPING v4</span></div>
        <div className="flex items-center gap-2"><Network className="w-4 h-4" /><span className="text-[10px] uppercase tracking-widest">REAL-TIME REGISTRY SYNC</span></div>
      </div>
    </div>
  );
}
