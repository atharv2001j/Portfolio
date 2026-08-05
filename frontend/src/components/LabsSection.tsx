import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FlaskConical } from "lucide-react";
import { useAnimatedNumber } from "../hooks/useAnimatedNumber";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
const DEFAULT_TEXT_A = "machine learning";
const DEFAULT_TEXT_B = "deep learning";

export default function LabsSection() {
  const [textA, setTextA] = useState(DEFAULT_TEXT_A);
  const [textB, setTextB] = useState(DEFAULT_TEXT_B);
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canCompare = textA.trim().length > 0 && textB.trim().length > 0 && !loading;

  const compare = async (a: string = textA, b: string = textB) => {
    if (!a.trim() || !b.trim() || loading) return;
    setLoading(true);
    setError(null);
    setScore(null);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch(`${API_BASE}/api/similarity`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text_a: a.trim(), text_b: b.trim() }),
        signal: controller.signal,
      });

      if (res.status === 429) {
        setError("Too many requests — please wait a moment and try again.");
        return;
      }
      if (!res.ok) {
        setError("Couldn't compute similarity right now. Please try again shortly.");
        return;
      }

      const data = (await res.json()) as { similarity: number };
      setScore(data.similarity);
    } catch {
      setError("The backend might be waking up from a cold start — please try again in ~20 seconds.");
    } finally {
      clearTimeout(timeout);
      setLoading(false);
    }
  };

  useEffect(() => {
    compare(DEFAULT_TEXT_A, DEFAULT_TEXT_B);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pct = score !== null ? Math.round(score * 100) : 0;
  const animatedPct = useAnimatedNumber(pct, 600);

  return (
    <section id="labs" className="section-line relative bg-bg px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mono-tag flex items-center gap-2 text-muted"
        >
          <FlaskConical size={14} className="text-accent" />
          [labs]
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
          className="mt-2 text-2xl font-bold tracking-tight text-text sm:text-3xl"
        >
          Embedding similarity
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          className="mt-2 text-sm text-muted"
        >
          A small live demo of the same embedding model behind the RAG pipeline above — compare
          two phrases and see how semantically close their vectors are.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
          className="mt-8 rounded-lg border border-border bg-surface p-5 transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_0_24px_-8px_rgba(61,255,154,0.35)] sm:p-6"
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={textA}
              onChange={(e) => setTextA(e.target.value)}
              placeholder="e.g. multi-agent orchestration"
              maxLength={300}
              className="flex-1 rounded-md border border-border bg-bg px-3 py-2 font-mono text-sm text-text placeholder:text-muted focus:border-accent/50 focus:outline-none"
            />
            <input
              value={textB}
              onChange={(e) => setTextB(e.target.value)}
              placeholder="e.g. RAG pipeline"
              maxLength={300}
              className="flex-1 rounded-md border border-border bg-bg px-3 py-2 font-mono text-sm text-text placeholder:text-muted focus:border-accent/50 focus:outline-none"
            />
          </div>

          <button
            onClick={() => compare()}
            disabled={!canCompare}
            className="mt-4 w-full rounded-md border border-border px-4 py-2 font-mono text-sm text-text transition-all duration-200 hover:border-accent/60 hover:text-accent disabled:opacity-40 sm:w-auto"
          >
            {loading ? "Computing..." : "Compare"}
          </button>

          {error && (
            <p className="mt-4 rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-xs text-accent">
              {error}
            </p>
          )}

          {score !== null && !error && (
            <div className="mt-5">
              <div className="flex items-baseline justify-between">
                <span className="mono-tag text-muted">cosine similarity</span>
                <span className="font-mono text-lg font-semibold text-accent">{animatedPct}%</span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-bg">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="h-full rounded-full bg-accent"
                />
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
