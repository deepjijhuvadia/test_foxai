"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Lock } from "lucide-react";

/**
 * A basic Skill Tree node component simulating complex node-based progression.
 */
function SkillNode({ id, label, status, x, y, delay=0, progress=0 }: { id: string, label: string, status: "mastered"|"active"|"locked", x: number, y: number, delay?: number, progress?: number }) {
  const isLocked = status === "locked";
  const isActive = status === "active";
  const isMastered = status === "mastered";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3, ease: "easeOut" }}
      className={`absolute flex flex-col items-center gap-2 group cursor-${isLocked ? 'not-allowed' : 'pointer'} z-10`}
      style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
    >
      <div 
        className={`w-14 h-14 md:w-16 md:h-16 rounded-none flex flex-col items-center justify-center border-2 rotate-45 transition-all duration-300
        ${isActive ? 'border-primary bg-primary/10 shadow-[0_0_20px_-5px_rgba(167,139,250,0.4)]' : ''}
        ${isMastered ? 'border-success bg-success/10' : ''}
        ${isLocked ? 'border-surface-400 bg-surface-200 opacity-60' : ''}
        group-hover:scale-105`}
      >
        <div className="-rotate-45 pl-1.5 pt-1.5">
          {isMastered && <Check size={20} className="text-success" />}
          {isActive && <div className="w-3 h-3 bg-primary animate-pulse" />}
          {isLocked && <Lock size={18} className="text-surface-400" />}
        </div>
      </div>
      
      <div className={`text-xs font-bold uppercase tracking-widest mt-4 text-center ${isLocked ? 'text-surface-400' : 'text-white'}`}>
        {label}
      </div>
      
      {/* Tooltip on hover */}
      {isLocked && (
        <div className="absolute top-24 opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-surface-400 p-2 pointer-events-none whitespace-nowrap z-50">
          <span className="text-[10px] text-error font-mono font-bold tracking-widest uppercase">System Locked</span>
          <p className="text-secondary text-xs mt-1">Unlocks after system release.</p>
        </div>
      )}
      {!isLocked && (
        <div className="absolute top-24 opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-primary p-2 pointer-events-none whitespace-nowrap z-50">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs text-white uppercase font-bold">{label} Module</span>
            <span className="text-[10px] font-mono text-primary">{status === 'mastered' && progress === 0 ? '100%' : `${progress}%`} COMPLETE</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function Courses() {
  return (
    <div className="flex-1 w-full max-w-screen-xl mx-auto flex flex-col p-8 lg:p-12 relative overflow-hidden h-[calc(100vh-64px)] z-10">
      
      {/* Header */}
      <div className="flex flex-col gap-4 max-w-2xl mb-12 relative z-20">
        <h1 className="text-5xl font-bold tracking-tight text-white leading-tight">
          Competence Grid.
        </h1>
        <p className="text-secondary text-xl font-medium tracking-wide">
          Linear courses are dead. Absorb modular systems.
        </p>
      </div>

      {/* Grid Canvas Area */}
      <div className="flex-1 w-full bg-surface-100/50 backdrop-blur-sm border border-surface-400 relative overflow-hidden">
        
        {/* Decorative Grid Lines (SVG) behind nodes */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#27272a" strokeWidth="2" fill="none">
            <path d="M 20% 30% L 50% 30% L 80% 50%" strokeDasharray="4 4" />
            <path d="M 50% 30% L 50% 60%" />
            <path d="M 20% 70% L 50% 60% L 80% 80%" strokeDasharray="4 4" />
          </g>
          {/* Active Path highlighting */}
          <g stroke="#a78bfa" strokeWidth="2" fill="none" opacity="0.6">
            <path d="M 20% 30% L 50% 30%" />
            <path d="M 50% 30% L 50% 60%" />
          </g>
        </svg>

        {/* Nodes Placement */}
        <SkillNode id="hooks" label="Hooks" status="mastered" x={20} y={30} delay={0.1} progress={72} />
        <SkillNode id="retention" label="Retention" status="locked" x={50} y={30} delay={0.2} />
        <SkillNode id="story" label="Storytelling" status="locked" x={80} y={50} delay={0.3} />
        
        <SkillNode id="psych" label="Psychology" status="mastered" x={20} y={70} delay={0.4} progress={100} />
        <SkillNode id="editor" label="Editor Synergies" status="active" x={50} y={60} delay={0.5} progress={8} />
        <SkillNode id="distro" label="Distribution" status="active" x={80} y={80} delay={0.6} progress={45} />
      </div>

    </div>
  );
}
