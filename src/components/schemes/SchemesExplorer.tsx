'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, ArrowRight, Clock, Shield, Globe, BookOpen, ArrowLeft,
  AlertTriangle, CheckCircle2, Lightbulb,
  MessageSquare, Zap, X, Loader2, FileText,
  HelpCircle, ChevronDown, ChevronRight
} from 'lucide-react';
import { allSchemes, schemeCategories, SchemeItem } from '@/lib/schemes-data';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

interface GeneratedGuide {
  title: string;
  category: string;
  icon: string;
  tagline: string;
  officialWebsite: string;
  helpline: string;
  fee: string;
  estimatedTime: string;
  difficulty: string;
  eligibility: string[];
  requiredDocuments: { name: string; description: string; howToGet: string; alternatives: string }[];
  steps: {
    stepNumber: number;
    title: string;
    description: string;
    subSteps: string[];
    tips: string[];
    warnings: string[];
    estimatedTime: string;
    mode: string;
  }[];
  commonMistakes: string[];
  ifRejected: string;
  complaintProcess: string;
  faqs: { question: string; answer: string }[];
  relatedSchemes: string[];
}

export default function SchemesExplorer() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScheme, setSelectedScheme] = useState<SchemeItem | null>(null);
  const [guide, setGuide] = useState<GeneratedGuide | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedStep, setExpandedStep] = useState<number | null>(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'steps' | 'documents' | 'faq'>('steps');
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const filteredSchemes = allSchemes.filter(s => {
    const matchesCat = activeCategory === 'all' || s.category === activeCategory;
    const matchesSearch = !searchQuery || 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const loadGuide = useCallback(async (scheme: SchemeItem) => {
    setSelectedScheme(scheme);
    setGuide(null);
    setLoading(true);
    setError('');
    setCompletedSteps(new Set());
    setExpandedStep(0);
    setActiveTab('steps');

    try {
      const res = await fetch(`${BACKEND_URL}/api/schemes/generate/${scheme.slug}`);
      const ct = res.headers.get('content-type') || '';
      if (!res.ok || !ct.includes('application/json')) {
        setError('Backend unavailable — please start the server on port 5001.');
        return;
      }
      const data = await res.json();
      if (data.success) {
        setGuide(data.data);
      } else {
        setError(data.message || 'Failed to generate guide');
      }
    } catch (err: any) {
      setError('Could not connect to server. Make sure the backend is running on port 5001.');
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleStep = (idx: number) => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx); else next.add(idx);
      return next;
    });
  };

  const progress = guide ? Math.round((completedSteps.size / guide.steps.length) * 100) : 0;

  const getDiffColor = (d: string) => {
    if (d === 'easy') return { color: 'var(--st-accent-success)', bg: 'rgba(21,128,61,0.06)', border: 'rgba(21,128,61,0.15)' };
    if (d === 'moderate') return { color: 'var(--st-accent-warning)', bg: 'rgba(180,83,9,0.06)', border: 'rgba(180,83,9,0.15)' };
    return { color: 'var(--st-accent-danger)', bg: 'rgba(220,38,38,0.06)', border: 'rgba(220,38,38,0.15)' };
  };

  // ============ DETAIL VIEW ============
  if (selectedScheme) {
    return (
      <div className="max-w-5xl mx-auto animate-fade pb-20">
        {/* Back button */}
        <button
          onClick={() => { setSelectedScheme(null); setGuide(null); }}
          className="flex items-center gap-3 text-[11px] font-bold text-[var(--st-text-faint)] hover:text-[var(--st-text-primary)] uppercase tracking-widest mb-10 group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Explorer
        </button>

        {/* Header */}
        <div className="glass-card p-8 sm:p-10 mb-10 bg-white">
          <div className="flex flex-col sm:flex-row items-start gap-8">
            <div className="w-20 h-20 rounded-xl border border-[var(--st-glass-border)] flex items-center justify-center text-4xl shrink-0 bg-[var(--st-bg-blue-tint)] shadow-sm">
              {selectedScheme.icon}
            </div>
            <div className="flex-1 min-w-0 pt-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--st-text-primary)] leading-tight">{selectedScheme.title}</h1>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-lg uppercase tracking-wider" style={{ background: 'rgba(224, 106, 59, 0.06)', border: '1px solid rgba(224, 106, 59, 0.15)', color: 'var(--st-accent-gold)' }}>Official Portal</span>
              </div>
              <p className="text-[var(--st-text-secondary)] text-[15px] font-medium mb-6 opacity-90 leading-relaxed">{selectedScheme.tagline}</p>
              <div className="flex flex-wrap gap-3">
                <span className="text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-widest border" style={{ color: getDiffColor(selectedScheme.difficulty).color, background: getDiffColor(selectedScheme.difficulty).bg, borderColor: getDiffColor(selectedScheme.difficulty).border }}>
                  {selectedScheme.difficulty}
                </span>
                <span className="text-[10px] font-bold px-3 py-1 rounded-lg border border-[var(--st-glass-border-strong)] text-[var(--st-text-muted)] uppercase tracking-widest bg-slate-50">
                  <Clock className="w-3.5 h-3.5 inline mr-1.5 mb-0.5" />{selectedScheme.estimatedTime}
                </span>
                <span className="text-[10px] font-bold px-3 py-1 rounded-lg border border-[var(--st-glass-border-strong)] text-[var(--st-text-muted)] uppercase tracking-widest bg-slate-50">
                  💰 {selectedScheme.fee}
                </span>
                <span className="text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-widest border" style={{ background: 'rgba(10, 48, 84, 0.05)', color: 'var(--st-accent-mocha)', borderColor: 'rgba(10, 48, 84, 0.15)' }}>
                  {selectedScheme.provider}
                </span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          {guide && (
            <div className="mt-10 pt-10 border-t border-[var(--st-glass-border)]">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-bold text-[var(--st-text-faint)] uppercase tracking-[0.2em]">Application Journey</span>
                <span className="text-[14px] font-bold text-[var(--st-accent-gold)]">{progress}% Complete</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden border border-[var(--st-glass-border)] bg-slate-100">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full rounded-full" 
                  style={{ background: 'var(--st-gradient-gold)' }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="glass-card p-16 text-center bg-white">
            <div className="relative inline-block mb-8">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 border-[3px] rounded-full"
                style={{ borderColor: 'var(--st-bg-deeper)', borderTopColor: 'var(--st-accent-mocha)' }}
              />
              <Loader2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-[var(--st-accent-mocha)]" />
            </div>
            <h3 className="text-xl font-bold text-[var(--st-text-primary)] mb-2 tracking-tight">Generating Blueprint Roadmap...</h3>
            <p className="text-sm font-medium text-[var(--st-text-muted)] max-w-md mx-auto leading-relaxed opacity-90">
              We are synthesizing live database policies to construct your certified step-by-step verification pipeline.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-6">
              {['Parsing Policy Document', 'Validating Rulesets', 'Building Step Timelines'].map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.4 }}
                  className="text-[10px] font-bold text-[var(--st-text-faint)] uppercase tracking-[0.2em] flex items-center gap-2"
                >
                  <Zap className="w-3.5 h-3.5 text-[var(--st-accent-gold)]" />{t}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="glass-card p-12 text-center bg-white" style={{ background: 'rgba(220,38,38,0.02)', borderColor: 'rgba(220,38,38,0.1)' }}>
            <AlertTriangle className="w-12 h-12 mx-auto mb-6 text-[var(--st-accent-danger)]" />
            <h3 className="text-xl font-bold text-[var(--st-text-primary)] mb-3">System Connection Error</h3>
            <p className="text-sm font-medium text-[var(--st-text-faint)] mb-8 max-w-sm mx-auto opacity-90">{error}</p>
            <button onClick={() => loadGuide(selectedScheme)} className="btn-glass-primary cursor-pointer">Retry Connection</button>
          </div>
        )}

        {/* Guide content */}
        {guide && (
          <div className="space-y-10">
            {/* Quick info cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {guide.officialWebsite && (
                <a href={guide.officialWebsite} target="_blank" rel="noopener noreferrer"
                  className="glass-card p-5 transition-all group overflow-hidden bg-white cursor-pointer"
                >
                  <Globe className="w-5 h-5 mb-4 text-[var(--st-accent-mocha)] group-hover:text-[var(--st-accent-gold)] transition-colors" />
                  <p className="text-[9px] font-bold text-[var(--st-text-muted)] uppercase tracking-widest mb-1 opacity-80">Official Portal</p>
                  <p className="text-[11px] font-bold text-[var(--st-text-primary)] group-hover:text-[var(--st-accent-gold)] truncate transition-colors">{guide.officialWebsite.replace(/https?:\/\//, '')}</p>
                </a>
              )}
              {guide.helpline && (
                <div className="glass-card p-5 bg-white">
                  <MessageSquare className="w-5 h-5 text-emerald-600 mb-4" />
                  <p className="text-[9px] font-bold text-[var(--st-text-muted)] uppercase tracking-widest mb-1 opacity-80">Support Desk</p>
                  <p className="text-[11px] font-bold text-[var(--st-text-primary)] truncate">{guide.helpline}</p>
                </div>
              )}
              <div className="glass-card p-5 bg-white">
                <Clock className="w-5 h-5 text-amber-600 mb-4" />
                <p className="text-[9px] font-bold text-[var(--st-text-muted)] uppercase tracking-widest mb-1 opacity-80">Total Effort</p>
                <p className="text-[11px] font-bold text-[var(--st-text-primary)] truncate">{guide.estimatedTime}</p>
              </div>
              <div className="glass-card p-5 bg-white">
                <Shield className="w-5 h-5 text-blue-600 mb-4" />
                <p className="text-[9px] font-bold text-[var(--st-text-muted)] uppercase tracking-widest mb-1 opacity-80">Verification</p>
                <p className="text-[11px] font-bold text-[var(--st-text-primary)] truncate">100% Reliable</p>
              </div>
            </div>

            {/* Tab navigation */}
            <div className="flex gap-2 p-1.5 rounded-xl border border-[var(--st-glass-border)] bg-[var(--st-bg-warm)] shadow-sm">
              {(['steps', 'documents', 'faq'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-[0.2em] rounded-lg transition-all cursor-pointer
                    ${activeTab === tab ? 'bg-white text-[var(--st-text-primary)] shadow-sm border border-[var(--st-glass-border)]' : 'text-[var(--st-text-faint)] hover:text-[var(--st-text-primary)]'}
                  `}
                >
                  {tab === 'steps' ? `Workflow (${guide.steps.length})` : tab === 'documents' ? `Evidence (${guide.requiredDocuments.length})` : `Intel (${guide.faqs?.length || 0})`}
                </button>
              ))}
            </div>

            {/* Steps tab */}
            {activeTab === 'steps' && (
              <div className="space-y-4">
                {guide.steps.map((step, idx) => (
                  <div key={idx} className="glass-card overflow-hidden transition-all duration-300 bg-white"
                    style={completedSteps.has(idx) ? { background: 'rgba(21,128,61,0.03)', borderColor: 'rgba(21,128,61,0.15)' } : {}}
                  >
                    <button onClick={() => setExpandedStep(expandedStep === idx ? null : idx)}
                      className="w-full p-6 sm:p-7 flex items-center gap-6 text-left group/step cursor-pointer"
                    >
                      <button onClick={(e) => { e.stopPropagation(); toggleStep(idx); }}
                        className="w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 transition-all duration-300 cursor-pointer"
                        style={completedSteps.has(idx)
                          ? { background: 'var(--st-accent-success)', borderColor: 'var(--st-accent-success)', color: 'white', boxShadow: '0 4px 12px rgba(21,128,61,0.15)' }
                          : { background: '#FFFFFF', borderColor: 'var(--st-glass-border-strong)', color: 'var(--st-text-faint)' }
                        }
                      >
                        {completedSteps.has(idx) ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-xs font-bold">{step.stepNumber}</span>}
                      </button>
                      <div className="flex-1 min-w-0">
                        <h4 className={`text-[15px] font-bold transition-all ${completedSteps.has(idx) ? 'text-[var(--st-text-muted)] line-through' : 'text-[var(--st-text-primary)]'}`}>
                          {step.title}
                        </h4>
                        <div className="flex items-center gap-4 mt-1.5">
                          <span className="text-[10px] text-[var(--st-text-faint)] font-bold uppercase tracking-widest flex items-center gap-1.5 opacity-80"><Clock className="w-3.5 h-3.5 text-[var(--st-accent-gold)]" />{step.estimatedTime}</span>
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-lg uppercase tracking-[0.15em]" style={step.mode === 'online' ? { background: 'rgba(10, 48, 84, 0.05)', border: '1px solid rgba(10, 48, 84, 0.15)', color: 'var(--st-accent-mocha)' } : { background: 'rgba(180, 83, 9, 0.05)', border: '1px solid rgba(180, 83, 9, 0.15)', color: 'var(--st-accent-warning)' }}>
                            {step.mode}
                          </span>
                        </div>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-[var(--st-text-faint)] opacity-50 transition-transform duration-300 group-hover/step:opacity-100 ${expandedStep === idx ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {expandedStep === idx && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                          <div className="px-8 pb-8 pt-2 space-y-6 border-t border-[var(--st-glass-border)] ml-16 mr-8">
                            <p className="text-sm font-medium text-[var(--st-text-secondary)] leading-relaxed opacity-90">{step.description}</p>

                            {step.subSteps?.length > 0 && (
                              <div className="space-y-3">
                                <p className="text-[9px] font-bold text-[var(--st-text-faint)] uppercase tracking-[0.2em] opacity-80">Sequence flow</p>
                                <div className="space-y-2">
                                  {step.subSteps.map((ss, j) => (
                                    <div key={j} className="text-xs font-semibold text-[var(--st-text-secondary)] flex gap-4 p-3 rounded-lg border border-[var(--st-glass-border)] bg-slate-50/50" style={{ background: '#FFFFFF' }}>
                                      <span className="font-bold text-[10px] mt-0.5 text-[var(--st-accent-gold)]">{j + 1}</span>
                                      <span className="opacity-90">{ss}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                              {step.tips?.length > 0 && (
                                <div className="rounded-xl p-5 bg-orange-50/40 border border-orange-100">
                                  <p className="text-[9px] font-bold mb-3 uppercase tracking-widest flex items-center gap-2 text-[var(--st-accent-gold)]"><Lightbulb className="w-4 h-4" />Pro Insights</p>
                                  <ul className="space-y-2">
                                    {step.tips.map((tip, j) => (
                                      <li key={j} className="text-xs font-semibold text-[var(--st-text-secondary)] leading-relaxed opacity-90">• {tip}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {step.warnings?.length > 0 && (
                                <div className="rounded-xl p-5 bg-rose-50/40 border border-rose-100">
                                  <p className="text-[9px] font-bold mb-3 uppercase tracking-widest flex items-center gap-2 text-[var(--st-accent-danger)]"><AlertTriangle className="w-4 h-4" />Warnings</p>
                                  <ul className="space-y-2">
                                    {step.warnings.map((w, j) => (
                                      <li key={j} className="text-xs font-semibold leading-relaxed opacity-90 text-[var(--st-accent-danger)]">• {w}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}

            {/* Documents tab */}
            {activeTab === 'documents' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {guide.requiredDocuments.map((doc, idx) => (
                  <div key={idx} className="glass-card p-6 bg-white group transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl border border-[var(--st-glass-border)] flex items-center justify-center text-[var(--st-text-faint)] group-hover:text-[var(--st-accent-gold)] transition-colors bg-[var(--st-bg-blue-tint)]">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[15px] font-bold text-[var(--st-text-primary)] mb-1">{doc.name}</h4>
                        <p className="text-xs font-semibold text-[var(--st-text-muted)] mb-5 leading-relaxed line-clamp-2 opacity-80">{doc.description}</p>
                        <div className="space-y-2">
                          <div className="rounded-lg p-3.5 border border-[var(--st-glass-border)] bg-[var(--st-bg-blue-tint)]">
                            <p className="text-[8px] font-bold text-[var(--st-text-faint)] uppercase tracking-widest mb-1 opacity-80">How to get</p>
                            <p className="text-xs font-semibold text-[var(--st-text-secondary)] leading-relaxed opacity-95">{doc.howToGet}</p>
                          </div>
                          {doc.alternatives && (
                            <div className="rounded-lg p-3.5 bg-orange-50/40 border border-orange-100/70">
                              <p className="text-[8px] font-bold uppercase tracking-widest mb-1 text-[var(--st-accent-gold)]">Acceptable substitutes</p>
                              <p className="text-xs font-semibold leading-relaxed opacity-95 text-[var(--st-accent-gold)]">{doc.alternatives}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* FAQ tab */}
            {activeTab === 'faq' && guide.faqs && (
              <div className="space-y-3 max-w-3xl mx-auto w-full">
                {guide.faqs.map((faq, idx) => (
                  <div key={idx} className="glass-card overflow-hidden bg-white">
                    <button onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                      className="w-full p-5 flex items-center gap-4 text-left group/faq cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-[var(--st-glass-border)] shrink-0 bg-slate-50">
                        <HelpCircle className="w-4 h-4 text-[var(--st-accent-gold)]" />
                      </div>
                      <span className="flex-1 text-sm font-bold text-[var(--st-text-secondary)] group-hover/faq:text-[var(--st-text-primary)] transition-colors">{faq.question}</span>
                      <ChevronDown className={`w-5 h-5 text-[var(--st-text-faint)] opacity-50 transition-transform ${expandedFaq === idx ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {expandedFaq === idx && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <div className="px-6 pb-6 ml-12">
                            <p className="text-xs font-semibold text-[var(--st-text-muted)] leading-relaxed border-l-2 pl-4 opacity-90 border-[var(--st-accent-mocha)]/20">{faq.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}

            {/* Risk Management */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
              {guide.commonMistakes?.length > 0 && (
                <div className="glass-card p-6 bg-white" style={{ background: 'rgba(180, 83, 9, 0.02)', borderColor: 'rgba(180, 83, 9, 0.12)' }}>
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2.5 mb-5 text-[var(--st-accent-warning)]">
                    <AlertTriangle className="w-5 h-5" /> Critical Error Check
                  </h3>
                  <div className="space-y-3">
                    {guide.commonMistakes.map((m, i) => (
                      <div key={i} className="flex gap-3 text-xs font-semibold leading-relaxed opacity-95 text-[var(--st-accent-warning)]">
                        <span className="mt-1" style={{ color: 'rgba(180, 83, 9, 0.4)' }}>•</span>
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {guide.ifRejected && (
                <div className="glass-card p-6 bg-white" style={{ background: 'rgba(220, 38, 38, 0.02)', borderColor: 'rgba(220, 38, 38, 0.12)' }}>
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2.5 mb-5 text-[var(--st-accent-danger)]">
                    <X className="w-5 h-5" /> Contingency Logic
                  </h3>
                  <p className="text-xs font-semibold leading-relaxed mb-5 opacity-95 text-[var(--st-accent-danger)]">{guide.ifRejected}</p>
                  {guide.complaintProcess && (
                    <div className="pt-4 border-t border-rose-100">
                      <p className="text-[9px] font-bold uppercase tracking-widest mb-1.5 text-[var(--st-accent-danger)] opacity-80">Complaint Protocol</p>
                      <p className="text-[11px] font-medium opacity-80 text-[var(--st-accent-danger)]">{guide.complaintProcess}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ============ BROWSE VIEW ============
  return (
    <div className="space-y-12 animate-fade pb-20">
      {/* Hero */}
      <div className="text-center space-y-6 pt-10">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 rounded-xl flex items-center justify-center shadow-md shadow-orange-500/10" style={{ background: 'var(--st-gradient-gold)' }}>
            <BookOpen className="w-7 h-7 text-white" />
          </div>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--st-text-primary)] leading-tight">
          National Schemes <span className="gradient-text">Library</span>
        </h1>
        <p className="text-[var(--st-text-secondary)] max-w-xl mx-auto text-[16px] font-medium leading-relaxed opacity-90">
          Access comprehensive, officially verified service roadmaps. Select any scheme to generate your customized AI-powered implementation checklist.
        </p>
      </div>

      {/* Search & Categories */}
      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--st-text-faint)] opacity-80" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search schemes... (e.g. passport, scholarship, pm kisan)"
            className="w-full py-4.5 pl-14 pr-6 rounded-xl border border-[var(--st-glass-border-strong)] text-[15px] font-semibold text-[var(--st-text-primary)] focus:outline-none focus:border-[var(--st-accent-mocha)] focus:ring-4 focus:ring-[var(--st-accent-mocha)]/5 transition-all bg-white placeholder:text-[var(--st-text-faint)] shadow-sm"
          />
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide px-2">
          {schemeCategories.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all border shrink-0 cursor-pointer
                ${activeCategory === cat.id
                  ? 'text-white shadow-sm'
                  : 'text-[var(--st-text-faint)] border-[var(--st-glass-border-strong)] hover:border-[var(--st-accent-mocha)]/40 hover:text-[var(--st-text-primary)] shadow-sm bg-white'
                }
              `}
              style={activeCategory === cat.id ? { background: 'var(--st-gradient-hero)', borderColor: 'transparent' } : {}}
            >
              <span className="text-lg">{cat.icon}</span>
              {cat.label}
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-lg ml-1
                ${activeCategory === cat.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-[var(--st-text-muted)]'}
              `}>{cat.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Schemes grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
        {filteredSchemes.map((scheme, idx) => (
          <motion.div
            key={scheme.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(idx * 0.04, 0.3) }}
          >
            <button
              onClick={() => loadGuide(scheme)}
              className="glass-card p-6 text-left group transition-all w-full h-full relative cursor-pointer flex flex-col bg-white"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl border border-[var(--st-glass-border)] flex items-center justify-center text-2.5xl shrink-0 group-hover:scale-105 transition-all duration-300 bg-[var(--st-bg-blue-tint)] shadow-sm" style={{ fontSize: '1.5rem' }}>
                  {scheme.icon}
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <h3 className="text-[15px] font-bold text-[var(--st-text-primary)] group-hover:text-[var(--st-accent-gold)] transition-colors leading-snug mb-1">
                    {scheme.title}
                  </h3>
                  <p className="text-[9px] text-[var(--st-text-faint)] font-bold uppercase tracking-widest truncate opacity-80">{scheme.provider}</p>
                </div>
              </div>
              <p className="text-xs font-semibold text-[var(--st-text-secondary)] mb-6 line-clamp-2 leading-relaxed opacity-85">{scheme.tagline}</p>
              
              <div className="flex items-center justify-between mt-auto w-full pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-widest" style={{ color: getDiffColor(scheme.difficulty).color, background: getDiffColor(scheme.difficulty).bg, border: `1px solid ${getDiffColor(scheme.difficulty).border}` }}>
                    {scheme.difficulty}
                  </span>
                  <span className="text-[9px] font-bold text-[var(--st-text-faint)] uppercase tracking-widest opacity-80">
                    {scheme.fee}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--st-text-faint)] group-hover:text-white transition-all border border-[var(--st-glass-border-strong)] shadow-sm bg-slate-50 group-hover:bg-[var(--st-accent-gold)] group-hover:border-transparent" style={{ transition: 'all 0.2s ease' }}>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </button>
          </motion.div>
        ))}
      </div>

      {filteredSchemes.length === 0 && (
        <div className="text-center py-20 glass-card max-w-2xl mx-auto bg-white">
          <Search className="w-12 h-12 text-[var(--st-text-faint)] opacity-30 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-[var(--st-text-secondary)] mb-1 opacity-80">No Schemes Found</h3>
          <p className="text-xs font-medium text-[var(--st-text-faint)] opacity-60">Refine your search parameters or select a different category catalog.</p>
        </div>
      )}
    </div>
  );
}
