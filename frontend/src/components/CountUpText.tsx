import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const NUMBER_RE = /\d[\d,]*\.?\d*/g;

function AnimatedNumber({ raw, active, duration = 1100 }: { raw: string; active: boolean; duration?: number }) {
  const hasComma = raw.includes(",");
  const decimalMatch = raw.match(/\.(\d+)/);
  const decimals = decimalMatch ? decimalMatch[1].length : 0;
  const target = parseFloat(raw.replace(/,/g, ""));

  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;

    const startTime = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  const formatted = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
  const withCommas = hasComma ? Number(formatted).toLocaleString() : formatted;

  return <>{withCommas}</>;
}

export default function CountUpText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const parts: Array<{ type: "text" | "number"; value: string }> = [];
  let lastIndex = 0;

  for (const m of text.matchAll(NUMBER_RE)) {
    const index = m.index ?? 0;
    if (index > lastIndex) parts.push({ type: "text", value: text.slice(lastIndex, index) });
    parts.push({ type: "number", value: m[0] });
    lastIndex = index + m[0].length;
  }
  if (lastIndex < text.length) parts.push({ type: "text", value: text.slice(lastIndex) });

  return (
    <span ref={ref} className={className}>
      {parts.map((p, i) =>
        p.type === "number" ? (
          <AnimatedNumber key={i} raw={p.value} active={inView} />
        ) : (
          <span key={i}>{p.value}</span>
        )
      )}
    </span>
  );
}
