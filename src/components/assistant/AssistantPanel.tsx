'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { Bot, X, Send, Sparkles, Zap, ShieldQuestion, HelpCircle, MessageSquare } from 'lucide-react';
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
    { role: 'assistant', text: `Hello ${user?.name.split(' ')[0]}! I'm your StepThrough AI Mentor. How can I guide you today?` }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: "I'm analyzing your request against our intelligence database. Based on your profile as a student from Lucknow, I recommend checking your Eligibility for PM Vidyalakshmi first. Would you like me to generate a personalized roadmap for that?" 
      }]);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isAssistantOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed right-0 top-0 h-full w-full md:w-[400px] z-[60] glass-elevated flex flex-col border-l border-white/10"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[var(--st-bg-secondary)]/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--st-gradient-hero)] flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white">AI Mentor</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Active Intelligence</span>
                </div>
              </div>
            </div>
            <button 
              onClick={toggleAssistant}
              className="p-2 rounded-xl hover:bg-white/5 transition-colors text-[var(--st-text-muted)]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg, i) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed
                    ${msg.role === 'user' 
                      ? 'bg-[var(--st-accent-primary)] text-white' 
                      : 'bg-white/5 border border-white/10 text-[var(--st-text-secondary)]'
                    }
                  `}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-white/10 bg-[var(--st-bg-primary)]">
            {messages.length < 3 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {suggestions.map((s, i) => (
                  <button 
                    key={i}
                    onClick={() => setInput(s)}
                    className="text-[10px] font-medium px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[var(--st-text-muted)] hover:text-white hover:bg-white/10 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-4 pr-12 text-sm focus:outline-none focus:border-[var(--st-accent-primary)] transition-colors"
              />
              <button 
                onClick={handleSend}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-[var(--st-gradient-hero)] flex items-center justify-center text-white"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            
            <div className="mt-4 flex items-center justify-center gap-6 opacity-40">
              <Sparkles className="w-4 h-4" />
              <Zap className="w-4 h-4" />
              <ShieldQuestion className="w-4 h-4" />
              <HelpCircle className="w-4 h-4" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
