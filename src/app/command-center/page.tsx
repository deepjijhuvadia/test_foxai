"use client";

import { motion } from "framer-motion";

export default function CommandCenter() {
  return (
    <>
      <style>{`
        :root {
          --bg:   #09090b;
          --sl:   #0c0c0f;
          --sm:   #111113;
          --sh:   #18181b;
          --bd:   #27272a;
          --v:    #a78bfa;
          --v05:  rgba(167,139,250,0.05);
          --v10:  rgba(167,139,250,0.10);
          --v20:  rgba(167,139,250,0.20);
          --v40:  rgba(167,139,250,0.40);
          --ok:   #34d399;
          --t1:   #fafafa;
          --t2:   #a1a1aa;
        }

        .cs-root {
          position: relative;
          width: 100%;
          height: calc(100vh - 64px);
          background: var(--bg);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          font-family: ui-sans-serif, system-ui, sans-serif;
          color: var(--t1);
        }

        /* fixed grid */
        .cs-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(var(--bd) 1px, transparent 1px),
            linear-gradient(90deg, var(--bd) 1px, transparent 1px);
          background-size: 48px 48px;
          opacity: 0.22;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 75%);
        }

        /* violet glow orbs */
        .cs-glow-a {
          position: absolute;
          width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(167,139,250,0.10) 0%, transparent 70%);
          top: -160px; right: -160px;
          pointer-events: none;
        }
        .cs-glow-b {
          position: absolute;
          width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%);
          bottom: -80px; left: 5%;
          pointer-events: none;
        }

        /* center card */
        .cs-card {
          position: relative;
          z-index: 10;
          background: var(--sm);
          border: 1px solid var(--bd);
          padding: 64px 72px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 560px;
          width: 90%;
          box-shadow:
            0 0 0 1px var(--v10),
            0 4px 8px rgba(0,0,0,0.5),
            0 32px 64px rgba(0,0,0,0.6),
            inset 0 1px 0 rgba(255,255,255,0.04);
        }

        /* top edge shimmer */
        .cs-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--v40), transparent);
        }

        /* corner accent */
        .cs-card::after {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 80px; height: 80px;
          background: conic-gradient(from 180deg at 100% 0%, var(--v20) 0deg, transparent 90deg);
          pointer-events: none;
        }

        .cs-eyebrow {
          font-size: 10px;
          font-family: 'Space Mono', ui-monospace, monospace;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--v);
          margin-bottom: 28px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .cs-eyebrow-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--ok);
          box-shadow: 0 0 8px var(--ok);
          animation: cs-blink 2s ease-in-out infinite;
        }

        .cs-headline {
          font-family: 'Bebas Neue', 'Space Mono', ui-monospace, monospace;
          font-size: clamp(52px, 8vw, 88px);
          line-height: 0.9;
          letter-spacing: 0.02em;
          color: var(--t1);
          margin-bottom: 8px;
        }

        .cs-headline em {
          color: var(--v);
          font-style: normal;
        }

        .cs-sub {
          font-size: 14px;
          color: var(--t2);
          line-height: 1.7;
          max-width: 380px;
          margin: 20px auto 0;
          font-family: 'Space Mono', ui-monospace, monospace;
        }

        /* divider */
        .cs-divider {
          width: 40px; height: 1px;
          background: var(--bd);
          margin: 36px auto;
        }

        /* status row */
        .cs-status-row {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--sl);
          border: 1px solid var(--bd);
          padding: 10px 18px;
        }

        .cs-status-label {
          font-size: 9px;
          font-family: 'Space Mono', ui-monospace, monospace;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--t2);
        }

        .cs-status-val {
          font-size: 9px;
          font-family: 'Space Mono', ui-monospace, monospace;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--v);
          margin-left: auto;
          border: 1px solid var(--v20);
          background: var(--v05);
          padding: 2px 8px;
        }

        /* animated progress bar */
        .cs-bar-wrap {
          width: 100%;
          height: 2px;
          background: var(--sh);
          margin-top: 16px;
          position: relative;
          overflow: hidden;
        }

        .cs-bar-fill {
          position: absolute;
          inset-y: 0; left: 0;
          width: 35%;
          background: var(--v);
          box-shadow: 4px 0 12px var(--v40);
          animation: cs-scan 3s ease-in-out infinite;
        }

        /* bottom system id */
        .cs-system-id {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 9px;
          font-family: 'Space Mono', ui-monospace, monospace;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--bd);
          white-space: nowrap;
        }

        @keyframes cs-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }

        @keyframes cs-scan {
          0%   { left: -35%; }
          100% { left: 100%; }
        }
      `}</style>

      <div className="cs-root">
        <div className="cs-grid" aria-hidden />
        <div className="cs-glow-a" aria-hidden />
        <div className="cs-glow-b" aria-hidden />

        {/* center card */}
        <motion.div
          className="cs-card"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="cs-eyebrow">
            <div className="cs-eyebrow-dot" />
            FoxtacticsAI — Script Lab
          </div>

          <h1 className="cs-headline">
            Coming<br /><em>Soon</em>.
          </h1>

          <p className="cs-sub">
            The Command Center is being engineered.<br />
            Hooks, timelines, retention scoring — all of it, structured and ready.
          </p>

          <div className="cs-divider" />

          <div className="cs-status-row" style={{ width: "100%" }}>
            <span className="cs-status-label">Build Status</span>
            <span className="cs-status-val">In Progress</span>
          </div>

          <div className="cs-bar-wrap">
            <div className="cs-bar-fill" />
          </div>
        </motion.div>

        {/* bottom id */}
        <div className="cs-system-id">
          FXT-CMD-CENTER — V1.0 — RESTRICTED ACCESS
        </div>
      </div>
    </>
  );
}