"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";

const editors = [
  { id: "OP-01", type: "Short-form Operator", sub: "Output Volume: High", liftLabel: "Retention Lift", lift: "+38%", timeLabel: "Turnaround", time: "24h" },
  { id: "OP-02", type: "Narrative Editor", sub: "Specialization: Storytelling", liftLabel: "Watch Time Lift", lift: "+52%", timeLabel: "Status", time: "Active Node" },
  { id: "OP-03", type: "Thumbnail Strategist", sub: "Metric Focus: Click-Through", liftLabel: "CTR Boost", lift: "+27%", timeLabel: "Status", time: "Active Node" },
];

export default function Editors() {
  return (
    <div className="flex-1 w-full max-w-screen-xl mx-auto flex flex-col p-8 lg:p-12 relative h-[calc(100vh-64px)] z-10">
      
      {/* Header */}
      <div className="flex flex-col gap-4 max-w-2xl mb-12">
        <h1 className="text-5xl font-bold tracking-tight text-white leading-tight">
          Deploy an Editor.
        </h1>
        <p className="text-secondary text-xl font-medium tracking-wide">
          Not freelancers. Operators trained on virality systems.
        </p>
      </div>

      {/* Main Terminal UI wrapped in Locked State Overlay */}
      <div className="relative flex-1 w-full border border-surface-400 bg-surface-100 flex flex-col overflow-hidden">
        
        {/* Fake Terminal Header */}
        <div className="h-10 bg-surface-200 border-b border-surface-400 flex items-center px-4 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-surface-400" />
            <div className="w-3 h-3 rounded-full bg-surface-400" />
            <div className="w-3 h-3 rounded-full bg-surface-400" />
          </div>
          <span className="text-xs font-mono text-secondary tracking-widest uppercase">Select Operator Target</span>
        </div>

        {/* Terminal Content (Blurred by overlay below) */}
        <div className="p-6 flex flex-col gap-4 opacity-50 select-none pointer-events-none filter blur-[2px]">
          
          {/* Removed old column headers for better layout compatibility */}

          {editors.map((ed) => (
            <div key={ed.id} className="flex items-center justify-between p-4 bg-surface-200 border border-surface-400 transition-colors gap-4">
              <span className="w-16 font-mono text-primary font-bold">{ed.id}</span>
              <div className="flex-1 flex flex-col">
                <span className="text-white font-medium">{ed.type}</span>
                <span className="text-surface-400 text-[10px] font-mono uppercase">{ed.sub}</span>
              </div>
              <div className="flex flex-col items-end w-32">
                 <span className="text-[10px] text-surface-400 uppercase font-mono tracking-widest">{ed.liftLabel}</span>
                 <span className="font-mono text-success font-bold">{ed.lift}</span>
              </div>
              <div className="flex flex-col items-end w-28">
                 <span className="text-[10px] text-surface-400 uppercase font-mono tracking-widest">{ed.timeLabel}</span>
                 <span className="font-mono text-secondary">{ed.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Locked State UI overlay */}
        <div className="absolute inset-x-0 bottom-0 top-10 flex flex-col items-center justify-center bg-background/60 backdrop-blur-[6px] z-20 gap-6">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ ease: "easeOut", duration: 0.3 }}
            className="w-16 h-16 border border-surface-400 bg-surface-200 flex items-center justify-center text-primary rotate-45"
          >
            <Lock size={24} className="-rotate-45" />
          </motion.div>
          
          <div className="flex flex-col items-center gap-2 text-center max-w-sm">
            <h2 className="text-white font-bold text-2xl tracking-tighter">Connecting to Operator Node...</h2>
            <p className="text-secondary font-mono text-xs uppercase tracking-widest">
              Evaluating operator metrics and synchronizing workflows...
            </p>
          </div>

          <Button variant="primary" size="lg" className="mt-4 uppercase tracking-widest px-8">
            Override Lock
          </Button>
        </div>
      </div>
    </div>
  );
}
