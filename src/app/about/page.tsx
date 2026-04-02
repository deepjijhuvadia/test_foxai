"use client";

import { useEffect, useRef } from "react";

export default function About() {
  const panelsRef = useRef<HTMLDivElement[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = rootRef.current;
    if (!container) return;
    const onScroll = () => {
      panelsRef.current.forEach((panel) => {
        if (!panel) return;
        const rect = panel.getBoundingClientRect();
        const winH = window.innerHeight;
        const progress = 1 - Math.max(0, Math.min(1, rect.top / winH));
        const maxAngle = 14;
        const angle = maxAngle * (1 - Math.min(1, progress * 2));
        const shadowProgress = Math.min(1, Math.max(0, (winH - rect.bottom) / winH));
        const brightness = 1 - shadowProgress * 0.06;
        panel.style.transform = `rotateX(${angle}deg)`;
        panel.style.filter = `brightness(${brightness})`;
      });
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  const beliefs = [
    {
      num: "01 / 05",
      roman: "I",
      title: ["Virality", "is engineered"],
      titleEm: 1,
      body: "The best-performing content isn't a fluke. It's the result of understanding emotional triggers, timing, platform mechanics, and iteration at scale. We don't chase trends — we construct them.",
      accent: false,
    },
    {
      num: "02 / 05",
      roman: "II",
      title: ["Speed", "beats", "perfection"],
      titleEm: 1,
      body: "A published imperfect piece beats an ideal draft that never ships. We build workflows that compress the gap between idea and distribution — because the market rewards velocity.",
      accent: false,
    },
    {
      num: "03 / 05",
      roman: "III",
      title: ["Distribution", "is everything"],
      titleEm: 1,
      body: "The best content without distribution is noise. We treat distribution as a first-class problem — building pipelines before writing a single word, because reach is a product decision.",
      accent: true,
    },
    {
      num: "04 / 05",
      roman: "IV",
      title: ["Systems", "outlast", "inspiration"],
      titleEm: 1,
      body: "Creative inspiration is a finite resource. We build repeatable playbooks — content matrices, repurposing frameworks, AI-augmented workflows — that produce at scale without depending on a muse.",
      accent: false,
    },
    {
      num: "05 / 05",
      roman: "V",
      title: ["Volume", "is a strategy"],
      titleEm: 1,
      body: "More at-bats means more data, faster learning, and more chances to hit. We believe in flooding the zone: structured, high-cadence output that builds authority while training the algorithm.",
      accent: false,
    },
  ];

  const founders = [
    {
      initials: "DJ",
      name: "Darshan Jijhuvadia",
      role: "Co-Founder & CTO",
      bio: "Builds intelligent systems at the intersection of AI and product. Architect of scalable ML infrastructure and multimodal experiences. Transforms complex models into seamless, real-world applications. Drives the technology vision behind FoxTactics.",
    },
    {
      initials: "US",
      name: "Utkarsh Singh",
      role: "Founder & CEO",
      bio: "Leads FoxTactics with a focus on precision-driven growth. Turns outreach into strategy, and strategy into revenue. Blends marketing insight with execution at scale. Defines the direction, vision, and momentum of the company.",
    },
  ];

  const stats = [
    { num: "47M+", label: "Impressions generated" },
    { num: "12×", label: "Avg. output velocity increase" },
    { num: "6 yrs", label: "Platform infrastructure experience" },
  ];

  const tickerItems = [
    "Virality is engineered",
    "Speed beats perfection",
    "Distribution is everything",
    "Systems outlast inspiration",
    "Volume is a strategy",
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Serif+Display:ital@0;1&family=Space+Mono:wght@400;700&display=swap');

        :root {
          --bg:          #09090b;
          --surf-lo:     #0c0c0f;
          --surf-mid:    #111113;
          --surf-hi:     #18181b;
          --border:      #27272a;
          --violet:      #a78bfa;
          --violet-dim:  rgba(167,139,250,0.08);
          --success:     #34d399;
          --error:       #ef4444;
          --text-pri:    #fafafa;
          --text-sec:    #a1a1aa;
        }

        .about-root {
          background: var(--bg);
          color: var(--text-pri);
          font-family: 'Space Mono', monospace;
          overflow-x: hidden;
          overflow-y: auto;
          flex: 1;
          min-height: 0;
        }

        /* ── HERO ── */
        .about-hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px 48px;
          position: relative;
          overflow: hidden;
        }

        .about-hero-bg {
          position: absolute;
          right: -20px;
          top: 50%;
          transform: translateY(-50%);
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(180px, 28vw, 360px);
          color: var(--text-pri);
          opacity: 0.025;
          line-height: 1;
          user-select: none;
          pointer-events: none;
        }

        .about-eyebrow {
          font-size: 11px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--violet);
          margin-bottom: 32px;
          opacity: 0;
          transform: translateY(20px);
          animation: abt-fadeUp 0.6s 0.2s forwards;
        }

        .about-h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(72px, 13vw, 160px);
          line-height: 0.9;
          color: var(--text-pri);
          margin-bottom: 40px;
          opacity: 0;
          transform: translateY(30px);
          animation: abt-fadeUp 0.8s 0.35s forwards;
        }

        .about-h1 em {
          font-style: italic;
          color: var(--violet);
          font-family: 'DM Serif Display', serif;
        }

        .about-sub {
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          font-size: clamp(18px, 2.5vw, 26px);
          color: var(--text-sec);
          max-width: 480px;
          line-height: 1.5;
          margin-bottom: 48px;
          opacity: 0;
          transform: translateY(20px);
          animation: abt-fadeUp 0.7s 0.6s forwards;
        }

        .about-rule {
          width: 0;
          height: 2px;
          background: var(--violet);
          animation: abt-expand 1s 1s forwards;
        }

        /* ── TICKER ── */
        .about-ticker {
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 24px 0;
          overflow: hidden;
          background: var(--surf-lo);
        }

        .about-ticker-inner {
          display: flex;
          white-space: nowrap;
          animation: abt-ticker 18s linear infinite;
        }

        .about-ticker-item {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 0.05em;
          color: var(--text-pri);
          padding: 0 32px;
          flex-shrink: 0;
        }

        .about-ticker-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          background: var(--violet);
          border-radius: 50%;
          margin: 0 32px;
          vertical-align: middle;
        }

        /* ── SCROLL STAGE ── */
        .about-stage {
          perspective: 1200px;
          perspective-origin: 50% 50%;
          padding: 80px 0 160px;
          position: relative;
          background: var(--bg);
        }

        .about-stage::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: var(--border);
        }

        .about-stage-label {
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-sec);
          padding: 0 48px;
          margin-bottom: 48px;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .about-stage-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--border);
        }

        .about-card-stack {
          display: flex;
          flex-direction: column;
          padding: 0 32px;
          transform-style: preserve-3d;
        }

        /* ── PANELS ── */
        .about-panel {
          position: relative;
          background: var(--surf-mid);
          border: 1px solid var(--border);
          border-bottom: none;
          padding: 56px 48px;
          transform-style: preserve-3d;
          transform-origin: top center;
          overflow: hidden;
          transition: background 0.2s;
        }

        .about-panel:last-child {
          border-bottom: 1px solid var(--border);
        }

        .about-panel:hover {
          background: var(--surf-hi);
        }

        .about-panel-num {
          font-size: 11px;
          letter-spacing: 0.2em;
          color: var(--text-sec);
          margin-bottom: 24px;
        }

        .about-panel-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(40px, 7vw, 88px);
          line-height: 0.92;
          color: var(--text-pri);
          margin-bottom: 20px;
          letter-spacing: 0.01em;
        }

        .about-panel-title em {
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          color: var(--violet);
        }

        .about-panel-body {
          font-size: 14px;
          line-height: 1.8;
          color: var(--text-sec);
          max-width: 520px;
        }

        .about-panel-accent-txt {
          position: absolute;
          right: 48px;
          top: 50%;
          transform: translateY(-50%);
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(60px, 9vw, 120px);
          color: var(--text-pri);
          opacity: 0.04;
          line-height: 1;
          user-select: none;
          pointer-events: none;
        }

        /* Violet accent panel */
        .about-panel--violet {
          background: var(--violet-dim);
          border-color: rgba(167,139,250,0.2);
        }

        .about-panel--violet:hover {
          background: rgba(167,139,250,0.12);
        }

        .about-panel--violet .about-panel-accent-txt {
          color: var(--violet);
          opacity: 0.06;
        }

        .about-panel--violet::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: var(--violet);
        }

        /* ── FOUNDERS ── */
        .about-founders {
          padding: 100px 48px;
          border-top: 1px solid var(--border);
          background: var(--surf-lo);
        }

        .about-founders-label {
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-sec);
          margin-bottom: 64px;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .about-founders-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--border);
        }

        .about-founders-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
        }

        .about-founder-card {
          background: var(--surf-mid);
          padding: 48px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          transition: background 0.2s;
          cursor: pointer;
        }

        .about-founder-card:hover {
          background: var(--surf-hi);
        }

        .about-founder-card:hover .about-founder-role {
          color: var(--violet);
        }

        .about-founder-avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--surf-hi);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          letter-spacing: 0.05em;
          color: var(--violet);
        }

        .about-founder-name {
          font-family: 'DM Serif Display', serif;
          font-size: 28px;
          color: var(--text-pri);
        }

        .about-founder-role {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-sec);
          margin-top: 4px;
          transition: color 0.2s;
        }

        .about-founder-bio {
          font-size: 13px;
          line-height: 1.75;
          color: var(--text-sec);
        }

        /* ── STATS ── */
        .about-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
          border-top: none;
        }

        .about-stat-cell {
          background: var(--surf-lo);
          padding: 40px 48px;
          transition: background 0.2s;
        }

        .about-stat-cell:hover {
          background: var(--surf-mid);
        }

        .about-stat-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 52px;
          color: var(--violet);
          line-height: 1;
          margin-bottom: 8px;
        }

        .about-stat-label {
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-sec);
        }

        /* ── KEYFRAMES ── */
        @keyframes abt-fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes abt-expand {
          to { width: 80px; }
        }

        @keyframes abt-ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 640px) {
          .about-hero          { padding: 60px 24px; }
          .about-panel         { padding: 40px 24px; }
          .about-stage-label   { padding: 0 24px; }
          .about-card-stack    { padding: 0 12px; }
          .about-founders      { padding: 60px 24px; }
          .about-founder-card  { padding: 32px 24px; }
          .about-founders-grid { grid-template-columns: 1fr; }
          .about-stats         { grid-template-columns: 1fr 1fr; }
          .about-stats .about-stat-cell:last-child { grid-column: 1 / -1; }
        }
      `}</style>

      <div className="about-root" ref={rootRef}>

        {/* ── HERO ── */}
        <section className="about-hero">
          <div className="about-hero-bg" aria-hidden>01</div>
          <p className="about-eyebrow">Manifesto — What we believe</p>
          <h1 className="about-h1">
            Content<br />
            is <em>not</em><br />
            chaos.
          </h1>
          <p className="about-sub">
            We&apos;re building the infrastructure that turns creative output into a predictable, repeatable system.
          </p>
          <div className="about-rule" />
        </section>

        {/* ── TICKER ── */}
        <div className="about-ticker" aria-hidden>
          <div className="about-ticker-inner">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i}>
                <span className="about-ticker-item">{item}</span>
                <span className="about-ticker-dot" />
              </span>
            ))}
          </div>
        </div>

        {/* ── 3D SCROLL STAGE ── */}
        <section className="about-stage">
          <div className="about-stage-label">Core Beliefs — Scroll to unfold</div>

          <div className="about-card-stack">
            {beliefs.map((b, i) => (
              <div
                key={i}
                className={`about-panel${b.accent ? " about-panel--violet" : ""}`}
                ref={(el) => { if (el) panelsRef.current[i] = el; }}
              >
                <div className="about-panel-accent-txt" aria-hidden>{b.roman}</div>
                <div className="about-panel-num">— {b.num}</div>
                <h2 className="about-panel-title">
                  {b.title.map((line, li) => (
                    <span key={li}>
                      {li === b.titleEm ? <em>{line}</em> : line}
                      {li < b.title.length - 1 && <br />}
                    </span>
                  ))}
                </h2>
                <p className="about-panel-body">{b.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FOUNDERS ── */}
        <section className="about-founders">
          <div className="about-founders-label">The team — Who&apos;s building this</div>

          <div className="about-founders-grid">
            {founders.map((f) => (
              <div key={f.initials} className="about-founder-card">
                <div className="about-founder-avatar">{f.initials}</div>
                <div>
                  <div className="about-founder-role">{f.role}</div>
                  <div className="about-founder-name">{f.name}</div>
                </div>
                <p className="about-founder-bio">{f.bio}</p>
              </div>
            ))}
          </div>

          <div className="about-stats">
            {stats.map((s) => (
              <div key={s.label} className="about-stat-cell">
                <div className="about-stat-num">{s.num}</div>
                <div className="about-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}