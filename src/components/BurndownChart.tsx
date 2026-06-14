"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const mockBurndownData = [
  { day: "Mon", ideal: 42, actual: 42 },
  { day: "Tue", ideal: 35, actual: 38 },
  { day: "Wed", ideal: 28, actual: 30 },
  { day: "Thu", ideal: 21, actual: 18 },
  { day: "Fri", ideal: 14, actual: 15 },
  { day: "Sat", ideal: 7, actual: 10 },
  { day: "Sun", ideal: 0, actual: 5 }
];

export default function BurndownChart() {
  return (
    <div className="h-64 w-full mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={mockBurndownData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorIdeal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a1a1aa" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#a1a1aa" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
          <XAxis 
            dataKey="day" 
            stroke="#52525b" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
          />
          <YAxis 
            stroke="#52525b" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#18181b', 
              border: '1px solid #27272a',
              borderRadius: '8px',
              color: '#e4e4e7'
            }}
            itemStyle={{ color: '#e4e4e7' }}
          />
          <Area
            type="monotone"
            dataKey="ideal"
            stroke="#71717a"
            strokeDasharray="5 5"
            fillOpacity={1}
            fill="url(#colorIdeal)"
            name="Ideal Remaining"
          />
          <Area
            type="monotone"
            dataKey="actual"
            stroke="#818cf8"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorActual)"
            name="Actual Remaining"
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
