'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Compass, Map, FileText, Bot,
  Menu, X, ChevronRight, Sparkles, LogOut, Zap, BookOpen,
  Settings, HelpCircle
} from 'lucide-react';
import { useAppStore } from '@/lib/store';

const navItems = [
  { id: 'dashboard' as const, label: 'Overview', icon: LayoutDashboard },
  { id: 'schemes' as const, label: 'Catalog', icon: BookOpen },
  { id: 'explore' as const, label: 'Discovery', icon: Compass },
  { id: 'journey' as const, label: 'Roadmaps', icon: Map },
  { id: 'documents' as const, label: 'Vault', icon: FileText },
  { id: 'assistant' as const, label: 'AI Guide', icon: Bot },
];

export default function Sidebar() {
  const { currentPage, setCurrentPage, isSidebarOpen, toggleSidebar, user, logout } = useAppStore();

  return (
    <>
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[rgba(30,26,23,0.15)] backdrop-blur-[3px] z-40 md:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed left-0 top-0 h-full z-50 flex flex-col sidebar-liquid
          ${isSidebarOpen ? 'w-[260px]' : 'w-[72px]'}
          transition-all duration-500 ease-[var(--st-ease)]
          md:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Logo Section */}
        <div className="flex items-center h-16 px-6 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg shrink-0" style={{ background: 'linear-gradient(135deg, #C9A96E, #8B7355)' }}>
              <Zap className="w-4 h-4 text-white" />
            </div>
            {isSidebarOpen && (
              <span className="font-bold text-lg tracking-tight text-[var(--st-text-primary)]">
                StepThrough
              </span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-3 py-6 space-y-8 overflow-y-auto">
          <div>
            {isSidebarOpen && <span className="section-label px-3 mb-4 block opacity-50">Navigation</span>}
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
                    className={`w-full nav-item-glass group relative
                      ${isActive ? 'active' : 'hover:bg-[rgba(201,169,110,0.06)]'}
                      ${!isSidebarOpen ? 'justify-center px-0' : ''}
                    `}
                  >
                    <item.icon className={`w-[18px] h-[18px] transition-colors ${isActive ? 'text-[var(--st-accent-mocha)]' : 'text-[var(--st-text-faint)] group-hover:text-[var(--st-text-primary)]'}`} />
                    {isSidebarOpen && (
                      <span className="flex-1 text-left">
                        {item.label}
                      </span>
                    )}
                    {isActive && !isSidebarOpen && (
                      <motion.div layoutId="active-pill" className="absolute right-0 w-1 h-6 rounded-l-full" style={{ background: 'linear-gradient(135deg, #C9A96E, #8B7355)' }} />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* User Account Section */}
        <div className="p-4 mt-auto">
          <div className={`flex items-center gap-3 p-2 rounded-xl transition-all
            ${isSidebarOpen ? 'hover:bg-[rgba(201,169,110,0.06)]' : 'justify-center'}
          `}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold text-[var(--st-text-on-accent)] shrink-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #C9A96E, #D4B88A)' }}>
              {user?.name?.charAt(0) || 'U'}
            </div>
            {isSidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[var(--st-text-primary)] truncate">{user?.name}</p>
                <div className="flex items-center gap-1.5">
                   <div className="w-1.5 h-1.5 rounded-full bg-[var(--st-accent-success)]" />
                   <p className="text-[10px] text-[var(--st-text-faint)] font-medium uppercase tracking-wider">Pro Tier</p>
                </div>
              </div>
            )}
            {isSidebarOpen && (
               <button 
                 onClick={logout}
                 className="p-1.5 text-[var(--st-text-faint)] hover:text-[var(--st-accent-danger)] hover:bg-[rgba(196,122,106,0.1)] rounded-md transition-all"
               >
                 <LogOut className="w-4 h-4" />
               </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
