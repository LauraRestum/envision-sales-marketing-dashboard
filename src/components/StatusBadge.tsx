import type { ProjectStatus } from "@/types";

const variants: Record<ProjectStatus, string> = {
  Draft:
    "bg-[var(--color-neutral-bg)] text-[var(--brand-charcoal)] ring-1 ring-inset ring-[var(--color-neutral-ring)]",
  "In Progress":
    "bg-[var(--color-warning-bg)] text-[#7a4a00] ring-1 ring-inset ring-[var(--color-warning-ring)]",
  Ready:
    "bg-[var(--color-success-bg)] text-[var(--brand-forest)] ring-1 ring-inset ring-[var(--color-success-ring)]",
  Published:
    "bg-[var(--color-info-bg)] text-[var(--brand-navy)] ring-1 ring-inset ring-[var(--color-info-ring)]",
  Presented:
    "bg-[var(--color-danger-bg)] text-[#8a3a14] ring-1 ring-inset ring-[var(--color-danger-ring)]",
};

const dotStyles: Record<ProjectStatus, { background: string }> = {
  Draft: { background: "var(--brand-charcoal)" },
  "In Progress": { background: "var(--brand-goldenrod)" },
  Ready: { background: "var(--brand-green)" },
  Published: { background: "var(--brand-bright-blue)" },
  Presented: { background: "var(--brand-terracotta)" },
};

const statusGlyph: Record<ProjectStatus, string> = {
  Draft: "Status: draft",
  "In Progress": "Status: in progress",
  Ready: "Status: ready",
  Published: "Status: published",
  Presented: "Status: presented",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[0.7rem] font-bold uppercase tracking-[0.12em] ${variants[status]}`}
    >
      <span
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={dotStyles[status]}
        aria-hidden="true"
      />
      <span className="sr-only">{statusGlyph[status]}</span>
      <span aria-hidden="true">{status}</span>
    </span>
  );
}
