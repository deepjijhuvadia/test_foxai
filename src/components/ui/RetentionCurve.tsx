"use client";

import { useMemo } from "react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

export function RetentionCurve({ seedScore = 80 }: { seedScore?: number }) {
  const data = useMemo(() => {
    const dataPoints = [];
    let currentRetention = 100;
    
    for (let i = 0; i <= 60; i += 5) {
      if (i === 0) {
        dataPoints.push({ time: i, retention: 100 });
        continue;
      }
      if (i <= 5) {
        currentRetention = seedScore;
      } else if (i > 20 && i < 40) {
        // Small dip in middle
        currentRetention = currentRetention - (Math.random() * 3 + 1);
      } else if (i >= 45) {
        // Slight upward curve
        currentRetention = currentRetention + (Math.random() * 2 + 0.5);
      } else {
        // Stable
        currentRetention = currentRetention - (Math.random() * 1);
      }
      dataPoints.push({
        time: i,
        retention: Math.min(100, Math.max(0, currentRetention)),
      });
    }
    return dataPoints;
  }, [seedScore]);

  return (
    <div className="w-full h-40">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRetention" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="time" 
            tickFormatter={(val) => `${val}s`} 
            stroke="#27272a" 
            tick={{ fill: '#a1a1aa', fontSize: 10 }}
            axisLine={{ stroke: '#27272a' }}
          />
          <YAxis 
            domain={[0, 100]} 
            tickFormatter={(val) => `${val}%`} 
            stroke="#27272a" 
            tick={{ fill: '#a1a1aa', fontSize: 10 }}
            axisLine={{ stroke: '#27272a' }}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#111113', borderColor: '#27272a', borderRadius: 0, padding: 8 }}
            itemStyle={{ color: '#a78bfa', fontSize: 12, fontWeight: 'bold' }}
            formatter={(value: any) => [`${Number(value || 0).toFixed(1)}%`, 'Engaged']}
            labelStyle={{ color: '#a1a1aa', fontSize: 10, textTransform: 'uppercase' }}
            labelFormatter={(label) => `Second ${label}`}
          />
          <Area 
            type="monotone" 
            dataKey="retention" 
            stroke="#a78bfa" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorRetention)" 
            isAnimationActive={true}
            animationDuration={1500}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
