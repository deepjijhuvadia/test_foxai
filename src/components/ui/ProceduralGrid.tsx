"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";

export function ProceduralGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Use framer motion values for smooth mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const draw = (time: number) => {
      // Clear with true black
      ctx.fillStyle = "#09090b";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // We read from the smooth spring values representing mouse coordinates
      const mx = smoothX.get();
      const my = smoothY.get();

      // Time driven drift
      const t = time * 0.0005;

      const gridSize = 40;
      const cols = Math.ceil(canvas.width / gridSize) + 1;
      const rows = Math.ceil(canvas.height / gridSize) + 1;

      ctx.lineWidth = 1;
      // Border color / Grid color: very subtle (#27272a, with opacity)
      ctx.strokeStyle = "rgba(39, 39, 42, 0.4)"; 

      ctx.beginPath();

      // Parallax effect offset based on mouse position
      const offsetX = (mx / canvas.width - 0.5) * 40;
      const offsetY = (my / canvas.height - 0.5) * 40;

      for (let i = -1; i <= cols; i++) {
        for (let j = -1; j <= rows; j++) {
          const x = i * gridSize + offsetX + (Math.sin(t + j * 0.5) * 10);
          const y = j * gridSize + offsetY + (Math.cos(t + i * 0.5) * 10);

          if (j === -1) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
      }

      for (let j = -1; j <= rows; j++) {
        for (let i = -1; i <= cols; i++) {
          const x = i * gridSize + offsetX + (Math.sin(t + j * 0.5) * 10);
          const y = j * gridSize + offsetY + (Math.cos(t + i * 0.5) * 10);

          if (i === -1) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
      }

      ctx.stroke();

      // Radial gradient centered loosely on mouse to slightly illuminate the grid
      const gradient = ctx.createRadialGradient(
        mx, my, 0,
        mx, my, 400
      );
      gradient.addColorStop(0, "rgba(167, 139, 250, 0.04)"); // Violet primary
      gradient.addColorStop(1, "rgba(9, 9, 11, 0)"); // Background
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(draw);
    };

    draw(0);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [smoothX, smoothY]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1]"
    />
  );
}
