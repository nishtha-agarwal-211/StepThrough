'use client';

import Shell from '@/components/layout/Shell';
import { useAppStore } from '@/lib/store';
import StatsGrid from '@/components/dashboard/StatsGrid';
import JourneyProgressCard from '@/components/dashboard/JourneyProgressCard';
import OpportunityCard from '@/components/dashboard/OpportunityCard';
import NextActionItem from '@/components/dashboard/NextActionItem';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';
import JourneyView from '@/components/journey/JourneyView';
import DocumentCenter from '@/components/documents/DocumentCenter';
import GuideView from '@/components/assistant/GuideView';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Map, Compass, Bell, ArrowUpRight, Zap, Bot } from 'lucide-react';

export default function Home() {
  const { 
    user, 
    stats, 
    journeys, 
    opportunities, 
    nextActions, 
    achievements,
    setCurrentPage,
    setSelectedOpportunityId,
    setSelectedJourneyId,
    isOnboarded,
    currentPage
  } = useAppStore();

  const handleOpportunityClick = (id: string) => {
    setSelectedOpportunityId(id);
    setCurrentPage('explore');
  };

  if (!isOnboarded) {
    return <OnboardingFlow />;
  }

  if (currentPage === 'journey') {
    return <Shell><JourneyView /></Shell>;
  }

  if (currentPage === 'documents') {
    return <Shell><DocumentCenter /></Shell>;
  }

  if (currentPage === 'assistant') {
    return <Shell><GuideView /></Shell>;
  }

  if (currentPage === 'explore') {
    return (
      <Shell>
        <div className="space-y-12 animate-fade">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Explore Pathways</h1>
            <p className="text-slate-500 mt-2 max-w-2xl">Discover government schemes, academic scholarships, and career training paths tailored to your profile.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {opportunities.map((opp) => (
              <OpportunityCard 
                key={opp.id} 
                opportunity={opp} 
                onClick={() => {
                  setSelectedOpportunityId(opp.id);
                  // In a real app, this would open a detail view
                }}
              />
            ))}
          </div>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="space-y-12 animate-fade">
        {/* Welcome Section */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-2">
            <span className="section-label">Perspective</span>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Welcome back, {user?.name.split(' ')[0]}
            </h1>
            <p className="text-slate-500 text-lg">
              You have <span className="text-slate-900 font-semibold">{nextActions.length} prioritized actions</span> to finalize your active journeys.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
             <button 
                onClick={() => setCurrentPage('explore')}
                className="btn-primary"
             >
               Explore New Pathways
             </button>
             <button className="btn-secondary">
               Settings
             </button>
          </div>
        </section>

        {/* Overview Stats */}
        <StatsGrid stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 pt-4">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12">
            {/* Active Journeys */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900">
                  <Map className="w-5 h-5 text-blue-600" />
                  Active Journeys
                </h2>
                <button 
                  onClick={() => setCurrentPage('journey')}
                  className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors"
                >
                  View Roadmaps
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {journeys.length > 0 ? (
                  journeys.map((journey) => (
                    <JourneyProgressCard 
                      key={journey.id} 
                      journey={journey} 
                      onClick={() => {
                        setSelectedJourneyId(journey.id);
                        setCurrentPage('journey');
                      }}
                    />
                  ))
                ) : (
                  <div className="col-span-2 p-12 text-center rounded-2xl bg-white border border-slate-200 border-dashed">
                    <p className="text-slate-400 mb-6 font-medium">No active journeys found.</p>
                    <button 
                      onClick={() => setCurrentPage('explore')}
                      className="btn-primary"
                    >
                      Start Your First Journey
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* Recommendations */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900">
                  <Compass className="w-5 h-5 text-blue-600" />
                  Tailored Recommendations
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {opportunities.slice(0, 4).map((opp) => (
                  <OpportunityCard 
                    key={opp.id} 
                    opportunity={opp} 
                    onClick={() => handleOpportunityClick(opp.id)}
                  />
                ))}
              </div>
              
              <div className="mt-10">
                <button 
                  onClick={() => setCurrentPage('explore')}
                  className="w-full py-4 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-900 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  Browse all 24 matched opportunities <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-10">
            {/* Next Action Engine */}
            <section className="space-y-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">Immediate Actions</h2>
              <div className="space-y-3">
                {nextActions.map((action) => (
                  <NextActionItem key={action.id} action={action} />
                ))}
              </div>
            </section>

            {/* Intelligence Brief */}
            <section className="p-6 rounded-2xl bg-slate-900 text-white shadow-xl relative overflow-hidden">
               <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                       <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-blue-400">AI Intelligence</span>
                  </div>
                  <h3 className="text-base font-bold mb-2">Maximize your potential</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    Based on your recent activity, completing the <strong>Income Certificate</strong> verification today will unlock access to 4 additional scholarship paths.
                  </p>
                  <button className="mt-6 w-full py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold transition-all">
                    Generate Action Plan
                  </button>
               </div>
               {/* Subtle background element */}
               <div className="absolute right-[-20px] bottom-[-20px] w-40 h-40 bg-blue-600/20 blur-[50px] pointer-events-none" />
            </section>

            {/* Verification Status */}
            <section className="premium-card p-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Profile Health</h2>
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] font-bold text-slate-500">Identity Verification</span>
                    <span className="text-[11px] font-bold text-emerald-600">88%</span>
                  </div>
                  <div className="st-progress-bar">
                    <div className="st-progress-fill bg-emerald-500" style={{ width: '88%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] font-bold text-slate-500">Resource Accessibility</span>
                    <span className="text-[11px] font-bold text-blue-600">65%</span>
                  </div>
                  <div className="st-progress-bar">
                    <div className="st-progress-fill" style={{ width: '65%' }} />
                  </div>
                </div>
              </div>
              <p className="mt-6 text-[10px] text-slate-400 font-medium leading-relaxed">
                Your profile is more complete than 72% of users in your cohort. This increases your approval probability.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Shell>
  );
}
