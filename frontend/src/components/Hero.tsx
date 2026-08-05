import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "../content";
import NodeGraphBackground from "./NodeGraphBackground";

function useTypingLines(lines: string[]) {
  const [text, setText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = lines[lineIndex % lines.length];
    const speed = deleting ? 30 : 45;
    const pauseAtEnd = 2000;
    const pauseAtStart = 300;

    if (!deleting && text === current) {
      const timeout = setTimeout(() => setDeleting(true), pauseAtEnd);
      return () => clearTimeout(timeout);
    }

    if (deleting && text === "") {
      const timeout = setTimeout(() => {
        setDeleting(false);
        setLineIndex((i) => (i + 1) % lines.length);
      }, pauseAtStart);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setText((t) => (deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)));
    }, speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, lineIndex, lines]);

  return text;
}

const links = [
  { label: "Download Resume", href: undefined as string | undefined, kind: "resume" as const },
  { label: "GitHub", kind: "github" as const },
  { label: "LinkedIn", kind: "linkedin" as const },
  { label: "Email", kind: "email" as const },
];

export default function Hero() {
  const typed = useTypingLines(profile.typingLines);

  const hrefFor = (kind: (typeof links)[number]["kind"]) => {
    switch (kind) {
      case "resume":
        return profile.resumeUrl;
      case "github":
        return profile.github;
      case "linkedin":
        return profile.linkedin;
      case "email":
        return `mailto:${profile.email}`;
    }
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col items-start justify-center overflow-hidden bg-bg px-6 pb-[12svh] pt-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-fade bg-[length:100%_100%,32px_32px,32px_32px]" />
      <NodeGraphBackground />

      <div className="relative mx-auto w-full max-w-3xl">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[50px] h-[140px] w-[320px] -translate-x-1/2 rounded-full bg-accent/[0.14] blur-[60px]"
        />

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mono-tag relative text-muted"
        >
          [{profile.role} · {profile.company}]
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="relative mt-4 text-4xl font-extrabold tracking-tight text-text sm:text-5xl md:text-6xl"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="mt-4 max-w-xl text-lg text-muted sm:text-xl"
        >
          {profile.tagline}. {profile.subtagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="mt-6 h-6 font-mono text-sm text-accent sm:text-base"
        >
          <span>{typed}</span>
          <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-accent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.36 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          {links.map((l) =>
            l.kind === "resume" ? (
              <a
                key={l.label}
                href={hrefFor(l.kind)}
                download
                className="rounded-md bg-accent px-4 py-2 font-mono text-sm font-medium text-bg transition-transform duration-200 hover:-translate-y-0.5 hover:brightness-110"
              >
                {l.label}
              </a>
            ) : (
              <a
                key={l.label}
                href={hrefFor(l.kind)}
                target={l.kind === "email" ? undefined : "_blank"}
                rel="noreferrer"
                className="rounded-md border border-border bg-transparent px-4 py-2 font-mono text-sm text-muted transition-colors duration-200 hover:border-accent/60 hover:text-text"
              >
                {l.label}
              </a>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
