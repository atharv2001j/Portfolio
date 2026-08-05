import { motion } from "framer-motion";
import { experiences } from "../content";
import GradientOrb from "./GradientOrb";
import CountUpText from "./CountUpText";

export default function ExperienceTimeline() {
  return (
    <section
      id="experience"
      className="section-line relative overflow-hidden bg-panel px-6 py-24 sm:py-32"
    >
      <GradientOrb className="-right-24 -top-24" size={340} duration={26} />
      <div className="relative mx-auto max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mono-tag text-muted"
        >
          [work_experience]
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
          className="mt-2 text-3xl font-bold tracking-tight text-text sm:text-4xl"
        >
          Work Experience
        </motion.h2>

        <div className="relative mt-14 space-y-14">
          <div className="absolute left-[6px] top-2 bottom-2 w-[3px] rounded-full bg-gradient-to-b from-border via-border/60 to-border" />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
              className="relative pl-8"
            >
              <span className="absolute left-0 top-1 h-4 w-4 rounded-full border-2 border-accent bg-bg shadow-[0_0_12px_2px_rgba(61,255,154,0.45)]" />

              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold text-text">
                  {exp.role} <span className="text-muted">· {exp.company}</span>
                </h3>
                <span className="font-mono text-xs text-muted">{exp.period}</span>
              </div>
              <p className="font-mono text-xs text-muted">{exp.location}</p>

              <ul className="mt-4 space-y-3">
                {exp.bullets.map((b, bi) => (
                  <li key={bi} className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:gap-3">
                    <span className="mt-0.5 text-muted">▸</span>
                    <span className="flex-1 text-sm leading-relaxed text-muted">
                      {b.text}
                      {b.metric && (
                        <span className="ml-2 inline-flex items-center gap-1 font-mono text-[11px] font-medium text-accent">
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                            className="shrink-0"
                          >
                            <path
                              d="M1 8L4 5L6 6.5L9 2M9 2H6M9 2V5"
                              stroke="currentColor"
                              strokeWidth="1.3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <CountUpText text={b.metric} />
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {exp.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded border border-border bg-surface px-2 py-0.5 font-mono text-[11px] text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
