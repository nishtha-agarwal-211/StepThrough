'use client';

import { DashboardStats } from '@/lib/types';
import { Target, Users, FileCheck, Award, TrendingUp } from 'lucide-react';

interface StatsGridProps {
  stats: DashboardStats;
}

export default function StatsGrid({ stats }: StatsGridProps) {
  const statItems = [
    { label: 'Active Pathways', value: stats.activeJourneys, icon: Target, color: 'text-blue-600', trend: '+2 this week' },
    { label: 'Impact Score', value: stats.completedJourneys * 1250 + 450, icon: Award, color: 'text-slate-900', trend: 'Top 10%' },
    { label: 'Verified Evidence', value: stats.documentsUploaded, icon: FileCheck, color: 'text-emerald-600', trend: '88% Score' },
    { label: 'Community Reach', value: '1,240', icon: Users, color: 'text-slate-900', trend: 'Global' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((item, i) => (
        <div key={i} className="premium-card p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-slate-50 border border-slate-100 ${item.color}`}>
              <item.icon className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              <TrendingUp className="w-3 h-3" />
              {item.trend}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">{item.value}</h3>
            <p className="text-xs font-medium text-slate-400 mt-1">{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
