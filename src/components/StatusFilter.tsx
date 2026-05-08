"use client";

import type { CSSProperties } from "react";
import type { ProjectStatus } from "@/types";

const statuses: Array<ProjectStatus | "All"> = [
  "All",
  "Draft",
  "In Progress",
  "Ready",
  "Published",
  "Presented",
];

const activeBg: Record<ProjectStatus | "All", string> = {
  All: "var(--gradient-primary-deep)",
  Draft: "var(--brand-charcoal)",
  "In Progress": "var(--brand-goldenrod)",
  Ready: "var(--brand-green)",
  Published: "var(--brand-bright-blue)",
  Presented: "var(--brand-terracotta)",
};

const activeText: Record<ProjectStatus | "All", string> = {
  All: "#ffffff",
  Draft: "#ffffff",
  "In Progress": "#3a2400",
  Ready: "#0c2c0a",
  Published: "var(--brand-navy)",
  Presented: "#3a1604",
};

const dotBg: Record<ProjectStatus | "All", string> = {
  All: "rgba(255,255,255,0.85)",
  Draft: "var(--brand-charcoal)",
  "In Progress": "var(--brand-goldenrod)",
  Ready: "var(--brand-green)",
  Published: "var(--brand-bright-blue)",
  Presented: "var(--brand-terracotta)",
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
        const activeStyle: CSSProperties | undefined = isActive
          ? { background: activeBg[s], color: activeText[s] }
          : undefined;
        return (
          <button
            key={s}
            role="tab"
            aria-selected={isActive}
            aria-label={`Filter by ${s}`}
            onClick={() => onChange(s)}
            data-on-color={isActive ? "true" : undefined}
            style={activeStyle}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.15em] transition-all duration-[var(--duration-base)] cursor-pointer ${
              isActive
                ? "shadow-[var(--shadow-md)]"
                : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text)] hover:-translate-y-px"
            }`}
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: dotBg[s] }}
              aria-hidden="true"
            />
            {s}
          </button>
        );
      })}
    </div>
  );
}
