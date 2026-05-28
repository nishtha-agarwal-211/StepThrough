'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { Bot, X, Send, Sparkles, Zap, ShieldQuestion, HelpCircle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const suggestions = [
  "How do I apply for a passport?",
  "Am I eligible for PM Vidyalakshmi?",
  "What documents do I need for NSDC?",
  "Find scholarships for B.Tech students",
];

export default function AssistantPanel() {
  const { isAssistantOpen, toggleAssistant, user } = useAppStore();
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', text: string}[]>([
    { role: 'assistant', text: `Hello ${user?.name?.split(' ')[0] || 'there'}! I'm your StepThrough AI Mentor. How can I guide you today?` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); };
  useEffect(() => { scrollToBottom(); }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput(''); setIsTyping(true);
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || '';
      let res;
      let usingLocalFallback = false;
      
      try {
        res = await fetch(`${apiBase}/api/schemes/ask`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question: userMessage }),
          signal: AbortSignal.timeout(6000) // 6-second timeout for Hugging Face wake check
        });
        const ct = res.headers.get('content-type') || '';
        if (!res.ok || !ct.includes('application/json')) {
          throw new Error('HF backend returned status ' + res.status);
        }
      } catch (hfErr) {
        if (apiBase) {
          console.warn('HF Space connection failed, falling back to Next.js local search:', hfErr);
          usingLocalFallback = true;
          res = await fetch(`/api/schemes/ask`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: userMessage })
          });
          const ct = res.headers.get('content-type') || '';
          if (!res.ok || !ct.includes('application/json')) {
            throw new Error('Local fallback failed');
          }
        } else {
          throw hfErr;
        }
      }

      const data = await res.json();
      if (data.success && data.data?.answer) {
        let answer = data.data.answer;
        if (usingLocalFallback) {
          answer = "⚡ *(Hugging Face Space is waking up. Serving response via local search fallback)*\n\n" + answer;
        }
        setMessages(prev => [...prev, { role: 'assistant', text: answer }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', text: "I'm sorry, I couldn't process your request right now. Please try again." }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', text: "I'm having trouble connecting to my servers. Please ensure the backend is running." }]);
    } finally { setIsTyping(false); }
  };

  return (
    <AnimatePresence>
      {isAssistantOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[55] cursor-pointer"
            style={{ background: 'rgba(15,23,42,0.3)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
            onClick={toggleAssistant} />
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 h-full w-full md:w-[450px] z-[60] flex flex-col"
            style={{
              background: 'rgba(250,250,249,0.98)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              borderLeft: '1px solid var(--st-glass-border)',
              boxShadow: '0 0 40px rgba(15,23,42,0.08)'
            }}>
          {/* Header */}
          <div className="p-6 border-b border-[var(--st-glass-border)] flex items-center justify-between" style={{ background: 'rgba(250,250,249,0.8)' }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm relative animate-pulse" style={{ background: 'var(--st-gradient-hero)' }}>
                <Bot className="w-6 h-6 text-white" />
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white" style={{ background: 'var(--st-accent-success)' }} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--st-text-primary)] tracking-tight">AI Mentor</h3>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-[var(--st-text-faint)] uppercase tracking-[0.2em]">Certified Assistant</span>
                </div>
              </div>
            </div>
            <button onClick={toggleAssistant}
              className="p-2.5 rounded-xl hover:bg-[var(--st-bg-blue-tint)] transition-all text-[var(--st-text-faint)] hover:text-[var(--st-text-primary)] border border-[var(--st-glass-border-strong)] cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg, i) => (
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className="max-w-[85%] p-4 rounded-xl text-[14px] leading-relaxed whitespace-pre-wrap relative overflow-hidden shadow-sm border border-slate-100"
                  style={msg.role === 'user'
                    ? { background: 'var(--st-gradient-hero)', color: 'white', fontWeight: 500 }
                    : { background: '#FFFFFF', border: '1px solid var(--st-glass-border-strong)', color: 'var(--st-text-primary)', fontWeight: 500 }
                  }>
                  {msg.role === 'assistant' && (
                    <div className="absolute top-0 left-0 w-1 h-full" style={{ background: 'var(--st-gradient-gold)', opacity: 0.8 }} />
                  )}
                  {msg.text}
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                <div className="max-w-[85%] px-5 py-4 rounded-xl border border-[var(--st-glass-border)] flex gap-2 items-center h-12 shadow-sm bg-white">
                  <span className="w-1.5 h-1.5 rounded-full animate-bounce bg-[var(--st-accent-mocha)]" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full animate-bounce bg-[var(--st-accent-mocha)]" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full animate-bounce bg-[var(--st-accent-mocha)]" style={{ animationDelay: '300ms' }} />
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-[var(--st-glass-border)] bg-slate-50" style={{ background: 'rgba(250,250,249,0.8)' }}>
            {messages.length < 3 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {suggestions.map((s, i) => (
                  <button key={i} onClick={() => setInput(s)}
                    className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border border-[var(--st-glass-border-strong)] text-[var(--st-text-secondary)] hover:text-[var(--st-text-primary)] hover:border-[var(--st-accent-mocha)]/40 hover:bg-[var(--st-bg-blue-tint)] transition-all shadow-sm bg-white cursor-pointer">
                    {s}
                  </button>
                ))}
              </div>
            )}
            <div className="relative group">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                disabled={isTyping} placeholder="Ask your mentor anything..."
                className="w-full border rounded-xl py-3.5 pl-4 pr-14 text-sm text-[var(--st-text-primary)] focus:outline-none transition-all placeholder:text-[var(--st-text-faint)] disabled:opacity-50"
                style={{ background: '#FFFFFF', borderColor: 'var(--st-glass-border-strong)' }}
                onFocus={(e) => { e.target.style.borderColor = 'var(--st-accent-mocha)'; e.target.style.boxShadow = '0 0 0 3px rgba(10,48,84,0.08)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--st-glass-border-strong)'; e.target.style.boxShadow = 'none'; }}
              />
              <button onClick={handleSend} disabled={isTyping || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg flex items-center justify-center text-white disabled:text-[var(--st-text-faint)] transition-all shadow-sm cursor-pointer"
                style={isTyping || !input.trim()
                  ? { background: 'var(--st-bg-warm)', boxShadow: 'none' }
                  : { background: 'var(--st-gradient-gold)' }
                }>
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-4 flex items-center justify-center gap-6 opacity-30 text-[var(--st-text-faint)]">
              <Sparkles className="w-4 h-4" /><Zap className="w-4 h-4" /><ShieldQuestion className="w-4 h-4" /><HelpCircle className="w-4 h-4" />
            </div>
          </div>
        </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
