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
      const res = await fetch(`${apiBase}/api/schemes/ask`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userMessage })
      });
      const ct = res.headers.get('content-type') || '';
      if (!res.ok || !ct.includes('application/json')) throw new Error('Backend unavailable');
      const data = await res.json();
      if (data.success && data.data?.answer) {
        setMessages(prev => [...prev, { role: 'assistant', text: data.data.answer }]);
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
            className="fixed inset-0 z-[55]"
            style={{ background: 'rgba(30,26,23,0.25)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
            onClick={toggleAssistant} />
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 h-full w-full md:w-[450px] z-[60] flex flex-col"
            style={{
              background: 'rgba(246,241,235,0.85)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              borderLeft: '1px solid var(--st-glass-border)',
              boxShadow: '0 0 80px rgba(139,115,85,0.15)'
            }}>
          {/* Header */}
          <div className="p-8 border-b border-[var(--st-glass-border)] flex items-center justify-between" style={{ background: 'rgba(246,241,235,0.6)' }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md relative" style={{ background: 'linear-gradient(135deg, #C9A96E, #8B7355)' }}>
                <Bot className="w-6 h-6 text-white" />
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2" style={{ background: 'var(--st-accent-success)', borderColor: 'var(--st-bg-base)' }} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--st-text-primary)] tracking-tight">AI Mentor</h3>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-[var(--st-text-faint)] uppercase tracking-[0.2em]">Contextual Intelligence</span>
                </div>
              </div>
            </div>
            <button onClick={toggleAssistant}
              className="p-2.5 rounded-xl hover:bg-[var(--st-glass-surface-hover)] transition-all text-[var(--st-text-faint)] hover:text-[var(--st-text-primary)] border border-[var(--st-glass-border)]">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            {messages.map((msg, i) => (
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className="max-w-[85%] p-5 rounded-2xl text-[14px] leading-relaxed whitespace-pre-wrap relative overflow-hidden shadow-sm"
                  style={msg.role === 'user'
                    ? { background: 'linear-gradient(135deg, #C9A96E, #8B7355)', color: 'white', fontWeight: 500 }
                    : { background: 'var(--st-glass-surface-hover)', border: '1px solid var(--st-glass-border)', color: 'var(--st-text-primary)', fontWeight: 500 }
                  }>
                  {msg.role === 'assistant' && (
                    <div className="absolute top-0 left-0 w-1 h-full" style={{ background: 'linear-gradient(180deg, #C9A96E, #8B7355)', opacity: 0.4 }} />
                  )}
                  {msg.text}
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                <div className="max-w-[85%] px-5 py-4 rounded-2xl border border-[var(--st-glass-border)] flex gap-2 items-center h-12 shadow-sm" style={{ background: 'var(--st-glass-surface-hover)' }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: 'var(--st-accent-gold)', animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: 'var(--st-accent-gold)', animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: 'var(--st-accent-gold)', animationDelay: '300ms' }} />
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-8 border-t border-[var(--st-glass-border)]" style={{ background: 'rgba(246,241,235,0.6)' }}>
            {messages.length < 3 && (
              <div className="mb-6 flex flex-wrap gap-2.5">
                {suggestions.map((s, i) => (
                  <button key={i} onClick={() => setInput(s)}
                    className="text-[10px] font-bold uppercase tracking-wider px-3.5 py-2 rounded-xl border border-[var(--st-glass-border)] text-[var(--st-text-faint)] hover:text-[var(--st-text-primary)] hover:border-[var(--st-accent-gold)]/30 transition-all shadow-sm"
                    style={{ background: 'var(--st-glass-surface)' }}>
                    {s}
                  </button>
                ))}
              </div>
            )}
            <div className="relative group">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                disabled={isTyping} placeholder="Ask your mentor anything..."
                className="w-full border rounded-2xl py-4 pl-5 pr-14 text-sm text-[var(--st-text-primary)] focus:outline-none transition-all placeholder:text-[var(--st-text-faint)] disabled:opacity-50"
                style={{ background: 'var(--st-glass-surface-hover)', borderColor: 'var(--st-glass-border)' }}
                onFocus={(e) => { e.target.style.borderColor = 'rgba(201,169,110,0.3)'; e.target.style.boxShadow = '0 4px 16px rgba(201,169,110,0.08)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--st-glass-border)'; e.target.style.boxShadow = 'none'; }}
              />
              <button onClick={handleSend} disabled={isTyping || !input.trim()}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center text-white disabled:text-[var(--st-text-faint)] transition-all shadow-md"
                style={isTyping || !input.trim()
                  ? { background: 'var(--st-glass-surface)', boxShadow: 'none' }
                  : { background: 'linear-gradient(135deg, #C9A96E, #8B7355)' }
                }>
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-6 flex items-center justify-center gap-8 opacity-40 text-[var(--st-text-faint)]">
              <Sparkles className="w-4 h-4" /><Zap className="w-4 h-4" /><ShieldQuestion className="w-4 h-4" /><HelpCircle className="w-4 h-4" />
            </div>
          </div>
        </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
