import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

const NODE_COUNT = 26;
const LINK_DISTANCE = 160;
const SPEED = 0.06;
const ACCENT = "61, 255, 154";

export default function NodeGraphBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    let pulse: { a: number; b: number; life: number } | null = null;
    let frame = 0;
    let rafId = 0;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      width = rect?.width ?? window.innerWidth;
      height = rect?.height ?? window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initNodes = () => {
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
      }));
    };

    resize();
    initNodes();

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }

      if (!pulse && frame % 140 === 0 && nodes.length > 1) {
        const a = Math.floor(Math.random() * nodes.length);
        let b = Math.floor(Math.random() * nodes.length);
        if (b === a) b = (b + 1) % nodes.length;
        pulse = { a, b, life: 60 };
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DISTANCE) {
            const isPulse =
              pulse && ((pulse.a === i && pulse.b === j) || (pulse.a === j && pulse.b === i));
            const baseAlpha = (1 - dist / LINK_DISTANCE) * 0.5;
            const alpha = isPulse ? Math.min(1, baseAlpha + 0.6) : baseAlpha;
            ctx.strokeStyle = `rgba(${ACCENT}, ${alpha})`;
            ctx.lineWidth = isPulse ? 1.2 : 0.6;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.fillStyle = `rgba(${ACCENT}, 0.7)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      if (pulse) {
        pulse.life -= 1;
        if (pulse.life <= 0) pulse = null;
      }

      rafId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      resize();
      initNodes();
    };

    window.addEventListener("resize", handleResize);

    if (!prefersReducedMotion) {
      rafId = requestAnimationFrame(draw);
    } else {
      draw();
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 opacity-[0.08] ${className}`}
    />
  );
}
