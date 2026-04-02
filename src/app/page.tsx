"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { useLenis } from "@/components/animations/useLenis";

gsap.registerPlugin(ScrollTrigger);

const formatTypes = ["Script", "Video", "Hook", "Idea"];
const platforms = ["YT", "Reels", "TikTok"];

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [activeFormat, setActiveFormat] = useState("Script");
  const [activePlatform, setActivePlatform] = useState("YT");
  const [isDeepResearch, setIsDeepResearch] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const score = Math.min(Math.max((inputText.length / 50) * 100, 10), 98);

  // Lenis smooth scroll (synced to GSAP ticker)
  useLenis();

  // Refs for GSAP targets
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  const heroBadgeRef = useRef<HTMLDivElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const heroProofsRef = useRef<HTMLDivElement>(null);
  const heroGlowARef = useRef<HTMLDivElement>(null);
  const heroGlowBRef = useRef<HTMLDivElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);
  const heroRightRef = useRef<HTMLDivElement>(null);
  const s1Ref = useRef<HTMLElement>(null);
  const s1TextRef = useRef<HTMLHeadingElement>(null);
  const s1SubRef = useRef<HTMLParagraphElement>(null);
  const s2CardsRef = useRef<HTMLDivElement>(null);
  const s3StepsRef = useRef<HTMLDivElement>(null);
  const s4LeftRef = useRef<HTMLDivElement>(null);
  const s4MockRef = useRef<HTMLDivElement>(null);
  const s5StatsRef = useRef<HTMLDivElement>(null);
  const s7Ref = useRef<HTMLElement>(null);
  const s7HeadRef = useRef<HTMLHeadingElement>(null);
  const s7SubRef = useRef<HTMLParagraphElement>(null);
  const s7BtnRef = useRef<HTMLAnchorElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * 10, y: -((e.clientX - r.left) / r.width - 0.5) * 10 });
  };
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  // ─── Magnetic CTA button effect ─────────────────────────────────
  useEffect(() => {
    const btn = s7BtnRef.current;
    if (!btn) return;
    const handleMove = (e: MouseEvent) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      gsap.to(btn, { x: x * 0.18, y: y * 0.18, duration: 0.4, ease: "power2.out" });
    };
    const handleLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
    };
    btn.addEventListener("mousemove", handleMove);
    btn.addEventListener("mouseleave", handleLeave);
    return () => {
      btn.removeEventListener("mousemove", handleMove);
      btn.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ─── HERO: SplitType word stagger ──────────────────────────────
      if (heroHeadingRef.current) {
        const split = new SplitType(heroHeadingRef.current, { types: "words" });
        gsap.set(split.words, { opacity: 0, y: 40, scale: 0.98, willChange: "transform, opacity" });
        gsap.to(split.words, {
          opacity: 1, y: 0, scale: 1,
          duration: 1.0, stagger: 0.07, ease: "power3.out", delay: 0.25,
        });
      }

      // Badge + sub + proofs cascade (left column)
      gsap.set([heroBadgeRef.current, heroSubRef.current, heroProofsRef.current], {
        opacity: 0, y: 28, willChange: "transform, opacity",
      });
      gsap.to(heroBadgeRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.1 });
      gsap.to(heroSubRef.current,   { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.6 });
      gsap.to(heroProofsRef.current,{ opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.8 });

      // Right panel: slide from x:60 with opacity (cinematic)
      if (heroRightRef.current) {
        gsap.set(heroRightRef.current, { opacity: 0, x: 60, willChange: "transform, opacity" });
        gsap.to(heroRightRef.current, { opacity: 1, x: 0, duration: 1.1, ease: "power3.out", delay: 0.5 });
      }

      // Hero glow parallax on scroll
      gsap.to(heroGlowARef.current, {
        yPercent: 18, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(heroGlowBRef.current, {
        yPercent: 12, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });

      // ─── SEC 1: PINNED STORYTELLING ────────────────────────────────
      if (s1Ref.current && s1TextRef.current) {
        const split1 = new SplitType(s1TextRef.current, { types: "lines" });
        gsap.set(split1.lines, { opacity: 0, y: 32, willChange: "transform, opacity" });
        gsap.set(s1TextRef.current, { scale: 0.96 });
        if (s1SubRef.current) gsap.set(s1SubRef.current, { opacity: 0, y: 20 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: s1Ref.current,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });
        tl.to(s1TextRef.current, { scale: 1, duration: 1, ease: "power2.out" });
        split1.lines?.forEach((line, i) => {
          const isHighlight = line.textContent?.includes("3") || line.textContent?.toLowerCase().includes("seconds");
          tl.to(line, {
            opacity: 1, y: 0, duration: 0.6,
            color: isHighlight ? "var(--v)" : "var(--t1)",
            scale: isHighlight ? 1.05 : 1,
            ease: "power3.out",
          }, i * 0.35);
        });
        if (s1SubRef.current) {
          tl.to(s1SubRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "+=0.15");
        }
      }

      // ─── SEC 2: CAPABILITIES CARDS (blur → sharp stagger) ─────────
      if (s2CardsRef.current) {
        const cards = s2CardsRef.current.querySelectorAll(".cc");
        gsap.set(cards, { opacity: 0, y: 50, scale: 0.97, filter: "blur(10px)", willChange: "transform, opacity, filter" });
        ScrollTrigger.batch(cards, {
          onEnter: (els) => gsap.to(els, {
            opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
            duration: 0.9, stagger: 0.15, ease: "power2.out",
          }),
          start: "top 85%",
        });
      }

      // ─── SEC 3: STEPS (alternating x offsets + number scale-pop) ──
      if (s3StepsRef.current) {
        const steps = Array.from(s3StepsRef.current.querySelectorAll(".stp"));
        steps.forEach((step, i) => {
          const xOffset = i % 2 === 0 ? -30 : 30;
          const dot = step.querySelector(".stp-dot");
          gsap.set(step, { opacity: 0, y: 40, x: xOffset, filter: "blur(6px)", willChange: "transform, opacity, filter" });
          if (dot) gsap.set(dot, { scale: 0.85 });
          const stTl = gsap.timeline({
            scrollTrigger: { trigger: step, start: "top 82%", once: true },
          });
          stTl
            .to(step, { opacity: 1, y: 0, x: 0, filter: "blur(0px)", duration: 0.85, ease: "power3.out", delay: i * 0.1 })
            .to(dot ?? {}, { scale: 1, duration: 0.4, ease: "back.out(1.8)" }, "-=0.5");
        });
      }

      // ─── SEC 4: OUTPUT PREVIEW (left text + right panel slide) ────
      if (s4LeftRef.current) {
        gsap.set(s4LeftRef.current, { opacity: 0, y: 50, willChange: "transform, opacity" });
        gsap.to(s4LeftRef.current, {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".s4l", start: "top 80%", once: true },
        });
      }
      if (s4MockRef.current) {
        gsap.set(s4MockRef.current, { opacity: 0, x: 50, willChange: "transform, opacity" });
        gsap.to(s4MockRef.current, {
          opacity: 1, x: 0, duration: 1.0, ease: "power3.out",
          delay: 0.15,
          scrollTrigger: { trigger: ".s4l", start: "top 80%", once: true },
        });
        // Subtle background parallax
        gsap.to(s4MockRef.current, {
          yPercent: -5, ease: "none",
          scrollTrigger: { trigger: ".s4", start: "top bottom", end: "bottom top", scrub: true },
        });
      }

      // ─── SEC 5: STATS (scale from 0.95 + count-up numbers) ────────
      if (s5StatsRef.current) {
        const statCells = Array.from(s5StatsRef.current.querySelectorAll(".stcl"));
        gsap.set(statCells, { opacity: 0, y: 40, scale: 0.95, willChange: "transform, opacity" });

        ScrollTrigger.create({
          trigger: s5StatsRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(statCells, {
              opacity: 1, y: 0, scale: 1,
              duration: 0.8, stagger: 0.15, ease: "power2.out",
            });
            // Count-up for numeric values
            const nums = [15000, 0, 100]; // 0 = ∞ (skip)
            statCells.forEach((cell, i) => {
              if (nums[i] === 0) return;
              const numEl = cell.querySelector(".stnum");
              if (!numEl) return;
              const target = nums[i];
              const suffix = numEl.textContent?.replace(/[0-9]/g, "") ?? "";
              const obj = { val: 0 };
              gsap.to(obj, {
                val: target, duration: 1.8, ease: "power2.out", delay: i * 0.15,
                onUpdate: () => {
                  numEl.textContent = (i === 0
                    ? (obj.val >= 1000 ? Math.floor(obj.val / 1000) + "K" : Math.floor(obj.val).toString())
                    : Math.floor(obj.val).toString()) + suffix;
                },
              });
            });
          },
        });
      }

      // ─── SEC 6: EDITOR DECO GRID ───────────────────────────────────
      const s6dcs = document.querySelectorAll(".s6dc");
      if (s6dcs.length) {
        gsap.set(s6dcs, { opacity: 0, y: 40, filter: "blur(8px)", willChange: "transform, opacity, filter" });
        ScrollTrigger.batch(s6dcs, {
          onEnter: (els) => gsap.to(els, {
            opacity: 1, y: 0, filter: "blur(0px)",
            duration: 0.8, stagger: 0.1, ease: "power3.out",
          }),
          start: "top 85%",
        });
      }
      // S6 left text section parallax bg
      gsap.to(".s6i > div:first-child", {
        yPercent: -8, ease: "none",
        scrollTrigger: { trigger: ".s6", start: "top bottom", end: "bottom top", scrub: true },
      });

      // ─── SEC 7: FINAL CTA ──────────────────────────────────────────
      if (s7HeadRef.current && s7SubRef.current && s7BtnRef.current) {
        gsap.set([s7HeadRef.current, s7SubRef.current, s7BtnRef.current], {
          opacity: 0, y: 80, willChange: "transform, opacity",
        });
        gsap.set(s7HeadRef.current, { scale: 0.96 });
        gsap.set(s7BtnRef.current, { scale: 0.96 });

        const ctaTl = gsap.timeline({
          scrollTrigger: { trigger: s7Ref.current, start: "top 75%", once: true },
        });
        ctaTl
          .to(s7HeadRef.current, { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" })
          .to(s7SubRef.current,  { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, "-=0.6")
          .to(s7BtnRef.current,  { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out" }, "-=0.4");
      }

      // ─── SECTION ENTRANCES (generic labels/dividers) ───────────────
      document.querySelectorAll(".section-reveal").forEach((el) => {
        gsap.set(el, { opacity: 0, y: 50, willChange: "transform, opacity" });
        gsap.to(el, {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        });
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&family=Inter:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg:      #09090b;
          --sl:      #0c0c0f;
          --sm:      #111113;
          --sh:      #18181b;
          --bd:      #27272a;
          --v:       #a78bfa;
          --v05:     rgba(167,139,250,0.05);
          --v10:     rgba(167,139,250,0.10);
          --v20:     rgba(167,139,250,0.20);
          --v40:     rgba(167,139,250,0.40);
          --ok:      #34d399;
          --err:     #ef4444;
          --t1:      #fafafa;
          --t2:      #a1a1aa;
          --mono:    'Space Mono', ui-monospace, monospace;
          --display: 'Bebas Neue', sans-serif;
          --sans:    'Inter', ui-sans-serif, sans-serif;
        }

        .pg {
          background: var(--bg);
          color: var(--t1);
          font-family: var(--sans);
          overflow-x: hidden;
        }

        .pg-grid {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(var(--bd) 1px, transparent 1px),
            linear-gradient(90deg, var(--bd) 1px, transparent 1px);
          background-size: 48px 48px;
          opacity: 0.2;
          mask-image: radial-gradient(ellipse 100% 80% at 50% 20%, black 0%, transparent 75%);
        }

        /* HERO */
        .hero { position: relative; min-height: 100vh; overflow: hidden; background: var(--bg); }
        .hero-glow-a {
          position: absolute; border-radius: 50%; pointer-events: none;
          width: 700px; height: 700px; top: -160px; right: -160px; z-index: 1;
          background: radial-gradient(circle, rgba(167,139,250,0.11) 0%, transparent 70%);
          will-change: transform;
        }
        .hero-glow-b {
          position: absolute; border-radius: 50%; pointer-events: none;
          width: 450px; height: 450px; bottom: 120px; left: 4%; z-index: 1;
          background: radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 70%);
          will-change: transform;
        }
        .hero-body {
          position: relative; z-index: 2;
          display: flex; align-items: center;
          max-width: 1400px; margin: 0 auto;
          padding: 72px 64px 200px; gap: 64px;
        }
        @media (max-width: 1250px) {
          .hero-body { flex-direction: column; padding: 48px 32px 180px; gap: 56px; align-items: flex-start; }
        }

        .hl { flex: 0 0 42%; display: flex; flex-direction: column; }
        .hl-badge {
          display: inline-flex; align-items: center; gap: 8px;
          border: 1px solid var(--bd); background: var(--sl);
          padding: 6px 14px 6px 10px; border-radius: 999px; width: fit-content; margin-bottom: 36px;
        }
        .hl-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--ok); box-shadow: 0 0 8px var(--ok); animation: blink 2s ease-in-out infinite; }
        .hl-badge-txt { font-size: 11px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: var(--t2); }
        .hl-h1 { font-family: var(--display); font-size: clamp(64px, 9vw, 118px); line-height: 0.9; letter-spacing: 0.01em; color: var(--t1); margin-bottom: 20px; }
        .hl-h1 em { color: var(--v); font-style: normal; position: relative; }
        .hl-h1 em::after { content: ''; position: absolute; bottom: 4px; left: 0; right: 0; height: 3px; background: var(--v); opacity: 0.38; }
        .hl-h1 .word { display: inline-block; will-change: transform, opacity; }
        .hl-sub { font-size: 17px; color: var(--t2); line-height: 1.6; max-width: 360px; margin-bottom: 48px; }
        .hl-proofs { display: flex; flex-direction: column; gap: 12px; }
        .hl-proof { display: flex; align-items: center; gap: 12px; }
        .hl-dia { width: 6px; height: 6px; background: var(--v); transform: rotate(45deg); flex-shrink: 0; box-shadow: 0 0 6px var(--v40); }
        .hl-ptxt { font-size: 13px; font-weight: 500; color: var(--t2); letter-spacing: 0.02em; }

        .hr { flex: 1; display: flex; align-items: stretch; justify-content: flex-end; gap: 20px; flex-wrap: wrap; }
        @media (max-width: 1250px) { .hr { flex-direction: row; width: 100%; justify-content: flex-start; } }
        @media (max-width: 768px) { .hr { flex-direction: column; } }

        /* input card */
        .ic {
          width: 100%; max-width: 420px; flex-shrink: 0;
          background: var(--sm); border: 1px solid var(--bd);
          padding: 30px; display: flex; flex-direction: column; gap: 20px;
          position: relative; transform-style: preserve-3d;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          box-shadow: 0 0 0 1px var(--v10), 0 4px 8px rgba(0,0,0,0.4), 0 24px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04);
          will-change: transform, opacity;
        }
        .ic::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, var(--v40), transparent); pointer-events: none; }
        .ic::after  { content: ''; position: absolute; top: 0; right: 0; width: 60px; height: 60px; background: conic-gradient(from 180deg at 100% 0%, var(--v20) 0deg, transparent 90deg); pointer-events: none; }
        .ic-hdr { display: flex; align-items: center; justify-content: space-between; padding-bottom: 18px; border-bottom: 1px solid var(--bd); }
        .ic-lbl { font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--t2); font-family: var(--mono); }
        .ic-status { display: flex; align-items: center; gap: 6px; font-family: var(--mono); font-size: 10px; color: var(--ok); }
        .ic-sdot { width: 5px; height: 5px; border-radius: 50%; background: var(--ok); box-shadow: 0 0 6px var(--ok); }
        .ic-field-lbl { font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--t2); font-family: var(--mono); margin-bottom: 8px; }
        .ic-ta {
          width: 100%; background: var(--sl); border: 1px solid var(--bd);
          padding: 12px 14px; color: var(--t1); font-family: var(--sans); font-size: 13px; line-height: 1.6;
          resize: none; height: 96px; outline: none; transition: border-color 0.2s, box-shadow 0.2s;
        }
        .ic-ta::placeholder { color: var(--t2); opacity: 0.4; }
        .ic-ta:focus { border-color: var(--v40); box-shadow: 0 0 0 3px var(--v05); }
        .tg { display: flex; gap: 1px; background: var(--bd); padding: 1px; }
        .tb { flex: 1; padding: 7px 10px; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; border: none; cursor: pointer; font-family: var(--mono); background: var(--sl); color: var(--t2); transition: background 0.15s, color 0.15s; }
        .tb:hover:not(.on) { background: var(--sh); color: var(--t1); }
        .tb.on { background: var(--v); color: #09090b; }
        .dr { display: flex; align-items: center; gap: 10px; cursor: pointer; user-select: none; padding: 10px 14px; border: 1px solid var(--bd); background: var(--sl); transition: border-color 0.2s, background 0.2s; }
        .dr:hover { border-color: var(--v40); background: var(--v05); }
        .dr.on { border-color: var(--v40); background: var(--v10); }
        .dr-box { width: 14px; height: 14px; border: 1px solid var(--bd); background: var(--sm); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.15s, border-color 0.15s; }
        .dr-box.on { background: var(--v); border-color: var(--v); }
        .dr-inn { width: 7px; height: 7px; background: #09090b; }
        .dr-lbl { font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--t2); font-family: var(--mono); transition: color 0.15s; }
        .dr.on .dr-lbl { color: var(--v); }
        .dr-badge { margin-left: auto; font-size: 9px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--v); background: var(--v10); border: 1px solid var(--v20); padding: 2px 8px; font-family: var(--mono); }
        .run {
          width: 100%; padding: 13px; background: var(--v); border: none; color: #09090b;
          font-size: 11px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; font-family: var(--mono);
          cursor: pointer; position: relative; overflow: hidden;
          box-shadow: 0 0 20px var(--v20), 0 4px 12px rgba(0,0,0,0.3); transition: box-shadow 0.2s, transform 0.1s;
        }
        .run::before { content: ''; position: absolute; inset: 0; background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%); transform: translateX(-100%); transition: transform 0.5s; }
        .run:hover::before { transform: translateX(100%); }
        .run:hover { box-shadow: 0 0 32px var(--v40), 0 4px 16px rgba(0,0,0,0.4); }
        .run:active { transform: scale(0.99); }

        /* analysis panel */
        .ap {
          width: 100%; max-width: 292px; flex-shrink: 0; height: 472px;
          background: var(--sl); border: 1px solid var(--bd); padding: 22px;
          display: none; flex-direction: column; justify-content: space-between; position: relative;
          box-shadow: 0 0 0 1px var(--v05), 0 24px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03);
        }
        .ap::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, var(--bd), transparent); }
        @media (min-width: 1024px) { .ap { display: flex; } }
        .ap-hdr { display: flex; align-items: center; justify-content: space-between; padding-bottom: 16px; border-bottom: 1px solid var(--bd); margin-bottom: 18px; }
        .ap-lbl { font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--t2); font-family: var(--mono); }
        .ap-ok  { font-family: var(--mono); font-size: 10px; font-weight: 700; color: var(--ok); }
        .sl-lbl { font-family: var(--mono); font-size: 10px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--t2); margin-bottom: 10px; }
        .sl-bar { width: 100%; height: 3px; background: var(--sh); position: relative; overflow: hidden; }
        .sl-num { font-family: var(--mono); font-size: 38px; font-weight: 700; color: var(--t1); letter-spacing: -0.02em; margin-top: 10px; line-height: 1; }
        .sl-num span { font-size: 17px; color: var(--t2); font-weight: 400; }
        .mg { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--bd); margin-top: 18px; }
        .mc { background: var(--sl); padding: 11px; }
        .ml { font-family: var(--mono); font-size: 9px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--t2); margin-bottom: 3px; }
        .mv { font-family: var(--mono); font-size: 12px; font-weight: 700; color: var(--t1); }
        .mv.v { color: var(--v); } .mv.ok { color: var(--ok); }
        .pb { background: var(--sm); border: 1px solid var(--bd); padding: 10px 12px; font-size: 11px; line-height: 1.6; color: var(--t2); margin-top: 12px; font-family: var(--mono); min-height: 52px; }
        .af { display: flex; gap: 14px; padding-top: 12px; border-top: 1px solid var(--bd); }
        .afc { display: flex; flex-direction: column; gap: 3px; }
        .afl { font-family: var(--mono); font-size: 9px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--t2); }
        .afv { font-family: var(--mono); font-size: 11px; font-weight: 700; color: var(--t1); }
        .afv.v { color: var(--v); } .afv.ok { color: var(--ok); }

        /* SECTIONS */
        .s { position: relative; z-index: 2; }
        .si { max-width: 1200px; margin: 0 auto; padding: 120px 64px; }
        @media (max-width: 768px) { .si { padding: 80px 24px; } }
        .ey { font-size: 10px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: var(--v); font-family: var(--mono); display: block; margin-bottom: 16px; }
        .sh2 { font-family: var(--display); font-size: clamp(38px, 5vw, 70px); line-height: 0.93; color: var(--t1); letter-spacing: 0.01em; }
        .ssub { font-size: 17px; color: var(--t2); line-height: 1.65; max-width: 540px; margin-top: 14px; }
        .sdiv { width: 36px; height: 2px; background: var(--v); margin-bottom: 48px; opacity: 0.55; }

        /* sec 1 — reality / pinned */
        .s1 { background: var(--bg); }
        .s1i { max-width: 860px; margin: 0 auto; padding: 140px 64px; text-align: center; }
        @media (max-width: 768px) { .s1i { padding: 80px 24px; } }
        .s1h { font-family: var(--display); font-size: clamp(46px, 7vw, 92px); line-height: 0.92; color: var(--t1); letter-spacing: 0.01em; margin-bottom: 26px; will-change: transform, opacity; }
        .s1h .line { display: block; overflow: visible; }
        .s1s { font-size: 19px; color: var(--t2); line-height: 1.65; max-width: 580px; margin: 0 auto 14px; will-change: transform, opacity; }
        .s1p { font-size: 13px; color: var(--t2); opacity: 0.6; font-family: var(--mono); letter-spacing: 0.04em; }
        .vc  { color: var(--v); }

        /* sec 2 — capabilities */
        .s2 { background: var(--sl); border-top: 1px solid var(--bd); }
        .cg { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: var(--bd); margin-top: 60px; }
        @media (max-width: 768px) { .cg { grid-template-columns: 1fr; } }
        .cc { background: var(--sm); padding: 48px 32px; position: relative; overflow: hidden; transition: background 0.2s; will-change: transform, opacity, filter; }
        .cc:hover { background: var(--sh); }
        .cc::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--v), transparent); opacity: 0; transition: opacity 0.3s; }
        .cc:hover::before { opacity: 1; }
        .cc-n { font-family: var(--display); font-size: 60px; color: var(--t1); opacity: 0.04; line-height: 1; margin-bottom: 20px; }
        .cc-t { font-family: var(--display); font-size: 26px; color: var(--t1); letter-spacing: 0.02em; margin-bottom: 12px; }
        .cc-b { font-size: 14px; color: var(--t2); line-height: 1.75; }

        /* sec 3 — how it works */
        .s3 { background: var(--bg); border-top: 1px solid var(--bd); }
        .stps { display: grid; grid-template-columns: repeat(3,1fr); gap: 0; margin-top: 60px; position: relative; }
        @media (max-width: 768px) { .stps { grid-template-columns: 1fr; } }
        .stps::before { content: ''; position: absolute; top: 19px; left: 8%; right: 8%; height: 1px; background: linear-gradient(90deg, transparent, var(--bd) 15%, var(--bd) 85%, transparent); }
        @media (max-width: 768px) { .stps::before { display: none; } }
        .stp { padding-right: 36px; will-change: transform, opacity, filter; }
        @media (max-width: 768px) { .stp { padding: 0 0 40px 0; } }
        .stp-dot { width: 38px; height: 38px; border: 1px solid var(--bd); background: var(--sm); display: flex; align-items: center; justify-content: center; margin-bottom: 26px; font-family: var(--mono); font-size: 10px; font-weight: 700; color: var(--v); letter-spacing: 0.1em; position: relative; z-index: 1; box-shadow: 0 0 0 4px var(--bg); }
        .stp-t { font-family: var(--display); font-size: 22px; color: var(--t1); margin-bottom: 8px; letter-spacing: 0.02em; }
        .stp-b { font-size: 13px; color: var(--t2); line-height: 1.7; }

        /* sec 4 — output preview */
        .s4 { background: var(--sl); border-top: 1px solid var(--bd); }
        .s4l { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; margin-top: 60px; }
        @media (max-width: 900px) { .s4l { grid-template-columns: 1fr; gap: 40px; } }
        .s4bl { display: flex; flex-direction: column; gap: 14px; margin-top: 28px; }
        .s4b  { display: flex; align-items: flex-start; gap: 12px; }
        .s4bd { width: 4px; height: 4px; background: var(--v); transform: rotate(45deg); flex-shrink: 0; margin-top: 8px; }
        .s4bt { font-size: 15px; color: var(--t2); line-height: 1.6; }
        .mock { background: var(--sm); border: 1px solid var(--bd); padding: 22px; display: flex; flex-direction: column; gap: 12px; position: relative; box-shadow: 0 0 0 1px var(--v10), 0 32px 64px rgba(0,0,0,0.5); will-change: transform, opacity; }
        .mock::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, var(--v40), transparent); }
        .mock-hdr { display: flex; align-items: center; justify-content: space-between; padding-bottom: 12px; border-bottom: 1px solid var(--bd); }
        .chip { font-family: var(--mono); font-size: 9px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; border: 1px solid var(--bd); background: var(--sl); padding: 3px 8px; color: var(--t2); }
        .chip.v  { color: var(--v); border-color: var(--v20); background: var(--v05); }
        .chip.ok { color: var(--ok); border-color: rgba(52,211,153,0.2); }
        .mrow { display: flex; align-items: center; gap: 10px; padding: 9px 0; border-bottom: 1px solid var(--bd); }
        .mrow:last-of-type { border-bottom: none; }
        .mrn  { font-family: var(--mono); font-size: 11px; font-weight: 700; color: var(--v); min-width: 24px; text-align: right; }
        .mbar { flex: 1; height: 2px; background: var(--sh); position: relative; overflow: hidden; }
        .mfil { position: absolute; inset-y: 0; left: 0; background: var(--v); box-shadow: 4px 0 8px var(--v40); }

        /* sec 5 — proof */
        .s5 { background: var(--bg); border-top: 1px solid var(--bd); }
        .strow { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: var(--bd); border: 1px solid var(--bd); margin-top: 60px; }
        @media (max-width: 640px) { .strow { grid-template-columns: 1fr; } }
        .stcl { background: var(--sl); padding: 44px 36px; transition: background 0.2s; will-change: transform, opacity, filter; }
        .stcl:hover { background: var(--sm); }
        .stnum { font-family: var(--display); font-size: 52px; color: var(--v); line-height: 1; margin-bottom: 6px; }
        .stlbl { font-size: 13px; color: var(--t2); letter-spacing: 0.04em; }

        /* sec 6 — editor network */
        .s6 { background: var(--sl); border-top: 1px solid var(--bd); }
        .s6i { max-width: 1200px; margin: 0 auto; padding: 120px 64px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        @media (max-width: 900px) { .s6i { grid-template-columns: 1fr; gap: 40px; padding: 80px 24px; } }
        .s6cta { display: inline-flex; align-items: center; gap: 8px; margin-top: 28px; font-family: var(--mono); font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--v); border: 1px solid var(--v20); background: var(--v05); padding: 11px 22px; cursor: pointer; transition: background 0.2s, border-color 0.2s; text-decoration: none; }
        .s6cta:hover { background: var(--v10); border-color: var(--v40); }
        .s6deco { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--bd); border: 1px solid var(--bd); }
        .s6dc { background: var(--sm); padding: 28px; transition: background 0.2s; will-change: transform, opacity, filter; }
        .s6dc:hover { background: var(--sh); }
        .s6dn { font-family: var(--display); font-size: 36px; color: var(--t1); opacity: 0.05; line-height: 1; }
        .s6dl { font-size: 12px; color: var(--t2); margin-top: 6px; font-family: var(--mono); letter-spacing: 0.05em; }

        /* sec 7 — final cta */
        .s7 { background: var(--bg); border-top: 1px solid var(--bd); }
        .s7i { max-width: 860px; margin: 0 auto; padding: 160px 64px; text-align: center; }
        @media (max-width: 768px) { .s7i { padding: 100px 24px; } }
        .s7h { font-family: var(--display); font-size: clamp(50px, 8vw, 100px); line-height: 0.9; color: var(--t1); letter-spacing: 0.01em; margin-bottom: 22px; will-change: transform, opacity; }
        .s7s { font-size: 18px; color: var(--t2); line-height: 1.65; max-width: 480px; margin: 0 auto 44px; will-change: transform, opacity; }

        /* CTA Button — critical z-index + interaction fix */
        .lbtn {
          display: inline-block;
          padding: 16px 44px;
          background: var(--v);
          color: #09090b;
          font-family: var(--mono);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 32px var(--v20), 0 8px 24px rgba(0,0,0,0.4);
          transition: box-shadow 0.25s, transform 0.15s;
          text-decoration: none;
          z-index: 10;
          pointer-events: all;
          will-change: transform, opacity;
        }
        .lbtn::before { content: ''; position: absolute; inset: 0; background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.16) 50%, transparent 60%); transform: translateX(-100%); transition: transform 0.6s; pointer-events: none; }
        .lbtn:hover::before { transform: translateX(100%); }
        .lbtn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 48px var(--v40), 0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px var(--v40);
        }
        .lbtn:active { transform: scale(0.98); }

        .cc:hover { background: var(--sh); transform: translateY(-5px); transition: background 0.2s, transform 0.25s ease; }

        .stcl:hover { background: var(--sm); transform: translateY(-4px); transition: background 0.2s, transform 0.25s ease; }

        .section-reveal { will-change: transform, opacity; }

        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.4} }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 32px var(--v20), 0 8px 24px rgba(0,0,0,0.4); }
          50%       { box-shadow: 0 0 52px var(--v40), 0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px var(--v20); }
        }
        .lbtn { animation: glow-pulse 3s ease-in-out infinite; }
      `}</style>

      <div className="pg" ref={pageRef}>
        <div className="pg-grid" aria-hidden />

        {/* ──────────────────── HERO ──────────────────── */}
        <section className="hero">
          <div className="hero-glow-a" ref={heroGlowARef} aria-hidden />
          <div className="hero-glow-b" ref={heroGlowBRef} aria-hidden />

          <div className="hero-body">
            {/* left */}
            <div className="hl">
              <div className="hl-badge" ref={heroBadgeRef}>
                <div className="hl-dot" />
                <span className="hl-badge-txt">FoxtacticsAI System</span>
              </div>
              <h1 className="hl-h1" ref={heroHeadingRef}>
                Engineer<br /><em>Virality</em>.
              </h1>
              <p className="hl-sub" ref={heroSubRef}>
                Stop guessing. Start controlling outcomes with AI-powered content infrastructure.
              </p>
              <div className="hl-proofs" ref={heroProofsRef}>
                {["15,000+ scripts analyzed", "Real-time trend ingestion", "Retention-first architecture"].map((p, i) => (
                  <div key={i} className="hl-proof">
                    <div className="hl-dia" />
                    <span className="hl-ptxt">{p}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* right */}
            <div className="hr" ref={heroRightRef}>
              {/* 3D input card */}
              <div
                className="ic"
                ref={heroCardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)` }}
              >
                <div className="ic-hdr">
                  <span className="ic-lbl">System Directives</span>
                  <div className="ic-status"><div className="ic-sdot" />LIVE</div>
                </div>
                <div>
                  <div className="ic-field-lbl">Input Signal</div>
                  <textarea className="ic-ta" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Awaiting structural input for semantic block correlation..." />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div className="tg">{formatTypes.map((t) => <button key={t} onClick={() => setActiveFormat(t)} className={`tb${activeFormat === t ? " on" : ""}`}>{t}</button>)}</div>
                  <div className="tg">{platforms.map((p) => <button key={p} onClick={() => setActivePlatform(p)} className={`tb${activePlatform === p ? " on" : ""}`}>{p}</button>)}</div>
                </div>
                <div className={`dr${isDeepResearch ? " on" : ""}`} onClick={() => setIsDeepResearch(!isDeepResearch)} role="checkbox" aria-checked={isDeepResearch} tabIndex={0} onKeyDown={(e) => e.key === " " && setIsDeepResearch(!isDeepResearch)}>
                  <div className={`dr-box${isDeepResearch ? " on" : ""}`}>{isDeepResearch && <div className="dr-inn" />}</div>
                  <span className="dr-lbl">Deep Research Mode</span>
                  {isDeepResearch && <span className="dr-badge">Active</span>}
                </div>
                <button className="run">↗ Run Analysis</button>
              </div>

              {/* analysis panel */}
              <div className="ap">
                <div>
                  <div className="ap-hdr"><span className="ap-lbl">Active Analysis</span><span className="ap-ok">● OK</span></div>
                  <div className="sl-lbl">Predicted Virality Index</div>
                  <div className="sl-bar">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      transition={{ ease: "circOut", duration: 0.35 }}
                      style={{ position: "absolute", inset: 0, right: "auto", background: "var(--v)", boxShadow: "4px 0 12px var(--v40)" }}
                    />
                  </div>
                  <div className="sl-num">{score.toFixed(1)}<span>%</span></div>
                  <div className="mg">
                    <div className="mc"><div className="ml">Retention</div><div className="mv ok">High</div></div>
                    <div className="mc"><div className="ml">Pacing</div><div className="mv v">Aggressive</div></div>
                    <div className="mc"><div className="ml">Format</div><div className="mv">{activeFormat}</div></div>
                    <div className="mc"><div className="ml">Platform</div><div className="mv v">{activePlatform}</div></div>
                  </div>
                  <div className="pb">{inputText.length > 0 ? `"${inputText.slice(0, 100)}${inputText.length > 100 ? "..." : ""}"` : "Ingesting baseline semantic node structure..."}</div>
                </div>
                <div className="af">
                  <div className="afc"><span className="afl">Research</span><span className={`afv${isDeepResearch ? " v" : ""}`}>{isDeepResearch ? "On" : "Off"}</span></div>
                  <div className="afc"><span className="afl">Signal</span><span className="afv ok">{inputText.length > 0 ? "Active" : "Idle"}</span></div>
                  <div className="afc"><span className="afl">Chars</span><span className="afv">{inputText.length}</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────── SEC 1 — REALITY / PINNED ──────────── */}
        <section className="s s1" ref={s1Ref}>
          <div className="s1i">
            <span className="ey">Reality Check</span>
            <h2 className="s1h" ref={s1TextRef}>
              Most content fails<br />in the first <span className="vc">3 seconds.</span>
            </h2>
            <p className="s1s" ref={s1SubRef}>Not because creators lack ideas — but because they don&apos;t understand retention.</p>
            <p className="s1p">FoxtacticsAI breaks down what actually keeps people watching.</p>
          </div>
        </section>

        {/* ──────────── SEC 2 — CAPABILITIES ──────────── */}
        <section className="s s2">
          <div className="si">
            <span className="ey section-reveal">What the system does</span>
            <div className="sdiv section-reveal" />
            <h2 className="sh2 section-reveal">Capabilities, not features.</h2>
            <p className="ssub section-reveal">Three systems working in parallel to engineer performance at the structural level.</p>
            <div className="cg" ref={s2CardsRef}>
              {[
                { n: "01", t: "Hook Engineering", b: "Analyze and generate hooks based on proven psychological patterns — not guesswork." },
                { n: "02", t: "Retention Architecture", b: "Structure your content into sequences designed to hold attention frame by frame." },
                { n: "03", t: "Performance Prediction", b: "See how your content performs before you publish — with retention scoring and drop-off analysis." },
              ].map((c) => (
                <div key={c.n} className="cc">
                  <div className="cc-n">{c.n}</div>
                  <div className="cc-t">{c.t}</div>
                  <div className="cc-b">{c.b}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────── SEC 3 — HOW IT WORKS ──────────── */}
        <section className="s s3">
          <div className="si">
            <span className="ey section-reveal">How it works</span>
            <div className="sdiv section-reveal" />
            <h2 className="sh2 section-reveal">Three steps.<br />Zero guesswork.</h2>
            <div className="stps" ref={s3StepsRef}>
              {[
                { n: "01", t: "Input Your Idea", b: "Describe your topic, audience, and platform." },
                { n: "02", t: "System Processes Patterns", b: "AI analyzes hooks, structure, and engagement signals." },
                { n: "03", t: "Get Engineered Output", b: "Scripts, hooks, editing instructions, and retention predictions." },
              ].map((s) => (
                <div key={s.n} className="stp">
                  <div className="stp-dot">{s.n}</div>
                  <div className="stp-t">{s.t}</div>
                  <div className="stp-b">{s.b}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────── SEC 4 — OUTPUT PREVIEW ──────────── */}
        <section className="s s4">
          <div className="si">
            <span className="ey section-reveal">Output preview</span>
            <div className="sdiv section-reveal" />
            <div className="s4l">
              <div ref={s4LeftRef}>
                <h2 className="sh2">Not just ideas.<br />Structured execution.</h2>
                <p className="ssub">Every output is broken into layers — hooks, scripts, editing, and performance.</p>
                <div className="s4bl">
                  {["Ranked hooks with psychological scoring", "Timeline-based script structure", "Editing instructions used by top creators", "Retention prediction with drop-off points"].map((b, i) => (
                    <div key={i} className="s4b"><div className="s4bd" /><span className="s4bt">{b}</span></div>
                  ))}
                </div>
              </div>
              <div className="mock" ref={s4MockRef}>
                <div className="mock-hdr">
                  <span className="chip">Active Analysis</span>
                  <span className="chip ok">● System OK</span>
                </div>
                {[{ l: "Hook 01", w: "92%", s: 92 }, { l: "Hook 02", w: "88%", s: 88 }, { l: "Hook 03", w: "85%", s: 85 }].map((r) => (
                  <div key={r.l} className="mrow">
                    <span style={{ fontSize: 10, fontFamily: "var(--mono)", color: "var(--t2)", letterSpacing: "0.1em", textTransform: "uppercase", minWidth: 72 }}>{r.l}</span>
                    <div className="mbar"><div className="mfil" style={{ width: r.w }} /></div>
                    <span className="mrn">{r.s}</span>
                  </div>
                ))}
                <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                  {["Script", "Editing", "Retention"].map((c) => <span key={c} className="chip v">{c}</span>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────── SEC 5 — SOCIAL PROOF ──────────── */}
        <section className="s s5">
          <div className="si">
            <span className="ey section-reveal">Data-backed</span>
            <div className="sdiv section-reveal" />
            <h2 className="sh2 section-reveal">Built on real content patterns.</h2>
            <p className="ssub section-reveal">Not hype. Patterns reverse-engineered from content that actually performs.</p>
            <div className="strow" ref={s5StatsRef}>
              <div className="stcl"><div className="stnum">15K+</div><div className="stlbl">Scripts analyzed</div></div>
              <div className="stcl"><div className="stnum">∞M</div><div className="stlbl">Views reverse-engineered</div></div>
              <div className="stcl"><div className="stnum">100%</div><div className="stlbl">Pattern-extracted outputs</div></div>
            </div>
          </div>
        </section>

        {/* ──────────── SEC 6 — EDITOR NETWORK ──────────── */}
        <section className="s s6">
          <div className="s6i">
            <div className="section-reveal">
              <span className="ey">Editor Network</span>
              <div className="sdiv" />
              <h2 className="sh2">Execution matters<br />more than ideas.</h2>
              <p className="ssub" style={{ marginTop: 14 }}>Deploy editors trained on the same system — built for performance, not aesthetics.</p>
              <a className="s6cta" href="/editors">Explore Editor Network →</a>
            </div>
            <div className="s6deco">
              {["Speed", "Precision", "Retention", "Scale"].map((l, i) => (
                <div key={l} className="s6dc"><div className="s6dn">0{i + 1}</div><div className="s6dl">{l}</div></div>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────── SEC 7 — FINAL CTA ──────────── */}
        <section className="s s7" ref={s7Ref}>
          <div className="s7i">
            <h2 className="s7h" ref={s7HeadRef}>Stop guessing.<br />Start engineering.</h2>
            <p className="s7s" ref={s7SubRef}>If your content isn&apos;t performing, it&apos;s not random. It&apos;s structural.</p>
            <a
              className="lbtn"
              href="/command-center"
              ref={s7BtnRef}
            >
              ↗ Launch Script Lab
            </a>
          </div>
        </section>
      </div>
    </>
  );
}