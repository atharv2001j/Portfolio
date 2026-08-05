import { motion } from "framer-motion";
import { education } from "../content";
import CountUpText from "./CountUpText";

export default function EducationCard() {
  return (
    <section id="education" className="section-line relative bg-panel px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mono-tag text-muted"
        >
          [education]
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
          className="mt-2 text-3xl font-bold tracking-tight text-text sm:text-4xl"
        >
          Education
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          className="mt-10 rounded-lg border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_0_24px_-8px_rgba(61,255,154,0.35)]"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-lg font-semibold text-text">{education.degree}</h3>
            <span className="font-mono text-xs text-muted">{education.period}</span>
          </div>
          <p className="mt-1 text-sm text-muted">{education.institution}</p>
          <CountUpText
            text={`CGPA: ${education.cgpa}`}
            className="mt-4 inline-block font-mono text-[11px] font-medium text-accent"
          />
        </motion.div>
      </div>
    </section>
  );
}
