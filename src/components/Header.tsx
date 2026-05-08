import { appConfig } from "@/data/config";
import { projects } from "@/data/projects";

export function Header() {
  const activeCount = projects.filter((p) => !p.archived).length;

  return (
    <header className="sticky top-0 z-30 glass border-b border-[var(--color-border)]">
      <div className="accent-bar" />
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2.5">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ background: "var(--gradient-primary)" }}
                aria-hidden="true"
              />
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-[var(--color-text-secondary)]">
                Envision &middot; Sales &amp; marketing
              </p>
            </div>
            <h1 className="mt-1.5 text-3xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-4xl">
              {appConfig.title}
            </h1>
            <p className="mt-2 max-w-xl text-sm text-[var(--color-text-secondary)] sm:text-base">
              {appConfig.description}
            </p>
          </div>

          <div className="hidden shrink-0 sm:flex">
            <div
              className="flex items-center gap-2.5 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2 shadow-[var(--shadow-sm)]"
              role="status"
              aria-label={`${activeCount} live projects`}
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                  style={{ background: "var(--brand-green)" }}
                />
                <span
                  className="relative inline-flex h-2 w-2 rounded-full"
                  style={{ background: "var(--brand-green)" }}
                />
              </span>
              <span data-numeric="true" className="text-base font-bold text-[var(--color-text)]">
                {activeCount}
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-text-secondary)]">
                Live projects
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
