'use client';

import { useState } from 'react';
import Shell from '@/components/layout/Shell';
import { useAppStore } from '@/lib/store';
import StatsGrid from '@/components/dashboard/StatsGrid';
import JourneyProgressCard from '@/components/dashboard/JourneyProgressCard';
import OpportunityCard from '@/components/dashboard/OpportunityCard';
import NextActionItem from '@/components/dashboard/NextActionItem';
import ActionPlanModal from '@/components/dashboard/ActionPlanModal';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';
import JourneyView from '@/components/journey/JourneyView';
import DocumentCenter from '@/components/documents/DocumentCenter';
import GuideView from '@/components/assistant/GuideView';
import SchemesExplorer from '@/components/schemes/SchemesExplorer';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Zap, Bot, User as UserIcon, Calendar, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import AuthPage from './auth/page';

export default function Home() {
  const { 
    user, 
    stats, 
    journeys, 
    opportunities, 
    nextActions, 
    setCurrentPage,
    setSelectedOpportunityId,
    setSelectedJourneyId,
    isOnboarded,
    currentPage,
  } = useAppStore();

  const [isActionPlanOpen, setIsActionPlanOpen] = useState(false);

  if (!user) return <AuthPage />;
  if (!isOnboarded) return <OnboardingFlow />;

  const pageContent = () => {
    switch (currentPage) {
      case 'journey': return <JourneyView />;
      case 'documents': return <DocumentCenter />;
      case 'assistant': return <GuideView />;
      case 'schemes': return <SchemesExplorer />;
      case 'explore': return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Pathways Discovery</h1>
            <p className="text-gray-500 mt-3 max-w-2xl text-lg font-medium opacity-80">Explore curated government schemes and opportunities optimized for your profile.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {opportunities.map((opp, idx) => (
              <motion.div
                key={opp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <OpportunityCard 
                  opportunity={opp} 
                  onClick={() => setSelectedOpportunityId(opp.id)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      );
      default: return (
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Hero Header */}
            <section className="flex flex-col md:flex-row md:items-end justify-between gap-8 bg-white border border-gray-100 p-8 rounded-3xl shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                   <div className="px-2.5 py-1 rounded-md bg-indigo-50 text-[10px] font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-1.5">
                     <Zap className="w-3 h-3" />
                     Live Dashboard
                   </div>
                   <div className="h-px w-8 bg-gray-100" />
                   <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-[1.1]">
                  System <span className="text-indigo-600 italic">Overview</span>
                </h1>
                <p className="text-gray-500 text-lg font-medium max-w-xl leading-relaxed">
                  You have <span className="text-gray-900 font-bold">{stats.activeJourneys} active paths</span> in synchronization. Your overall impact score has increased by 14% this week.
                </p>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsActionPlanOpen(true)}
                className="bg-gray-900 text-white h-14 px-8 rounded-2xl flex items-center gap-3 font-semibold shadow-lg shadow-gray-200 group transition-all"
              >
                <Sparkles className="w-5 h-5 transition-transform group-hover:rotate-12" />
                Optimization Plan
                <ArrowRight className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
              </motion.button>
            </section>

            {/* Metrics */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                 <h2 className="section-label">Performance Metrics</h2>
              </div>
              <StatsGrid stats={stats} />
            </section>

            {/* Active Pathways */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold text-gray-900">Active Roadmaps</h2>
                  <span className="bg-gray-50 text-gray-400 text-[10px] font-bold px-2 py-1 rounded-md border border-gray-100">{journeys.length}</span>
                </div>
                <button 
                  onClick={() => setCurrentPage('journey')}
                  className="text-[11px] font-bold text-gray-400 hover:text-gray-900 uppercase tracking-widest transition-colors"
                >
                  Manage All
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {journeys.slice(0, 2).map((journey) => (
                  <JourneyProgressCard 
                    key={journey.id} 
                    journey={journey} 
                    onClick={() => {
                      setSelectedJourneyId(journey.id);
                      setCurrentPage('journey');
                    }}
                  />
                ))}
              </div>
            </section>

            {/* Recommendations */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold text-gray-900">Recommended Discovery</h2>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-50 text-[9px] font-bold text-emerald-600 uppercase tracking-wider">
                     <CheckCircle2 className="w-2.5 h-2.5" />
                     98% Match
                  </div>
                </div>
                <button 
                  onClick={() => setCurrentPage('explore')}
                  className="text-[11px] font-bold text-gray-400 hover:text-gray-900 uppercase tracking-widest transition-colors"
                >
                  Expand Library
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
                {opportunities.slice(0, 2).map((opp) => (
                  <OpportunityCard 
                    key={opp.id} 
                    opportunity={opp} 
                    onClick={() => {
                      setSelectedOpportunityId(opp.id);
                      setCurrentPage('explore');
                    }}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <aside className="w-full lg:w-[400px] space-y-8">
            <div className="sticky top-24 space-y-8">
              {/* Intelligent Feed */}
              <section className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-500" />
                    Intelligent Feed
                  </h2>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <div className="space-y-1">
                  {nextActions.map((action) => (
                    <NextActionItem key={action.id} action={action} />
                  ))}
                </div>
              </section>

              {/* Milestone Tracker */}
              <section className="bg-gray-900 text-white rounded-3xl p-8 shadow-xl shadow-indigo-100 overflow-hidden relative group">
                <div className="relative z-10 space-y-6">
                  <h2 className="text-sm font-bold flex items-center gap-2 opacity-80">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    System Milestone
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                       <p className="text-lg font-bold leading-tight">Verification Level 4</p>
                       <p className="text-xs text-gray-400 leading-relaxed font-medium">Complete the document audit to unlock secondary government funding channels.</p>
                    </div>
                    
                    <div className="pt-4">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2 text-indigo-300">
                        <span>Progress</span>
                        <span>74%</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '74%' }}
                          className="h-full bg-indigo-500" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-500/30 transition-colors" />
              </section>
            </div>
          </aside>
        </div>
      );
    }
  };

  return (
    <Shell noPadding={currentPage === 'dashboard' || !currentPage}>
      <div className={currentPage === 'dashboard' || !currentPage ? 'px-4 sm:px-8 py-8 sm:py-12 max-w-[1600px] mx-auto' : ''}>
        {pageContent()}
      </div>

      <ActionPlanModal 
        isOpen={isActionPlanOpen} 
        onClose={() => setIsActionPlanOpen(false)} 
      />
    </Shell>
  );
}
