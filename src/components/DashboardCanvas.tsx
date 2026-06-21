"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MessageSquare, Loader2, CheckCircle } from "lucide-react";
import { JiraMetrics } from "@/lib/jira";
import { SprintHealth } from "@/lib/insights";
import BurndownChart from "./BurndownChart";
import BandwidthHeatmap from "./BandwidthHeatmap";
import AlertsFeed from "./AlertsFeed";

interface DashboardCanvasProps {
  metrics: JiraMetrics;
  sprintHealth: SprintHealth;
}

// Stagger variants for the container
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// Fade up variants for individual items
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

export default function DashboardCanvas({ metrics, sprintHealth }: DashboardCanvasProps) {
  const [isPushing, setIsPushing] = useState(false);
  const [pushStatus, setPushStatus] = useState<"idle" | "success" | "error">("idle");

  const handleExport = () => {
    const headers = "Metric,Value\n";
    const rows = [
      `Total Velocity,${metrics.totalVelocity}`,
      `Active Bugs,${metrics.activeBugs}`,
      `To Do,${metrics.todo}`,
      `In Progress,${metrics.inProgress}`,
      `Done,${metrics.done}`,
      `Sprint Health Status,${sprintHealth.status}`,
      `Sprint Health Score,${sprintHealth.score}`
    ].join("\n");
    
    const csvContent = "data:text/csv;charset=utf-8," + headers + rows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "vantage_metrics_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSlackPush = async () => {
    setIsPushing(true);
    setPushStatus("idle");
    try {
      const res = await fetch("/api/slack/standup", { method: "POST" });
      if (!res.ok) throw new Error("Failed to push");
      setPushStatus("success");
      setTimeout(() => setPushStatus("idle"), 3000);
    } catch (err) {
      console.error("[Dashboard] Error pushing to Slack:", err);
      setPushStatus("error");
      setTimeout(() => setPushStatus("idle"), 3000);
    } finally {
      setIsPushing(false);
    }
  };

  return (
    <div className="flex-1 overflow-auto p-8">
      <motion.div 
        className="flex items-start justify-between mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Sprint Command Center
            </h1>
            <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 shadow-lg ${
              sprintHealth.status === "Excellent" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-emerald-500/10" :
              sprintHealth.status === "Good" ? "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-amber-500/10" :
              "bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-rose-500/10"
            }`}>
              <span className={`h-1.5 w-1.5 rounded-full ${
                sprintHealth.status === "Excellent" ? "bg-emerald-400 animate-pulse" :
                sprintHealth.status === "Good" ? "bg-amber-400" :
                "bg-rose-400 animate-bounce"
              }`}></span>
              {sprintHealth.status} ({sprintHealth.score}/100)
            </div>
          </div>
          <div className="flex items-center gap-3 text-zinc-500 text-sm max-w-xl">
            <p>{sprintHealth.message}</p>
            <span className="text-zinc-700">•</span>
            <p className="text-xs">Last updated: Just now</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleSlackPush}
            disabled={isPushing}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.05)] border
              ${pushStatus === 'success' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' : 
                pushStatus === 'error' ? 'bg-rose-500/20 text-rose-400 border-rose-500/50' : 
                'bg-zinc-800/80 text-zinc-200 hover:bg-zinc-700 border-zinc-700'}
              disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isPushing ? <Loader2 size={16} className="animate-spin" /> : 
             pushStatus === 'success' ? <CheckCircle size={16} /> : 
             <MessageSquare size={16} />}
            {isPushing ? "Pushing..." : 
             pushStatus === 'success' ? "Pushed!" : 
             "Push to Slack"}
          </button>
          <button 
            onClick={handleExport}
            title="Download CSV Report"
            className="rounded-full bg-white text-zinc-950 px-5 py-2.5 text-sm font-semibold hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
          >
            Export Weekly Report <ArrowUpRight size={16} />
          </button>
        </div>
      </motion.div>

      {/* Metric Cards - Staggered */}
      <motion.div 
        className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <MetricCard 
          title="Sprint Velocity" 
          value={`${metrics.totalVelocity} pts`} 
          trend="+12%" 
          trendUp 
        />
        <MetricCard 
          title="Time to Market" 
          value="14 days" 
          trend="-3 days" 
          trendUp 
        />
        <MetricCard 
          title="Active Bugs" 
          value={`${metrics.activeBugs}`} 
          trend="+2" 
          trendUp={false} 
        />
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Main Chart Area */}
        <motion.div variants={itemVariants} className="lg:col-span-2 h-96 w-full rounded-2xl border border-zinc-800/60 bg-zinc-900/30 p-6 backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <h2 className="font-semibold text-lg mb-2 relative z-10">Burndown Trajectory</h2>
          <div className="relative z-10 w-full h-full pb-8">
            <BurndownChart />
          </div>
        </motion.div>

        {/* Jira Ticket States */}
        <motion.div variants={itemVariants} className="h-96 w-full rounded-2xl border border-zinc-800/60 bg-zinc-900/30 p-6 backdrop-blur-sm">
          <h2 className="font-semibold text-lg mb-6 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-500"></span>
            Ticket States
          </h2>
          <div className="space-y-6">
            <ProgressBar label="To Do" value={metrics.todo} total={metrics.todo + metrics.inProgress + metrics.done} colorClass="bg-zinc-500" textColorClass="text-zinc-400" />
            <ProgressBar label="In Progress" value={metrics.inProgress} total={metrics.todo + metrics.inProgress + metrics.done} colorClass="bg-blue-500" textColorClass="text-blue-400" />
            <ProgressBar label="Done" value={metrics.done} total={metrics.todo + metrics.inProgress + metrics.done} colorClass="bg-emerald-500" textColorClass="text-emerald-400" />
          </div>
          <div className="mt-8 pt-6 border-t border-zinc-800/60 flex items-center justify-between">
            <span className="text-sm text-zinc-500">Total Active Issues</span>
            <span className="text-xl font-bold">{metrics.todo + metrics.inProgress + metrics.done}</span>
          </div>
        </motion.div>
      </motion.div>

      {/* New Action & Insights Row */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Developer Bandwidth Heatmap */}
        <motion.div variants={itemVariants} className="w-full rounded-2xl border border-zinc-800/60 bg-zinc-900/30 p-6 backdrop-blur-sm">
          <h2 className="font-semibold text-lg mb-6 flex items-center gap-2">
            Developer Bandwidth
          </h2>
          <BandwidthHeatmap />
        </motion.div>

        {/* Automated Alerts Feed */}
        <motion.div variants={itemVariants} className="w-full rounded-2xl border border-zinc-800/60 bg-zinc-900/30 p-6 backdrop-blur-sm">
          <h2 className="font-semibold text-lg mb-6 flex items-center gap-2">
            Automated Insights
          </h2>
          <AlertsFeed metrics={metrics} />
        </motion.div>
      </motion.div>

    </div>
  );
}

function ProgressBar({ label, value, total, colorClass, textColorClass }: { label: string, value: number, total: number, colorClass: string, textColorClass: string }) {
  const percentage = total > 0 ? (value / total) * 100 : 0;
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className={`${textColorClass} font-medium`}>{label}</span>
        <span className="font-bold">{value}</span>
      </div>
      <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
        <motion.div 
          className={`${colorClass} h-full rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: 0.2, type: "spring" as const }}
        ></motion.div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, trendUp }: { title: string, value: string, trend: string, trendUp: boolean }) {
  return (
    <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="rounded-2xl border border-zinc-800/60 bg-zinc-900/30 p-6 backdrop-blur-md hover:border-zinc-700 transition-colors cursor-default">
      <h3 className="text-sm font-medium text-zinc-400">{title}</h3>
      <div className="mt-4 flex items-baseline gap-3">
        <span className="text-4xl font-bold tracking-tight text-white">{value}</span>
        <span className={`text-sm font-medium ${trendUp ? 'text-emerald-400' : 'text-rose-400'}`}>
          {trend}
        </span>
      </div>
    </motion.div>
  );
}
