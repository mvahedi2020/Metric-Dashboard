"use client";

import { motion } from "framer-motion";

import { DeveloperBandwidth } from "@/lib/mockData";
import { useState } from "react";

interface BandwidthHeatmapProps {
  bandwidthData: DeveloperBandwidth[];
}

export default function BandwidthHeatmap({ bandwidthData }: BandwidthHeatmapProps) {
  const [expandedDev, setExpandedDev] = useState<string | null>(null);

  return (
    <div className="h-full w-full">
      <div className="space-y-5">
        {bandwidthData.map((dev, i) => {
          const loadPercentage = Math.round((dev.assignedPoints / dev.capacityPoints) * 100);
          const isOverloaded = loadPercentage > 100;
          const isHighCapacity = loadPercentage > 85 && loadPercentage <= 100;
          
          let barColor = "bg-emerald-500";
          let textColor = "text-emerald-400";
          
          if (isOverloaded) {
            barColor = "bg-rose-500";
            textColor = "text-rose-400";
          } else if (isHighCapacity) {
            barColor = "bg-amber-500";
            textColor = "text-amber-400";
          }

          return (
            <div 
              key={dev.name} 
              className="group cursor-pointer"
              onClick={() => setExpandedDev(expandedDev === dev.name ? null : dev.name)}
            >
              <div className="flex justify-between items-end mb-2">
                <div>
                  <span className="font-semibold text-zinc-200 group-hover:text-indigo-400 transition-colors">{dev.name}</span>
                  <span className="text-xs text-zinc-500 ml-2">{dev.role}</span>
                </div>
                <div className="text-sm font-medium">
                  <span className={textColor}>{loadPercentage}% Load</span>
                  <span className="text-zinc-500 text-xs ml-2">({dev.assignedPoints}/{dev.capacityPoints} pts)</span>
                </div>
              </div>
              <div className="w-full bg-zinc-800/80 h-2.5 rounded-full overflow-hidden relative border border-zinc-700/50">
                <motion.div 
                  className={`h-full rounded-full ${barColor}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(loadPercentage, 100)}%` }}
                  transition={{ duration: 1, delay: 0.1 * i, type: "spring" as const }}
                />
                {isOverloaded && (
                  <motion.div 
                    className="absolute top-0 right-0 bottom-0 bg-rose-400/30 w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                )}
              </div>
              {expandedDev === dev.name && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="mt-3 p-3 bg-zinc-800/50 rounded-lg text-xs text-zinc-400"
                >
                  <p><strong>Top Ticket:</strong> VM-241 (Fix memory leak)</p>
                  <p><strong>Recent PR:</strong> Merged #442 (Dashboard UI)</p>
                  {isOverloaded && <p className="text-rose-400 mt-1">Status: High risk of burnout this sprint.</p>}
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
