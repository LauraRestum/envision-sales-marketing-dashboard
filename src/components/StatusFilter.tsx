"use client";

import type { ProjectStatus } from "@/types";

const statuses: Array<ProjectStatus | "All"> = [
  "All",
  "Draft",
  "In Progress",
  "Ready",
  "Published",
  "Presented",
];

const activeStyles: Record<ProjectStatus | "All", string> = {
  All: "text-white shadow-[var(--shadow-glow-warm)]",
  Draft: "bg-stone-700 text-white shadow-[var(--shadow-sm)]",
  "In Progress": "bg-amber-500 text-white shadow-[var(--shadow-sm)]",
  Ready: "bg-emerald-600 text-white shadow-[var(--shadow-sm)]",
  Published: "bg-blue-600 text-white shadow-[var(--shadow-sm)]",
  Presented: "bg-rose-600 text-white shadow-[var(--shadow-sm)]",
};

const dotColors: Record<ProjectStatus | "All", string> = {
  All: "bg-white/80",
  Draft: "bg-stone-400",
  "In Progress": "bg-amber-500",
  Ready: "bg-emerald-500",
  Published: "bg-blue-500",
  Presented: "bg-rose-500",
};

interface StatusFilterProps {
  active: ProjectStatus | "All";
  onChange: (status: ProjectStatus | "All") => void;
}

export function StatusFilter({ active, onChange }: StatusFilterProps) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by status">
      {statuses.map((s) => {
        const isActive = s === active;
        const allActiveStyle =
          s === "All" && isActive
            ? { background: "var(--gradient-sunrise)" }
            : undefined;
        return (
          <button
            key={s}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(s)}
            style={allActiveStyle}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-[var(--duration-base)] cursor-pointer ${
              isActive
                ? activeStyles[s]
                : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text)] hover:-translate-y-px"
            }`}
          >
            <span
              className={`inline-block h-1.5 w-1.5 rounded-full ${dotColors[s]}`}
              aria-hidden="true"
            />
            {s}
          </button>
        );
      })}
    </div>
  );
}
