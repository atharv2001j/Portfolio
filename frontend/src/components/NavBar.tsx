import { useEffect, useState } from "react";
import SystemStatusBadge from "./SystemStatusBadge";

const links = [
  { label: "experience", href: "#experience" },
  { label: "projects", href: "#projects" },
  { label: "skills", href: "#skills" },
  { label: "education", href: "#education" },
  { label: "labs", href: "#labs" },
  { label: "contact", href: "#contact" },
];

export default function NavBar() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(`#${visible.target.id}`);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-bg/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <a href="#hero" className="font-mono text-sm text-text">
          atharv@portfolio:<span className="text-accent">~$</span>
        </a>
        <ul className="hidden gap-5 md:flex">
          {links.map((l) => {
            const isActive = activeId === l.href;
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`font-mono text-xs transition-colors ${
                    isActive
                      ? "text-accent underline underline-offset-4"
                      : "text-[#C0C4CC] hover:text-accent"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>
        <SystemStatusBadge />
      </nav>
    </header>
  );
}
