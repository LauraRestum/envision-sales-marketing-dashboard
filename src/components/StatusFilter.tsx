"use client";

import type { ProjectStatus } from "@/types";

const statuses: Array<ProjectStatus | "All"> = [
  "All",
  "Draft",
  "In Progress",
  "Ready",
  "Published",
  "Archived",
];

interface StatusFilterProps {
  active: ProjectStatus | "All";
  onChange: (status: ProjectStatus | "All") => void;
}

export function StatusFilter({ active, onChange }: StatusFilterProps) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by status">
      {statuses.map((s) => {
        const isActive = s === active;
        return (
          <button
            key={s}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(s)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-[var(--duration-base)] cursor-pointer ${
              isActive
                ? "bg-[var(--color-primary)] text-white shadow-[var(--shadow-sm)]"
                : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text)]"
            }`}
          >
            {s}
          </button>
        );
      })}
    </div>
  );
}
