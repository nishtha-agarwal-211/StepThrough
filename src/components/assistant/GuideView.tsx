'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { 
  Bot, Sparkles, Zap, Search, Send, ArrowRight,
  ShieldCheck, HelpCircle, Lightbulb, Map, Star,
  Terminal, Cpu, Network
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

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
    
    // Simulate complex AI generation
    setTimeout(() => {
      setIsGenerating(false);
      setShowResult(true);
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6 pt-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 rounded-3xl bg-[var(--st-gradient-hero)] flex items-center justify-center mx-auto shadow-2xl shadow-indigo-500/30"
        >
          <Bot className="w-10 h-10 text-white" />
        </motion.div>
        
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Ask for any <span className="gradient-text">Journey.</span>
          </h1>
          <p className="text-[var(--st-text-secondary)] text-base sm:text-xl max-w-2xl mx-auto">
            Our AI Mentor can break down any complex life process into a structured, step-by-step roadmap instantly.
          </p>
        </div>
      </div>

      {/* Generation Interface */}
      <section className="relative">
        <div className="glass-elevated rounded-[40px] p-2 overflow-hidden border border-white/10 shadow-2xl">
          <div className="bg-[var(--st-bg-primary)] rounded-[38px] p-4 sm:p-6 md:p-10">
            <div className="relative">
              <textarea 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type anything you want to achieve... e.g., 'Apply for a startup grant' or 'Get an education loan'"
                className="w-full bg-white/5 border border-white/10 rounded-3xl p-4 sm:p-6 md:p-8 text-base sm:text-lg md:text-xl font-medium focus:outline-none focus:border-[var(--st-accent-primary)] transition-all min-h-[120px] sm:min-h-[150px] resize-none pr-16 sm:pr-20"
              />
              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !query.trim()}
                className={`absolute right-4 bottom-4 w-14 h-14 rounded-2xl flex items-center justify-center transition-all
                  ${isGenerating || !query.trim() 
                    ? 'bg-white/5 text-[var(--st-text-muted)]' 
                    : 'bg-[var(--st-gradient-hero)] text-white shadow-lg hover:scale-105 active:scale-95'
                  }
                `}
              >
                {isGenerating ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Zap className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <ArrowRight className="w-7 h-7" />
                )}
              </button>
            </div>

            <div className="mt-8">
              <p className="text-[10px] font-bold text-[var(--st-text-muted)] uppercase tracking-[0.2em] mb-4 text-center">Suggested Intelligent Prompts</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {exampleQueries.map((q, i) => (
                  <button 
                    key={i}
                    onClick={() => setQuery(q)}
                    className="text-left p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs font-medium text-[var(--st-text-secondary)] hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all flex items-center gap-3 group"
                  >
                    <Sparkles className="w-4 h-4 text-[var(--st-accent-amber)] opacity-50 group-hover:opacity-100" />
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Neural Decorations */}
        <div className="absolute top-1/2 -translate-y-1/2 left-[-100px] w-64 h-64 bg-indigo-500/10 blur-[80px] pointer-events-none" />
        <div className="absolute top-1/2 -translate-y-1/2 right-[-100px] w-64 h-64 bg-cyan-500/10 blur-[80px] pointer-events-none" />
      </section>

      {/* Generation Status Overlay */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] glass flex items-center justify-center p-10"
          >
            <div className="max-w-md w-full text-center space-y-8">
              <div className="relative">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="w-32 h-32 border-4 border-dashed border-[var(--st-accent-primary)]/30 rounded-full mx-auto"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Bot className="w-12 h-12 text-[var(--st-accent-primary)]" />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Synthesizing Your Journey</h3>
                <div className="space-y-2">
                  {[
                    "Analyzing government databases...",
                    "Checking eligibility parameters...",
                    "Fragmenting complex processes...",
                    "Optimizing required documentation path..."
                  ].map((text, i) => (
                    <motion.p 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.5 }}
                      className="text-sm text-[var(--st-text-muted)] flex items-center justify-center gap-2"
                    >
                      <Terminal className="w-3 h-3" /> {text}
                    </motion.p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mock Result Preview */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Map className="w-6 h-6 text-[var(--st-accent-emerald)]" />
                Generated Roadmap
              </h2>
              <button 
                onClick={() => setShowResult(false)}
                className="text-xs font-bold text-[var(--st-text-muted)] hover:text-white"
              >
                Clear Result
              </button>
            </div>

            <div className="glass-card p-8 border-[var(--st-accent-emerald)]/30">
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-3xl">🎯</div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-1">{query}</h3>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-bold text-[var(--st-text-muted)] uppercase tracking-wider">
                    <span className="text-emerald-500">6 Intelligent Steps</span>
                    <span>•</span>
                    <span>12-15 Days Estimated</span>
                    <span>•</span>
                    <span>Moderate Difficulty</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  "Gather Primary Identity Evidence",
                  "Verify Academic Credentials Online",
                  "Submit Formal Intent Application",
                  "Undergo Document Verification Phase",
                  "Final Portal Submission",
                  "Post-Submission Tracking Setup"
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 group hover:border-white/10 transition-colors">
                    <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white/40 group-hover:bg-emerald-500/20 group-hover:text-emerald-500 transition-colors">
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium text-[var(--st-text-secondary)] group-hover:text-white transition-colors">{step}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-auto text-white/0 group-hover:text-white/20 transition-all" />
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <button className="flex-1 btn-primary-st">
                  Start This Journey Now
                </button>
                <button className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <Star className="w-5 h-5 text-amber-500" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Future-Ready Architecture Badges */}
      <div className="flex flex-wrap items-center justify-center gap-8 opacity-20 py-10 grayscale hover:grayscale-0 transition-all cursor-default">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-widest">LLM-01 Core</span>
        </div>
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Neural Mapping v4</span>
        </div>
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Real-time DB Sync</span>
        </div>
      </div>
    </div>
  );
}
