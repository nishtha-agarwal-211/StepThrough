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
            <h1 className="text-4xl font-bold text-[var(--st-text-primary)] tracking-tight">Pathways Discovery</h1>
            <p className="text-[var(--st-text-muted)] mt-3 max-w-2xl text-lg font-medium opacity-80">Explore curated government schemes and opportunities optimized for your profile.</p>
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
            {/* Hero Header — Modern Trust Portal */}
            <section className="flex flex-col md:flex-row md:items-center justify-between gap-8 p-8 rounded-2xl border border-[var(--st-glass-border)] bg-white shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                   <div className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5" style={{ background: 'rgba(10,48,84,0.06)', color: 'var(--st-accent-mocha)' }}>
                     <Zap className="w-3 h-3 text-[var(--st-accent-gold)]" />
                     Live Discovery
                   </div>
                   <div className="h-px w-8 bg-[var(--st-glass-border)]" />
                   <span className="text-[10px] font-bold text-[var(--st-text-faint)] uppercase tracking-widest">{new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-[var(--st-text-primary)] tracking-tight leading-[1.1]">
                  Citizen <span className="gradient-text">Overview</span>
                </h1>
                <p className="text-[var(--st-text-muted)] text-lg font-medium max-w-xl leading-relaxed">
                  You have <span className="text-[var(--st-accent-gold)] font-extrabold">{stats.activeJourneys} active roadmap{stats.activeJourneys > 1 ? 's' : ''}</span> in sync. Your scheme eligibility score is verified.
                </p>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsActionPlanOpen(true)}
                className="text-white h-14 px-8 rounded-xl flex items-center gap-3 font-semibold group transition-all shadow-sm cursor-pointer"
                style={{ background: 'var(--st-gradient-gold)', boxShadow: '0 4px 14px rgba(224, 106, 59, 0.2)' }}
              >
                <Sparkles className="w-5 h-5 transition-transform group-hover:rotate-12" />
                Eligibility Summary
                <ArrowRight className="w-4 h-4 opacity-75 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
              </motion.button>
            </section>

            {/* Metrics */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                 <h2 className="section-label">Performance & Match Metrics</h2>
              </div>
              <StatsGrid stats={stats} />
            </section>

            {/* Active Pathways */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold text-[var(--st-text-primary)]">Active Roadmaps</h2>
                  <span className="text-[var(--st-text-faint)] text-[10px] font-bold px-2 py-1 rounded-md border border-[var(--st-glass-border)] bg-[var(--st-bg-blue-tint)]">{journeys.length}</span>
                </div>
                <button 
                  onClick={() => setCurrentPage('journey')}
                  className="text-[11px] font-bold text-[var(--st-accent-gold)] hover:text-[#C24E22] hover:underline uppercase tracking-widest transition-colors cursor-pointer"
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
                  <h2 className="text-lg font-bold text-[var(--st-text-primary)]">Recommended for You</h2>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-emerald-50 border border-emerald-100 text-emerald-700">
                     <CheckCircle2 className="w-2.5 h-2.5" />
                     98% Match Confirmed
                  </div>
                </div>
                <button 
                  onClick={() => setCurrentPage('explore')}
                  className="text-[11px] font-bold text-[var(--st-accent-gold)] hover:text-[#C24E22] hover:underline uppercase tracking-widest transition-colors cursor-pointer"
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
              <section className="glass-card p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-[var(--st-text-primary)] flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[var(--st-accent-gold)]" />
                    Action Feed
                  </h2>
                  <span className="w-2 h-2 rounded-full bg-[var(--st-accent-success)]" />
                </div>
                <div className="space-y-1">
                  {nextActions.map((action) => (
                    <NextActionItem key={action.id} action={action} />
                  ))}
                </div>
              </section>

              {/* Milestone Tracker — Deep Navy Trust Layer */}
              <section className="rounded-2xl p-8 overflow-hidden relative group text-white border border-slate-800" style={{ background: 'var(--st-gradient-hero)' }}>
                <div className="relative z-10 space-y-6">
                  <h2 className="text-sm font-bold flex items-center gap-2 text-white/70">
                    <Sparkles className="w-4 h-4 text-[var(--st-accent-gold)] animate-spin-slow" />
                    Verification Milestone
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                       <p className="text-lg font-bold leading-tight">Verification Level 4</p>
                       <p className="text-xs text-white/70 leading-relaxed font-medium">Upload domicile certificate and passbook to unlock premium central scholarships.</p>
                    </div>
                    
                    <div className="pt-4">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2 text-[var(--st-accent-gold)]">
                        <span>Progress</span>
                        <span>74%</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '74%' }}
                          className="h-full rounded-full" 
                          style={{ background: 'var(--st-gradient-gold)' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 blur-3xl -mr-16 -mt-16 group-hover:opacity-40 transition-all" style={{ background: 'rgba(224, 106, 59, 0.2)' }} />
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
