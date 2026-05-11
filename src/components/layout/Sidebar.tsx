'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Compass, Map, FileText, Bot,
  Menu, X, ChevronRight, Sparkles, LogOut, Zap
} from 'lucide-react';
import { useAppStore } from '@/lib/store';

const navItems = [
  { id: 'dashboard' as const, label: 'Overview', icon: LayoutDashboard },
  { id: 'explore' as const, label: 'Explore', icon: Compass },
  { id: 'journey' as const, label: 'Journeys', icon: Map },
  { id: 'documents' as const, label: 'Vault', icon: FileText },
  { id: 'assistant' as const, label: 'Guide', icon: Bot },
];

export default function Sidebar() {
  const { currentPage, setCurrentPage, isSidebarOpen, toggleSidebar, user, stats } = useAppStore();

  return (
    <>
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/10 backdrop-blur-[2px] z-40 md:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed left-0 top-0 h-full z-50 flex flex-col bg-slate-50 border-r border-slate-200
          ${isSidebarOpen ? 'w-[260px]' : 'w-[72px]'}
          transition-all duration-300 ease-in-out
          md:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between px-6 h-16 shrink-0 border-b border-slate-200/60 bg-white/50 backdrop-blur-sm">
          {isSidebarOpen && (
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-[6px] bg-slate-900 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-[15px] tracking-tight text-slate-900">
                StepThrough
              </span>
            </div>
          )}
          {!isSidebarOpen && (
             <div className="mx-auto w-7 h-7 rounded-[6px] bg-slate-900 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
             </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 px-3 py-6 space-y-8 overflow-y-auto">
          <div>
            {isSidebarOpen && <span className="section-label px-3">Main</span>}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => { 
                      setCurrentPage(item.id); 
                      if (window.innerWidth < 768) toggleSidebar(); 
                    }}
                    className={`w-full nav-item group
                      ${isActive ? 'active' : ''}
                      ${!isSidebarOpen ? 'justify-center px-0' : ''}
                    `}
                  >
                    <item.icon className={`w-[18px] h-[18px] ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                    {isSidebarOpen && (
                      <span className="flex-1 text-left">{item.label}</span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* User Progress Preview */}
          {isSidebarOpen && (
            <div className="px-3">
              <span className="section-label">Your Impact</span>
              <div className="mt-2 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-sm">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-medium text-slate-500">Focus Score</span>
                  <span className="text-xs font-bold text-slate-900">{stats.streakDays}/7</span>
                </div>
                <div className="st-progress-bar">
                  <div className="st-progress-fill" style={{ width: `${(stats.streakDays / 7) * 100}%` }} />
                </div>
                <p className="text-[10px] text-slate-400 mt-2 font-medium leading-relaxed">
                  Continue your streak to unlock advanced pathways.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* User Account Section */}
        <div className="p-3 border-t border-slate-200 bg-white/50">
          <div className={`flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer
            ${!isSidebarOpen ? 'justify-center' : ''}
          `}>
            <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-[11px] font-bold text-white shrink-0">
              {user?.name?.charAt(0) || 'U'}
            </div>
            {isSidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">{user?.name}</p>
                <p className="text-[11px] text-slate-400 font-medium truncate">Premium Account</p>
              </div>
            )}
            {isSidebarOpen && (
               <LogOut className="w-4 h-4 text-slate-400 hover:text-slate-600" />
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
