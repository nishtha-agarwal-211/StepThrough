'use client';

import React from 'react';
import Sidebar from './Sidebar';
import { useAppStore } from '@/lib/store';
import { Bell, Search, HelpCircle, Bot, Zap, Menu, Command } from 'lucide-react';
import AssistantPanel from '../assistant/AssistantPanel';

interface ShellProps {
  children: React.ReactNode;
  noPadding?: boolean;
}

export default function Shell({ children, noPadding = false }: ShellProps) {
  const { isSidebarOpen, isAssistantOpen, toggleAssistant, toggleSidebar } = useAppStore();

  return (
    <div className="flex min-h-screen text-[var(--st-text-primary)] selection:bg-[var(--st-accent-gold)] selection:text-white">
      <Sidebar />
      
      <main 
        className={`flex-1 transition-all duration-500 ease-[var(--st-ease)] flex flex-col min-h-screen
          ml-0 ${isSidebarOpen ? 'md:ml-[260px]' : 'md:ml-[72px]'}
        `}
      >
        {/* Global Header — Liquid Glass */}
        <header className="h-16 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 header-liquid">
          <div className="flex items-center gap-6 flex-1">
            <button 
              onClick={toggleSidebar}
              className="md:hidden p-2 text-[var(--st-text-muted)] hover:text-[var(--st-text-primary)] hover:bg-[rgba(201,169,110,0.08)] rounded-lg transition-all"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Search Bar — Liquid Glass */}
              <div className="relative max-w-md w-full hidden sm:block group">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--st-text-faint)] group-focus-within:text-[var(--st-accent-gold)] transition-colors z-10" />
                <input 
                  type="text" 
                  placeholder="Search pathways..."
                  className="input-liquid w-full py-2.5 pl-10 pr-12 text-sm placeholder:text-[var(--st-text-faint)]"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded-md border border-[var(--st-glass-border)] bg-[rgba(255,255,255,0.4)] text-[10px] font-medium text-[var(--st-text-faint)]">
                  <Command className="w-2.5 h-2.5" /> K
                </div>
              </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 text-[var(--st-text-muted)] hover:text-[var(--st-text-primary)] hover:bg-[rgba(201,169,110,0.08)] rounded-lg transition-all">
              <HelpCircle className="w-5 h-5" />
            </button>
            <button className="p-2 text-[var(--st-text-muted)] hover:text-[var(--st-text-primary)] hover:bg-[rgba(201,169,110,0.08)] rounded-lg transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[var(--st-accent-gold)] rounded-full border-2 border-[var(--st-bg-base)]"></span>
            </button>
            
            <div className="h-6 w-px bg-[var(--st-glass-border)] mx-2" />
            
            <button 
              onClick={toggleAssistant}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all
                ${isAssistantOpen 
                  ? 'bg-[var(--st-gradient-hero)] text-[var(--st-text-on-accent)] shadow-lg shadow-[var(--st-accent-gold)]/20' 
                  : 'bg-[var(--st-glass-surface)] backdrop-blur-sm border border-[var(--st-glass-border)] text-[var(--st-text-secondary)] hover:border-[var(--st-accent-gold)]/30 hover:bg-[var(--st-glass-surface-hover)] shadow-sm'}
              `}
              style={isAssistantOpen ? { background: 'linear-gradient(135deg, #C9A96E 0%, #8B7355 100%)' } : {}}
            >
              <Bot className="w-4 h-4" />
              <span className="hidden sm:inline">Assistant</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className={`flex-1 w-full ${noPadding ? '' : 'px-4 sm:px-8 py-8 sm:py-12 max-w-[1440px] mx-auto'}`}>
          {children}
        </div>
        
        {/* Footer — Warm Glass */}
        <footer className="px-8 py-10 border-t border-[var(--st-glass-border)] bg-[var(--st-glass-subtle)]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #C9A96E, #8B7355)' }}>
                <Zap className="w-3 h-3 text-white" />
              </div>
              <span className="text-[11px] font-bold text-[var(--st-text-faint)] uppercase tracking-widest">Navigation Engine v2.0</span>
            </div>
            <div className="flex items-center gap-8 text-xs font-medium text-[var(--st-text-muted)]">
              {/* Footer links disabled as they are not currently implemented */}
            </div>
          </div>
        </footer>
      </main>

      {/* Assistant Panel */}
      <AssistantPanel />
    </div>
  );
}
