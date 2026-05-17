'use client';

import { DashboardStats } from '@/lib/types';
import { Target, Users, FileCheck, Award, TrendingUp, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsGridProps {
  stats: DashboardStats;
}

const warmColors = [
  { color: 'var(--st-accent-terracotta)', bg: 'rgba(184,124,106,0.1)', border: 'rgba(184,124,106,0.15)' },
  { color: 'var(--st-accent-gold)', bg: 'rgba(201,169,110,0.1)', border: 'rgba(201,169,110,0.15)' },
  { color: 'var(--st-accent-success)', bg: 'rgba(126,174,123,0.1)', border: 'rgba(126,174,123,0.15)' },
  { color: 'var(--st-accent-mocha)', bg: 'rgba(139,115,85,0.1)', border: 'rgba(139,115,85,0.15)' },
];

export default function StatsGrid({ stats }: StatsGridProps) {
  const statItems = [
    { 
      label: 'Active Pathways', 
      value: stats.activeJourneys, 
      icon: Target, 
      trend: '+12%',
      description: 'Progressing towards completion'
    },
    { 
      label: 'Impact Score', 
      value: (stats.completedJourneys * 1250 + 450).toLocaleString(), 
      icon: Award, 
      trend: 'Top 5%',
      description: 'System-wide ranking'
    },
    { 
      label: 'Verified Assets', 
      value: stats.documentsUploaded, 
      icon: FileCheck, 
      trend: '94%',
      description: 'Authentication success rate'
    },
    { 
      label: 'Network Nodes', 
      value: '2,481', 
      icon: Users, 
      trend: '+42',
      description: 'Connected peers in path'
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((item, i) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, duration: 0.4 }}
          className="liquid-card p-6 group relative overflow-hidden"
        >
          <div className="flex items-start justify-between mb-4">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300"
              style={{ background: warmColors[i].bg, color: warmColors[i].color }}
            >
              <item.icon className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider border" style={{ color: 'var(--st-text-faint)', background: 'var(--st-glass-surface)', borderColor: 'var(--st-glass-border)' }}>
              {item.trend}
              <ArrowUpRight className="w-2.5 h-2.5" style={{ color: 'var(--st-accent-success)' }} />
            </div>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-[var(--st-text-primary)] tracking-tight">{item.value}</h3>
            <p className="text-xs font-semibold text-[var(--st-text-muted)] uppercase tracking-wider">{item.label}</p>
          </div>
          
          <p className="text-[10px] text-[var(--st-text-faint)] mt-4 font-medium italic opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {item.description}
          </p>
          
          {/* Warm accent bar */}
          <div className="absolute bottom-0 left-0 w-1 h-0 group-hover:h-full transition-all duration-300 rounded-r" style={{ background: warmColors[i].color }} />
        </motion.div>
      ))}
    </div>
  );
}
