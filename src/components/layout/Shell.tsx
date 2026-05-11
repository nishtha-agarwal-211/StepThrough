'use client';

import React from 'react';
import Sidebar from './Sidebar';
import { useAppStore } from '@/lib/store';
import { Bell, Search, Settings, HelpCircle, Bot, Zap } from 'lucide-react';
import AssistantPanel from '../assistant/AssistantPanel';

interface ShellProps {
  children: React.ReactNode;
}

export default function Shell({ children }: ShellProps) {
  const { isSidebarOpen, isAssistantOpen, toggleAssistant } = useAppStore();

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <Sidebar />
      
      <main 
        className={`flex-1 transition-all duration-300 ease-in-out flex flex-col min-h-screen
          ${isSidebarOpen ? 'md:ml-[260px]' : 'md:ml-[72px]'}
        `}
      >
        {/* Global Header */}
        <header className="h-16 px-6 md:px-10 flex items-center justify-between bg-white/70 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30">
          <div className="flex items-center gap-6 flex-1">
            <div className="relative max-w-md w-full hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search pathways, documents, or help..."
                className="w-full bg-slate-100/50 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-slate-300 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all">
              <HelpCircle className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-6 w-px bg-slate-200 mx-2" />
            <button 
              onClick={toggleAssistant}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all
                ${isAssistantOpen 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300 shadow-sm'}
              `}
            >
              <Bot className={`w-4 h-4 ${isAssistantOpen ? 'text-white' : 'text-blue-600'}`} />
              Assistant
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 px-6 md:px-10 py-10 max-w-[1400px] mx-auto w-full">
          {children}
        </div>
        
        {/* Footer */}
        <footer className="px-10 py-8 border-t border-slate-200 bg-white/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">StepThrough Intelligence Engine</span>
            </div>
            <div className="flex items-center gap-6 text-xs font-medium text-slate-400">
              <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-slate-600 transition-colors">Documentation</a>
            </div>
          </div>
        </footer>
      </main>

      {/* Floating Assistant Overlay */}
      <AssistantPanel />
    </div>
  );
}
