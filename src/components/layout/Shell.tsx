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
    <div className="flex min-h-screen text-[var(--st-text-primary)] selection:bg-[var(--st-accent-brand)] selection:text-white">
      <Sidebar />
      
      <main 
        className={`flex-1 transition-all duration-500 ease-[var(--st-ease)] flex flex-col min-h-screen
          ml-0 ${isSidebarOpen ? 'md:ml-[260px]' : 'md:ml-[72px]'}
        `}
      >
        {/* Global Header - Refined & Minimal */}
        <header className="h-16 px-4 sm:px-8 flex items-center justify-between glass-panel !rounded-none !border-t-0 !border-x-0 !bg-white/80 sticky top-0 z-30">
          <div className="flex items-center gap-6 flex-1">
            <button 
              onClick={toggleSidebar}
              className="md:hidden p-2 text-[var(--st-text-secondary)] hover:text-[var(--st-text-primary)] hover:bg-gray-100 rounded-lg transition-all"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Search Bar - Command Style */}
            <div className="relative max-w-md w-full hidden sm:block group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--st-text-muted)] group-focus-within:text-[var(--st-accent-brand)] transition-colors" />
              <input 
                type="text" 
                placeholder="Search pathways..."
                className="w-full bg-gray-50/50 border border-transparent rounded-lg py-2 pl-10 pr-12 text-sm focus:outline-none focus:bg-white focus:border-gray-200 focus:ring-4 focus:ring-gray-400/5 transition-all placeholder:text-[var(--st-text-muted)] text-[var(--st-text-primary)]"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded border border-gray-200 bg-white text-[10px] font-medium text-gray-400">
                <Command className="w-2.5 h-2.5" /> K
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 text-[var(--st-text-secondary)] hover:text-[var(--st-text-primary)] hover:bg-gray-100 rounded-lg transition-all">
              <HelpCircle className="w-5 h-5" />
            </button>
            <button className="p-2 text-[var(--st-text-secondary)] hover:text-[var(--st-text-primary)] hover:bg-gray-100 rounded-lg transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[var(--st-accent-brand)] rounded-full border-2 border-white"></span>
            </button>
            
            <div className="h-6 w-px bg-gray-100 mx-2" />
            
            <button 
              onClick={toggleAssistant}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all
                ${isAssistantOpen 
                  ? 'bg-[var(--st-accent-primary)] text-white' 
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300 shadow-sm'}
              `}
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
        
        {/* Footer - Minimalist */}
        <footer className="px-8 py-10 border-t border-gray-100 bg-white/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-md bg-gray-900 flex items-center justify-center">
                <Zap className="w-3 h-3 text-white" />
              </div>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Navigation Engine v2.0</span>
            </div>
            <div className="flex items-center gap-8 text-xs font-medium text-gray-500">
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
