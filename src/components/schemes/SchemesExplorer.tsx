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
    if (d === 'easy') return { color: 'var(--st-accent-success)', bg: 'rgba(126,174,123,0.1)', border: 'rgba(126,174,123,0.15)' };
    if (d === 'moderate') return { color: 'var(--st-accent-warning)', bg: 'rgba(212,165,90,0.1)', border: 'rgba(212,165,90,0.15)' };
    return { color: 'var(--st-accent-danger)', bg: 'rgba(196,122,106,0.1)', border: 'rgba(196,122,106,0.15)' };
  };

  // ============ DETAIL VIEW ============
  if (selectedScheme) {
    return (
      <div className="max-w-5xl mx-auto animate-fade pb-20">
        {/* Back button */}
        <button
          onClick={() => { setSelectedScheme(null); setGuide(null); }}
          className="flex items-center gap-3 text-[11px] font-bold text-[var(--st-text-faint)] hover:text-[var(--st-text-primary)] uppercase tracking-widest mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Explorer
        </button>

        {/* Header */}
        <div className="glass-card p-8 sm:p-10 mb-10">
          <div className="flex flex-col sm:flex-row items-start gap-8">
            <div className="w-20 h-20 rounded-[24px] border border-[var(--st-glass-border)] flex items-center justify-center text-4xl shrink-0" style={{ background: 'var(--st-glass-surface)' }}>
              {selectedScheme.icon}
            </div>
            <div className="flex-1 min-w-0 pt-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--st-text-primary)]">{selectedScheme.title}</h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg uppercase tracking-wider" style={{ background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.2)', color: 'var(--st-accent-gold)' }}>Official Service</span>
              </div>
              <p className="text-[var(--st-text-secondary)] text-[16px] font-medium mb-6 opacity-80">{selectedScheme.tagline}</p>
              <div className="flex flex-wrap gap-3">
                <span className="text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-widest" style={{ color: getDiffColor(selectedScheme.difficulty).color, background: getDiffColor(selectedScheme.difficulty).bg, border: `1px solid ${getDiffColor(selectedScheme.difficulty).border}` }}>
                  {selectedScheme.difficulty}
                </span>
                <span className="text-[10px] font-bold px-3 py-1 rounded-lg border border-[var(--st-glass-border)] text-[var(--st-text-faint)] uppercase tracking-widest" style={{ background: 'var(--st-glass-surface)' }}>
                  <Clock className="w-3.5 h-3.5 inline mr-1.5 mb-0.5" />{selectedScheme.estimatedTime}
                </span>
                <span className="text-[10px] font-bold px-3 py-1 rounded-lg border border-[var(--st-glass-border)] text-[var(--st-text-faint)] uppercase tracking-widest" style={{ background: 'var(--st-glass-surface)' }}>
                  💰 {selectedScheme.fee}
                </span>
                <span className="text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-widest" style={{ background: 'rgba(201,169,110,0.08)', color: 'var(--st-accent-mocha)', border: '1px solid rgba(201,169,110,0.15)' }}>
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
                <span className="text-[14px] font-bold" style={{ color: 'var(--st-accent-gold)' }}>{progress}% Complete</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden border border-[var(--st-glass-border)]" style={{ background: 'var(--st-bg-deeper)' }}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full rounded-full" 
                  style={{ background: 'linear-gradient(90deg, #C9A96E, #D4B88A)' }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="glass-card p-16 text-center">
            <div className="relative inline-block mb-10">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-20 h-20 border-[3px] rounded-full"
                style={{ borderColor: 'var(--st-bg-deeper)', borderTopColor: 'var(--st-accent-gold)' }}
              />
              <Loader2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8" style={{ color: 'var(--st-accent-gold)' }} />
            </div>
            <h3 className="text-xl font-bold text-[var(--st-text-primary)] mb-3 tracking-tight">Generating Guide...</h3>
            <p className="text-[14px] font-medium text-[var(--st-text-muted)] max-w-md mx-auto leading-relaxed opacity-70">
              We're synthesizing real-time data from government portals to build your custom step-by-step roadmap.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-6">
              {['Analyzing Policy', 'Mapping Steps', 'Indexing Docs'].map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.5 }}
                  className="text-[10px] font-bold text-[var(--st-text-faint)] uppercase tracking-[0.2em] flex items-center gap-2"
                >
                  <Zap className="w-3.5 h-3.5" style={{ color: 'var(--st-accent-gold)' }} />{t}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="glass-card p-12 text-center" style={{ background: 'rgba(196,122,106,0.05)', borderColor: 'rgba(196,122,106,0.15)' }}>
            <AlertTriangle className="w-12 h-12 mx-auto mb-6" style={{ color: 'var(--st-accent-danger)' }} />
            <h3 className="text-xl font-bold text-[var(--st-text-primary)] mb-3">Guide Generation Failed</h3>
            <p className="text-[14px] font-medium text-[var(--st-text-faint)] mb-8 max-w-sm mx-auto opacity-70">{error}</p>
            <button onClick={() => loadGuide(selectedScheme)} className="btn-glass-primary">Retry Generation</button>
          </div>
        )}

        {/* Guide content */}
        {guide && (
          <div className="space-y-10">
            {/* Quick info cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {guide.officialWebsite && (
                <a href={guide.officialWebsite} target="_blank" rel="noopener noreferrer"
                  className="glass-card p-5 transition-all group overflow-hidden"
                >
                  <Globe className="w-5 h-5 mb-4" style={{ color: 'var(--st-accent-gold)' }} />
                  <p className="text-[9px] font-bold text-[var(--st-text-muted)] uppercase tracking-widest mb-1 opacity-60">Official Portal</p>
                  <p className="text-[11px] font-bold text-[var(--st-text-primary)] group-hover:text-[var(--st-accent-mocha)] truncate transition-colors">{guide.officialWebsite.replace(/https?:\/\//, '')}</p>
                </a>
              )}
              {guide.helpline && (
                <div className="glass-card p-5">
                  <MessageSquare className="w-5 h-5 text-emerald-600 mb-4" />
                  <p className="text-[9px] font-bold text-[var(--st-text-muted)] uppercase tracking-widest mb-1 opacity-60">Support Desk</p>
                  <p className="text-[11px] font-bold text-[var(--st-text-primary)] truncate">{guide.helpline}</p>
                </div>
              )}
              <div className="glass-card p-5 bg-white border border-[var(--st-glass-border)] shadow-sm">
                <Clock className="w-5 h-5 text-amber-600 mb-4" />
                <p className="text-[9px] font-bold text-[var(--st-text-muted)] uppercase tracking-widest mb-1 opacity-60">Total Effort</p>
                <p className="text-[11px] font-bold text-[var(--st-text-primary)] truncate">{guide.estimatedTime}</p>
              </div>
              <div className="glass-card p-5 bg-white border border-[var(--st-glass-border)] shadow-sm">
                <Shield className="w-5 h-5 text-[var(--st-accent-primary)] mb-4" />
                <p className="text-[9px] font-bold text-[var(--st-text-muted)] uppercase tracking-widest mb-1 opacity-60">Verification</p>
                <p className="text-[11px] font-bold text-[var(--st-text-primary)] truncate">100% Reliable</p>
              </div>
            </div>

            {/* Tab navigation */}
            <div className="flex gap-2 p-1.5 glass-panel !rounded-2xl border border-[var(--st-glass-border)]" style={{ background: 'var(--st-bg-deeper)' }}>
              {(['steps', 'documents', 'faq'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl transition-all
                    ${activeTab === tab ? 'text-[var(--st-text-primary)] border border-[var(--st-glass-border)] shadow-sm' : 'text-[var(--st-text-faint)] hover:text-[var(--st-text-primary)]'}
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
                  <div key={idx} className="glass-card overflow-hidden transition-all duration-500"
                    style={completedSteps.has(idx) ? { background: 'rgba(126,174,123,0.06)', borderColor: 'rgba(126,174,123,0.15)' } : {}}
                  >
                    <button onClick={() => setExpandedStep(expandedStep === idx ? null : idx)}
                      className="w-full p-6 sm:p-8 flex items-center gap-6 text-left group/step"
                    >
                      <button onClick={(e) => { e.stopPropagation(); toggleStep(idx); }}
                        className="w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 transition-all duration-300"
                        style={completedSteps.has(idx)
                          ? { background: 'var(--st-accent-success)', borderColor: 'var(--st-accent-success)', color: 'white', boxShadow: '0 4px 12px rgba(126,174,123,0.3)' }
                          : { background: 'var(--st-glass-surface)', borderColor: 'var(--st-glass-border)', color: 'var(--st-text-faint)' }
                        }
                      >
                        {completedSteps.has(idx) ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-xs font-bold">{step.stepNumber}</span>}
                      </button>
                      <div className="flex-1 min-w-0">
                        <h4 className={`text-[15px] font-bold transition-all ${completedSteps.has(idx) ? 'text-[var(--st-text-muted)] line-through' : 'text-[var(--st-text-primary)]'}`}>
                          {step.title}
                        </h4>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-[10px] text-[var(--st-text-faint)] font-bold uppercase tracking-widest flex items-center gap-1.5 opacity-60"><Clock className="w-3.5 h-3.5" />{step.estimatedTime}</span>
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-lg uppercase tracking-[0.15em]" style={step.mode === 'online' ? { background: 'rgba(201,169,110,0.08)', border: '1px solid rgba(201,169,110,0.15)', color: 'var(--st-accent-mocha)' } : { background: 'rgba(212,165,90,0.08)', border: '1px solid rgba(212,165,90,0.15)', color: 'var(--st-accent-warning)' }}>
                            {step.mode}
                          </span>
                        </div>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-[var(--st-text-faint)] opacity-30 transition-transform duration-500 group-hover/step:opacity-100 ${expandedStep === idx ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {expandedStep === idx && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4 }} className="overflow-hidden">
                          <div className="px-8 pb-8 pt-2 space-y-6 border-t border-[var(--st-glass-border)] ml-16 mr-8">
                            <p className="text-[14px] font-medium text-[var(--st-text-secondary)] leading-relaxed opacity-70">{step.description}</p>

                            {step.subSteps?.length > 0 && (
                              <div className="space-y-3">
                                <p className="text-[9px] font-bold text-[var(--st-text-faint)] uppercase tracking-[0.2em] opacity-60">Detailed Sequence</p>
                                <div className="space-y-2">
                                  {step.subSteps.map((ss, j) => (
                                    <div key={j} className="text-[13px] font-medium text-[var(--st-text-secondary)] flex gap-4 p-3 rounded-xl border border-[var(--st-glass-border)] group/substep transition-all shadow-sm" style={{ background: 'var(--st-glass-surface)' }}>
                                      <span className="font-bold text-[10px] mt-0.5" style={{ color: 'var(--st-accent-gold)' }}>{j + 1}</span>
                                      <span className="opacity-80">{ss}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {step.tips?.length > 0 && (
                                <div className="rounded-[20px] p-5" style={{ background: 'rgba(201,169,110,0.06)', border: '1px solid rgba(201,169,110,0.12)' }}>
                                  <p className="text-[9px] font-bold mb-3 uppercase tracking-widest flex items-center gap-2" style={{ color: 'var(--st-accent-mocha)' }}><Lightbulb className="w-4 h-4" />Pro Insights</p>
                                  <ul className="space-y-2">
                                    {step.tips.map((tip, j) => (
                                      <li key={j} className="text-[12px] font-medium text-[var(--st-text-secondary)] leading-relaxed opacity-80">• {tip}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {step.warnings?.length > 0 && (
                                <div className="rounded-[20px] p-5" style={{ background: 'rgba(196,122,106,0.06)', border: '1px solid rgba(196,122,106,0.12)' }}>
                                  <p className="text-[9px] font-bold mb-3 uppercase tracking-widest flex items-center gap-2" style={{ color: 'var(--st-accent-danger)' }}><AlertTriangle className="w-4 h-4" />Crucial Warnings</p>
                                  <ul className="space-y-2">
                                    {step.warnings.map((w, j) => (
                                      <li key={j} className="text-[12px] font-medium leading-relaxed opacity-80" style={{ color: 'var(--st-accent-danger)' }}>• {w}</li>
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
                  <div key={idx} className="glass-card p-7 group transition-all">
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 rounded-2xl border border-[var(--st-glass-border)] flex items-center justify-center text-[var(--st-text-faint)] group-hover:text-[var(--st-accent-gold)] transition-colors" style={{ background: 'var(--st-glass-surface)' }}>
                        <FileText className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-[15px] font-bold text-[var(--st-text-primary)] mb-2">{doc.name}</h4>
                        <p className="text-[12px] font-medium text-[var(--st-text-muted)] mb-6 leading-relaxed line-clamp-2 opacity-70">{doc.description}</p>
                        <div className="space-y-3">
                          <div className="rounded-xl p-4 border border-[var(--st-glass-border)]" style={{ background: 'var(--st-glass-surface)' }}>
                            <p className="text-[9px] font-bold text-[var(--st-text-faint)] uppercase tracking-widest mb-1.5 opacity-60">Acquisition Path</p>
                            <p className="text-[12px] font-medium text-[var(--st-text-secondary)] leading-relaxed opacity-80">{doc.howToGet}</p>
                          </div>
                          {doc.alternatives && (
                            <div className="rounded-xl p-4" style={{ background: 'rgba(201,169,110,0.06)', border: '1px solid rgba(201,169,110,0.12)' }}>
                              <p className="text-[9px] font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--st-accent-mocha)' }}>Valid Substitutes</p>
                              <p className="text-[12px] font-medium leading-relaxed opacity-80" style={{ color: 'var(--st-accent-mocha)' }}>{doc.alternatives}</p>
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
              <div className="space-y-3 max-w-3xl mx-auto">
                {guide.faqs.map((faq, idx) => (
                  <div key={idx} className="glass-card overflow-hidden">
                    <button onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                      className="w-full p-6 flex items-center gap-4 text-left group/faq"
                    >
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center border border-[var(--st-glass-border)] shrink-0" style={{ background: 'var(--st-glass-surface)' }}>
                        <HelpCircle className="w-4 h-4" style={{ color: 'var(--st-accent-gold)' }} />
                      </div>
                      <span className="flex-1 text-[14px] font-bold text-[var(--st-text-secondary)] group-hover/faq:text-[var(--st-text-primary)] transition-colors">{faq.question}</span>
                      <ChevronDown className={`w-5 h-5 text-[var(--st-text-faint)] opacity-30 transition-transform ${expandedFaq === idx ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {expandedFaq === idx && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <div className="px-8 pb-8 ml-12">
                            <p className="text-[14px] font-medium text-[var(--st-text-faint)] leading-relaxed border-l-2 pl-6 opacity-80" style={{ borderColor: 'rgba(201,169,110,0.3)' }}>{faq.answer}</p>
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
                <div className="glass-card p-8 shadow-sm" style={{ background: 'rgba(212,165,90,0.06)', borderColor: 'rgba(212,165,90,0.15)' }}>
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-3 mb-6" style={{ color: 'var(--st-accent-warning)' }}>
                    <AlertTriangle className="w-5 h-5" /> Critical Error Check
                  </h3>
                  <div className="space-y-3">
                    {guide.commonMistakes.map((m, i) => (
                      <div key={i} className="flex gap-3 text-[13px] font-medium leading-relaxed opacity-80" style={{ color: 'var(--st-accent-warning)' }}>
                        <span className="mt-1.5" style={{ color: 'rgba(212,165,90,0.5)' }}>•</span>
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {guide.ifRejected && (
                <div className="glass-card p-8 shadow-sm" style={{ background: 'rgba(196,122,106,0.06)', borderColor: 'rgba(196,122,106,0.15)' }}>
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-3 mb-6" style={{ color: 'var(--st-accent-danger)' }}>
                    <X className="w-5 h-5" /> Contingency Logic
                  </h3>
                  <p className="text-[13px] font-medium leading-relaxed mb-6 opacity-80" style={{ color: 'var(--st-accent-danger)' }}>{guide.ifRejected}</p>
                  {guide.complaintProcess && (
                    <div className="pt-6 border-t border-rose-200">
                      <p className="text-[9px] font-bold uppercase tracking-widest mb-2 opacity-40" style={{ color: 'var(--st-accent-danger)' }}>Complaint Protocol</p>
                      <p className="text-[13px] font-medium opacity-60" style={{ color: 'var(--st-accent-danger)' }}>{guide.complaintProcess}</p>
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
          <div className="w-16 h-16 rounded-[24px] flex items-center justify-center shadow-xl" style={{ background: 'linear-gradient(135deg, #C9A96E, #8B7355)', boxShadow: '0 8px 32px rgba(201,169,110,0.3)' }}>
            <BookOpen className="w-7 h-7 text-white" />
          </div>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--st-text-primary)] leading-tight">
          Service Intelligence <span className="gradient-text">Library</span>
        </h1>
        <p className="text-[var(--st-text-secondary)] max-w-xl mx-auto text-[16px] font-medium leading-relaxed opacity-80">
          Access comprehensive service blueprints. Select any pathway to activate an AI-generated implementation guide.
        </p>
      </div>

      {/* Search & Categories */}
      <div className="space-y-10 max-w-4xl mx-auto">
        <div className="relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--st-text-faint)] opacity-40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search schemes... (e.g. passport, aadhaar, scholarship)"
            className="w-full py-5 pl-14 pr-6 rounded-[24px] glass-panel border border-[var(--st-glass-border)] text-[15px] font-medium text-[var(--st-text-primary)] focus:outline-none focus:border-[var(--st-accent-gold)]/40 focus:shadow-md transition-all placeholder:text-[var(--st-text-faint)] shadow-sm"
            style={{ background: 'var(--st-glass-surface)' }}
          />
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide px-2">
          {schemeCategories.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-widest whitespace-nowrap transition-all border shrink-0
                ${activeCategory === cat.id
                  ? 'text-white shadow-lg'
                  : 'text-[var(--st-text-faint)] border-[var(--st-glass-border)] hover:border-[var(--st-accent-gold)]/30 hover:text-[var(--st-text-primary)] shadow-sm'
                }
              `}
              style={activeCategory === cat.id ? { background: 'linear-gradient(135deg, #C9A96E, #8B7355)', borderColor: 'transparent', boxShadow: '0 4px 16px rgba(201,169,110,0.3)' } : { background: 'var(--st-glass-surface)' }}
            >
              <span className="text-lg">{cat.icon}</span>
              {cat.label}
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-lg ml-1
                ${activeCategory === cat.id ? 'bg-white/20 text-white' : 'text-[var(--st-text-faint)]'}
              `} style={activeCategory !== cat.id ? { background: 'var(--st-glass-subtle)' } : {}}>{cat.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Schemes grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
        {filteredSchemes.map((scheme, idx) => (
          <motion.div
            key={scheme.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(idx * 0.05, 0.4) }}
          >
            <button
              onClick={() => loadGuide(scheme)}
              className="glass-card p-7 text-left group transition-all w-full h-full relative"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl border border-[var(--st-glass-border)] flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-all duration-300" style={{ background: 'var(--st-glass-surface)' }}>
                  {scheme.icon}
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <h3 className="text-[15px] font-bold text-[var(--st-text-primary)] group-hover:text-[var(--st-accent-mocha)] transition-colors leading-tight mb-1">
                    {scheme.title}
                  </h3>
                  <p className="text-[10px] text-[var(--st-text-faint)] font-bold uppercase tracking-widest truncate opacity-60">{scheme.provider}</p>
                </div>
              </div>
              <p className="text-[13px] font-medium text-[var(--st-text-secondary)] mb-8 line-clamp-2 leading-relaxed opacity-70">{scheme.tagline}</p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                  <span className="text-[8px] font-bold px-2 py-0.5 rounded-lg uppercase tracking-widest" style={{ color: getDiffColor(scheme.difficulty).color, background: getDiffColor(scheme.difficulty).bg, border: `1px solid ${getDiffColor(scheme.difficulty).border}` }}>
                    {scheme.difficulty}
                  </span>
                  <span className="text-[10px] font-bold text-[var(--st-text-faint)] uppercase tracking-widest opacity-60">
                    {scheme.fee}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-[var(--st-text-faint)] group-hover:text-white transition-all border border-[var(--st-glass-border)] shadow-sm" style={{ background: 'var(--st-glass-surface)' }}>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </button>
          </motion.div>
        ))}
      </div>

      {filteredSchemes.length === 0 && (
        <div className="text-center py-24 glass-card max-w-2xl mx-auto">
          <Search className="w-12 h-12 text-[var(--st-text-faint)] opacity-20 mx-auto mb-6" />
          <h3 className="text-xl font-bold text-[var(--st-text-faint)] mb-2 opacity-60">No Service Blueprints Found</h3>
          <p className="text-[14px] font-medium text-[var(--st-text-faint)] opacity-40">Refine your parameters or explore our global categories.</p>
        </div>
      )}
    </div>
  );
}
