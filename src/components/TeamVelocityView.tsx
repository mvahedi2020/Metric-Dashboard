"use client";

import React from 'react';
import { Users, CheckCircle, Clock, ArrowRight } from 'lucide-react';

export default function TeamVelocityView() {
  return (
    <div className="p-8 h-full overflow-y-auto animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Team Velocity</h1>
        <p className="text-zinc-400">Track sprint progress and team capacity.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Current Sprint</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-zinc-400 text-sm">Sprint 42</span>
              <span className="text-indigo-400 text-sm font-medium">68% Complete</span>
            </div>
            <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden mb-6">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-[68%] rounded-full"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={16} className="text-emerald-400" />
                <span className="text-zinc-400 text-xs font-medium">Done</span>
              </div>
              <p className="text-2xl font-bold text-white">42 <span className="text-sm font-normal text-zinc-500">pts</span></p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={16} className="text-amber-400" />
                <span className="text-zinc-400 text-xs font-medium">Remaining</span>
              </div>
              <p className="text-2xl font-bold text-white">20 <span className="text-sm font-normal text-zinc-500">pts</span></p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 backdrop-blur-xl">
          <h3 className="text-lg font-semibold text-white mb-4">Team Members</h3>
          <div className="space-y-4">
            {[
              { name: 'Alex Johnson', role: 'Frontend Lead', capacity: 90, avatar: 'bg-indigo-500' },
              { name: 'Sam Smith', role: 'Backend Dev', capacity: 100, avatar: 'bg-emerald-500' },
              { name: 'Taylor Swift', role: 'Designer', capacity: 60, avatar: 'bg-purple-500' },
              { name: 'Jordan Lee', role: 'Product Manager', capacity: 85, avatar: 'bg-pink-500' },
            ].map((member, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-800/50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-full ${member.avatar} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-200">{member.name}</p>
                    <p className="text-xs text-zinc-500">{member.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs font-medium text-zinc-300">{member.capacity}%</p>
                    <p className="text-[10px] text-zinc-500">Capacity</p>
                  </div>
                  <ArrowRight size={14} className="text-zinc-600 group-hover:text-indigo-400 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
