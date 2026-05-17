'use client';

import { DashboardStats } from '@/lib/types';
import { Target, Users, FileCheck, Award, TrendingUp, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsGridProps {
  stats: DashboardStats;
}

export default function StatsGrid({ stats }: StatsGridProps) {
  const statItems = [
    { 
      label: 'Active Pathways', 
      value: stats.activeJourneys, 
      icon: Target, 
      color: 'text-indigo-600', 
      bg: 'bg-indigo-50',
      trend: '+12%',
      description: 'Progressing towards completion'
    },
    { 
      label: 'Impact Score', 
      value: (stats.completedJourneys * 1250 + 450).toLocaleString(), 
      icon: Award, 
      color: 'text-amber-600', 
      bg: 'bg-amber-50',
      trend: 'Top 5%',
      description: 'System-wide ranking'
    },
    { 
      label: 'Verified Assets', 
      value: stats.documentsUploaded, 
      icon: FileCheck, 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-50',
      trend: '94%',
      description: 'Authentication success rate'
    },
    { 
      label: 'Network Nodes', 
      value: '2,481', 
      icon: Users, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50',
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
          className="bg-white border border-gray-100 p-6 rounded-2xl hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-300 group relative overflow-hidden"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.bg} ${item.color} transition-transform group-hover:scale-110 duration-300`}>
              <item.icon className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md uppercase tracking-wider">
              {item.trend}
              <ArrowUpRight className="w-2.5 h-2.5 text-emerald-500" />
            </div>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{item.value}</h3>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{item.label}</p>
          </div>
          
          <p className="text-[10px] text-gray-400 mt-4 font-medium italic opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {item.description}
          </p>
          
          {/* Decorative accent */}
          <div className={`absolute bottom-0 left-0 w-1 h-0 group-hover:h-full transition-all duration-300 ${item.color.replace('text', 'bg')}`} />
        </motion.div>
      ))}
    </div>
  );
}
