"use client";

import React, { useState } from 'react';
import { Settings, Bell, Shield, Palette } from 'lucide-react';

export default function SettingsView() {
  const [preferences, setPreferences] = useState({
    notifications: true,
    darkMode: true,
    compactView: false,
    autoSave: true,
  });

  const togglePref = (key: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-8 h-full overflow-y-auto animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Settings</h1>
        <p className="text-zinc-400">Manage your workspace preferences and configurations.</p>
      </div>

      <div className="max-w-3xl space-y-6">
        <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
              <Palette className="text-indigo-400" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Appearance</h3>
              <p className="text-sm text-zinc-400">Customize how VantageMetrics looks on your device.</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <ToggleRow 
              label="Dark Mode" 
              description="Use dark theme by default" 
              active={preferences.darkMode} 
              onToggle={() => togglePref('darkMode')} 
            />
            <ToggleRow 
              label="Compact View" 
              description="Reduce spacing in lists and tables" 
              active={preferences.compactView} 
              onToggle={() => togglePref('compactView')} 
            />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Bell className="text-purple-400" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Notifications</h3>
              <p className="text-sm text-zinc-400">Manage what alerts you receive.</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <ToggleRow 
              label="Push Notifications" 
              description="Receive push notifications for important updates" 
              active={preferences.notifications} 
              onToggle={() => togglePref('notifications')} 
            />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Shield className="text-emerald-400" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Workflow</h3>
              <p className="text-sm text-zinc-400">Adjust your application workflow settings.</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <ToggleRow 
              label="Auto-save Changes" 
              description="Automatically save changes as you type" 
              active={preferences.autoSave} 
              onToggle={() => togglePref('autoSave')} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ToggleRow({ label, description, active, onToggle }: { label: string, description: string, active: boolean, onToggle: () => void }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-zinc-800/50 last:border-0 last:pb-0">
      <div>
        <p className="text-sm font-medium text-zinc-200">{label}</p>
        <p className="text-xs text-zinc-500">{description}</p>
      </div>
      <button 
        onClick={onToggle}
        className={`w-11 h-6 rounded-full transition-colors relative flex items-center ${active ? 'bg-indigo-500' : 'bg-zinc-700'}`}
      >
        <div className={`h-4 w-4 rounded-full bg-white transition-transform absolute ${active ? 'translate-x-6' : 'translate-x-1'}`} />
      </button>
    </div>
  );
}
