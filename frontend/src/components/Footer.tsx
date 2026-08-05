import { profile, footer } from "../content";

export default function Footer() {
  return (
    <footer id="contact" className="section-line relative border-t border-border bg-bg px-6 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mono-tag text-muted">[contact]</p>
        <h2 className="mt-2 text-2xl font-bold text-text sm:text-3xl">Let's build something.</h2>
        <p className="mt-3 text-sm text-muted">{footer.openToWorkLine}</p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-md border border-border bg-surface px-4 py-2 font-mono text-sm text-text transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/60"
          >
            {profile.email}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-border bg-surface px-4 py-2 font-mono text-sm text-text transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/60"
          >
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-border bg-surface px-4 py-2 font-mono text-sm text-text transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/60"
          >
            GitHub
          </a>
          <a
            href={profile.resumeUrl}
            download
            className="rounded-md border border-border bg-surface px-4 py-2 font-mono text-sm text-text transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/60"
          >
            Resume
          </a>
        </div>

        <p className="mt-12 font-mono text-xs text-muted">
          © {new Date().getFullYear()} {profile.name}. Built with React, FastAPI, and RAG.
        </p>
      </div>
    </footer>
  );
}
