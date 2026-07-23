"use client";

import React, { useState } from 'react';
import { BarChart3, TrendingUp, Filter } from 'lucide-react';

export default function AnalyticsView() {
  const [filter, setFilter] = useState('weekly');
  
  const data = {
    weekly: [40, 60, 45, 80, 55, 75, 90],
    monthly: [200, 350, 250, 400, 300, 450, 500],
    yearly: [2500, 3000, 2800, 4200, 3500, 4800, 5100],
  };

  const currentData = data[filter as keyof typeof data];
  const max = Math.max(...currentData);

  return (
    <div className="p-8 h-full overflow-y-auto animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Analytics</h1>
          <p className="text-zinc-400">Detailed insights and performance metrics.</p>
        </div>
        <div className="flex items-center gap-3 bg-zinc-900/80 p-1.5 rounded-lg border border-zinc-800/60 backdrop-blur-md">
          {['weekly', 'monthly', 'yearly'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all ${
                filter === f 
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {[
          { label: "Total Views", value: filter === 'weekly' ? '12.4k' : filter === 'monthly' ? '48.2k' : '524k', trend: "+14.2%" },
          { label: "Active Users", value: filter === 'weekly' ? '3,240' : filter === 'monthly' ? '12,500' : '84,000', trend: "+5.1%" },
          { label: "Conversion", value: "4.8%", trend: "+1.2%" },
        ].map((stat, i) => (
          <div key={i} className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 backdrop-blur-xl relative overflow-hidden group hover:border-indigo-500/30 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-indigo-500/10 transition-all"></div>
            <p className="text-zinc-400 text-sm font-medium mb-2">{stat.label}</p>
            <div className="flex items-end gap-3">
              <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
              <span className="flex items-center text-emerald-400 text-sm font-medium mb-1">
                <TrendingUp size={14} className="mr-1" />
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 backdrop-blur-xl">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <BarChart3 size={18} className="text-indigo-400" />
            Performance Overview
          </h3>
        </div>
        
        <div className="h-64 flex items-end justify-between gap-4">
          {currentData.map((val, i) => (
            <div key={i} className="w-full flex flex-col items-center gap-3 group relative">
              <div 
                className="w-full bg-gradient-to-t from-indigo-600/20 to-indigo-500/80 rounded-t-md transition-all duration-500 ease-out group-hover:from-indigo-500/40 group-hover:to-purple-400"
                style={{ height: `${(val / max) * 100}%` }}
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {val}
                </div>
              </div>
              <span className="text-xs text-zinc-500 uppercase font-medium">
                {filter === 'weekly' ? ['M','T','W','T','F','S','S'][i] : 
                 filter === 'monthly' ? `W${i+1}` : 
                 ['J','F','M','A','M','J','J'][i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
