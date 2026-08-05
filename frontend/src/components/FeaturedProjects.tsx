import { motion } from "framer-motion";
import { projects } from "../content";
import ProjectCard from "./ProjectCard";
import GradientOrb from "./GradientOrb";

export default function FeaturedProjects() {
  const [flagship, ...rest] = projects;

  return (
    <section id="projects" className="section-line relative overflow-hidden bg-bg px-6 py-24 sm:py-32">
      <GradientOrb className="-left-32 bottom-0" size={380} duration={28} />
      <div className="relative mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mono-tag text-muted"
        >
          [featured_projects]
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
          className="mt-2 text-3xl font-bold tracking-tight text-text sm:text-4xl"
        >
          Featured Projects
        </motion.h2>

        <div className="mt-14">
          <ProjectCard project={flagship} featured />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {rest.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
