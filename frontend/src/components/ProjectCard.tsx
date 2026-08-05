import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Project } from "../content";
import CountUpText from "./CountUpText";

export default function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`group relative overflow-hidden rounded-lg border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_0_24px_-8px_rgba(61,255,154,0.35)] ${
        featured ? "border-t-2 border-t-accent sm:p-8" : ""
      }`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-0 h-0.5 bg-accent opacity-0 shadow-[0_0_8px_1px_rgba(61,255,154,0.6)] group-hover:animate-scan"
      />

      {featured && (
        <span className="mono-tag mb-3 inline-block text-accent">flagship project</span>
      )}

      <span className="mono-tag inline-block rounded border border-border px-2 py-1 text-muted">
        {project.statusTag}
      </span>

      <h3 className={`mt-4 font-semibold text-text ${featured ? "text-xl" : "text-lg"}`}>
        {project.name}
      </h3>
      <CountUpText text={project.headline} className="mt-1 block text-sm font-medium text-accent" />

      <ul className={`mt-4 space-y-2 ${featured ? "sm:columns-2 sm:gap-8" : ""}`}>
        {project.bullets.map((b, i) => (
          <li key={i} className="flex gap-2 text-sm leading-relaxed text-muted [break-inside:avoid]">
            <span className="mt-0.5 text-muted">▸</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((t) => (
          <span
            key={t}
            className="rounded border border-border bg-bg px-2 py-0.5 font-mono text-[11px] text-muted"
          >
            {t}
          </span>
        ))}
      </div>

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs text-muted underline decoration-dotted underline-offset-4 transition-colors hover:text-accent"
        >
          View Project
          <ExternalLink size={13} />
        </a>
      )}
    </motion.div>
  );
}
