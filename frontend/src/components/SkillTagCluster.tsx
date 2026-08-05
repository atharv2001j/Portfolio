import { motion } from "framer-motion";
import {
  Code2,
  Sparkles,
  Bot,
  Cpu,
  Blocks,
  Database,
  Plug,
  Workflow,
  Cloud,
  Server,
  Activity,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import { skills } from "../content";
import GradientOrb from "./GradientOrb";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "Programming Languages": Code2,
  "Generative AI & LLMs": Sparkles,
  "AI Agents & Orchestration": Bot,
  "ML/DL": Cpu,
  "Frameworks & Libraries": Blocks,
  "Vector Databases": Database,
  "AI APIs & Platforms": Plug,
  "Async/Task Queue": Workflow,
  "Cloud & DevOps": Cloud,
  Databases: Server,
  "Monitoring & Observability": Activity,
  "Developer Tools": Terminal,
};

export default function SkillTagCluster() {
  return (
    <section id="skills" className="section-line relative overflow-hidden bg-bg px-6 py-24 sm:py-32">
      <GradientOrb className="-right-20 top-10" size={320} duration={22} />
      <div className="relative mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mono-tag text-muted"
        >
          [skills]
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
          className="mt-2 text-3xl font-bold tracking-tight text-text sm:text-4xl"
        >
          Skills
        </motion.h2>

        <div className="mt-14 columns-1 gap-8 sm:columns-2 lg:columns-3">
          {skills.map((group, i) => {
            const Icon = CATEGORY_ICONS[group.category];
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.05, ease: "easeOut" }}
                className="mb-8 break-inside-avoid"
              >
                <h3 className="mono-tag flex items-center gap-2 text-muted">
                  {Icon && <Icon size={17} className="shrink-0 text-accent" strokeWidth={2} />}
                  {group.category}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-border bg-surface px-3 py-1 font-mono text-xs text-text transition-colors hover:border-accent hover:text-accent"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
