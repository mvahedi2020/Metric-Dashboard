"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react";
import { JiraMetrics } from "@/lib/jira";

interface AlertsFeedProps {
  metrics: JiraMetrics;
}

export default function AlertsFeed({ metrics }: AlertsFeedProps) {
  // Generate automated alerts based on metrics
  const generateAlerts = () => {
    const alerts = [];

    // Critical Bug Alert
    if (metrics.activeBugs > 5) {
      alerts.push({
        id: "alert-bugs",
        type: "critical",
        icon: <AlertCircle className="text-rose-400" size={18} />,
        title: "High Bug Volume",
        message: `${metrics.activeBugs} active bugs detected. Consider halting new feature work until bug backlog is reduced below 5.`,
        time: "Just now",
        bgClass: "bg-rose-500/10 border-rose-500/20"
      });
    }

    // Velocity Alert
    if (metrics.totalVelocity < 30) {
      alerts.push({
        id: "alert-velocity",
        type: "warning",
        icon: <AlertTriangle className="text-amber-400" size={18} />,
        title: "Velocity Dropping",
        message: `Current sprint velocity is only ${metrics.totalVelocity} points. Team may not meet the sprint commitment.`,
        time: "2 hours ago",
        bgClass: "bg-amber-500/10 border-amber-500/20"
      });
    }

    // Success Alert
    if (metrics.done > metrics.inProgress && metrics.done > metrics.todo) {
      alerts.push({
        id: "alert-success",
        type: "success",
        icon: <CheckCircle2 className="text-emerald-400" size={18} />,
        title: "Sprint on Track",
        message: "More tickets are in 'Done' than 'In Progress' or 'To Do'. Great momentum!",
        time: "5 hours ago",
        bgClass: "bg-emerald-500/10 border-emerald-500/20"
      });
    }

    // Informational Alert
    alerts.push({
      id: "alert-info",
      type: "info",
      icon: <Info className="text-blue-400" size={18} />,
      title: "Q4 Planning Upcoming",
      message: "Reminder: Q4 planning starts next week. Ensure backlog is groomed.",
      time: "1 day ago",
      bgClass: "bg-blue-500/10 border-blue-500/20"
    });

    return alerts;
  };

  const alerts = generateAlerts();

  return (
    <div className="h-full w-full">
      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        <AnimatePresence>
          {alerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15, type: "spring" as const }}
              className={`p-3 rounded-xl border flex gap-3 ${alert.bgClass}`}
            >
              <div className="mt-0.5">{alert.icon}</div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-semibold text-zinc-200">{alert.title}</h4>
                  <span className="text-[10px] text-zinc-500">{alert.time}</span>
                </div>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  {alert.message}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
