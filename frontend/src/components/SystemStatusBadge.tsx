import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

type Status = "checking" | "online" | "offline";

export default function SystemStatusBadge() {
  const [status, setStatus] = useState<Status>("checking");
  const [latencyMs, setLatencyMs] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const start = performance.now();

    fetch(`${API_BASE}/api/health`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("not ok");
        setLatencyMs(Math.round(performance.now() - start));
        setStatus("online");
      })
      .catch(() => setStatus("offline"))
      .finally(() => clearTimeout(timeout));

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  const dotClass =
    status === "online"
      ? "bg-accent shadow-[0_0_6px_1px_rgba(61,255,154,0.7)]"
      : status === "offline"
        ? "bg-muted/60"
        : "bg-muted/40 animate-pulse";

  const label =
    status === "checking"
      ? "checking..."
      : status === "online"
        ? `online${latencyMs !== null ? ` · ${latencyMs}ms` : ""}`
        : "offline";

  return (
    <span className="mono-tag inline-flex items-center gap-1.5 text-[11px] text-muted">
      <span className={`h-1.5 w-1.5 rounded-full ${dotClass}`} />
      system {label}
    </span>
  );
}
