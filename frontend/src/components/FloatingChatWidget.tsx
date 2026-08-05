import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useChatWidget } from "../context/ChatWidgetContext";

const GREETING_DELAY_MS = 2200;
const GREETING_AUTO_DISMISS_MS = 5500;
const GREETING_TEXT = "Ask me anything about Atharv's projects, skills, or experience.";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const SUGGESTIONS = [
  "What has Atharv built with LangGraph?",
  "What's Atharv's biggest production metric?",
  "What vector databases has he used?",
];

const COLD_START_MESSAGE =
  "The backend might be waking up from a free-tier cold start — please try again in ~20 seconds.";
const ERROR_MESSAGE = "Something went wrong reaching the assistant. Please try again shortly.";

function AgentAvatar({ size = "h-8 w-8", pulse = false }: { size?: string; pulse?: boolean }) {
  return (
    <span className={`relative flex ${size} shrink-0 items-center justify-center rounded-full border border-border bg-bg`}>
      <span className="mono-tag text-accent">{">"}</span>
      {pulse && (
        <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-surface bg-accent" />
      )}
    </span>
  );
}

const TYPEWRITER_CHARS_PER_TICK = 3;
const TYPEWRITER_TICK_MS = 14;

function StreamedText({ text, onTick }: { text: string; onTick?: () => void }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
  }, [text]);

  useEffect(() => {
    if (count >= text.length) return;
    const id = setTimeout(() => {
      setCount((c) => Math.min(text.length, c + TYPEWRITER_CHARS_PER_TICK));
      onTick?.();
    }, TYPEWRITER_TICK_MS);
    return () => clearTimeout(id);
  }, [count, text, onTick]);

  const done = count >= text.length;

  return (
    <>
      {text.slice(0, count)}
      {!done && (
        <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-blink bg-accent align-middle" />
      )}
    </>
  );
}

export default function FloatingChatWidget() {
  const { isOpen, toggle, close } = useChatWidget();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Hey — I'm Atharv's AI agent. Ask me anything about his projects, experience, or skills.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showGreeting, setShowGreeting] = useState(false);
  const [dismissedGreeting, setDismissedGreeting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen || dismissedGreeting) return;
    const timeout = setTimeout(() => setShowGreeting(true), GREETING_DELAY_MS);
    return () => clearTimeout(timeout);
  }, [isOpen, dismissedGreeting]);

  useEffect(() => {
    if (isOpen) setShowGreeting(false);
  }, [isOpen]);

  useEffect(() => {
    if (!showGreeting) return;

    const autoDismiss = setTimeout(() => {
      setShowGreeting(false);
      setDismissedGreeting(true);
    }, GREETING_AUTO_DISMISS_MS);

    const dismissOnInteraction = () => {
      setShowGreeting(false);
      setDismissedGreeting(true);
    };

    window.addEventListener("scroll", dismissOnInteraction, { passive: true });
    window.addEventListener("click", dismissOnInteraction);

    return () => {
      clearTimeout(autoDismiss);
      window.removeEventListener("scroll", dismissOnInteraction);
      window.removeEventListener("click", dismissOnInteraction);
    };
  }, [showGreeting]);

  const openFromGreeting = () => {
    setShowGreeting(false);
    setDismissedGreeting(true);
    toggle();
  };

  const dismissGreeting = () => {
    setShowGreeting(false);
    setDismissedGreeting(true);
  };

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    });
  };

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setMessages((m) => [...m, { role: "user", text: trimmed }]);
    setInput("");
    setLoading(true);
    setError(null);
    scrollToBottom();

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
        signal: controller.signal,
      });

      if (res.status === 429) {
        setError("You're sending messages too fast — please wait a moment and try again.");
        return;
      }
      if (!res.ok) {
        setError(ERROR_MESSAGE);
        return;
      }

      const data = (await res.json()) as { reply: string };
      setMessages((m) => [...m, { role: "assistant", text: data.reply }]);
      scrollToBottom();
    } catch {
      setError(COLD_START_MESSAGE);
    } finally {
      clearTimeout(timeout);
      setLoading(false);
    }
  };

  const showSuggestions = messages.length <= 1;

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="flex h-[70svh] max-h-[560px] w-[92vw] max-w-sm flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-2xl shadow-black/50"
          >
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <AgentAvatar pulse />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-text">Atharv's AI Agent</p>
                <p className="mono-tag flex items-center gap-1.5 text-[11px] text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_6px_1px_rgba(61,255,154,0.7)]" />
                  online · RAG-grounded
                </p>
              </div>
              <button
                onClick={close}
                aria-label="Close chat"
                className="rounded-md p-1.5 text-muted transition-colors hover:text-text"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M4 4L12 12M12 4L4 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div ref={scrollRef} className="scrollbar-thin flex-1 space-y-4 overflow-y-auto p-4">
              {messages.map((m, i) =>
                m.role === "user" ? (
                  <div key={i} className="flex justify-end">
                    <div className="max-w-[80%] rounded-lg rounded-tr-sm bg-accent/10 px-3 py-2 text-sm leading-relaxed text-text">
                      {m.text}
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex items-start gap-2">
                    <AgentAvatar size="h-6 w-6" />
                    <div className="max-w-[80%] rounded-lg rounded-tl-sm border border-border bg-bg px-3 py-2 text-sm leading-relaxed text-muted">
                      <StreamedText text={m.text} onTick={scrollToBottom} />
                    </div>
                  </div>
                )
              )}
              {loading && (
                <div className="flex items-start gap-2">
                  <AgentAvatar size="h-6 w-6" />
                  <div className="rounded-lg rounded-tl-sm border border-border bg-bg px-3 py-2 font-mono text-sm text-muted">
                    thinking<span className="animate-pulse">...</span>
                  </div>
                </div>
              )}
              {error && (
                <div className="rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-xs text-accent">
                  {error}
                </div>
              )}

              {showSuggestions && (
                <div className="pt-1">
                  <p className="mono-tag mb-2 text-muted">try asking</p>
                  <div className="flex flex-col gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => sendMessage(s)}
                        disabled={loading}
                        className="rounded-md border border-border px-3 py-2 text-left font-mono text-xs text-text transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-accent/5 disabled:opacity-50"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex items-center gap-2 border-t border-border p-3"
            >
              <span className="mono-tag text-accent">{">"}</span>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Atharv..."
                className="min-w-0 flex-1 bg-transparent font-mono text-sm text-text placeholder:text-muted focus:outline-none"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="rounded-md border border-border px-3 py-1.5 font-mono text-xs text-text transition-colors hover:border-accent hover:text-accent disabled:opacity-40"
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showGreeting && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="relative max-w-[240px] rounded-xl rounded-br-sm border border-border bg-surface px-4 py-3 pr-8 text-sm leading-relaxed text-text shadow-xl shadow-black/40"
          >
            <button
              onClick={dismissGreeting}
              aria-label="Dismiss"
              className="absolute right-1.5 top-1.5 rounded p-1 text-muted transition-colors hover:text-text"
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path
                  d="M4 4L12 12M12 4L4 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <button onClick={openFromGreeting} className="text-left">
              {GREETING_TEXT}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggle}
        aria-label={isOpen ? "Close chat" : "Open chat with Atharv's AI agent"}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-bg shadow-lg shadow-accent/20"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              width="22"
              height="22"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </motion.svg>
          ) : (
            <motion.span
              key="glyph"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              className="font-mono text-xl font-bold"
            >
              {">_"}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
